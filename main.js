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

let totalGuesses = 7;
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
  if (guess === chosenWord && totalGuesses > 0) {
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
      setMessage(wrongLetterMessage);
      totalGuesses--;
    }
  } else {
    setMessage(wrongWordMessage);
    totalGuesses--;
  }
  let fullString = "";
  for (let i = 0; i < hiddenWord.length; i++) {
    fullString += hiddenWord[i];
  }
  if (fullString === chosenWord) {
    setMessage(winningMessage);
    addWin();
    disableBtn();
    hideShowPlayAgainBtn();
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

  ctx.beginPath();
  ctx.moveTo;
}

draw();

console.log(chosenWord.length);

console.log(chosenWord);

document.getElementById("guess-button").addEventListener("click", function () {
  let guess = document.getElementById("guess").value;
  document.getElementById("guess").value = "";
  checkIfEqual(guess, chosenWord, hiddenWord);
  if (totalGuesses <= 0) {
    setMessage("you've lost!!! :(");
    revealWord();
    disableBtn;
    hideShowPlayAgainBtn();
  }
});

function disableBtn() {
  document.getElementById("guess-button").disabled = true;
}
function enableBtn() {
  document.getElementById("guess-button").disabled = false;
}

document.getElementById("play-again").addEventListener("click", function () {
  totalGuesses = 7;
  setMessage("guess a letter or word");
  chosenWord = randomWords(1)[0];
  hiddenWord = hideWord(chosenWord);
  displayWord();
  hideShowPlayAgainBtn();
  enableBtn();
});
