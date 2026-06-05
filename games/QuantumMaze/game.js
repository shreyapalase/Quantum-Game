const canvas = document.getElementById("maze");
const ctx = canvas.getContext("2d");

const histCanvas = document.getElementById("hist");
const hctx = histCanvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;
histCanvas.width = 300;
histCanvas.height = 200;

const size = 15;
const gridSize = 40;

let player = { x: 0, y: 0 };
let exit = { x: size - 1, y: size - 1 };

let steps = 0;
let probability = 100;

let grid = [];

function generateMaze() {
  grid = [];
  for (let y = 0; y < size; y++) {
    let row = [];
    for (let x = 0; x < size; x++) {
      row.push(Math.random() < 0.25 ? 1 : 0);
    }
    grid.push(row);
  }
  grid[0][0] = 0;
  grid[size-1][size-1] = 0;
}

generateMaze();

function drawMaze() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {

      if (grid[y][x] === 1) {
        ctx.fillStyle = "#555";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#888";
      } else {
        ctx.fillStyle = "#111";
      }

      ctx.fillRect(x*gridSize, y*gridSize, gridSize, gridSize);
    }
  }

  // exit
  ctx.fillStyle = "#0f0";
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#0f0";
  ctx.fillRect(exit.x*gridSize, exit.y*gridSize, gridSize, gridSize);

  // player
  ctx.fillStyle = "#0ff";
  ctx.shadowBlur = 25;
  ctx.shadowColor = "#0ff";
  ctx.fillRect(player.x*gridSize, player.y*gridSize, gridSize, gridSize);
}

function updateHistogram() {
  hctx.clearRect(0,0,histCanvas.width,histCanvas.height);

  let bars = 10;
  for (let i = 0; i < bars; i++) {
    let val = Math.random() * probability;

    hctx.fillStyle = `hsl(${180 + i*10},100%,50%)`;
    hctx.fillRect(i*30, histCanvas.height - val, 20, val);
  }
}

function move(dx, dy) {
  let nx = player.x + dx;
  let ny = player.y + dy;

  if (nx < 0 || ny < 0 || nx >= size || ny >= size) return;
  if (grid[ny][nx] === 1) {
    probability -= 10;
  }

  player.x = nx;
  player.y = ny;

  steps++;
  probability -= 2;

  if (probability <= 0) endGame(false);
  if (player.x === exit.x && player.y === exit.y) endGame(true);

  document.getElementById("prob").innerText = probability;
  document.getElementById("steps").innerText = steps;
}

function endGame(win) {
  const screen = document.getElementById("resultScreen");
  const text = document.getElementById("resultText");

  screen.style.display = "flex";
  text.innerText = win ? "QUANTUM STATE COLLAPSE: WIN" : "DECOHERENCE FAILURE: LOSE";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "w") move(0,-1);
  if (e.key === "ArrowDown" || e.key === "s") move(0,1);
  if (e.key === "ArrowLeft" || e.key === "a") move(-1,0);
  if (e.key === "ArrowRight" || e.key === "d") move(1,0);
});

function loop() {
  drawMaze();
  updateHistogram();
  requestAnimationFrame(loop);
}

loop();
