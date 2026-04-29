/**
 * Base class for movable objects.
 *
 * Extends DrawableObject and adds:
 * - horizontal movement (left / right)
 * - vertical movement (jump / fall)
 * - a simple gravity system
 */
class MovableObject extends DrawableObject {
  constructor() {
    super();

    // Speed for horizontal movement
    this.speed = 2;

    // Vertical speed (used for jumping and falling)
    this.speedY = 0;

    // Gravity strength (reduces speedY each frame)
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
   * Will later be replaced with real collision logic.
   */
  isAboveGround() {
    return this.y < 250;
  }

  /**
   * Starts a jump by setting vertical speed.
   *
   * The object will move upward first,
   * then gravity will pull it back down.
   */
  jump() {
    this.speedY = 15;
  }

  /**
   * Updates vertical movement using gravity.
   *
   * Called every frame from the game loop.
   *
   * Behavior:
   * - moves the object based on speedY
   * - reduces speedY over time (gravity)
   *
   * Result:
   * jump → slow down → fall
   *
   * Ground handling:
   * - prevents falling below y = 250
   * - resets speedY when landing
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

/**
 * Checks whether this object is colliding with another object.
 *
 * This uses simple rectangle collision detection.
 * Each object is treated like an invisible box.
 *
 * @param {MovableObject} obj - The other object to check collision with.
 * @returns {boolean} True if both objects overlap.
 */  isColliding(obj) {
    return this.x + this.width > obj.x &&
      this.x < obj.x + obj.width &&
      this.y + this.height > obj.y &&
      this.y < obj.y + obj.height;
  }
}
