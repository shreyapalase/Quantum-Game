console.log("⚛️ Quantum Engine Booting...");

// ===============================
// CANVAS SETUP (SAFE)
// ===============================

const canvas = document.getElementById("quantumCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// ===============================
// PARTICLES (LIGHTWEIGHT SAFE)
// ===============================

const particles = [];
const COUNT = 120; // reduced for stability

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0,247,255,0.7)";
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < COUNT; i++) {
    particles.push(new Particle());
}

// ===============================
// SAFE ANIMATION LOOP
// ===============================

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of particles) {
        p.update();
        p.draw();
    }

    requestAnimationFrame(animate);
}

animate();

// ===============================
// MOUSE AURA (SAFE CHECK)
// ===============================

const aura = document.getElementById("mouseAura");

if (aura) {
    document.addEventListener("mousemove", (e) => {
        aura.style.left = e.clientX + "px";
        aura.style.top = e.clientY + "px";
    });
}

// ===============================
// GAME FUNCTIONS (FIXED)
// ===============================

function openGame(name) {
    console.log("Opening:", name);

    const home = document.getElementById("home");
    const gameContainer = document.getElementById("gameContainer");
    const frame = document.getElementById("gameFrame");

    if (!home || !gameContainer || !frame) {
        console.error("Missing DOM elements!");
        return;
    }

    home.style.display = "none";
    gameContainer.classList.remove("hidden");

    frame.src = "games/" + name + ".html";
}

function exitGame() {
    const home = document.getElementById("home");
    const gameContainer = document.getElementById("gameContainer");
    const frame = document.getElementById("gameFrame");

    gameContainer.classList.add("hidden");
    home.style.display = "grid";

    frame.src = "";
}
