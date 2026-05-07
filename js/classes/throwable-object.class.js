/**
 * Represents a bottle that is thrown by the player.
 */
class ThrowableObject extends MovableObject {
  /**
   * Creates a throwable bottle at a given position.
   *
   * @param {number} x - Start x position.
   * @param {number} y - Start y position.
   * @param {boolean} otherDirection - True if the character is facing left.
   */
  constructor(x, y, otherDirection) {
    super();

    this.loadImage(
      "assets/img/collectible/salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );

    this.x = x;
    this.y = y;

    this.width = 60; // Width of the bottle
    this.height = 70; // Height of the bottle

    this.speed = 6; // Forward speed of the bottle
    this.speedY = 20; // Initial upward speed for the throw
    this.acceleration = 1;
    this.throwDirection = otherDirection ? -1 : 1;
    this.movementIntervalId = null;
    this.hasSplashed = false;
    this.markedForRemoval = false;
    this.splashImages = [
      "assets/img/collectible/salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
      "assets/img/collectible/salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
      "assets/img/collectible/salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
      "assets/img/collectible/salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
      "assets/img/collectible/salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
      "assets/img/collectible/salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    this.loadImages(this.splashImages);
    this.applyThrow();
  }

  /**
   * Applies forward movement and a simple throw arc to the bottle.
   *
   * @returns {void}
   */
  applyThrow() {
    this.movementIntervalId = setInterval(() => {
      this.x += this.speed * this.throwDirection;
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }, 1000 / 60);
  }
  /**
   * Starts the bottle splash animation after a hit.
   *
   * @returns {void}
   */
  startSplash() {
    if (this.hasSplashed) {
      return;
    }

    this.stopMovement();
    this.hasSplashed = true;
    this.currentImage = 0;
    this.animationCounter = 0;
    this.img = this.imageCache[this.splashImages[0]];
  }
  /**
 * Plays the splash animation once and marks the bottle for removal.
 *
 * @returns {void}
 */
  playSplashAnimation() {
    if (!this.hasSplashed || this.markedForRemoval) {
      return;
    }

    this.animationCounter++;

    if (this.animationCounter < this.animationDelay) {
      return;
    }

    this.animationCounter = 0;

    if (this.currentImage >= this.splashImages.length) {
      this.markedForRemoval = true;
      return;
    }

    const path = this.splashImages[this.currentImage];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
  /**
   * Stops the bottle movement interval.
   *
   * @returns {void}
   */
  stopMovement() {
    if (this.movementIntervalId !== null) {
      clearInterval(this.movementIntervalId);
      this.movementIntervalId = null;
    }
  }
}
