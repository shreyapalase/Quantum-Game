let score = 0;
let step = 0;

// circuit state
let circuit = {
  q0: [],
  q1: [],
  q2: []
};

// mission target (entanglement task)
const target = ["H", "CX"];

function addGate(g) {
  if (step >= 3) return;

  if (step === 0) circuit.q0.push(g);
  if (step === 1) circuit.q1.push(g);
  if (step === 2) circuit.q2.push(g);

  step++;

  updateUI();
}

function updateUI() {
  document.getElementById("q0").innerText = circuit.q0.join(" ");
  document.getElementById("q1").innerText = circuit.q1.join(" ");
  document.getElementById("q2").innerText = circuit.q2.join(" ");

  document.getElementById("fill").style.width = (step / 3) * 100 + "%";
}

document.getElementById("checkBtn").onclick = () => {

  let flat = circuit.q0.concat(circuit.q1, circuit.q2);

  let success = flat.includes("H") && flat.includes("CX");

  if (success) {
    score = 100;
    showPopup("MISSION SUCCESS ⚛", "Entanglement circuit built correctly!");
  } else {
    score = 40;
    showPopup("MISSION FAILED", "Circuit incorrect. Try again.");
  }

  document.getElementById("score").innerText = "Score: " + score;
};

function showPopup(t, m) {
  document.getElementById("popup").classList.remove("hidden");
  document.getElementById("title").innerText = t;
  document.getElementById("text").innerText = m;
}

/* simple galaxy background */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 400; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2
  });
}

function animate() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "#fff";

  stars.forEach(s=>{
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fill();
    s.y += 0.2;
    if(s.y > canvas.height) s.y = 0;
  });

  requestAnimationFrame(animate);
}

animate();
