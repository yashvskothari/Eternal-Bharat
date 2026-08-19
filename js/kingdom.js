/* =========================================================
   Eternal Bharat — Kingdom Detail Page
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
    const id = EB.getQueryId();

    if (!id) {
        window.location.href = "kingdoms.html";
        return;
    }

    try {
        const [kingdoms, warriors] = await Promise.all([
            EB.fetchJSON("data/kingdoms.json"),
            EB.fetchJSON("data/warriors.json")
        ]);

        const kingdom = kingdoms.find((k) => k.id === id);

        if (!kingdom) {
            EB.setText("warrior-name", "Kingdom Not Found");
            return;
        }

        document.title = `${kingdom.name} | Eternal Bharat`;

        EB.setText("warrior-name", kingdom.name);
        EB.setText("warrior-title", kingdom.dynasty);
        EB.setText("warrior-years", kingdom.period);
        EB.setText("warrior-description", kingdom.description);
        EB.setPortrait(kingdom.image, kingdom.name);

        EB.setText("capital", kingdom.capital);
        EB.setText("dynasty", kingdom.dynasty);
        EB.setText("period", kingdom.period);
        EB.setText("region", kingdom.region);
        EB.setText("founded", kingdom.founded);
        EB.setText("overview", kingdom.overview);
        EB.setText("legacy", kingdom.legacy);

        renderLinkedBattles(kingdom.battles);
        renderForts(kingdom.forts);
        renderRulers(kingdom.rulers, warriors);
        EB.renderTimeline("timeline-container", kingdom.timeline);
        EB.renderList("achievements", kingdom.achievements);
        EB.renderList("reference-list", kingdom.references);

        const index = kingdoms.findIndex((k) => k.id === id);
        EB.setSiblingNav(
            "previous-warrior",
            "next-warrior",
            kingdoms[index - 1],
            kingdoms[index + 1],
            "kingdom.html"
        );
    } catch (error) {
        EB.setText("warrior-name", "Unable to load kingdom");
    }
});

function renderRulers(ids, warriors) {
    const el = document.getElementById("ruler-grid");
    if (!el || !ids) return;

    const rulers = ids
        .map((rid) => warriors.find((w) => w.id === rid))
        .filter(Boolean);

    if (!rulers.length) {
        el.innerHTML = "<p>No linked rulers yet.</p>";
        return;
    }

    el.innerHTML = rulers
        .map(
            (w) => `
        <article>
            <h3><a href="warrior.html?id=${w.id}">${w.name}</a></h3>
            <p>${w.title}</p>
        </article>
    `
        )
        .join("");
}

function renderLinkedBattles(battles) {
    const el = document.getElementById("battle-grid");
    if (!el || !battles) return;

    el.innerHTML = battles
        .map((b) => {
            const title = b.id
                ? `<a href="battle.html?id=${b.id}">${b.name}</a>`
                : b.name;

            return `
                <article>
                    <h3>${title}</h3>
                    <p><strong>Year:</strong> ${b.year || ""}</p>
                </article>
            `;
        })
        .join("");
}

function renderForts(forts) {
    const el = document.getElementById("fort-grid");
    if (!el || !forts) return;
    el.innerHTML = forts.map((f) => `<div>${f}</div>`).join("");
}
