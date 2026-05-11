/**
 * Represents a collectible salsa bottle.
 */
class Bottle extends DrawableObject {
  /**
   * Creates a bottle at a specific x position.
   *
   * @param {number} x - Horizontal position.
   */
  constructor(x) {
    super();

    this.loadImage("assets/img/collectible/salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = x;
    this.y = 379;
    this.width = 60;
    this.height = 70;
    this.offset = {
      top: 15,
      right: 20,
      bottom: 5,
      left: 25,
    };
  }
}
