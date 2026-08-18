document.addEventListener("DOMContentLoaded", () => {
  // 1. Inject Scroll Progress Bar & Floating Buttons Dynamically
  const uiElements = `
    <div id="scroll-progress-container">
      <div id="scroll-progress-bar"></div>
    </div>
    <button id="back-home-btn" title="Back to Home">← Home</button>
    <button id="top-btn" title="Back to Top">↑</button>
  `;
  document.body.insertAdjacentHTML("beforeend", uiElements);

  // 2. Select Elements
  const progressBar = document.getElementById("scroll-progress-bar");
  const backToTopBtn = document.getElementById("top-btn");
  const backHomeBtn = document.getElementById("back-home-btn");

  // 3. Scroll Indicator & Back-to-Top Visibility
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Update Progress Bar Width
    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Toggle Back-to-Top Button Visibility
    if (scrollTop > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  // 4. Back to Top Click Action
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // 5. Back to Home Click Action
  backHomeBtn.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
});
