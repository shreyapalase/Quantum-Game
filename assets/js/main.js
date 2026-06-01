
/* ==========================
   QUANTUM ARCADE SPA ENGINE
=========================== */

/* MAIN PAGE SWITCH FUNCTION */
function showSection(sectionId) {

    const sections = document.querySelectorAll(".page");

    // EXIT ANIMATION (quantum fade out)
    sections.forEach(sec => {
        sec.classList.add("fade-out");
    });

    // Delay for smooth transition
    setTimeout(() => {

        // hide all sections
        sections.forEach(sec => {
            sec.classList.add("hidden");
            sec.classList.remove("fade-out");
        });

        // show target section
        const target = document.getElementById(sectionId);

        target.classList.remove("hidden");
        target.classList.add("fade-in");

        // remove animation class after finish
        setTimeout(() => {
            target.classList.remove("fade-in");
        }, 600);

    }, 200);
}


/* ==========================
   CARD HOVER EFFECTS
=========================== */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.05)";
            card.style.boxShadow = "0 0 25px rgba(0, 212, 255, 0.4)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
            card.style.boxShadow = "none";
        });

    });

});


/* ==========================
   QUANTUM ENGINE (BASIC CORE)
   (USED LATER FOR ALL GAMES)
=========================== */

function createQubit() {
    return [1, 0]; // |0>
}

function hadamard() {
    return [1 / Math.sqrt(2), 1 / Math.sqrt(2)];
}

function measure(qubit) {

    const p0 = qubit[0] * qubit[0];

    return Math.random() < p0 ? 0 : 1;
}

function quantumCoinFlip() {

    let qubit = createQubit();
    qubit = hadamard();

   
    return measure(qubit) === 0 ? "HEADS" : "TAILS";
}

/* ==========================
   QUANTUM COIN GAME
=========================== */

function runQuantumCoin() {

    let qubit = createQubit();

    // Apply Hadamard gate
    qubit = hadamard();

    // Measure result
    let result = measure(qubit);

    let text = result === 0 ? "HEADS 🪙" : "TAILS 🪙";

    document.getElementById("result")
        .innerText = text;
}
