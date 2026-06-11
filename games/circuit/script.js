let score = 0;
let step = 0;
let mission = 0;

const missions = [
  { title: "Mission 1", text: "Create Hadamard superposition", pattern: ["H"] },
  { title: "Mission 2", text: "Create entanglement", pattern: ["H","CX"] },
  { title: "Mission 3", text: "Apply X gate", pattern: ["X"] },
  { title: "Mission 4", text: "Bell preparation", pattern: ["H","CX"] },
  { title: "Mission 5", text: "Mixed circuit", pattern: ["H","X"] },
  { title: "Mission 6", text: "Double entanglement", pattern: ["CX","CX"] },
  { title: "Mission 7", text: "Superposition chain", pattern: ["H","H"] },
  { title: "Mission 8", text: "X then entangle", pattern: ["X","CX"] },
  { title: "Mission 9", text: "Full teleport base", pattern: ["H","CX","X"] },
  { title: "Mission 10", text: "Final quantum circuit", pattern: ["H","CX","H"] }
];

let circuit = [];

function addGate(g) {
  if (step >= 3) return;

  circuit.push(g);
  step++;

  document.getElementById("q0").innerText = circuit.join(" ");
  document.getElementById("q1").innerText = " ";
  document.getElementById("q2").innerText = " ";

  document.getElementById("fill").style.width = (step / 3) * 100 + "%";
}

function resetCircuit() {
  circuit = [];
  step = 0;
  document.getElementById("q0").innerText = "— — —";
  document.getElementById("fill").style.width = "0%";
}

document.getElementById("checkBtn").onclick = () => {

  let target = missions[mission].pattern;

  let success = JSON.stringify(target) === JSON.stringify(circuit);

  if (success) {
    score += 100;
    showPopup("SUCCESS ⚛", "Correct quantum circuit built!");
  } else {
    score += 20;
    showPopup("FAILED", "Circuit mismatch detected.");
  }

  document.getElementById("score").innerText = "Score: " + score;
};

function showPopup(t, m) {
  document.getElementById("popup").classList.remove("hidden");
  document.getElementById("title").innerText = t;
  document.getElementById("text").innerText = m;
}

function nextMission() {
  mission++;

  if (mission >= missions.length) {
    showPopup("LAB COMPLETE 🏆", "All quantum circuits completed!");
    return;
  }

  circuit = [];
  step = 0;

  document.getElementById("q0").innerText = "— — —";
  document.getElementById("fill").style.width = "0%";

  document.getElementById("missionTitle").innerText = missions[mission].title;
  document.getElementById("missionText").innerText = missions[mission].text;

  document.getElementById("popup").classList.add("hidden");
}

/* AAA 3D BACKGROUND EFFECT */
const canvas = document.getElementById("bg3d");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 300; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * 2
  });
}

function animate() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "cyan";

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.z * 2, 0, Math.PI*2);
    ctx.fill();

    p.y += p.z * 0.5;
    if (p.y > canvas.height) p.y = 0;
  });

  requestAnimationFrame(animate);
}

animate();
