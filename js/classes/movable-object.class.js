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
    this.groundY = 250;
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
    return this.y < this.groundY;
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

    if (this.y > this.groundY) {
      this.y = this.groundY;
      this.speedY = 0;
    }
  }

  /**
   * Checks whether this object collides with another object.
   *
   * @param {DrawableObject} obj - Object to check collision with.
   * @returns {boolean} True if the objects collide.
   */
  isColliding(obj) {
    const thisBox = this.getCollisionBox();
    const objBox = obj.getCollisionBox();

    return thisBox.right > objBox.left &&
      thisBox.left < objBox.right &&
      thisBox.bottom > objBox.top &&
      thisBox.top < objBox.bottom;
  }
}
