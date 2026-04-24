let canvas;
let ctx;
let img = new Image();

let x = 50;
let y = 50;

function init() {
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

  img.src = "assets/img/character/1_idle/idle/I-1.png";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, x, y, 100, 200);
}

function loop() {
  x += 1;
  draw();

  requestAnimationFrame(loop);
}

img.onload = function () {
  loop();
};

init();
