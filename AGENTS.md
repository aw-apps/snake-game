# AGENTS.md — Snake Game

## Goal
Replicate the classic Snake web game at https://doggy8088.github.io/snake-game/ as a standalone GitHub Pages site. Pure HTML/CSS/JS with ES Modules, no build tools, no dependencies.

## Tech Stack
- HTML5 Canvas for rendering
- Pure CSS (no frameworks)
- ES Modules (snake-logic.js + snake-game.js)
- GitHub Pages (root, main branch)

## Architecture
```
/
├── index.html        # Game UI shell
├── styles.css        # All styling
├── snake-logic.js    # Pure game logic (state machine, no DOM)
└── snake-game.js     # DOM wiring, canvas rendering, event handling
```

## Global Acceptance Criteria
- [ ] `index.html` loads with no console errors
- [ ] Snake moves automatically at ~140ms per tick
- [ ] Arrow keys and WASD control direction
- [ ] Snake cannot reverse direction (180°)
- [ ] Eating food grows the snake and increments score
- [ ] Hitting wall or self triggers Game Over
- [ ] Pause/Resume button works; Space key toggles pause
- [ ] Restart button resets game
- [ ] Touch direction buttons work on mobile
- [ ] Site is live at https://aw-apps.github.io/snake-game/
