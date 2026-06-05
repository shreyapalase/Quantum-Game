import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

// ================= SCENE =================
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000010, 5, 60);

const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
camera.position.set(0, 8, 14);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// ================= LIGHT =================
const light = new THREE.PointLight(0x00ffff, 2);
light.position.set(10,10,10);
scene.add(light);

// ================= MAZE + TARGET =================
const nodes = [];
const grid = 6;

const geo = new THREE.SphereGeometry(0.25, 16, 16);

let targetIndex = Math.floor(Math.random() * 100);
let playerIndex = 0;

// create nodes
for(let x=-grid; x<=grid; x+=2){
  for(let z=-grid; z<=grid; z+=2){

    const mat = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x002233
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x,0,z);

    scene.add(mesh);
    nodes.push(mesh);
  }
}

// mark target
nodes[targetIndex].material.color.set(0xff00ff);

// ================= GAME STATE =================
let pulse = 0;
let decoherence = false;
let started = false;

// probability array
let probabilities = new Array(nodes.length).fill(0.5);

// ================= HISTOGRAM =================
const canvas = document.getElementById("histogram");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 120;

// ================= UPDATE HISTOGRAM =================
function drawHistogram(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  probabilities.forEach((p,i)=>{
    ctx.fillStyle = "cyan";
    ctx.fillRect(i*3, 120, 2, -p*100);
  });
}

// ================= WIN CHECK =================
function checkWin(){
  if(playerIndex === targetIndex){
    showResult(true);
  }
}

// ================= RESULT =================
function showResult(win){
  document.getElementById("resultScreen").classList.remove("hidden");

  document.getElementById("resultText").innerText =
    win ? "🏆 YOU WIN (Quantum Collapse Success)" : "💀 BOT WINS (Decoherence Override)";

  document.getElementById("resultDetail").innerText =
    win ? "You stabilized the quantum path." : "System collapsed before solution.";
}

// ================= START BUTTON =================
document.getElementById("startBtn").onclick = () => {
  started = true;
  pulse = 5;
};

// ================= ANIMATION =================
function animate(){
  requestAnimationFrame(animate);

  if(!started){
    renderer.render(scene,camera);
    return;
  }

  pulse += 0.02;

  nodes.forEach((n,i)=>{

    const t = pulse + i*0.1;

    // quantum oscillation
    n.position.y = Math.sin(t)*0.3;

    // probability amplification
    probabilities[i] = (Math.sin(t)+1)/2;

    n.material.emissiveIntensity = probabilities[i];

    if(decoherence){
      n.material.color.setHSL(Math.random(),1,0.5);
    }else if(i===targetIndex){
      n.material.color.set(0xff00ff);
    }else{
      n.material.color.set(0x00ffff);
    }
  });

  drawHistogram();

  camera.position.x = Math.sin(pulse*0.3)*14;
  camera.position.z = Math.cos(pulse*0.3)*14;
  camera.lookAt(0,0,0);

  renderer.render(scene,camera);

  checkWin();
}

animate();

// ================= INPUT =================
window.addEventListener("keydown",(e)=>{
  if(e.key.toLowerCase()==="d"){
    decoherence = !decoherence;
  }

  // simulate movement
  if(e.key === "ArrowRight") playerIndex++;
  if(e.key === "ArrowLeft") playerIndex--;

  checkWin();
});

window.addEventListener("click",()=>{
  pulse += 1;
});

// resize
window.addEventListener("resize",()=>{
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});
