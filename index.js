function Gameboard() {
  const row = 3;
  const col = 3;
  const board = [];

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < col; j++) {
      board[i].push(Cell()); //cell right here
    }
  }

  const getBoard = () => board;

  const placeToken = (row, col, player) => {
    //Need to check if there is already a token placed
    //Also assign the player to the token
    if (board[row][col].getValue() !== 0) {
      console.log(`Area is occupied by an ${board[row][col].getValue()}`);
      return `Area is occupied by an ${board[row][col].getValue()}`;
    }
    //If not taken, place token
    board[row][col].addToken(player);
  };

  const printBoard = () => {
    console.log(board.map((row) => row.map((cell) => cell.getValue())));
    //for UI
  };
  return { getBoard, placeToken, printBoard };
}

//Plan, need to make a cell and that cell will be pushed to the Gamebord
function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addToken, getValue };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();
  let boardArray = board.getBoard();
  boardArray = boardArray.map((row) => row.map((cell) => cell.getValue()));
  console.log(boardArray);
  //console.log(boardArray);

  const players = [
    {
      name: playerOneName,
      token: "x",
    },
    {
      name: playerTwoName,
      token: "o",
    },
  ];

  let activePlayer = players[0];

  const switchPlayer = () => {
    if (activePlayer == players[0]) {
      activePlayer = players[1];
    } else {
      activePlayer = players[0];
    }
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();

    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, col) => {
    console.log(
      `Placing ${getActivePlayer().name}'s ${getActivePlayer().token}.`
    );

    board.placeToken(row, col, getActivePlayer().token);

    if (checkForWin(getActivePlayer().token)) {
      console.log(`${getActivePlayer().name} wins!`);
    }
    switchPlayer();
    printNewRound();
  };

  const checkForWin = (token) => {
    let boardArray = board
      .getBoard()
      .map((row) => row.map((cell) => cell.getValue()));
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (
        boardArray[i][0] === token &&
        boardArray[i][1] === token &&
        boardArray[i][2] === token
      ) {
        return true; // Row win
      }
      if (
        boardArray[0][i] === token &&
        boardArray[1][i] === token &&
        boardArray[2][i] === token
      ) {
        return true; // Column win
      }
    }

    // Check diagonals
    if (
      (boardArray[0][0] === token &&
        boardArray[1][1] === token &&
        boardArray[2][2] === token) ||
      (boardArray[0][2] === token &&
        boardArray[1][1] === token &&
        boardArray[2][0] === token)
    ) {
      return true; // Diagonal win
    }

    return false;
  };
  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

const game = GameController();
console.log("starting");
console.log(game.getActivePlayer());
console.log(game.playRound(0, 1));
console.log(game.playRound(0, 0));
console.log(game.playRound(0, 2));
console.log(game.playRound(0, 2));
console.log(game.playRound(1, 1));
console.log(game.playRound(1, 2));
console.log(game.playRound(2, 0));
