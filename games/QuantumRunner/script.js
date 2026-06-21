/* =========================
   QUANTUM STATE ENGINE
   2 QUBITS = 4 COMPLEX STATES
   |00>, |01>, |10>, |11>
========================= */

let player = [1,0,0,0];
let ai = [1,0,0,0];

let logBox = document.getElementById("circuitLog");

/* STARFIELD */
const bg = document.getElementById("bg");
const ctx = bg.getContext("2d");
bg.width = innerWidth;
bg.height = innerHeight;

let stars = Array(200).fill().map(()=>({
  x:Math.random()*bg.width,
  y:Math.random()*bg.height,
  z:Math.random()*3
}));

function drawStars(){
  ctx.fillStyle="black";
  ctx.fillRect(0,0,bg.width,bg.height);

  ctx.fillStyle="#00ffe1";
  stars.forEach(s=>{
    s.y += s.z*0.5;
    if(s.y>bg.height) s.y=0;
    ctx.fillRect(s.x,s.y,2,2);
  });

  requestAnimationFrame(drawStars);
}
drawStars();

/* ===== QUANTUM GATES ===== */

function H(state){
  let [a,b,c,d] = state;
  let out = [
    (a+b)/Math.sqrt(2),
    (a-b)/Math.sqrt(2),
    (c+d)/Math.sqrt(2),
    (c-d)/Math.sqrt(2)
  ];
  return out;
}

function X(state){
  return [state[2],state[3],state[0],state[1]];
}

function CX(state){
  let out = [...state];
  if(Math.abs(state[2])>0 || Math.abs(state[3])>0){
    out[2]=state[3];
    out[3]=state[2];
  }
  return out;
}

/* ===== GAME CORE ===== */

function applyGate(g){
  player = gateApply(player,g);
  ai = gateApply(ai,randomGate());

  logBox.innerHTML += `<div>${g} applied</div>`;

  updateUI();
  drawHistogram();
  checkWinner();
}

function gateApply(state,g){
  if(g==="H") return H(state);
  if(g==="X") return X(state);
  if(g==="CX") return CX(state);
  return state;
}

function randomGate(){
  return ["H","X","CX"][Math.floor(Math.random()*3)];
}

/* ===== MEASUREMENT ===== */

function measure(){
  let p = probs(player);
  let a = probs(ai);

  animateBattle();

  if(p > a){
    show("PLAYER COLLAPSE WINS");
  } else {
    show("AI COLLAPSE DOMINATES");
  }
}

function probs(state){
  return state.reduce((s,v)=>s+v*v,0);
}

/* ===== UI ===== */

function updateUI(){
  document.getElementById("pState").innerText =
    player.map(v=>v.toFixed(2)).join(",");

  document.getElementById("aState").innerText =
    ai.map(v=>v.toFixed(2)).join(",");
}

/* ===== HISTOGRAM ===== */

function drawHistogram(){
  let c = document.getElementById("chart");
  let cctx = c.getContext("2d");

  c.width=400;
  c.height=200;

  let p = probs(player);
  let a = probs(ai);

  cctx.clearRect(0,0,400,200);

  cctx.fillStyle="#00ffe1";
  cctx.fillRect(50,200-p*200,80,p*200);

  cctx.fillStyle="#ff00ff";
  cctx.fillRect(200,200-a*200,80,a*200);
}

/* ===== ANIMATION ===== */

function animateBattle(){
  let b = document.getElementById("battleField");
  b.style.transform="scale(1.1)";
  setTimeout(()=>b.style.transform="scale(1)",200);
}

/* ===== GAME FLOW ===== */

function startBattle(){
  player=[1,0,0,0];
  ai=[1,0,0,0];
  logBox.innerHTML="";
  updateUI();
  drawHistogram();
}

function checkWinner(){
  let p = probs(player);
  let a = probs(ai);

  if(p>0.8){
    show("PLAYER QUANTUM DOMINANCE");
  }
  if(a>0.8){
    show("AI QUANTUM DOMINANCE");
  }
}

/* ===== POPUP ===== */

function show(text){
  document.getElementById("popup").classList.remove("hidden");
  document.getElementById("winnerText").innerText = text;
}

function reset(){
  document.getElementById("popup").classList.add("hidden");
  startBattle();
}

updateUI();
drawHistogram();
