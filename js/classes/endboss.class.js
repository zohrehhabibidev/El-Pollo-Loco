/**
 * Represents the endboss enemy at the end of the level.
 *
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  /**
   * Creates the endboss with its start position and size.
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
    this.speed = 2;
    this.activationX = 2420;
    this.minDistanceToCharacter = 60;
    this.health = 100;
    this.isDead = false;
    this.isHurt = false;
    this.hurtTimeoutId = null;
  }

  /**
   * Updates the endboss movement and animation.
   *
   * @param {number} characterX - Current x position of the character.
   * @returns {void}
   */
  update(characterX) {
    if (this.isDead) {
      this.playAnimation(this.endbossDeadImages);
      return;
    }

    if (this.isHurt) {
      this.playAnimation(this.endbossHurtImages);
      return;
    }

    if (
      characterX >= this.activationX &&
      this.x - characterX > this.minDistanceToCharacter
    ) {
      this.x -= this.speed;
    }

    this.playAnimation(this.endbossWalkImages);
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
}
