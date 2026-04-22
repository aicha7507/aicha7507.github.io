
// =======================
// SETTINGS (FROM MODAL)
// =======================
window.onload = function () {
    document.getElementById("startModal").style.display = "flex";
};

function startGame() {

    let pairs = parseInt(document.getElementById("pairCount").value);
    let players = parseInt(document.getElementById("playerCount").value);

    let player1 = document.getElementById("player1Name").value || "Player 1";
    let player2 = document.getElementById("player2Name").value || "Player 2";

    localStorage.setItem("pairs", pairs);
    localStorage.setItem("players", players);
    localStorage.setItem("player1", player1);
    localStorage.setItem("player2", player2);

    document.getElementById("startModal").style.display = "none";

    location.reload();
}

// =======================
// LOAD SETTINGS
// =======================
let pairs = parseInt(localStorage.getItem("pairs")) || 8;
let players = parseInt(localStorage.getItem("players")) || 1;

let player1 = localStorage.getItem("player1") || "Player 1";
let player2 = localStorage.getItem("player2") || "Player 2";

// =======================
// GAME VARIABLES
// =======================
const cards = document.querySelectorAll(".card");

let flippedCards = [];
let lockBoard = false;
let turns = 0;
let matches = 0;

let currentPlayer = 1;
let p1Score = 0;
let p2Score = 0;

// UI elements
const turnsDisplay = document.getElementById("turns");

// =======================
// SHUFFLE CARDS
// =======================
function shuffleCards() {
    const board = document.querySelector(".gameboard");
    const cardArray = Array.from(cards);

    cardArray.sort(() => Math.random() - 0.5);

    cardArray.forEach(card => board.appendChild(card));
}

shuffleCards();

// =======================
// CARD CLICK
// =======================
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

function flipCard() {
    if (lockBoard) return;
    if (this === flippedCards[0]) return;
    if (this.classList.contains("flipped")) return;
    if (this.classList.contains("matched")) return;

    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// =======================
// CHECK MATCH
// =======================
function checkMatch() {
    lockBoard = true;
    turns++;
    turnsDisplay.textContent = turns;

    const [card1, card2] = flippedCards;

    const img1 = card1.querySelector("img").src;
    const img2 = card2.querySelector("img").src;

    if (img1 === img2) {

        setTimeout(() => {
            card1.classList.add("matched");
            card2.classList.add("matched");

            matches++;

            // =======================
            // SCORE SYSTEM (2 PLAYERS)
            // =======================
            if (players === 2) {
                if (currentPlayer === 1) {
                    p1Score++;
                } else {
                    p2Score++;
                }

                currentPlayer = currentPlayer === 1 ? 2 : 1;
            }

            // WIN CHECK
            if (matches === cards.length / 2) {
                endGame();
            }

            resetTurn();
        }, 500);

    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            resetTurn();
        }, 1000);
    }
}

// =======================
// RESET TURN
// =======================
function resetTurn() {
    flippedCards = [];
    lockBoard = false;
}

// =======================
// END GAME (WINNER POPUP)
// =======================
function endGame() {

    let message = "";

    if (players === 1) {
        message = player1 + " wins!";
    } else {
        if (p1Score > p2Score) {
            message = player1 + " wins!";
        } else if (p2Score > p1Score) {
            message = player2 + " wins!";
        } else {
            message = "It's a tie!";
        }
    }

    document.getElementById("winText").textContent = message;
    document.getElementById("winModal").style.display = "flex";
}