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

  const getBoard = () => board;

  const placeToken = (row, col, player) => {
    console.log("placeToken...");
    if (board[row][col].getValue() !== 0) {
      console.log("This area is taken");
      return;
    }
    board[row][col].addToken(player.token);
  };

  const printBoard = () => {
    console.log("printBoard...");
    console.log(board.map((row) => row.map((cell) => cell.getValue())));
    return board.map((row) => row.map((cell) => cell.getValue()));
  };

  return { getBoard, placeToken, printBoard };
}

function Cell() {
  let value = 0;
  const getValue = () => value;
  const addToken = (player) => (value = player);
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
    { playerName: playerTwoName, token: "o" },
  ];

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (row, col) => {
    console.log(`It's ${activePlayer.playerName}'s turn`);
    board.placeToken(row, col, getActivePlayer());

    if (checkForWin()) {
      console.log(`${activePlayer.playerName} wins!`);
      return `${activePlayer.playerName} wins!`;
    }
    switchPlayer();
    return `Next turn: ${activePlayer.playerName}`;
  };

  const checkForWin = () => {
    let boardArray = board
      .getBoard()
      .map((row) => row.map((cell) => cell.getValue()));

    for (let i = 0; i < 3; i++) {
      if (
        boardArray[i][0] === activePlayer.token &&
        boardArray[i][1] === activePlayer.token &&
        boardArray[i][2] === activePlayer.token
      )
        return true;

      if (
        boardArray[0][i] === activePlayer.token &&
        boardArray[1][i] === activePlayer.token &&
        boardArray[2][i] === activePlayer.token
      )
        return true;
    }

    if (
      (boardArray[0][0] === activePlayer.token &&
        boardArray[1][1] === activePlayer.token &&
        boardArray[2][2] === activePlayer.token) ||
      (boardArray[0][2] === activePlayer.token &&
        boardArray[1][1] === activePlayer.token &&
        boardArray[2][0] === activePlayer.token)
    ) {
      return true;
    }

    return false;
  };

  return { getActivePlayer, playRound };
}

// Running the game
const game = GameController();
console.log(game.playRound(0, 1));
console.log(game.playRound(0, 0));
console.log(game.playRound(0, 2));
console.log(game.playRound(1, 1));
console.log(game.playRound(1, 2));
console.log(game.playRound(2, 0));
console.log(game.playRound(2, 2));
