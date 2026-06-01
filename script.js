function openGame(name) {
  document.getElementById("home").style.display = "none";
  document.getElementById("gameContainer").classList.remove("hidden");

  document.getElementById("gameFrame").src = "games/" + name + ".html";
}

function exitGame() {
  document.getElementById("gameContainer").classList.add("hidden");
  document.getElementById("home").style.display = "flex";
  document.getElementById("gameFrame").src = "";
}
