
let gates=[];

let playerScore=0;

let aiScore=0;



function addGate(g){


gates.push(g);



document.getElementById(
"visualCircuit"
).innerHTML=

gates.join(" → ");



showWave(gates);


}


function runQuantum(){



let interference =
Math.random();


let probability =
Math.floor(interference*100);



playerScore=probability;


aiScore=
Math.floor(Math.random()*100);



drawHistogram();



document.getElementById("score")
.innerHTML=

`
PLAYER QUANTUM STATE:
${playerScore}%


<br>

QUANTUM AI:
${aiScore}%

`;



setTimeout(()=>{


let popup=document
.getElementById("popup");


popup.style.display="flex";



if(playerScore>aiScore)

document.getElementById("winner")
.innerHTML=

"🏆 YOU MASTERED QUANTUM INTERFERENCE";


else

document.getElementById("winner")
.innerHTML=

"⚛ QUANTUM AI WINS";


},1000);



}





function drawHistogram(){


let canvas=
document.getElementById("histogram");


let ctx=
canvas.getContext("2d");

canvas.width=400;

canvas.height=250;


ctx.clearRect(
0,0,400,250
);


let values=[

Math.random()*100,

playerScore,

aiScore

];



for(let i=0;i<3;i++){


ctx.fillStyle=
i==1?
"#00ffff":
"#8a2be2";


let h=
values[i]*2;


ctx.fillRect(

50+i*100,

250-h,

50,

h

);



ctx.fillStyle="white";

ctx.fillText(

Math.floor(values[i])+"%",

60+i*100,

230-h

);



}


}



function restart(){


gates=[];

playerScore=0;

aiScore=0;


document
.getElementById("visualCircuit")
.innerHTML="";


document
.getElementById("popup")
.style.display="none";


document
.getElementById("score")
.innerHTML=
"Waiting quantum execution...";


}
function showWave(gates){


let canvas =
document.getElementById("waveCanvas");


let ctx =
canvas.getContext("2d");


canvas.width =
canvas.clientWidth;


canvas.height =
canvas.clientHeight;



ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



let constructive =
gates.includes("H")
&&
gates.length%2==0;



let destructive =
gates.includes("Z");



let status =
document.getElementById("waveStatus");



if(constructive){


status.innerHTML =
"🌊 CONSTRUCTIVE INTERFERENCE : Waves Amplified";



drawWave(
ctx,
true
);



}

else if(destructive){


status.innerHTML =
"🌑 DESTRUCTIVE INTERFERENCE : Waves Cancelled";



drawWave(
ctx,
false
);


}

else{


status.innerHTML =
"Quantum waves waiting for phase interaction";

drawWave(
ctx,
true
);


}


}




function drawWave(ctx,positive){


let width =
ctx.canvas.width;


let height =
ctx.canvas.height;



ctx.lineWidth=3;



for(let wave=0;wave<2;wave++){


ctx.beginPath();


for(let x=0;x<width;x++){



let phase =
positive ?

wave*Math.PI/2 :

wave*Math.PI;



let y =

height/2 +

Math.sin(
x*0.05+phase
)
*
40;



ctx.lineTo(
x,
y
);


}



ctx.strokeStyle =
wave==0?

"#00ffff":

positive?

"#00ff88":

"#ff0055";



ctx.stroke();


}




// combined wave


ctx.beginPath();



for(let x=0;x<width;x++){


let amp =
positive?

80:

10;



let y=

height/2+

Math.sin(
x*0.05
)
*
amp;



ctx.lineTo(
x,
y
);


}


ctx.strokeStyle="#ffffff";

ctx.lineWidth=5;

ctx.stroke();



}

