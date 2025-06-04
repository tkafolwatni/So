// chess.js

// 🛡️ منع الاستخدام على الحاسوب
if (window.innerWidth > 768) {
  document.body.innerHTML = "";
  throw new Error("الوصول مسموح من الهاتف فقط");
}

// ♟️ إعداد رقعة الشطرنج
const board = document.getElementById("chessBoard");
let selected = null;

// 🎯 مواقع البداية (فارغة كبنية عرض فقط)
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

// ♟️ توليد الرقعة
function renderBoard() {
  board.innerHTML = "";
  for (let row = 0; row < 8; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "row";
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement("div");
      cell.className = "cell " + ((row + col) % 2 === 0 ? "white" : "black");
      cell.dataset.row = row;
      cell.dataset.col = col;
      const piece = initialBoard[row][col];
      cell.textContent = piece;
      cell.addEventListener("click", onCellClick);
      rowDiv.appendChild(cell);
    }
    board.appendChild(rowDiv);
  }
}

function onCellClick(e) {
  const cell = e.target;
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  if (selected) {
    const fromRow = selected.row;
    const fromCol = selected.col;
    const toRow = row;
    const toCol = col;

    // تنفيذ الحركة
    const movedPiece = initialBoard[fromRow][fromCol];
    initialBoard[toRow][toCol] = movedPiece;
    initialBoard[fromRow][fromCol] = "";

    // ✅ تحقق من الحركة الخاصة لتفعيل إنشاء حساب
    if (
      movedPiece === "N" &&
      fromRow === 7 && fromCol === 1 &&
      toRow === 5 && toCol === 2
    ) {
      // ♟️ هذه الحركة (Nb1-c3) تفتح التسجيل
      localStorage.setItem("registrationAllowed", "true");
    }

    selected = null;
    renderBoard();
  } else {
    selected = { row, col };
  }
}

document.addEventListener("DOMContentLoaded", renderBoard);