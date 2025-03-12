const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let scoreX = 0;
let scoreO = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.getElementById('twoPlayers').addEventListener('click', startTwoPlayerGame);
document.getElementById('vsAI').addEventListener('click', startAIGame);
restartButton.addEventListener('click', resetGame);

function startTwoPlayerGame() {
    resetGame();
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
}

function startAIGame() {
    resetGame();
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    if (currentPlayer === 'O') {
        aiMove();
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== '' || !isGameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        if (currentPlayer === 'X') {
            scoreX++;
            scoreXDisplay.textContent = scoreX;
        } else {
            scoreO++;
            scoreODisplay.textContent = scoreO;
        }
        message.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        message.textContent = 'It\'s a draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (currentPlayer === 'O' && isGameActive) {
        aiMove();
    }
}

function aiMove() {
    let availableCells = gameState.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameState[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;
    checkResult();
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
    });
    message.textContent = '';
}
