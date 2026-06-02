console.log("Quantum Game Hub Loaded");

function openGame(name) {
    document.getElementById("home").style.display = "none";
    document.getElementById("gameContainer").classList.remove("hidden");

    document.getElementById("gameFrame").src = "games/" + name + ".html";
}

function exitGame() {
    document.getElementById("home").style.display = "flex";
    document.getElementById("gameContainer").classList.add("hidden");

    document.getElementById("gameFrame").src = "";
}

// simple background particles (safe)
const canvas = document.getElementById("quantumCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 40; i++) {
        ctx.fillStyle = "rgba(0,247,255,0.3)";
        ctx.beginPath();
        ctx.arc(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            2,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    requestAnimationFrame(animate);
}

animate();
const text = "Explore Quantum Reality | Learn Physics Through Play | Simulate the Impossible";

let i = 0;

function typeWriter() {
    if (i < text.length) {
        document.getElementById("typewriter").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 60);
    }
}

window.addEventListener("load", () => {
    typeWriter();
});
