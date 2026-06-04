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

    let winner = "";
    let badge = "";

    if (hProb > tProb) {
      winner = "HEADS DOMINATES";
      badge = "🏆 HEADS WIN";
    }
    else if (tProb > hProb) {
      winner = "TAILS DOMINATES";
      badge = "🏆 TAILS WIN";
    }
    else {
      winner = "PERFECT BALANCE";
      badge = "🤝 DRAW";
    }

    // SET TEXT
    document.getElementById("winnerTitle").innerText = winner;
    document.getElementById("winnerBadge").innerText = badge;

    document.getElementById("finalHeads").innerText = heads;
    document.getElementById("finalTails").innerText = tails;

    document.getElementById("finalProb").innerText =
      (hProb * 100).toFixed(1) + "% vs " +
      (tProb * 100).toFixed(1) + "%";

    // SHOW SCREEN
    document.getElementById("overlay").style.display = "flex";
  }
}/* RESET */
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
