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

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("waitlist-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const messageBox = document.getElementById("waitlist-message");

        try {
            const response = await fetch("https://qh921m7woa.execute-api.us-east-1.amazonaws.com/prod/join-waitlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            // Parse the JSON response
            const data = await response.json();

            // Check for a non-OK HTTP status
            if (!response.ok) {
                console.error("Server error:", data);
                messageBox.textContent = "Error: " + (data.message || "Server error occurred.");
                messageBox.style.color = "red";
                return;
            }

            if (data.success) {
                messageBox.textContent = "You've been added to the waitlist!";
                messageBox.style.color = "green";
                document.getElementById("email").value = "";
            } else {
                messageBox.textContent = "Error: " + data.message;
                messageBox.style.color = "red";
            }
        } catch (error) {
            console.error("Waitlist submission error:", error);
            messageBox.textContent = "An error occurred. Please try again.";
            messageBox.style.color = "red";
        }
    });
});