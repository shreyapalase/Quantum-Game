let probability = 100;
let spins = 0;
let history = [];

const wheel = document.getElementById("wheel");
const ctx = document.getElementById("hist").getContext("2d");

document.getElementById("hist").width = 300;
document.getElementById("hist").height = 150;

/* ✅ THIS MUST EXIST OR BUTTON FAILS */
window.spin = function () {

  if (spins >= 10) return;

  spins++;

  // wheel animation (always works)
  let angle = 720 + Math.random() * 360;
  wheel.style.transform = `rotate(${angle}deg)`;

  let result = Math.floor(Math.random() * 36);

  if ([7,11,17].includes(result)) {
    probability += 5;
  } else {
    probability -= 8;
  }

  // ❗ FIX: clamp probability
  probability = Math.max(0, Math.min(100, probability));

  history.push(probability);
  if (history.length > 20) history.shift();

  updateUI();
  draw();

  if (spins === 10) {
    setTimeout(() => {
      end(probability > 60);
    }, 600);
  }
};

function updateUI() {
  document.getElementById("prob").innerText = probability;
  document.getElementById("spins").innerText = spins;
}

function draw() {
  ctx.clearRect(0,0,300,150);

  history.forEach((p,i) => {
    ctx.fillStyle = "cyan";
    ctx.fillRect(i*12, 150 - p, 8, p);
  });
}

/* 🏁 END */
function end(win) {
  document.getElementById("popup").style.display = "flex";
  document.getElementById("resultText").innerText =
    win ? "WIN" : "LOSS";
}

/* 🔄 RESET */
window.resetGame = function () {
  probability = 100;
  spins = 0;
  history = [];

  document.getElementById("popup").style.display = "none";
  wheel.style.transform = "rotate(0deg)";
  updateUI();
  draw();
};
