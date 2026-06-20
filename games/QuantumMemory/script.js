
let state=0;

let energy=100;

let score=0;

let circuit=[];



let canvas=document.getElementById("chart");

let ctx=canvas.getContext("2d");



function startGame(){


state=0;

energy=100;

score=0;

circuit=[];


document.getElementById("qbit").innerHTML="|0⟩";


document.getElementById("energy").innerHTML=energy;

document.getElementById("score").innerHTML=score;


updateCircuit();


drawChart(.5);


document.getElementById("message").innerHTML=
"Quantum core initialized";



}




function applyGate(gate){



if(energy<=0){

endGame(false);

return;

}




circuit.push(gate);



if(gate=="H"){


state=.5;


score+=20;


message("Superposition created");



}



if(gate=="X"){


state=1-state;


score+=15;


message("Quantum flip executed");


}



if(gate=="MEASURE"){



let result=Math.random();



let probability;


if(state==.5)

probability=.5;

else

probability=(state==0)?1:0;



if(result<probability){


score+=50;


endGame(true);


}

else{


score-=20;


endGame(false);


}


}




energy-=10;


document.getElementById("energy").innerHTML=energy;


document.getElementById("score").innerHTML=score;


updateVisual();


}



function updateVisual(){


let q=document.getElementById("qbit");



if(state==0)

q.innerHTML="|0⟩";


else if(state==1)

q.innerHTML="|1⟩";


else

q.innerHTML="|0⟩ + |1⟩";


drawChart(state);


}



function updateCircuit(){


let text="q0 ───|0>─── ";


circuit.forEach(g=>{

text+="── "+g+" ──";

});


document.getElementById("circuit").innerHTML=text;


}



function message(t){

document.getElementById("message").innerHTML=t;

updateCircuit();

}




function drawChart(prob){


ctx.clearRect(0,0,canvas.width,canvas.height);



let p1=prob*200;


ctx.fillStyle="#00ffff";

ctx.fillRect(80,220-p1,80,p1);



ctx.fillStyle="#ff00ff";


ctx.fillRect(220,220-(200-p1),80,200-p1);



ctx.fillStyle="white";


ctx.fillText("|0>",100,240);

ctx.fillText("|1>",240,240);



}



function endGame(win){


document.getElementById("popup").style.display="flex";


if(win){


document.getElementById("result").innerHTML=
"🏆 QUANTUM MEMORY SAVED";


document.getElementById("details").innerHTML=

"Winner: Quantum Engineer<br>Memory probability stabilized";


}

else{


document.getElementById("result").innerHTML=
"☠ QUANTUM MEMORY LOST";


document.getElementById("details").innerHTML=

"Winner: Quantum System<br>Decoherence destroyed information";


}


}




function closePopup(){

document.getElementById("popup").style.display="none";

}



startGame();
