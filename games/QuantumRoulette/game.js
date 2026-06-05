let probability = 100;
let spins = 0;
let history = [];

const wheel = document.getElementById("wheel");
const ctx = document.getElementById("hist").getContext("2d");

document.getElementById("hist").width = 300;
document.getElementById("hist").height = 150;

/* 🎰 SPIN */
function spin() {

  if (spins >= 10) return;

  spins++;

  // REALISTIC ROTATION
  let angle = 720 + Math.random() * 360;
  wheel.style.transform = `rotate(${angle}deg)`;

  let result = Math.floor(Math.random() * 36);

  if ([7,11,17].includes(result)) {
    probability += 6;
  } else {
    probability -= 8;
  }

  // 🚫 CLAMP probability (NO NEGATIVE BUG)
  probability = Math.max(0, Math.min(100, probability));

  history.push(probability);
  if (history.length > 20) history.shift();

  updateUI();
  draw();

  // 🏁 GUARANTEED END AFTER 10 SPINS
  if (spins === 10) {
    setTimeout(() => {
      if (probability > 60) end(true);
      else end(false);
    }, 800);
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

/* 🏆 END */
function end(win) {
  document.getElementById("popup").style.display = "flex";
  document.getElementById("resultText").innerText =
    win ? "⚛ QUANTUM STABLE WIN" : "💥 DECOHERENCE LOSS";
}

/* 🔄 RESET */
function resetGame() {
  probability = 100;
  spins = 0;
  history = [];

  document.getElementById("popup").style.display = "none";
  wheel.style.transform = "rotate(0deg)";
  updateUI();
  draw();
}
