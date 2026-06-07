const canvas = document.getElementById("blochCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

let theta = 0;
let phi = 0;

let target = {
  theta: Math.random() * Math.PI,
  phi: Math.random() * Math.PI * 2
};

function updateTarget() {
  target.theta = Math.random() * Math.PI;
  target.phi = Math.random() * Math.PI * 2;

  document.getElementById("targetState").innerText =
    `θ=${target.theta.toFixed(2)}, φ=${target.phi.toFixed(2)}`;
}

function drawSphere() {
  ctx.clearRect(0, 0, 500, 500);

  const cx = 250;
  const cy = 250;

  // sphere glow
  ctx.beginPath();
  ctx.arc(cx, cy, 180, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(0,255,255,0.3)";
  ctx.stroke();

  // quantum vector
  let x = 180 * Math.sin(theta) * Math.cos(phi);
  let y = 180 * Math.cos(theta);

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + x, cy - y);
  ctx.strokeStyle = "#00ffff";
  ctx.lineWidth = 3;
  ctx.stroke();

  // particle glow
  ctx.beginPath();
  ctx.arc(cx + x, cy - y, 6, 0, Math.PI * 2);
  ctx.fillStyle = "cyan";
  ctx.fill();
}

function update() {
  theta = parseFloat(document.getElementById("theta").value);
  phi = parseFloat(document.getElementById("phi").value);

  drawSphere();
  requestAnimationFrame(update);
}

function measure() {
  const diff =
    Math.abs(theta - target.theta) +
    Math.abs(phi - target.phi);

  const resultBox = document.getElementById("resultBox");

  if (diff < 0.3) {
    resultBox.innerHTML = "🟢 QUANTUM WIN: State matched!";
    resultBox.style.color = "lime";
  } else {
    resultBox.innerHTML = "🔴 COLLAPSED: Quantum Loss!";
    resultBox.style.color = "red";
  }

  updateTarget();
}

function resetGame() {
  theta = 0;
  phi = 0;
  document.getElementById("theta").value = 0;
  document.getElementById("phi").value = 0;

  updateTarget();
}

updateTarget();
update();
