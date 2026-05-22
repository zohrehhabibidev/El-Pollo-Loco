/**
 * Renders the visible game world, camera-based objects, and fixed UI.
 */
class WorldRenderer {
  /**
   * Creates a renderer for the provided world.
   *
   * @param {World} world - The world to render.
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Clears the whole canvas.
   *
   * @returns {void}
   */
  clearCanvas() {
    this.world.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
  }

  /**
   * Calculates the camera x position.
   *
   * @returns {number} The camera x position.
   */
  getCameraX() {
    return Math.max(0, this.world.character.x - this.world.cameraXOffset);
  }

  /**
   * Applies the camera translation to the canvas context.
   *
   * @returns {void}
   */
  applyCameraTransform() {
    this.world.ctx.translate(-this.getCameraX(), 0);
  }

  /**
   * Draws all background objects.
   *
   * @returns {void}
   */
  drawBackgroundObjects() {
    this.world.backgroundObjects.forEach((bg) => bg.draw(this.world.ctx));
  }

  /**
   * Draws collectible and throwable objects.
   *
   * @returns {void}
   */
  drawCollectibleObjects() {
    this.world.bottles.forEach((bottle) => {
      bottle.draw(this.world.ctx);
    });

    this.world.throwableObjects.forEach((bottle) => {
      bottle.draw(this.world.ctx);
    });

    this.world.coins.forEach((coin) => {
      coin.draw(this.world.ctx);
    });
  }

  /**
   * Draws chickens and the endboss.
   *
   * @returns {void}
   */
  drawEnemyObjects() {
    this.world.chickens.forEach((chicken) => {
      chicken.draw(this.world.ctx);
    });

    this.world.endboss.draw(this.world.ctx);
  }

  /**
   * Draws the character when visible.
   *
   * @returns {void}
   */
  drawCharacterIfVisible() {
    if (this.world.character.visible) {
      this.world.character.draw(this.world.ctx);
    }
  }

  /**
   * Draws world objects that move with the camera.
   *
   * @returns {void}
   */
  drawWorld() {
    this.world.ctx.save();
    this.applyCameraTransform();

    this.drawBackgroundObjects();
    this.drawCollectibleObjects();
    this.drawEnemyObjects();

    this.world.ctx.restore();
  }

  /**
   * Draws fixed status bars.
   *
   * @returns {void}
   */
  drawFixedUi() {
    this.world.statusBar.draw(this.world.ctx);
    this.world.bottleStatusBar.draw(this.world.ctx);
    this.world.coinStatusBar.draw(this.world.ctx);

    if (this.world.endboss.isActivated) {
      this.world.endbossStatusBar.draw(this.world.ctx);
    }
  }

  /**
   * Draws the character with the camera transform.
   *
   * @returns {void}
   */
  drawCharacterWithCamera() {
    this.world.ctx.save();

    this.applyCameraTransform();
    this.drawCharacterIfVisible();

    this.world.ctx.restore();
  }

  /**
   * Draws the current game frame.
   *
   * @returns {void}
   */
  draw() {
    this.clearCanvas();
    this.drawWorld();
    this.drawFixedUi();
    this.drawCharacterWithCamera();
  }
}
