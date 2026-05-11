const normalChickenImages = [
  "assets/img/enemies/chicken_normal/1_walk/1_w.png",
  "assets/img/enemies/chicken_normal/1_walk/2_w.png",
  "assets/img/enemies/chicken_normal/1_walk/3_w.png",
];

const smallChickenImages = [
  "assets/img/enemies/chicken_small/1_walk/1_w.png",
  "assets/img/enemies/chicken_small/1_walk/2_w.png",
  "assets/img/enemies/chicken_small/1_walk/3_w.png",
];

const normalChickenDeadImage =
  "assets/img/enemies/chicken_normal/2_dead/dead.png";

const smallChickenDeadImage =
  "assets/img/enemies/chicken_small/2_dead/dead.png";

/**
 * Represents a chicken enemy.
 *
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  /**
   * Creates a chicken enemy.
   *
   * @param {number} x - Start x position.
   * @param {string} type - Chicken type.
   */
  constructor(x, type) {
    super();

    this.x = x;

    if (type === "normal") {
      this.speed = 0.5;
      this.IMAGES = normalChickenImages;
      this.width = 80;
      this.height = 80;
      this.y = 382;

      this.offset = {
        top: 15,
        right: 15,
        bottom: 8,
        left: 15,
      };
    }

    if (type === "small") {
      this.speed = 0.8;
      this.IMAGES = smallChickenImages;
      this.width = 50;
      this.height = 50;
      this.y = 400;
      this.offset = {
        top: 8,
        right: 10,
        bottom: 5,
        left: 10,
      };
    }

    this.loadImages(this.IMAGES);
    this.img = this.imageCache[this.IMAGES[0]];

    this.isDead = false;
    this.markedForRemoval = false;
    this.deadImage = type === "normal"
      ? normalChickenDeadImage
      : smallChickenDeadImage;

    this.imageCache[this.deadImage] = new Image();
    this.imageCache[this.deadImage].src = this.deadImage;
  }

  /**
   * Updates chicken movement and animation.
   *
   * @returns {void}
   */
  update() {
    if (this.isDead) {
      return;
    }

    this.x -= this.speed;
    this.playAnimation(this.IMAGES);

    if (this.x + this.width < 0) {
      this.x = 2160;
    }
  }

  /**
   * Kills the chicken and shows the dead image.
   *
   * @returns {void}
   */
  die() {
    if (this.isDead) {
      return;
    }

    this.isDead = true;
    this.img = this.imageCache[this.deadImage];

    setTimeout(() => {
      this.markedForRemoval = true;
    }, 600);
  }
}
