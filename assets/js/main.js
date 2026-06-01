document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".game-card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.transform =
                "translateY(-10px) scale(1.03)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform =
                "translateY(0px) scale(1)";
        });

    });

});

function toggleMenu() {

    const menu = document.getElementById("dropdown");

    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
        menu.style.flexDirection = "column";
    }
}
