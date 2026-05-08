/**
 * Base class for movable game objects.
 *
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  /**
   * Creates a movable object with movement and gravity values.
   */
  constructor() {
    super();

    this.speed = 2;
    this.speedY = 0;
    this.acceleration = 0.5;
  }

  /**
   * Moves the object to the right.
   *
   * @returns {void}
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   *
   * @returns {void}
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Checks if the object is above the ground.
   *
   * @returns {boolean} True if the object is above the ground.
   */
  isAboveGround() {
    return this.y < 250;
  }

  /**
   * Starts a jump.
   *
   * @returns {void}
   */
  jump() {
    this.speedY = 15;
  }

  /**
   * Updates vertical movement with gravity.
   *
   * @returns {void}
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
   * Checks whether this object collides with another object.
   *
   * @param {MovableObject} obj - The other object to check.
   * @returns {boolean} True if both objects overlap.
   */
  isColliding(obj) {
    return this.x + this.width > obj.x &&
      this.x < obj.x + obj.width &&
      this.y + this.height > obj.y &&
      this.y < obj.y + obj.height;
  }
}
