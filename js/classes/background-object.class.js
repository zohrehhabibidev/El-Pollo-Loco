/**
 * Represents a background layer in the game.
 */
class BackgroundObject extends DrawableObject {
  /**
   * Creates a background object.
   *
   * @param {string} imagePath - Background image path.
   * @param {number} x - Horizontal position.
   * @param {number} y - Vertical position.
   */
  constructor(imagePath, x, y) {
    super();

    this.loadImage(imagePath);
    this.x = x;
    this.y = y;
    this.width = 720;
    this.height = 480;
  }
}
