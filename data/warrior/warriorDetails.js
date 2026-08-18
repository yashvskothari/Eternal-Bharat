document.addEventListener("DOMContentLoaded", () => {
  // 1. Inject Only Scroll Progress Bar & Back-To-Top Button
  const uiElements = `
    <div id="scroll-progress-container">
      <div id="scroll-progress-bar"></div>
    </div>
    <button id="top-btn" title="Back to Top">↑</button>
  `;
  document.body.insertAdjacentHTML("beforeend", uiElements);

  // 2. Select Elements
  const progressBar = document.getElementById("scroll-progress-bar");
  const backToTopBtn = document.getElementById("top-btn");

  // 3. Scroll Indicator & Back-to-Top Visibility Toggle
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight > 0 && progressBar) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  });

  // 4. Back to Top Action
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});