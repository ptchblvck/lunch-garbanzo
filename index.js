const startButton = document.getElementById("start-button");
const addButton = document.getElementById("add-button");
const nameEntry = document.getElementById("entry");
const dialog = document.querySelector("dialog");
const dialogClose = document.querySelector("dialog>button");
const theUltimateShowdown = document.getElementById("messenger");
const dialogText = document.getElementById("add-text");
const nameInDialog = document.getElementById("name-entry");

// namen hinzufuegen

let nameInputArray = [];

function addAnotherPerson() {
  let input = nameEntry.value;
  if (nameInputArray.includes(input)) {
    alert("Eintrag existiert bereits!");
  } else {
    if (input.length > 0) {
      capitalizeFist(input);
      insertName(input);
      nameInputArray.push(input);
      dialogText.innerHTML = '<span id="name-entry"></span> hinzugefügt!';
      document.getElementById("name-entry").textContent = input;
      openDialogLight();
      console.log(nameInputArray);
      nameEntry.value = "";
      return true;
    }
    return false;
  }
}

// dialog oeffnen

function openDialogLight(timeValue) {
  var timeValue = timeValue || 1000;
  dialog.showModal();
  addPlayers();
  setTimeout(function () {
    dialog.close();
  }, 2 * timeValue); // close dialog after 2s
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

// input weitergabe

function insertName(phrase) {
  nameInDialog.textContent = phrase;
}

// Leerer Eintrag darf nicht sein!

function checkIfFilled() {
  if (nameEntry.value.length > 0) {
    return false;
  }
  dialogText.textContent = "Versuchen Sie es doch bitte einfach noch einmal!";
  openDialogLight();
  console.log(nameInputArray);
  return true;
}

addButton.onclick = function () {
  addButton.addEventListener("click", addToListEvent());
};

function addToListEvent() {
  if (addAnotherPerson()) {
  } else {
    if (checkIfFilled());
  }
}

// Enter knopf zur Eingabe

nameEntry.addEventListener("keypress", (ent) => {
  if (ent.key === "Enter") {
    addButton.click();
  }
});

// name zufaellig auswaehlen

function whoIsPaying() {
  let randomPersonPosition = Math.floor(Math.random() * nameInputArray.length);
  let randomPerson = nameInputArray[randomPersonPosition];
  return randomPerson;
}

// dialog beenden

dialogClose.onclick = function () {
  dialog.close();
  function keyPress(e) {
    if (e.key === "Escape") {
      dialog.close();
    }
  }
};

// liste hinzufuegen

function addPlayers() {
  let template = nameInputArray
    .map((player) => `<li>${player}</li>`)
    .join("\n");
  document.getElementById("the-list").innerHTML = template;
}

// nachrichten auswahl

var Messenger = function (el) {
  "use strict";
  var m = this;

  m.init = function () {
    m.codeletters = "&#*+%?£@§$";
    m.message = 0;
    m.current_length = 0;
    m.fadeBuffer = false;
    m.messages = ["der angezeigte name muss bezahlen"];

    setTimeout(m.animateIn, 100);

    startButton.onclick = function () {
      startButton.addEventListener("click", changeEverthing());
    };

    function changeEverthing() {
      let theChosenLotteryWinner = whoIsPaying(nameInputArray);
      m.messages = [theChosenLotteryWinner + " wurde auserwählt!"];
      removePlayers(theChosenLotteryWinner);
      if (Array.isArray(nameInputArray) && !nameInputArray.length) {
        dialogText.textContent =
          "Es befinden sich keine Einträge in der Liste!";
        openDialogLight(4000);
        // alert("Es befinden sich keine Eintraege in der Liste!");
      }
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
          for (let jump = 0; jump < nameInputArray.length; jump++) {
            if (nameInputArray.includes(playerName)) {
              nameInputArray.splice(nameInputArray.indexOf(playerName), 1);
            }
          }
          console.log(nameInputArray);
        }
      }
    }
  };

  m.generateRandomString = function (length) {
    var random_text = "";
    while (random_text.length < length) {
      random_text += m.codeletters.charAt(
        Math.floor(Math.random() * m.codeletters.length)
      );
    }

    return random_text;
  };

  m.animateIn = function () {
    if (m.current_length < m.messages[m.message].length) {
      m.current_length = m.current_length + 2;
      if (m.current_length > m.messages[m.message].length) {
        m.current_length = m.messages[m.message].length;
      }

      var message = m.generateRandomString(m.current_length);
      $(el).html(message);

      setTimeout(m.animateIn, 20);
    } else {
      setTimeout(m.animateFadeBuffer, 20);
    }
  };

  m.animateFadeBuffer = function () {
    if (m.fadeBuffer === false) {
      m.fadeBuffer = [];
      for (var i = 0; i < m.messages[m.message].length; i++) {
        m.fadeBuffer.push({
          c: Math.floor(Math.random() * 12) + 1,
          l: m.messages[m.message].charAt(i),
        });
      }
    }

    var do_cycles = false;
    var message = "";

    for (var i = 0; i < m.fadeBuffer.length; i++) {
      var fader = m.fadeBuffer[i];
      if (fader.c > 0) {
        do_cycles = true;
        fader.c--;
        message += m.codeletters.charAt(
          Math.floor(Math.random() * m.codeletters.length)
        );
      } else {
        message += fader.l;
      }
    }

    $(el).html(message);

    if (do_cycles === true) {
      setTimeout(m.animateFadeBuffer, 70);
    } else {
      setTimeout(m.cycleText, 5000);
    }
  };

  m.cycleText = function () {
    m.message = m.message + 1;
    if (m.message >= m.messages.length) {
      m.message = 0;
    }

    m.current_length = 0;
    m.fadeBuffer = false;
    $(el).html("");

    setTimeout(m.animateIn, 200);
  };

  m.init();
};

console.clear();
var messenger = new Messenger($("#messenger"));
