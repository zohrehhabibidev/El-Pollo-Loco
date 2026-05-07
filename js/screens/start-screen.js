/**
 * Opens the guide popup on the start screen.
 *
 * @returns {void}
 */
function openGuide() {
  document.getElementById("guide-popup").classList.remove("hidden");
}

/**
 * Closes the guide popup on the start screen.
 *
 * @returns {void}
 */
function closeGuide() {
  document.getElementById("guide-popup").classList.add("hidden");
}

/**
 * Connects start screen buttons with their click actions.
 *
 * @returns {void}
 */
function initStartScreen() {
  document.getElementById("start-button").addEventListener("click", startGame);
  document.getElementById("help-button").addEventListener("click", openGuide);
  document.getElementById("close-guide-button").addEventListener("click", closeGuide);
  document.getElementById("try-again-button").addEventListener("click", restartGame);
  document.getElementById("menu-button").addEventListener("click", backToMenu);
  document.getElementById("win-try-again-button").addEventListener("click", restartGame);
  document.getElementById("win-menu-button").addEventListener("click", backToMenu);
  document.getElementById("mute-button").addEventListener("click", toggleMute);
  updateMuteButton();
  initMobileControls();
}

initStartScreen();
/**
 * Adds pointer controls for mobile game buttons.
 *
 * @returns {void}
 */
function initMobileControls() {
  bindMobileControl("mobile-left-button", "LEFT");
  bindMobileControl("mobile-right-button", "RIGHT");
  bindMobileControl("mobile-jump-button", "SPACE");
  bindMobileControl("mobile-throw-button", "D");
}

/**
 * Binds a mobile button to a keyboard state property.
 *
 * @param {string} buttonId - The id of the mobile control button.
 * @param {string} keyName - The keyboardState property to update.
 * @returns {void}
 */
function bindMobileControl(buttonId, keyName) {
  const button = document.getElementById(buttonId);

  if (!button) {
    return;
  }

  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    keyboardState[keyName] = true;
  });

  button.addEventListener("pointerup", (event) => {
    event.preventDefault();
    keyboardState[keyName] = false;
  });

  button.addEventListener("pointercancel", () => {
    keyboardState[keyName] = false;
  });

  button.addEventListener("pointerleave", () => {
    keyboardState[keyName] = false;
  });

  button.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}
