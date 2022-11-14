// variables for all the DOM manipulation

const START_BUTTON = document.getElementById("start-button");
const ADD_BUTTON = document.getElementById("add-button");
const KNOWLEDGE_BUTTON = document.querySelector(".knowledge");
const NAME_ENTRY = document.getElementById("entry");
const DIALOG = document.querySelector("dialog");
const DIALOG_CLOSE = document.querySelector("dialog>button");
const MESSAGE_BOX_MESSAGE = document.getElementById("messenger");
const DIALOG_TEXT = document.getElementById("add-text");
const NAME_IN_DIALOG = document.getElementById("name-entry");
const r = document.documentElement;
const BOWSER_BACKGROUND = document.getElementById("bowser-background");
const BOWSER = document.getElementById("bowser");
const WINSOUND = new Audio("sound/sm64_bowser_laugh.mp3");
const KNOWLEDGE_VIDEO = document.getElementById("knowledge-video");

// add names

let nameInputArray = [];

function addAnotherPerson() {
  let input = NAME_ENTRY.value;
  if (lettersOnlyCheck(NAME_ENTRY)) {
    input = capitalizeFist(input);
    if (nameInputArray.includes(input)) {
      // check if entry already exists
      alert("Eintrag existiert bereits!");
    } else {
      // if entry doesn't exist it goes here
      if (input.length > 0) {
        insertName(input);
        nameInputArray.push(input);
        DIALOG_TEXT.innerHTML = '<span id="name-entry"></span> hinzugefügt!';
        document.getElementById("name-entry").textContent = input;
        openDialogLight();
        console.log(nameInputArray);
        NAME_ENTRY.value = "";
        divideTheList();
        return true;
      }
      return false;
    }
    return false;
  }
  return false;
}

// set CSS steps variable value

function setStepsVariableValue(textLength) {
  let newStepsVariable = textLength;
  r.style.setProperty("--steps", newStepsVariable);
}

// number to time conversion

function convertNumberToTime(number) {
  if (typeof number == "number") {
    let result = Math.floor(number / 2);
    return result + "s";
  } else {
    console.log(number + "is not a number!");
    return NaN;
  }
}

// set CSS time-duration variable value

function setTimeVariableValue(durationValue) {
  r.style.setProperty("--time-duration", durationValue);
}

// set CSS column-count variable value

function setColumnCount(number) {
  r.style.setProperty("--column-count", number);
}

// open dialog

function openDialogLight(timeValue = 1000) {
  DIALOG.showModal();
  addPlayers();
  setTimeout(function () {
    DIALOG.close();
  }, 2 * timeValue);
  // close dialog after 2s
}

// capitalize first letter

function capitalizeFist(textValue) {
  arr = textValue.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] =
      arr[i].charAt(0).toLocaleUpperCase() +
      arr[i].slice(1).toLocaleLowerCase();
  }
  return arr.join(" ");
}

// input letters only

function lettersOnlyCheck(inputtxt) {
  let regEx = /^[A-Za-z äöüÄÖÜß-]+$/;
  if (inputtxt.value.match(regEx)) {
    return true;
  } else {
    DIALOG_TEXT.textContent = "Es sind nur Buchstaben von A-Z und a-z erlaubt!";
    openDialogLight();
    return false;
  }
}

// input forwarding

function insertName(phrase) {
  NAME_IN_DIALOG.textContent = phrase;
}

// no empty entry is allowed!

function checkIfTxtinputExists() {
  if (NAME_ENTRY.value.length > 0) {
    return false;
  }
  DIALOG_TEXT.textContent = "Versuchen Sie es doch bitte einfach noch einmal!";
  openDialogLight();
  console.log(nameInputArray);
  return true;
}

// add button event

ADD_BUTTON.onclick = function () {
  ADD_BUTTON.addEventListener("click", addToListEvent());
};

function addToListEvent() {
  if (addAnotherPerson()) {
  } else {
    if (checkIfTxtinputExists());
  }
}

// Enter button for add

NAME_ENTRY.addEventListener("keypress", (ent) => {
  if (ent.key === "Enter") {
    ADD_BUTTON.click();
  }
});

// pick random array entry

function whoIsPaying() {
  let randomPersonPosition = Math.floor(Math.random() * nameInputArray.length);
  let randomPerson = nameInputArray[randomPersonPosition];
  return randomPerson;
}

// end dialog

DIALOG_CLOSE.onclick = function () {
  DIALOG.close();
  function keyPress(e) {
    if (e.key === "Escape") {
      DIALOG.close();
    }
  }
};

// add to list

function addPlayers() {
  let template = nameInputArray
    .map((player) => `<li>${player}</li>`)
    .join("\n");
  document.getElementById("the-list").innerHTML = template;
}

// divide the list

function divideTheList() {
  const LIST_ITEMS = document.getElementById("the-list").querySelectorAll("li");
  const THE_LIST = document.getElementById("the-list");
  THE_LIST.classList.add("columncount-increase");
  if (LIST_ITEMS.length >= 10) {
    document.getElementById("the-list").classList.add("columncount-increase");
    setColumnCount(2);
  }
  if (LIST_ITEMS.length > 20) {
    setColumnCount(3);
  }
  if (LIST_ITEMS.length > 30) {
    setColumnCount(4);
  }
  if (LIST_ITEMS.length > 40) {
    setColumnCount(5);
  }
}

// message selection

function codeMessageFunction() {
  initCodeMessage();
  messageDefaultText();
}

function initCodeMessage() {
  START_BUTTON.onclick = function () {
    if (!nameInputArray.length) {
      DIALOG_TEXT.textContent =
        "Versuchen Sie es doch bitte einfach noch einmal!";
      openDialogLight();
      console.log("there are no entries in the List");
    } else {
      START_BUTTON.addEventListener("click", choseTheLottertyWinner());
      START_BUTTON.addEventListener("click", restartAnimation, false);
    }
  };
}

//check for message status

function messageStatus() {
  if (MESSAGE_BOX_MESSAGE.innerHTML.length == 0) {
    return true;
  }
  return false;
}

//default message into div

function messageDefaultText() {
  let defaultMessageText = "der angezeigte name muss bezahlen!";

  while (messageStatus() === true) {
    writeTxtToDiv(defaultMessageText);
  }
}

//chose a winner

function choseTheLottertyWinner() {
  let theChosenLotteryWinner = whoIsPaying(nameInputArray);
  let chosenMessage = theChosenLotteryWinner + " wurde auserwählt!";
  let winnerMessageLength = chosenMessage.length;
  setStepsVariableValue(Math.floor(winnerMessageLength * 1.5));
  setTimeVariableValue(convertNumberToTime(winnerMessageLength));
  if (compareWinnerWithDefault(chosenMessage)) {
    document.getElementById("messenger").classList.remove("typed-out-default");
    document
      .getElementById("messenger")
      .classList.add("typed-out-before-start");
    console.log(getComputedStyle(r).getPropertyValue("--steps"));
    console.log(getComputedStyle(r).getPropertyValue("--time-duration"));
    setTimeout(() => {
      WINSOUND.play();
    }, Math.floor(winnerMessageLength) * 90);
    setTimeout(() => {
      BOWSER_BACKGROUND.classList.add("bowser-head-background");
      BOWSER.classList.add("bowser-head");
    }, Math.floor(winnerMessageLength) * 90);
  }

  BOWSER_BACKGROUND.classList.remove("bowser-head-background");
  BOWSER.classList.remove("bowser-head");

  writeTxtToDiv(chosenMessage);
  setTimeout(() => {
    removePlayers(theChosenLotteryWinner);
  }, Math.floor(winnerMessageLength) * 90);

  // check if array is empty
  if (Array.isArray(nameInputArray) && !nameInputArray.length) {
    setStepsVariableValue(50);
    setTimeVariableValue(convertNumberToTime(8));
    setTimeout(function () {
      DIALOG_TEXT.textContent = "Es befinden sich keine Einträge in der Liste!";
      MESSAGE_BOX_MESSAGE.innerHTML = "der angezeigte name muss bezahlen!";
      openDialogLight(4000);
    }, 5000);
  }
}

// animation restart function

function restartAnimation(event) {
  let messengerAnimationElement = document.getElementById("messenger");
  messengerAnimationElement.style.animationName = "none";

  requestAnimationFrame(() => {
    messengerAnimationElement.style.animationName = "";
  });
}

// compare array entry with li and add crossed-out class

function removePlayers(playerName) {
  if (nameInputArray.includes(playerName)) {
    let crossedOutName = document
      .getElementById("the-list")
      .querySelectorAll("li");
    for (let step = 0; step < crossedOutName.length; step++) {
      const element = crossedOutName[step];
      if (element.textContent === playerName) {
        element.classList.add("crossed-out");
      }
    }
    // delete entry from array
    for (let jump = 0; jump < nameInputArray.length; jump++) {
      if (nameInputArray.includes(playerName)) {
        nameInputArray.splice(nameInputArray.indexOf(playerName), 1);
      }
    }
    console.log(nameInputArray);
  }
}

// compare default text value with winner

function compareWinnerWithDefault(statement) {
  if ((statement.textContent = "der angezeigte name muss bezahlen!")) {
    return true;
  }
  return false;
}

// compare text if previous text

function compareWithPreviousValue(previousValue) {
  if (MESSAGE_BOX_MESSAGE.textContent === previousValue) {
    return true;
  }
  return false;
}

// change to strict mode

function strictModeEnabled() {
  "use strict";
  document.getElementById("messenger").addEventListener(
    "animationiteration",
    function (g) {
      g.preventDefault;
      document
        .getElementById("messenger")
        .classList.remove("typed-out-before-start");

      void document.getElementById("messenger").offsetWidth;
      document
        .getElementById("messenger")
        .classList.add("typed-out-before-start");
    },
    false
  );
}

// write text to div

function writeTxtToDiv(writtenText) {
  let remainingTextArray = Array.from(writtenText);
  MESSAGE_BOX_MESSAGE.innerHTML = "";
  for (let k = 0; k <= remainingTextArray.length; k++) {
    const writtenTextStep = remainingTextArray[k];
    if (k < writtenText.length) {
      MESSAGE_BOX_MESSAGE.innerHTML += writtenTextStep; // writtenText.charAt(k);
    }
  }
}

// play the knowledge meme video on full display

KNOWLEDGE_BUTTON.onclick = function () {
  console.log("knowledge was found.");
  playKnowledge();
};

function playKnowledge() {
  KNOWLEDGE_VIDEO.style.visibility = "visible";
  playTheVideo();
  setTimeout(function () {
    KNOWLEDGE_VIDEO.style.visibility = "hidden";
  }, 1000);
}

function playTheVideo() {
  KNOWLEDGE_VIDEO.muted = false;
  void KNOWLEDGE_VIDEO.offsetWidth;
  KNOWLEDGE_VIDEO.play();
}

codeMessageFunction();

console.clear();
