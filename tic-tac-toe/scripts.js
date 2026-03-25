// declare the board data for a game
let rowA = ["-", "-", "-"];
let rowB = ["-", "-", "-"];
let rowC = ["-", "-", "-"];

// track whose turn it is
let currentPlayer = "x";

// track if the game is still active
let gameActive = true;


// get DOM elements
let spaces = document.querySelectorAll(".gameSpace");
let gameOutputMsg = document.querySelector("#gameResult span");
let turnDisplay = document.querySelector("#turnDisplay");

// ✅ initialize turn display
turnDisplay.innerHTML = "TURN: Player " + currentPlayer.toUpperCase();


// add click event to every game space
spaces.forEach(space => {
    space.addEventListener("click", handleMove);
});


function handleMove(event) {

    if (!gameActive) return;

    let space = event.target;

    if (space.textContent !== "") return;

    space.textContent = currentPlayer.toUpperCase();

    let row = space.dataset.row;
    let col = Number(space.dataset.col);

    if (row === "A") rowA[col] = currentPlayer;
    if (row === "B") rowB[col] = currentPlayer;
    if (row === "C") rowC[col] = currentPlayer;

    console.log(rowA, rowB, rowC);

    let winState = checkGameboard(rowA, rowB, rowC);

    if (winState === "x" || winState === "o") {
        gameOutputMsg.innerHTML = "🎉 PLAYER " + winState.toUpperCase() + " WINS! 🎉";
        gameActive = false;

        // ✅ disable cursor
        spaces.forEach(space => space.style.cursor = "default");
        return;
    }

    if (!rowA.includes("-") && !rowB.includes("-") && !rowC.includes("-")) {
        gameOutputMsg.innerHTML = "It's a Draw!";
        gameActive = false;

        // ✅ disable cursor
        spaces.forEach(space => space.style.cursor = "default");
        return;
    }

    currentPlayer = (currentPlayer === "x") ? "o" : "x";

    turnDisplay.innerHTML = "TURN: Player " + currentPlayer.toUpperCase();
}


/* YOUR ORIGINAL FUNCTION */
function checkGameboard(a, b, c) {

  const board = [a, b, c];

  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "-") {
      return board[i][0];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "-") {
      return board[0][i];
    }
  }

  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "-") {
    return board[0][0];
  }

  if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "-") {
    return board[0][2];
  }

  return "d";
}