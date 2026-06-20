let probability0 = 1;
let probability1 = 0;

let measurements = 5;

let score = 0;

const targetState = 1;

const ctx =
document.getElementById("histogram")
.getContext("2d");

drawHistogram();

function applyGate(gate)
{
    if(gate==="H")
    {
        probability0 = 0.5;
        probability1 = 0.5;
    }

    if(gate==="X")
    {
        let t = probability0;
        probability0 = probability1;
        probability1 = t;
    }

    if(gate==="Z")
    {
        probability1 =
        Math.min(1, probability1+0.15);

        probability0 =
        1-probability1;
    }

    updateState();
}

function updateState()
{
    drawHistogram();

    document.getElementById("stateText")
    .innerText =
    `P(0)=${(probability0*100).toFixed(0)}%
     P(1)=${(probability1*100).toFixed(0)}%`;
}

function drawHistogram()
{
    ctx.clearRect(0,0,650,260);

    let h0 = probability0*200;
    let h1 = probability1*200;

    ctx.fillStyle="#00ffff";

    ctx.fillRect(150,
    240-h0,
    120,
    h0);

    ctx.fillRect(380,
    240-h1,
    120,
    h1);

    ctx.fillStyle="white";

    ctx.font="20px Arial";

    ctx.fillText("|0⟩",190,255);

    ctx.fillText("|1⟩",420,255);
}

function measureState()
{
    measurements--;

    document.getElementById("moves")
    .innerText = measurements;

    const result =
    Math.random() < probability1
    ?1:0;

    if(result===targetState)
    {
        score += 100;

        document.getElementById("score")
        .innerText = score;

        showResult(true);

        return;
    }

    if(measurements<=0)
    {
        showResult(false);
    }
}

function showResult(win)
{
    let modal =
    document.getElementById("endModal");

    modal.style.display="flex";

    if(win)
    {
        document.getElementById("resultTitle")
        .innerText =
        "ACCESS GRANTED";

        document.getElementById("resultText")
        .innerText =
        "Quantum Lock Successfully Opened.";
    }
    else
    {
        document.getElementById("resultTitle")
        .innerText =
        "ACCESS DENIED";

        document.getElementById("resultText")
        .innerText =
        "Quantum State Collapsed Incorrectly.";
    }
}

function resetGame()
{
    probability0 = 1;
    probability1 = 0;

    measurements = 5;
    score = 0;

    document.getElementById("score")
    .innerText = score;

    document.getElementById("moves")
    .innerText = measurements;

    document.getElementById("endModal")
    .style.display="none";

    updateState();
}
