/* =========================================================
   Eternal Bharat — Warrior Cards
========================================================= */

function renderWarriorCards(container, warriors) {
    if (!container) return;

    container.innerHTML = "";

    if (!warriors.length) {
        container.innerHTML = '<p class="no-results">No warriors found.</p>';
        return;
    }

    warriors.forEach((warrior) => {
        const card = document.createElement("article");
        card.className = "card";

        card.innerHTML = `
            <div class="card-image">
                <img src="${warrior.image}" alt="${warrior.name}" loading="lazy">
            </div>
            <div class="card-content">
                <h3>${warrior.name}</h3>
                <span class="years">${warrior.years}</span>
                <p class="description">${warrior.description}</p>
                <a class="card-btn" href="warrior.html?id=${warrior.id}">Know More →</a>
            </div>
        `;

        container.appendChild(card);
    });

    EB.initScrollReveal(".cards-grid .card");
}

async function initWarriorCards(containerId) {
    const container = document.getElementById(containerId);

    if (!container) return;

    try {
        const warriors = await EB.fetchJSON("data/warriors.json");
        renderWarriorCards(container, warriors);
        return warriors;
    } catch (error) {
        container.innerHTML =
            '<p class="no-results">Unable to load warriors. Please try again later.</p>';
        return [];
    }
}
