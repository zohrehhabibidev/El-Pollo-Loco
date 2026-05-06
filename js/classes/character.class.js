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
 * These frames are played when the character is not moving.
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
 * Paths for the dead animation frames.
 *
 * These frames are played when the character dies.
 *
 * @type {string[]}
 */
const deadImages = [
  "assets/img/character/5_dead/D-51.png",
  "assets/img/character/5_dead/D-52.png",
  "assets/img/character/5_dead/D-53.png",
  "assets/img/character/5_dead/D-54.png",
  "assets/img/character/5_dead/D-55.png",
  "assets/img/character/5_dead/D-56.png",
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

const jumpImages = [
  "assets/img/character/3_jump/J-31.png",
  "assets/img/character/3_jump/J-32.png",
  "assets/img/character/3_jump/J-33.png",
  "assets/img/character/3_jump/J-34.png",
  "assets/img/character/3_jump/J-35.png",
  "assets/img/character/3_jump/J-36.png",
  "assets/img/character/3_jump/J-37.png",
  "assets/img/character/3_jump/J-38.png",
  "assets/img/character/3_jump/J-39.png",
];

/**
 * Represents the main player character.
 *
 * Responsibilities:
 * - manage position, size, and movement
 * - handle animation states (idle, walking, hurt, dead)
 * - manage health and damage behavior
 *
 * @extends MovableObject
 */
class Character extends MovableObject {
  constructor() {
    super();

    // Initial position in the world
    this.x = 50;
    this.y = 250;

    // Character dimensions
    this.width = 150;
    this.height = 200;

    // Horizontal movement speed
    this.speed = 2;

    // Health system
    this.health = 100;
    this.isHurt = false;

    // Visibility flag (used after death)
    this.visible = true;

    // Preload all animation frames into cache
    this.loadImages(idleImages);
    this.loadImages(characterWalking);
    this.loadImages(hurtImages);
    this.loadImages(deadImages);
    this.loadImages(jumpImages);

    // Set initial image (idle state)
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
   * Called when no movement input is active.
   */
  showIdleImage() {
    this.playAnimation(idleImages);
  }

  /**
   * Plays the hurt animation.
   *
   * Called while the character is in the hurt state.
   */
  playHurtAnimation() {
    this.playAnimation(hurtImages);
  }

  /**
  * Plays the character dead animation once and stops on the last frame.
  *
  * @returns {void}
  */
  playDeadAnimation() {
    if (this.currentImage >= deadImages.length) {
      this.img = this.imageCache[deadImages[deadImages.length - 1]];
      return;
    }

    this.img = this.imageCache[deadImages[this.currentImage]];

    this.animationCounter++;

    if (this.animationCounter >= this.animationDelay) {
      this.animationCounter = 0;
      this.currentImage++;
    }
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

  /**
   * Checks whether the character is dead.
   *
   * @returns {boolean} True if health is zero or below
   */
  isDead() {
    return this.health <= 0;
  }

  /**
 * Shows the character jump image based on vertical speed.
 *
 * @returns {void}
 */
  playJumpAnimation() {
    if (this.speedY > 1) {
      this.img = this.imageCache[jumpImages[3]];
    } else if (this.speedY < -1) {
      this.img = this.imageCache[jumpImages[6]];
    } else {
      this.img = this.imageCache[jumpImages[4]];
    }
  }
}
