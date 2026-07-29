/**
 * Creates the character and status bars for a world during setup.
 */
class WorldBuilder {
  /**
   * Creates a builder for the provided world.
   *
   * @param {World} world - The world to set up.
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Creates the player character.
   *
   * @returns {void}
   */
  createCharacter() {
    this.world.character = new Character();
  }

  /**
   * Creates the health, bottle, coin, and endboss status bars.
   *
   * @returns {void}
   */
  createStatusBars() {
    this.world.statusBar = new StatusBar();
    this.world.bottleStatusBar = new BottleStatusBar();
    this.world.coinStatusBar = new CoinStatusBar();
    this.world.endbossStatusBar = new EndbossStatusBar();
  }

  /**
   * Creates the character and status bars for the game world.
   *
   * @returns {void}
   */
  createWorld() {
    this.createCharacter();
    this.createStatusBars();
  }
}
