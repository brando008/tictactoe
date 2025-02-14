/*issues:
  -I think some of the board is having a hard time being
   transfered over...check GameController()
  -
*/

function Gameboard() {
  console.log("Calling Gameboard...");
  const row = 3;
  const col = 3;
  const board = [];

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < col; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => {
    console.log("getBoard...");
    return board;
  };

  const placeToken = (row, col, player) => {
    console.log("placeToken...");
    if (board[row][col].getValue() !== 0) {
      console.log("This area is taken");
      return false;
    } else {
      board[row][col].addToken(player.token);
      return true;
    }
  };

  const printBoard = () => {
    console.log("printBoard...");
    console.log(board.map((row) => row.map((cell) => cell.getValue())));
    return board.map((row) => row.map((cell) => cell.getValue()));
  };

  return { getBoard, placeToken, printBoard };
}

function Cell() {
  console.log("Calling Cell...");
  let value = 0;

  const getValue = () => {
    console.log("getValue...");
    return value;
  };
  const addToken = (player) => {
    console.log("addToken...");
    value = player;
  };
  return { getValue, addToken };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  console.log("Calling GameController");
  const board = Gameboard();
  const players = [
    { playerName: playerOneName, token: "x" },
    {
      playerName: playerTwoName,
      token: "o",
    },
  ];
  let activePlayer = players[0];
  const getActivePlayer = () => {
    console.log("getActivePlayer...");
    return activePlayer;
  };
  const switchPlayer = () => {
    console.log("switchPlayer...");
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const playRound = (row, col) => {
    console.log("playRound...");
    console.log(`It's ${activePlayer.playerName}'s turn`);
    let playerTryAgain = board.placeToken(row, col, getActivePlayer());

    if (playerTryAgain == false) {
      return `Try again ${activePlayer.playerName}`;
    }
    if (checkForWin()) {
      console.log("We have a winner");
      return true;
    }
    if (checkForTie()) {
      console.log("We have a tie");
      return false;
    }

    switchPlayer();
    // playRound();
    return `Next turn: ${activePlayer.playerName}`;
  };
  const checkForWin = () => {
    console.log("checkForWin...");
    let boardArray = board.printBoard();

    for (let i = 0; i < 3; i++) {
      if (
        boardArray[i][0] === activePlayer.token &&
        boardArray[i][1] === activePlayer.token &&
        boardArray[i][2] === activePlayer.token
      ) {
        console.log(`${activePlayer.playerName} wins!`);
        return true;
      }
      if (
        boardArray[0][i] === activePlayer.token &&
        boardArray[1][i] === activePlayer.token &&
        boardArray[2][i] === activePlayer.token
      ) {
        console.log(`${activePlayer.playerName} wins!`);
        return true;
      }
    }
    if (
      (boardArray[0][0] === activePlayer.token &&
        boardArray[1][1] === activePlayer.token &&
        boardArray[2][2] === activePlayer.token) ||
      (boardArray[0][2] === activePlayer.token &&
        boardArray[1][1] === activePlayer.token &&
        boardArray[2][0] === activePlayer.token)
    ) {
      console.log(`${activePlayer.playerName} wins!`);
      return true;
    }

    return false;
  };

  const checkForTie = () => {
    let boardArray = board.printBoard();
    console.log("checkForTie...");
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (boardArray[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  };

  return { getActivePlayer, playRound };
}

function ScreenController() {
  let game = GameController();

  const playerTurnDiv = document.querySelector(".turn");
  const boardCells = document.querySelectorAll(".cell");
  const resetBtn = document.querySelector(".reset");

  const updateScreen = () => {
    playerTurnDiv.textContent = `${game.getActivePlayer().playerName}'s turn`;
  };

  resetBtn.addEventListener("click", () => {
    console.log("Game resetting...");

    // Reset the game logic
    game = GameController(); // Reinitialize the game

    // Reset the game state flag
    gameOver = false;

    // Reset the UI board
    boardCells.forEach((cell) => {
      cell.textContent = "";
    });

    // Reset turn text
    playerTurnDiv.textContent = `${game.getActivePlayer().playerName}'s turn`;
  });

  let gameOver = false;

  boardCells.forEach((cell, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;

    cell.addEventListener("click", () => {
      console.log("clicked");
      if (gameOver || cell.textContent !== "") return;
      const activePlayer = game.getActivePlayer();
      cell.textContent = activePlayer.token.toUpperCase();
      winTie = game.playRound(row, col);
      console.log(`winTie: ${winTie}`);
      if (winTie == true) {
        playerTurnDiv.textContent = `${activePlayer.playerName} wins!`;
        gameOver = true;
      } else if (winTie == false) {
        playerTurnDiv.textContent = `It's a tie`;
        gameOver = true;
      } else {
        updateScreen();
      }
    });
  });
}

ScreenController();
