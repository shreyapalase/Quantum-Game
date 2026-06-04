let heads = 0;
let tails = 0;
let streak = 0;

function toss() {

  let coin = document.getElementById("coin");

  // animation
  coin.classList.remove("flip");
  void coin.offsetWidth;
  coin.classList.add("flip");

  let result = Math.random() < 0.5 ? "H" : "T";

  setTimeout(() => {

    coin.innerText = result;

    if (result === "H") {
      heads++;
      streak++;
    } else {
      tails++;
      streak = 0;
    }

    updateUI();
    checkWin();

  }, 300);
}

function updateUI() {
  document.getElementById("h").innerText = heads;
  document.getElementById("t").innerText = tails;
  document.getElementById("streak").innerText = streak;
}

function checkWin() {
  if (streak >= 3) {
    endGame("YOU WIN — 3 HEADS IN A ROW");
  }
}

function endGame(text) {
  document.getElementById("overlay").style.display = "flex";
  document.getElementById("final").innerText = text;
}

function reset() {
  heads = 0;
  tails = 0;
  streak = 0;

  document.getElementById("overlay").style.display = "none";
  document.getElementById("coin").innerText = "H";

  updateUI();
}
