function showMessage() {
  alert("Welcome to Latimere! Aethra is here to assist you.");
}

function toggleMenu() {
  var menu = document.querySelector("nav");
  menu.classList.toggle("show-menu");
}

function openModal() {
  var modal = document.getElementById("learnMoreModal");
  if (modal) {
    modal.style.display = "block";
  }
}

function closeModal() {
  var modal = document.getElementById("learnMoreModal");
  if (modal) {
    modal.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // CTA button event listener for header CTA button
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

  // (Optional) Hamburger menu functionality is already handled by the inline onclick on .menu-icon
  // If desired, you can uncomment the following to attach the event here:
  // const menuIcon = document.querySelector(".menu-icon");
  // if (menuIcon) {
  //   menuIcon.addEventListener("click", toggleMenu);
  // }

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

        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Response data:", data);

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
          messageBox.textContent = "Error: " + data.message;
          messageBox.style.color = "red";
        }
      } catch (error) {
        console.error("Waitlist submission error:", error);
        messageBox.textContent = "An error occurred. Please try again.";
        messageBox.style.color = "red";
      }
    });
  } else {
    console.error("Waitlist form not found!");
  }

  // Modal: Close modal if the user clicks outside the modal content
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("learnMoreModal");
    if (event.target === modal) {
      closeModal();
    }
  });
});
