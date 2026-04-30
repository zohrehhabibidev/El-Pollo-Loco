/**
 * Represents the coin status bar.
 */
class CoinStatusBar extends DrawableObject {
  constructor() {
    super();

    this.images = [
      "assets/img/ui/1_statusbar/1_statusbar_coin/orange/0.png",
      "assets/img/ui/1_statusbar/1_statusbar_coin/orange/20.png",
      "assets/img/ui/1_statusbar/1_statusbar_coin/orange/40.png",
      "assets/img/ui/1_statusbar/1_statusbar_coin/orange/60.png",
      "assets/img/ui/1_statusbar/1_statusbar_coin/orange/80.png",
      "assets/img/ui/1_statusbar/1_statusbar_coin/orange/100.png",
    ];

    this.loadImages(this.images);

    this.x = 20;
    this.y = 140;
    this.width = 200;
    this.height = 60;

    this.setPercentage(0);
  }

  /**
   * Updates the coin status bar.
   *
   * @param {number} percentage - Coin percentage between 0 and 100.
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
