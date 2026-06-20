
let gates=[];

let playerScore=0;

let aiScore=0;



function addGate(g){

gates.push(g);

document.getElementById(
"visualCircuit"
).innerHTML=

gates.join(" → ");


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


