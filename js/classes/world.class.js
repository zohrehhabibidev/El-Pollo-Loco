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
  }
}
