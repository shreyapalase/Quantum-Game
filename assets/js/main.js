/* ==========================
   QUANTUM ARCADE SPA ENGINE
=========================== */

/* Show / Hide Pages */
function showSection(sectionId) {

    const sections = document.querySelectorAll(".page");

    sections.forEach(sec => {
        sec.classList.add("hidden");
    });

    document.getElementById(sectionId)
        .classList.remove("hidden");

}

/* ==========================
   OPTIONAL: SMOOTH CARD EFFECTS
=========================== */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.05)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });

    });

});
