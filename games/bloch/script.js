const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

canvas.width = 520;
canvas.height = 520;

let theta = 0;
let phi = 0;
let rot = 0;

// 3D rotate + projection
function project(x, y, z) {
  let cos = Math.cos(rot);
  let sin = Math.sin(rot);

  // rotate Y axis (camera orbit)
  let dx = x * cos - z * sin;
  let dz = x * sin + z * cos;

  let scale = 300 / (dz + 400);

  return {
    x: 260 + dx * scale,
    y: 260 + y * scale
  };
}

// draw sphere grid
function drawSphere() {
  ctx.clearRect(0, 0, 520, 520);

  const R = 150;

  // latitude circles
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.arc(260, 260, R - i * 12, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,255,255,0.06)";
    ctx.stroke();
  }

  // axes
  function line3D(x1,y1,z1,x2,y2,z2,color){
    let p1 = project(x1,y1,z1);
    let p2 = project(x2,y2,z2);

    ctx.beginPath();
    ctx.moveTo(p1.x,p1.y);
    ctx.lineTo(p2.x,p2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  line3D(-R,0,0,R,0,0,"red");
  line3D(0,-R,0,0,R,0,"lime");
  line3D(0,0,-R,0,0,R,"cyan");

  // quantum state vector
  let x = Math.sin(theta) * Math.cos(phi) * R;
  let y = Math.cos(theta) * R;
  let z = Math.sin(theta) * Math.sin(phi) * R;

  let p0 = project(0,0,0);
  let p1 = project(x,y,z);

  // vector
  ctx.beginPath();
  ctx.moveTo(p0.x,p0.y);
  ctx.lineTo(p1.x,p1.y);
  ctx.strokeStyle = "#00ffff";
  ctx.lineWidth = 4;
  ctx.stroke();

  // arrow head
  ctx.beginPath();
  ctx.arc(p1.x,p1.y,6,0,Math.PI*2);
  ctx.fillStyle = "cyan";
  ctx.fill();

  // poles
  let top = project(0,R,0);
  let bottom = project(0,-R,0);

  ctx.fillStyle = "yellow";
  ctx.fillText("|0⟩", top.x, top.y);
  ctx.fillText("|1⟩", bottom.x, bottom.y);
}

function loop(){
  theta = document.getElementById("theta").value;
  phi = document.getElementById("phi").value;

  rot += 0.01; // smooth rotation

  drawSphere();
  requestAnimationFrame(loop);
}

function reset(){
  document.getElementById("theta").value = 0;
  document.getElementById("phi").value = 0;
}

loop();
