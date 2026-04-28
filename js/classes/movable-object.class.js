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
    this.speed = 2;
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
 * Updates gravity for the object.
 *
 * This method is called every frame from the game loop.
 *
 * Behavior:
 * - if the object is in the air → apply gravity
 * - move the object using speedY
 * - reduce speedY over time (gravity effect)
 *
 * Result:
 * jump → slow down → fall
 *
 * Ground handling:
 * - prevents the object from going below the ground (y = 250)
 * - resets vertical speed when landing
 *
 * Note:
 * Uses a temporary ground value (250).
 * Later, this should be replaced with real collision detection.
 */
  updateGravity() {
    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }
    if (this.y > 250) {
      this.y = 250;
      this.speedY = 0;
    }
  }
}
