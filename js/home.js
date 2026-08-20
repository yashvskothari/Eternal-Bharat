/* =========================================================
   Eternal Bharat — Home Page Previews
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
    const kingsGrid = document.querySelector(".kings-grid");
    const kingdomGrid = document.querySelector(".kingdom-preview .kingdom-grid");
    const timelineEl = document.querySelector(".home-timeline .timeline");

    if (!kingsGrid && !kingdomGrid && !timelineEl) return;

    try {
        const [warriors, kingdoms, events] = await Promise.all([
            EB.fetchJSON("data/warriors.json"),
            EB.fetchJSON("data/kingdoms.json"),
            EB.fetchJSON("data/timeline.json")
        ]);

        if (kingsGrid) {
            const featured = warriors.filter((w) => w.featured).slice(0, 4);
            kingsGrid.innerHTML = featured
                .map(
                    (w) => `
                <div class="king-card">
                    <div class="king-card-content">
                        <span class="king-era">${w.years}</span>
                        <h3>${w.name}</h3>
                        <p>${w.description}</p>
                        <a href="warrior.html?id=${w.id}" class="king-link">Explore Legacy →</a>
                    </div>
                </div>
            `
                )
                .join("");
        }

        if (kingdomGrid) {
            const previewIds = ["mewar", "maratha", "chola", "maurya", "sikh"];
            const preview = previewIds
                .map((id) => kingdoms.find((k) => k.id === id))
                .filter(Boolean);

            kingdomGrid.innerHTML = preview
                .map(
                    (k) => `
                <a class="kingdom-card" href="kingdom.html?id=${k.id}">
                    <div class="kingdom-card-image">
                        <img src="${k.mapImage || k.image}" alt="${k.name} map" loading="lazy">
                    </div>
                    <div class="kingdom-card-content">
                        <h3>${k.name}</h3>
                    </div>
                </a>
            `
                )
                .join("");
        }

        if (timelineEl) {
            timelineEl.innerHTML = events
                .slice(0, 4)
                .map(
                    (e) => `
                <div class="timeline-item">
                    <span>${e.year}</span>
                    <p>${e.title}</p>
                </div>
            `
                )
                .join("");
        }
    } catch (error) {
        if (kingsGrid) {
            kingsGrid.innerHTML = '<p class="no-results">Unable to load highlights.</p>';
        }
    }
});
