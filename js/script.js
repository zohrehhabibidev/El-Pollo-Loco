/**
 * Main game script.
 *
 * Responsibilities:
 * - initialize canvas and rendering context
 * - create main game objects
 * - handle keyboard input
 * - run the main game loop
 * - update movement, gravity, enemies, and collisions
 * - draw the world and fixed UI elements
 */

let canvas;
let ctx;
let keyboardState = new Keyboard();
let character;
const worldEnd = 2160; // Right boundary of the playable world.
let statusBar;

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

  // Fifth screen (x = 2160)
  new BackgroundObject("assets/img/background/layers/air.png", 2160, 0),
  new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 2160, 0),
  new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 2160, 0),
  new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 2160, 0),
  new BackgroundObject("assets/img/background/layers/4_clouds/full.png", 2160, 0),
];

let chickens = [];

/**
 * Initializes the game.
 *
 * Creates the canvas context, player character,
 * enemies, status bar, and starts the game loop.
 */
function init() {
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

  character = new Character();
  chickens = [
    new Chicken(500, "normal"),
    new Chicken(800, "small"),
    new Chicken(1100, "normal"),
  ];
  statusBar = new StatusBar();

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
 * Runs once per animation frame.
 * Updates player movement, jumping, gravity,
 * enemy movement, collision damage, status bar,
 * and then redraws the scene.
 */
function loop() {
  if (keyboardState.RIGHT && character.x < worldEnd) {
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

  chickens.forEach((chicken) => {
    chicken.update();
  });

  // Check collisions between the character and each chicken.
  // If a collision happens, reduce health and update the status bar.
  chickens.forEach((chicken) => {
    if (character.isColliding(chicken)) {
      character.takeDamage();
      statusBar.setPercentage(character.health);
    }
  });

  draw();
  requestAnimationFrame(loop);
}

/**
 * Draws the current game frame.
 *
 * The world is drawn inside the camera translation.
 * UI elements, such as the status bar, are drawn after
 * ctx.restore() so they stay fixed on the screen.
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
  // Move the world to the left so the camera follows the character.
  backgroundObjects.forEach((bg) => bg.draw(ctx));

  chickens.forEach((chicken) => {
    chicken.draw(ctx);
  });

  // Draw the character on top of the background
  character.draw(ctx);

  // Restore the original canvas state (reset camera)
  ctx.restore();

  // Draw fixed UI after restoring the canvas state.
  statusBar.draw(ctx);
}

init();
