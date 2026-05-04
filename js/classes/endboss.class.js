const endbossWalkImages = [
  "assets/img/enemies/boss_chicken/1_walk/G1.png",
  "assets/img/enemies/boss_chicken/1_walk/G2.png",
  "assets/img/enemies/boss_chicken/1_walk/G3.png",
  "assets/img/enemies/boss_chicken/1_walk/G4.png",
];

const endbossHurtImages = [
  "assets/img/enemies/boss_chicken/4_hurt/G21.png",
  "assets/img/enemies/boss_chicken/4_hurt/G22.png",
  "assets/img/enemies/boss_chicken/4_hurt/G23.png",
];

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

    this.loadImages(endbossWalkImages);
    this.loadImages(endbossHurtImages);
    this.img = this.imageCache[endbossWalkImages[0]];

    this.x = 2450;
    this.y = 120;
    this.width = 260;
    this.height = 330;

    this.speed = 0.4;
    this.activationX = 1700;
    this.minDistanceToCharacter = 120;
    this.health = 100;

    this.isHurt = false;
    this.hurtTimeoutId = null;

  }
  /**
   * Updates the endboss movement and animation.
   *
   * @param {number} characterX - Current horizontal position of the character.
   * @returns {void}
   */
  update(characterX) {
    if (
      characterX >= this.activationX &&
      this.x > characterX + this.minDistanceToCharacter
    ) {
      this.x -= this.speed;
    }

    if (this.isHurt) {
      this.playAnimation(endbossHurtImages);
    } else {
      this.playAnimation(endbossWalkImages);
    }
  }
  /**
   * Reduces the endboss health after a bottle hit.
   *
   * @param {number} damage - Amount of damage taken.
   * @returns {void}
   */
  takeDamage(damage = 20) {
    this.health -= damage;

    if (this.health < 0) {
      this.health = 0;
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
