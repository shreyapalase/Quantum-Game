const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 700; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2
  });
}

function animateGalaxy() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";

  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();

    star.y += 0.2;
    if (star.y > canvas.height) star.y = 0;
  });

  requestAnimationFrame(animateGalaxy);
}

animateGalaxy();

/* QUANTUM CORE */
const states = ["|0⟩", "|1⟩", "|+⟩", "|-|"];

let currentState = "";
let phase = 0;
let score = 0;

const commander = document.getElementById("commander");

const messages = [
  "Preparing quantum state...",
  "Entangling qubits...",
  "Performing Bell measurement...",
  "Sending classical bits...",
  "Reconstructing state..."
];

/* GENERATE STATE */
document.getElementById("generateBtn").onclick = () => {
  currentState = states[Math.floor(Math.random() * states.length)];

  const q = document.getElementById("sourceQubit");
  q.innerHTML = currentState;

  q.style.animation = "preparePulse 0.6s";

  setTimeout(() => q.style.animation = "", 600);

  phase = 0;
  score = 0;

  document.getElementById("targetQubit").innerHTML = "?";
  document.getElementById("progressFill").style.width = "0%";

  document.querySelectorAll(".phase").forEach(p => p.classList.remove("active"));

  commander.innerHTML = "State initialized in Universe A.";
};

/* START MISSION */
document.getElementById("nextStep").onclick = () => {
  if (!currentState) return alert("Generate state first.");

  const a = document.getElementById("sourceQubit");
  const b = document.getElementById("targetQubit");

  document.getElementById(`p${phase}`).classList.add("active");
  commander.innerHTML = messages[phase];

  score += 20;
  document.getElementById("score").innerHTML = "Score: " + score;
  document.getElementById("progressFill").style.width = score + "%";

  /* STEP ANIMATIONS */

  if (phase === 0) {
    a.style.animation = "preparePulse 0.6s";
  }

  if (phase === 1) {
  bellStateAnimation();
}

  if (phase === 2) {
    a.style.animation = "bellCollapse 0.8s";
  }

  if (phase === 3) {
    document.getElementById("beam").style.width = "300px";
    document.body.style.filter = "hue-rotate(180deg) brightness(1.5)";
    setTimeout(() => document.body.style.filter = "none", 600);
    a.style.animation = "classicalWave 1s";
  }

  if (phase === 4) {
    b.innerHTML = currentState;
    b.style.animation = "teleportIn 0.8s";
  }

  phase++;

  if (phase === 5) {
    showWin();
  }
};

/* WIN POPUP */
function showWin() {
  document.getElementById("popup").classList.remove("hidden");
  document.getElementById("popupTitle").innerHTML = "MISSION SUCCESS";
  document.getElementById("popupText").innerHTML =
    "Quantum state successfully teleported ⚛";
}

function restartMission() {
  location.reload();
}
function bellStateAnimation() {
  const a = document.getElementById("sourceQubit");
  const b = document.getElementById("targetQubit");
  const center = document.querySelector(".centerArea");

  // create link beam
  const link = document.createElement("div");
  link.className = "bell-link";
  center.appendChild(link);

  // entangle both qubits visually
  a.classList.add("entangled");
  b.classList.add("entangled");

  commander.innerHTML = "Bell State formed: |Φ⁺⟩ Entanglement achieved";

  // remove after animation
  setTimeout(() => {
    link.remove();
    a.classList.remove("entangled");
    b.classList.remove("entangled");
  }, 1200);
}
