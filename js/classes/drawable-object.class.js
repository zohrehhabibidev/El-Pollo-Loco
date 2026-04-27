/**
 * Base class for all drawable objects in the game.
 *
 * Handles:
 * - image loading
 * - position and size
 * - drawing on canvas
 * - basic animation support (image switching)
 */
class DrawableObject {
  constructor() {
    // Stores preloaded images for animations
    this.imageCache = {};

    // Index of the current animation frame
    this.currentImage = 0;

    // Current image to draw
    this.img = new Image();

    // Position and size
    this.x = 0;
    this.y = 0;
    this.width = 200;
    this.height = 220;
  }

  /**
   * Loads a single image and sets it as the current image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images and stores them in the cache.
   * Used for animations (e.g. walking, jumping).
   */
  loadImages(paths) {
    paths.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Switches the current image to the next frame
   * from the given animation array.
   */
  playAnimation(images) {
    const index = this.currentImage % images.length;
    const path = images[index];

    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Draws the current image on the canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
