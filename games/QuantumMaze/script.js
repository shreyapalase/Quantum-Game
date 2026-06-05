let probabilities = {
  pathA: 0.25,
  pathB: 0.25,
  pathC: 0.25,
  exit: 0.25
};

let steps = 0;

const chart = new Chart(document.getElementById("chart"), {
  type: "bar",
  data: {
    labels: ["A", "B", "C", "EXIT"],
    datasets: [{
      label: "Probability",
      data: Object.values(probabilities),
      backgroundColor: ["cyan","magenta","yellow","lime"]
    }]
  }
});

function updateChart(){
  chart.data.datasets[0].data = Object.values(probabilities);
  chart.update();
}

/* Quantum Gates Simulation */

function applyGate(gate){

if(gate === "H Gate"){
for(let k in probabilities){
probabilities[k] += (Math.random()-0.5)*0.1;
}
}

if(gate === "X Gate"){
let temp = probabilities.pathA;
probabilities.pathA = probabilities.pathC;
probabilities.pathC = temp;
}

if(gate === "Z Gate"){
probabilities.exit += 0.05;
}

normalize();
updateChart();
}

function normalize(){
let sum = 0;
for(let k in probabilities) sum += probabilities[k];
for(let k in probabilities){
probabilities[k] /= sum;
}
}

/* measurement collapse */

function measure(){
let r = Math.random();
let acc = 0;

for(let k in probabilities){
acc += probabilities[k];
if(r <= acc){
return k;
}
}
}

/* UI */

document.getElementById("stepBtn").onclick = () => {
applyGate(document.getElementById("gate").value);
steps++;
};

document.getElementById("measureBtn").onclick = () => {

let result = measure();

document.getElementById("resultBox").innerText =
"Collapsed Path: " + result;

if(result === "exit"){
document.getElementById("winnerBox").innerText =
"🏆 YOU ESCAPED THE QUANTUM MAZE";
} else {
document.getElementById("winnerBox").innerText =
"💀 LOST IN SUPERPOSITION";
}
};
