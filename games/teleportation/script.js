let currentState = "";

const states = [
"|0⟩",
"|1⟩",
"|+⟩",
"|-⟩"
];

const source =
document.getElementById("sourceQubit");

const target =
document.getElementById("targetQubit");

document
.getElementById("createState")
.addEventListener("click",()=>{

currentState =
states[Math.floor(Math.random()*states.length)];

source.innerHTML=currentState;

target.innerHTML="?";
});

document
.getElementById("teleportBtn")
.addEventListener("click",()=>{

if(currentState===""){
alert("Generate Quantum State First");
return;
}

source.animate([
{
transform:"scale(1)"
},
{
transform:"scale(0)"
}
],{
duration:1000
});

setTimeout(()=>{

let success =
Math.random() > 0.25;

if(success){

target.innerHTML=currentState;

showPopup(
"🏆 TELEPORTATION SUCCESS"
);

}
else{

target.innerHTML="ERROR";

showPopup(
"❌ QUANTUM DECOHERENCE"
);

}

},1500);

});

function showPopup(msg){

document
.getElementById("resultTitle")
.innerHTML=msg;

document
.getElementById("popup")
.classList.remove("hidden");
}

function closePopup(){

location.reload();
}
