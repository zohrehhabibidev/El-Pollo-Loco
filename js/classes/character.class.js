/**
 * Paths for the walking animation images of the character.
 *
 * These images are used in sequence to create
 * a walking animation effect.
 *
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
 *
 * Handles:
 * - position and size
 * - movement (left / right / jump)
 * - switching between idle and walking images
 *
 * @extends MovableObject
 */
class Character extends MovableObject {
  constructor() {
    super();

    // Initial position of the character on the canvas
    this.x = 50;
    this.y = 250;

    // Size of the character
    this.width = 150;
    this.height = 200;

    // Movement speed (used for left/right movement)
    this.speed = 2;

    // this.isWalking = false; // (not used yet)

    // Movement speed (duplicate assignment - same value)
    this.speed = 2;

    // Load default image (idle state)
    this.loadImage("assets/img/character/1_idle/idle/I-1.png");

    // Preload walking animation images into cache
    this.loadImages(characterWalking);
  }

  /**
   * Plays one frame of the walking animation.
   *
   * Each call switches to the next image
   * in the walking animation sequence.
   */
  playWalkingAnimation() {
    this.playAnimation(characterWalking);
  }

  /**
   * Shows the idle image when the character is not moving.
   *
   * Note:
   * Currently the image loading is commented out,
   * so the idle state will not be displayed.
   */
  showIdleImage() {
    this.loadImage("assets/img/character/1_idle/idle/I-1.png");
  }
}
