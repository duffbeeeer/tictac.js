import readline from "readline";

export class TicTac {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  gameStats = {
    X: 0,
    O: 0,
  };

  currentPlayer = "X";

  displayBoard() {
    for (let [i, row] of this.board.entries()) {
      if (i > 0) console.log("-----------");
      console.log(` ${row[0]} | ${row[1]} | ${row[2]} `);
    }
  }

  isGameOver() {
    for (let row of this.board) {
      if (row[0] !== " " && row[0] === row[1] && row[0] === row[2]) {
        return true;
      }
    }

    for (let col = 0; col < 3; col++) {
      if (
        this.board[0][col] !== " " &&
        this.board[0][col] === this.board[1][col] &&
        this.board[0][col] === this.board[2][col]
      ) {
        return true;
      }
    }

    if (
      this.board[0][0] !== " " &&
      this.board[0][0] === this.board[1][1] &&
      this.board[0][0] === this.board[2][2]
    ) {
      return true;
    }
    if (
      this.board[0][2] !== " " &&
      this.board[0][2] === this.board[1][1] &&
      this.board[0][2] === this.board[2][0]
    ) {
      return true;
    }

    for (let row of this.board) {
      if (row.includes(" ")) {
        return false;
      }
    }

    return true;
  }

  makeMove(row, col) {
    if (
      row < 0 ||
      row > 2 ||
      col < 0 ||
      col > 2 ||
      this.board[row][col] !== " "
    ) {
      console.clear();
      this.displayBoard();
      console.log("Invalid move. Try again!");
      this.promptMove();
      return;
    }

    this.board[row][col] = this.currentPlayer;
    console.clear();
    this.displayBoard();

    if (this.isGameOver()) {
      console.log(`Player ${this.currentPlayer} wins!`);
      if (this.currentPlayer === "X") {
        this.gameStats.X++;
      } else {
        this.gameStats.O++;
      }
      this.displayStats();
      this.rl.question(
        'Press Enter to play again or type "e" to quit: ',
        (input) => {
          if (input.toLowerCase() === "e") {
            this.rl.close();
          }
          if (input === "") {
            this.startGame();
          }
        }
      );
      return;
    }

    if (this.currentPlayer === "X") {
      this.currentPlayer = "O";
    } else {
      this.currentPlayer = "X";
    }

    console.log(`It's Player ${this.currentPlayer}'s turn.`);
    console.log("Enter p for display stats or e to exit the game");
    this.promptMove();
  }

  promptMove() {
    this.rl.question(
      `Player ${this.currentPlayer}, enter your move (row col): `,
      (input) => {
        if (input === "e") {
          this.rl.close();
          return;
        }
        if (input === "p") {
          console.clear();
          this.displayStats();
          this.displayBoard();
          this.promptMove();
          return;
        }
        const [row, col] = input.split(" ").map(Number);
        this.makeMove(row, col);
      }
    );
  }

  startGame() {
    console.clear();
    this.board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
    console.log("Let's play Tic-Tac-Toe!");
    this.displayBoard();
    console.log(`It's Player ${this.currentPlayer}'s turn.`);
    console.log("Enter p for display stats or e to exit the game");
    this.promptMove();
  }

  displayStats() {
    console.log("X Wins: " + this.gameStats.X);
    console.log("O Wins: " + this.gameStats.O);
  }
}
