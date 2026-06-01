const canvas =
document.getElementById("quantumCanvas");

const ctx =
canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {

    constructor() {

        this.x =
        Math.random() * canvas.width;

        this.y =
        Math.random() * canvas.height;

        this.radius =
        Math.random() * 3 + 1;

        this.dx =
        (Math.random() - 0.5) * 0.7;

        this.dy =
        (Math.random() - 0.5) * 0.7;
    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
        "#00d4ff";

        ctx.fill();
    }

    update() {

        this.x += this.dx;
        this.y += this.dy;

        if (
            this.x < 0 ||
            this.x > canvas.width
        ) {
            this.dx *= -1;
        }

        if (
            this.y < 0 ||
            this.y > canvas.height
        ) {
            this.dy *= -1;
        }

        this.draw();
    }

}

for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
}

function connect() {

    for (let a = 0; a < particles.length; a++) {

        for (
            let b = a;
            b < particles.length;
            b++
        ) {

            let dx =
            particles[a].x -
            particles[b].x;

            let dy =
            particles[a].y -
            particles[b].y;

            let distance =
            Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {

                ctx.strokeStyle =
                "rgba(0,212,255,0.1)";

                ctx.lineWidth = 1;

                ctx.beginPath();

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();
            }
        }
    }
}

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p =>
        p.update()
    );

    connect();

    requestAnimationFrame(
        animate
    );
}

animate();

window.addEventListener(
    "resize",
    () => {

        canvas.width =
        window.innerWidth;

        canvas.height =
        window.innerHeight;
    }
);
