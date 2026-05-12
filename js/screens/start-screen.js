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
 * Closes the guide popup when the backdrop is clicked.
 *
 * @param {MouseEvent} event - The click event.
 * @returns {void}
 */
function closeGuideOnBackdropClick(event) {
  if (event.target.id === "guide-popup") {
    closeGuide();
  }
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
  document.getElementById("guide-popup").addEventListener("click", closeGuideOnBackdropClick);
  document.getElementById("try-again-button").addEventListener("click", restartGame);
  document.getElementById("menu-button").addEventListener("click", backToMenu);
  document.getElementById("win-try-again-button").addEventListener("click", restartGame);
  document.getElementById("win-menu-button").addEventListener("click", backToMenu);
  document.getElementById("mute-button").addEventListener("click", toggleMute);
  updateMuteButton();
  initMobileControls();
}

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
 * Gets a mobile control button by id.
 *
 * @param {string} buttonId - The button id.
 * @returns {HTMLElement|null} The mobile control button.
 */
function getMobileControlButton(buttonId) {
  return document.getElementById(buttonId);
}

/**
 * Sets a mobile control key state.
 *
 * @param {PointerEvent} event - The pointer event.
 * @param {string} keyName - The keyboard state key.
 * @param {boolean} isPressed - Whether the key is pressed.
 * @returns {void}
 */
function setMobileControlState(event, keyName, isPressed) {
  event.preventDefault();
  keyboardState[keyName] = isPressed;
}

/**
 * Releases a mobile control key.
 *
 * @param {string} keyName - The keyboard state key.
 * @returns {void}
 */
function releaseMobileControl(keyName) {
  keyboardState[keyName] = false;
}

/**
 * Prevents the mobile context menu.
 *
 * @param {Event} event - The context menu event.
 * @returns {void}
 */
function preventMobileContextMenu(event) {
  event.preventDefault();
}

/**
 * Binds a mobile control button to a keyboard state key.
 *
 * @param {string} buttonId - The mobile button id.
 * @param {string} keyName - The keyboard state key.
 * @returns {void}
 */
function bindMobileControl(buttonId, keyName) {
  const button = getMobileControlButton(buttonId);
  let activePointerId = null;

  if (!button) {
    return;
  }

  button.addEventListener("pointerdown", (event) => {
    activePointerId = event.pointerId;

    if (button.setPointerCapture) {
      button.setPointerCapture(event.pointerId);
    }

    setMobileControlState(event, keyName, true);
  });

  button.addEventListener("pointerup", (event) => {
    if (event.pointerId === activePointerId) {
      activePointerId = null;
      setMobileControlState(event, keyName, false);
    }
  });

  button.addEventListener("pointercancel", (event) => {
    if (event.pointerId === activePointerId) {
      activePointerId = null;
      releaseMobileControl(keyName);
    }
  });

  button.addEventListener("contextmenu", preventMobileContextMenu);
}

/**
 * Gets the mobile controls container.
 *
 * @returns {HTMLElement|null} The mobile controls element.
 */
function getMobileControls() {
  return document.getElementById("mobile-controls");
}

/**
 * Shows the mobile controls during active gameplay.
 *
 * @returns {void}
 */
function showMobileControls() {
  const mobileControls = getMobileControls();

  if (mobileControls) {
    mobileControls.classList.add("mobile-controls--active");
  }
}

/**
 * Hides the mobile controls outside active gameplay.
 *
 * @returns {void}
 */
function hideMobileControls() {
  const mobileControls = getMobileControls();

  if (mobileControls) {
    mobileControls.classList.remove("mobile-controls--active");
  }
}

initStartScreen();
