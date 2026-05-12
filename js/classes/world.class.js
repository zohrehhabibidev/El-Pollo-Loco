/**
 * Represents the game world and its objects.
 */
class World {
  /**
   * Creates the game world.
   *
   * @param {HTMLCanvasElement} canvas - The game canvas.
   * @param {Keyboard} keyboard - The keyboard input state.
   */
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.character = null;
    this.chickens = [];
    this.bottles = [];
    this.throwableObjects = [];
    this.coins = [];
    this.backgroundObjects = [];
    this.endboss = null;
    this.statusBar = null;
    this.bottleStatusBar = null;
    this.coinStatusBar = null;
    this.endbossStatusBar = null;
    this.bottleCount = 0;
    this.coinCount = 0;
  }

  /**
   * Creates the player character.
   *
   * @returns {void}
   */
  createCharacter() {
    this.character = new Character();
  }

  /**
   * Creates all chicken enemies.
   *
   * @returns {void}
   */
  createChickens() {
    this.chickens = [
      new Chicken(1200, "normal"),
      new Chicken(1500, "small"),
      new Chicken(1800, "normal"),
    ];
  }

  /**
   * Creates collectible bottles and resets the bottle counter.
   *
   * @returns {void}
   */
  createBottles() {
    this.bottles = [
      new Bottle(350),
      new Bottle(650),
      new Bottle(950),
      new Bottle(1150),
      new Bottle(1350),
      new Bottle(1550),
      new Bottle(1750),
      new Bottle(1950),
      new Bottle(2100),
    ];

    this.bottleCount = 0;
  }

  /**
   * Creates collectible coins and resets the coin counter.
   *
   * @returns {void}
   */
  createCoins() {
    this.coins = [
      new Coin(430, 190),
      new Coin(680, 140),
      new Coin(920, 210),
      new Coin(1180, 155),
      new Coin(1460, 185),
      new Coin(1700, 130),
    ];

    this.coinCount = 0;
  }

  /**
   * Creates all game status bars.
   *
   * @returns {void}
   */
  createStatusBars() {
    this.statusBar = new StatusBar();
    this.bottleStatusBar = new BottleStatusBar();
    this.coinStatusBar = new CoinStatusBar();
  }

  /**
   * Creates the endboss and its status bar.
   *
   * @returns {void}
   */
  createEndboss() {
    this.endboss = new Endboss();
    this.endbossStatusBar = new EndbossStatusBar();
  }

  /**
   * Creates all background objects for the game world.
   *
   * @returns {void}
   */
  createBackgroundObjects() {
    this.backgroundObjects = [
      new BackgroundObject("assets/img/background/layers/air.png", -720, 0),
      new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", -720, 0),
      new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", -720, 0),
      new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", -720, 0),
      new Cloud(-720, 0),

      new BackgroundObject("assets/img/background/layers/air.png", 0, 0),
      new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 0, 0),
      new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 0, 0),
      new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 0, 0),
      new Cloud(0, 0),

      new BackgroundObject("assets/img/background/layers/air.png", 720, 0),
      new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 720, 0),
      new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 720, 0),
      new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 720, 0),
      new Cloud(720, 0),

      new BackgroundObject("assets/img/background/layers/air.png", 1440, 0),
      new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 1440, 0),
      new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 1440, 0),
      new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 1440, 0),
      new Cloud(1440, 0),

      new BackgroundObject("assets/img/background/layers/air.png", 2160, 0),
      new BackgroundObject("assets/img/background/layers/3_third_layer/full.png", 2160, 0),
      new BackgroundObject("assets/img/background/layers/2_second_layer/full.png", 2160, 0),
      new BackgroundObject("assets/img/background/layers/1_first_layer/full.png", 2160, 0),
      new Cloud(2160, 0),
    ];
  }

  /**
   * Creates all objects that belong to the game world.
   *
   * @returns {void}
   */
  createWorld() {
    this.createCharacter();
    this.createChickens();
    this.createBottles();
    this.createCoins();
    this.createStatusBars();
    this.createEndboss();
    this.createBackgroundObjects();
  }
}
