/**
 * Main game script.
 *
 * This file connects everything together:
 * - gets the canvas
 * - creates the keyboard state
 * - creates the character
 * - listens for keyboard input
 * - starts the game loop
 */

let canvas;
let ctx;
let keyboardState = new Keyboard();
let character;
/**
 * Initializes the game.
 *
 * This function runs once at the start.
 * It prepares the canvas and creates the character.
 */
function init() {
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

  character = new Character();

  character.img.onload = function () {
    loop();
  };
}
/**
 * Listens for pressed keys.
 *
 * When a key is pressed, its state becomes true.
 */
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") keyboardState.RIGHT = true;
  if (e.key === "ArrowLeft") keyboardState.LEFT = true;
  if (e.key === " ") keyboardState.SPACE = true;
});
/**
 * Listens for released keys.
 *
 * When a key is released, its state becomes false.
 */
window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") keyboardState.RIGHT = false;
  if (e.key === "ArrowLeft") keyboardState.LEFT = false;
  if (e.key === " ") keyboardState.SPACE = false;
});
/**
 * Main game loop.
 *
 * It checks the keyboard state,
 * moves the character,
 * redraws the canvas,
 * and then repeats itself.
 */
function loop() {
  if (keyboardState.RIGHT) {
    character.moveRight();
  }

  if (keyboardState.LEFT) {
    character.moveLeft();
  }

  if (keyboardState.SPACE && !character.isAboveGround()) {
    character.jump();
  }

  draw();
  requestAnimationFrame(loop);
}
/**
 * Draws the current game state on the canvas.
 */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  character.draw(ctx);
}

init();
