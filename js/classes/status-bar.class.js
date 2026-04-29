/**
 * Represents the health status bar of the player.
 *
 * Displays the current health percentage
 * using different images (0% to 100%).
 *
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {

  /**
   * Creates a new StatusBar instance.
   *
   * Initializes position, size, image set,
   * and sets the default health to 100%.
   */
  constructor() {
    super();

    this.x = 20;
    this.y = 20;
    this.width = 200;
    this.height = 60;

    /**
     * Array of image paths representing
     * different health levels.
     *
     * @type {string[]}
     */
    this.images = [
      "assets/img/ui/1_statusbar/2_statusbar_health/green/0.png",
      "assets/img/ui/1_statusbar/2_statusbar_health/green/20.png",
      "assets/img/ui/1_statusbar/2_statusbar_health/green/40.png",
      "assets/img/ui/1_statusbar/2_statusbar_health/green/60.png",
      "assets/img/ui/1_statusbar/2_statusbar_health/green/80.png",
      "assets/img/ui/1_statusbar/2_statusbar_health/green/100.png",
    ];

    this.loadImages(this.images);
    this.setPercentage(100);
  }

  /**
   * Updates the status bar based on health percentage.
   *
   * @param {number} percentage - Current health value (0–100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;

    let path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines which image index to use
   * based on the current health percentage.
   *
   * @returns {number} Index of the image to display.
   */
  resolveImageIndex() {
    if (this.percentage == 100) return 5;
    if (this.percentage >= 80) return 4;
    if (this.percentage >= 60) return 3;
    if (this.percentage >= 40) return 2;
    if (this.percentage >= 20) return 1;
    return 0;
  }
}
