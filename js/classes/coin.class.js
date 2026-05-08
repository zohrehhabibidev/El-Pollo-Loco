/**
 * Represents a collectible coin.
 */
class Coin extends DrawableObject {
  /**
   * Creates a coin at a specific position.
   *
   * @param {number} x - Horizontal position.
   * @param {number} y - Vertical position.
   */
  constructor(x, y) {
    super();

    this.loadImage("assets/img/collectible/coin/coin_1.png");

    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
  }
}
