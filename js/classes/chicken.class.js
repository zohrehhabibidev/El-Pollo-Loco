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
/**
 * Represents a simple enemy (chicken).
 *
 * The chicken:
 * - has a position and size
 * - moves slowly to the left
 * - uses a walking animation
 *
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  constructor(x, type) {
    super();

    this.x = x;
    this.y = 370;

    // Set properties based on the type of chicken
    if (type === "normal") {
      this.speed = 0.5;
      this.IMAGES = normalChickenImages;
      this.width = 80;
      this.height = 80;
    }

    if (type === "small") {
      this.speed = 1.5;
      this.IMAGES = smallChickenImages;
      this.width = 50;
      this.height = 50;
    }
    // Load the animation images into the cache
    this.loadImages(this.IMAGES);
    // Set the initial image to the first frame of the animation
    this.img = this.imageCache[this.IMAGES[0]];
  }
  // Moves the chicken to the left and updates the animation frame.
  update() {
    this.moveLeft();
    this.playAnimation(this.IMAGES);
  }
}
