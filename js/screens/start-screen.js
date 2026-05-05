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
}

initStartScreen();
