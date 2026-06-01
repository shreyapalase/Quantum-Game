
/* ==========================
   PAGE NAVIGATION (FIXED)
=========================== */

function showSection(id){

    let pages = document.querySelectorAll(".page");

    pages.forEach(p => {
        p.classList.add("hidden");
    });

    document.getElementById(id)
        .classList.remove("hidden");
}

/* ==========================
   QUANTUM ENGINE
=========================== */

function createQubit(){
    return [1,0];
}

function hadamard(){
    return [1/Math.sqrt(2), 1/Math.sqrt(2)];
}

function measure(q){
    return Math.random() < 0.5 ? 0 : 1;
}

/* ==========================
   QUANTUM COIN GAME
=========================== */

function runQuantumCoin(){

    let q = createQubit();
    q = hadamard();

    let result = measure(q);

    document.getElementById("result").innerText =
        result === 0 ? "HEADS 🪙" : "TAILS 🪙";
}
