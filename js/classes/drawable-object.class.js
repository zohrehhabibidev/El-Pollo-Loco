/**
 * Base class for all drawable objects.
 *
 * Handles:
 * - image loading
 * - animation frame caching
 * - position and size
 * - drawing on the canvas
 */
class DrawableObject {
  constructor() {
    // Stores preloaded images for animations
    this.imageCache = {};

    // Current animation frame index
    this.currentImage = 0;
    this.animationCounter = 0;
    this.animationDelay = 7;

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
   * Loads multiple images into the image cache.
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
   * Plays an animation using the given image paths.
   *
   * @param {string[]} images - Image paths used for the animation.
   * @returns {void}
   */
  playAnimation(images) {
    this.animationCounter++;

    if (this.animationCounter < this.animationDelay) {
      return;
    }

    this.animationCounter = 0;

    const index = this.currentImage % images.length;
    const path = images[index];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Draws the object on the canvas.
   *
   * If otherDirection is true, the image is flipped horizontally.
   */
  draw(ctx) {
    if (this.otherDirection) {
      ctx.save();
      ctx.translate(this.x + this.width, this.y);
      ctx.scale(-1, 1);
      ctx.drawImage(this.img, 0, 0, this.width, this.height);
      ctx.restore();
    } else {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
}
