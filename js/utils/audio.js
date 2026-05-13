// Audio objects and mute state.

const BACKGROUND_MUSIC_VOLUME = 0.06;
let isMuted = localStorage.getItem("isMuted") === "true";
const backgroundMusic = new Audio("assets/audio/background/background-game-music.mp3");
const loseSound = new Audio("assets/audio/lose/game-over.mp3");
const winSound = new Audio("assets/audio/win/win-sound.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = BACKGROUND_MUSIC_VOLUME;
backgroundMusic.muted = isMuted;

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
 * Stops all game end and background sounds.
 *
 * @returns {void}
 */
function stopGameSounds() {
  stopEndSounds();
  stopBackgroundMusic();
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
