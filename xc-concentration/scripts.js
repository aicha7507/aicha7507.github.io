document.addEventListener("DOMContentLoaded", function () {

let flipped = [];
let lock = false;
let turns = 0;
let matches = 0;

let players = [];
let currentPlayer = 0;
let totalPairs = 8;

const turnsDisplay = document.getElementById("turns");
const winMessage = document.getElementById("winMessage");
const playerTurn = document.getElementById("playerTurn");

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {

    totalPairs = parseInt(document.getElementById("pairSelect").value);

    const p1 = document.getElementById("p1").value || "Player 1";
    const p2 = document.getElementById("p2").value || "Player 2";
    const count = document.getElementById("playerSelect").value;

    players = [{ name: p1, score: 0 }];

    if (count === "2") {
        players.push({ name: p2, score: 0 });
    }

    document.getElementById("startModal").style.display = "none";

    generateBoard();
    updateTurn();
}

function generateBoard() {

    const board = document.querySelector(".gameboard");
    board.innerHTML = "";

    let images = [];

    for (let i = 1; i <= totalPairs; i++) {
        images.push(`img${i}.jpg`);
        images.push(`img${i}.jpg`);
    }

    images.sort(() => Math.random() - 0.5);

    images.forEach(img => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">
                    <img src="images/${img}">
                </div>
            </div>
        `;

        card.addEventListener("click", flip);
        board.appendChild(card);
    });
}

function flip() {

    if (lock || this.classList.contains("flipped")) return;

    this.classList.add("flipped");
    flipped.push(this);

    if (flipped.length === 2) {
        check();
    }
}

function check() {

    lock = true;
    turns++;
    turnsDisplay.textContent = turns;

    let c1 = flipped[0];
    let c2 = flipped[1];

    let match = c1.querySelector("img").src === c2.querySelector("img").src;

    if (match) {

        players[currentPlayer].score++;
        matches++;

        reset();

        if (matches === totalPairs) {
            endGame();
        }

    } else {

        setTimeout(() => {
            c1.classList.remove("flipped");
            c2.classList.remove("flipped");

            if (players.length === 2) {
                currentPlayer = currentPlayer === 0 ? 1 : 0;
                updateTurn();
            }

            reset();

        }, 800);
    }
}

function reset() {
    flipped = [];
    lock = false;
}

function updateTurn() {
    if (players.length === 2) {
        playerTurn.textContent = "Turn: " + players[currentPlayer].name;
    }
}

function endGame() {

    let winner = players[0];

    if (players.length === 2) {
        winner = players[0].score > players[1].score ? players[0] : players[1];
    }

    winMessage.innerHTML = `<h2>${winner.name} Wins! 🎉</h2>`;
    winMessage.style.display = "block";

    saveWin(winner.name);
}

/* COOKIES */
function saveWin(name) {
    let wins = getCookie(name) || 0;
    wins++;
    document.cookie = name + "=" + wins;
}

function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let c of cookies) {
        let [k, v] = c.split("=");
        if (k === name) return parseInt(v);
    }
    return 0;
}

});