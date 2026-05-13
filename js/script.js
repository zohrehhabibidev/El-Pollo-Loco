/**
 * Main game script for setup, input handling, game updates, rendering, and UI flow.
 */
// World and input state.
let world;
let keyboardState = new Keyboard();

// Active animation frame ID.
let animationFrameId = null;
const GAME_OVER_DELAY_MS = 900;
const WIN_DELAY_MS = 1000;
const BACKGROUND_MUSIC_VOLUME = 0.06;

// Game lifecycle flags and timeout IDs.
let gameOver = false;
let gameWon = false;
let winTimeoutId = null;
let deathAnimationStarted = false;
let gameOverTimeoutId = null;

// Audio objects and mute state.
let isMuted = localStorage.getItem("isMuted") === "true";
const backgroundMusic = new Audio("assets/audio/background/background-game-music.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = BACKGROUND_MUSIC_VOLUME;
backgroundMusic.muted = isMuted;
const loseSound = new Audio("assets/audio/lose/game-over.mp3");
const winSound = new Audio("assets/audio/win/win-sound.mp3");

/**
 * Stops the previous game loop and clears active throwable bottles before creating a new session.
 *
 * @returns {void}
 */
function prepareNewGame() {
  stopGameLoop();
  clearThrowableObjects();
}

/**
 * Creates a new `World` instance, stores it globally, and populates it with game objects.
 *
 * @returns {void}
 */
function initWorld() {
  const canvas = document.getElementById("game-canvas");
  world = new World(canvas, keyboardState);
  world.createWorld();
}

/**
 * Prepares the previous session, creates a fresh world, and starts the game loop.
 *
 * @returns {void}
 */
function init() {
  prepareNewGame();
  initWorld();
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
  if (world) {
    world.clearThrowableObjects();
  }
}

/**
 * Handles the character death flow by starting the death animation, scheduling the game-over screen,
 * drawing death frames, and continuing the loop until game over.
 *
 * @returns {boolean} True if the death state was handled.
 */
function handleDeathState() {
  if (!world.isCharacterDead()) {
    return false;
  }

  if (!deathAnimationStarted) {
    deathAnimationStarted = true;
    world.resetCharacterDeathAnimation();
    gameOverTimeoutId = setTimeout(() => {
      gameOverTimeoutId = null;
      gameOver = true;
      showGameOver();
    }, GAME_OVER_DELAY_MS);
  }

  world.playCharacterDeathAnimation();
  draw();

  if (!gameOver) {
    animationFrameId = requestAnimationFrame(loop);
  }

  return true;
}

/**
 * Runs one frame of the game loop unless the game is won, handles death flow, updates the world,
 * checks win state, draws, and schedules the next frame.
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
  checkWinCondition();
  draw();
  animationFrameId = requestAnimationFrame(loop);
}

/**
 * Draws the current game frame.
 *
 * @returns {void}
 */
function draw() {
  world.draw();
}

/**
 * Shows the lose screen, stops background music, plays the lose sound, and hides mobile controls.
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
 * Schedules the win screen after the endboss is defeated, unless a win is already pending or finished.
 *
 * @returns {void}
 */
function checkWinCondition() {
  if (world.isEndbossDefeated() && !gameWon && !winTimeoutId) {
    winTimeoutId = setTimeout(showWinScreen, WIN_DELAY_MS);
  }
}

/**
 * Shows the win screen if the game is not already over, marks the game as won, stops background music,
 * plays the win sound, and hides mobile controls.
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
 * Applies the current mute state to app-level sounds.
 *
 * @returns {void}
 */
function applyMuteState() {
  backgroundMusic.muted = isMuted;
  winSound.muted = isMuted;
  loseSound.muted = isMuted;
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
 * Clears the world canvas if the world is ready.
 *
 * @returns {void}
 */
function clearCanvasIfReady() {
  if (world) {
    world.clearCanvas();
  }
}

/**
 * Resets game state and timeouts, hides overlays, creates a fresh keyboard/world, starts music,
 * and shows mobile controls.
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
 * Restarts the game without reloading the page after a win or loss.
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
 * Stops the game, clears pending objects, timeouts, and sounds, resets input and flags, returns to
 * the start screen, and clears the canvas.
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
 * Plays a sound from the beginning while respecting the current mute state.
 *
 * @param {HTMLAudioElement} sound - The sound to play.
 * @returns {void}
 */
function playSound(sound) {
  sound.currentTime = 0;
  sound.muted = isMuted;
  sound.play();
}
