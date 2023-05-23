"use strict";
import randomWords from "random-words";

/**
 * IMPORTANT RUN THROUGH VITE OR IT MAY FUCK UP EVERYTHING
 * IT WON'T WORK IF YOU DON'T RUN IT THROUGH VITE
 */
function draw() {
  const canvas = document.querySelector("#canvas");

  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext("2d");

  // set line stroke and line width
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;

  // draw a red line
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(300, 100);
  ctx.stroke();
}
draw();

const chosenWord = randomWords(1);
let hiddenWord = "";

console.log(chosenWord[0].length);

for (let i = 0; i < chosenWord[0].length; i++) {
  hiddenWord += " _ ";
}
document.getElementById("main-game").textContent = hiddenWord;
