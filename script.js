// ===============================
// Generate Warrior Cards
// ===============================

const cardsContainer = document.getElementById("cards");
function renderCards(list) {
  cardsContainer.innerHTML = "";

  list.forEach((warrior) => {
    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
            <div class="card-image">
                <img
                    src="${warrior.image}"
                    alt="${warrior.name}"
                    loading="lazy">
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
                    href="./data/warrior/pages/${warrior.page}"
                    target="_blank">

                    Know More →

                </a>

            </div>
        `;

    cardsContainer.appendChild(card);
  });
  
}
renderCards(warriors);

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
  },
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

// ===============================
// Loader
// ===============================

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1200);
});

// ===============================
// Cursor Glow
// ===============================

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";

  glow.style.top = e.clientY + "px";
});

// ===============================
// Hero Parallax
// ===============================

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  hero.style.backgroundPositionY = window.scrollY * 0.5 + "px";
});

// ===============================
// Progress Bar
// ===============================

window.addEventListener("scroll", () => {
  const scroll = document.documentElement.scrollTop;

  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scroll / height) * 100;

  document.getElementById("progress-bar").style.width = progress + "%";
});

const search = document.getElementById("search");

search.addEventListener("input", () => {

    const value = search.value.toLowerCase();

    const filtered = warriors.filter((warrior) => {

        return warrior.name
            .toLowerCase()
            .includes(value);

    });

    renderCards(filtered);

});