/**
 * Main game script.
 *
 * Connects:
 * - canvas rendering
 * - keyboard input
 * - game objects (character, background)
 * - main game loop
 */

let canvas;
let ctx;
let keyboardState = new Keyboard();
let character;

/**
 * List of background layers.
 *
 * These images are drawn in order to create
 * a layered background (sky, clouds, ground, etc.).
 */
let backgroundObjects = [
  new BackgroundObject("assets/img/background/layers/air.png", 0, 0),
  new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 0, 0),
  new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 0, 0),
  new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 0, 0),
  new BackgroundObject("assets/img/background/layers/4_clouds/full.png", 0, 0),
];

/**
 * Initializes the game.
 *
 * - gets the canvas and context
 * - creates the character
 * - starts the game loop
 */
function init() {
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

  character = new Character();

  loop();
};

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
 * Runs every frame:
 * - reads input (keyboard)
 * - moves the character (left / right)
 * - updates animation (walking / idle)
 * - handles jumping
 * - applies gravity
 * - draws everything
 * - repeats the loop
 */
function loop() {
  if (keyboardState.RIGHT) {
    character.moveRight();
    character.playWalkingAnimation();
  } else if (keyboardState.LEFT) {
    character.moveLeft();
    // character.playWalkingAnimation();
  } else {
    character.showIdleImage();
  }

  // Jump only if the character is on the ground
  if (keyboardState.SPACE && !character.isAboveGround()) {
    character.jump();
  }

  // Update vertical movement (gravity)
  character.updateGravity();

  draw();
  requestAnimationFrame(loop);
}

/**
 * Draws the current game state.
 *
 * - clears the canvas
 * - draws background layers
 * - draws the character
 */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw all background layers
  backgroundObjects.forEach((bg) => {
    bg.draw(ctx);
  });

  // Draw the character on top
  character.draw(ctx);
}

init();
