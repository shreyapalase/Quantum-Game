const particles = document.getElementById("particles");

for(let i=0;i<150;i++){

let p=document.createElement("div");

p.className="quantumParticle";

p.style.left=Math.random()*100+"%";

p.style.animationDuration=
(5+Math.random()*10)+"s";

particles.appendChild(p);
}

const ctx =
document.getElementById("histogram");

let counts = {
"00":0,
"01":0,
"10":0,
"11":0
};

const chart = new Chart(ctx,{
type:"bar",
data:{
labels:["00","01","10","11"],
datasets:[{
label:"Measurement Counts",
data:[0,0,0,0],
backgroundColor:[
"cyan",
"magenta",
"yellow",
"lime"
]
}]
}
});

function updateHistogram(){

chart.data.datasets[0].data=[
counts["00"],
counts["01"],
counts["10"],
counts["11"]
];

chart.update();
}

document
.getElementById("measureBtn")
.onclick=function(){

let aliceBasis =
document.getElementById("aliceBasis").value;

let bobBasis =
document.getElementById("bobBasis").value;

let result;

if(aliceBasis===bobBasis){

if(Math.random()<0.5){
result="00";
}else{
result="11";
}

}else{

const states=[
"00",
"01",
"10",
"11"
];

result=
states[
Math.floor(
Math.random()*4
)
];
}

counts[result]++;

updateHistogram();

document
.getElementById("aliceResult")
.innerHTML=result[0];

document
.getElementById("bobResult")
.innerHTML=result[1];

let winnerBox=
document.getElementById("winnerBox");

if(
counts["00"]+
counts["11"]
>
counts["01"]+
counts["10"]
){

winnerBox.innerHTML=
"🏆 Quantum Team Dominates";

}else{

winnerBox.innerHTML=
"⚠ Classical Correlation Leading";
}
};
