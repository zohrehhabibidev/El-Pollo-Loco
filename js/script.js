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
let gameOver = false; // Prevents the game over screen from being drawn multiple times.
const gameOverImg = new Image();
gameOverImg.src = "assets/img/screens/lose/game-over-pepe-pic.png";

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
 *
 * Handles:
 * - player movement and animation states
 * - jumping and gravity
 * - enemy updates
 * - collision detection and damage
 * - rendering
 */
function loop() {
  // Stop the game loop when the character is dead.
  // The game over screen is shown only once.
  if (character.isDead()) {
    if (!gameOver) {
      gameOver = true;
      character.visible = false;
      showGameOver();
    }
    return;
  }

  // Priority 1: hurt state (overrides all other animations)
  if (character.isHurt) {
    character.playHurtAnimation();

    // Priority 2: movement right
  } else if (keyboardState.RIGHT && character.x < worldEnd) {
    character.moveRight();
    character.otherDirection = false;
    character.playWalkingAnimation();

    // Priority 3: movement left
  } else if (keyboardState.LEFT) {
    if (character.x > 0) {
      character.moveLeft();
    }
    character.otherDirection = true;
    character.playWalkingAnimation();

    // Priority 4: idle
  } else {
    character.showIdleImage();
  }

  // Jump (only when on ground)
  if (keyboardState.SPACE && !character.isAboveGround()) {
    character.jump();
  }

  // Apply gravity
  character.updateGravity();

  // Update enemies
  chickens.forEach((chicken) => {
    chicken.update();
  });

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

  // Draw the character only while it is visible.
  if (character.visible) {
    character.draw(ctx);
  }

  // Restore the original canvas state (reset camera)
  ctx.restore();

  // Draw fixed UI after restoring the canvas state.
  statusBar.draw(ctx);
}
/**
 * Shows the game over screen.
 *
 * Adds a dark overlay and draws the game over image
 * over the full canvas. If the image is not loaded yet,
 * it waits until loading is complete before drawing.
 */
function showGameOver() {
  if (gameOverImg.complete) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gameOverImg, 0, 0, canvas.width, canvas.height);
  } else {
    gameOverImg.onload = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(gameOverImg, 0, 0, canvas.width, canvas.height);
    };
  }
}


init();
