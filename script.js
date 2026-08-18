// ===============================
// Generate Warrior Cards
// ===============================

const cardsContainer = document.getElementById("cards");

warriors.forEach((warrior) => {
  const card = document.createElement("div");

  card.className = "card";

  card.innerHTML = `
        <div class="card-image">
            <img
                src="${warrior.image}"
                alt="${warrior.name}"
                loading="lazy"
            >
        </div>

        <div class="card-content">

            <h3>${warrior.name}</h3>

            <p class="years">
                ${warrior.years}
            </p>

            <p class="description">
                ${warrior.description}
            </p>

            <a
                class="card-btn"
                href="${warrior.wiki}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Read on Wikipedia →
            </a>

        </div>
    `;

  cardsContainer.appendChild(card);
});

// ===============================
// Scroll Reveal Animation
// ===============================

const observer = new IntersectionObserver(

  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

      }

    });

  },

  {
    threshold: 0.15,
  }
);

document.querySelectorAll(".card").forEach((card) => {
  observer.observe(card);
});

// ===============================
// Navbar Scroll Effect
// ===============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {

    navbar.style.background = "rgba(0,0,0,.85)";

    navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,.5)";

  } else {

    navbar.style.background = "rgba(0,0,0,.45)";

    navbar.style.boxShadow = "none";

  }

});

// ===============================
// Back To Top Button
// ===============================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

  if (window.scrollY > 500) {

    topBtn.classList.add("show");

  } else {

    topBtn.classList.remove("show");

  }

});

topBtn.addEventListener("click", () => {

  window.scrollTo({

    top: 0,

    behavior: "smooth",

  });

});

// ===============================
// Smooth Scroll for Navbar Links
// ===============================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

  anchor.addEventListener("click", function (e) {

    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {

      target.scrollIntoView({

        behavior: "smooth",

      });

    }

  });

});

// ===============================
// Image Fade-In
// ===============================

document.querySelectorAll(".card-image img").forEach((img) => {

  img.style.opacity = "0";

  img.style.transition = "opacity .6s ease";

  img.onload = () => {

    img.style.opacity = "1";

  };

});