const canvas = document.getElementById("sphere");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

let user = { x: 0, y: 0 };
let target = { x: 0, y: 0 };

function randomTarget() {
  target.x = (Math.random() * 2 - 1);
  target.y = (Math.random() * 2 - 1);
}

function drawSphere() {
  ctx.clearRect(0, 0, 500, 500);

  const cx = 250;
  const cy = 250;
  const r = 180;

  // sphere glow
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(0,255,255,0.25)";
  ctx.stroke();

  // TARGET VECTOR (RED GHOST ARROW)
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + target.x * r, cy - target.y * r);
  ctx.strokeStyle = "rgba(255,0,100,0.7)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // USER VECTOR (BLUE REAL ARROW)
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + user.x * r, cy - user.y * r);
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 4;
  ctx.stroke();

  // ARROW HEAD
  ctx.beginPath();
  ctx.arc(cx + user.x * r, cy - user.y * r, 6, 0, Math.PI * 2);
  ctx.fillStyle = "cyan";
  ctx.fill();

  // TARGET DOT
  ctx.beginPath();
  ctx.arc(cx + target.x * r, cy - target.y * r, 5, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
}

function update() {
  user.x = parseFloat(document.getElementById("xRot").value);
  user.y = parseFloat(document.getElementById("yRot").value);

  drawSphere();
  requestAnimationFrame(update);
}

function checkWin() {
  let dx = user.x - target.x;
  let dy = user.y - target.y;
  let dist = Math.sqrt(dx * dx + dy * dy);

  let box = document.getElementById("resultBox");

  if (dist < 0.12) {
    box.innerHTML = "🟢 QUANTUM MATCH! STATE STABLE";
    box.style.color = "lime";
  } else {
    box.innerHTML = "🔴 COLLAPSED STATE! TRY AGAIN";
    box.style.color = "red";
  }

  randomTarget();
}

function resetGame() {
  user.x = 0;
  user.y = 0;

  document.getElementById("xRot").value = 0;
  document.getElementById("yRot").value = 0;

  randomTarget();
}

randomTarget();
update();
