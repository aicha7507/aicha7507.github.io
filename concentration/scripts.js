// Select all cards
const cards = document.querySelectorAll(".card");

let flippedCards = [];
let lockBoard = false;
let turns = 0;
let matches = 0;

// Display turns
const turnsDisplay = document.getElementById("turns");
const winMessage = document.getElementById("winMessage");

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
    if (this.classList.contains("flipped")) return;

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
        // MATCH
        card1.classList.add("matched");
        card2.classList.add("matched");

        matches++;

        resetTurn();

        if (matches === cards.length / 2) {
            winMessage.style.display = "block";
        }

    } else {
        // NOT MATCH
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