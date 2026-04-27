/**
 * Represents the player character in the game.
 *
 * This class extends DrawableObject,
 * so it already has:
 * - image (img)
 * - position (x, y)
 * - size (width, height)
 * - draw() method
 *
 * We use this class to add character-specific behavior,
 * like movement.
 *
 * Behavior:
 * moveRight() → moves the character to the right
 * moveLeft()  → moves the character to the left
 */

// extends = reuse code from another class
class Character extends DrawableObject {
  constructor() {
    super();
    this.loadImage("assets/img/character/1_idle/idle/I-1.png");
  }

  moveRight() {
    this.x += 2;
  }

  moveLeft() {
    this.x -= 2;
  }
}
