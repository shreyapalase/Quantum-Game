const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

canvas.width = 520;
canvas.height = 520;

let theta = 0;
let phi = 0;

function bloch() {
  return {
    x: Math.sin(theta) * Math.cos(phi),
    y: Math.cos(theta),
    z: Math.sin(theta) * Math.sin(phi)
  };
}

function draw() {
  ctx.clearRect(0,0,520,520);

  let cx = 260, cy = 260;
  let R = 150;

  let v = bloch();

  // sphere
  ctx.beginPath();
  ctx.arc(cx,cy,R,0,Math.PI*2);
  ctx.strokeStyle="rgba(0,255,255,0.2)";
  ctx.stroke();

  // vector
  ctx.beginPath();
  ctx.moveTo(cx,cy);
  ctx.lineTo(cx+v.x*R, cy-v.y*R);
  ctx.strokeStyle="cyan";
  ctx.lineWidth=3;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx+v.x*R, cy-v.y*R, 6, 0, Math.PI*2);
  ctx.fillStyle="cyan";
  ctx.fill();

  document.getElementById("coords").innerText =
  `x=${v.x.toFixed(2)} y=${v.y.toFixed(2)} z=${v.z.toFixed(2)}`;
}

function measure() {
  let v = bloch();
  let p = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);

  let box = document.getElementById("resultBox");

  if (p > 0.7) {
    box.innerText = "🏆 WIN: Stable Quantum State";
    box.style.color = "lime";
  } else {
    box.innerText = "❌ LOSS: Unstable Collapse";
    box.style.color = "red";
  }
}

function reset() {
  theta = 0;
  phi = 0;
  document.getElementById("theta").value = 0;
  document.getElementById("phi").value = 0;
}

function loop() {
  theta = document.getElementById("theta").value;
  phi = document.getElementById("phi").value;

  draw();
  requestAnimationFrame(loop);
}

loop();
