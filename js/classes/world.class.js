
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
    this.COIN_HITBOX_HORIZONTAL_INSET = 35;
    this.COIN_HITBOX_TOP_OFFSET = 10;
    this.COIN_HITBOX_BOTTOM_OFFSET = 90;
    this.COIN_STATUS_PERCENT_PER_COIN = 20;
    this.maxBottleCount = 9;
    this.thrownBottleXOffset = 100;
    this.thrownBottleYOffset = 120;
    this.bottleOutOfBoundsLeft = -200;
    this.bottleOutOfBoundsRightMargin = 400;
    this.bottleOutOfBoundsBottomMargin = 200;
    this.worldEnd = 2260;
    this.cameraXOffset = 100;
    this.chickenStompTolerance = 40;

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

  /**
   * Clears the whole canvas.
   *
   * @returns {void}
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Calculates the camera x position.
   *
   * @returns {number} The camera x position.
   */
  getCameraX() {
    return Math.max(0, this.character.x - this.cameraXOffset);
  }

  /**
   * Applies the camera translation to the canvas context.
   *
   * @returns {void}
   */
  applyCameraTransform() {
    this.ctx.translate(-this.getCameraX(), 0);
  }

  /**
 * Draws all background objects.
 *
 * @returns {void}
 */
  drawBackgroundObjects() {
    this.backgroundObjects.forEach((bg) => bg.draw(this.ctx));
  }

  /**
 * Draws collectible and throwable objects.
 *
 * @returns {void}
 */
  drawCollectibleObjects() {
    this.bottles.forEach((bottle) => {
      bottle.draw(this.ctx);
    });

    this.throwableObjects.forEach((bottle) => {
      bottle.draw(this.ctx);
    });

    this.coins.forEach((coin) => {
      coin.draw(this.ctx);
    });
  }

  /**
 * Draws enemy objects.
 *
 * @returns {void}
 */
  drawEnemyObjects() {
    this.chickens.forEach((chicken) => {
      chicken.draw(this.ctx);
    });

    this.endboss.draw(this.ctx);
  }

  /**
 * Draws the character when visible.
 *
 * @returns {void}
 */
  drawCharacterIfVisible() {
    if (this.character.visible) {
      this.character.draw(this.ctx);
    }
  }

  /**
 * Draws all game objects inside the moving world.
 *
 * @returns {void}
 */
  drawWorld() {
    this.ctx.save();
    this.applyCameraTransform();

    this.drawBackgroundObjects();
    this.drawCollectibleObjects();
    this.drawEnemyObjects();

    this.ctx.restore();
  }

  /**
 * Draws fixed UI elements.
 *
 * @returns {void}
 */
  drawFixedUi() {
    this.statusBar.draw(this.ctx);
    this.bottleStatusBar.draw(this.ctx);
    this.coinStatusBar.draw(this.ctx);

    if (this.character.x >= this.endboss.activationX) {
      this.endbossStatusBar.draw(this.ctx);
    }
  }

  /**
 * Draws the character with the camera transform.
 *
 * @returns {void}
 */
  drawCharacterWithCamera() {
    this.ctx.save();

    this.applyCameraTransform();
    this.drawCharacterIfVisible();

    this.ctx.restore();
  }

  /**
  * Draws the current game frame.
  *
  * @returns {void}
  */
  draw() {
    this.clearCanvas();
    this.drawWorld();
    this.drawFixedUi();
    this.drawCharacterWithCamera();
  }

  /**
  * Updates the character inactivity timer.
  *
  * @returns {void}
  */
  updateCharacterActivity() {
    if (this.isPlayerActive()) {
      this.character.resetInactivityTimer();
    }
  }

  /**
   * Moves the character to the right and plays walking animation.
   *
   * @returns {void}
   */
  moveCharacterRight() {
    this.character.moveRight();
    this.character.otherDirection = false;
    this.character.playWalkingAnimation();
  }

  /**
   * Moves the character to the left and plays walking animation.
   *
   * @returns {void}
   */
  moveCharacterLeft() {
    if (this.character.x > 0) {
      this.character.moveLeft();
    }

    this.character.otherDirection = true;
    this.character.playWalkingAnimation();
  }

  /**
   * Moves the character horizontally while jumping.
   *
   * @returns {void}
   */
  moveCharacterInAir() {
    if (this.keyboard.RIGHT && this.character.x < this.worldEnd) {
      this.character.moveRight();
      this.character.otherDirection = false;
    } else if (this.keyboard.LEFT && this.character.x > 0) {
      this.character.moveLeft();
      this.character.otherDirection = true;
    }
  }

  /**
   * Updates character animation and horizontal movement.
   *
   * @returns {void}
   */
  updateCharacterAnimation() {
    if (this.character.isHurt) {
      this.character.playHurtAnimation();
    } else if (this.character.isAboveGround()) {
      this.moveCharacterInAir();
      this.character.playJumpAnimation();
    } else if (this.keyboard.RIGHT && this.character.x < this.worldEnd) {
      this.moveCharacterRight();
    } else if (this.keyboard.LEFT) {
      this.moveCharacterLeft();
    } else if (this.character.isLongIdle()) {
      this.character.showLongIdleImage();
    } else {
      this.character.showIdleImage();
    }
  }

  /**
   * Handles character jump input and jump sound.
   *
   * @returns {void}
   */
  handleCharacterJump() {
    if (this.keyboard.SPACE && !this.character.isAboveGround()) {
      playSound(characterJumpSound);
      this.character.jump();
    }
  }

  /**
   * Updates character animation, jumping, and gravity.
   *
   * @returns {void}
   */
  updateCharacter() {
    this.updateCharacterAnimation();
    this.handleCharacterJump();
    this.character.updateGravity();
  }

  /**
   * Updates all enemies.
   *
   * @returns {void}
   */
  updateEnemies() {
    this.chickens.forEach((chicken) => {
      chicken.update();
    });

    this.endboss.update(this.character.x);
  }

  /**
   * Updates all moving cloud objects.
   *
   * @returns {void}
   */
  updateClouds() {
    this.backgroundObjects.forEach((bg) => {
      if (bg instanceof Cloud) {
        bg.update();
      }
    });
  }

  /**
   * Checks if the player is pressing an action key.
   *
   * @returns {boolean} True if the player is currently active.
   */
  isPlayerActive() {
    return this.keyboard.RIGHT ||
      this.keyboard.LEFT ||
      this.keyboard.SPACE ||
      this.keyboard.D;
  }

  /**
   * Updates character, enemies, and background movement.
   *
   * @returns {void}
   */
  updateFrame() {
    this.updateCharacterActivity();
    this.updateCharacter();
    this.updateEnemies();
    this.updateClouds();
    this.collectBottles();
    this.collectCoins();
    this.throwBottle();
    this.updateBottleSplashes();
    this.removeMissedBottles();
  }

  /**
 * Checks if the character lands on top of a chicken.
 *
 * @param {Chicken} chicken - The chicken to check.
 * @returns {boolean} True if the character hits the chicken from above while falling.
 */
  isJumpingOnChicken(chicken) {
    const characterBox = this.character.getCollisionBox();
    const chickenBox = chicken.getCollisionBox();

    return this.character.isColliding(chicken) &&
      this.character.speedY < 0 &&
      characterBox.bottom <= chickenBox.top + this.chickenStompTolerance;
  }

  /**
   * Handles jumping on a chicken.
   *
   * @param {Chicken} chicken - The chicken hit from above.
   * @returns {void}
   */
  handleChickenStomp(chicken) {
    chicken.die();
    this.character.speedY = 10;
  }

  /**
   * Damages the character after touching a chicken.
   *
   * @returns {void}
   */
  damageCharacterFromChicken() {
    const oldHealth = this.character.health;
    this.character.takeDamage();

    if (this.character.health < oldHealth) {
      playCharacterDamageSound();
    }

    this.statusBar.setPercentage(this.character.health);
  }

  /**
   * Handles one chicken collision with the character.
   *
   * @param {Chicken} chicken - The chicken to check.
   * @returns {void}
   */
  handleChickenCollision(chicken) {
    if (!chicken.isDead && this.isJumpingOnChicken(chicken)) {
      this.handleChickenStomp(chicken);
    } else if (!chicken.isDead && this.character.isColliding(chicken)) {
      this.damageCharacterFromChicken();
    }
  }

  /**
   * Checks collisions between the character and chickens.
   *
   * @returns {void}
   */
  checkChickenCollisions() {
    this.chickens.forEach((chicken) => {
      this.handleChickenCollision(chicken);
    });
  }

  /**
   * Checks collision between the character and the endboss.
   *
   * @returns {void}
   */
  checkCharacterEndbossCollision() {
    if (!this.endboss.isDead && this.character.isColliding(this.endboss)) {
      const oldHealth = this.character.health;
      this.character.takeDamage();

      if (this.character.health < oldHealth) {
        playCharacterDamageSound();
      }

      this.statusBar.setPercentage(this.character.health);
    }
  }

  /**
   * Checks all character and enemy collisions.
   *
   * @returns {void}
   */
  handleCollisions() {
    this.checkChickenCollisions();
    this.checkCharacterEndbossCollision();
  }

  /**
 * Handles collecting a bottle.
 *
 * @returns {void}
 */
  handleBottleCollect() {
    this.bottleCount++;
    this.bottleStatusBar.setPercentage((this.bottleCount / this.maxBottleCount) * 100);
    playSound(bottleCollectSound);
  }


  /**
   * Checks if the character collects a bottle.
   *
   * @returns {void}
   */
  collectBottles() {
    this.bottles = this.bottles.filter((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.handleBottleCollect();
        return false;
      }

      return true;
    });
  }

  /**
 * Gets the character bounds for coin collection.
 *
 * @returns {{left: number, right: number, top: number, bottom: number}} The character collection bounds.
 */
  getCharacterCoinBounds() {
    return {
      left: this.character.x + this.COIN_HITBOX_HORIZONTAL_INSET,
      right: this.character.x + this.character.width - this.COIN_HITBOX_HORIZONTAL_INSET,
      top: this.character.y + this.COIN_HITBOX_TOP_OFFSET,
      bottom: this.character.y + this.COIN_HITBOX_BOTTOM_OFFSET,
    };
  }

  /**
 * Gets the center position of a coin.
 *
 * @param {Coin} coin - The coin to check.
 * @returns {{x: number, y: number}} The coin center position.
 */
  getCoinCenter(coin) {
    return {
      x: coin.x + coin.width / 2,
      y: coin.y + coin.height / 2,
    };
  }

  /**
 * Checks if the character collects a coin with the upper body while jumping.
 *
 * @param {Coin} coin - The coin to check.
 * @returns {boolean} True when the coin center touches the character's upper body while airborne.
 */
  isCollectingCoin(coin) {
    const characterBounds = this.getCharacterCoinBounds();
    const coinCenter = this.getCoinCenter(coin);

    return this.character.isAboveGround() &&
      coinCenter.x > characterBounds.left &&
      coinCenter.x < characterBounds.right &&
      coinCenter.y > characterBounds.top &&
      coinCenter.y < characterBounds.bottom;
  }

  /**
 * Handles collecting a coin.
 *
 * @returns {void}
 */
  handleCoinCollect() {
    this.coinCount++;
    this.coinStatusBar.setPercentage(Math.min(100, this.coinCount * this.COIN_STATUS_PERCENT_PER_COIN));
    playSound(coinCollectSound);
  }

  /**
   * Checks if the character collects a coin.
   *
   * @returns {void}
   */
  collectCoins() {
    this.coins = this.coins.filter((coin) => {
      if (this.isCollectingCoin(coin)) {
        this.handleCoinCollect();
        return false;
      }

      return true;
    });
  }

  /**
   * Throws a bottle when the throw key is pressed and bottles are available.
   *
   * @returns {void}
   */
  throwBottle() {
    if (this.keyboard.D && this.bottleCount > 0 && !this.character.isHurt) {
      const bottleX = this.character.otherDirection
        ? this.character.x
        : this.character.x + this.thrownBottleXOffset;

      const bottle = new ThrowableObject(
        bottleX,
        this.character.y + this.thrownBottleYOffset,
        this.character.otherDirection
      );

      this.throwableObjects.push(bottle);
      this.bottleCount--;
      this.bottleStatusBar.setPercentage((this.bottleCount / this.maxBottleCount) * 100);
      this.keyboard.D = false;
    }
  }

  /**
 * Updates splash animations for thrown bottles.
 *
 * @returns {void}
 */
  updateBottleSplashes() {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.hasSplashed) {
        bottle.playSplashAnimation();
      }
    });
  }

  /**
 * Checks if a thrown bottle is outside the playable area.
 *
 * @param {ThrowableObject} bottle - The thrown bottle to check.
 * @returns {boolean} True if the bottle is outside the playable area.
 */
  isBottleOutOfBounds(bottle) {
    const isOutsideWorld = bottle.x < this.bottleOutOfBoundsLeft ||
      bottle.x > this.worldEnd + this.bottleOutOfBoundsRightMargin;
    const isBelowCanvas = bottle.y > this.canvas.height + this.bottleOutOfBoundsBottomMargin;

    return isOutsideWorld || isBelowCanvas;
  }

  /**
 * Stops a missed bottle before removing it from the game.
 *
 * @param {ThrowableObject} bottle - The thrown bottle to check.
 * @returns {void}
 */
  stopMissedBottleIfNeeded(bottle) {
    if (!bottle.markedForRemoval && !bottle.hasSplashed && this.isBottleOutOfBounds(bottle)) {
      bottle.stopMovement();
    }
  }

  /**
   * Checks if a thrown bottle should stay active.
   *
   * @param {ThrowableObject} bottle - The thrown bottle to check.
   * @returns {boolean} True if the bottle should stay in the game.
   */
  shouldKeepBottle(bottle) {
    if (bottle.markedForRemoval) {
      return false;
    }

    if (bottle.hasSplashed) {
      return true;
    }

    return !this.isBottleOutOfBounds(bottle);
  }

  /**
 * Stops missed bottles and removes inactive thrown bottles.
 *
 * @returns {void}
 */
  removeMissedBottles() {
    this.throwableObjects.forEach(this.stopMissedBottleIfNeeded.bind(this));
    this.throwableObjects = this.throwableObjects.filter(this.shouldKeepBottle.bind(this));
  }

}
