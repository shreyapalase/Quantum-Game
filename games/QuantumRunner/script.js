let playerScore = 0;
let aiScore = 0;

const log = document.getElementById("log");
const modal = document.getElementById("modal");
const resultText = document.getElementById("resultText");

const histData = Array(10).fill(0);

function play(mode) {

  let p = quantumProbability(mode);
  let ai = Math.random();

  let result = "";

  if (p > ai) {
    playerScore++;
    result = "PLAYER WINS THIS ROUND ⚛";
  } else {
    aiScore++;
    result = "AI WINS THIS ROUND 🧠";
  }

  updateUI(result, p, ai);
  drawWave();
  updateHistogram(p);

  checkEnd();
}

function quantumProbability(mode) {
  if (mode === "superposition") return Math.random() * 0.9 + 0.1;
  if (mode === "entangle") return Math.random() * 0.8 + 0.2;
  if (mode === "collapse") return Math.random();
}

function updateUI(result, p, ai) {
  document.getElementById("playerScore").innerText = playerScore;
  document.getElementById("aiScore").innerText = aiScore;

  log.innerHTML += `
    <div>⚡ ${result}</div>
    <div>Player Prob: ${p.toFixed(2)} | AI Prob: ${ai.toFixed(2)}</div>
    <hr/>
  `;
}

function checkEnd() {
  if (playerScore >= 5 || aiScore >= 5) {
    let winner =
      playerScore > aiScore ? "PLAYER WINS THE QUANTUM WAR 🏆"
      : "AI WINS AND COLLAPSES REALITY 🤖";

    resultText.innerText = winner;
    modal.classList.remove("hidden");
  }
}

function resetGame() {
  playerScore = 0;
  aiScore = 0;
  log.innerHTML = "";
  modal.classList.add("hidden");
  document.getElementById("playerScore").innerText = 0;
  document.getElementById("aiScore").innerText = 0;
}

/* WAVE ANIMATION */
const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 150;

function drawWave() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  for (let x = 0; x < canvas.width; x++) {
    let y = 75 + Math.sin(x * 0.05 + Date.now() * 0.005) * 30;
    ctx.lineTo(x, y);
  }

  ctx.strokeStyle = "#0ff";
  ctx.stroke();
}

/* HISTOGRAM */
const histCanvas = document.getElementById("histCanvas");
const hctx = histCanvas.getContext("2d");
histCanvas.width = 300;
histCanvas.height = 150;

function updateHistogram(val) {
  let index = Math.floor(val * 10);
  histData[index]++;

  hctx.clearRect(0,0,300,150);

  histData.forEach((v,i)=>{
    hctx.fillStyle = "#0ff";
    hctx.fillRect(i*30, 150 - v*5, 20, v*5);
  });
}

/* INIT */
drawWave();
