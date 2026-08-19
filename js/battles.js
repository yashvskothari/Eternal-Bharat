/* =========================================================
   Eternal Bharat — Battles Page
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("battle-grid");
    const timeline = document.getElementById("battle-timeline");
    const searchInput = document.getElementById("battle-search");

    if (!grid) return;

    let battles = [];

    try {
        battles = await EB.fetchJSON("data/battles.json");
        battles.sort(compareBattleYear);
        renderBattles(grid, battles);
        renderBattleTimeline(timeline, battles);
    } catch (error) {
        grid.innerHTML = '<p class="no-results">Unable to load battles.</p>';
    }

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const filtered = EB.filterByQuery(battles, searchInput.value, [
                "name",
                "location",
                "commanders",
                "year"
            ]);

            renderBattles(grid, filtered);
            renderBattleTimeline(timeline, filtered);
        });
    }
});

function compareBattleYear(a, b) {
    return parseInt(a.year, 10) - parseInt(b.year, 10);
}

function renderBattles(container, battles) {
    container.innerHTML = "";

    if (!battles.length) {
        container.innerHTML = '<p class="no-results">No battles found.</p>';
        return;
    }

    battles.forEach((battle) => {
        const card = document.createElement("article");
        card.className = "card";

        const imageHTML = battle.image
            ? `<img src="${battle.image}" alt="${battle.name}">`
            : "";

        card.innerHTML = `
            ${imageHTML}
            <div class="card-content">
                <h3>${battle.name}</h3>
                <p><strong>Year:</strong> ${battle.year}</p>
                <p><strong>Location:</strong> ${battle.location}</p>
                <p><strong>Commanders:</strong> ${battle.commanders}</p>
                <p class="description">${battle.description}</p>
                <a href="battle.html?id=${battle.id}">Explore →</a>
            </div>
        `;

        container.appendChild(card);
    });

    EB.initScrollReveal("#battle-grid .card");
}

function renderBattleTimeline(container, battles) {
    if (!container) return;

    container.innerHTML = "";

    if (!battles.length) {
        container.innerHTML = '<p class="no-results">No battles found.</p>';
        return;
    }

    battles.forEach((battle) => {
        const item = document.createElement("div");
        item.className = "timeline-item";
        item.innerHTML = `
            <strong>${battle.year}</strong>
            <p><a href="battle.html?id=${battle.id}">${battle.name}</a></p>
        `;
        container.appendChild(item);
    });
}
