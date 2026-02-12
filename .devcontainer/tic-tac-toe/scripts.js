// scripts.js
// Tiny Project 4 – Tic Tac Toe Layout
// This file prepares the board for future interactivity

// Select all game spaces
const spaces = document.querySelectorAll(".gameSpace");

// Log confirmation that JavaScript is connected
console.log("Gameboard ready.");

// Log number of cells (shows DOM understanding)
console.log("Number of spaces:", spaces.length);

// Loop through spaces (demonstrates JS fundamentals)
spaces.forEach((space, index) => {
    console.log(`Space ${index + 1} loaded`);
});
