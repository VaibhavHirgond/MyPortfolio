const themeBtn = document.getElementById("theme-toggle");
const body = document.body;

const updateTheme = (theme) => {
  body.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);
  const icon = themeBtn.querySelector("i");
  icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
};

const currentTheme = localStorage.getItem("portfolio-theme") || "dark";
updateTheme(currentTheme);

themeBtn.addEventListener("click", () => {
  const isDark = body.getAttribute("data-theme") === "dark";
  updateTheme(isDark ? "light" : "dark");
});
// Add this to the end of your script.js
document.addEventListener("DOMContentLoaded", () => {
  // Check if VanillaTilt exists before running
  if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(
      document.querySelectorAll(".glass-card, .project-card, .bento-item"),
      {
        max: 10, // Maximum tilt rotation (degrees)
        speed: 400, // Speed of the enter/exit transition
        glare: true, // Enables the reflection effect
        "max-glare": 0.3,
      },
    );
  }
});
// Initialize Vanilla Tilt for all project cards
VanillaTilt.init(document.querySelectorAll(".project-card"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
});

// Existing Cursor and Reveal Logic...

// Form Submission Feedback
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Change button text to show success
    const btn = contactForm.querySelector(".submit-btn");
    const originalText = btn.textContent;

    btn.textContent = "Message Sent! ✨";
    btn.style.background = "#10b981"; // Success Green

    contactForm.reset();

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = ""; // Revert to CSS gradient
    }, 3000);
  });
}

// Re-init Tilt for new boxes
VanillaTilt.init(document.querySelectorAll(".glass-card"), {
  max: 10,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
});
