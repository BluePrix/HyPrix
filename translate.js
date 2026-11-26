/* =========================================
   Translate Page
   ========================================= */

function translatePage(language) {
    const t = translations[language];

    if (!t) return;

    document.documentElement.lang = language;

    // Navigation
    document.querySelectorAll("[data-nav]").forEach(link => {
        const key = link.dataset.nav;

        if (t[key]) {
            link.textContent = t[key];
        }
    });

    // Standard translated text
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;

        if (t[key]) {
            element.textContent = t[key];
        }
    });

    // Home page heading
    const homeHeading = document.querySelector(".home-hero h1");

    if (homeHeading) {
        homeHeading.innerHTML =
            `${t.hero1}<br>${t.hero2}<br><span>${t.hero3}</span>`;
    }

    // About page heading
    const aboutHeading = document.querySelector("[data-i18n-html='aboutHeading']");

    if (aboutHeading) {
        aboutHeading.innerHTML =
            `${t.aboutTitle}<br><span>${t.aboutTitle2}</span>`;
    }
}


/* =========================================
   Language Button
   ========================================= */

function createLanguageButton() {
    const header = document.querySelector(".site-header");

    if (!header) return;

    const container = document.createElement("div");
    container.id = "language-container";

    container.innerHTML = `
        <button id="language-button" type="button">
            🌐 Language
        </button>

        <div id="language-menu">
            <button data-language="en">🇬🇧 English</button>
            <button data-language="es">🇪🇸 Español</button>
            <button data-language="fr">🇫🇷 Français</button>
            <button data-language="de">🇩🇪 Deutsch</button>
            <button data-language="pt">🇵🇹 Português</button>
            <button data-language="it">🇮🇹 Italiano</button>
            <button data-language="ja">🇯🇵 日本語</button>
            <button data-language="ko">🇰🇷 한국어</button>
            <button data-language="zh">🇨🇳 中文</button>
            <button data-language="ru">🇷🇺 Русский</button>
        </div>
    `;

    header.appendChild(container);

    const button = document.getElementById("language-button");
    const menu = document.getElementById("language-menu");

    button.addEventListener("click", () => {
        menu.classList.toggle("open");
    });

    menu.querySelectorAll("button").forEach(item => {
        item.addEventListener("click", () => {
            const language = item.dataset.language;

            localStorage.setItem("hyprix-language", language);

            translatePage(language);

            menu.classList.remove("open");
        });
    });

    document.addEventListener("click", event => {
        if (!container.contains(event.target)) {
            menu.classList.remove("open");
        }
    });
}


/* =========================================
   Active Navigation
   ========================================= */

function setActivePage() {
    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase() || "index.html";

    document.querySelectorAll("[data-nav]").forEach(link => {
        const page = link.getAttribute("href").toLowerCase();

        const isActive =
            page === currentPage ||
            (currentPage === "" && page === "index.html");

        link.classList.toggle("active", isActive);
    });
}


/* =========================================
   Start
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    createLanguageButton();

    translatePage(detectLanguage());

    setActivePage();
});
