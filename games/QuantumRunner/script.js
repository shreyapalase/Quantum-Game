let score = 0;
let history = [];

function startGame() {
    document.getElementById("gamePanel").classList.remove("hidden");
    window.scrollTo(0, document.body.scrollHeight);
}

function generateState() {
    let p0 = Math.random();
    let p1 = 1 - p0;

    document.getElementById("p0").innerText = p0.toFixed(2);
    document.getElementById("p1").innerText = p1.toFixed(2);

    document.getElementById("state").innerText =
        `√${p0.toFixed(2)}|0⟩ + √${p1.toFixed(2)}|1⟩`;

    document.getElementById("orb").style.filter =
        `hue-rotate(${p0 * 360}deg)`;

    drawHistogram(p0, p1);
}

function measure() {
    let p0 = parseFloat(document.getElementById("p0").innerText);

    let result = Math.random() < p0 ? 0 : 1;

    history.push(result);

    if (result === 0) score += 10;
    else score -= 5;

    document.getElementById("score").innerText = score;

    if (history.length >= 10) endGame();
}

function drawHistogram(p0, p1) {
    let canvas = document.getElementById("hist");
    let ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "cyan";
    ctx.fillRect(50, 50, p0 * 200, 30);

    ctx.fillStyle = "magenta";
    ctx.fillRect(50, 100, p1 * 200, 30);

    ctx.fillStyle = "white";
    ctx.fillText("|0⟩", 10, 70);
    ctx.fillText("|1⟩", 10, 120);
}

function endGame() {
    let win = score > 30 ? "PLAYER WINS QUANTUM WAR" : "PLAYER LOST IN UNCERTAINTY";

    document.getElementById("winnerText").innerText = win;
    document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
    location.reload();
}

function resetGame() {
    history = [];
    score = 0;
    document.getElementById("score").innerText = 0;
}
