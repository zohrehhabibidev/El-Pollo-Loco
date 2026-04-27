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

    // Initial position and size
    this.x = 50;
    this.y = 250;
    this.width = 150;
    this.height = 200;
    this.isWalking = false;

    // Movement speed
    this.speed = 2;

    // Load default image (idle)
    this.loadImage("assets/img/character/1_idle/idle/I-1.png");

    // Load walking animation images
    this.loadImages(characterWalking);

    // Start systems
    this.applyGravity();
  }
  /**
   * Plays one step of the walking animation.
   */
  playWalkingAnimation() {
    this.playAnimation(characterWalking);
  }
  /**
     * Shows the idle image when the character is not moving.
     */
  showIdleImage() {
    this.loadImage("assets/img/character/1_idle/idle/I-1.png");
  }
}
