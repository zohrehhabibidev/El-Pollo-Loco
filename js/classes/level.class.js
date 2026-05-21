/**
 * Represents one game level with all level-specific objects.
 */
class Level {
  /**
   * Creates a level with enemies, collectibles, background objects, and world settings.
   *
   * @param {Chicken[]} chickens - Chicken enemies in the level.
   * @param {Bottle[]} bottles - Collectible bottles in the level.
   * @param {Coin[]} coins - Collectible coins in the level.
   * @param {(BackgroundObject|Cloud)[]} backgroundObjects - Background and cloud objects.
   * @param {Endboss} endboss - The level endboss.
   * @param {number} worldEnd - The x position where the playable world ends.
   */
  constructor(chickens, bottles, coins, backgroundObjects, endboss, worldEnd) {
    this.chickens = chickens;
    this.bottles = bottles;
    this.coins = coins;
    this.backgroundObjects = backgroundObjects;
    this.endboss = endboss;
    this.worldEnd = worldEnd;
    this.maxBottleCount = bottles.length;
  }
}
