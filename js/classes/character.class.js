/**
 * Walking animation frames.
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
 * Idle animation frames.
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
 * Long idle animation frames.
 *
 * @type {string[]}
 */
const longIdleImages = [
  "assets/img/character/1_idle/long_idle/I-11.png",
  "assets/img/character/1_idle/long_idle/I-12.png",
  "assets/img/character/1_idle/long_idle/I-13.png",
  "assets/img/character/1_idle/long_idle/I-14.png",
  "assets/img/character/1_idle/long_idle/I-15.png",
  "assets/img/character/1_idle/long_idle/I-16.png",
  "assets/img/character/1_idle/long_idle/I-17.png",
  "assets/img/character/1_idle/long_idle/I-18.png",
  "assets/img/character/1_idle/long_idle/I-19.png",
  "assets/img/character/1_idle/long_idle/I-20.png",
];

/**
 * Dead animation frames.
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
 * Hurt animation frames.
 *
 * @type {string[]}
 */
const hurtImages = [
  "assets/img/character/4_hurt/H-41.png",
  "assets/img/character/4_hurt/H-42.png",
  "assets/img/character/4_hurt/H-43.png",
];

/**
 * Jump animation frames.
 *
 * @type {string[]}
 */
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
 * @extends MovableObject
 */
class Character extends MovableObject {
  /**
   * Creates the player character.
   */
  constructor() {
    super();

    this.x = 50;
    this.y = 250;
    this.width = 150;
    this.height = 200;
    this.speed = 3;
    this.health = 100;
    this.isHurt = false;
    this.visible = true;

    this.loadImages(idleImages);
    this.loadImages(longIdleImages);
    this.lastActivityTime = Date.now();
    this.isSleeping = false;

    this.loadImages(characterWalking);
    this.loadImages(hurtImages);
    this.loadImages(deadImages);
    this.loadImages(jumpImages);

    this.img = this.imageCache[idleImages[0]];
    this.otherDirection = false;
  }

  /**
   * Plays the walking animation.
   *
   * @returns {void}
   */
  playWalkingAnimation() {
    this.playAnimation(characterWalking);
  }

  /**
   * Plays the idle animation.
   *
   * @returns {void}
   */
  showIdleImage() {
    this.playAnimation(idleImages);
  }

  /**
   * Resets the inactivity timer.
   *
   * @returns {void}
   */
  resetInactivityTimer() {
    this.lastActivityTime = Date.now();

    if (this.isSleeping) {
      this.isSleeping = false;
      this.currentImage = 0;
      this.animationCounter = 0;
    }
  }

  /**
   * Checks if the character has been inactive long enough.
   *
   * @returns {boolean} True if the character is long idle.
   */
  isLongIdle() {
    return Date.now() - this.lastActivityTime >= 15000;
  }

  /**
   * Plays the long idle animation.
   *
   * @returns {void}
   */
  showLongIdleImage() {
    if (!this.isSleeping) {
      this.isSleeping = true;
      this.currentImage = 0;
      this.animationCounter = 0;
    }

    this.playAnimation(longIdleImages);
  }

  /**
   * Plays the hurt animation.
   *
   * @returns {void}
   */
  playHurtAnimation() {
    this.playAnimation(hurtImages);
  }

  /**
   * Plays the dead animation once.
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
   * @returns {void}
   */
  takeDamage() {
    if (!this.isHurt) {
      this.health -= 20;
      this.isHurt = true;

      if (this.health < 0) this.health = 0;

      setTimeout(() => {
        this.isHurt = false;
      }, 1000);
    }
  }

  /**
   * Checks whether the character is dead.
   *
   * @returns {boolean} True if the character is dead.
   */
  isDead() {
    return this.health <= 0;
  }

  /**
   * Shows the jump image based on vertical speed.
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
