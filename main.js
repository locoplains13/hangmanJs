/**
 * IMPORTANT RUN THROUGH VITE OR IT MAY FUCK UP EVERYTHING
 * IT WON'T WORK IF YOU DON'T RUN IT THROUGH VITE
 */
"use strict";
import randomWords from "random-words";

/**different kinds of messages
 * for when  you win, lose, etc
 */
const winningMessage = "you've won!!!";
const emptySpaceMessage = "you can't guess an empty space";
const wrongWordMessage = "wrong word";
const wrongLetterMessage = "wrong letter";
const rightLetterMessage = "you got a letter right";

//hide the play again button until game ends (by losing or winning)
let playAgainBtn = document.getElementById("play-again");
playAgainBtn.style.display = "none";

// first generation of the word
let chosenWord = randomWords(1)[0];

const usedLetters = new Array();
const usedWords = new Array();

let wins = 0;
//the word but to be displayed as hidden
let hiddenWord = hideWord(chosenWord);
displayWord();

function setMessage(message) {
  document.getElementById("message").textContent = message;
}

function addWin() {
  wins = Number(document.getElementById("number-wins").textContent);
  wins++;
  document.getElementById("number-wins").textContent = wins;
}

function checkIfEqual(guess, chosenWord, hiddenWord) {
  let foundLetter = false;
  if (guess === chosenWord) {
    hiddenWord = guess;
    revealWord();
    setMessage(winningMessage);
  } else if (guess === "") {
    setMessage(emptySpaceMessage);
  } else if (guess.length === 1) {
    for (let i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] === guess) {
        hiddenWord[i] = guess;
        displayWord();
        setMessage(rightLetterMessage);
        foundLetter = true;
      }
    }
    if (!foundLetter) {
      arrHangman.shift().call();
      setMessage(wrongLetterMessage);
    }
  } else {
    arrHangman.shift().call();
    setMessage(wrongWordMessage);
  }
  let fullString = "";
  for (let i = 0; i < hiddenWord.length; i++) {
    fullString += hiddenWord[i];
  }
  if (fullString === chosenWord) {
    setMessage(winningMessage);
    addWin();
    disableBtn();
    ShowPlayAgainBtn();
  }
}

function hideWord(chosenWord) {
  let hiddenWord = new Array();
  for (let i = 0; i < chosenWord.length; i++) {
    hiddenWord[i] = "_";
  }
  return hiddenWord;
}

function displayWord() {
  let newHiddenWord = "";
  for (let i = 0; i < hiddenWord.length; i++) {
    newHiddenWord += hiddenWord[i] + " ";
    document.getElementById("main-game").textContent = newHiddenWord;
  }
}

function revealWord() {
  let newHiddenWord = "";
  for (let i = 0; i < chosenWord.length; i++) {
    newHiddenWord += chosenWord[i] + " ";
    document.getElementById("main-game").textContent = newHiddenWord;
  }
}

function draw() {
  const canvas = document.querySelector("#canvas");

  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext("2d");

  // set line stroke and line width
  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;

  // draw the base
  ctx.beginPath();
  ctx.moveTo(100, 350);
  ctx.lineTo(200, 350);
  ctx.stroke();

  // draw the pole where it stands
  ctx.beginPath();
  ctx.moveTo(150, 350);
  ctx.lineTo(150, 50);
  ctx.stroke();

  // draw the hanging base
  ctx.beginPath();
  ctx.moveTo(150, 50);
  ctx.lineTo(300, 50);
  ctx.stroke();

  /**AFTER THIS YOU HAVE TO SEPARATE EACH COMPONENT OF THE HANGMAN INTO FUNCTIONS TO DO
   * AFTER THE PLAYER GETS A LETTER OR WORD WRONG
   */
}
const drawRope = () => {
  const canvas = document.querySelector("#canvas");

  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext("2d");

  ctx.strokeStyle = "white";
  ctx.lineWidth = 7.5;

  ctx.beginPath();
  ctx.moveTo(300, 50);
  ctx.lineTo(300, 95);
  ctx.stroke();
};

const drawHead = () => {
  const canvas = document.querySelector("#canvas");

  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext("2d");

  ctx.strokeStyle = "white";
  ctx.lineWidth = 7.5;

  ctx.beginPath();
  ctx.arc(300, 125, 30, 0, 2 * Math.PI);
  ctx.stroke();
};

const drawTorso = () => {
  const canvas = document.querySelector("#canvas");

  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext("2d");

  ctx.strokeStyle = "white";
  ctx.lineWidth = 7.5;

  ctx.beginPath();
  ctx.moveTo(300, 155);
  ctx.lineTo(300, 250);
  ctx.stroke();
};

const drawLeftLeg = () => {
  const canvas = document.querySelector("#canvas");

  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext("2d");

  ctx.strokeStyle = "white";
  ctx.lineWidth = 7.5;

  //left leg
  ctx.beginPath();
  ctx.moveTo(300, 250);
  ctx.lineTo(270, 290);
  ctx.stroke();
};

const drawRightLeg = () => {
  const canvas = document.querySelector("#canvas");

  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext("2d");

  ctx.strokeStyle = "white";
  ctx.lineWidth = 7.5;

  //left leg
  ctx.beginPath();
  ctx.moveTo(300, 250);
  ctx.lineTo(330, 290);
  ctx.stroke();
};
const drawRghtArm = () => {
  const canvas = document.querySelector("#canvas");

  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext("2d");

  ctx.strokeStyle = "white";
  ctx.lineWidth = 7.5;

  //right arm
  ctx.beginPath();
  ctx.moveTo(300, 200);
  ctx.lineTo(340, 220);
  ctx.stroke();
};

const drawLeftArm = () => {
  const canvas = document.querySelector("#canvas");

  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext("2d");

  ctx.strokeStyle = "white";
  ctx.lineWidth = 7.5;

  //left arm
  ctx.beginPath();
  ctx.moveTo(300, 200);
  ctx.lineTo(260, 220);
  ctx.stroke();
};

function resetCanvas() {
  const canvas = document.querySelector("#canvas");
  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//drawing the stick man guy
draw();

let arrHangman = [
  drawRope,
  drawHead,
  drawTorso,
  drawArms,
  drawLeftLeg,
  drawRightLeg,
  drawLeftArm,
  drawRghtArm,
];

//show or hide the check button
function disableBtn() {
  document.getElementById("guess-button").disabled = true;
}
function enableBtn() {
  document.getElementById("guess-button").disabled = false;
}
//show or hide the play again button, depends on its current state
function ShowPlayAgainBtn() {
  playAgainBtn.style.display = "inline-block";
}

function hidePlayAgainBtn() {
  playAgainBtn.style.display = "none";
}
console.log(chosenWord);
document.getElementById("guess-button").addEventListener("click", function () {
  let guess = document.getElementById("guess").value;
  document.getElementById("guess").value = "";
  checkIfEqual(guess, chosenWord, hiddenWord);
  if (!arrHangman.length) {
    setMessage("you've lost!!! :(");
    revealWord();
    disableBtn;
    ShowPlayAgainBtn();
  }
});
document.getElementById("play-again").addEventListener("click", function () {
  arrHangman = [drawRope, drawHead, drawTorso, drawArms, drawLegs];
  setMessage("guess a letter or word");
  resetCanvas();
  draw();
  chosenWord = randomWords(1)[0];
  hiddenWord = hideWord(chosenWord);
  displayWord();
  hidePlayAgainBtn();
  enableBtn();
});

document.getElementById("openbtn").addEventListener("clik", function () {
  document.getElementById("mySidepanel").style.width = "250px";
});
