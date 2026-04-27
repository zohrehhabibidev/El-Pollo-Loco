/**
 * Represents an object that can move.
 *
 * This class extends DrawableObject,
 * so it already has:
 * - image (img)
 * - position (x, y)
 * - size (width, height)
 * - draw() method
 *
 * This class adds:
 * - horizontal movement
 * - vertical movement
 * - simple gravity
 */
class MovableObject extends DrawableObject {
  constructor() {
    super();
    /**
     * Speed for moving left and right.
     */
    this.speed = 5;
    /**
    * Vertical speed.
    * Positive value → object moves up
    * Negative value → object moves down
    */
    this.speedY = 0;
    /**
    * Gravity strength.
    * This value reduces speedY over time.
    * It makes the object slow down while jumping
    * and then fall back down.
    */
    this.acceleration = 0.5;
  }
  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }
  /**
     * Checks if the object is above the ground.
     *
     * IMPORTANT:
     * The value 250 is only a temporary test ground.
     * Later, this should be replaced with real collision
     * or a real ground/platform position.
     *
     * In canvas:
     * smaller y = higher position
     * bigger y  = lower position
     */
  isAboveGround() {
    return this.y < 250;
  }
  /**
   * Makes the object jump.
   * Sets a positive vertical speed (speedY),
   * which moves the object upward.
   * Note:
   * This method only gives the initial jump force.
   * Gravity (applyGravity) will then reduce speedY over time
   * and bring the object back down.
   */
  jump() {
    this.speedY = 15;
  }
  /**
    * Applies simple gravity to the object.
    *
    * This function runs many times per second.
    *
    * If the object is above the ground
    * or still moving upward, it changes the y position
    * and reduces speedY using acceleration.
    *
    * This creates this movement:
    * jump up → slow down → fall down
    *
    * Note:
    * This is a simple test version of gravity.
    * Later, gravity should be connected to the main game loop
    * and real collision detection.
    */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60); // Run at 60 FPS (1000ms / 60 ≈ 16.67ms per frame)
  }
}
