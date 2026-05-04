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

    this.x = 20;
    this.y = 200;
    this.width = 200;
    this.height = 60;
  }
}
