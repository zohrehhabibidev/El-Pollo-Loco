/**
 * Main game script for setup, input handling, game updates, rendering, and UI flow.
 */
let canvas;
let ctx;
let world;
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
const DEBUG_HITBOXES = false;


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

let backgroundObjects = [];
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
 * Initializes the game canvas, creates the world, and syncs world objects.
 *
 * @returns {void}
 */
function initCanvas() {
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");
  world = new World(canvas, keyboardState);
  world.createWorld();
  syncWorldObjects();
}
/**
 * Copies world-owned objects into the current global game references.
 *
 * @returns {void}
 */
function syncWorldObjects() {
  character = world.character;
  chickens = world.chickens;
  bottles = world.bottles;
  coins = world.coins;
  backgroundObjects = world.backgroundObjects;
  endboss = world.endboss;
  statusBar = world.statusBar;
  bottleStatusBar = world.bottleStatusBar;
  coinStatusBar = world.coinStatusBar;
  endbossStatusBar = world.endbossStatusBar;
  bottleCount = world.bottleCount;
  coinCount = world.coinCount;
  throwableObjects = world.throwableObjects;
}

/**
 * Copies current legacy game references back into the world object.
 *
 * @returns {void}
 */
function syncWorldFromLegacyGlobals() {
  world.character = character;
  world.chickens = chickens;
  world.bottles = bottles;
  world.coins = coins;
  world.backgroundObjects = backgroundObjects;
  world.endboss = endboss;
  world.statusBar = statusBar;
  world.bottleStatusBar = bottleStatusBar;
  world.coinStatusBar = coinStatusBar;
  world.endbossStatusBar = endbossStatusBar;
  world.bottleCount = bottleCount;
  world.coinCount = coinCount;
  world.throwableObjects = throwableObjects;
}

/**
 * Initializes the game.
 *
 * @returns {void}
 */
function init() {
  prepareNewGame();
  initCanvas();
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
 *
 * @returns {void}
 */
function stopGameLoop() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

/**
 * Stops and removes all active throwable bottles.
 *
 * @returns {void}
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
      gameOverTimeoutId = null;
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
 * Plays the character damage sound from the beginning.
 *
 * @returns {void}
 */
function playCharacterDamageSound() {
  playSound(characterDamageSound);
}

/**
 * Updates collectibles, thrown bottles, and bottle collisions.
 *
 * @returns {void}
 */
function updateGameObjects() {
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

  world.updateFrame();
  syncWorldObjects();
  world.handleCollisions();
  syncWorldObjects();
  updateGameObjects();
  updateGameProgress();
  draw();
  animationFrameId = requestAnimationFrame(loop);
}

/**
 * Draws the current game frame.
 *
 * @returns {void}
 */
function draw() {
  syncWorldFromLegacyGlobals();
  world.draw();
}

/**
 * Shows the lose screen overlay after the character dies.
 *
 * @returns {void}
 */
function showGameOver() {
  stopBackgroundMusic();
  playLoseSound();
  hideMobileControls();
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
  hideMobileControls();
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
  hideMobileControls();
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
  keyboardState = new Keyboard();
  startButton.disabled = true;
  startScreen.style.display = "none";
  init();
  startBackgroundMusic();
  showMobileControls();
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
  showMobileControls();
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
  hideMobileControls();
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
