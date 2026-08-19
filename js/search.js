/* =========================================================
   Eternal Bharat — Home Search
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
    const searchInput = document.getElementById("search");
    const cardsContainer = document.getElementById("cards");

    if (!searchInput || !cardsContainer) return;

    let allWarriors = await initWarriorCards("cards");

    searchInput.addEventListener("input", () => {
        const filtered = EB.filterByQuery(allWarriors, searchInput.value, [
            "name",
            "description",
            "kingdom"
        ]);

        renderWarriorCards(cardsContainer, filtered);
    });
});
