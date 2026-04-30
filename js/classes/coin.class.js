/**
 * Represents a collectible coin in the game world.
 */
class Coin extends DrawableObject {
  /**
   * Creates a coin at a specific position.
   *
   * @param {number} x - Horizontal position of the coin.
   * @param {number} y - Vertical position of the coin.
   */
  constructor(x, y) {
    super();

    this.loadImage("assets/img/collectible/coin/coin_1.png");

    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
  }
}
