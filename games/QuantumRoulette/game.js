let probability = 100;
let spins = 0;
let history = [];

const hist = document.getElementById("hist");
const hctx = hist.getContext("2d");

hist.width = 300;
hist.height = 180;

function spin() {

  spins++;

  // ⚛ quantum collapse simulation
  let result = Math.floor(Math.random() * 12);

  if (result === 7 || result === 11) {
    probability += 5; // lucky collapse
  } else {
    probability -= 8; // decoherence loss
  }

  history.push(probability);
  if (history.length > 20) history.shift();

  document.getElementById("prob").innerText = probability;
  document.getElementById("spins").innerText = spins;

  if (probability <= 0) return end(false);
  if (spins >= 10 && probability > 60) return end(true);

  drawHist();
}

/* 📊 HISTOGRAM */
function drawHist() {
  hctx.clearRect(0,0,300,180);

  history.forEach((p,i) => {
    hctx.fillStyle = `hsl(${180+i*10},100%,50%)`;
    hctx.fillRect(i*12, 180 - p*1.5, 8, p*1.5);
  });
}

/* 🏁 END SCREEN */
function end(win) {
  document.getElementById("result").style.display = "flex";
  document.getElementById("resultText").innerText =
    win ? "QUANTUM WIN: COLLAPSE SUCCESS" : "DECOHERENCE LOSS";
}
