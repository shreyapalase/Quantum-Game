/* ==========================
   SIMPLE QUANTUM SIM ENGINE
   (USED LATER FOR ALL GAMES)
=========================== */

/* Qubit in |0> state */
function createQubit() {
    return [1, 0];
}

/* Hadamard gate (superposition) */
function hadamard() {
    return [1 / Math.sqrt(2), 1 / Math.sqrt(2)];
}

/* Measurement simulation */
function measure(qubit) {
    const probabilityZero = qubit[0] ** 2;

    return Math.random() < probabilityZero ? 0 : 1;
}

/* Example: Quantum Coin Flip */
function quantumCoinFlip() {

    let qubit = createQubit();

    qubit = hadamard();

    return measure(qubit) === 0 ? "HEADS" : "TAILS";
}
