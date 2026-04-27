/**
 * Represents an object that can move.
 *
 * This class extends DrawableObject,
 * so it already has:
 * - image (img)
 * - position (x, y)
 * - size (width, height)
 * - draw() method
 *
 * This class adds movement using a speed value.
 *
 * Behavior:
 * moveRight() → increases x (moves right)
 * moveLeft()  → decreases x (moves left)
 */
class MovableObject extends DrawableObject {
  // Movement speed of the object.
  speed = 5;

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }
}
