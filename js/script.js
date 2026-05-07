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
let animationFrameId = null;
let character;
const worldEnd = 2260; // Right boundary of the playable world.
let statusBar;
let gameOver = false; // Prevents the game over screen from being drawn multiple times.
const gameOverImg = new Image();
gameOverImg.src = "assets/img/screens/lose/game-over-pepe-pic.png";
let gameWon = false;
let winTimeoutId = null;
let deathAnimationStarted = false;
let gameOverTimeoutId = null;

let bottleStatusBar;
const maxBottleCount = 9;

let isMuted = localStorage.getItem("isMuted", true) === "true";

const backgroundMusic = new Audio("assets/audio/background/background-game-music.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.06;
backgroundMusic.muted = isMuted;

const loseSound = new Audio("assets/audio/lose/game-over.mp3");
const winSound = new Audio("assets/audio/win/win-sound.mp3");

const bottleCollectSound = new Audio("assets/audio/collectibles/bottleCollectSound.wav");
const coinCollectSound = new Audio("assets/audio/collectibles/collectSound.wav");
const bottleBreakSound = new Audio("assets/audio/throwable/bottleBreak.mp3");

const characterDamageSound = new Audio("assets/audio/character/characterDamage.mp3");
const characterJumpSound = new Audio("assets/audio/character/characterJump.wav");



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

let bottles = [];
let bottleCount = 0;

let throwableObjects = [];

let coins = [];
let coinCount = 0;
let coinStatusBar;

let endboss;
let endbossStatusBar;



/**
 * Initializes the game.
 *
 * Creates the canvas context, player character,
 * enemies, status bar, and starts the game loop.
 */
function init() {
  stopGameLoop();
  clearThrowableObjects();
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

  character = new Character();

  chickens = [
    new Chicken(1200, "normal"),
    new Chicken(1500, "small"),
    new Chicken(1800, "normal"),
  ];

  bottles = [
    new Bottle(350),
    new Bottle(650),
    new Bottle(950),
    new Bottle(1150),
    new Bottle(1350),
    new Bottle(1550),
    new Bottle(1750),
    new Bottle(1950),
    new Bottle(2100),
  ];
  bottleCount = 0;

  coins = [
    new Coin(430, 190),
    new Coin(680, 140),
    new Coin(920, 210),
    new Coin(1180, 155),
    new Coin(1460, 185),
    new Coin(1700, 130),
  ];

  coinCount = 0;

  statusBar = new StatusBar();
  bottleStatusBar = new BottleStatusBar();
  coinStatusBar = new CoinStatusBar();
  endboss = new Endboss();
  endbossStatusBar = new EndbossStatusBar();

  loop();
}

/**
 * Updates keyboard state when a key is pressed.
 */
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") keyboardState.RIGHT = true;
  if (e.key === "ArrowLeft") keyboardState.LEFT = true;
  if (e.key === " ") keyboardState.SPACE = true;
  if (e.key === "d" || e.key === "D") keyboardState.D = true;
});

/**
 * Updates keyboard state when a key is released.
 */
window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") keyboardState.RIGHT = false;
  if (e.key === "ArrowLeft") keyboardState.LEFT = false;
  if (e.key === " ") keyboardState.SPACE = false;
  if (e.key === "d" || e.key === "D") keyboardState.D = false;
});
/**
 * Stops the currently active game loop.
 */
function stopGameLoop() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}
/**
 * Stops and removes all active throwable bottles.
 */
function clearThrowableObjects() {
  throwableObjects.forEach((bottle) => {
    if (bottle.stopMovement) {
      bottle.stopMovement();
    }
  });

  throwableObjects = [];
}
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
  if (gameWon) {
    return;
  }
  // Stop the game loop when the character is dead.
  // The game over screen is shown only once.
  if (character.isDead()) {
    if (!deathAnimationStarted) {
      deathAnimationStarted = true;
      character.currentImage = 0;
      character.animationCounter = 0;

      gameOverTimeoutId = setTimeout(() => {
        gameOver = true;
        showGameOver();
      }, 900);
    }

    character.playDeadAnimation();
    draw();
    return;
  }
  if (isPlayerActive()) {
    character.resetInactivityTimer();
  }
  // Priority 1: hurt state (overrides all other animations)
  if (character.isHurt) {
    character.playHurtAnimation();

  } else if (character.isAboveGround()) {
    character.playJumpAnimation();

  } else if (keyboardState.RIGHT && character.x < worldEnd) {
    character.moveRight();
    character.otherDirection = false;
    character.playWalkingAnimation();

  } else if (keyboardState.LEFT) {
    if (character.x > 0) {
      character.moveLeft();
    }
    character.otherDirection = true;
    character.playWalkingAnimation();

  } else if (character.isLongIdle()) {
    character.showLongIdleImage();

  } else {
    character.showIdleImage();
  }

  // Jump (only when on ground)
  if (keyboardState.SPACE && !character.isAboveGround()) {
    characterJumpSound.currentTime = 0;
    characterJumpSound.play();
    character.jump();
  }

  // Apply gravity
  character.updateGravity();

  // Update enemies
  chickens.forEach((chicken) => {
    chicken.update();
  });

  endboss.update(character.x);

  chickens.forEach((chicken) => {
    if (!chicken.isDead && isJumpingOnChicken(chicken)) {
      chicken.die();
      character.speedY = 10;
    } else if (!chicken.isDead && character.isColliding(chicken)) {
      const oldHealth = character.health;
      character.takeDamage();

      if (character.health < oldHealth) {
        characterDamageSound.currentTime = 0;
        characterDamageSound.play();
      }

      statusBar.setPercentage(character.health);
    }
  });
  checkCharacterEndbossCollision();
  collectBottles();
  collectCoins();
  throwBottle();
  checkBottleChickenCollision();
  checkBottleEndbossCollision();
  removeMissedBottles();

  checkWinCondition();
  removeDeadChickens();

  draw();
  animationFrameId = requestAnimationFrame(loop);
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

  bottles.forEach((bottle) => {
    bottle.draw(ctx);
  });

  throwableObjects.forEach((bottle) => {
    bottle.draw(ctx);
  });

  coins.forEach((coin) => {
    coin.draw(ctx);
  });

  chickens.forEach((chicken) => {
    chicken.draw(ctx);
  });

  endboss.draw(ctx);

  // Draw the character only while it is visible.
  if (character.visible) {
    character.draw(ctx);
  }

  // Restore the original canvas state (reset camera)
  ctx.restore();

  // Draw fixed UI after restoring the canvas state.
  statusBar.draw(ctx);
  bottleStatusBar.draw(ctx);
  coinStatusBar.draw(ctx);
  endbossStatusBar.draw(ctx);
}
/**
 * Shows the game over screen.
 *
 * Adds a dark overlay and draws the game over image
 * over the full canvas. If the image is not loaded yet,
 * it waits until loading is complete before drawing.
 */
/**
 * Shows the lose screen overlay after the character dies.
 *
 * @returns {void}
 */
function showGameOver() {
  stopBackgroundMusic();
  playLoseSound();
  document.getElementById("lose-screen").classList.remove("hidden");
}
/**
 * Checks if the player has won after defeating the endboss.
 *
 * @returns {void}
 */
function checkWinCondition() {
  if (endboss.isDead && !gameWon && !winTimeoutId) {
    winTimeoutId = setTimeout(showWinScreen, 1000);
  }
}

/**
 * Shows the win screen after the endboss is defeated.
 *
 * @returns {void}
 */
function showWinScreen() {
  if (gameOver) {
    return;
  }

  gameWon = true;
  winTimeoutId = null;
  stopBackgroundMusic();
  playWinSound();
  document.getElementById("win-screen").classList.remove("hidden");
}
/**
 * Hides the win screen.
 *
 * @returns {void}
 */
function hideWinScreen() {
  document.getElementById("win-screen").classList.add("hidden");
}
/**
 * Clears the pending win timeout.
 *
 * @returns {void}
 */
function clearWinTimeout() {
  if (winTimeoutId) {
    clearTimeout(winTimeoutId);
    winTimeoutId = null;
  }
}
/**
 * Clears the pending game over timeout.
 *
 * @returns {void}
 */
function clearGameOverTimeout() {
  if (gameOverTimeoutId) {
    clearTimeout(gameOverTimeoutId);
    gameOverTimeoutId = null;
  }
}
/**
 * Updates the mute button icon based on the current mute state.
 *
 * @returns {void}
 */
function updateMuteButton() {
  const muteButton = document.getElementById("mute-button");
  muteButton.textContent = isMuted ? "🔇" : "🔊";
}
/**
 * Applies the current mute state to all sounds.
 *
 * @returns {void}
 */
function applyMuteState() {
  backgroundMusic.muted = isMuted;
  winSound.muted = isMuted;
  loseSound.muted = isMuted;
  bottleCollectSound.muted = isMuted;
  coinCollectSound.muted = isMuted;
  bottleBreakSound.muted = isMuted;
  characterDamageSound.muted = isMuted;
  characterJumpSound.muted = isMuted;
}
/**
 * Toggles the mute state and saves it in localStorage.
 *
 * @returns {void}
 */
function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem("isMuted", isMuted);
  applyMuteState();
  updateMuteButton();
}
/**
 * Starts the background music.
 *
 * @returns {void}
 */
function startBackgroundMusic() {
  backgroundMusic.muted = isMuted;
  applyMuteState();
  backgroundMusic.play();
}
/**
 * Stops and resets the background music.
 *
 * @returns {void}
 */
function stopBackgroundMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}
/**
 * Plays the lose sound from the beginning.
 *
 * @returns {void}
 */
function playLoseSound() {
  loseSound.currentTime = 0;
  loseSound.muted = isMuted;
  loseSound.play();
}
/**
 * Plays the win sound from the beginning.
 *
 * @returns {void}
 */
function playWinSound() {
  winSound.currentTime = 0;
  winSound.muted = isMuted;
  winSound.play();
}
/**
 * Stops and resets end screen sounds.
 *
 * @returns {void}
 */
function stopEndSounds() {
  loseSound.pause();
  loseSound.currentTime = 0;

  winSound.pause();
  winSound.currentTime = 0;
}
/**
 * Checks if the character lands on top of a chicken.
 *
 * @param {Chicken} chicken - The chicken to check.
 * @returns {boolean} True if the character hits the chicken from above while falling.
 */
function isJumpingOnChicken(chicken) {
  const characterFeet = character.y + character.height;
  const chickenTop = chicken.y;
  const landingTolerance = 40;

  return character.isColliding(chicken) &&
    character.speedY < 0 &&
    characterFeet <= chickenTop + landingTolerance;
}
/**
 * Checks if the character collects a bottle.
 *
 * Removes collected bottles from the world
 * and increases the bottle counter.
 *
 * @returns {void}
 */
function collectBottles() {
  bottles = bottles.filter((bottle) => {
    if (character.isColliding(bottle)) {
      bottleCount++;
      bottleStatusBar.setPercentage((bottleCount / maxBottleCount) * 100);
      bottleCollectSound.currentTime = 0;
      bottleCollectSound.play();
      return false;
    }

    return true;
  });
}
/**
 * Checks if the character collects a coin with the upper body while jumping.
 *
 * @param {Coin} coin - The coin to check.
 * @returns {boolean} True when the coin center touches the character's upper body while airborne.
 */
function isCollectingCoin(coin) {
  const characterLeft = character.x + 35;
  const characterRight = character.x + character.width - 35;
  const characterTop = character.y + 10;
  const characterBottom = character.y + 90;

  const coinCenterX = coin.x + coin.width / 2;
  const coinCenterY = coin.y + coin.height / 2;

  return character.isAboveGround() &&
    coinCenterX > characterLeft &&
    coinCenterX < characterRight &&
    coinCenterY > characterTop &&
    coinCenterY < characterBottom;
}
/**
 * Checks if the character collects a coin.
 *
 * Removes collected coins from the world
 * and increases the coin counter.
 *
 * @returns {void}
 */
function collectCoins() {
  coins = coins.filter((coin) => {
    if (isCollectingCoin(coin)) {
      coinCount++;
      coinStatusBar.setPercentage(Math.min(100, coinCount * 20));
      coinCollectSound.currentTime = 0;
      coinCollectSound.play();
      return false;
    }

    return true;
  });
}
/**
 * Throws a bottle when the D key is pressed and bottles are available.
 *
 * @returns {void}
 */
function throwBottle() {
  if (keyboardState.D && bottleCount > 0) {
    const bottleX = character.otherDirection ? character.x : character.x + 100;
    const bottle = new ThrowableObject(bottleX, character.y + 120, character.otherDirection);
    throwableObjects.push(bottle);
    bottleCount--;
    bottleStatusBar.setPercentage((bottleCount / maxBottleCount) * 100);
    keyboardState.D = false;
  }
}
/**
 * Removes thrown bottles that left the playable area.
 *
 * @returns {void}
 */
function removeMissedBottles() {
  throwableObjects = throwableObjects.filter((bottle) => {
    const isOutsideWorld = bottle.x < -200 || bottle.x > worldEnd + 400;
    const isBelowCanvas = bottle.y > canvas.height + 200;

    if (isOutsideWorld || isBelowCanvas) {
      bottle.stopMovement();
      return false;
    }

    return true;
  });
}
/**
 * Checks collisions between thrown bottles and chickens.
 *
 * Kills the chicken and removes the thrown bottle after a hit.
 *
 * @returns {void}
 */
function checkBottleChickenCollision() {
  throwableObjects = throwableObjects.filter((bottle) => {
    let hasHitChicken = false;

    chickens.forEach((chicken) => {
      if (!chicken.isDead && bottle.isColliding(chicken)) {
        chicken.die();
        hasHitChicken = true;
      }
    });

    if (hasHitChicken) {
      bottle.stopMovement();
      bottleBreakSound.currentTime = 0;
      bottleBreakSound.play();
    }

    return !hasHitChicken;
  });
}
/**
 * Checks collisions between thrown bottles and the endboss.
 *
 * Reduces endboss health, updates the endboss status bar,
 * and removes the thrown bottle after a hit.
 *
 * @returns {void}
 */
function checkBottleEndbossCollision() {
  throwableObjects = throwableObjects.filter((bottle) => {
    if (!endboss.isDead && bottle.isColliding(endboss) && endboss.health > 0) {
      bottle.stopMovement();
      endboss.takeDamage(20);
      endbossStatusBar.setPercentage(endboss.health);
      bottleBreakSound.currentTime = 0;
      bottleBreakSound.play();
      return false;
    }

    return true;
  });
}
/**
 * Checks collision between the character and the endboss.
 *
 * @returns {void}
 */
function checkCharacterEndbossCollision() {
  if (!endboss.isDead && character.isColliding(endboss)) {
    const oldHealth = character.health;
    character.takeDamage();

    if (character.health < oldHealth) {
      characterDamageSound.currentTime = 0;
      characterDamageSound.play();
    }

    statusBar.setPercentage(character.health);
  }
}
/**
 * Removes chickens that finished showing their dead image.
 *
 * @returns {void}
 */
function removeDeadChickens() {
  chickens = chickens.filter((chicken) => !chicken.markedForRemoval);
}
/**
 * Starts the game after the user clicks the start button.
 */
function startGame() {
  const startButton = document.getElementById("start-button");
  const startScreen = document.getElementById("start-screen");

  startButton.disabled = true;
  startScreen.style.display = "none";

  init();
  startBackgroundMusic();
}


/**
 * Restarts the game after losing without reloading the page.
 *
 * Resets the game state, hides the lose screen,
 * and initializes a new game session.
 *
 * @returns {void}
 */
function restartGame() {
  gameOver = false;
  gameWon = false;
  deathAnimationStarted = false;
  clearGameOverTimeout();
  clearWinTimeout();
  stopEndSounds();
  stopBackgroundMusic();
  keyboardState = new Keyboard();

  document.getElementById("lose-screen").classList.add("hidden");
  hideWinScreen();

  init();
  startBackgroundMusic();
}

/**
 * Returns the player to the start screen after losing.
 *
 * Resets the lose state, hides the lose screen,
 * shows the start screen again, and enables the start button.
 *
 * @returns {void}
 */
function backToMenu() {
  stopGameLoop();
  clearThrowableObjects();

  gameOver = false;
  gameWon = false;
  deathAnimationStarted = false;
  clearWinTimeout();
  clearGameOverTimeout();
  stopEndSounds();
  stopBackgroundMusic();
  keyboardState = new Keyboard();

  document.getElementById("lose-screen").classList.add("hidden");
  hideWinScreen();
  document.getElementById("start-screen").style.display = "block";
  document.getElementById("start-button").disabled = false;

  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

/**
 * Checks if the player is pressing an action key.
 *
 * @returns {boolean} True if the player is currently active.
 */
function isPlayerActive() {
  return keyboardState.RIGHT ||
    keyboardState.LEFT ||
    keyboardState.SPACE ||
    keyboardState.D;
}
