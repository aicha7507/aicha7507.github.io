// =======================
// START MODAL
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
let flippedCards = [];
let lockBoard = false;
let turns = 0;
let matches = 0;

let currentPlayer = 1;
let p1Score = 0;
let p2Score = 0;

const turnsDisplay = document.getElementById("turns");
const board = document.querySelector(".gameboard");

// =======================
// IMAGES (MAKE SURE YOU HAVE THESE FILES)
// =======================
const images = [
    "images/img1.png",
    "images/img2.jpeg",
    "images/img3.jpeg",
    "images/img4.jpg",
    "images/img5.jpeg",
    "images/img6.jpeg",
    "images/img7.jpg",
    "images/img8.jpg",
    "images/img9.jpg",
    "images/img10.jpg",
    "images/img11.jpg",
    "images/img12.jpg"
];

// =======================
// BUILD BOARD (CRITICAL PART)
// =======================
function createBoard() {

    board.innerHTML = "";

    let selectedImages = images.slice(0, pairs);

    let deck = [...selectedImages, ...selectedImages];

    deck.sort(() => Math.random() - 0.5);

    deck.forEach(src => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">
                    <img src="${src}">
                </div>
            </div>
        `;

        board.appendChild(card);

        card.addEventListener("click", flipCard);
    });
}

// MUST RUN THIS
createBoard();

// =======================
// FLIP CARD
// =======================
function flipCard() {

    if (lockBoard) return;
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

    const [c1, c2] = flippedCards;

    const img1 = c1.querySelector("img").src;
    const img2 = c2.querySelector("img").src;

    if (img1 === img2) {

        setTimeout(() => {

            c1.classList.add("matched");
            c2.classList.add("matched");

            matches++;

            // 2 PLAYER SCORE
            if (players === 2) {
                if (currentPlayer === 1) p1Score++;
                else p2Score++;

                currentPlayer = currentPlayer === 1 ? 2 : 1;

                updateScore();
            }

            if (matches === pairs) {
                endGame();
            }

            reset();

        }, 500);

    } else {

        setTimeout(() => {
            c1.classList.remove("flipped");
            c2.classList.remove("flipped");
            reset();
        }, 1000);
    }
}

// =======================
// RESET TURN
// =======================
function reset() {
    flippedCards = [];
    lockBoard = false;
}

// =======================
// SCORE DISPLAY
// =======================
function updateScore() {
    document.getElementById("p1Score").textContent = player1 + ": " + p1Score;
    document.getElementById("p2Score").textContent = player2 + ": " + p2Score;
}

// =======================
// END GAME
// =======================
function endGame() {

    let message = "";

    if (players === 1) {
        message = player1 + " wins!";
    } else {
        if (p1Score > p2Score) message = player1 + " wins!";
        else if (p2Score > p1Score) message = player2 + " wins!";
        else message = "It's a tie!";
    }

    document.getElementById("winText").textContent = message;
    document.getElementById("winModal").style.display = "flex";
}