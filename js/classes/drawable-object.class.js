/**
 * Base class for all drawable objects in the game.
 *
 * This class stores:
 * - the image of the object
 * - its position (x, y)
 * - its size (width, height)
 *
 * We use this class so other objects (like Character, Enemy, etc.)
 * can reuse the same drawing logic.
 */
class DrawableObject {
  constructor() {
    this.img = new Image();
    this.x = 0;
    this.y = 0;
    this.width = 200;
    this.height = 220;
  }

  loadImage(path) {
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
