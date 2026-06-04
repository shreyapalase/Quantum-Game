let theta = 0;
let score = 0;
let failStreak = 0;

let dragging = false;

document.addEventListener("mousedown", () => dragging = true);
document.addEventListener("mouseup", () => dragging = false);

document.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  theta = (e.clientX / window.innerWidth) * Math.PI * 2;
  update();
});

/* QUANTUM STATE */
function update() {
  let p1 = Math.sin(theta / 2) ** 2;
  let p0 = 1 - p1;

  let a = Math.round(p0 * 100);
  let b = Math.round(p1 * 100);

  document.getElementById("prob0").innerText = a;
  document.getElementById("prob1").innerText = b;

  document.getElementById("p0").style.width = a + "%";
  document.getElementById("p1").style.width = b + "%";

  document.getElementById("ptr").style.transform =
    `translate(${Math.sin(theta) * 70}px, ${Math.cos(theta) * 70}px)`;
}

/* MEASURE */
function measure() {
  let p1 = Math.sin(theta / 2) ** 2;
  let result = Math.random() < p1 ? 1 : 0;

  let msg = "";

  if (p1 > 0.7 && result === 1) {
    score++;
    failStreak = 0;
    msg = "✔ Quantum success: |1⟩ stabilized";
  } else {
    score--;
    failStreak++;
    msg = "✖ Collapse failure";
  }

  document.getElementById("result").innerText = msg;

  updateScore();
  checkEnd();
}

/* SCORE */
function updateScore() {
  document.getElementById("score").innerText = score;

  let rank =
    score > 8 ? "QUANTUM GOD" :
    score > 5 ? "SYNTH OPERATOR" :
    score > 2 ? "RESEARCHER" :
    "INIT";

  document.getElementById("grade").innerText = rank;
}

/* WIN/LOSE SYSTEM */
function checkEnd() {
  let p1 = Math.sin(theta / 2) ** 2;

  if (score >= 5 && p1 >= 0.7) {
    endGame("YOU WIN — REALITY STABILIZED ⚛");
  }

  if (score <= -3 || failStreak >= 3) {
    endGame("YOU LOSE — QUANTUM COLLAPSE ☠");
  }
}

/* END SCREEN */
function endGame(text) {
  document.getElementById("overlay").style.display = "flex";
  document.getElementById("finalText").innerText = text;
}

/* RESET */
function resetGame() {
  theta = 0;
  score = 0;
  failStreak = 0;

  document.getElementById("overlay").style.display = "none";
  document.getElementById("result").innerText = "";

  updateScore();
  update();
}

update();
