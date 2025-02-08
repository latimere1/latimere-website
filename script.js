function showMessage() {
    alert("Welcome to Latimere! Aethra is here to assist you.");
}

document.addEventListener("DOMContentLoaded", function() {
    const ctaButton = document.querySelector(".cta-btn");
    ctaButton.addEventListener("click", function() {
        alert("Getting started with Aethra!");
    });

    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach(card => {
        card.addEventListener("mouseover", function() {
            card.style.backgroundColor = "#00bcd4";
        });
        card.addEventListener("mouseleave", function() {
            card.style.backgroundColor = "cyan";
        });
    });
});