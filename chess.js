import { Chess } from "https://cdn.jsdelivr.net/npm/chess.js@1.0.0-beta.1/+esm";
import { Chessboard } from "https://cdn.jsdelivr.net/npm/cm-chessboard@8.6.4/+esm";

const boardElement = document.getElementById("chessBoard");

const board = new Chessboard(boardElement, {
  position: "start",
  style: {
    boardColor: "#000000",
    borderType: "none",
    pieces: {
      file: "https://cdn.jsdelivr.net/npm/cm-chessboard@8.6.4/assets/pieces/staunty.svg",
    },
  },
});

const game = new Chess();

let secretMoves = ["e2e4", "g1f3", "d2d4"]; // الحركات السرية المطلوبة
let moveHistory = [];

board.enableMoveInput((event) => {
  const move = {
    from: event.squareFrom,
    to: event.squareTo,
    promotion: "q",
  };

  const result = game.move(move);
  if (result) {
    board.setPosition(game.fen());
    moveHistory.push(move.from + move.to);

    if (moveHistory.length > 3) {
      moveHistory.shift();
    }

    if (
      moveHistory.length === 3 &&
      moveHistory[0] === secretMoves[0] &&
      moveHistory[1] === secretMoves[1] &&
      moveHistory[2] === secretMoves[2]
    ) {
      setTimeout(() => {
        window.location.href = "secret.html";
      }, 500);
    }
  } else {
    board.setPosition(game.fen());
  }
});