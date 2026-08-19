/* =========================================================
   Eternal Bharat — Shared Utilities
========================================================= */

const EB = {
    CDN: "https://cdn.jsdelivr.net/gh/yashvskothari/Eternal-Bharat-assets@main/assets/images",

    async fetchJSON(path) {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`Failed to load ${path}`);
        }

        return response.json();
    },

    getPageName() {
        return window.location.pathname.split("/").pop() || "index.html";
    },

    setActiveNav() {
        const page = this.getPageName();
        const aliases = {
            "warrior.html": "warriors.html",
            "kingdom.html": "kingdoms.html",
            "battle.html": "battles.html"
        };
        const current = aliases[page] || page;

        document.querySelectorAll(".nav-links a").forEach((link) => {
            const href = link.getAttribute("href");

            if (href === current) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    },

    initMobileNav() {
        const toggle = document.querySelector(".menu-toggle");
        const navLinks = document.querySelector(".nav-links");

        if (!toggle || !navLinks) return;

        toggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    },

    initScrollReveal(selector = ".card") {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            { threshold: 0.12 }
        );

        document.querySelectorAll(selector).forEach((el) => observer.observe(el));
    },

    filterByQuery(items, query, fields) {
        const value = query.trim().toLowerCase();

        if (!value) return items;

        return items.filter((item) =>
            fields.some((field) =>
                String(item[field] || "").toLowerCase().includes(value)
            )
        );
    },

    getQueryId() {
        return new URLSearchParams(window.location.search).get("id");
    },

    setText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value || "";
    },

    setHTML(id, value) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = value || "";
    },

    setPortrait(src, alt) {
        const portrait = document.getElementById("warrior-portrait");
        if (!portrait) return;
        portrait.src = src || "";
        portrait.alt = alt || "";
    },

    renderList(id, items) {
        const el = document.getElementById(id);
        if (!el || !items) return;
        el.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
    },

    renderTimeline(id, events) {
        const el = document.getElementById(id);
        if (!el || !events) return;

        el.classList.add("story-timeline");

        el.innerHTML = events
            .map(
                (e) => `
            <article class="story-node">
                <span class="story-year">${e.year}</span>
                <div class="story-body">
                    <h3>${e.event || e.title || ""}</h3>
                    ${e.description ? `<p>${e.description}</p>` : ""}
                </div>
            </article>
        `
            )
            .join("");
    },

    setSiblingNav(prevId, nextId, prev, next, page) {
        const setLink = (elementId, item, label) => {
            const el = document.getElementById(elementId);
            if (!el) return;

            if (item) {
                el.href = `${page}?id=${item.id}`;
                el.textContent = label.replace("%s", item.name);
                el.style.visibility = "visible";
            } else {
                el.style.visibility = "hidden";
            }
        };

        setLink(prevId, prev, "← %s");
        setLink(nextId, next, "%s →");
    }
};
