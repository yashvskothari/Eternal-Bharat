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
        EB.setPortrait(kingdom.mapImage, kingdom.name);

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
        renderKingdomChronicle("timeline-container", kingdom);
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

/* =========================================================
   Kingdom Timeline — rendered in the same rich "chronicle"
   style used on the main Timeline page (timeline.html), but
   scoped to this kingdom's own events.
========================================================= */

function renderKingdomChronicle(id, kingdom) {
    const el = document.getElementById(id);
    if (!el || !kingdom.timeline || !kingdom.timeline.length) return;

    el.classList.remove("story-timeline");
    el.classList.add("chronicle");

    const header = document.createElement("header");
    header.className = "era-header";
    header.innerHTML = `
        <span>${kingdom.dynasty || kingdom.name}</span>
        <small>${kingdom.period || ""}</small>
    `;

    const items = kingdom.timeline
        .map((event, index) => {
            const side = index % 2 === 0 ? "is-left" : "is-right";
            return `
                <article class="timeline-item ${side}">
                    <div class="timeline-card">
                        <div class="tl-meta">
                            <span class="tl-cat tl-cat-kingdoms">Kingdom</span>
                        </div>
                        <h3>${event.year}</h3>
                        <h4>${event.event || event.title || ""}</h4>
                        ${event.description ? `<p>${event.description}</p>` : ""}
                        <div class="tl-bottom"><span></span></div>
                    </div>
                </article>
            `;
        })
        .join("");

    el.innerHTML = "";
    el.appendChild(header);
    el.insertAdjacentHTML("beforeend", items);

    EB.initScrollReveal("#timeline-container .timeline-item");
}

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

    el.innerHTML = forts
        .map((f) => {
            // Support both the older plain-string format and the
            // richer { name, image, description } object format.
            if (typeof f === "string") {
                return `
                    <article class="fort-card">
                        <div class="fort-card-body">
                            <h3>${f}</h3>
                        </div>
                    </article>
                `;
            }

            return `
                <article class="fort-card">
                    <div class="fort-card-image">
                        <img src="${f.image}" alt="${f.name}" loading="lazy">
                    </div>
                    <div class="fort-card-body">
                        <h3>${f.name}</h3>
                        ${f.description ? `<p>${f.description}</p>` : ""}
                    </div>
                </article>
            `;
        })
        .join("");
}
