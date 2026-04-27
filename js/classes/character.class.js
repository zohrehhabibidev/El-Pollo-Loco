/**
 * Paths for the walking animation images of the character.
 * @type {string[]}
 */
const characterWalking = [
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
    this.loadImages(characterWalking);

    // Start systems
    this.applyGravity();
    this.animate();
  }
  /**
   * Plays the walking animation once.
   * Used when the character is moving.
   */
  playWalkingAnimation() {
    this.playAnimation(characterWalking);
  }

  /**
 * Starts the animation loop.
 *
 * Every 100ms:
 * - if the character is moving → play walking animation
 * - otherwise → show idle image
 *
 * Note:
 * This is a simple state check based on keyboard input.
 * Later, this should use a proper state system (idle, walk, jump).
 */
  animate() {
    setInterval(() => {
      if (keyboardState.RIGHT || keyboardState.LEFT) {
        this.playAnimation(characterWalking);
      } else {
        this.loadImage("assets/img/character/1_idle/idle/I-1.png");
      }
    }, 100);
  }
}
