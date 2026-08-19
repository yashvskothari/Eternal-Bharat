/* =========================================================
   Eternal Bharat — Kingdoms Page
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("kingdom-grid");
    const searchInput = document.getElementById("kingdom-search");

    if (!grid) return;

    let kingdoms = [];

    try {
        kingdoms = await EB.fetchJSON("data/kingdoms.json");
        renderKingdoms(grid, kingdoms);
        renderKingdomEras(kingdoms);
    } catch (error) {
        grid.innerHTML = '<p class="no-results">Unable to load kingdoms.</p>';
    }

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const filtered = EB.filterByQuery(kingdoms, searchInput.value, [
                "name",
                "capital",
                "dynasty"
            ]);

            renderKingdoms(grid, filtered);
        });
    }
});

function renderKingdoms(container, kingdoms) {
    container.innerHTML = "";

    if (!kingdoms.length) {
        container.innerHTML = '<p class="no-results">No kingdoms found.</p>';
        return;
    }

    kingdoms.forEach((kingdom) => {
        const card = document.createElement("article");
        card.className = "card";

        const imageHTML = kingdom.image
            ? `<img src="${kingdom.image}" alt="${kingdom.name}">`
            : "";

        card.innerHTML = `
            ${imageHTML}
            <div class="card-content">
                <h3>${kingdom.name}</h3>
                <p>Capital: ${kingdom.capital}</p>
                <p>Dynasty: ${kingdom.dynasty}</p>
                <p>Period: ${kingdom.period}</p>
                <p class="description">${kingdom.description}</p>
                <a href="kingdom.html?id=${kingdom.id}">Explore →</a>
            </div>
        `;

        container.appendChild(card);
    });

    EB.initScrollReveal("#kingdom-grid .card");
}

function renderKingdomEras(kingdoms) {
    const container = document.getElementById("kingdom-era-timeline");
    if (!container) return;

    container.innerHTML = kingdoms
        .map(
            (kingdom) => `
        <div class="timeline-item">
            <strong>${kingdom.founded}</strong>
            <p><a href="kingdom.html?id=${kingdom.id}">${kingdom.name}</a></p>
        </div>
    `
        )
        .join("");
}
