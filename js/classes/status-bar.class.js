/**
 * Represents the player's health status bar.
 *
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  /**
   * Creates the health status bar.
   */
  constructor() {
    super();

    this.x = 20;
    this.y = 20;
    this.width = 200;
    this.height = 60;

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
   * Updates the displayed health percentage.
   *
   * @param {number} percentage - Current health value from 0 to 100.
   * @returns {void}
   */
  setPercentage(percentage) {
    this.percentage = percentage;

    const path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Gets the image index for the current health percentage.
   *
   * @returns {number} Image index.
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
