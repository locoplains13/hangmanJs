"use strict";
import randomWords from "random-words";

/**
 * IMPORTANT RUN THROUGH VITE OR IT MAY FUCK UP EVERYTHING
 * IT WON'T WORK IF YOU DON'T RUN IT THROUGH VITE
 */
const chosenWord = randomWords(1);
let hiddenWord = "";

console.log(chosenWord[0].length);

for (let i = 0; i < chosenWord[0].length; i++) {
  hiddenWord += " _ ";
}
document.getElementById("main-game").textContent = hiddenWord;
