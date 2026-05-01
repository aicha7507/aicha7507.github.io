document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".card");
    const turnsDisplay = document.getElementById("turns");
    const winMessage = document.getElementById("winMessage");

    let flippedCards = [];
    let lockBoard = false;
    let turns = 0;
    let matches = 0;

    // shuffle cards
    function shuffleCards() {
        const board = document.querySelector(".gameboard");
        const cardArray = Array.from(cards);

        cardArray.sort(() => Math.random() - 0.5);

        cardArray.forEach(card => board.appendChild(card));
    }

    shuffleCards();

    // add click events
    cards.forEach(card => {
        card.addEventListener("click", flipCard);
    });

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

    function checkMatch() {
        lockBoard = true;
        turns++;
        turnsDisplay.textContent = turns;

        const card1 = flippedCards[0];
        const card2 = flippedCards[1];

        const img1 = card1.querySelector("img").src;
        const img2 = card2.querySelector("img").src;

        if (img1 === img2) {

            setTimeout(() => {
                card1.classList.add("matched");
                card2.classList.add("matched");

                matches++;

                if (matches === cards.length / 2) {
                    winMessage.style.display = "block";
                }

                resetTurn();
            }, 400);

        } else {

            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                resetTurn();
            }, 900);
        }
    }

    function resetTurn() {
        flippedCards = [];
        lockBoard = false;
    }

});