/**
 * Paths for the walking animation frames.
 *
 * These images are displayed in sequence
 * to create the walking animation.
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
 * Paths for the idle animation frames.
 *
 * These images are used when the character
 * is not moving.
 *
 * @type {string[]}
 */
const idleImages = [
  "assets/img/character/1_idle/idle/I-1.png",
  "assets/img/character/1_idle/idle/I-2.png",
  "assets/img/character/1_idle/idle/I-3.png",
  "assets/img/character/1_idle/idle/I-4.png",
  "assets/img/character/1_idle/idle/I-5.png",
  "assets/img/character/1_idle/idle/I-6.png",
  "assets/img/character/1_idle/idle/I-7.png",
  "assets/img/character/1_idle/idle/I-8.png",
  "assets/img/character/1_idle/idle/I-9.png",
  "assets/img/character/1_idle/idle/I-10.png",
];

/**
 * Represents the main player character.
 *
 * Responsibilities:
 * - position and size
 * - movement (left / right / jump)
 * - switching between idle and walking animations
 *
 * @extends MovableObject
 */
class Character extends MovableObject {
  constructor() {
    super();

    // Initial position on the canvas
    this.x = 50;
    this.y = 250;

    // Character size
    this.width = 150;
    this.height = 200;

    // Horizontal movement speed
    this.speed = 2;

    // Preload animation frames into cache
    this.loadImages(idleImages);
    this.loadImages(characterWalking);

    // Set initial image (first idle frame)
    this.img = this.imageCache[idleImages[0]];

    // Direction flag (false = right, true = left)
    this.otherDirection = false;
  }

  /**
   * Plays the walking animation.
   *
   * Called while the character is moving.
   */
  playWalkingAnimation() {
    this.playAnimation(characterWalking);
  }

  /**
   * Plays the idle animation.
   *
   * Called when the character is not moving.
   */
  showIdleImage() {
    this.playAnimation(idleImages);
  }
}
