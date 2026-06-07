const canvas = document.getElementById("bloch");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 300;

let thetaInput = document.getElementById("theta");
let phiInput = document.getElementById("phi");
let resultBox = document.getElementById("resultBox");
let targetStateBox = document.getElementById("targetState");

// Target quantum state
let targetTheta = Math.random() * Math.PI;
let targetPhi = Math.random() * 2 * Math.PI;

targetStateBox.innerText =
  `θ=${targetTheta.toFixed(2)}, φ=${targetPhi.toFixed(2)}`;

// Draw Bloch sphere
function drawBloch(theta, phi) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // sphere
  ctx.beginPath();
  ctx.arc(250, 150, 100, 0, Math.PI * 2);
  ctx.strokeStyle = "cyan";
  ctx.stroke();

  // vector projection
  let x = 250 + 100 * Math.sin(theta) * Math.cos(phi);
  let y = 150 - 100 * Math.cos(theta);

  ctx.beginPath();
  ctx.moveTo(250, 150);
  ctx.lineTo(x, y);
  ctx.strokeStyle = "magenta";
  ctx.shadowBlur = 20;
  ctx.shadowColor = "magenta";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
}

// fidelity calculation
function fidelity(t1, p1, t2, p2) {
  let cos =
    Math.cos(t1 / 2) * Math.cos(t2 / 2) +
    Math.sin(t1 / 2) * Math.sin(t2 / 2) * Math.cos(p1 - p2);

  return cos * cos;
}

// measurement simulation
function measureQubit() {
  let theta = parseFloat(thetaInput.value);
  let phi = parseFloat(phiInput.value);

  let prob0 = Math.cos(theta / 2) ** 2;
  let outcome = Math.random() < prob0 ? 0 : 1;

  let fid = fidelity(theta, phi, targetTheta, targetPhi);

  let win = fid > 0.92 || outcome === 0;

  resultBox.innerHTML = `
    🎲 Outcome: <b>${outcome}</b><br>
    📊 Fidelity: <b>${fid.toFixed(3)}</b><br>
    ${win ? "🟢 YOU WIN!" : "🔴 YOU LOSE"}
  `;

  resultBox.style.boxShadow = win
    ? "0 0 20px lime"
    : "0 0 20px red";
}

// animation loop
function animate() {
  drawBloch(
    parseFloat(thetaInput.value),
    parseFloat(phiInput.value)
  );
  requestAnimationFrame(animate);
}

thetaInput.value = 1;
phiInput.value = 1;

animate();
