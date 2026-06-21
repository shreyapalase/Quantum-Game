let player = 0;
let ai = 0;
let mode = "stable";

let history = [];

function setMode(m){
  mode = m;
  log("Mode set: " + m);
}

function quantumProbability(){
  // mock quantum state collapse
  let base = Math.random();

  if(mode === "stable") base += 0.1;
  if(mode === "chaos") base += (Math.random() - 0.5);
  if(mode === "entangle") base += 0.2;

  return Math.min(Math.max(base,0),1);
}

function runRound(){

  let p = quantumProbability();
  let a = Math.random();

  let result;

  if(p > a){
    player++;
    result = "PLAYER WINS ROUND";
  } else {
    ai++;
    result = "AI WINS ROUND";
  }

  history.push(p);
  drawChart();

  document.getElementById("ps").innerText = player;
  document.getElementById("as").innerText = ai;

  log(result + " | p=" + p.toFixed(2));

  checkWin();
}

function checkWin(){
  if(player >= 5){
    showPopup("YOU WIN — QUANTUM DOMINANCE ACHIEVED");
  }
  if(ai >= 5){
    showPopup("YOU LOSE — AI CONTROLLED QUANTUM STATE");
  }
}

function showPopup(text){
  document.getElementById("popup").style.display = "block";
  document.getElementById("resultText").innerText = text;
}

function log(t){
  let div = document.getElementById("log");
  div.innerHTML += "<div>" + t + "</div>";
  div.scrollTop = div.scrollHeight;
}

/* SIMPLE HISTOGRAM */
function drawChart(){
  let c = document.getElementById("chart");
  let ctx = c.getContext("2d");

  c.width = c.clientWidth;
  c.height = 200;

  ctx.clearRect(0,0,c.width,c.height);

  ctx.fillStyle = "cyan";

  let barW = c.width / history.length;

  history.forEach((v,i)=>{
    ctx.fillRect(i*barW, 200, barW-2, -v*200);
  });
}
