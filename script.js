const cells = document.querySelectorAll('.cell');
const resultScreen = document.getElementById('resultScreen');
const resultText = document.getElementById('resultText');
const newGameButton = document.getElementById('newGameButton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

const checkWinner = () => {
  let won = false;
  winningCombinations.forEach(combination => {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      won = true;
      isGameActive = false;
      resultText.innerText = `${gameBoard[a]} Wins!`;
      resultScreen.style.display = 'block';
    }
  });

  if (!won && !gameBoard.includes('')) {
    isGameActive = false;
    resultText.innerText = 'Draw!';
    resultScreen.style.display = 'block';
  }
};

const handleCellClick = (e) => {
  const index = e.target.getAttribute('data-index');

  if (!gameBoard[index] && isGameActive) {
    gameBoard[index] = currentPlayer;
    e.target.innerText = currentPlayer;
    checkWinner();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
};

const resetGame = () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  resultScreen.style.display = 'none';
  cells.forEach(cell => {
    cell.innerText = '';
  });
};

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

newGameButton.addEventListener('click', resetGame);
