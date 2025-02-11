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
    if (board[row][col] == "x" || board[row][col] == "o") {
      return `Area is occupied by an ${board[row][col]}`;
    }
    //If not taken, place token
    board[row][column].addToken(player);
  };

  const printBoard = () => {
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
      activePlayer == players[1];
    } else {
      activePlayer == players[0];
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

    //checking win conditions
    if (
      (board[0][0].getValue() == getActivePlayer().token &&
        board[0][1].getValue() == getActivePlayer().token &&
        board[0][2].getValue() == getActivePlayer().token) ||
      (board[1][0].getValue() == getActivePlayer().token &&
        board[1][1].getValue() == getActivePlayer().token &&
        board[1][2].getValue() == getActivePlayer().token) ||
      (board[2][0].getValue() == getActivePlayer().token &&
        board[2][1].getValue() == getActivePlayer().token &&
        board[2][2].getValue() == getActivePlayer().token)
    ) {
      console.log(`${getActivePlayer().name} wins!`);
    } else if (
      (board[0][0].getValue() == getActivePlayer().token &&
        board[1][0].getValue() == getActivePlayer().token &&
        board[2][0].getValue() == getActivePlayer().token) ||
      (board[0][1].getValue() == getActivePlayer().token &&
        board[1][1].getValue() == getActivePlayer().token &&
        board[2][1].getValue() == getActivePlayer().token) ||
      (board[0][2].getValue() == getActivePlayer().token &&
        board[1][2].getValue() == getActivePlayer().token &&
        board[2][2].getValue() == getActivePlayer().token)
    ) {
      console.log(`${getActivePlayer().name} wins!`);
    } else if (
      (board[0][0].getValue() == getActivePlayer().token &&
        board[1][1].getValue() == getActivePlayer().token &&
        board[2][2].getValue() == getActivePlayer().token) ||
      (board[0][2].getValue() == getActivePlayer().token &&
        board[1][1].getValue() == getActivePlayer().token &&
        board[2][0].getValue() == getActivePlayer().token)
    ) {
      console.log(`${getActivePlayer().name} wins!`);
    }

    switchPlayerTurn();
    printNewRound();
  };
  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();
