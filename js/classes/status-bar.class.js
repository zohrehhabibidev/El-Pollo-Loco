class StatusBar extends DrawableObject {
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

  setPercentage(percentage) {
    this.percentage = percentage;

    let path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) return 5;
    if (this.percentage >= 80) return 4;
    if (this.percentage >= 60) return 3;
    if (this.percentage >= 40) return 2;
    if (this.percentage >= 20) return 1;
    return 0;
  }
}
