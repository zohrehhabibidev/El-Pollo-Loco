/**
 * Represents a bottle that is thrown by the player.
 */
class ThrowableObject extends MovableObject {
  /**
   * Creates a throwable bottle at a given position.
   *
   * @param {number} x - Start x position.
   * @param {number} y - Start y position.
   * @param {boolean} otherDirection - True if the character is facing left.
   */
  constructor(x, y, otherDirection) {
    super();

    this.loadImage(
      "assets/img/collectible/salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );

    this.x = x;
    this.y = y;

    this.width = 60; // Width of the bottle
    this.height = 70; // Height of the bottle

    this.speed = 6; // Forward speed of the bottle
    this.speedY = 20; // Initial upward speed for the throw
    this.acceleration = 1;
    this.throwDirection = otherDirection ? -1 : 1;
    this.movementIntervalId = null;

    this.applyThrow();
  }

  /**
   * Applies forward movement and a simple throw arc to the bottle.
   *
   * @returns {void}
   */
  applyThrow() {
    this.movementIntervalId = setInterval(() => {
      this.x += this.speed * this.throwDirection;
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }, 1000 / 60);
  }

  /**
   * Stops the bottle movement interval.
   *
   * @returns {void}
   */
  stopMovement() {
    if (this.movementIntervalId !== null) {
      clearInterval(this.movementIntervalId);
      this.movementIntervalId = null;
    }
  }
}
