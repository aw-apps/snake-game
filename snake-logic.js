// Pure game logic — no DOM, no side effects

export const DIRECTIONS = {
  up:    { x: 0, y: -1 },
  down:  { x: 0, y:  1 },
  left:  { x: -1, y: 0 },
  right: { x:  1, y: 0 },
};

export function isOppositeDirection(a, b) {
  return a.x + b.x === 0 && a.y + b.y === 0;
}

export function nextDirection(current, requested) {
  return isOppositeDirection(current, requested) ? current : requested;
}

export function placeFood(snake, cols, rows) {
  const occupied = new Set(snake.map(({ x, y }) => `${x},${y}`));
  const empty = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (!occupied.has(`${x},${y}`)) empty.push({ x, y });
    }
  }
  return empty[Math.floor(Math.random() * empty.length)];
}

export function createInitialState({ cols, rows }) {
  const headX = Math.floor(cols / 2);
  const headY = Math.floor(rows / 2);
  const snake = [
    { x: headX,     y: headY },
    { x: headX - 1, y: headY },
    { x: headX - 2, y: headY },
  ];
  return {
    snake,
    direction: DIRECTIONS.right,
    food: placeFood(snake, cols, rows),
    score: 0,
    gameOver: false,
    cols,
    rows,
  };
}

export function step(state, requestedDirection) {
  if (state.gameOver) return state;

  const dir = nextDirection(state.direction, requestedDirection ?? state.direction);
  const head = state.snake[0];
  const newHead = { x: head.x + dir.x, y: head.y + dir.y };

  // Wall collision
  if (newHead.x < 0 || newHead.x >= state.cols || newHead.y < 0 || newHead.y >= state.rows) {
    return { ...state, direction: dir, gameOver: true };
  }

  // Self collision
  if (state.snake.some(({ x, y }) => x === newHead.x && y === newHead.y)) {
    return { ...state, direction: dir, gameOver: true };
  }

  const ate = newHead.x === state.food.x && newHead.y === state.food.y;
  const newSnake = [newHead, ...state.snake];
  if (!ate) newSnake.pop();

  return {
    ...state,
    snake: newSnake,
    direction: dir,
    food: ate ? placeFood(newSnake, state.cols, state.rows) : state.food,
    score: ate ? state.score + 1 : state.score,
    gameOver: false,
  };
}
