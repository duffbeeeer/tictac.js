import { TicTac } from "./tictac";
import { jest } from "@jest/globals";

describe("TicTac", () => {
  let ticTac;

  beforeEach(() => {
    ticTac = new TicTac();
  });

  describe("displayBoard", () => {
    it("should display the game board", () => {
      const consoleSpy = jest.spyOn(console, "log");

      ticTac.displayBoard();

      expect(consoleSpy).toHaveBeenCalledWith("   |   |   ");
      expect(consoleSpy).toHaveBeenCalledWith("-----------");
      expect(consoleSpy).toHaveBeenCalledWith("   |   |   ");
      expect(consoleSpy).toHaveBeenCalledWith("-----------");
      expect(consoleSpy).toHaveBeenCalledWith("   |   |   ");

      consoleSpy.mockRestore();
    });
  });

  describe("isGameOver", () => {
    it("should return true if there is a winner", () => {
      ticTac.board = [
        ["X", " ", " "],
        ["O", "X", "O"],
        ["X", " ", "X"],
      ];
      expect(ticTac.isGameOver()).toBe(true);
    });

    it("should return false if the game is not over", () => {
      ticTac.board = [
        ["X", "O", " "],
        [" ", "O", "O"],
        [" ", " ", "X"],
      ];
      expect(ticTac.isGameOver()).toBe(false);
    });
  });

  describe("makeMove", () => {
    it("should make a valid move and switch players", () => {
      ticTac.promptMove = jest.fn();

      ticTac.makeMove(1, 1);

      expect(ticTac.board).toEqual([
        [" ", " ", " "],
        [" ", "X", " "],
        [" ", " ", " "],
      ]);

      expect(ticTac.promptMove).toHaveBeenCalled();

      expect(ticTac.currentPlayer).toBe("O");
    });

    it("should finish game and display win message", () => {
      const consoleSpy = jest.spyOn(console, "log");
      ticTac.rl = {
        question: jest.fn((question, callback) => {
          if (question === 'Press Enter to play again or type "e" to quit: ') {
            callback("");
          } else {
            callback("e");
          }
        }),
        close: jest.fn(),
      };
      ticTac.promptMove = jest.fn();
      ticTac.displayStats = jest.fn();
      ticTac.board = [
        [" ", "O", "X"],
        ["O", "X", "O"],
        ["X", "O", "X"],
      ];

      ticTac.makeMove(0, 0);

      expect(consoleSpy).toHaveBeenCalledWith("Player X wins!");
      expect(ticTac.gameStats.X).toBe(1);

      consoleSpy.mockRestore();
    });
  });
  describe("displayStats", () => {
    it("should display the game stats", () => {
      const consoleSpy = jest.spyOn(console, "log");
      ticTac.gameStats = {
        X: 1,
        O: 2,
      };

      ticTac.displayStats();
      expect(consoleSpy).toHaveBeenCalledTimes(2);

      expect(consoleSpy).toHaveBeenNthCalledWith(
        1,
        `X Wins: ${ticTac.gameStats.X}`
      );
      expect(consoleSpy).toHaveBeenNthCalledWith(
        2,
        `O Wins: ${ticTac.gameStats.O}`
      );

      consoleSpy.mockRestore();
    });
  });
});
