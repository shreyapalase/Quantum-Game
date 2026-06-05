const canvas = document.getElementById("maze");
const ctx = canvas.getContext("2d");

const hist = document.getElementById("hist");
const hctx = hist.getContext("2d");

canvas.width = 600;
canvas.height = 600;
hist.width = 300;
hist.height = 180;

const size = 15;
const cell = 40;

let player = { x: 0, y: 0 };
let exit = { x: size - 1, y: size - 1 };

let grid = [];
let probability = 100;
let steps = 0;
let history = [];

let phase = 0;

function generateMaze() {
  grid = [];
  for (let y = 0; y < size; y++) {
    let row = [];
    for (let x = 0; x < size; x++) {
      row.push(Math.random() > 0.72 ? 1 : 0);
    }
    grid.push(row);
  }

  grid[0][0] = 0;
  grid[size-1][size-1] = 0;
}

generateMaze();

function draw() {
  ctx.clearRect(0,0,600,600);

  phase += 0.03;
  canvas.style.filter = `hue-rotate(${Math.sin(phase)*30}deg)`;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {

      if (grid[y][x] === 1) {
        ctx.fillStyle = "#444";
      } else {
        ctx.fillStyle = "#111";
      }

      ctx.fillRect(x*cell, y*cell, cell, cell);
    }
  }

  // exit
  ctx.fillStyle = "#0f0";
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#0f0";
  ctx.fillRect(exit.x*cell, exit.y*cell, cell, cell);

  // player
  ctx.fillStyle = "#0ff";
  ctx.shadowBlur = 25;
  ctx.shadowColor = "#0ff";
  ctx.fillRect(player.x*cell, player.y*cell, cell, cell);
}

function move(dx, dy) {
  let nx = player.x + dx;
  let ny = player.y + dy;

  if (nx < 0 || ny < 0 || nx >= size || ny >= size) return;

  steps++;

  if (grid[ny][nx] === 1) {
    if (Math.random() < 0.3) {
      player.x = nx;
      player.y = ny;
      probability -= 6;
    } else {
      probability -= 15;
      flash("#ff0044");
      updateUI();
      return;
    }
  } else {
    player.x = nx;
    player.y = ny;
    probability -= 2;
  }

  if (probability <= 0) end(false);
  if (player.x === exit.x && player.y === exit.y) end(true);

  history.push(probability);
  if (history.length > 20) history.shift();

  updateUI();
}

function flash(color) {
  canvas.style.boxShadow = `0 0 60px ${color}`;
  setTimeout(() => canvas.style.boxShadow = "0 0 35px #0ff", 150);
}

function updateUI() {
  document.getElementById("prob").innerText = probability;
  document.getElementById("steps").innerText = steps;
}

function end(win) {
  document.getElementById("result").style.display = "flex";
  document.getElementById("resultText").innerText =
    win ? "QUANTUM COLLAPSE: WIN" : "DECOHERENCE FAILURE: LOSE";
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" || e.key === "w") move(0,-1);
  if (e.key === "ArrowDown" || e.key === "s") move(0,1);
  if (e.key === "ArrowLeft" || e.key === "a") move(-1,0);
  if (e.key === "ArrowRight" || e.key === "d") move(1,0);
});

function histDraw() {
  hctx.clearRect(0,0,300,180);

  history.forEach((p,i) => {
    hctx.fillStyle = `hsl(${180+i*10},100%,50%)`;
    hctx.fillRect(i*12, 180 - p*1.5, 8, p*1.5);
  });
}

function loop() {
  draw();
  histDraw();
  requestAnimationFrame(loop);
}

loop();
