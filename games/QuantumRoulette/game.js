let probability = 100;
let spins = 0;
let history = [];

const ctx = document.getElementById("histCanvas").getContext("2d");
const canvas = document.getElementById("histCanvas");

canvas.width = 300;
canvas.height = 150;

/* 🎰 SPIN */
function spin() {

  spins++;

  let result = Math.floor(Math.random() * 36);

  if ([7,11,17].includes(result)) {
    probability += 6;
  } else {
    probability -= 8;
  }

  history.push(probability);
  if (history.length > 20) history.shift();

  updateUI();
  draw();

  if (probability <= 0) end(false);
  if (spins >= 10 && probability > 60) end(true);
}

/* UI */
function updateUI() {
  document.getElementById("prob").innerText = Math.max(0, probability);
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

/* 🏁 END */
function end(win) {
  document.getElementById("popup").style.display = "flex";
  document.getElementById("resultText").innerText =
    win ? "QUANTUM WIN" : "LOSS - DECOHERENCE";
}

/* RESET */
function resetGame() {
  probability = 100;
  spins = 0;
  history = [];

  document.getElementById("popup").style.display = "none";
  updateUI();
  draw();
}
