/* ========================================= */
/* GAME STATE */
/* ========================================= */

let quantumScore = 0;
let errorScore = 0;
let experiments = 0;
let correlatedEvents = 0;

const counts = {
    "00": 0,
    "01": 0,
    "10": 0,
    "11": 0
};

let achievements = [];

/* ========================================= */
/* DOM */
/* ========================================= */

const aliceResult =
document.getElementById("aliceResult");

const bobResult =
document.getElementById("bobResult");

const quantumScoreUI =
document.getElementById("quantumScore");

const errorScoreUI =
document.getElementById("errorScore");

const experimentCountUI =
document.getElementById("experimentCount");

const correlationRateUI =
document.getElementById("correlationRate");

const winnerBox =
document.getElementById("winnerBox");

const resultExplanation =
document.getElementById("resultExplanation");

const achievementBox =
document.getElementById("achievementBox");

const aiCommentator =
document.getElementById("aiCommentator");

/* ========================================= */
/* CHART */
/* ========================================= */

const chartCtx =
document.getElementById("histogram");

const histogram = new Chart(chartCtx, {

type: "bar",

data: {

labels: ["00", "01", "10", "11"],

datasets: [{
label: "Measurement Counts",

backgroundColor: [

"#00ffff",
"#ff00ff",
"#ffd700",
"#00ff88"

],

data: [0,0,0,0]
}]
},

options: {

responsive: true,

plugins: {

legend: {
labels: {
color: "white"
}
}

},

scales: {

y: {

beginAtZero: true,

ticks: {
color: "white"
}

},

x: {

ticks: {
color: "white"
}

}

}
}

});

/* ========================================= */
/* THREE JS LAB */
/* ========================================= */

const container =
document.getElementById("threeContainer");

const scene =
new THREE.Scene();

scene.background =
new THREE.Color(0x01040a);

const camera =
new THREE.PerspectiveCamera(
75,
container.clientWidth /
container.clientHeight,
0.1,
1000
);

camera.position.z = 8;

const renderer =
new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
container.clientWidth,
container.clientHeight
);

container.appendChild(
renderer.domElement
);

/* ========================================= */
/* LIGHTING */
/* ========================================= */

const pointLight =
new THREE.PointLight(
0x00ffff,
3
);

pointLight.position.set(
5,
5,
5
);

scene.add(pointLight);

const ambient =
new THREE.AmbientLight(
0xffffff,
0.5
);

scene.add(ambient);

/* ========================================= */
/* ENTANGLED PARTICLES */
/* ========================================= */

const geometry =
new THREE.SphereGeometry(
0.3,
32,
32
);

const materialA =
new THREE.MeshStandardMaterial({

color:0x00ffff,
emissive:0x00ffff,
emissiveIntensity:2

});

const materialB =
new THREE.MeshStandardMaterial({

color:0xff00ff,
emissive:0xff00ff,
emissiveIntensity:2

});

const particleA =
new THREE.Mesh(
geometry,
materialA
);

const particleB =
new THREE.Mesh(
geometry,
materialB
);

particleA.position.x = -2;
particleB.position.x = 2;

scene.add(particleA);
scene.add(particleB);

/* ========================================= */
/* ENTANGLEMENT BEAM */
/* ========================================= */

const lineMaterial =
new THREE.LineBasicMaterial({
color:0x00ffff
});

const linePoints = [

new THREE.Vector3(-2,0,0),
new THREE.Vector3(2,0,0)

];

const lineGeometry =
new THREE.BufferGeometry()
.setFromPoints(linePoints);

const beam =
new THREE.Line(
lineGeometry,
lineMaterial
);

scene.add(beam);

/* ========================================= */
/* ANIMATION */
/* ========================================= */

function animate(){

requestAnimationFrame(
animate
);

particleA.rotation.y += 0.02;
particleB.rotation.y += 0.02;

particleA.position.y =
Math.sin(
Date.now()*0.002
)*0.5;

particleB.position.y =
Math.cos(
Date.now()*0.002
)*0.5;

beam.rotation.z += 0.002;

renderer.render(
scene,
camera
);

}

animate();

/* ========================================= */
/* UPDATE CHART */
/* ========================================= */

function updateHistogram(){

histogram.data.datasets[0].data = [

counts["00"],
counts["01"],
counts["10"],
counts["11"]

];

histogram.update();

}

/* ========================================= */
/* AI COMMENTATOR */
/* ========================================= */

function updateAI(){

const comments = [

"Quantum fluctuations detected.",

"Correlation increasing.",

"Bell-state behavior observed.",

"Entanglement remains stable.",

"Quantum coherence maintained.",

"Analyzing measurement outcomes.",

"Comparing Alice and Bob statistics.",

"Potential Bell violation signatures."

];

aiCommentator.innerHTML =
comments[
Math.floor(
Math.random()*comments.length
)
];

}

/* ========================================= */
/* ACHIEVEMENTS */
/* ========================================= */

function unlockAchievement(name){

if(
!achievements.includes(name)
){

achievements.push(name);

achievementBox.innerHTML =
achievements.join("<br>");

}

}

/* ========================================= */
/* MISSIONS */
/* ========================================= */

function updateMissions(){

if(quantumScore >= 25){

document.getElementById(
"mission1"
).innerHTML =
"COMPLETED";
}

if(quantumScore >= 50){

document.getElementById(
"mission2"
).innerHTML =
"COMPLETED";
}

if(quantumScore >= 75){

document.getElementById(
"mission3"
).innerHTML =
"COMPLETED";
}

if(quantumScore >= 100){

document.getElementById(
"mission4"
).innerHTML =
"COMPLETED";
}

}

/* ========================================= */
/* WIN LOSS */
/* ========================================= */

function checkVictory(){

if(
quantumScore >= 100
){

winnerBox.innerHTML =
"🏆 QUANTUM TEAM WINS";

winnerBox.style.color =
"#00ff88";

resultExplanation.innerHTML =

"Strong quantum correlations were observed. The entangled pair repeatedly produced highly correlated outcomes.";

}

else if(
errorScore >= 25
){

winnerBox.innerHTML =
"💀 CLASSICAL TEAM WINS";

winnerBox.style.color =
"#ff4444";

resultExplanation.innerHTML =

"Too many correlation failures occurred. Noise dominated the experiment.";

}

else{

winnerBox.innerHTML =
"Experiment Running";

}

}

/* ========================================= */
/* MEASUREMENT ENGINE */
/* ========================================= */

document
.getElementById(
"measureBtn"
)
.addEventListener(
"click",
runExperiment
);

function runExperiment(){

const aliceBasis =
document.getElementById(
"aliceBasis"
).value;

const bobBasis =
document.getElementById(
"bobBasis"
).value;

let result;

/* same basis */

if(
aliceBasis === bobBasis
){

if(
Math.random() < 0.5
){

result = "00";

}else{

result = "11";

}

correlatedEvents++;
quantumScore += 10;

}

/* different basis */

else{

const possibilities = [

"00",
"01",
"10",
"11"

];

result =
possibilities[
Math.floor(
Math.random()*4
)
];

quantumScore += 2;

if(
result === "01" ||
result === "10"
){
errorScore++;
}

}

/* counts */

counts[result]++;

experiments++;

/* display */

aliceResult.innerHTML =
result[0];

bobResult.innerHTML =
result[1];

/* stats */

const correlation =
Math.round(
(
correlatedEvents /
experiments
) * 100
);

quantumScoreUI.innerHTML =
quantumScore;

errorScoreUI.innerHTML =
errorScore;

experimentCountUI.innerHTML =
experiments;

correlationRateUI.innerHTML =
correlation + "%";

/* chart */

updateHistogram();

/* ai */

updateAI();

/* achievements */

if(
experiments >= 10
){
unlockAchievement(
"🔬 First Research Session"
);
}

if(
correlation >= 80
){
unlockAchievement(
"⚛ Correlation Master"
);
}

if(
quantumScore >= 50
){
unlockAchievement(
"🚀 Bell Test Specialist"
);
}

if(
quantumScore >= 100
){
unlockAchievement(
"🏆 Quantum Champion"
);
}

/* missions */

updateMissions();

/* victory */

checkVictory();

/* visual pulse */

particleA.scale.set(
1.6,
1.6,
1.6
);

particleB.scale.set(
1.6,
1.6,
1.6
);

setTimeout(()=>{

particleA.scale.set(
1,
1,
1
);

particleB.scale.set(
1,
1,
1
);

},200);

}

/* ========================================= */
/* RESIZE */
/* ========================================= */

window.addEventListener(
"resize",
()=>{

camera.aspect =
container.clientWidth /
container.clientHeight;

camera.updateProjectionMatrix();

renderer.setSize(
container.clientWidth,
container.clientHeight
);

}
);

/* ========================================= */
/* START MESSAGE */
/* ========================================= */

aiCommentator.innerHTML =

"Welcome Scientist. Choose measurement bases for Alice and Bob, then run experiments to investigate quantum entanglement.";
