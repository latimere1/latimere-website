function showMessage() {
    alert("Welcome to Latimere! Aethra is here to assist you.");
}

function toggleMenu() {
    var menu = document.querySelector("nav");
    menu.classList.toggle("show-menu");
}

document.addEventListener("DOMContentLoaded", function () {
    const ctaButton = document.querySelector(".cta-btn");
    if (ctaButton) {
        ctaButton.addEventListener("click", function () {
            alert("Getting started with Aethra!");
        });
    }

    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach(card => {
        card.addEventListener("mouseover", function () {
            card.style.backgroundColor = "#00bcd4";
        });
        card.addEventListener("mouseleave", function () {
            card.style.backgroundColor = "cyan";
        });
    });

    const menuIcon = document.querySelector(".menu-icon");
    const mobileMenu = document.getElementById("mobile-menu");
    if (menuIcon && mobileMenu) {
        menuIcon.addEventListener("click", function () {
            mobileMenu.classList.toggle("show-menu");
        });
    }

    const waitlistForm = document.getElementById("waitlist-form");
    if (waitlistForm) {
        waitlistForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            
            const emailInput = document.getElementById("email");
            const email = emailInput ? emailInput.value : "";
            const messageBox = document.getElementById("waitlist-message");

            try {
                const response = await fetch("https://qh921m7woa.execute-api.us-east-1.amazonaws.com/prod/join-waitlist", {
                    method: "POST",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();
                if (!response.ok || !data.success) {
                    messageBox.textContent = "Error: " + (data.message || "An error occurred. Please try again.");
                    messageBox.style.color = "red";
                } else {
                    messageBox.textContent = "You've been added to the waitlist!";
                    messageBox.style.color = "green";
                    emailInput.value = "";
                }
            } catch (error) {
                messageBox.textContent = "An error occurred. Please try again.";
                messageBox.style.color = "red";
            }
        });
    }

    const contactForm = document.getElementById("contact-form");
    const contactMessageBox = document.getElementById("form-message");
    if (contactForm) {
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            
            const submitButton = contactForm.querySelector("button[type='submit']");
            if (submitButton) {
                submitButton.disabled = true;
            }

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value;

            try {
                const response = await fetch("https://a5owpodkwg.execute-api.us-east-1.amazonaws.com/prod/send-contact-message", {
                    method: "POST",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, subject, message })
                });
                
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                
                const data = await response.json();
                if (data.success) {
                    contactMessageBox.textContent = "Your message has been sent successfully!";
                    contactMessageBox.style.color = "green";
                    contactForm.reset();
                } else {
                    contactMessageBox.textContent = "Error: " + (data.message || "An error occurred. Please try again.");
                    contactMessageBox.style.color = "red";
                }
            } catch (error) {
                console.error("Contact form submission error:", error);
                contactMessageBox.textContent = "An error occurred. Please try again.";
                contactMessageBox.style.color = "red";
            } finally {
                if (submitButton) {
                    setTimeout(() => {
                        submitButton.disabled = false;
                    }, 3000);
                }
            }
        }, { once: true });
    }
});
