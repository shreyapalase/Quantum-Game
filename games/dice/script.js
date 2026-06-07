const dice = document.getElementById("dice");
const button = document.getElementById("rollBtn");
const resultBox = document.getElementById("resultBox");

button.addEventListener("click", () => {

    let count = 0;

    resultBox.className = "";

    const animation = setInterval(() => {

        dice.style.transform =
            `rotate(${count*25}deg) scale(${1+Math.sin(count)*0.1})`;

        dice.innerHTML =
            Math.floor(Math.random()*6)+1;

        count++;

        if(count > 30){

            clearInterval(animation);

            const quantumValue =
                Math.floor(Math.random()*6)+1;

            dice.innerHTML = quantumValue;

            dice.style.transform =
                "rotate(0deg) scale(1)";

            if(quantumValue > 3){

                resultBox.innerHTML =
                    "🏆 QUANTUM STATE COLLAPSED → YOU WIN";

                resultBox.classList.add("winResult");

            }else{

                resultBox.innerHTML =
                    "💀 QUANTUM STATE COLLAPSED → YOU LOSE";

                resultBox.classList.add("loseResult");
            }
        }

    },80);

});
