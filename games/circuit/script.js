const missions = [
  { title:"H Gate", text:"Apply H gate", pattern:["H"] },
  { title:"X Gate", text:"Apply X gate", pattern:["X"] },
  { title:"Entanglement", text:"H then CX", pattern:["H","CX"] },
  { title:"Bell State", text:"Create Bell state", pattern:["H","CX"] },
  { title:"Mix 1", text:"H + X", pattern:["H","X"] },
  { title:"Mix 2", text:"CX + X", pattern:["CX","X"] },
  { title:"Double H", text:"H then H", pattern:["H","H"] },
  { title:"Teleport Base", text:"H CX X", pattern:["H","CX","X"] },
  { title:"Quantum Chain", text:"CX CX", pattern:["CX","CX"] },
  { title:"Final Circuit", text:"H CX H", pattern:["H","CX","H"] }
];

let current = null;
let circuit = [];
let score = 0;

/* BUILD MENU */
function buildMenu(){
  const list = document.getElementById("missionList");
  list.innerHTML = "";

  missions.forEach((m,i)=>{
    let div = document.createElement("div");
    div.className = "missionItem";
    div.innerText = (i+1)+". "+m.title;
    div.onclick = ()=>startMission(i);
    list.appendChild(div);
  });
}
buildMenu();

/* START MISSION */
function startMission(i){
  current = i;
  circuit = [];

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  document.getElementById("missionTitle").innerText = missions[i].title;
  document.getElementById("missionText").innerText = missions[i].text;

  document.getElementById("target").innerText =
    missions[i].pattern.join(" → ");

  document.getElementById("q0").innerText = "— — —";
}

/* BACK */
function backToMenu(){
  document.getElementById("game").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");
}

/* QUIT */
function quitGame(){
  location.reload();
}

/* GATES */
function addGate(g){
  if(circuit.length >= 3) return;
  circuit.push(g);
  document.getElementById("q0").innerText = circuit.join(" ");
}

/* RESET */
function resetCircuit(){
  circuit = [];
  document.getElementById("q0").innerText = "— — —";
}

/* RUN CIRCUIT */
document.getElementById("runBtn").onclick = () => {

  let target = missions[current].pattern;

  let ok = JSON.stringify(target) === JSON.stringify(circuit);

  if(ok){
    score += 100;
    showPopup("SUCCESS ⚛","Correct quantum circuit built!");
  } else {
    score += 20;
    showPopup("FAILED","Circuit mismatch!");
  }

  document.getElementById("score").innerText = "Score: "+score;
};

/* POPUP */
function showPopup(t,m){
  document.getElementById("popup").classList.remove("hidden");
  document.getElementById("title").innerText = t;
  document.getElementById("text").innerText = m;
}

function nextMission(){
  document.getElementById("popup").classList.add("hidden");
  backToMenu();
}

/* BACKGROUND */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for(let i=0;i<300;i++){
  stars.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*2
  });
}

function animate(){
  ctx.fillStyle="#000";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle="cyan";

  stars.forEach(s=>{
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fill();

    s.y += 0.3;
    if(s.y>canvas.height) s.y=0;
  });

  requestAnimationFrame(animate);
}

animate();
