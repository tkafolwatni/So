// chess.js

let board = null;
let moveCount = 0;
let secretTriggered = false;

const secretMoves = [
    { from: 'e2', to: 'e4' },
    { from: 'd2', to: 'd4' },
    { from: 'g1', to: 'f3' }
];

function onMove(source, target) {
    if (secretTriggered) return;

    const expectedMove = secretMoves[moveCount];
    if (source === expectedMove.from && target === expectedMove.to) {
        moveCount++;
        if (moveCount === secretMoves.length) {
            revealSecretLogin();
            secretTriggered = true;
        }
    } else {
        moveCount = 0; // إعادة المحاولة فقط بإعادة الترتيب الصحيح من البداية
    }
}

function revealSecretLogin() {
    document.getElementById("secret-login").style.display = "block";
}

// إعداد رقعة الشطرنج
function initChessBoard() {
    board = Chessboard('board', {
        draggable: true,
        position: 'start',
        onDrop: function (source, target) {
            onMove(source, target);
        }
    });
}

// منع التشغيل على الحاسوب
function enforceMobileOnly() {
    if (window.innerWidth > 768) {
        document.body.innerHTML = ""; // إخفاء كل شيء
    }
}

// استدعاء عند التحميل
window.onload = function () {
    enforceMobileOnly();
    initChessBoard();
};