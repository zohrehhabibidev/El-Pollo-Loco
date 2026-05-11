/**
 * Represents a moving cloud background layer.
 *
 * @extends BackgroundObject
 */
class Cloud extends BackgroundObject {
  /**
   * Creates a cloud object.
   *
   * @param {number} x - Horizontal position.
   * @param {number} y - Vertical position.
   */
  constructor(x, y) {
    super("assets/img/background/layers/4_clouds/full.png", x, y);

    this.speed = 0.1;
    this.resetX = 2160;
  }

  /**
   * Moves the cloud from right to left and resets it when it leaves the world.
   *
   * @returns {void}
   */
  update() {
    this.x -= this.speed;

    if (this.x + this.width < -720) {
      this.x = this.resetX;
    }
  }
}
