const board = document.getElementById('board');
let currentPlayer = 'X';
let gameEnded = false;

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }
}

function handleClick(event) {
  if (gameEnded) return;
  const cell = event.target;
  if (cell.textContent !== '') return;
  cell.textContent = currentPlayer;
  if (checkWin()) {
    alert(`${currentPlayer} فاز!`);
    gameEnded = true;
  } else if (checkDraw()) {
    alert('تعادل!');
    gameEnded = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // صفوف
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // أعمدة
    [0, 4, 8], [2, 4, 6] // قطري
  ];
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board.children[a].textContent === currentPlayer &&
        board.children[b].textContent === currentPlayer &&
        board.children[c].textContent === currentPlayer) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  for (const cell of board.children) {
    if (cell.textContent === '') return false;
  }
  return true;
}

createBoard();
