/**
 * Main game script for setup, input handling, game updates, rendering, and UI flow.
 */
let canvas;
let ctx;
let keyboardState = new Keyboard();
let animationFrameId = null;
let character;
const worldEnd = 2260;
const GAME_OVER_DELAY_MS = 900;
const WIN_DELAY_MS = 1000;
const CAMERA_X_OFFSET = 100;
const CHICKEN_STOMP_TOLERANCE = 40;
const ENDBOSS_BOTTLE_DAMAGE = 20;
const THROWN_BOTTLE_X_OFFSET = 100;
const THROWN_BOTTLE_Y_OFFSET = 120;
const BACKGROUND_MUSIC_VOLUME = 0.06;
const BOTTLE_OUT_OF_BOUNDS_LEFT = -200;
const BOTTLE_OUT_OF_BOUNDS_RIGHT_MARGIN = 400;
const BOTTLE_OUT_OF_BOUNDS_BOTTOM_MARGIN = 200;
const COIN_HITBOX_HORIZONTAL_INSET = 35;
const COIN_HITBOX_TOP_OFFSET = 10;
const COIN_HITBOX_BOTTOM_OFFSET = 90;
const COIN_STATUS_PERCENT_PER_COIN = 20;
let statusBar;
let gameOver = false;
let gameWon = false;
let winTimeoutId = null;
let deathAnimationStarted = false;
let gameOverTimeoutId = null;
let bottleStatusBar;
const maxBottleCount = 9;
let isMuted = localStorage.getItem("isMuted") === "true";
const backgroundMusic = new Audio("assets/audio/background/background-game-music.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = BACKGROUND_MUSIC_VOLUME;
backgroundMusic.muted = isMuted;
const loseSound = new Audio("assets/audio/lose/game-over.mp3");
const winSound = new Audio("assets/audio/win/win-sound.mp3");
const bottleCollectSound = new Audio("assets/audio/collectibles/bottleCollectSound.wav");
const coinCollectSound = new Audio("assets/audio/collectibles/collectSound.wav");
const bottleBreakSound = new Audio("assets/audio/throwable/bottleBreak.mp3");
const characterDamageSound = new Audio("assets/audio/character/characterDamage.mp3");
const characterJumpSound = new Audio("assets/audio/character/characterJump.wav");

/**
 * Background layers for the scrolling game world.
 */
let backgroundObjects = [
  // First screen (left side, off-screen)
  new BackgroundObject("assets/img/background/layers/air.png", -720, 0),
  new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", -720, 0),
  new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", -720, 0),
  new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", -720, 0),
  new Cloud(-720, 0),
  // Second screen (visible start area)
  new BackgroundObject("assets/img/background/layers/air.png", 0, 0),
  new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 0, 0),
  new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 0, 0),
  new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 0, 0),
  new Cloud(0, 0),
  // Third screen (right side)
  new BackgroundObject("assets/img/background/layers/air.png", 720, 0),
  new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 720, 0),
  new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 720, 0),
  new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 720, 0),
  new Cloud(720, 0),
  // Fourth screen (x = 1440)
  new BackgroundObject("assets/img/background/layers/air.png", 1440, 0),
  new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 1440, 0),
  new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 1440, 0),
  new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 1440, 0),
  new Cloud(1440, 0),
  // Fifth screen (x = 2160)
  new BackgroundObject("assets/img/background/layers/air.png", 2160, 0),
  new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 2160, 0),
  new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 2160, 0),
  new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 2160, 0),
  new Cloud(2160, 0),
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
 * Prepares a new game session.
 *
 * @returns {void}
 */
function prepareNewGame() {
  stopGameLoop();
  clearThrowableObjects();
}

/**
 * Initializes the game canvas and context.
 *
 * @returns {void}
 */
function initCanvas() {
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");
}

/**
 * Creates the player character.
 *
 * @returns {void}
 */
function createCharacter() {
  character = new Character();
}

/**
 * Creates the chicken enemies.
 *
 * @returns {void}
 */
function createChickens() {
  chickens = [
    new Chicken(1200, "normal"),
    new Chicken(1500, "small"),
    new Chicken(1800, "normal"),
  ];
}

/**
 * Creates collectible bottles and resets the bottle counter.
 *
 * @returns {void}
 */
function createBottles() {
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
}

/**
 * Creates collectible coins and resets the coin counter.
 *
 * @returns {void}
 */
function createCoins() {
  coins = [
    new Coin(430, 190),
    new Coin(680, 140),
    new Coin(920, 210),
    new Coin(1180, 155),
    new Coin(1460, 185),
    new Coin(1700, 130),
  ];
  coinCount = 0;
}

/**
 * Creates all status bars.
 *
 * @returns {void}
 */
function createStatusBars() {
  statusBar = new StatusBar();
  bottleStatusBar = new BottleStatusBar();
  coinStatusBar = new CoinStatusBar();
}

/**
 * Creates the endboss and its status bar.
 *
 * @returns {void}
 */
function createEndboss() {
  endboss = new Endboss();
  endbossStatusBar = new EndbossStatusBar();
}

/**
 * Initializes the game.
 *
 * @returns {void}
 */
function init() {
  prepareNewGame();
  initCanvas();
  createCharacter();
  createChickens();
  createBottles();
  createCoins();
  createStatusBars();
  createEndboss();
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
 * Handles the character death state.
 *
 * @returns {boolean} True if the death state was handled.
 */
function handleDeathState() {
  if (!character.isDead()) {
    return false;
  }
  if (!deathAnimationStarted) {
    deathAnimationStarted = true;
    character.currentImage = 0;
    character.animationCounter = 0;
    gameOverTimeoutId = setTimeout(() => {
      gameOver = true;
      showGameOver();
    }, GAME_OVER_DELAY_MS);
  }
  character.playDeadAnimation();
  draw();
  if (!gameOver) {
    animationFrameId = requestAnimationFrame(loop);
  }
  return true;
}

/**
 * Updates the character inactivity timer.
 *
 * @returns {void}
 */
function updateCharacterActivity() {
  if (isPlayerActive()) {
    character.resetInactivityTimer();
  }
}

/**
 * Moves the character to the right and plays walking animation.
 *
 * @returns {void}
 */
function moveCharacterRight() {
  character.moveRight();
  character.otherDirection = false;
  character.playWalkingAnimation();
}

/**
 * Moves the character to the left and plays walking animation.
 *
 * @returns {void}
 */
function moveCharacterLeft() {
  if (character.x > 0) {
    character.moveLeft();
  }
  character.otherDirection = true;
  character.playWalkingAnimation();
}

/**
 * Updates character animation and horizontal movement.
 *
 * @returns {void}
 */
function updateCharacterAnimation() {
  if (character.isHurt) {
    character.playHurtAnimation();
  } else if (character.isAboveGround()) {
    character.playJumpAnimation();
  } else if (keyboardState.RIGHT && character.x < worldEnd) {
    moveCharacterRight();
  } else if (keyboardState.LEFT) {
    moveCharacterLeft();
  } else if (character.isLongIdle()) {
    character.showLongIdleImage();
  } else {
    character.showIdleImage();
  }
}

/**
 * Handles character jump input and jump sound.
 *
 * @returns {void}
 */
function handleCharacterJump() {
  if (keyboardState.SPACE && !character.isAboveGround()) {
    playSound(characterJumpSound);
    character.jump();
  }
}

/**
 * Updates character animation, jumping, and gravity.
 *
 * @returns {void}
 */
function updateCharacter() {
  updateCharacterAnimation();
  handleCharacterJump();
  character.updateGravity();
}

/**
 * Updates all enemies.
 *
 * @returns {void}
 */
function updateEnemies() {
  chickens.forEach((chicken) => {
    chicken.update();
  });
  endboss.update(character.x);
}

/**
 * Updates all moving cloud objects.
 *
 * @returns {void}
 */
function updateClouds() {
  backgroundObjects.forEach((bg) => {
    if (bg instanceof Cloud) {
      bg.update();
    }
  });
}

/**
 * Plays the character damage sound from the beginning.
 *
 * @returns {void}
 */
function playCharacterDamageSound() {
  playSound(characterDamageSound);
}

/**
 * Handles jumping on a chicken.
 *
 * @param {Chicken} chicken - The chicken hit from above.
 * @returns {void}
 */
function handleChickenStomp(chicken) {
  chicken.die();
  character.speedY = 10;
}

/**
 * Damages the character after touching a chicken.
 *
 * @returns {void}
 */
function damageCharacterFromChicken() {
  const oldHealth = character.health;
  character.takeDamage();
  if (character.health < oldHealth) {
    playCharacterDamageSound();
  }
  statusBar.setPercentage(character.health);
}

/**
 * Handles one chicken collision with the character.
 *
 * @param {Chicken} chicken - The chicken to check.
 * @returns {void}
 */
function handleChickenCollision(chicken) {
  if (!chicken.isDead && isJumpingOnChicken(chicken)) {
    handleChickenStomp(chicken);
  } else if (!chicken.isDead && character.isColliding(chicken)) {
    damageCharacterFromChicken();
  }
}

/**
 * Checks collisions between the character and chickens.
 *
 * @returns {void}
 */
function checkChickenCollisions() {
  chickens.forEach((chicken) => {
    handleChickenCollision(chicken);
  });
}

/**
 * Checks all character and enemy collisions.
 *
 * @returns {void}
 */
function handleCollisions() {
  checkChickenCollisions();
  checkCharacterEndbossCollision();
}

/**
 * Updates collectibles, thrown bottles, and bottle collisions.
 *
 * @returns {void}
 */
function updateGameObjects() {
  collectBottles();
  collectCoins();
  throwBottle();
  checkBottleChickenCollision();
  checkBottleEndbossCollision();
  updateBottleSplashes();
  removeMissedBottles();
}

/**
 * Updates win condition and removes inactive enemies.
 *
 * @returns {void}
 */
function updateGameProgress() {
  checkWinCondition();
  removeDeadChickens();
}

/**
 * Updates all game state for one frame.
 *
 * @returns {void}
 */
function updateFrame() {
  updateCharacterActivity();
  updateCharacter();
  updateEnemies();
  updateClouds();
  handleCollisions();
  updateGameObjects();
  updateGameProgress();
}

/**
 * Main game loop.
 *
 * Runs once per animation frame.
 *
 * @returns {void}
 */
function loop() {
  if (gameWon) {
    return;
  }

  if (handleDeathState()) {
    return;
  }

  updateFrame();
  draw();
  animationFrameId = requestAnimationFrame(loop);
}

/**
 * Clears the whole canvas.
 *
 * @returns {void}
 */
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Calculates the camera x position.
 *
 * @returns {number} The camera x position.
 */
function getCameraX() {
  return Math.max(0, character.x - CAMERA_X_OFFSET);
}

/**
 * Applies the camera translation to the canvas context.
 *
 * @returns {void}
 */
function applyCameraTransform() {
  ctx.translate(-getCameraX(), 0);
}

/**
 * Draws all background objects.
 *
 * @returns {void}
 */
function drawBackgroundObjects() {
  backgroundObjects.forEach((bg) => bg.draw(ctx));
}

/**
 * Draws collectible and throwable objects.
 *
 * @returns {void}
 */
function drawCollectibleObjects() {
  bottles.forEach((bottle) => {
    bottle.draw(ctx);
  });

  throwableObjects.forEach((bottle) => {
    bottle.draw(ctx);
  });

  coins.forEach((coin) => {
    coin.draw(ctx);
  });
}

/**
 * Draws enemy objects.
 *
 * @returns {void}
 */
function drawEnemyObjects() {
  chickens.forEach((chicken) => {
    chicken.draw(ctx);
  });

  endboss.draw(ctx);
}

/**
 * Draws the character when visible.
 *
 * @returns {void}
 */
function drawCharacterIfVisible() {
  if (character.visible) {
    character.draw(ctx);
  }
}

/**
 * Draws all game objects inside the moving world.
 *
 * @returns {void}
 */
function drawWorld() {
  ctx.save();
  applyCameraTransform();
  drawBackgroundObjects();
  drawCollectibleObjects();
  drawEnemyObjects();
  drawCharacterIfVisible();
  ctx.restore();
}

/**
 * Draws fixed UI elements.
 *
 * @returns {void}
 */
function drawFixedUi() {
  statusBar.draw(ctx);
  bottleStatusBar.draw(ctx);
  coinStatusBar.draw(ctx);
  if (character.x >= endboss.activationX) {
    endbossStatusBar.draw(ctx);
  }
}

/**
 * Draws the current game frame.
 *
 * @returns {void}
 */
function draw() {
  clearCanvas();
  drawWorld();
  drawFixedUi();
}

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
    winTimeoutId = setTimeout(showWinScreen, WIN_DELAY_MS);
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
 * Plays a short sound effect from the beginning.
 *
 * @param {HTMLAudioElement} sound - The sound to play.
 * @returns {void}
 */
function playSound(sound) {
  sound.currentTime = 0;
  sound.muted = isMuted;
  sound.play();
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
  playSound(loseSound);
}

/**
 * Plays the win sound from the beginning.
 *
 * @returns {void}
 */
function playWinSound() {
  playSound(winSound);
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
  return character.isColliding(chicken) &&
    character.speedY < 0 &&
    characterFeet <= chickenTop + CHICKEN_STOMP_TOLERANCE;
}

/**
 * Handles collecting a bottle.
 *
 * @returns {void}
 */
function handleBottleCollect() {
  bottleCount++;
  bottleStatusBar.setPercentage((bottleCount / maxBottleCount) * 100);
  playSound(bottleCollectSound);
}

/**
 * Checks if the character collects a bottle.
 *
 * @returns {void}
 */
function collectBottles() {
  bottles = bottles.filter((bottle) => {
    if (character.isColliding(bottle)) {
      handleBottleCollect();
      return false;
    }

    return true;
  });
}

/**
 * Gets the character bounds for coin collection.
 *
 * @returns {{left: number, right: number, top: number, bottom: number}} The character collection bounds.
 */
function getCharacterCoinBounds() {
  return {
    left: character.x + COIN_HITBOX_HORIZONTAL_INSET,
    right: character.x + character.width - COIN_HITBOX_HORIZONTAL_INSET,
    top: character.y + COIN_HITBOX_TOP_OFFSET,
    bottom: character.y + COIN_HITBOX_BOTTOM_OFFSET,
  };
}

/**
 * Gets the center position of a coin.
 *
 * @param {Coin} coin - The coin to check.
 * @returns {{x: number, y: number}} The coin center position.
 */
function getCoinCenter(coin) {
  return {
    x: coin.x + coin.width / 2,
    y: coin.y + coin.height / 2,
  };
}

/**
 * Checks if the character collects a coin with the upper body while jumping.
 *
 * @param {Coin} coin - The coin to check.
 * @returns {boolean} True when the coin center touches the character's upper body while airborne.
 */
function isCollectingCoin(coin) {
  const characterBounds = getCharacterCoinBounds();
  const coinCenter = getCoinCenter(coin);

  return character.isAboveGround() &&
    coinCenter.x > characterBounds.left &&
    coinCenter.x < characterBounds.right &&
    coinCenter.y > characterBounds.top &&
    coinCenter.y < characterBounds.bottom;
}

/**
 * Handles collecting a coin.
 *
 * @returns {void}
 */
function handleCoinCollect() {
  coinCount++;
  coinStatusBar.setPercentage(Math.min(100, coinCount * COIN_STATUS_PERCENT_PER_COIN));
  playSound(coinCollectSound);
}

/**
 * Checks if the character collects a coin.
 *
 * @returns {void}
 */
function collectCoins() {
  coins = coins.filter((coin) => {
    if (isCollectingCoin(coin)) {
      handleCoinCollect();
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
  if (keyboardState.D && bottleCount > 0 && !character.isHurt) {
    const bottleX = character.otherDirection ? character.x : character.x + THROWN_BOTTLE_X_OFFSET;
    const bottle = new ThrowableObject(bottleX, character.y + THROWN_BOTTLE_Y_OFFSET, character.otherDirection);
    throwableObjects.push(bottle);
    bottleCount--;
    bottleStatusBar.setPercentage((bottleCount / maxBottleCount) * 100);
    keyboardState.D = false;
  }
}

/**
 * Updates splash animations for thrown bottles.
 *
 * @returns {void}
 */
function updateBottleSplashes() {
  throwableObjects.forEach((bottle) => {
    if (bottle.hasSplashed) {
      bottle.playSplashAnimation();
    }
  });
}

/**
 * Checks if a thrown bottle is outside the playable area.
 *
 * @param {ThrowableObject} bottle - The thrown bottle to check.
 * @returns {boolean} True if the bottle is outside the playable area.
 */
function isBottleOutOfBounds(bottle) {
  const isOutsideWorld = bottle.x < BOTTLE_OUT_OF_BOUNDS_LEFT ||
    bottle.x > worldEnd + BOTTLE_OUT_OF_BOUNDS_RIGHT_MARGIN;
  const isBelowCanvas = bottle.y > canvas.height + BOTTLE_OUT_OF_BOUNDS_BOTTOM_MARGIN;
  return isOutsideWorld || isBelowCanvas;
}

/**
 * Stops a missed bottle before removing it from the game.
 *
 * @param {ThrowableObject} bottle - The thrown bottle to check.
 * @returns {void}
 */
function stopMissedBottleIfNeeded(bottle) {
  if (!bottle.markedForRemoval && !bottle.hasSplashed && isBottleOutOfBounds(bottle)) {
    bottle.stopMovement();
  }
}

/**
 * Checks if a thrown bottle should stay active.
 *
 * @param {ThrowableObject} bottle - The thrown bottle to check.
 * @returns {boolean} True if the bottle should stay in the game.
 */
function shouldKeepBottle(bottle) {
  if (bottle.markedForRemoval) {
    return false;
  }

  if (bottle.hasSplashed) {
    return true;
  }

  return !isBottleOutOfBounds(bottle);
}

/**
 * Stops missed bottles and removes inactive thrown bottles.
 *
 * @returns {void}
 */
function removeMissedBottles() {
  throwableObjects.forEach(stopMissedBottleIfNeeded);
  throwableObjects = throwableObjects.filter(shouldKeepBottle);
}

/**
 * Plays the bottle break sound from the beginning.
 *
 * @returns {void}
 */
function playBottleBreakSound() {
  playSound(bottleBreakSound);
}

/**
 * Handles a bottle hit on a chicken.
 *
 * @param {ThrowableObject} bottle - The thrown bottle.
 * @param {Chicken} chicken - The hit chicken.
 * @returns {void}
 */
function hitChickenWithBottle(bottle, chicken) {
  chicken.die();
  bottle.startSplash();
  playBottleBreakSound();
}

/**
 * Checks if a bottle hits any chicken.
 *
 * @param {ThrowableObject} bottle - The thrown bottle.
 * @returns {void}
 */
function checkBottleHitChicken(bottle) {
  chickens.forEach((chicken) => {
    if (!chicken.isDead && bottle.isColliding(chicken)) {
      hitChickenWithBottle(bottle, chicken);
    }
  });
}

/**
 * Checks if a bottle can hit the endboss.
 *
 * @param {ThrowableObject} bottle - The thrown bottle.
 * @returns {boolean} True if the bottle can hit the endboss.
 */
function canBottleHitEndboss(bottle) {
  return !endboss.isDead &&
    bottle.isColliding(endboss) &&
    endboss.health > 0;
}

/**
 * Handles a bottle hit on the endboss.
 *
 * @param {ThrowableObject} bottle - The thrown bottle.
 * @returns {void}
 */
function hitEndbossWithBottle(bottle) {
  bottle.startSplash();
  endboss.takeDamage(ENDBOSS_BOTTLE_DAMAGE);
  endbossStatusBar.setPercentage(endboss.health);
  playBottleBreakSound();
}

/**
 * Checks collisions between thrown bottles and chickens.
 *
 * @returns {void}
 */
function checkBottleChickenCollision() {
  throwableObjects.forEach((bottle) => {
    if (bottle.hasSplashed) {
      return;
    }
    checkBottleHitChicken(bottle);
  });
}

/**
 * Checks collisions between thrown bottles and the endboss.
 *
 * @returns {void}
 */
function checkBottleEndbossCollision() {
  throwableObjects.forEach((bottle) => {
    if (bottle.hasSplashed) {
      return;
    }
    if (canBottleHitEndboss(bottle)) {
      hitEndbossWithBottle(bottle);
    }
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
      playCharacterDamageSound();
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
 * Resets main game state flags.
 *
 * @returns {void}
 */
function resetGameFlags() {
  gameOver = false;
  gameWon = false;
  deathAnimationStarted = false;
}

/**
 * Stops all game end and background sounds.
 *
 * @returns {void}
 */
function stopGameSounds() {
  stopEndSounds();
  stopBackgroundMusic();
}

/**
 * Hides win and lose screens.
 *
 * @returns {void}
 */
function hideEndScreens() {
  document.getElementById("lose-screen").classList.add("hidden");
  hideWinScreen();
}

/**
 * Shows the start screen and enables the start button.
 *
 * @returns {void}
 */
function showStartScreen() {
  document.getElementById("start-screen").style.display = "block";
  document.getElementById("start-button").disabled = false;
}

/**
 * Clears the canvas if it is ready.
 *
 * @returns {void}
 */
function clearCanvasIfReady() {
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

/**
 * Starts the game after the user clicks the start button.
 *
 * @returns {void}
 */
function startGame() {
  const startButton = document.getElementById("start-button");
  const startScreen = document.getElementById("start-screen");
  resetGameFlags();
  clearGameOverTimeout();
  clearWinTimeout();
  hideEndScreens();
  startButton.disabled = true;
  startScreen.style.display = "none";
  init();
  startBackgroundMusic();
}

/**
 * Restarts the game after losing without reloading the page.
 *
 * @returns {void}
 */
function restartGame() {
  resetGameFlags();
  clearGameOverTimeout();
  clearWinTimeout();
  stopGameSounds();
  keyboardState = new Keyboard();
  hideEndScreens();
  init();
  startBackgroundMusic();
}

/**
 * Returns the player to the start screen.
 *
 * @returns {void}
 */
function backToMenu() {
  stopGameLoop();
  clearThrowableObjects();
  resetGameFlags();
  clearWinTimeout();
  clearGameOverTimeout();
  stopGameSounds();
  keyboardState = new Keyboard();
  hideEndScreens();
  showStartScreen();
  clearCanvasIfReady();
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
