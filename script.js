console.log("⚛️ Quantum Game Engine Initialized");

// ===============================
// CANVAS SETUP
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
// QUANTUM PARTICLES
// ===============================

const particles = [];
const PARTICLE_COUNT = 180;

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;

        this.size = Math.random() * 2.2 + 0.8;
        this.alpha = Math.random() * 0.6 + 0.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 247, 255, ${this.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00f7ff";

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// create particles
for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
}

// ===============================
// MOUSE ENERGY FIELD
// ===============================

const mouseAura = document.getElementById("mouseAura");

document.addEventListener("mousemove", (e) => {
    mouseAura.style.left = e.clientX + "px";
    mouseAura.style.top = e.clientY + "px";
});

// ===============================
// ANIMATION LOOP
// ===============================

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw particles
    for (let p of particles) {
        p.update();
        p.draw();
    }

    // draw quantum connections
    drawConnections();

    requestAnimationFrame(animate);
}

animate();

// ===============================
// CONNECTION NETWORK
// ===============================

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {

            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
                ctx.beginPath();

                ctx.strokeStyle = `rgba(0, 247, 255, ${1 - dist / 110})`;
                ctx.lineWidth = 0.6;

                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);

                ctx.stroke();
            }
        }
    }
}

// ===============================
// 3D CARD INTERACTION SYSTEM
// ===============================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        card.style.transform = `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.07)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = `
            perspective(900px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;
    });
});

// ===============================
// GAME ENGINE FUNCTIONS
// ===============================

function openGame(name) {
    console.log("Launching Quantum Simulation:", name);

    document.getElementById("home").style.display = "none";
    document.getElementById("gameContainer").classList.remove("hidden");

    document.getElementById("gameFrame").src = "games/" + name + ".html";
}

function exitGame() {
    document.getElementById("gameContainer").classList.add("hidden");
    document.getElementById("home").style.display = "grid";

    document.getElementById("gameFrame").src = "";
}

// ===============================
// OPTIONAL: SUBTLE ENERGY PULSE
// ===============================

setInterval(() => {
    document.body.style.filter = `
        hue-rotate(${Math.random() * 6}deg)
    `;
}, 4000);
