let heads = 0;
let tails = 0;
let gameOver = false;

function toss() {

  if (gameOver) return;

  let coin = document.getElementById("coin");

  // restart animation every click
  coin.classList.remove("flip");
  void coin.offsetWidth;
  coin.classList.add("flip");

  let result = Math.random() < 0.5 ? "H" : "T";

  setTimeout(() => {

    coin.innerText = result;

    if (result === "H") heads++;
    else tails++;

    updateUI();
    checkGame();

  }, 200);
}

/* UPDATE UI */
function updateUI() {

  document.getElementById("h").innerText = heads;
  document.getElementById("t").innerText = tails;

  let total = heads + tails;

  document.getElementById("barH").style.height =
    (heads / total) * 120 + "px";

  document.getElementById("barT").style.height =
    (tails / total) * 120 + "px";
}

/* WIN / LOSE LOGIC (FIXED) */
function checkGame() {

  if (gameOver) return;

  if (heads >= 5) {
    gameOver = true;
    endGame("🏆 YOU WIN — HEADS MASTER");
    return;
  }

  if (tails >= 5) {
    gameOver = true;
    endGame("💀 YOU LOSE — TAIL OVERFLOW");
    return;
  }
}

/* END SCREEN */
function endGame(text) {

  gameOver = true;

  document.getElementById("overlay").style.display = "flex";
  document.getElementById("finalText").innerText = text;

  document.getElementById("tossBtn").disabled = true;
}

/* RESET GAME */
function reset() {

  heads = 0;
  tails = 0;
  gameOver = false;

  document.getElementById("overlay").style.display = "none";
  document.getElementById("tossBtn").disabled = false;
  document.getElementById("coin").innerText = "H";

  updateUI();
}
