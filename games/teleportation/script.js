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
const states = ["|0⟩", "|1⟩", "|+⟩", "|-⟩"];

let currentState = "";
let phase = 0;
let score = 0;

const commander = document.getElementById("commander");

const messages = [
  "Prepare unknown quantum state.",
  "Create entanglement pair.",
  "Perform Bell measurement.",
  "Transmit classical bits.",
  "Reconstruct target state."
];

/* GENERATE STATE */
document.getElementById("generateBtn").onclick = () => {
  currentState = states[Math.floor(Math.random() * states.length)];

  const q = document.getElementById("sourceQubit");
  q.innerHTML = currentState;

  q.style.transform = "scale(1.3)";
  q.style.boxShadow = "0 0 80px cyan, 0 0 120px purple";

  setTimeout(() => q.style.transform = "scale(1)", 300);

  phase = 0;
  score = 0;

  document.getElementById("progressFill").style.width = "0%";
  document.querySelectorAll(".phase").forEach(p => p.classList.remove("active"));
};

/* START MISSION */
document.getElementById("nextStep").onclick = () => {
  if (!currentState) return alert("Generate state first.");

  document.getElementById(`p${phase}`).classList.add("active");
  commander.innerHTML = messages[phase];

  score += 20;
  document.getElementById("score").innerHTML = "Score: " + score;
  document.getElementById("progressFill").style.width = score + "%";

  if (phase === 3) {
    document.getElementById("beam").style.width = "300px";
    document.body.style.filter = "hue-rotate(180deg) brightness(1.5)";
    setTimeout(() => document.body.style.filter = "none", 600);
  }

  if (phase === 4) {
    teleportEffect();
  }

  phase++;

  if (phase === 5) {
    document.getElementById("targetQubit").innerHTML = currentState;
    showWin();
  }
};

function teleportEffect() {
  const a = document.getElementById("sourceQubit");
  const b = document.getElementById("targetQubit");

  a.style.animation = "teleportOut 0.6s forwards";
  b.style.animation = "teleportIn 0.8s forwards";

  document.body.style.filter = "blur(2px) brightness(2)";
  setTimeout(() => document.body.style.filter = "none", 500);
}

function showWin() {
  document.getElementById("popup").classList.remove("hidden");
  document.getElementById("popupTitle").innerHTML = "MISSION SUCCESS";
  document.getElementById("popupText").innerHTML =
    "Quantum State Teleported Successfully ⚛";
}

function restartMission() {
  location.reload();
}
