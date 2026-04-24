let canvas;
let ctx;
let img = new Image();

function init() {
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

  img.src = "assets/img/character/1_idle/idle/I-1.png";
}

function draw() {
  ctx.drawImage(img, 50, 50, 200, 300);
}

img.onload = function () {
  draw();
};

init();
