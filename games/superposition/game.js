let heads = 0;
let tails = 0;
let total = 0;
let maxToss = 10;
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

    document.getElementById("left").innerText = maxToss - total;

    updateUI();
    checkEnd();

  }, 200);
}

/* UPDATE */
function updateUI() {

  document.getElementById("h").innerText = heads;
  document.getElementById("t").innerText = tails;

  let hProb = heads / total || 0;
  let tProb = tails / total || 0;

  document.getElementById("barH").style.height = (hProb * 120) + "px";
  document.getElementById("barT").style.height = (tProb * 120) + "px";
}

/* END GAME */
function checkEnd() {

  if (total >= maxToss) {

    gameOver = true;

    let hProb = heads / total;
    let tProb = tails / total;

    let winner =
      hProb > tProb ? "🏆 HEADS WINS (HIGHER PROBABILITY)"
      : tProb > hProb ? "🏆 TAILS WINS (HIGHER PROBABILITY)"
      : "🤝 DRAW — PERFECT BALANCE";

    document.getElementById("finalText").innerText = winner;
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
  document.getElementById("left").innerText = maxToss;

  updateUI();
}

updateUI();
