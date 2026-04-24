/**
 * Stores the current state of keyboard keys.
 *
 * Each key is:
 * true  → pressed
 * false → released
 *
 * We use a class to group all key states in one place
 * and easily create a keyboard object for the game.
 *
 * Example:
 * RIGHT = true  → right key is pressed
 * RIGHT = false → right key is released
 */
class Keyboard {
  constructor() {
    this.LEFT = false;
    this.RIGHT = false;
    this.UP = false;
    this.DOWN = false;
    this.SPACE = false;
    this.D = false;
  }
}
