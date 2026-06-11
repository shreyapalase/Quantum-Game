const missions = [
  { title:"H Superposition", text:"Apply H gate on q0", pattern:["H"] },
  { title:"Entanglement", text:"Apply H then CX", pattern:["H","CX"] },
  { title:"X Operation", text:"Apply X gate", pattern:["X"] },
  { title:"Bell State", text:"H + CX entanglement", pattern:["H","CX"] },
  { title:"Mix Circuit", text:"H + X combination", pattern:["H","X"] },
  { title:"Double CX", text:"Two entanglements", pattern:["CX","CX"] },
  { title:"Superposition Chain", text:"Two H gates", pattern:["H","H"] },
  { title:"X + Entangle", text:"X then CX", pattern:["X","CX"] },
  { title:"Teleport Base", text:"H + CX + X", pattern:["H","CX","X"] },
  { title:"Final Circuit", text:"Full quantum circuit", pattern:["H","CX","H"] }
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
    div.className = "mission";
    div.innerHTML = `${i+1}. ${m.title}`;

    div.onclick = () => startMission(i);

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

function resetCircuit(){
  circuit = [];
  document.getElementById("q0").innerText = "— — —";
}

/* RUN */
document.getElementById("runBtn").onclick = () => {
  let target = missions[current].pattern;

  let ok = JSON.stringify(target) === JSON.stringify(circuit);

  if(ok){
    score += 100;
    showPopup("SUCCESS ⚛","Correct quantum circuit!");
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

function next(){
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
