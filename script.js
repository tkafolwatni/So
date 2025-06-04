const pieces = {
  'r': '♜',
  'n': '♞',
  'b': '♝',
  'q': '♛',
  'k': '♚',
  'p': '♟',
  'R': '♖',
  'N': '♘',
  'B': '♗',
  'Q': '♕',
  'K': '♔',
  'P': '♙'
};

const board = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['',  '',  '',  '',  '',  '',  '',  ''],
  ['',  '',  '',  '',  '',  '',  '',  ''],
  ['',  '',  '',  '',  '',  '',  '',  ''],
  ['',  '',  '',  '',  '',  '',  '',  ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

function createBoard() {
  const chessBoard = document.getElementById("chessBoard");
  chessBoard.innerHTML = ""; // تأكد من إفراغ المحتوى أولاً

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.classList.add((row + col) % 2 === 0 ? "white" : "black");

      const piece = board[row][col];
      if (piece !== '') {
        cell.textContent = pieces[piece];
      }

      chessBoard.appendChild(cell);
    }
  }
}

createBoard();