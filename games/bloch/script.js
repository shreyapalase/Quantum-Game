const canvas = document.getElementById("bloch");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const thetaInput = document.getElementById("theta");
const phiInput = document.getElementById("phi");
const resultBox = document.getElementById("resultBox");
const targetStateBox = document.getElementById("targetState");

// target state
let targetTheta = Math.random() * Math.PI;
let targetPhi = Math.random() * 2 * Math.PI;

targetStateBox.innerText =
  `θ=${targetTheta.toFixed(2)} φ=${targetPhi.toFixed(2)}`;

function draw(theta, phi) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const r = 100;

  // sphere
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = "cyan";
  ctx.stroke();

  // vector
  const x = cx + r * Math.sin(theta) * Math.cos(phi);
  const y = cy - r * Math.cos(theta);

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(x, y);
  ctx.strokeStyle = "magenta";
  ctx.shadowBlur = 20;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
}

function fidelity(t1, p1, t2, p2) {
  let f =
    Math.cos(t1 / 2) * Math.cos(t2 / 2) +
    Math.sin(t1 / 2) * Math.sin(t2 / 2) * Math.cos(p1 - p2);

  return f * f;
}

function measureQubit() {
  const t = parseFloat(thetaInput.value);
  const p = parseFloat(phiInput.value);

  const prob0 = Math.cos(t / 2) ** 2;
  const outcome = Math.random() < prob0 ? 0 : 1;

  const fid = fidelity(t, p, targetTheta, targetPhi);

  const win = fid > 0.92;

  resultBox.innerHTML = `
    Outcome: ${outcome}<br>
    Fidelity: ${fid.toFixed(3)}<br>
    <b>${win ? "🟢 WIN" : "🔴 LOSE"}</b>
  `;

  resultBox.style.boxShadow = win
    ? "0 0 20px lime"
    : "0 0 20px red";
}

function animate() {
  draw(
    parseFloat(thetaInput.value),
    parseFloat(phiInput.value)
  );
  requestAnimationFrame(animate);
}

thetaInput.value = 1;
phiInput.value = 1;

animate();
