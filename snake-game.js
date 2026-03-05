import { DIRECTIONS, createInitialState, step } from './snake-logic.js';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const TICK_MS = 140;

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = GRID_SIZE * CELL_SIZE;
canvas.height = GRID_SIZE * CELL_SIZE;

const scoreEl = document.getElementById('score-value');
const statusEl = document.getElementById('status-value');
const pauseBtn = document.getElementById('pause-btn');
const restartBtn = document.getElementById('restart-btn');

let state = createInitialState({ cols: GRID_SIZE, rows: GRID_SIZE });
let isPaused = false;
let requestedDirection = null;

function drawGrid() {
  ctx.fillStyle = '#fafafa';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= GRID_SIZE; i++) {
    ctx.beginPath();
    ctx.moveTo(i * CELL_SIZE, 0);
    ctx.lineTo(i * CELL_SIZE, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * CELL_SIZE);
    ctx.lineTo(canvas.width, i * CELL_SIZE);
    ctx.stroke();
  }
}

function drawCell(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * CELL_SIZE + 1, y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
}

function render() {
  drawGrid();
  drawCell(state.food.x, state.food.y, '#ef4444');
  state.snake.forEach((seg, i) => {
    drawCell(seg.x, seg.y, i === 0 ? '#111827' : '#374151');
  });
  scoreEl.textContent = state.score;
  if (state.gameOver) {
    statusEl.textContent = 'Game Over';
  } else if (isPaused) {
    statusEl.textContent = 'Paused';
  } else {
    statusEl.textContent = 'Running';
  }
}

function tick() {
  if (isPaused || state.gameOver) return;
  state = step(state, requestedDirection ?? state.direction);
  requestedDirection = null;
  render();
}

function restart() {
  state = createInitialState({ cols: GRID_SIZE, rows: GRID_SIZE });
  requestedDirection = null;
  isPaused = false;
  pauseBtn.textContent = 'Pause';
  render();
}

function togglePause() {
  if (state.gameOver) return;
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
  render();
}

document.addEventListener('keydown', (e) => {
  const keyMap = {
    ArrowUp: DIRECTIONS.up,
    ArrowDown: DIRECTIONS.down,
    ArrowLeft: DIRECTIONS.left,
    ArrowRight: DIRECTIONS.right,
    w: DIRECTIONS.up,
    s: DIRECTIONS.down,
    a: DIRECTIONS.left,
    d: DIRECTIONS.right,
    W: DIRECTIONS.up,
    S: DIRECTIONS.down,
    A: DIRECTIONS.left,
    D: DIRECTIONS.right,
  };
  if (e.key === ' ') {
    e.preventDefault();
    togglePause();
    return;
  }
  if (keyMap[e.key]) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
    requestedDirection = keyMap[e.key];
  }
});

document.querySelectorAll('[data-dir]').forEach((btn) => {
  btn.addEventListener('click', () => {
    requestedDirection = DIRECTIONS[btn.dataset.dir];
  });
});

pauseBtn.addEventListener('click', togglePause);
restartBtn.addEventListener('click', restart);

setInterval(tick, TICK_MS);
render();
