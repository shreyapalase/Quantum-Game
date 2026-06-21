let playerScore = 0;
let aiScore = 0;

function startGame() {
  playerScore = 0;
  aiScore = 0;
  updateUI();
  alert("Quantum Battle Started!");
}

function runCircuit() {

  // MOCK QISKIT LOGIC (quantum probability simulation)
  let player = Math.random();
  let ai = Math.random();

  // normalize like quantum collapse
  let sum = player + ai;
  player /= sum;
  ai /= sum;

  playerScore = player;
  aiScore = ai;

  updateUI();
  drawHistogram(player, ai);
  animateArena();

  checkWinner();
}

function updateUI() {
  document.getElementById("pProb").innerText = playerScore.toFixed(3);
  document.getElementById("aProb").innerText = aiScore.toFixed(3);
}

function drawHistogram(p, a) {
  let canvas = document.getElementById("histogram");
  let ctx = canvas.getContext("2d");

  canvas.width = 400;
  canvas.height = 200;

  ctx.clearRect(0,0,400,200);

  ctx.fillStyle = "#00ffe5";
  ctx.fillRect(50, 200 - p*200, 80, p*200);

  ctx.fillStyle = "#ff00ff";
  ctx.fillRect(200, 200 - a*200, 80, a*200);
}

function animateArena() {
  let arena = document.getElementById("arena");
  arena.style.transform = "scale(1.05)";
  setTimeout(()=> arena.style.transform="scale(1)", 200);
}

function checkWinner() {
  if (playerScore > 0.6) {
    showPopup("🏆 PLAYER WINS QUANTUM WAR");
  } else if (aiScore > 0.6) {
    showPopup("💀 AI WINS QUANTUM WAR");
  }
}

/* popup */
function showPopup(text) {
  document.getElementById("popup").classList.remove("hidden");
  document.getElementById("resultText").innerText = text;
}

function resetGame() {
  document.getElementById("popup").classList.add("hidden");
}

/* fake quantum circuit concept (Qiskit-like reference model) */
function quantumCircuitModel() {
  return {
    gates: ["H", "X", "H", "MEASURE"],
    amplitudes: [Math.random(), Math.random()]
  };
}
