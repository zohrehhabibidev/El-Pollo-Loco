/**
 * Represents a background layer in the game.
 *
 * This class is used to draw static background images
 * (sky, mountains, ground, clouds) on the canvas.
 *
 * It extends DrawableObject, so it can:
 * - load an image
 * - be drawn on the canvas
 */
class BackgroundObject extends DrawableObject {

  /**
   * Creates a new background object.
   *
   * @param {string} imagePath - path to the background image
   * @param {number} x - horizontal position on canvas
   * @param {number} y - vertical position on canvas
   */
  constructor(imagePath, x, y) {
    super();

    // Load the background image
    this.loadImage(imagePath);

    // Set position
    this.x = x;
    this.y = y;

    // Set size to match canvas dimensions
    this.width = 720;
    this.height = 480;
  }
}
