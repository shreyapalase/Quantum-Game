const canvas =
document.getElementById("galaxy");

const ctx =
canvas.getContext("2d");

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

let stars=[];

for(let i=0;i<700;i++){

stars.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*2

});

}

function animateGalaxy(){

ctx.fillStyle="#000";
ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

ctx.fillStyle="white";

stars.forEach(star=>{

ctx.beginPath();

ctx.arc(
star.x,
star.y,
star.r,
0,
Math.PI*2
);

ctx.fill();

star.y+=0.2;

if(star.y>canvas.height){

star.y=0;

}

});

requestAnimationFrame(
animateGalaxy
);

}

animateGalaxy();

const states=[
"|0⟩",
"|1⟩",
"|+⟩",
"|-⟩"
];

let currentState="";
let phase=0;
let score=0;

const commander=
document.getElementById(
"commander"
);

const messages=[

"Prepare unknown quantum state.",

"Create entanglement pair.",

"Perform Bell measurement.",

"Transmit classical bits.",

"Reconstruct target state."

];

document
.getElementById(
"generateBtn"
)
.onclick=()=>{

currentState=
states[
Math.floor(
Math.random()*4
)
];

document
.getElementById(
"sourceQubit"
)
innerHTML=currentState;

phase=0;
score=0;

};

document
.getElementById(
"nextStep"
)
.onclick=()=>{

if(currentState===""){
alert(
"Generate state first."
);
return;
}

document
.getElementById(
`p${phase}`
)
.classList.add(
"active"
);

commander.innerHTML=
messages[phase];

score+=20;

document
.getElementById(
"score"
)
.innerHTML=
"Score: "+score;

document
.getElementById(
"progressFill"
)
.style.width=
(score)+"%";

if(phase===3){

document
.getElementById(
"beam"
)
.style.width=
"300px";

}

phase++;

if(phase===5){

document
.getElementById(
"targetQubit"
)
.innerHTML=
currentState;

showWin();

}

};

function showWin(){

document
.getElementById(
"popup"
)
.classList.remove(
"hidden"
);

document
.getElementById(
"popupTitle"
)
.innerHTML=
"MISSION SUCCESS";

document
.getElementById(
"popupText"
)
.innerHTML=
"Quantum State Teleported Successfully";
}

function restartMission(){

location.reload();

}
