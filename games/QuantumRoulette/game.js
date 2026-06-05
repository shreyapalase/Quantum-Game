let probability = 100;
let spins = 0;
let history = [];

const canvas = document.getElementById("histCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 180;

function spin() {

  spins++;

  const result = Math.floor(Math.random() * 12);

  if (result === 7 || result === 11) {
    probability += 5;
  } else {
    probability -= 8;
  }

  history.push(probability);
  if (history.length > 20) history.shift();

  document.getElementById("prob").innerText = probability;
  document.getElementById("spins").innerText = spins;

  draw();

  if (probability <= 0) end(false);
  if (spins >= 10 && probability > 60) end(true);
}

function draw() {
  ctx.clearRect(0,0,300,180);

  history.forEach((p,i) => {
    ctx.fillStyle = `hsl(${180+i*10},100%,50%)`;
    ctx.fillRect(i*12, 180 - p*1.5, 8, p*1.5);
  });
}

function end(win) {
  document.getElementById("result").style.display = "flex";
  document.getElementById("resultText").innerText =
    win ? "QUANTUM WIN" : "DECOHERENCE LOSS";
}
