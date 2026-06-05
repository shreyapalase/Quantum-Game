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

/* 🧱 MAZE GENERATION */
function generateMaze() {
  grid = [];
  for (let y = 0; y < size; y++) {
    let row = [];
    for (let x = 0; x < size; x++) {
      row.push(Math.random() > 0.7 ? 1 : 0);
    }
    grid.push(row);
  }

  grid[0][0] = 0;
  grid[size-1][size-1] = 0;
}
generateMaze();

/* 🎨 DRAW WORLD */
function draw() {
  ctx.clearRect(0,0,600,600);

  phase += 0.03;
  canvas.style.filter = `hue-rotate(${Math.sin(phase)*25}deg)`;

  // grid glow lines
  ctx.strokeStyle = "rgba(0,255,255,0.08)";
  for (let i = 0; i <= size; i++) {
    ctx.beginPath();
    ctx.moveTo(i*cell, 0);
    ctx.lineTo(i*cell, 600);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i*cell);
    ctx.lineTo(600, i*cell);
    ctx.stroke();
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {

      if (grid[y][x] === 1) {
        ctx.fillStyle = "rgba(140,120,255,0.35)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#5a6bff";
      } else {
        ctx.fillStyle = "#111";
        ctx.shadowBlur = 0;
      }

      ctx.fillRect(x*cell, y*cell, cell, cell);
    }
  }

  // EXIT PORTAL 🌟
  ctx.fillStyle = "#00ff66";
  ctx.shadowBlur = 35;
  ctx.shadowColor = "#00ff66";
  ctx.beginPath();
  ctx.arc(
    exit.x*cell + cell/2,
    exit.y*cell + cell/2,
    cell/2 - 6,
    0, Math.PI*2
  );
  ctx.fill();

  // PLAYER ⚛
  ctx.fillStyle = "#00ffff";
  ctx.shadowBlur = 30;
  ctx.shadowColor = "#00ffff";
  ctx.fillRect(player.x*cell, player.y*cell, cell, cell);
}

/* 🎮 MOVEMENT + QUANTUM TUNNEL */
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
      flash("#ff0055");
      return update();
    }
  } else {
    player.x = nx;
    player.y = ny;
    probability -= 2;
  }

  history.push(probability);
  if (history.length > 20) history.shift();

  if (probability <= 0) return end(false);
  if (player.x === exit.x && player.y === exit.y) return end(true);

  update();
}

/* ⚡ FLASH EFFECT */
function flash(color) {
  canvas.style.boxShadow = `0 0 60px ${color}`;
  setTimeout(() => canvas.style.boxShadow = "0 0 40px #0ff", 150);
}

/* UI UPDATE */
function update() {
  document.getElementById("prob").innerText = probability;
  document.getElementById("steps").innerText = steps;
}

/* 📊 HISTOGRAM */
function drawHist() {
  hctx.clearRect(0,0,300,180);

  history.forEach((p,i) => {
    hctx.fillStyle = `hsl(${180+i*10},100%,50%)`;
    hctx.fillRect(i*12, 180 - p*1.5, 8, p*1.5);
  });
}

/* 🏁 END GAME */
function end(win) {
  document.getElementById("result").style.display = "flex";
  document.getElementById("resultText").innerText =
    win ? "QUANTUM COLLAPSE: WIN" : "DECOHERENCE FAILURE: LOSE";
}

/* 🎮 CONTROLS */
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" || e.key === "w") move(0,-1);
  if (e.key === "ArrowDown" || e.key === "s") move(0,1);
  if (e.key === "ArrowLeft" || e.key === "a") move(-1,0);
  if (e.key === "ArrowRight" || e.key === "d") move(1,0);
});

/* LOOP */
function loop() {
  draw();
  drawHist();
  requestAnimationFrame(loop);
}
loop();
