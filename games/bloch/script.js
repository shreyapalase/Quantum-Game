const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

canvas.width = 520;
canvas.height = 520;

let theta = 0;
let phi = 0;

let target = {
  x: Math.random()*2-1,
  y: Math.random()*2-1,
  z: Math.random()*2-1
};

function bloch() {
  let x = Math.sin(theta)*Math.cos(phi);
  let y = Math.cos(theta);
  let z = Math.sin(theta)*Math.sin(phi);

  return {x,y,z};
}

function draw() {
  ctx.clearRect(0,0,520,520);

  let cx = 260, cy = 260;
  let R = 150;

  let v = bloch();

  // sphere
  ctx.beginPath();
  ctx.arc(cx,cy,R,0,Math.PI*2);
  ctx.strokeStyle="rgba(0,255,255,0.2)";
  ctx.stroke();

  // vector
  ctx.beginPath();
  ctx.moveTo(cx,cy);
  ctx.lineTo(cx+v.x*R, cy-v.y*R);
  ctx.strokeStyle="cyan";
  ctx.lineWidth=3;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx+v.x*R, cy-v.y*R, 6, 0, Math.PI*2);
  ctx.fillStyle="cyan";
  ctx.fill();

  // update coordinates
  document.getElementById("coords").innerText =
  `x=${v.x.toFixed(2)} y=${v.y.toFixed(2)} z=${v.z.toFixed(2)}`;
}

function measure() {
  let v = bloch();

  let d = Math.sqrt(
    (v.x-target.x)**2 +
    (v.y-target.y)**2 +
    (v.z-target.z)**2
  );

  let box = document.getElementById("resultBox");

  if(d < 0.8){
    box.innerText = "🏆 WIN: Quantum State Matched!";
    box.style.color="lime";
  } else {
    box.innerText = "❌ LOSS: State Mismatch";
    box.style.color="red";
  }

  target = {
    x: Math.random()*2-1,
    y: Math.random()*2-1,
    z: Math.random()*2-1
  };
}

function reset(){
  theta=0;
  phi=0;
  document.getElementById("theta").value=0;
  document.getElementById("phi").value=0;
}

function loop(){
  theta=document.getElementById("theta").value;
  phi=document.getElementById("phi").value;

  draw();
  requestAnimationFrame(loop);
}

loop();
