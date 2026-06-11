const states = ["|0⟩","|1⟩","|+⟩","|-⟩"];

const desc = {
"|0⟩":"Ground state",
"|1⟩":"Excited state",
"|+⟩":"Superposition state",
"|-⟩":"Phase flipped state"
};

let current = "";
let step = 0;
let score = 0;

const ai = document.getElementById("ai");

const messages = [
"Prepare qubit in Universe A",
"Creating entanglement pair",
"Performing Bell measurement",
"Sending classical bits",
"Reconstructing quantum state"
];

// Galaxy background
const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let stars = Array.from({length:400}, ()=>({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*2
}));

function draw(){
ctx.fillStyle="black";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="white";
stars.forEach(s=>{
ctx.beginPath();
ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
ctx.fill();
s.y+=0.3;
if(s.y>canvas.height) s.y=0;
});

requestAnimationFrame(draw);
}
draw();

// Generate state
document.getElementById("gen").onclick=()=>{
current = states[Math.floor(Math.random()*states.length)];

document.getElementById("sourceQubit").innerText = current;
document.getElementById("stateInfoA").innerText = desc[current];

document.getElementById("targetQubit").innerText = "?";
document.getElementById("stateInfoB").innerText = "";

step = 0;
score = 0;
document.getElementById("fill").style.width="0%";

ai.innerText = "Quantum state initialized: " + current;
};

// Next step
document.getElementById("next").onclick=()=>{

if(!current){
alert("Generate state first!");
return;
}

document.getElementById(`p${step}`).classList.add("active");

ai.innerText = messages[step];

score += 20;
document.getElementById("score").innerText = "Score: "+score;
document.getElementById("fill").style.width = (score)+"%";

if(step===3){
document.getElementById("beam").style.width="300px";
}

step++;

if(step===5){

document.getElementById("targetQubit").innerText = current;
document.getElementById("stateInfoB").innerText = desc[current];

document.getElementById("popup").classList.remove("hidden");
document.getElementById("title").innerText =
"MISSION SUCCESS: STATE TELEPORTED";
}

};
