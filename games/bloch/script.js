let scene;
let camera;
let renderer;
let sphere;
let arrow;

let state = "|0⟩";

const container =
document.getElementById("sphereContainer");

scene = new THREE.Scene();

camera =
new THREE.PerspectiveCamera(
60,
container.clientWidth /
container.clientHeight,
0.1,
1000
);

renderer =
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

camera.position.z = 4;

const geometry =
new THREE.SphereGeometry(
1,
64,
64
);

const material =
new THREE.MeshBasicMaterial({
color:0x00ffff,
wireframe:true
});

sphere =
new THREE.Mesh(
geometry,
material
);

scene.add(sphere);

const arrowHelper =
new THREE.ArrowHelper(
new THREE.Vector3(0,1,0),
new THREE.Vector3(0,0,0),
1.2,
0xff00ff,
0.2,
0.1
);

scene.add(arrowHelper);

arrow = arrowHelper;

function animate(){

requestAnimationFrame(
animate
);

sphere.rotation.y += 0.003;

renderer.render(
scene,
camera
);

}

animate();

function applyGate(gate){

switch(gate){

case "X":

arrow.setDirection(
new THREE.Vector3(
0,-1,0
));

state = "|1⟩";

break;

case "Y":

arrow.setDirection(
new THREE.Vector3(
1,0,0
));

state = "|+i⟩";

break;

case "Z":

arrow.setDirection(
new THREE.Vector3(
0,1,0
));

state = "|0⟩";

break;

case "H":

arrow.setDirection(
new THREE.Vector3(
1,1,0
).normalize()
);

state = "|+⟩";

break;

}

document
.getElementById(
"stateDisplay"
).innerHTML = state;

}

function measure(){

let result =
Math.random() > 0.5
? "|1⟩"
: "|0⟩";

let box =
document.getElementById(
"resultBox"
);

box.className="";

if(result==="|1⟩"){

box.innerHTML =
"🏆 TARGET STATE REACHED<br>YOU WIN";

box.classList.add(
"winResult"
);

}else{

box.innerHTML =
"💀 WRONG COLLAPSE<br>YOU LOSE";

box.classList.add(
"loseResult"
);

}

}
