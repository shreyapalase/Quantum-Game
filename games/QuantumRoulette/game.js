let probability = 100;
let spins = 0;
let history = [];

const ctx = document.getElementById("histCanvas").getContext("2d");
document.getElementById("histCanvas").width = 300;
document.getElementById("histCanvas").height = 180;

/* 🧠 AI-style adaptive decay */
function aiDecay() {
  let instability = history.filter(x => x < 50).length;
  return instability * 0.5;
}

function spin() {

  spins++;

  const result = Math.floor(Math.random() * 36);

  let decay = aiDecay();

  if ([7,11,17].includes(result)) {
    probability += 6;
  } else {
    probability -= (8 + decay);
  }

  history.push(probability);
  if (history.length > 20) history.shift();

  updateUI();
  drawHist();

  if (probability <= 0) end(false);
  if (spins >= 10 && probability > 60) end(true);
}

function updateUI() {
  document.getElementById("prob").innerText = Math.max(0, probability);
  document.getElementById("spins").innerText = spins;
}

/* 📊 HISTOGRAM */
function drawHist() {
  ctx.clearRect(0,0,300,180);

  history.forEach((p,i) => {
    ctx.fillStyle = `hsl(${180+i*10},100%,50%)`;
    ctx.fillRect(i*12, 180 - p*1.5, 8, p*1.5);
  });
}

/* 🏁 RESULT */
function end(win) {
  document.getElementById("popup").style.display = "flex";
  document.getElementById("resultText").innerText =
    win ? "⚛ QUANTUM WIN (STABLE COLLAPSE)" : "💥 DECOHERENCE LOSS";
}

/* 🔄 RESET */
function resetGame() {
  probability = 100;
  spins = 0;
  history = [];

  document.getElementById("popup").style.display = "none";
  updateUI();
  drawHist();
}
