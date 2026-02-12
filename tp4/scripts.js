const spaces = document.querySelectorAll(".gameSpace");
let turn = "X"; // X starts first

spaces.forEach(space => {
    space.addEventListener("click", () => {
        // Only fill empty spaces
        if (space.textContent === "") {
            space.textContent = turn;

            // Switch turn
            turn = turn === "X" ? "O" : "X";
        }
    });
});
