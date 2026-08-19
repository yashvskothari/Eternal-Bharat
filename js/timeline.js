/* =========================================================
   Eternal Bharat — Timeline Page
========================================================= */

const TIMELINE_ERAS = [
    { id: "ancient", label: "Ancient", range: "to 600 CE" },
    { id: "early-medieval", label: "Early Medieval", range: "600 – 1200" },
    { id: "medieval", label: "Medieval", range: "1200 – 1526" },
    { id: "early-modern", label: "Early Modern", range: "1526 – 1800" },
    { id: "modern", label: "Modern", range: "1800 onwards" }
];

const CATEGORY_LABELS = {
    rulers: "Rulers",
    battles: "Battles",
    kingdoms: "Kingdoms",
    milestones: "Milestones"
};

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("history-timeline");
    const searchInput = document.getElementById("timeline-search");
    const countEl = document.getElementById("timeline-count");

    if (!container) return;

    let events = [];
    let activeCategory = "all";
    let activeEra = "all";

    try {
        events = await EB.fetchJSON("data/timeline.json");
        events.sort((a, b) => (a.sort || 0) - (b.sort || 0));
        renderChronicle(container, events, countEl);
    } catch (error) {
        container.innerHTML = '<p class="no-results">Unable to load timeline.</p>';
    }

    function applyFilters() {
        const query = searchInput ? searchInput.value : "";
        let filtered = EB.filterByQuery(events, query, [
            "year",
            "title",
            "description",
            "category",
            "era"
        ]);

        if (activeCategory !== "all") {
            filtered = filtered.filter((event) => event.category === activeCategory);
        }

        if (activeEra !== "all") {
            filtered = filtered.filter((event) => event.era === activeEra);
        }

        renderChronicle(container, filtered, countEl);
    }

    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }

    document.querySelectorAll("[data-category]").forEach((button) => {
        button.addEventListener("click", () => {
            activeCategory = button.dataset.category || "all";
            setActive("[data-category]", button);
            applyFilters();
        });
    });

    document.querySelectorAll("[data-era]").forEach((button) => {
        button.addEventListener("click", () => {
            activeEra = button.dataset.era || "all";
            setActive("[data-era]", button);
            applyFilters();
        });
    });
});

function setActive(selector, current) {
    document.querySelectorAll(selector).forEach((item) => item.classList.remove("is-active"));
    current.classList.add("is-active");
}

function renderChronicle(container, events, countEl) {
    container.innerHTML = "";

    if (countEl) {
        countEl.textContent = events.length
            ? `${events.length} event${events.length === 1 ? "" : "s"} across the chronicle`
            : "No events match these filters.";
    }

    if (!events.length) {
        container.innerHTML = '<p class="no-results">No events found.</p>';
        return;
    }

    let sideIndex = 0;

    TIMELINE_ERAS.forEach((era) => {
        const eraEvents = events.filter((event) => event.era === era.id);

        if (!eraEvents.length) return;

        const header = document.createElement("header");
        header.className = "era-header";
        header.innerHTML = `
            <span>${era.label}</span>
            <small>${era.range}</small>
        `;
        container.appendChild(header);

        eraEvents.forEach((event) => {
            const item = document.createElement("article");
            const side = sideIndex % 2 === 0 ? "is-left" : "is-right";
            item.className = `timeline-item ${side}`;
            item.innerHTML = timelineCardHTML(event);
            container.appendChild(item);
            sideIndex += 1;
        });
    });

    EB.initScrollReveal(".chronicle .timeline-item");
}

function timelineCardHTML(event) {
    const placeholder = event.placeholder
        ? '<span class="tl-placeholder">Placeholder</span>'
        : "";

    const category = CATEGORY_LABELS[event.category] || event.category;

    const links = [];
    if (event.warriorId) {
        links.push(`<a href="warrior.html?id=${event.warriorId}">Warrior</a>`);
    }
    if (event.kingdomId) {
        links.push(`<a href="kingdom.html?id=${event.kingdomId}">Kingdom</a>`);
    }
    if (event.battleId) {
        links.push(`<a href="battle.html?id=${event.battleId}">Battle</a>`);
    }

    return `
        <div class="tl-meta">
            <span class="tl-cat tl-cat-${event.category}">${category}</span>
            ${placeholder}
        </div>
        <h3>${event.year}</h3>
        <h4>${event.title}</h4>
        <p>${event.description}</p>
        ${links.length ? `<div class="tl-links">${links.join("")}</div>` : ""}
    `;
}
