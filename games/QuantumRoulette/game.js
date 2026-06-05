let probability = 100;
let spins = 0;
let history = [];

const wheel = document.getElementById("wheel");
const ctx = document.getElementById("hist").getContext("2d");

document.getElementById("hist").width = 300;
document.getElementById("hist").height = 150;

/* 🧠 AI ENTROPY SYSTEM */
function entropy() {
  let low = history.filter(x => x < 50).length;
  return low * 0.6;
}

/* 🎰 SPIN (REALISTIC PHYSICS SIMULATION) */
function spin() {

  if (spins >= 10) return;

  spins++;

  let force = 720 + Math.random() * 1440;
  wheel.style.transform = `rotate(${force}deg)`;

  let result = Math.floor(Math.random() * 36);

  let decay = entropy();

  if ([7,11,17].includes(result)) {
    probability += 7;
  } else {
    probability -= (8 + decay);
  }

  probability = Math.max(0, Math.min(100, probability));

  history.push(probability);
  if (history.length > 25) history.shift();

  updateUI();
  draw();

  if (spins === 10) {
    setTimeout(() => {
      probability > 60 ? end(true) : end(false);
    }, 900);
  }
}

/* UI */
function updateUI() {
  document.getElementById("prob").innerText = probability;
  document.getElementById("spins").innerText = spins;
}

/* 📊 GRAPH */
function draw() {
  ctx.clearRect(0,0,300,150);

  history.forEach((p,i) => {
    ctx.fillStyle = `hsl(${180+i*10},100%,50%)`;
    ctx.fillRect(i*12, 150 - p, 8, p);
  });
}

/* 🏁 END SCREEN */
function end(win) {
  document.getElementById("popup").style.display = "flex";
  document.getElementById("resultText").innerText =
    win ? "⚛ QUANTUM ASCENSION (WIN)" : "💥 DECOHERENCE COLLAPSE (LOSS)";
}

/* 🔄 RESET */
function resetGame() {
  probability = 100;
  spins = 0;
  history = [];
  wheel.style.transform = "rotate(0deg)";
  document.getElementById("popup").style.display = "none";
  updateUI();
  draw();
}
