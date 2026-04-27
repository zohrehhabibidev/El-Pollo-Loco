/**
 * Base class for movable objects.
 *
 * Extends DrawableObject and adds:
 * - horizontal movement
 * - vertical movement (jump / fall)
 * - simple gravity system
 */
class MovableObject extends DrawableObject {
  constructor() {
    super();

    // Horizontal movement speed
    this.speed = 5;

    // Vertical speed (up/down movement)
    this.speedY = 0;

    // Gravity strength (reduces speedY over time)
    this.acceleration = 0.5;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Checks if the object is above the ground.
   *
   * Note:
   * Uses a temporary ground value (y < 250).
   * This will later be replaced by real collision logic.
   */
  isAboveGround() {
    return this.y < 250;
  }

  /**
   * Triggers a jump by setting vertical speed.
   *
   * Gravity will reduce speedY over time,
   * causing the object to fall back down.
   */
  jump() {
    this.speedY = 15;
  }

  /**
   * Applies gravity to the object.
   *
   * Runs continuously and updates:
   * - position (y)
   * - vertical speed (speedY)
   *
   * Result:
   * jump → slow down → fall
   *
   * Note:
   * This is a simple test implementation.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60);
  }
}
