/**
 * Represents the endboss health status bar.
 */
class EndbossStatusBar extends DrawableObject {
  constructor() {
    super();

    this.images = [
      "assets/img/ui/2_statusbar_endboss/orange/orange0.png",
      "assets/img/ui/2_statusbar_endboss/orange/orange20.png",
      "assets/img/ui/2_statusbar_endboss/orange/orange40.png",
      "assets/img/ui/2_statusbar_endboss/orange/orange60.png",
      "assets/img/ui/2_statusbar_endboss/orange/orange80.png",
      "assets/img/ui/2_statusbar_endboss/orange/orange100.png",
    ];

    this.loadImages(this.images);

    this.x = 440;
    this.y = 20;
    this.width = 260;
    this.height = 60;

    this.setPercentage(100);
  }
  /**
 * Updates the endboss status bar.
 *
 * @param {number} percentage - Endboss health percentage between 0 and 100.
 * @returns {void}
 */
  setPercentage(percentage) {
    this.percentage = percentage;
    const index = this.resolveImageIndex();
    this.img = this.imageCache[this.images[index]];
  }

  /**
   * Resolves the correct image index for the current percentage.
   *
   * @returns {number} Image index.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) return 5;
    if (this.percentage >= 80) return 4;
    if (this.percentage >= 60) return 3;
    if (this.percentage >= 40) return 2;
    if (this.percentage >= 20) return 1;
    return 0;
  }
}
