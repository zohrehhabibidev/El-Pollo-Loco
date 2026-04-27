/**
 * Represents the player character in the game.
 *
 * This class extends MovableObject,
 * so it already has:
 * - image (img)
 * - position (x, y)
 * - size (width, height)
 * - draw() method
 * - movement (speed, moveRight, moveLeft)
 *
 * We use this class to define the player character
 * and load its specific image.
 *
 * Note:
 * Movement is handled by MovableObject (using speed),
 * so we do not need to redefine moveRight or moveLeft here.
 */
class Character extends MovableObject {
  constructor() {
    super();
    this.x = 50;
    this.y = 50;
    this.width = 150;
    this.height = 200;
    this.speed = 2;
    this.loadImage("assets/img/character/1_idle/idle/I-1.png");
    this.applyGravity();
  }
}
