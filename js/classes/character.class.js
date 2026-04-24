/**
 * Represents the player character in the game.
 *
 * This class stores:
 * - the image of the character
 * - its position (x, y)
 * - its size (width, height)
 *
 * We use a class to keep all character data and actions
 * (like drawing and movement) in one place.
 *
 * Behavior:
 * draw(ctx)   → draws the character on the canvas
 * moveRight() → moves the character to the right
 * moveLeft()  → moves the character to the left
 */
class Character {
  constructor() {
    this.img = new Image();  //Each character has its own image.
    this.x = 50;
    this.y = 50;
    this.width = 100;
    this.height = 200;
    this.img.src = "assets/img/character/1_idle/idle/I-1.png";
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  moveRight() {
    this.x += 2;
  }

  moveLeft() {
    this.x -= 2;
  }
}
