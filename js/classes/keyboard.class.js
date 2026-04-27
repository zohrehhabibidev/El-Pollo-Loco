/**
 * Stores the current state of keyboard input.
 *
 * Each property represents a key:
 * true  → key is pressed
 * false → key is released
 *
 * Used to track input in the game loop.
 */
class Keyboard {
  constructor() {
    // Arrow keys
    this.LEFT = false;
    this.RIGHT = false;
    this.UP = false;
    this.DOWN = false;

    // Action keys
    this.SPACE = false;
    this.D = false;
  }
}
