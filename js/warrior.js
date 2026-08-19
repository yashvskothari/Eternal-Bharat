/* =========================================================
   Eternal Bharat — Warrior Detail Page
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
    const id = EB.getQueryId();

    if (!id) {
        window.location.href = "warriors.html";
        return;
    }

    try {
        const warriors = await EB.fetchJSON("data/warriors.json");
        const warrior = warriors.find((w) => w.id === id);

        if (!warrior) {
            EB.setText("warrior-name", "Warrior Not Found");
            return;
        }

        document.title = `${warrior.name} | Eternal Bharat`;

        EB.setText("warrior-name", warrior.name);
        EB.setText("warrior-title", warrior.title);
        EB.setText("warrior-years", warrior.years);
        EB.setText("warrior-description", warrior.description);
        EB.setPortrait(warrior.image, warrior.name);

        if (warrior.kingdomId) {
            EB.setHTML(
                "kingdom",
                `<a href="kingdom.html?id=${warrior.kingdomId}">${warrior.kingdom}</a>`
            );
        } else {
            EB.setText("kingdom", warrior.kingdom);
        }

        EB.setText("capital", warrior.capital);
        EB.setText("dynasty", warrior.dynasty);
        EB.setText("reign", warrior.reign);
        EB.setText("born", warrior.born);
        EB.setText("died", warrior.died);
        EB.setText("biography", warrior.biography);
        EB.setText("kingdom-description", warrior.kingdomDescription);
        EB.setText("legacy", warrior.legacy);

        EB.renderList("campaign-list", warrior.campaigns);
        renderBattles("battle-grid", warrior.battles);
        renderForts("fort-grid", warrior.forts);
        EB.renderTimeline("timeline-container", warrior.timeline);
        EB.renderList("achievements", warrior.achievements);
        EB.renderList("reference-list", warrior.references);

        const index = warriors.findIndex((w) => w.id === id);
        EB.setSiblingNav(
            "previous-warrior",
            "next-warrior",
            warriors[index - 1],
            warriors[index + 1],
            "warrior.html"
        );
    } catch (error) {
        EB.setText("warrior-name", "Unable to load warrior");
    }
});

function renderBattles(id, battles) {
    const el = document.getElementById(id);
    if (!el || !battles) return;

    el.innerHTML = battles
        .map((b) => {
            const title = b.id
                ? `<a href="battle.html?id=${b.id}">${b.name}</a>`
                : b.name;

            return `
                <article>
                    <h3>${title}</h3>
                    <p><strong>Year:</strong> ${b.year}</p>
                    <p>${b.outcome || ""}</p>
                </article>
            `;
        })
        .join("");
}

function renderForts(id, forts) {
    const el = document.getElementById(id);
    if (!el || !forts) return;

    el.innerHTML = forts.map((f) => `<div>${f}</div>`).join("");
}
