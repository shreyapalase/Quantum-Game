let probability = 100;
let spins = 0;
let history = [];

const wheel = document.getElementById("wheel");
const ball = document.getElementById("ball");

function spin() {

  spins++;

  // 🎰 realistic roulette physics simulation
  const result = Math.floor(Math.random() * 36);

  // add spin animation
  wheel.classList.remove("spinActive");
  void wheel.offsetWidth;
  wheel.classList.add("spinActive");

  // 🧠 quantum collapse rule
  if (result === 7 || result === 11 || result === 17) {
    probability += 6;
    quantumEffect(true);
  } else {
    probability -= 8;
    quantumEffect(false);
  }

  history.push(probability);
  if (history.length > 20) history.shift();

  document.getElementById("prob").innerText = probability;
  document.getElementById("spins").innerText = spins;

  animateBall();

  if (probability <= 0) end(false);
  if (spins >= 10 && probability > 60) end(true);

  drawHist();
}

/* 🎯 BALL PHYSICS */
function animateBall() {

  let angle = 0;
  let speed = 20;

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

/* ⚛ quantum glow effect */
function quantumEffect(win) {
  if (win) {
    wheel.style.boxShadow = "0 0 50px #0f0, 0 0 100px #0ff";
  } else {
    wheel.style.boxShadow = "0 0 50px #f00";
  }

  wheel.classList.add("quantum-flash");

  setTimeout(() => {
    wheel.classList.remove("quantum-flash");
    wheel.style.boxShadow = "0 0 30px #0ff";
  }, 500);
}

/* 📊 histogram */
function drawHist() {
  const ctx = document.getElementById("histCanvas").getContext("2d");
  ctx.clearRect(0,0,300,180);

  history.forEach((p,i) => {
    ctx.fillStyle = `hsl(${180+i*10},100%,50%)`;
    ctx.fillRect(i*12, 180 - p*1.5, 8, p*1.5);
  });
}

/* 🏁 END */
function end(win) {
  document.getElementById("result").style.display = "flex";
  document.getElementById("resultText").innerText =
    win ? "QUANTUM CASINO WIN" : "DECOHERENCE LOSS";
}
