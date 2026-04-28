/**
 * Base class for all drawable objects.
 *
 * Handles:
 * - loading images
 * - storing animation frames
 * - position and size
 * - drawing on the canvas
 */
class DrawableObject {
  constructor() {
    // Stores preloaded images for animations
    this.imageCache = {};

    // Current animation frame index
    this.currentImage = 0;

    // Current image to render
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
   * Loads multiple images and stores them in imageCache.
   * Used for animations.
   */
  loadImages(paths) {
    paths.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Updates the current image using the next frame
   * from the given animation array.
   */
  playAnimation(images) {
    const index = this.currentImage % images.length;
    const path = images[index];
    const image = this.imageCache[path];

    if (image) {
      this.img = image;
      this.currentImage++;
    }
  }

  /**
   * Draws the current image on the canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
