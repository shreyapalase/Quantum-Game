const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

canvas.width = 520;
canvas.height = 520;

let theta = 0;
let phi = 0;

let rot = 0;

// convert Bloch coords → 3D projection
function project(x, y, z) {
  const angle = rot;

  let x1 = x * Math.cos(angle) - z * Math.sin(angle);
  let z1 = x * Math.sin(angle) + z * Math.cos(angle);

  let scale = 250 / (z1 + 400);

  return {
    x: 260 + x1 * scale,
    y: 260 + y * scale
  };
}

function drawSphere() {
  ctx.clearRect(0, 0, 520, 520);

  const R = 150;

  // sphere grid (lat lines)
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.arc(260, 260, R - i * 10, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,255,255,0.05)";
    ctx.stroke();
  }

  // axis lines
  ctx.beginPath();
  ctx.moveTo(...Object.values(project(-R,0,0)));
  ctx.lineTo(...Object.values(project(R,0,0)));
  ctx.strokeStyle = "red";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(...Object.values(project(0,-R,0)));
  ctx.lineTo(...Object.values(project(0,R,0)));
  ctx.strokeStyle = "lime";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(...Object.values(project(0,0,-R)));
  ctx.lineTo(...Object.values(project(0,0,R)));
  ctx.strokeStyle = "cyan";
  ctx.stroke();

  // quantum state vector
  let x = Math.sin(theta) * Math.cos(phi) * R;
  let y = Math.cos(theta) * R;
  let z = Math.sin(theta) * Math.sin(phi) * R;

  let p1 = project(0,0,0);
  let p2 = project(x,y,z);

  // VECTOR LINE
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.strokeStyle = "#00ffff";
  ctx.lineWidth = 3;
  ctx.stroke();

  // VECTOR HEAD
  ctx.beginPath();
  ctx.arc(p2.x, p2.y, 6, 0, Math.PI*2);
  ctx.fillStyle = "cyan";
  ctx.fill();

  // poles
  let top = project(0,R,0);
  let bottom = project(0,-R,0);

  ctx.fillStyle = "yellow";
  ctx.fillText("|0⟩", top.x, top.y);

  ctx.fillText("|1⟩", bottom.x, bottom.y);
}

function loop() {
  theta = parseFloat(document.getElementById("theta").value);
  phi = parseFloat(document.getElementById("phi").value);

  rot += 0.01;

  drawSphere();
  requestAnimationFrame(loop);
}

function reset() {
  document.getElementById("theta").value = 0;
  document.getElementById("phi").value = 0;
}

loop();
