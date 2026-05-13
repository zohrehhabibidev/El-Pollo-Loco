/**
 * Returns the game stage that should be displayed in fullscreen mode.
 *
 * @returns {HTMLElement | null} The fullscreen target element.
 */
function getFullscreenTarget() {
  return document.getElementById("game-stage");
}

/**
 * Returns the fullscreen button element.
 *
 * @returns {HTMLButtonElement | null} The fullscreen button.
 */
function getFullscreenButton() {
  return document.getElementById("fullscreen-button");
}

/**
 * Checks whether the game is currently shown in fullscreen mode.
 *
 * @returns {boolean} True if fullscreen mode is active.
 */
function isFullscreenActive() {
  return Boolean(document.fullscreenElement);
}

/**
 * Updates the fullscreen button accessibility labels.
 *
 * @returns {void}
 */
function updateFullscreenButton() {
  const fullscreenButton = getFullscreenButton();

  if (!fullscreenButton) {
    return;
  }

  const label = isFullscreenActive()
    ? "Exit fullscreen"
    : "Enter fullscreen";

  fullscreenButton.setAttribute("aria-label", label);
  fullscreenButton.setAttribute("title", label);
}

/**
 * Enters fullscreen mode for the game layout if supported.
 *
 * @returns {void}
 */
function enterFullscreen() {
  const fullscreenTarget = getFullscreenTarget();

  if (!fullscreenTarget || !fullscreenTarget.requestFullscreen) {
    return;
  }

  fullscreenTarget.requestFullscreen().catch(() => { });
}

/**
 * Exits fullscreen mode if fullscreen is active.
 *
 * @returns {void}
 */
function exitFullscreen() {
  if (!document.fullscreenElement || !document.exitFullscreen) {
    return;
  }

  document.exitFullscreen().catch(() => { });
}

/**
 * Toggles fullscreen mode for the game layout.
 *
 * @returns {void}
 */
function toggleFullscreen() {
  if (isFullscreenActive()) {
    exitFullscreen();
  } else {
    enterFullscreen();
  }
}

/**
 * Initializes fullscreen button events and state.
 *
 * @returns {void}
 */
function initFullscreenButton() {
  const fullscreenButton = getFullscreenButton();

  if (!fullscreenButton) {
    return;
  }

  fullscreenButton.addEventListener("click", toggleFullscreen);
  document.addEventListener("fullscreenchange", updateFullscreenButton);
  updateFullscreenButton();
}

initFullscreenButton();
