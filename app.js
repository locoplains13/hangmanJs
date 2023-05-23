"use strict";
import randomWords from "random-words";

/**
 * IMPORTANT RUN THROUGH VITE OR IT MAY FUCK UP EVERYTHING
 * IT WON'T WORK IF YOU DON'T RUN IT THROUGH VITE
 */
//hide the play again button until game ends (by losing or winning)
let playAgainBtn = document.getElementById("play-again");
playAgainBtn.style.display = "none";

// first generation of the word
let chosenWord = randomWords(1)[0];

const usedLetters = new Array();
const usedWords = new Array();

let totalGuesses = 7;

//the word but to be displayed as hidden
let hiddenWord = hideWord(chosenWord);
displayWord();

function setMessage(message) {
  document.getElementById("message").textContent = message;
}

function checkIfEqual(guess, chosenWord, hiddenWord) {
  let foundLetter = false;
  if (guess === chosenWord) {
    hiddenWord = guess;
    revealWord();
    setMessage("you've won!!");
    hideShowPlayAgainBtn();
  } else if (guess === "") {
    setMessage("you can't guess an empty space");
  } else {
    for (let i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] === guess) {
        hiddenWord[i] = guess;
        displayWord();
        setMessage("you got a letter right");
        foundLetter = true;
      }
    }
    if (!foundLetter) {
      setMessage("wrong letter");
      totalGuesses--;
    }
  }
}

//show or hide the play again button, depends on its current state
function hideShowPlayAgainBtn() {
  if (playAgainBtn.style.display === "none")
    playAgainBtn.style.display = "inline-block";
  else playAgainBtn.style.display = "none";
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

  // draw a red line
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(300, 100);
  ctx.stroke();
}
draw();

console.log(chosenWord.length);

console.log(chosenWord);

document.getElementById("guess-button").addEventListener("click", function () {
  let guess = document.getElementById("guess").value;
  checkIfEqual(guess, chosenWord, hiddenWord);
  if (totalGuesses <= 0) {
    setMessage("you've lost!!! :(");
    hideShowPlayAgainBtn();
  }
});
