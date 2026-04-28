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
 * Background layers used to build the game world.
 *
 * Each group of images represents one full screen (720px width).
 * By placing them next to each other (x = -720, 0, 720),
 * we create a continuous background.
 *
 * This allows the world to scroll later,
 * without leaving empty space on the screen.
 */
let backgroundObjects = [
  // First screen (left side, off-screen)
  new BackgroundObject("assets/img/background/layers/air.png", -720, 0),
  new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", -720, 0),
  new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", -720, 0),
  new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", -720, 0),
  new BackgroundObject("assets/img/background/layers/4_clouds/full.png", -720, 0),

  // Second screen (visible start area)
  new BackgroundObject("assets/img/background/layers/air.png", 0, 0),
  new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 0, 0),
  new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 0, 0),
  new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 0, 0),
  new BackgroundObject("assets/img/background/layers/4_clouds/full.png", 0, 0),

  // Third screen (right side)
  new BackgroundObject("assets/img/background/layers/air.png", 720, 0),
  new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 720, 0),
  new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 720, 0),
  new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 720, 0),
  new BackgroundObject("assets/img/background/layers/4_clouds/full.png", 720, 0),

  // Fourth screen (x = 1440)
  new BackgroundObject("assets/img/background/layers/air.png", 1440, 0),
  new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 1440, 0),
  new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 1440, 0),
  new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 1440, 0),
  new BackgroundObject("assets/img/background/layers/4_clouds/full.png", 1440, 0),
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
 * - reads keyboard input
 * - moves the character (left / right)
 * - updates direction (left / right facing)
 * - updates animation (walking / idle)
 * - handles jumping
 * - applies gravity
 * - draws the scene
 * - schedules the next frame
 */
function loop() {
  if (keyboardState.RIGHT) {
    character.moveRight();

    // Character faces right
    character.otherDirection = false;

    character.playWalkingAnimation();

  } else if (keyboardState.LEFT) {
    // Prevent moving beyond the left edge (x >= 0)
    if (character.x > 0) {
      character.moveLeft();
    }

    // Character faces left
    character.otherDirection = true;

    character.playWalkingAnimation();

  } else {
    // No movement → show idle image
    character.showIdleImage();
  }

  // Jump only if the character is on the ground
  if (keyboardState.SPACE && !character.isAboveGround()) {
    character.jump();
  }

  // Apply gravity (vertical movement)
  character.updateGravity();

  draw();
  requestAnimationFrame(loop);
}

/**
 * Draws the current game scene.
 *
 * Steps:
 * - clears the canvas
 * - moves the camera (follows the character)
 * - draws background layers
 * - draws the character
 * - restores the original canvas state
 */
function draw() {
  // Clear the entire canvas before drawing a new frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Save the current canvas state
  ctx.save();

  /**
   * Move the camera so the character stays near the center.
   *
   * Explanation:
   * - character.x → position of the player
   * - -character.x → move the world in the opposite direction
   * - +100 → offset so the character is not exactly centered
   */
  const cameraX = Math.max(0, character.x - 100);
  ctx.translate(-cameraX, 0);
  // Draw all background layers (world)
  backgroundObjects.forEach((bg) => bg.draw(ctx));

  // Draw the character on top of the background
  character.draw(ctx);

  // Restore the original canvas state (reset camera)
  ctx.restore();
}

init();
