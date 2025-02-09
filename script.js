function showMessage() {
    alert("Welcome to Latimere! Aethra is here to assist you.");
}

function toggleMenu() {
    var menu = document.querySelector("nav");
    menu.classList.toggle("show-menu");
}

document.addEventListener("DOMContentLoaded", function() {
    const ctaButton = document.querySelector(".cta-btn");
    if (ctaButton) {
        ctaButton.addEventListener("click", function() {
            alert("Getting started with Aethra!");
        });
    }

    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach(card => {
        card.addEventListener("mouseover", function() {
            card.style.backgroundColor = "#00bcd4";
        });
        card.addEventListener("mouseleave", function() {
            card.style.backgroundColor = "cyan";
        });
    });

    // Hamburger menu functionality
    const menuIcon = document.querySelector(".menu-icon");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (menuIcon && mobileMenu) {
        menuIcon.addEventListener("click", function() {
            mobileMenu.classList.toggle("show-menu");
        });
    }
});