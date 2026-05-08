/**
 * Represents the bottle status bar.
 */
class BottleStatusBar extends DrawableObject {
  /**
   * Creates the bottle status bar.
   */
  constructor() {
    super();

    this.images = [
      "assets/img/ui/1_statusbar/3_statusbar_bottle/orange/0.png",
      "assets/img/ui/1_statusbar/3_statusbar_bottle/orange/20.png",
      "assets/img/ui/1_statusbar/3_statusbar_bottle/orange/40.png",
      "assets/img/ui/1_statusbar/3_statusbar_bottle/orange/60.png",
      "assets/img/ui/1_statusbar/3_statusbar_bottle/orange/80.png",
      "assets/img/ui/1_statusbar/3_statusbar_bottle/orange/100.png",
    ];

    this.loadImages(this.images);

    this.x = 20;
    this.y = 80;
    this.width = 200;
    this.height = 60;

    this.setPercentage(0);
  }

  /**
   * Updates the bottle status bar.
   *
   * @param {number} percentage - Bottle percentage between 0 and 100.
   * @returns {void}
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    const index = this.resolveImageIndex();
    this.img = this.imageCache[this.images[index]];
  }

  /**
   * Resolves the image index for the current percentage.
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
