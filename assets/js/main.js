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
