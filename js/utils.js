/* =========================================================
   Eternal Bharat — Shared Utilities
========================================================= */

const EB = {
    CDN: "https://cdn.jsdelivr.net/gh/yashvskothari/Eternal-Bharat-assets@main/assets/images",

    // Cache of in-flight/loaded data/*.js fallback scripts, keyed by
    // dataset name (e.g. "warriors"), so we only inject each once.
    _fallbackScriptPromises: {},

    // Dynamically injects data/<key>.js (which sets window.EB_DATA.<key>).
    // Script tags aren't subject to the same CORS restriction fetch() is,
    // so this works even when the page is opened directly via file://.
    _loadFallbackScript(key) {
        if (window.EB_DATA && window.EB_DATA[key]) {
            return Promise.resolve(window.EB_DATA[key]);
        }

        if (this._fallbackScriptPromises[key]) {
            return this._fallbackScriptPromises[key];
        }

        const promise = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = `data/${key}.js`;
            script.onload = () => {
                if (window.EB_DATA && window.EB_DATA[key]) {
                    resolve(window.EB_DATA[key]);
                } else {
                    reject(new Error(`data/${key}.js did not provide EB_DATA.${key}`));
                }
            };
            script.onerror = () => reject(new Error(`Could not load data/${key}.js`));
            document.head.appendChild(script);
        });

        this._fallbackScriptPromises[key] = promise;
        return promise;
    },

    async fetchJSON(path) {
        // If this page already preloaded the matching data/*.js file
        // (window.EB_DATA), use it directly.
        const key = path.split("/").pop().replace(".json", "");

        if (window.EB_DATA && window.EB_DATA[key]) {
            return window.EB_DATA[key];
        }

        try {
            const response = await fetch(path);

            if (!response.ok) {
                throw new Error(`Failed to load ${path}`);
            }

            return await response.json();
        } catch (error) {
            // fetch() of local files is blocked by the browser when a
            // page is opened directly (file://) instead of through a
            // server. Fall back to the pre-built data/<key>.js file,
            // which loads fine via a plain <script> tag either way.
            return this._loadFallbackScript(key);
        }
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
