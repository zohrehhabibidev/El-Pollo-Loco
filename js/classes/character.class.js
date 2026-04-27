/**
 * Paths for the walking animation images of the character.
 * @type {string[]}
 */
const IMAGES_WALKING = [
  "assets/img/character/2_walk/W-21.png",
  "assets/img/character/2_walk/W-22.png",
  "assets/img/character/2_walk/W-23.png",
  "assets/img/character/2_walk/W-24.png",
  "assets/img/character/2_walk/W-25.png",
  "assets/img/character/2_walk/W-26.png",
];

/**
 * Represents the main player character.
 * Handles character setup, movement, gravity, and animation.
 *
 * @extends MovableObject
 */
class Character extends MovableObject {
  constructor() {
    super();

    // Initial position and size
    this.x = 50;
    this.y = 250;
    this.width = 150;
    this.height = 200;

    // Movement speed
    this.speed = 2;

    // Load default image (idle)
    this.loadImage("assets/img/character/1_idle/idle/I-1.png");

    // Load walking animation images
    this.loadImages(IMAGES_WALKING);

    // Start systems
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts the walking animation loop.
   * Switches images at a fixed interval.
   *
   * Note:
   * Currently runs all the time (test mode).
   * Later it should depend on movement state.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(IMAGES_WALKING);
    }, 100);
  }
}
