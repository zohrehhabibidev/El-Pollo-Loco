let canvas;
let ctx;
let img = new Image();

let keyboard = new Keyboard();
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

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") keyboard.RIGHT = true;
  if (e.key === "ArrowLeft") keyboard.LEFT = true;
  if (e.key === " ") keyboard.SPACE = true;
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") keyboard.RIGHT = false;
  if (e.key === "ArrowLeft") keyboard.LEFT = false;
  if (e.key === " ") keyboard.SPACE = false;
});


function loop() {
  if (keyboard.RIGHT) {
    x += 2;
  }

  if (keyboard.LEFT) {
    x -= 2;
  }

  draw();
  requestAnimationFrame(loop);
}

img.onload = function () {
  loop();
};

init();
