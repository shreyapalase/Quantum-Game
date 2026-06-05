let probability = 100;
let spins = 0;
let history = [];

const wheel = document.getElementById("wheel");
const ball = document.getElementById("ball");
const ctx = document.getElementById("hist").getContext("2d");

document.getElementById("hist").width = 300;
document.getElementById("hist").height = 150;

/* 🧠 ENTROPY AI */
function entropy() {
  let unstable = history.filter(x => x < 50).length;
  return unstable * 0.5;
}

/* 🎰 SPIN CORE */
function spin() {

  if (spins >= 10) return;

  spins++;

  /* wheel physics spin */
  let angle = 1080 + Math.random() * 720;
  wheel.style.transform = `rotate(${angle}deg)`;

  /* ball orbit illusion */
  animateBall();

  let result = Math.floor(Math.random() * 36);

  let decay = entropy();

  if ([7,11,17].includes(result)) {
    probability += 8;
  } else {
    probability -= (7 + decay);
  }

  probability = Math.max(0, Math.min(100, probability));

  history.push(probability);
  if (history.length > 25) history.shift();

  updateUI();
  draw();

  if (spins === 10) {
    setTimeout(() => {
      end(probability > 60);
    }, 900);
  }
}

/* 🎯 BALL ANIMATION */
function animateBall() {
  let angle = 0;
  let speed = 18;

  let interval = setInterval(() => {
    angle += speed;
    speed *= 0.96;

    let x = 110 + Math.cos(angle * Math.PI / 180) * 60;
    let y = 110 + Math.sin(angle * Math.PI / 180) * 60;

    ball.style.left = x + "px";
    ball.style.top = y + "px";

    if (speed < 1) clearInterval(interval);

  }, 16);
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

/* 🏁 RESULT */
function end(win) {
  document.getElementById("popup").style.display = "flex";
  document.getElementById("resultText").innerText =
    win ? "⚛ ASCENSION WIN" : "💥 QUANTUM COLLAPSE LOSS";
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
