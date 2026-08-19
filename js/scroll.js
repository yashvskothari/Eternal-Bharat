/* =========================================================
   Eternal Bharat — Scroll & Navigation Effects
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const progressBar = document.getElementById("progress-bar");
    const topBtn = document.getElementById("top-btn");

    /* Navbar scroll state */
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        });
    }

    /* Progress bar */
    if (progressBar) {
        window.addEventListener("scroll", () => {
            const scroll = document.documentElement.scrollTop;
            const height =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            progressBar.style.width = (scroll / height) * 100 + "%";
        });
    }

    /* Back to top */
    if (topBtn) {
        window.addEventListener("scroll", () => {
            topBtn.classList.toggle("show", window.scrollY > 500);
        });

        topBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* Smooth scroll for anchor links */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            const target = document.querySelector(anchor.getAttribute("href"));

            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
