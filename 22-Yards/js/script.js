// ========================================
// 22 Yards - Premium Animations Script
// ========================================

// Wait until DOM fully loads
document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // Navbar Scroll Effect
  // ========================================
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.style.background = "rgba(15,15,15,0.95)";
      header.style.boxShadow = "0 8px 25px rgba(0,0,0,0.25)";
    } else {
      header.style.background = "rgba(15,15,15,0.75)";
      header.style.boxShadow = "none";
    }
  });

  // ========================================
  // Hero Entrance Animation
  // ========================================
  const heroContent = document.querySelector(".hero-content");
  const heroCard = document.querySelector(".hero-card");

  if (heroContent) {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(40px)";
  }

  if (heroCard) {
    heroCard.style.opacity = "0";
    heroCard.style.transform = "translateY(40px)";
  }

  setTimeout(() => {
    if (heroContent) {
      heroContent.style.transition = "all 1s ease";
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";
    }

    if (heroCard) {
      heroCard.style.transition = "all 1.2s ease";
      heroCard.style.opacity = "1";
      heroCard.style.transform = "translateY(0)";
    }
  }, 200);

  // ========================================
  // Scroll Reveal Sections
  // ========================================
  const revealElements = document.querySelectorAll(
    ".section-head, .match-box, .player-card, .news-card, .rank-card, .cta-box"
  );

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.88;

    revealElements.forEach((item, index) => {
      const boxTop = item.getBoundingClientRect().top;

      if (boxTop < triggerBottom) {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
        item.style.transition = `all 0.8s ease ${index * 0.05}s`;
      }
    });
  };

  revealElements.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
  });

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // ========================================
  // Live Score Strip Auto Slide Effect
  // ========================================
  const strip = document.querySelector(".strip-items");

  if (strip) {
    let position = 0;

    setInterval(() => {
      position -= 1;

      if (Math.abs(position) > 120) {
        position = 0;
      }

      strip.style.transform = `translateX(${position}px)`;
      strip.style.transition = "0.08s linear";
    }, 40);
  }

  // ========================================
  // Card Hover Glow Effect
  // ========================================
  const cards = document.querySelectorAll(
    ".match-box, .player-card, .news-card, .rank-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 20px 35px rgba(0,0,0,0.25)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "none";
    });
  });

  // ========================================
  // Smooth Button Click Animation
  // ========================================
  const buttons = document.querySelectorAll(".btn, .login-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      this.style.transform = "scale(0.96)";

      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 120);
    });
  });

});
// ========================================
// Mobile Navbar Toggle
// ========================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu on click
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// ========================================
// Dynamic Demo Live Scores
// ========================================

async function loadMatches() {
  try {
    const response = await fetch("data/dummy-data.json");
    const matches = await response.json();

    const matchContainer = document.getElementById("liveMatches");

    matchContainer.innerHTML = "";

    matches.forEach(match => {

      let statusClass = match.status.toLowerCase();

      const card = `
        <div class="match-box">
          <span class="status ${statusClass}">
            ${match.status}
          </span>

          <h3>${match.team1} vs ${match.team2}</h3>

          <p>${match.score}</p>
          <p>${match.venue}</p>

          <a href="#">View Details</a>
        </div>
      `;

      matchContainer.innerHTML += card;
    });

  } catch (error) {
    console.log("Error loading match data:", error);
  }
}

loadMatches();