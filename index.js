const startButton = document.getElementById("start-button");
const addButton = document.getElementById("add-button");
const nameEntry = document.getElementById("entry");
const dialog = document.querySelector("dialog");
const dialogClose = document.querySelector("dialog>button");
const theUltimateShowdown = document.getElementById("messenger");
const leftOver = document.getElementById("leftovers");
const frontOver = document.getElementById("frontovers");

// namen hinzufuegen

let nameInputArray = [];

function addAnotherPerson() {
  let input = nameEntry.value;
  nameInputArray.push(input);
  document.getElementById("name-entry").innerHTML = input;
  nameEntry.value = "";
}

addButton.onclick = function () {
  addButton.addEventListener("click", addToListEvent());
};

function addToListEvent() {
  addAnotherPerson();
  dialog.showModal();
  console.log(nameInputArray);
  addPlayers();
  setTimeout(function () {
    dialog.close();
  }, 1.5 * 1000); // close dialog after 1.5s
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
  return "Heute ist " + randomPerson + " dran!";
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

    function messageSwap(messagevalue) {
      m.messages = [messagevalue];
    }

    function changeEverthing() {
      let theChosenLotteryWinner = whoIsPaying(nameInputArray);
      messageSwap(theChosenLotteryWinner);
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
      setTimeout(m.animateFadeBuffer, 50);
    } else {
      setTimeout(m.cycleText, 10000);
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
