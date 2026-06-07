const canvas =
document.getElementById("blochCanvas");

const ctx =
canvas.getContext("2d");

canvas.width = 700;
canvas.height = 500;

let angle = -90;
let currentState = "|0⟩";

function drawSphere(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

const cx = 350;
const cy = 250;
const r = 150;

ctx.strokeStyle = "#00ffff";
ctx.lineWidth = 3;

ctx.beginPath();
ctx.arc(cx,cy,r,0,Math.PI*2);
ctx.stroke();

ctx.beginPath();
ctx.ellipse(
cx,
cy,
r,
r/3,
0,
0,
Math.PI*2
);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(cx-r,cy);
ctx.lineTo(cx+r,cy);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(cx,cy-r);
ctx.lineTo(cx,cy+r);
ctx.stroke();

const rad =
angle * Math.PI / 180;

const x =
cx + Math.cos(rad)*r;

const y =
cy + Math.sin(rad)*r;

ctx.strokeStyle="#ff00ff";
ctx.lineWidth=6;

ctx.beginPath();
ctx.moveTo(cx,cy);
ctx.lineTo(x,y);
ctx.stroke();

ctx.fillStyle="#ff00ff";

ctx.beginPath();
ctx.arc(x,y,10,0,Math.PI*2);
ctx.fill();

requestAnimationFrame(drawSphere);
}

drawSphere();

function applyGate(gate){

switch(gate){

case "X":
angle = 90;
currentState="|1⟩";
break;

case "Y":
angle = 0;
currentState="|+i⟩";
break;

case "Z":
angle = -90;
currentState="|0⟩";
break;

case "H":
angle = -45;
currentState="|+⟩";
break;
}

document.getElementById(
"stateDisplay"
).innerHTML=currentState;
}

function measure(){

const result =
Math.random() > 0.5
? "|1⟩"
: "|0⟩";

const box =
document.getElementById(
"resultBox"
);

box.className="";

if(result==="|1⟩"){

box.innerHTML=
"🏆 QUANTUM COLLAPSE → YOU WIN";

box.classList.add(
"winResult"
);

}else{

box.innerHTML=
"💀 QUANTUM COLLAPSE → YOU LOSE";

box.classList.add(
"loseResult"
);
}
}
