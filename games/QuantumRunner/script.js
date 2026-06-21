let player, ai;

window.onload = function () {
  player = [1,0,0,0];
  ai = [1,0,0,0];

  initCanvas();
  update();
  draw();
};

/* ===== STAR BACKGROUND ===== */
let ctx, bg, stars = [];

function initCanvas() {
  bg = document.getElementById("bg");
  ctx = bg.getContext("2d");

  bg.width = window.innerWidth;
  bg.height = window.innerHeight;

  stars = Array.from({length:150}, () => ({
    x: Math.random()*bg.width,
    y: Math.random()*bg.height,
    z: Math.random()*2+0.5
  }));

  animate();
}

function animate() {
  ctx.fillStyle="black";
  ctx.fillRect(0,0,bg.width,bg.height);

  ctx.fillStyle="#00ffe5";

  stars.forEach(s=>{
    s.y += s.z;
    if(s.y > bg.height) s.y = 0;
    ctx.fillRect(s.x,s.y,2,2);
  });

  requestAnimationFrame(animate);
}

/* ===== QUANTUM MATH ===== */

function H(s){
  let [a,b,c,d]=s;
  return [
    (a+b)/Math.SQRT2,
    (a-b)/Math.SQRT2,
    (c+d)/Math.SQRT2,
    (c-d)/Math.SQRT2
  ];
}

function X(s){
  return [s[2],s[3],s[0],s[1]];
}

function CX(s){
  let out=[...s];
  if(s[2]||s[3]){
    [out[2],out[3]]=[out[3],out[2]];
  }
  return out;
}

function gate(s,g){
  if(g==="H") return H(s);
  if(g==="X") return X(s);
  if(g==="CX") return CX(s);
  return s;
}

/* ===== GAME ACTIONS (GLOBAL FIXED) ===== */

window.startBattle = function(){
  player=[1,0,0,0];
  ai=[1,0,0,0];
  log("RESET");
  update();
  draw();
};

window.applyGate = function(g){
  player = gate(player,g);
  ai = gate(ai, random());

  log("Gate: "+g);
  update();
  draw();
  pulse();
};

window.measure = function(){
  let p = prob(player);
  let a = prob(ai);

  pulse();

  if(p>a){
    show("PLAYER WINS");
  } else {
    show("AI WINS");
  }
};

window.resetGame = function(){
  document.getElementById("popup").classList.add("hidden");
  startBattle();
};

/* ===== CORE ===== */

function prob(s){
  return s.reduce((x,v)=>x+v*v,0);
}

function random(){
  return ["H","X","CX"][Math.floor(Math.random()*3)];
}

/* ===== UI ===== */

function update(){
  document.getElementById("p").innerText = player.map(v=>v.toFixed(2));
  document.getElementById("a").innerText = ai.map(v=>v.toFixed(2));
}

function draw(){
  let c=document.getElementById("chart");
  let cx=c.getContext("2d");

  c.width=350;
  c.height=180;

  let p=prob(player);
  let a=prob(ai);

  cx.clearRect(0,0,400,200);

  cx.fillStyle="#00ffe5";
  cx.fillRect(50,180-p*180,60,p*180);

  cx.fillStyle="#ff00ff";
  cx.fillRect(180,180-a*180,60,a*180);
}

function log(t){
  let l=document.getElementById("log");
  if(l) l.innerHTML += "<div>"+t+"</div>";
}

function pulse(){
  let a=document.getElementById("arena");
  a.style.transform="scale(1.1)";
  setTimeout(()=>a.style.transform="scale(1)",150);
}

function show(t){
  document.getElementById("popup").classList.remove("hidden");
  document.getElementById("msg").innerText=t;
}
