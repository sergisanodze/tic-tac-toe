const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

// ფუნცია თამაშის დაფის შექმნისთვის
function createBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.addEventListener('click', () => handleCellClick(index));
        cellElement.textContent = cell;
        boardElement.appendChild(cellElement);
    });
}

// ფუნცია უჯრაზე დაწკაპუნების დროს
function handleCellClick(index) {
    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    createBoard();
    checkWinner();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameActive) {
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// გამარჯვებულის შემოწმება
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // ჰორიზონტალური
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // ვერტიკალური
        [0, 4, 8], [2, 4, 6]             // დიაგონალური
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            messageElement.textContent = `Player ${board[a]} wins!`;
            return;
        }
    }

    if (!board.includes(null)) {
        gameActive = false;
        messageElement.textContent = "It's a draw!";
    }
}

// თამაშის ინიციალიზაცია
function initGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
    createBoard();
}

initGame();

