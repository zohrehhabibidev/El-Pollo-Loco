/**
 * Represents the endboss enemy at the end of the level.
 *
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  /**
   * Creates the endboss with its position, size, health, and chase settings.
   */
  constructor() {
    super();
    this.endbossWalkImages = [
      "assets/img/enemies/boss_chicken/1_walk/G1.png",
      "assets/img/enemies/boss_chicken/1_walk/G2.png",
      "assets/img/enemies/boss_chicken/1_walk/G3.png",
      "assets/img/enemies/boss_chicken/1_walk/G4.png",
    ];

    this.endbossHurtImages = [
      "assets/img/enemies/boss_chicken/4_hurt/G21.png",
      "assets/img/enemies/boss_chicken/4_hurt/G22.png",
      "assets/img/enemies/boss_chicken/4_hurt/G23.png",
    ];

    this.endbossDeadImages = [
      "assets/img/enemies/boss_chicken/5_dead/G24.png",
      "assets/img/enemies/boss_chicken/5_dead/G25.png",
      "assets/img/enemies/boss_chicken/5_dead/G26.png",
    ];

    this.loadImages(this.endbossWalkImages);
    this.loadImages(this.endbossHurtImages);
    this.loadImages(this.endbossDeadImages);
    this.img = this.imageCache[this.endbossWalkImages[0]];

    this.x = 3170;
    this.y = 135;
    this.width = 260;
    this.height = 330;
    this.offset = {
      top: 85,
      right: 45,
      bottom: 20,
      left: 45,
    };
    this.speed = 4.5;
    this.activationX = 2420;
    this.health = 100;
    this.isDead = false;
    this.isHurt = false;
    this.hurtTimeoutId = null;
    this.isActivated = false;
    this.chaseRange = 800;
    this.stopDistance = 40;
  }

  /**
   * Updates endboss activation, movement, and animation.
   *
   * @param {number} characterX - The character x position.
   * @returns {void}
   */
  update(characterX) {
    this.activateIfNeeded(characterX);

    if (this.isDead) {
      this.playDeadAnimation();
      return;
    }

    if (this.isActivated) {
      this.chaseCharacter(characterX);
    }

    if (this.isHurt) {
      this.playHurtAnimation();
    } else {
      this.playWalkingAnimation();
    }
  }

  /**
   * Reduces the endboss health after a bottle hit.
   *
   * @param {number} [damage=20] - Amount of damage taken.
   * @returns {void}
   */
  takeDamage(damage = 20) {
    if (this.isDead) {
      return;
    }

    this.health -= damage;

    if (this.health < 0) {
      this.health = 0;
    }

    if (this.health === 0) {
      this.isDead = true;
      this.isHurt = false;
      this.currentImage = 0;
      this.animationCounter = 0;

      if (this.hurtTimeoutId) {
        clearTimeout(this.hurtTimeoutId);
        this.hurtTimeoutId = null;
      }

      return;
    }

    this.isHurt = true;

    if (this.hurtTimeoutId) {
      clearTimeout(this.hurtTimeoutId);
    }

    this.hurtTimeoutId = setTimeout(() => {
      this.isHurt = false;
      this.hurtTimeoutId = null;
    }, 1000);
  }

  /**
   * Activates the endboss when the character reaches the activation point.
   *
   * @param {number} characterX - The character x position.
   * @returns {void}
   */
  activateIfNeeded(characterX) {
    if (characterX >= this.activationX) {
      this.isActivated = true;
    }
  }

  /**
   * Moves the endboss toward the character while the character is in chase range.
   *
   * @param {number} characterX - The character x position.
   * @returns {void}
   */
  chaseCharacter(characterX) {
    const distanceToCharacter = characterX - this.x;
    const absoluteDistance = Math.abs(distanceToCharacter);

    if (absoluteDistance > this.chaseRange || absoluteDistance <= this.stopDistance) {
      return;
    }

    if (distanceToCharacter < 0) {
      this.x -= this.speed;
    } else {
      this.x += this.speed;
    }
  }

  /**
   * Plays the endboss walking animation.
   *
   * @returns {void}
   */
  playWalkingAnimation() {
    this.playAnimation(this.endbossWalkImages);
  }

  /**
   * Plays the endboss hurt animation.
   *
   * @returns {void}
   */
  playHurtAnimation() {
    this.playAnimation(this.endbossHurtImages);
  }

  /**
   * Plays the endboss dead animation once.
   *
   * @returns {void}
   */
  playDeadAnimation() {
    if (this.currentImage >= this.endbossDeadImages.length) {
      const lastDeadImage = this.endbossDeadImages[this.endbossDeadImages.length - 1];
      this.img = this.imageCache[lastDeadImage];
      return;
    }

    this.img = this.imageCache[this.endbossDeadImages[this.currentImage]];
    this.animationCounter++;

    if (this.animationCounter >= this.animationDelay) {
      this.animationCounter = 0;
      this.currentImage++;
    }
  }
}
