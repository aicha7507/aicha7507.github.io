// declare the board data for a game
// "-" indicates empty, "x" indicates X, "o" indicates O
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


// add click event to every game space
spaces.forEach(space => {
    space.addEventListener("click", handleMove);
});


function handleMove(event) {

    // stop if game already ended
    if (!gameActive) return;

    let space = event.target;

    // prevent clicking a space twice
    if (space.textContent !== "") return;

    // display mark on board
    space.textContent = currentPlayer.toUpperCase();

    // determine which row and column this space belongs to
    let row = space.dataset.row;
    let col = Number(space.dataset.col); // ✅ FIXED

    // update the correct array
    if (row === "A") rowA[col] = currentPlayer;
    if (row === "B") rowB[col] = currentPlayer;
    if (row === "C") rowC[col] = currentPlayer;

    // debugging output
    console.log(rowA, rowB, rowC);

    // check for winner using your function
    let winState = checkGameboard(rowA, rowB, rowC);
    console.log("Win state:", winState);

    // check for win
    if (winState === "x" || winState === "o") {
        gameOutputMsg.innerHTML = "Player " + winState.toUpperCase() + " Wins!";
        gameActive = false;
        return;
    }

    // check for draw (board full)
    if (!rowA.includes("-") && !rowB.includes("-") && !rowC.includes("-")) {
        gameOutputMsg.innerHTML = "It's a Draw!";
        gameActive = false;
        return;
    }

    // switch players
    currentPlayer = (currentPlayer === "x") ? "o" : "x";

    // update turn display
    turnDisplay.innerHTML = "TURN: Player " + currentPlayer.toUpperCase();
}



/* YOUR ORIGINAL FUNCTION */

function checkGameboard(a, b, c) {

  const board = [a, b, c];

  // check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "-") {
      return board[i][0];
    }
  }

  // check columns
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "-") {
      return board[0][i];
    }
  }

  // check diagonals
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "-") {
    return board[0][0];
  }

  if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "-") {
    return board[0][2];
  }

  // no winner
  return "d";
}