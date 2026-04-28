/**
 * Main game script.
 *
 * Connects the canvas, keyboard input,
 * character, and game loop.
 */

let canvas;
let ctx;
let keyboardState = new Keyboard();
let character;

/**
 * Initializes the game.
 * Creates the canvas context and the character.
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
 * Updates keyboard state when a key is pressed.
 */
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") keyboardState.RIGHT = true;
  if (e.key === "ArrowLeft") keyboardState.LEFT = true;
  if (e.key === " ") keyboardState.SPACE = true;
});

/**
 * Updates keyboard state when a key is released.
 */
window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") keyboardState.RIGHT = false;
  if (e.key === "ArrowLeft") keyboardState.LEFT = false;
  if (e.key === " ") keyboardState.SPACE = false;
});

/**
 * Main game loop.
 *
 * Runs every frame and controls the game:
 * - reads keyboard input
 * - moves the character (left / right / jump)
 * - updates character animation (walk / idle)
 * - applies gravity every frame (jump → fall)
 * - draws the current frame
 * - schedules the next frame
 */
function loop() {
  if (keyboardState.RIGHT) {
    character.moveRight();
    character.playWalkingAnimation();
  } else if (keyboardState.LEFT) {
    character.moveLeft();
    character.playWalkingAnimation();
  } else {
    character.showIdleImage();
  }

  if (keyboardState.SPACE && !character.isAboveGround()) {
    character.jump();
  }

  character.updateGravity();

  draw();
  requestAnimationFrame(loop);
}

/**
 * Clears the canvas and draws the current game state.
 */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  character.draw(ctx);
}

init();
