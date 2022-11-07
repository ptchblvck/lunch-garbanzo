let nameEntry = document.getElementById("entry");
let textToHeading = document.querySelector(".saved-text");
let buttonAdd = document.getElementById("submit");
let buttonAccept = document.getElementById("accept");

let nameList = [];

buttonAdd.onclick = function () {
  buttonAdd.addEventListener("click", addSomeNameToList);

  addSomeNameToList();

  console.log(nameEntry.value);
  console.log(nameList);
};

function addSomeNameToList() {
  var newNameEntry = nameEntry.value;
  nameList.push(newNameEntry);
  nameEntry.value = "";
  whoIsPaying(nameList);
}

buttonAccept.onclick = function () {
  buttonAccept.addEventListener("click", anotherHelperIsNeeded());
};

nameEntry.addEventListener("keyPress", (f) => {
  if (f.key === "Enter") {
    buttonAccept.click();
  }
});

function anotherHelperIsNeeded() {
  textToHeading.textContent = whoIsPaying(nameList);
}

function whoIsPaying() {
  var randomPersonPosition = Math.floor(Math.random() * nameList.length);
  var randomPerson = nameList[randomPersonPosition];

  return "Heute ist " + randomPerson + " dran!";
}
