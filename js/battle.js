/* =========================================================
   Eternal Bharat — Battle Detail Page
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
    const id = EB.getQueryId();

    if (!id) {
        window.location.href = "battles.html";
        return;
    }

    try {
        const [battles, warriors] = await Promise.all([
            EB.fetchJSON("data/battles.json"),
            EB.fetchJSON("data/warriors.json")
        ]);

        const battle = battles.find((b) => b.id === id);

        if (!battle) {
            EB.setText("warrior-name", "Battle Not Found");
            return;
        }

        document.title = `${battle.name} | Eternal Bharat`;

        EB.setText("warrior-name", battle.name);
        EB.setText("warrior-title", battle.location);
        EB.setText("warrior-years", battle.year);
        EB.setText("warrior-description", battle.description);
        EB.setPortrait(battle.image, battle.name);

        EB.setText("year", battle.year);
        EB.setText("location", battle.location);
        EB.setText("result", battle.result);
        EB.setText("commanders", battle.commanders);
        EB.setText("significance", battle.significance);
        EB.renderList("reference-list", battle.references);

        if (battle.kingdomId) {
            EB.setHTML(
                "kingdom",
                `<a href="kingdom.html?id=${battle.kingdomId}">${battle.kingdom}</a>`
            );
        } else {
            EB.setText("kingdom", battle.kingdom || "—");
        }

        const linked = (battle.warriors || [])
            .map((wid) => warriors.find((w) => w.id === wid))
            .filter(Boolean);

        const commanderGrid = document.getElementById("commander-grid");
        if (commanderGrid) {
            commanderGrid.innerHTML = linked.length
                ? linked
                      .map(
                          (w) => `
                    <article>
                        <h3><a href="warrior.html?id=${w.id}">${w.name}</a></h3>
                        <p>${w.title}</p>
                    </article>
                `
                      )
                      .join("")
                : "<p>No linked warrior pages yet.</p>";
        }

        const index = battles.findIndex((b) => b.id === id);
        EB.setSiblingNav(
            "previous-warrior",
            "next-warrior",
            battles[index - 1],
            battles[index + 1],
            "battle.html"
        );
    } catch (error) {
        EB.setText("warrior-name", "Unable to load battle");
    }
});
