import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

// =====================
// BASIC SETUP
// =====================
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000010, 5, 60);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 6, 12);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// =====================
// LIGHTING (Quantum Field)
// =====================
const light = new THREE.PointLight(0x00ffff, 2, 100);
light.position.set(10, 10, 10);
scene.add(light);

const ambient = new THREE.AmbientLight(0x112244);
scene.add(ambient);

// =====================
// MAZE GRID (simple quantum lattice)
// =====================
const nodes = [];
const gridSize = 7;

const nodeGeo = new THREE.SphereGeometry(0.25, 16, 16);

function createNode(x, z) {
  const mat = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    emissive: 0x003344
  });

  const mesh = new THREE.Mesh(nodeGeo, mat);
  mesh.position.set(x, 0, z);
  scene.add(mesh);

  return { mesh, baseY: 0 };
}

// build grid
for (let x = -gridSize; x <= gridSize; x += 2) {
  for (let z = -gridSize; z <= gridSize; z += 2) {
    nodes.push(createNode(x, z));
  }
}

// =====================
// GROVER-LIKE PULSE STATE
// =====================
let pulse = 0;
let decoherence = false;

// =====================
// ANIMATION LOOP
// =====================
function animate() {
  requestAnimationFrame(animate);

  pulse += 0.02;

  nodes.forEach((n, i) => {
    const t = pulse + i * 0.1;

    // quantum oscillation
    n.mesh.position.y = Math.sin(t) * 0.4;

    // Grover-like highlight sweep
    const glow = (Math.sin(t) + 1) / 2;

    n.mesh.material.emissiveIntensity = decoherence
      ? Math.random() * 3
      : glow * 1.5;

    // color shift
    if (decoherence) {
      n.mesh.material.color.setHSL(Math.random(), 1, 0.5);
    } else {
      n.mesh.material.color.set(0x00ffff);
    }
  });

  // camera slow orbit
  camera.position.x = Math.sin(pulse * 0.2) * 12;
  camera.position.z = Math.cos(pulse * 0.2) * 12;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

animate();

// =====================
// INTERACTIONS
// =====================

// click = quantum pulse burst
window.addEventListener("click", () => {
  pulse += 1.5;
});

// toggle boss mode
window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "d") {
    decoherence = !decoherence;
  }
});

// resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
