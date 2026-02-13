const spaces = document.querySelectorAll(".gameSpace");
let turn = "X"; // X starts first

spaces.forEach(space => {
    space.addEventListener("click", () => {
        if (space.textContent === "") {
            space.textContent = turn;
            turn = turn === "X" ? "O" : "X";
        }
    });
});

// Optional: reset by pressing "r"
document.addEventListener("keydown", (e) => {
    if (e.key === "r") {
        spaces.forEach(space => space.textContent = "");
        turn = "X";
    }
});
