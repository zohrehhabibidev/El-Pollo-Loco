const endbossWalkImages = [
  "assets/img/enemies/boss_chicken/1_walk/G1.png",
  "assets/img/enemies/boss_chicken/1_walk/G2.png",
  "assets/img/enemies/boss_chicken/1_walk/G3.png",
  "assets/img/enemies/boss_chicken/1_walk/G4.png",
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
    this.img = this.imageCache[endbossWalkImages[0]];

    this.x = 2100;
    this.y = 120;
    this.width = 260;
    this.height = 330;

    this.speed = 0.4;

  }

  /**
 * Updates the endboss animation.
 *
 * @returns {void}
 */
  update() {
    this.playAnimation(endbossWalkImages);
  }

  /**
   * Updates the endboss movement and animation.
   *
   * @returns {void}
   */
  update() {
    this.x -= this.speed;
    this.playAnimation(endbossWalkImages);
  }
}
