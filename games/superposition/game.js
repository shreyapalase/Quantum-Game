let heads = 0;
let tails = 0;
let total = 0;
let max = 10;
let gameOver = false;

function toss() {

  if (gameOver) return;

  let coin = document.getElementById("coin");

  coin.classList.remove("flip");
  void coin.offsetWidth;
  coin.classList.add("flip");

  let result = Math.random() < 0.5 ? "H" : "T";

  setTimeout(() => {

    coin.innerText = result;

    if (result === "H") heads++;
    else tails++;

    total++;

    document.getElementById("left").innerText = max - total;

    updateUI();
    checkGame();

  }, 200);
}

/* UI */
function updateUI() {

  document.getElementById("h").innerText = heads;
  document.getElementById("t").innerText = tails;

  let hProb = heads / total || 0;
  let tProb = tails / total || 0;

  document.getElementById("barH").style.height = (hProb * 120) + "px";
  document.getElementById("barT").style.height = (tProb * 120) + "px";
}

/* WIN / LOSE FIXED */
function checkGame() {

  if (total >= max) {

    gameOver = true;

    let hProb = heads / total;
    let tProb = tails / total;

    let msg = "";

    if (hProb > tProb) {
      msg = "🏆 HEADS WINS — HIGHER PROBABILITY";
    } 
    else if (tProb > hProb) {
      msg = "🏆 TAILS WINS — HIGHER PROBABILITY";
    } 
    else {
      msg = "🤝 DRAW — PERFECT BALANCE";
    }

    document.getElementById("finalText").innerText = msg;
    document.getElementById("overlay").style.display = "flex";
  }
}

/* RESET */
function reset() {

  heads = 0;
  tails = 0;
  total = 0;
  gameOver = false;

  document.getElementById("overlay").style.display = "none";
  document.getElementById("left").innerText = max;

  updateUI();
}

updateUI();
