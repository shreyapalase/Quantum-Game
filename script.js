console.log("Quantum Engine Online");

const canvas = document.getElementById("quantumCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

class Particle {

    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 1;

        this.speed =
            Math.random() * 0.6 + 0.2;

        this.alpha =
            Math.random() * 0.6 + 0.2;
    }

    update() {
        this.y -= this.speed;

        if (this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.beginPath();

        ctx.fillStyle =
            `rgba(0,247,255,${this.alpha})`;

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
}

for (let i = 0; i < 250; i++) {
    particles.push(new Particle());
}

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

animate();

/* GAME LOADER */

function openGame(name) {

    document.getElementById("home").style.display = "none";

    document
    .getElementById("gameContainer")
    .classList.remove("hidden");

    document
    .getElementById("gameFrame")
    .src = "games/" + name + ".html";
}

function exitGame() {

    document
    .getElementById("gameContainer")
    .classList.add("hidden");

    document
    .getElementById("home")
    .style.display = "grid";

    document
    .getElementById("gameFrame")
    .src = "";
}
/* MOUSE ENERGY FOLLOWER */

const glow =
document.getElementById("mouseGlow");

document.addEventListener("mousemove", e => {

glow.style.left =
e.clientX + "px";

glow.style.top =
e.clientY + "px";
});


/* 3D CARD TILT */

document.querySelectorAll(".card")
.forEach(card=>{

card.addEventListener("mousemove",e=>{

const rect=
card.getBoundingClientRect();

const x=
e.clientX-rect.left;

const y=
e.clientY-rect.top;

const rotateY=
((x/rect.width)-0.5)*20;

const rotateX=
((y/rect.height)-0.5)*-20;

card.style.transform=
`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
scale(1.08)`;
});

card.addEventListener("mouseleave",()=>{

card.style.transform=
"perspective(1000px) rotateX(0deg) rotateY(0deg)";
});

});
