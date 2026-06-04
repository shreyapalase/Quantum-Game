let heads = 0;
let tails = 0;
let gameOver = false;

function toss() {

  if (gameOver) return;

  let coin = document.getElementById("coin");

  // ALWAYS retrigger animation
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

/* WIN / LOSE LOGIC */
function checkGame() {

  if (heads >= 5) {
    endGame("YOU WIN 🏆 HEADS MASTER");
  }

  if (tails >= 5) {
    endGame("YOU LOSE 💀 TOO MANY TAILS");
  }
}

/* END GAME */
function endGame(text) {

  gameOver = true;

  document.getElementById("overlay").style.display = "flex";
  document.getElementById("finalText").innerText = text;

  document.getElementById("tossBtn").disabled = true;
}

/* RESET */
function reset() {

  heads = 0;
  tails = 0;
  gameOver = false;

  document.getElementById("overlay").style.display = "none";
  document.getElementById("tossBtn").disabled = false;
  document.getElementById("coin").innerText = "H";

  updateUI();
}

updateUI();
