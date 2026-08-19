/* =========================================================
   Eternal Bharat — Warriors Gallery Page
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("warriors-grid");
    const searchInput = document.getElementById("warriors-search");

    if (!grid) return;

    let warriors = await initWarriorCards("warriors-grid");

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const filtered = EB.filterByQuery(warriors, searchInput.value, [
                "name",
                "description",
                "kingdom"
            ]);

            renderWarriorCards(grid, filtered);
        });
    }
});
