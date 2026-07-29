/**
 * Handles keyboard-driven character movement, animation, and jumping.
 */
class CharacterController {
  /**
   * Creates a controller for the provided world's character.
   *
   * @param {World} world - The world whose character this controller drives.
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Updates the character inactivity timer.
   *
   * @returns {void}
   */
  updateCharacterActivity() {
    if (this.isPlayerActive()) {
      this.world.character.resetInactivityTimer();
    }
  }

  /**
   * Moves the character to the right and plays walking animation.
   *
   * @returns {void}
   */
  moveCharacterRight() {
    this.world.character.moveRight();
    this.world.character.otherDirection = false;
    this.world.character.playWalkingAnimation();
  }

  /**
   * Moves the character to the left and plays walking animation.
   *
   * @returns {void}
   */
  moveCharacterLeft() {
    if (this.world.character.x > 0) {
      this.world.character.moveLeft();
    }

    this.world.character.otherDirection = true;
    this.world.character.playWalkingAnimation();
  }

  /**
   * Moves the character horizontally while jumping.
   *
   * @returns {void}
   */
  moveCharacterInAir() {
    if (this.world.keyboard.RIGHT && this.world.character.x < this.world.worldEnd) {
      this.world.character.moveRight();
      this.world.character.otherDirection = false;
    } else if (this.world.keyboard.LEFT && this.world.character.x > 0) {
      this.world.character.moveLeft();
      this.world.character.otherDirection = true;
    }
  }

  /**
   * Updates character animation and horizontal movement.
   *
   * @returns {void}
   */
  updateCharacterAnimation() {
    if (this.world.character.isHurt) {
      if (this.world.keyboard.RIGHT && this.world.character.x < this.world.worldEnd) {
        this.world.character.moveRight();
        this.world.character.otherDirection = false;
      } else if (this.world.keyboard.LEFT && this.world.character.x > 0) {
        this.world.character.moveLeft();
        this.world.character.otherDirection = true;
      }

      this.world.character.playHurtAnimation();
    } else if (this.world.character.isAboveGround()) {
      this.moveCharacterInAir();
      this.world.character.playJumpAnimation();
    } else if (this.world.keyboard.RIGHT && this.world.character.x < this.world.worldEnd) {
      this.moveCharacterRight();
    } else if (this.world.keyboard.LEFT) {
      this.moveCharacterLeft();
    } else if (this.world.character.isLongIdle()) {
      this.world.character.showLongIdleImage();
    } else {
      this.world.character.showIdleImage();
    }
  }

  /**
   * Handles character jump input and jump sound.
   *
   * @returns {void}
   */
  handleCharacterJump() {
    if (this.world.keyboard.SPACE && !this.world.character.isAboveGround()) {
      this.world.playSound(this.world.characterJumpSound);
      this.world.character.jump();
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
    this.world.character.updateGravity();
  }

  /**
   * Checks if the player is pressing an action key.
   *
   * @returns {boolean} True if the player is currently active.
   */
  isPlayerActive() {
    return this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.SPACE ||
      this.world.keyboard.D;
  }
}
