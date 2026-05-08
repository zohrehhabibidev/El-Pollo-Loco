/**
 * Base class for drawable game objects.
 */
class DrawableObject {
  /**
   * Creates a drawable object with default position, size, and animation values.
   */
  constructor() {
    this.imageCache = {};
    this.currentImage = 0;
    this.animationCounter = 0;
    this.animationDelay = 8;
    this.img = new Image();
    this.x = 0;
    this.y = 0;
    this.width = 200;
    this.height = 220;
  }

  /**
   * Loads one image and sets it as the current image.
   *
   * @param {string} path - Image path.
   * @returns {void}
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images into the image cache.
   *
   * @param {string[]} paths - Image paths to load.
   * @returns {void}
   */
  loadImages(paths) {
    paths.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Plays an animation using image paths.
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
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   * @returns {void}
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
