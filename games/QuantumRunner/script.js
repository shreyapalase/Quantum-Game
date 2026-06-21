let playerHP = 100;
let enemyHP = 100;

const pHP = document.getElementById("pHP");
const eHP = document.getElementById("eHP");
const consoleBox = document.getElementById("console");

const attackBtn = document.getElementById("attackBtn");
const startBtn = document.getElementById("startBtn");

const popup = document.getElementById("popup");
const resultText = document.getElementById("resultText");

function log(msg){
  const div = document.createElement("div");
  div.innerText = ">> " + msg;
  consoleBox.appendChild(div);
  consoleBox.scrollTop = consoleBox.scrollHeight;
}

function updateBars(){
  pHP.style.width = playerHP + "%";
  eHP.style.width = enemyHP + "%";
}

function quantumRandom(){
  // quantum-inspired probability collapse
  return Math.random() * 100;
}

function attack(){
  let pAttack = quantumRandom();
  let eDefense = quantumRandom();

  let damageToEnemy = Math.max(5, Math.floor(pAttack - eDefense/2));
  let damageToPlayer = Math.max(3, Math.floor(eDefense - pAttack/2));

  enemyHP -= damageToEnemy;
  playerHP -= damageToPlayer;

  log(`Player collapse energy: ${pAttack.toFixed(2)}`);
  log(`Enemy defense wave: ${eDefense.toFixed(2)}`);
  log(`Damage dealt -> Enemy:${damageToEnemy} Player:${damageToPlayer}`);

  updateBars();
  checkGame();
  drawChart(pAttack, eDefense);
}

function checkGame(){
  if(enemyHP <= 0){
    endGame("PLAYER WINS - QUANTUM REALITY COLLAPSED");
  }
  if(playerHP <= 0){
    endGame("AI WINS - UNIVERSE STABILIZED AGAINST YOU");
  }
}

function endGame(msg){
  attackBtn.disabled = true;
  resultText.innerText = msg;
  popup.classList.remove("hidden");
}

function drawChart(a,b){
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");

  canvas.width = 250;
  canvas.height = 200;

  ctx.clearRect(0,0,canvas.width,canvas.height);

  const data = [a,b];
  const colors = ["#0ff","#f0f"];

  data.forEach((val,i)=>{
    ctx.fillStyle = colors[i];
    ctx.fillRect(50 + i*80, 180 - val, 40, val);
  });
}

startBtn.onclick = () => {
  attackBtn.disabled = false;
  log("Quantum War Initialized...");
  log("Wave function ready for collapse.");
};

attackBtn.onclick = attack;

updateBars();
