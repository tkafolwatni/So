const boardElement = document.getElementById("chess-board");

const initialBoard = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"]
];

const pieceSymbols = {
  "r": "♜", "n": "♞", "b": "♝", "q": "♛", "k": "♚", "p": "♟",
  "R": "♖", "N": "♘", "B": "♗", "Q": "♕", "K": "♔", "P": "♙"
};

let selectedCell = null;

function createBoard() {
  boardElement.innerHTML = "";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.classList.add((row + col) % 2 === 0 ? "light" : "dark");
      cell.dataset.row = row;
      cell.dataset.col = col;

      const piece = initialBoard[row][col];
      if (piece) {
        cell.textContent = pieceSymbols[piece];
        cell.classList.add("piece");
      }

      cell.addEventListener("click", handleCellClick);
      boardElement.appendChild(cell);
    }
  }
}

function handleCellClick(e) {
  const cell = e.currentTarget;
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);
  const piece = initialBoard[row][col];

  clearHighlights();

  if (selectedCell) {
    const fromRow = parseInt(selectedCell.dataset.row);
    const fromCol = parseInt(selectedCell.dataset.col);

    // تنفيذ النقل
    initialBoard[row][col] = initialBoard[fromRow][fromCol];
    initialBoard[fromRow][fromCol] = "";
    selectedCell = null;

    // التحقق من الحركة السرية: ♘ من b1 إلى c3 (من [7][1] إلى [5][2])
    if (
      fromRow === 7 && fromCol === 1 &&
      row === 5 && col === 2 &&
      piece === "N"
    ) {
      // توجيه إلى الصفحة السرية
      window.location.href = "secret.html";
      return;
    }

    createBoard();
    return;
  }

  if (piece) {
    selectedCell = cell;
    highlightMoves(piece, row, col);
  }
}

function highlightMoves(piece, row, col) {
  const isWhite = piece === piece.toUpperCase();
  const directions = {
    "P": [[-1, 0]],  // white pawn
    "p": [[1, 0]],   // black pawn
    "N": [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2]],
    "n": [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2]],
    "K": [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]],
    "k": [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
  };

  let moves = [];

  if (directions[piece]) {
    for (const [dx, dy] of directions[piece]) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (isInsideBoard(newRow, newCol) && !isOwnPiece(newRow, newCol, isWhite)) {
        moves.push([newRow, newCol]);
      }
    }
  }

  // تمييز الخانات القابلة للنقل
  for (const [r, c] of moves) {
    const cell = document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
    if (cell) cell.classList.add("highlight");
  }
}

function isOwnPiece(row, col, isWhite) {
  const target = initialBoard[row][col];
  if (!target) return false;
  return (isWhite && target === target.toUpperCase()) ||
         (!isWhite && target === target.toLowerCase());
}

function isInsideBoard(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function clearHighlights() {
  document.querySelectorAll(".highlight").forEach(cell => {
    cell.classList.remove("highlight");
  });
}
createBoard();