/**
 * Paths for the walking animation frames.
 *
 * Each image represents one frame of the walking cycle.
 * These frames are played in sequence while the character is moving.
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
 * These frames are played when the character is standing still.
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
 * Paths for the hurt animation frames.
 *
 * These frames are played when the character takes damage.
 *
 * @type {string[]}
 */
const hurtImages = [
  "assets/img/character/4_hurt/H-41.png",
  "assets/img/character/4_hurt/H-42.png",
  "assets/img/character/4_hurt/H-43.png",
];

/**
 * Represents the main player character.
 *
 * Responsibilities:
 * - manage position, size, and movement
 * - handle animation states (idle, walking, hurt)
 * - manage health and damage behavior
 *
 * @extends MovableObject
 */
class Character extends MovableObject {
  constructor() {
    super();

    // Initial position
    this.x = 50;
    this.y = 250;

    // Size of the character
    this.width = 150;
    this.height = 200;

    // Horizontal movement speed
    this.speed = 2;

    // Health system
    this.health = 100;
    this.isHurt = false;

    // Preload animation frames into cache
    this.loadImages(idleImages);
    this.loadImages(characterWalking);
    this.loadImages(hurtImages);

    // Set initial image (idle)
    this.img = this.imageCache[idleImages[0]];

    // Direction flag (false = right, true = left)
    this.otherDirection = false;
  }

  /**
   * Plays the walking animation.
   *
   * Called while the character is moving left or right.
   */
  playWalkingAnimation() {
    this.playAnimation(characterWalking);
  }

  /**
   * Plays the idle animation.
   *
   * Called when no movement input is active.
   */
  showIdleImage() {
    this.playAnimation(idleImages);
  }

  /**
   * Plays the hurt animation.
   *
   * Called while the character is in the "hurt" state.
   */
  playHurtAnimation() {
    this.playAnimation(hurtImages);
  }

  /**
   * Applies damage to the character.
   *
   * - Reduces health
   * - Activates temporary invulnerability (isHurt)
   * - Prevents continuous damage while touching an enemy
   */
  takeDamage() {
    if (!this.isHurt) {
      this.health -= 20;
      this.isHurt = true;

      if (this.health < 0) this.health = 0;

      // Reset hurt state after 1 second
      setTimeout(() => {
        this.isHurt = false;
      }, 1000);
    }
  }
}
