function showMessage() {
  alert("Welcome to Latimere! Aethra is here to assist you.");
}

function toggleMenu() {
  var menu = document.querySelector("nav");
  menu.classList.toggle("show-menu");
}

document.addEventListener("DOMContentLoaded", function () {
  // CTA button event listener
  const ctaButton = document.querySelector(".cta-btn");
  if (ctaButton) {
    ctaButton.addEventListener("click", function () {
      alert("Getting started with Aethra!");
    });
  }

  // Feature cards hover events
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach(card => {
    card.addEventListener("mouseover", function () {
      card.style.backgroundColor = "#00bcd4";
    });
    card.addEventListener("mouseleave", function () {
      card.style.backgroundColor = "cyan";
    });
  });

  // Hamburger menu functionality
  const menuIcon = document.querySelector(".menu-icon");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuIcon && mobileMenu) {
    menuIcon.addEventListener("click", function () {
      mobileMenu.classList.toggle("show-menu");
    });
  }

  // Waitlist form submission handling
  const waitlistForm = document.getElementById("waitlist-form");
  if (waitlistForm) {
    waitlistForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const emailInput = document.getElementById("email");
      const email = emailInput ? emailInput.value : "";
      const messageBox = document.getElementById("waitlist-message");

      console.log("Submitting waitlist with email:", email);

      try {
        const response = await fetch("https://qh921m7woa.execute-api.us-east-1.amazonaws.com/prod/join-waitlist", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        });

        console.log("Waitlist response status:", response.status);
        const responseText = await response.text();
        console.log("Waitlist response text:", responseText);
        let data;
        if (responseText) {
          try {
            data = JSON.parse(responseText);
          } catch (err) {
            console.error("Error parsing waitlist response JSON:", err);
            data = {};
          }
        } else {
          data = { success: true };
        }
        if (typeof data !== "object") {
          data = { success: true };
        }
        if (!response.ok) {
          console.error("Server error:", data);
          messageBox.textContent = "Error: " + (data.message || "Server error occurred.");
          messageBox.style.color = "red";
          return;
        }
        if (data.success) {
          messageBox.textContent = "You've been added to the waitlist!";
          messageBox.style.color = "green";
          if (emailInput) emailInput.value = "";
        } else {
          messageBox.textContent = "Error: " + (data.message || "An error occurred. Please try again.");
          messageBox.style.color = "red";
        }
      } catch (error) {
        console.error("Waitlist submission error:", error);
        messageBox.textContent = "An error occurred. Please try again.";
        messageBox.style.color = "red";
      }
    });
  }
  
  // Contact form submission handling
  const contactForm = document.getElementById("contact-form");
  const contactMessageBox = document.getElementById("form-message");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      console.log("Submitting contact message:", { name, email, subject, message });

      try {
        const response = await fetch("https://a5owpodkwg.execute-api.us-east-1.amazonaws.com/prod/send-contact-message", {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message })
        });
        console.log("Contact response status:", response.status);
        const responseText = await response.text();
        console.log("Contact response text:", responseText);
        let data;
        if (responseText) {
          try {
            data = JSON.parse(responseText);
          } catch (err) {
            console.error("Error parsing contact response JSON:", err);
            data = {};
          }
        } else {
          data = {};
        }
        if (response.ok && (Object.keys(data).length === 0 || data.success)) {
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
      }
    });
  } else {
    console.error("Contact form not found!");
  }
});
