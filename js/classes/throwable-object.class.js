/**
 * Represents a bottle that is thrown by the player.
 */
class ThrowableObject extends MovableObject {
  /**
   * Creates a throwable bottle at a given position.
   *
   * @param {number} x - Start x position
   * @param {number} y - Start y position
   */
  constructor(x, y) {
    super();

    this.loadImage(
      "assets/img/collectible/salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );

    this.x = x;
    this.y = y;

    this.width = 60;// Width of the bottle
    this.height = 70;// Height of the bottle

    this.speed = 8; // Forward speed of the bottle
    this.speedY = 0;// Initial upward speed for the throw

    this.applyThrow();
  }

  /**
   * Applies forward movement and gravity to the bottle.
   */
  applyThrow() {
    setInterval(() => {
      this.x += this.speed;
    }, 1000 / 60);

    // this.updateGravity();
  }
}
