/* =========================================================
   Eternal Bharat — Cursor Glow
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const glow = document.querySelector(".cursor-glow");

    if (!glow || window.matchMedia("(max-width: 900px)").matches) return;

    document.addEventListener("mousemove", (e) => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    });
});
