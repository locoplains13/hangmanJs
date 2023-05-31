/**
 * IMPORTANT RUN THROUGH VITE OR IT MAY FUCK UP EVERYTHING
 * IT WON'T WORK IF YOU DON'T RUN IT THROUGH VITE
 */
"use strict";
import randomWords from "random-words";
import randomQuotes from "random-quotes";
/**different kinds of messages
 * for when  you win, lose, etc
 */
const winningMessage = "you've won!!!";
const wrongLetterMessage = "wrong letter";
const rightLetterMessage = "you got a letter right";
const startMessage = "type a letter";

//set default difficulty to medium
let difficulty = 1;
document.getElementById("medium-dif").style.color = "rgb(250, 250, 250)";

//set default mode to words
let mode = 1;
document.getElementById("wordsbtn").style.color = "rgb(250, 250, 250)";

//hide the play again button until game ends (by losing or winning)
let playAgainBtn = document.getElementById("play-again");
playAgainBtn.style.display = "none";

// first generation of the word or phrase
function generateChosen(mode) {
  let chosenWord;
  if (mode === 1) {
    return (chosenWord = randomWords(1)[0]);
  } else if (mode === 2) {
    return (chosenWord = randomQuotes()["body"]);
  } else {
    let randomNum = Math.floor(Math.random() * 100);
    if (randomNum < 50) {
      return (chosenWord = randomQuotes()["body"]);
    } else {
      return (chosenWord = randomWords(1)[0]);
    }
  }
}
//initialize word or phrase
let chosenWord = generateChosen(mode);

//initialize array of used letters
const usedLetters = new Array();

let wins = 0;
//the word but to be displayed as hidden
let hiddenWord = hideWord(chosenWord);
displayWord();

/**
 *
 * @param {sets the message to what is happening in the game} message
 */
function setMessage(message) {
  document.getElementById("message").textContent = message;
}

/**
 * adds a win to the win counter
 */
function addWin() {
  if (document.getElementById("message").textContent === winningMessage) {
    wins = Number(document.getElementById("number-wins").textContent);
    wins++;
    document.getElementById("number-wins").textContent = wins;
  }
}

/**
 *
 * @param {the word or letter that the player guessed} guess
 * @param {the chosen word, either by the player or the computer} chosenWord
 * @param {the word hidden in underscores as is} hiddenWord
 */
function checkIfEqual(guess, chosenWord, hiddenWord) {
  let foundLetter = false;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  if (guess.test(alphabet)) {
    for (let i = 0; i < chosenWord.length; i++) {
      let testLetter = RegExp(chosenWord[i].toLowerCase());
      if (testLetter.toString() === guess.toString()) {
        hiddenWord[i] = chosenWord[i];
        displayWord();
        setMessage(rightLetterMessage);
        foundLetter = true;
      }
    }
    if (!foundLetter) {
      let x = document.getElementById("message").textContent;
      if (arrHangman.length && x !== winningMessage) {
        arrHangman.shift().call();
        setMessage(wrongLetterMessage);
      }
    }
  } else {
    setMessage("invalid key");
  }
  let fullString = "";
  for (let i = 0; i < hiddenWord.length; i++) {
    fullString += hiddenWord[i];
  }
  if (fullString === chosenWord) {
    setMessage(winningMessage);
    const x = document.getElementById("message").textContent;
    addWin();
    ShowPlayAgainBtn();
  }
}
/**
 *
 * @param {the word chosen by the player} chosenWord
 * @returns the word hidden in only underscores
 */
function hideWord(chosenWord) {
  let hiddenWord = new Array();
  let pattern = /\S[a-z]/;
  for (let i = 0; i < chosenWord.length; i++) {
    if (
      chosenWord[i] === " " ||
      chosenWord[i] === "," ||
      chosenWord[i] === "'" ||
      chosenWord[i] === "." ||
      chosenWord[i] === "-" ||
      chosenWord[i] === "!" ||
      chosenWord[i] === "?" ||
      chosenWord[i] === ";"
    ) {
      hiddenWord[i] = chosenWord[i];
    } else {
      hiddenWord[i] = "_";
    }
  }
  return hiddenWord;
}

/**
 * displays the word in underscores with spaces in between them
 */
function displayWord() {
  let newHiddenWord = "";
  for (let i = 0; i < hiddenWord.length; i++) {
    newHiddenWord += hiddenWord[i] + " ";
  }
  document.getElementById("main-game").textContent = newHiddenWord;
}

/**
 * reveals the full word when the player either
 * wins by guessing full word or loses
 */
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

function drawArms() {
  drawLeftArm();
  drawRghtArm();
}

function drawLegs() {
  drawLeftLeg();
  drawRightLeg();
}
// resets the canvas to its normal base
function resetCanvas() {
  const canvas = document.querySelector("#canvas");
  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw();
}

//drawing the base canvas
draw();

// function for resetting the hangman array
function resetHangman(difficulty) {
  if (difficulty === 1) {
    return (arrHangman = [
      drawRope,
      drawHead,
      drawTorso,
      drawLeftLeg,
      drawRightLeg,
      drawLeftArm,
      drawRghtArm,
    ]);
  } else {
    return (arrHangman = [drawRope, drawHead, drawTorso, drawArms, drawLegs]);
  }
}
//initiate hangman array
let arrHangman = [
  drawRope,
  drawHead,
  drawTorso,
  drawLeftLeg,
  drawRightLeg,
  drawLeftArm,
  drawRghtArm,
];

//show or hide the play again button, depends on its current state
function ShowPlayAgainBtn() {
  playAgainBtn.style.display = "inline-block";
}

function hidePlayAgainBtn() {
  playAgainBtn.style.display = "none";
}
console.log(chosenWord);

document.addEventListener("keydown", (event) => {
  if (document.activeElement.id !== "custom-input") {
    let guess = new RegExp(event.key);
    console.log(`pressed key was ${guess}`);
    checkIfEqual(guess, chosenWord, hiddenWord);
    if (!arrHangman.length) {
      setMessage("you've lost!!! :(");
      revealWord();
      ShowPlayAgainBtn();
    }
  }
});

document.getElementById("play-again").addEventListener("click", function () {
  //changing the list here,
  //must also be changed in the first declaration above
  resetHangman(difficulty);
  setMessage(startMessage);
  resetCanvas();
  chosenWord = generateChosen(mode);
  hiddenWord = hideWord(chosenWord);
  displayWord();
  hidePlayAgainBtn();
});

// the next two functions open and close the sidepanel with respective buttons
document.getElementById("openbtn").addEventListener("click", function () {
  document.getElementById("mySidepanel").style.width = "300px";
});

document.getElementById("closebtn").addEventListener("click", function () {
  document.getElementById("mySidepanel").style.width = "0px";
});

document.getElementById("resetbtn").addEventListener("click", function () {
  chosenWord = document.getElementById("custom-input").value;
  setMessage(startMessage);
  resetCanvas();
  hidePlayAgainBtn();
  if (chosenWord.length) {
    hiddenWord = hideWord(chosenWord);
    displayWord();
    setMessage(startMessage);
    document.getElementById("mySidepanel").style.width = "0px";
    document.getElementById("custom-input").value = "";
  } else {
    chosenWord = generateChosen(mode);
    resetHangman(difficulty);
    hiddenWord = hideWord(chosenWord);
    displayWord();
  }
});

/**
 * change colors of the buttons depending on which you have chosen
 */
document.getElementById("medium-dif").addEventListener("click", function () {
  difficulty = 1;
  document.getElementById("medium-dif").style.color = "rgb(250, 250, 250)";
  document.getElementById("hard-dif").style.color = "#ad9f9f";
});

document.getElementById("hard-dif").addEventListener("click", function () {
  difficulty = 2;
  document.getElementById("hard-dif").style.color = "rgb(250, 250, 250)";
  document.getElementById("medium-dif").style.color = "#ad9f9f";
});

document.getElementById("wordsbtn").addEventListener("click", function () {
  mode = 1;
  document.getElementById("wordsbtn").style.color = "rgb(250, 250, 250)";
  document.getElementById("phrasesbtn").style.color = "#ad9f9f";
  document.getElementById("bothbtn").style.color = "#ad9f9f";
  document.getElementById("custom-input").value = "";
});

document.getElementById("phrasesbtn").addEventListener("click", function () {
  mode = 2;
  document.getElementById("phrasesbtn").style.color = "rgb(250, 250, 250)";
  document.getElementById("wordsbtn").style.color = "#ad9f9f";
  document.getElementById("bothbtn").style.color = "#ad9f9f";
  document.getElementById("custom-input").value = "";
});

document.getElementById("bothbtn").addEventListener("click", function () {
  mode = 3;
  document.getElementById("bothbtn").style.color = "rgb(250, 250, 250)";
  document.getElementById("wordsbtn").style.color = "#ad9f9f";
  document.getElementById("phrasesbtn").style.color = "#ad9f9f";
  document.getElementById("custom-input").value = "";
});
