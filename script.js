console.log("Quantum Arcade JS Loaded");

function openGame(name) {
  console.log("Opening game:", name);

  document.getElementById("home").style.display = "none";

  const gameContainer = document.getElementById("gameContainer");
  gameContainer.classList.remove("hidden");

  const frame = document.getElementById("gameFrame");
  frame.src = "games/" + name + ".html";
}

function exitGame() {
  console.log("Exit game");

  document.getElementById("gameContainer").classList.add("hidden");
  document.getElementById("home").style.display = "flex";

  document.getElementById("gameFrame").src = "";
}
