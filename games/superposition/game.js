let heads = 0;
let tails = 0;
let gameOver = false;

function toss() {

  if (gameOver) return;

  let coin = document.getElementById("coin");

  // always restart animation
  coin.classList.remove("flip");
  void coin.offsetWidth;
  coin.classList.add("flip");

  let result = Math.random() < 0.5 ? "H" : "T";

  setTimeout(() => {

    coin.innerText = result;

    if (result === "H") heads++;
    else tails++;

    updateUI();
    checkWinLoss(); // 🔥 ALWAYS CALLED AFTER UPDATE

  }, 200);
}

/* UI UPDATE */
function updateUI() {

  document.getElementById("h").innerText = heads;
  document.getElementById("t").innerText = tails;

  let total = heads + tails;

  document.getElementById("barH").style.height =
    (heads / total) * 120 + "px";

  document.getElementById("barT").style.height =
    (tails / total) * 120 + "px";
}

/* 🔥 GUARANTEED WIN/LOSS CHECK */
function checkWinLoss() {

  if (gameOver) return;

  if (heads >= 5) {
    gameOver = true;
    endGame("🏆 YOU WIN — HEADS REACHED 5");
    return;
  }

  if (tails >= 5) {
    gameOver = true;
    endGame("💀 YOU LOSE — TAILS REACHED 5");
    return;
  }
}

/* END SCREEN */
function endGame(text) {

  gameOver = true;

  document.getElementById("overlay").style.display = "flex";
  document.getElementById("finalText").innerText = text;
}

/* RESET */
function reset() {

  heads = 0;
  tails = 0;
  gameOver = false;

  document.getElementById("overlay").style.display = "none";
  document.getElementById("coin").innerText = "H";

  updateUI();
}

updateUI();
