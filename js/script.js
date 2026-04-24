function init() {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.src = "assets/img/character/1_idle/idle/I-1.png";

  img.onload = function () {

    ctx.drawImage(img, 50, 50, 100, 200);
  };
}

init();
