// === @sigdevel audit prototype ===
// Single-file React app that mocks all 5 pages with improved IA, readability,
// mobile nav, and scannable content blocks. Toggle pages via the in-page router.

const {
  useState,
  useEffect,
  useMemo,
  useRef
} = React;

// ---------- Tweakable defaults (editable via Tweaks panel) ----------
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "typography": "serif-sans",
  "decor": 40,
  "density": "comfortable",
  "palette": "cream",
  "lang": "en"
} /*EDITMODE-END*/;

// ---------- Data ----------
const BDU_ENTRIES = [{
  id: "2022-01054",
  year: 2022,
  project: "GPAC",
  severity: "high"
}, {
  id: "2023-00633",
  year: 2023,
  project: "GPAC",
  severity: "high"
}, {
  id: "2023-00391",
  year: 2023,
  project: "GPAC",
  severity: "high"
}, {
  id: "2023-00622",
  year: 2023,
  project: "GPAC",
  severity: "med"
}, {
  id: "2023-00634",
  year: 2023,
  project: "GPAC",
  severity: "med"
}, {
  id: "2023-01808",
  year: 2023,
  project: "GPAC",
  severity: "med"
}, {
  id: "2025-03992",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-03990",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-03139",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-03993",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-05039",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-05041",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-05040",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08051",
  year: 2025,
  project: "GPAC",
  severity: "med"
}, {
  id: "2025-08045",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08047",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08048",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08049",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08050",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08581",
  year: 2025,
  project: "GPAC",
  severity: "med"
}, {
  id: "2025-08580",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08566",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08562",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08567",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08563",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08565",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08564",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08613",
  year: 2025,
  project: "GPAC",
  severity: "med"
}, {
  id: "2025-08611",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08612",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08614",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08615",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08616",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-08617",
  year: 2025,
  project: "GPAC",
  severity: "low"
}, {
  id: "2025-09346",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-09878",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-09882",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-09883",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-09884",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-09885",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-09886",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-10075",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-10076",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-10077",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-10078",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-10079",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-10080",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-10081",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-10082",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-10083",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-10084",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-10085",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-10086",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-10087",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-10088",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}, {
  id: "2025-10089",
  year: 2025,
  project: "JPEG XL",
  severity: "low"
}];
const CVE_ENTRIES = [{
  id: "CVE-2023-0645",
  project: "GPAC",
  year: 2023
}];
const OSS_PROJECTS = [{
  name: "AFL++",
  desc: {
    en: "fuzzing tooling & infra",
    ru: "инструменты и инфраструктура фаззинга"
  },
  url: "https://github.com/AFLplusplus/AFLplusplus"
}, {
  name: "Node.js",
  desc: {
    en: "security hardening / bug reports",
    ru: "хардненинг и репорты"
  },
  url: "https://github.com/nodejs/node"
}, {
  name: "CPython",
  desc: {
    en: "issue reports & test coverage",
    ru: "репорты и покрытие тестами"
  },
  url: "https://github.com/python/cpython"
}, {
  name: "Cppcheck",
  desc: {
    en: "static analysis improvements",
    ru: "улучшения статического анализа"
  },
  url: "https://github.com/danmar/cppcheck"
}, {
  name: "GPAC",
  desc: {
    en: "media pipeline issues",
    ru: "дефекты медиапайплайна"
  },
  url: "https://github.com/gpac/gpac"
}, {
  name: "JPEG XL",
  desc: {
    en: "codec testing & bugs",
    ru: "тестирование кодека, баги"
  },
  url: "https://github.com/libjxl/libjxl"
}];
const REVIEWS = [{
  slug: "gpac-bdu-2025",
  title: {
    en: "GPAC / MP4Box vulnerabilities — BDU 2025 rollup",
    ru: "Обзор уязвимостей GPAC / MP4Box по выгрузке БДУ ФСТЭК 2025"
  },
  date: "2025-11",
  readMin: 12,
  project: "GPAC",
  tags: ["fuzzing", "mp4box", "BDU", "media"],
  abstract: {
    en: "A rollup of GPAC/MP4Box defects disclosed via the national vulnerability database (BDU) in 2025: classes of issues, reproducers, patches, and what structure-aware mutators caught",
    ru: "Обзор дефектов GPAC/MP4Box, раскрытых через БДУ ФСТЭК в 2025: классы проблем, репродьюсеры, патчи и что поймали structure-aware мутаторы"
  }
}];
const TOOLS = [{
  slug: "elf-assistant",
  name: "ELF Assistant",
  status: "stable",
  tags: ["ELF", "mitigations", "browser"],
  useCase: {
    en: "Drop an ELF binary into the browser. Inspect NX, stack canary, PIE, RELRO, and get a draft attack/hardening plan.",
    ru: "Проверка ELF в браузере (основные хар.-ки. NX, stack canary, PIE, RELRO)."
  },
  when: {
    en: "Quick triage during.",
    ru: "Быстрый триаж, без необходимости запуска в CLI."
  },
  href: "/tools/run.html"
}];

// ---------- Primitives ----------
const PAGES = [{
  id: "home",
  label: {
    en: "home",
    ru: "главная"
  }
}, {
  id: "cv",
  label: {
    en: "cv",
    ru: "cv"
  }
}, {
  id: "reviews",
  label: {
    en: "reviews",
    ru: "обзоры"
  }
}, {
  id: "tools",
  label: {
    en: "tools",
    ru: "инструменты"
  }
}, {
  id: "rss",
  label: {
    en: "rss",
    ru: "rss"
  }
}];
function useTweaks() {
  const [tweaks, setTweaks] = useState(() => {
    try {
      const saved = localStorage.getItem("sigdevel_tweaks");
      if (saved) return {
        ...TWEAK_DEFAULTS,
        ...JSON.parse(saved)
      };
    } catch (e) {}
    return TWEAK_DEFAULTS;
  });
  useEffect(() => {
    try {
      localStorage.setItem("sigdevel_tweaks", JSON.stringify(tweaks));
    } catch (e) {}
    document.documentElement.dataset.typography = tweaks.typography;
    document.documentElement.dataset.density = tweaks.density;
    document.documentElement.dataset.palette = tweaks.palette;
    document.documentElement.dataset.lang = tweaks.lang;
    document.documentElement.style.setProperty("--decor-opacity", (tweaks.decor / 100).toFixed(2));
  }, [tweaks]);
  return [tweaks, setTweaks];
}
function L({
  en,
  ru,
  lang
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, lang === "ru" ? ru : en);
}

// ---------- Sidebar / Topbar navigation ----------
function SidebarNav({
  page,
  setPage,
  tweaks,
  setTweaks
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const L_ = (en, ru) => tweaks.lang === "ru" ? ru : en;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "mobile-menu-btn",
    onClick: () => setMobileOpen(v => !v),
    "aria-label": "menu"
  }, /*#__PURE__*/React.createElement("span", {
    className: `hamburger ${mobileOpen ? 'open' : ''}`
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("span", {
    className: "mobile-menu-label"
  }, PAGES.find(p => p.id === page)?.label[tweaks.lang])), /*#__PURE__*/React.createElement("aside", {
    className: `sidebar ${mobileOpen ? 'sidebar--mobile-open' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand-mark",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 32 32",
    width: "28",
    height: "28"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "26",
    height: "26",
    rx: "4",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 12 L12 16 L8 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "20",
    x2: "24",
    y2: "20",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "@sigdevel"), /*#__PURE__*/React.createElement("p", {
    className: "sidebar-sub"
  }, L_("offensive research · SDL · DAST", "offensive research · SDL · DAST")))), /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, PAGES.map(p => /*#__PURE__*/React.createElement("a", {
    key: p.id,
    href: `#${p.id}`,
    "aria-current": page === p.id ? "page" : undefined,
    onClick: e => {
      e.preventDefault();
      setPage(p.id);
      setMobileOpen(false);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-dot",
    "aria-hidden": "true"
  }), p.label[tweaks.lang]))), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lang-toggle",
    role: "group",
    "aria-label": "language"
  }, /*#__PURE__*/React.createElement("button", {
    className: tweaks.lang === 'en' ? 'is-active' : '',
    onClick: () => setTweaks(t => ({
      ...t,
      lang: 'en'
    }))
  }, "EN"), /*#__PURE__*/React.createElement("button", {
    className: tweaks.lang === 'ru' ? 'is-active' : '',
    onClick: () => setTweaks(t => ({
      ...t,
      lang: 'ru'
    }))
  }, "RU")), /*#__PURE__*/React.createElement("p", {
    className: "sidebar-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "status-dot",
    "aria-hidden": "true"
  }), L_("available for contract", "открыт к контрактам")))));
}

// ---------- Pages ----------
function HomePage({
  tweaks,
  setPage
}) {
  const lang = tweaks.lang;
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement("header", {
    className: "hero hero--home"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-grid",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hero-eyebrow"
  }, lang === "ru" ? "CV · заметки · обзоры" : "CV · notes · reviews"), /*#__PURE__*/React.createElement("h1", {
    className: "hero-title"
  }, /*#__PURE__*/React.createElement(L, {
    en: "Alexander Shvedov",
    ru: "\u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440 \u0428\u0432\u0435\u0434\u043E\u0432",
    lang: lang
  })), /*#__PURE__*/React.createElement("p", {
    className: "hero-lead"
  }, /*#__PURE__*/React.createElement(L, {
    en: "SDL engineer and DAST researcher. I build structure-aware fuzzers, run compliance-grade security reviews for a national certification scheme, and open-source tooling for binary analysis.",
    ru: "SDL-\u0438\u043D\u0436\u0435\u043D\u0435\u0440 \u0438 DAST-\u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C. \u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 structure-aware \u0444\u0430\u0437\u0437\u0435\u0440\u043E\u0432; \u043F\u0440\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0440\u0430\u0431\u043E\u0442 \u043F\u043E \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F\u043C \u0424\u0421\u0422\u042D\u041A \u0420\u0424; \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432.",
    lang: lang
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn--primary",
    href: "#cv",
    onClick: e => {
      e.preventDefault();
      setPage("cv");
    }
  }, /*#__PURE__*/React.createElement(L, {
    en: "Read CV",
    ru: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C CV",
    lang: lang
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192")), /*#__PURE__*/React.createElement("a", {
    className: "btn btn--ghost",
    href: "#reviews",
    onClick: e => {
      e.preventDefault();
      setPage("reviews");
    }
  }, /*#__PURE__*/React.createElement(L, {
    en: "Latest reviews",
    ru: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u043E\u0431\u0437\u043E\u0440\u044B",
    lang: lang
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-kicker"
  }, "01"), /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement(L, {
    en: "Navigation",
    ru: "\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F",
    lang: lang
  }))), /*#__PURE__*/React.createElement("div", {
    className: "portal-grid"
  }, /*#__PURE__*/React.createElement("a", {
    className: "portal-card",
    href: "#cv",
    onClick: e => {
      e.preventDefault();
      setPage("cv");
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "22",
    height: "22",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "3",
    width: "16",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "8",
    x2: "16",
    y2: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "12",
    x2: "16",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "16",
    x2: "13",
    y2: "16"
  }))), /*#__PURE__*/React.createElement("h3", null, "CV"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(L, {
    en: "Roles, skills, contributions",
    ru: "\u0420\u043E\u043B\u0438, \u043D\u0430\u0432\u044B\u043A\u0438, \u043A\u043E\u043D\u0442\u0440\u0438\u0431\u044C\u044E\u0442\u0438\u043D\u0433",
    lang: lang
  })), /*#__PURE__*/React.createElement("span", {
    className: "portal-arrow"
  }, "\u2192")), /*#__PURE__*/React.createElement("a", {
    className: "portal-card",
    href: "#reviews",
    onClick: e => {
      e.preventDefault();
      setPage("reviews");
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "22",
    height: "22",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 5 L20 5 L20 19 L4 19 Z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "9",
    x2: "20",
    y2: "9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "14",
    r: "1.5",
    fill: "currentColor"
  }))), /*#__PURE__*/React.createElement("h3", null, "Reviews"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(L, {
    en: "Vulnerability write-ups and methodology notes",
    ru: "\u0420\u0430\u0437\u0431\u043E\u0440\u044B \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u0435\u0439 \u0438 \u043C\u0435\u0442\u043E\u0434\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438",
    lang: lang
  })), /*#__PURE__*/React.createElement("span", {
    className: "portal-arrow"
  }, "\u2192")), /*#__PURE__*/React.createElement("a", {
    className: "portal-card",
    href: "#tools",
    onClick: e => {
      e.preventDefault();
      setPage("tools");
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "22",
    height: "22",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 3 L21 10 L14 17 L14 13 L10 13 L10 17 L3 10 L10 3 L10 7 L14 7 Z"
  }))), /*#__PURE__*/React.createElement("h3", null, "Tools"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(L, {
    en: "Utilities in development",
    ru: "\u0423\u0442\u0438\u043B\u0438\u0442\u044B \u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0435",
    lang: lang
  })), /*#__PURE__*/React.createElement("span", {
    className: "portal-arrow"
  }, "\u2192")), /*#__PURE__*/React.createElement("a", {
    className: "portal-card",
    href: "#rss",
    onClick: e => {
      e.preventDefault();
      setPage("rss");
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "portal-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "22",
    height: "22",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 19 a2 2 0 1 1 0 -0.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 12 a7 7 0 0 1 7 7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 5 a14 14 0 0 1 14 14"
  }))), /*#__PURE__*/React.createElement("h3", null, "RSS"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(L, {
    en: "Mastodon / infosec.exchange feed",
    ru: "\u041B\u0435\u043D\u0442\u0430 Mastodon / infosec.exchange",
    lang: lang
  })), /*#__PURE__*/React.createElement("span", {
    className: "portal-arrow"
  }, "\u2192")))));
}
function CvPage({
  tweaks
}) {
  const lang = tweaks.lang;
  const [bduFilter, setBduFilter] = useState({
    year: "all",
    project: "all",
    showAll: false
  });
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const ALL_DISCLOSURES = useMemo(() => [...BDU_ENTRIES.map(e => ({
    ...e,
    source: 'BDU',
    url: `https://bdu.fstec.ru/vul/${e.id}`,
    label: `BDU:${e.id}`
  })), ...CVE_ENTRIES.map(e => ({
    ...e,
    source: 'CVE',
    severity: e.severity || null,
    url: `https://nvd.nist.gov/vuln/detail/${e.id}`,
    label: e.id
  }))], []);
  const filteredBdu = useMemo(() => {
    return ALL_DISCLOSURES.filter(e => {
      if (bduFilter.year !== "all" && String(e.year) !== bduFilter.year) return false;
      if (bduFilter.project !== "all" && e.project !== bduFilter.project) return false;
      if (bduFilter.source && bduFilter.source !== "all" && e.source !== bduFilter.source) return false;
      if (query && !e.id.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [ALL_DISCLOSURES, bduFilter, query]);
  const visibleBdu = bduFilter.showAll ? filteredBdu : filteredBdu.slice(0, 12);
  const years = Array.from(new Set(ALL_DISCLOSURES.map(e => e.year))).sort();
  const projects = Array.from(new Set(ALL_DISCLOSURES.map(e => e.project)));
  const copyEmail = () => {
    navigator.clipboard?.writeText("shvedov@gmx.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };
  const yearCounts = useMemo(() => {
    const c = {};
    ALL_DISCLOSURES.forEach(e => {
      c[e.year] = (c[e.year] || 0) + 1;
    });
    return c;
  }, [ALL_DISCLOSURES]);
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement("header", {
    className: "hero hero--cv"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-grid",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cv-hero-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cv-avatar",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cv-avatar-inner"
  }, "AS"), /*#__PURE__*/React.createElement("div", {
    className: "cv-avatar-ring"
  })), /*#__PURE__*/React.createElement("div", {
    className: "cv-hero-text"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hero-eyebrow"
  }, lang === "ru" ? "Резюме · обновлено 04 / 2026" : "CV · updated 04 / 2026"), /*#__PURE__*/React.createElement("h1", {
    className: "hero-title"
  }, /*#__PURE__*/React.createElement(L, {
    en: "Alexander Shvedov",
    ru: "\u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440 \u0428\u0432\u0435\u0434\u043E\u0432",
    lang: lang
  })), /*#__PURE__*/React.createElement("p", {
    className: "hero-role"
  }, /*#__PURE__*/React.createElement(L, {
    en: "SDL engineer \xB7 DAST researcher",
    ru: "SDL-\u0438\u043D\u0436\u0435\u043D\u0435\u0440 \xB7 DAST-\u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C",
    lang: lang
  })), /*#__PURE__*/React.createElement("div", {
    className: "cv-contact-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: `chip chip--action ${copied ? 'is-copied' : ''}`,
    onClick: copyEmail
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "5",
    width: "18",
    height: "14",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 7 L12 13 L21 7"
  })), copied ? lang === "ru" ? "скопировано" : "copied" : "shvedov@gmx.com"), /*#__PURE__*/React.createElement("a", {
    className: "chip",
    href: "https://linkedin.com/in/sigdevel",
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4h4v4H4zM4 10h4v10H4zM10 10h4v2c.6-1.2 2-2.2 4-2 3 0 4 2 4 5v5h-4v-5c0-1.3-.5-2-1.5-2s-2.5.5-2.5 2.5V20h-4z"
  })), "linkedin / sigdevel"), /*#__PURE__*/React.createElement("a", {
    className: "chip",
    href: "https://github.com/sigdevel",
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.35-3.37-1.35-.46-1.15-1.12-1.46-1.12-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.04 1.53 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.26-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.39.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.33 4.68-4.56 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
  })), "github / sigdevel"))))), /*#__PURE__*/React.createElement("nav", {
    className: "toc",
    "aria-label": "sections"
  }, [["about", lang === "ru" ? "О себе" : "About"], ["experience", lang === "ru" ? "Опыт" : "Experience"], ["skills", lang === "ru" ? "Навыки" : "Skills"], ["contrib", lang === "ru" ? "OSS" : "OSS"], ["disclosures", "BDU / CVE"], ["availability", lang === "ru" ? "Доступность" : "Availability"]].map(([id, label]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: `#${id}`,
    onClick: e => {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, label))), /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-kicker"
  }, "01"), /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement(L, {
    en: "About",
    ru: "\u041E \u0441\u0435\u0431\u0435",
    lang: lang
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tldr"
  }, /*#__PURE__*/React.createElement("p", {
    className: "tldr-label"
  }, "TL;DR"), /*#__PURE__*/React.createElement("p", {
    className: "tldr-body"
  }, /*#__PURE__*/React.createElement(L, {
    en: "6+ years of participation in certification of various products from the national certification scheme: formerly as a testing-laboratory analyst, currently as an applicant.",
    ru: "6+ лет участия в сертификации различных продуктов из реестра СЗИ ФСТЭК: в качестве сотрудника испытательной лаборатории (ранее); в качестве заявителя - сейчас.",
    lang: lang
  }))), /*#__PURE__*/React.createElement("div", {
    className: "prose"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      whiteSpace: 'pre-line'
    }
  }, /*#__PURE__*/React.createElement(L, {
    en: "Extensive FSTEC certification experience (assurance levels 6/4/2):\\n1. Product research in internal audits. Stack: binary analysis, hardware analysis, hunting insecure configurations in product APIs (REST, GraphQL).\\n2. Work across the full regulatory lifecycle (from architectural audit and certification-application filing to finalization of the Protocol results).",
    ru: "Большой опыт проведения сертификаций ФСТЭК (УД6/4/2):\n1. Исследование ПО и ПАК на внутренних аудитах. Стек: бинарный анализ, hardware-анализ, поиск уязвимых конфигураций в API продуктов (REST, GraphQL).\n2. Проведение работ в рамках полного цикла нормативной базы (от проведения архитектурного аудита до подачи заявки на сертификацию, до финализации результатов Протокола).",
    lang: lang
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      whiteSpace: 'pre-line'
    }
  }, /*#__PURE__*/React.createElement(L, {
    en: "Electively:\n- research into video-format stacks (GPAC, JPEG XL, libde265);\n- contributions to public bug trackers (AFL++, Node.js, CPython, Cppcheck, CCID, etc.);\n- development of automation tooling and wrappers around existing tools when their base functionality is insufficient.",
    ru: "Факультативно:\n- исследую стек видеоформатов (GPAC, JPEG XL, libde265);\n- контрибьючу в публичные баг-трекеры (AFL++, Node.js, CPython, Cppcheck, CCID и т.д.);\n- разрабатываю инструменты автоматизации и обёртки над готовыми инструментами в случае недостатка базового функционала.",
    lang: lang
  })))), /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "experience"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-kicker"
  }, "02"), /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement(L, {
    en: "Experience",
    ru: "\u041E\u043F\u044B\u0442",
    lang: lang
  }))), /*#__PURE__*/React.createElement("div", {
    className: "timeline"
  }, /*#__PURE__*/React.createElement("article", {
    className: "timeline-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline-marker"
  }), /*#__PURE__*/React.createElement("div", {
    className: "timeline-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline-head"
  }, /*#__PURE__*/React.createElement("h3", null, "AppSec engineer"), /*#__PURE__*/React.createElement("span", {
    className: "timeline-date"
  }, "2023 \u2014 ", lang === "ru" ? "н/в" : "present")), /*#__PURE__*/React.createElement("p", {
    className: "timeline-org"
  }, "Aladdin R. D. \xB7 ", /*#__PURE__*/React.createElement(L, {
    en: "cert-grade SDL / applicant side",
    ru: "\u0441\u0435\u0440\u0442\u0438\u0444\u0438\u0446\u0438\u0440\u0443\u0435\u043C\u044B\u0439 SDL / \u0441\u0442\u043E\u0440\u043E\u043D\u0430 \u0437\u0430\u044F\u0432\u0438\u0442\u0435\u043B\u044F",
    lang: lang
  })), /*#__PURE__*/React.createElement("ul", {
    className: "timeline-points"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(L, {
    en: "Primary security audit of products before regulator submission.",
    ru: "\u041F\u0435\u0440\u0432\u0438\u0447\u043D\u044B\u0439 \u0430\u0443\u0434\u0438\u0442 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u041E\u041E \u043F\u0435\u0440\u0435\u0434 \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0435\u0439 \u043D\u0430 \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F \u043F\u043E \u0412\u0423\u0438\u041D\u0414\u0412.",
    lang: lang
  })), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(L, {
    en: "Own the continuity of the security group across all workstreams.",
    ru: "\u041E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u0435 \u043D\u0435\u043F\u0440\u0435\u0440\u044B\u0432\u043D\u043E\u0441\u0442\u0438 \u0440\u0430\u0431\u043E\u0442\u044B \u0433\u0440\u0443\u043F\u043F\u044B \u043F\u043E \u0432\u0441\u0435\u043C \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F\u043C.",
    lang: lang
  })), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(L, {
    en: "Architectural-defect reviews of company products.",
    ru: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u0439 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 \u043D\u0430 \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u043D\u044B\u0435 \u0434\u0435\u0444\u0435\u043A\u0442\u044B.",
    lang: lang
  })), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(L, {
    en: "Audit of embedding and runtime behaviour of company software.",
    ru: "\u0410\u0443\u0434\u0438\u0442 \u043C\u0435\u0442\u043E\u0434\u043E\u0432 \u0432\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u043D\u0438\u044F \u0438 \u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u041F\u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438.",
    lang: lang
  })), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(L, {
    en: "Defect discovery, primary analysis, and lifecycle tracking.",
    ru: "\u0418\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u0435, \u043F\u0435\u0440\u0432\u0438\u0447\u043D\u044B\u0439 \u0430\u043D\u0430\u043B\u0438\u0437 \u0438 \u0441\u043E\u043F\u0440\u043E\u0432\u043E\u0436\u0434\u0435\u043D\u0438\u0435 \u0434\u0435\u0444\u0435\u043A\u0442\u043E\u0432 \u043F\u043E \u0432\u0441\u0435\u043C\u0443 \u0436\u0438\u0437\u043D\u0435\u043D\u043D\u043E\u043C\u0443 \u0446\u0438\u043A\u043B\u0443.",
    lang: lang
  })), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(L, {
    en: "Design of product-security research processes (software / firmware / hardware-software complexes).",
    ru: "\u0412\u044B\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432 \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 (\u041F\u041E/\u0412\u041F\u041E/\u041F\u0410\u041A).",
    lang: lang
  }))))), /*#__PURE__*/React.createElement("article", {
    className: "timeline-item timeline-item--past"
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline-marker"
  }), /*#__PURE__*/React.createElement("div", {
    className: "timeline-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline-head"
  }, /*#__PURE__*/React.createElement("h3", null, lang === "ru" ? "Сотрудник испытательной лаборатории" : "Testing-laboratory analyst"), /*#__PURE__*/React.createElement("span", {
    className: "timeline-date"
  }, "\u2014 2023")), /*#__PURE__*/React.createElement("p", {
    className: "timeline-org"
  }, /*#__PURE__*/React.createElement(L, {
    en: "Government-regulator testing lab \xB7 product audit; assurance research; functional-test development",
    ru: "\u041F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u044B\u0439 \u0430\u0443\u0434\u0438\u0442 ; \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F \u0432 \u0440\u0430\u043C\u043A\u0430\u0445 \u0412\u0423\u0438\u041D\u0414\u0412 ; \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0424\u0422",
    lang: lang
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "skills"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-kicker"
  }, "03"), /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement(L, {
    en: "Skills",
    ru: "\u041D\u0430\u0432\u044B\u043A\u0438",
    lang: lang
  }))), /*#__PURE__*/React.createElement("div", {
    className: "skills-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "skill-card"
  }, /*#__PURE__*/React.createElement("p", {
    className: "skill-card-title"
  }, lang === "ru" ? "Фаззинг и DAST" : "Fuzzing & DAST"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "AFL++ (QEMU, LAF, CmpLog)"), /*#__PURE__*/React.createElement("li", null, lang === "ru" ? "structure-aware мутаторы" : "structure-aware mutators"), /*#__PURE__*/React.createElement("li", null, lang === "ru" ? "словари токенов" : "token dictionaries"), /*#__PURE__*/React.createElement("li", null, "libFuzzer, honggfuzz"))), /*#__PURE__*/React.createElement("div", {
    className: "skill-card"
  }, /*#__PURE__*/React.createElement("p", {
    className: "skill-card-title"
  }, lang === "ru" ? "Бинарники" : "Binary analysis"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "ELF internals / mitigations"), /*#__PURE__*/React.createElement("li", null, "Ghidra, radare2"), /*#__PURE__*/React.createElement("li", null, lang === "ru" ? "LLM-ассистенты" : "LLM-assisted"), /*#__PURE__*/React.createElement("li", null, "APDU / smartcards"))), /*#__PURE__*/React.createElement("div", {
    className: "skill-card"
  }, /*#__PURE__*/React.createElement("p", {
    className: "skill-card-title"
  }, lang === "ru" ? "Сертификация" : "Certification"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, lang === "ru" ? "ФСТЭК · ВУиНДВ" : "Government regulator assurance"), /*#__PURE__*/React.createElement("li", null, lang === "ru" ? "разработка инструментов" : "tooling development"), /*#__PURE__*/React.createElement("li", null, lang === "ru" ? "SBOM / контроль SCA" : "SBOM / SCA control"))), /*#__PURE__*/React.createElement("div", {
    className: "skill-card"
  }, /*#__PURE__*/React.createElement("p", {
    className: "skill-card-title"
  }, lang === "ru" ? "Языки / стек" : "Languages / stack"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "C / C++ (r/w)"), /*#__PURE__*/React.createElement("li", null, "Python (tooling)"), /*#__PURE__*/React.createElement("li", null, "Bash, CMake"), /*#__PURE__*/React.createElement("li", null, "Linux, QEMU"))))), /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "contrib"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-kicker"
  }, "04"), /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement(L, {
    en: "Open-source contributions",
    ru: "\u041A\u043E\u043D\u0442\u0440\u0438\u0431\u044C\u044E\u0442\u0438\u043D\u0433",
    lang: lang
  }))), /*#__PURE__*/React.createElement("p", {
    className: "section-lead"
  }, /*#__PURE__*/React.createElement(L, {
    en: "Public issues, patches, and hardening across security-sensitive projects.",
    ru: "\u041F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0435 \u0440\u0435\u043F\u043E\u0440\u0442\u044B, \u043F\u0430\u0442\u0447\u0438 \u0438 \u0445\u0430\u0440\u0434\u043D\u0435\u043D\u0438\u043D\u0433 \u0432 \u0447\u0443\u0432\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u0445.",
    lang: lang
  })), /*#__PURE__*/React.createElement("div", {
    className: "oss-grid"
  }, OSS_PROJECTS.map(p => /*#__PURE__*/React.createElement("a", {
    key: p.name,
    className: "oss-card",
    href: p.url,
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement("div", {
    className: "oss-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "oss-name"
  }, p.name), /*#__PURE__*/React.createElement("span", {
    className: "oss-arrow"
  }, "\u2197")), /*#__PURE__*/React.createElement("p", {
    className: "oss-desc"
  }, p.desc[lang]))))), /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "disclosures"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-kicker"
  }, "05"), /*#__PURE__*/React.createElement("h2", null, "BDU / CVE"), /*#__PURE__*/React.createElement("span", {
    className: "section-badge"
  }, BDU_ENTRIES.length + CVE_ENTRIES.length)), /*#__PURE__*/React.createElement("p", {
    className: "section-lead"
  }, /*#__PURE__*/React.createElement(L, {
    en: "Public vulnerability disclosures via the national vulnerability database (BDU) and NVD. Filter by year or project; each ID links to the advisory.",
    ru: "\u041F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0435 \u0440\u0430\u0441\u043A\u0440\u044B\u0442\u0438\u044F \u0447\u0435\u0440\u0435\u0437 \u0411\u0414\u0423 \u0424\u0421\u0422\u042D\u041A \u0438 NVD. \u0424\u0438\u043B\u044C\u0442\u0440\u0443\u0439\u0442\u0435 \u043F\u043E \u0433\u043E\u0434\u0443 \u0438\u043B\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u0443; \u043A\u0430\u0436\u0434\u044B\u0439 ID - \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0431\u044E\u043B\u043B\u0435\u0442\u0435\u043D\u044C.",
    lang: lang
  })), /*#__PURE__*/React.createElement("div", {
    className: "bdu-year-strip"
  }, years.map(y => /*#__PURE__*/React.createElement("button", {
    key: y,
    className: `year-pill ${bduFilter.year === String(y) ? 'is-active' : ''}`,
    onClick: () => setBduFilter(f => ({
      ...f,
      year: f.year === String(y) ? 'all' : String(y),
      showAll: false
    }))
  }, /*#__PURE__*/React.createElement("span", {
    className: "year-pill-num"
  }, y), /*#__PURE__*/React.createElement("span", {
    className: "year-pill-count"
  }, yearCounts[y]))), /*#__PURE__*/React.createElement("button", {
    className: `year-pill year-pill--all ${bduFilter.year === 'all' ? 'is-active' : ''}`,
    onClick: () => setBduFilter(f => ({
      ...f,
      year: 'all',
      project: 'all',
      showAll: false
    }))
  }, /*#__PURE__*/React.createElement("span", {
    className: "year-pill-num"
  }, lang === 'ru' ? 'всё' : 'all'), /*#__PURE__*/React.createElement("span", {
    className: "year-pill-count"
  }, ALL_DISCLOSURES.length))), /*#__PURE__*/React.createElement("div", {
    className: "bdu-controls"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bdu-filters"
  }, /*#__PURE__*/React.createElement("button", {
    className: `filter-chip ${!bduFilter.source || bduFilter.source === 'all' ? 'is-active' : ''}`,
    onClick: () => setBduFilter(f => ({
      ...f,
      source: 'all',
      showAll: false
    }))
  }, lang === 'ru' ? 'все источники' : 'all sources'), /*#__PURE__*/React.createElement("button", {
    className: `filter-chip ${bduFilter.source === 'BDU' ? 'is-active' : ''}`,
    onClick: () => setBduFilter(f => ({
      ...f,
      source: f.source === 'BDU' ? 'all' : 'BDU',
      showAll: false
    }))
  }, "BDU"), /*#__PURE__*/React.createElement("button", {
    className: `filter-chip ${bduFilter.source === 'CVE' ? 'is-active' : ''}`,
    onClick: () => setBduFilter(f => ({
      ...f,
      source: f.source === 'CVE' ? 'all' : 'CVE',
      showAll: false
    }))
  }, "CVE"), /*#__PURE__*/React.createElement("span", {
    className: "bdu-filter-sep",
    "aria-hidden": "true"
  }, "\xB7"), projects.map(p => /*#__PURE__*/React.createElement("button", {
    key: p,
    className: `filter-chip ${bduFilter.project === p ? 'is-active' : ''}`,
    onClick: () => setBduFilter(f => ({
      ...f,
      project: f.project === p ? 'all' : p,
      showAll: false
    }))
  }, p))), /*#__PURE__*/React.createElement("label", {
    className: "bdu-search"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "16",
    x2: "21",
    y2: "21"
  })), /*#__PURE__*/React.createElement("input", {
    type: "search",
    placeholder: lang === 'ru' ? 'поиск по ID…' : 'search by ID…',
    value: query,
    onChange: e => setQuery(e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bdu-count"
  }, lang === 'ru' ? `Показано ${visibleBdu.length} из ${filteredBdu.length}` : `Showing ${visibleBdu.length} of ${filteredBdu.length}`), /*#__PURE__*/React.createElement("ul", {
    className: "bdu-list"
  }, visibleBdu.map(e => /*#__PURE__*/React.createElement("li", {
    key: `${e.source}-${e.id}`,
    className: `bdu-row ${e.severity ? 'sev-' + e.severity : ''}`
  }, /*#__PURE__*/React.createElement("a", {
    href: e.url,
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bdu-id"
  }, e.label), /*#__PURE__*/React.createElement("span", {
    className: "bdu-project"
  }, e.project), /*#__PURE__*/React.createElement("span", {
    className: "bdu-year"
  }, e.year), e.severity ? /*#__PURE__*/React.createElement("span", {
    className: `bdu-sev bdu-sev--${e.severity}`
  }, e.severity) : /*#__PURE__*/React.createElement("span", {
    className: "bdu-sev bdu-sev--na"
  }, e.source), /*#__PURE__*/React.createElement("span", {
    className: "bdu-arrow"
  }, "\u2197"))))), filteredBdu.length > 12 && /*#__PURE__*/React.createElement("button", {
    className: "btn btn--ghost btn--full",
    onClick: () => setBduFilter(f => ({
      ...f,
      showAll: !f.showAll
    }))
  }, bduFilter.showAll ? lang === 'ru' ? 'Свернуть' : 'Collapse' : lang === 'ru' ? `Показать все (${filteredBdu.length})` : `Show all (${filteredBdu.length})`)), /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "availability"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-kicker"
  }, "06"), /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement(L, {
    en: "Availability",
    ru: "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u044C",
    lang: lang
  }))), /*#__PURE__*/React.createElement("div", {
    className: "availability-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "avail-ping"
  }, /*#__PURE__*/React.createElement("span", {
    className: "avail-dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "avail-ring"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "avail-title"
  }, /*#__PURE__*/React.createElement(L, {
    en: "Open to contract engagements",
    ru: "\u041E\u0442\u043A\u0440\u044B\u0442 \u0434\u043B\u044F \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u043D\u044B\u0445 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432",
    lang: lang
  })), /*#__PURE__*/React.createElement("p", {
    className: "avail-sub"
  }, /*#__PURE__*/React.createElement(L, {
    en: "AppSec reviews, fuzzing harness development, regulator cert-prep, structure-aware tooling.",
    ru: "AppSec-\u0430\u0443\u0434\u0438\u0442\u044B, \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 fuzzing harness'\u043E\u0432, \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u043A \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 (\u0412\u0423\u0438\u041D\u0414\u0412), structure-aware \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439.",
    lang: lang
  }))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary",
    onClick: copyEmail
  }, copied ? lang === 'ru' ? 'скопировано ✓' : 'copied ✓' : lang === 'ru' ? 'Связаться' : 'Get in touch'))));
}
function ReviewsPage({
  tweaks
}) {
  const lang = tweaks.lang;
  const [projectFilter, setProjectFilter] = useState("all");
  const projects = Array.from(new Set(REVIEWS.map(r => r.project)));
  const shown = REVIEWS.filter(r => projectFilter === "all" || r.project === projectFilter);
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement("header", {
    className: "hero hero--narrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-grid",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hero-eyebrow"
  }, lang === "ru" ? "Обзоры · методология" : "Reviews · methodology"), /*#__PURE__*/React.createElement("h1", {
    className: "hero-title"
  }, "Reviews"), /*#__PURE__*/React.createElement("p", {
    className: "hero-lead"
  }, /*#__PURE__*/React.createElement(L, {
    en: "Write-ups of found bugs, test reports, and brief methodology notes - what doesn't fit the standard format [page in development].",
    ru: "\u0420\u0430\u0437\u0431\u043E\u0440\u044B \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0445 \u0431\u0430\u0433\u043E\u0432, \u0442\u0435\u0441\u0442-\u043E\u0442\u0447\u0451\u0442\u044B \u0438 \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u0435 \u043C\u0435\u0442\u043E\u0434\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438 - \u0432\u0441\u0451, \u0447\u0442\u043E \u043D\u0435 \u0432\u043B\u0435\u0437\u0430\u0435\u0442 \u0432 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 [\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0435].",
    lang: lang
  })))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-kicker"
  }, "01"), /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement(L, {
    en: "All entries",
    ru: "\u0412\u0441\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B",
    lang: lang
  })), /*#__PURE__*/React.createElement("span", {
    className: "section-badge"
  }, REVIEWS.length)), /*#__PURE__*/React.createElement("div", {
    className: "bdu-filters",
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: `filter-chip ${projectFilter === 'all' ? 'is-active' : ''}`,
    onClick: () => setProjectFilter('all')
  }, lang === 'ru' ? 'все' : 'all'), projects.map(p => /*#__PURE__*/React.createElement("button", {
    key: p,
    className: `filter-chip ${projectFilter === p ? 'is-active' : ''}`,
    onClick: () => setProjectFilter(p)
  }, p))), /*#__PURE__*/React.createElement("div", {
    className: "review-list"
  }, shown.map(r => /*#__PURE__*/React.createElement("a", {
    key: r.slug,
    className: "review-card",
    href: `/reviews/${r.slug}.html`
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "review-date"
  }, r.date), /*#__PURE__*/React.createElement("span", {
    className: "review-read"
  }, r.readMin, " ", lang === 'ru' ? 'мин' : 'min'), /*#__PURE__*/React.createElement("span", {
    className: "review-project"
  }, r.project)), /*#__PURE__*/React.createElement("h3", {
    className: "review-title"
  }, r.title[lang]), /*#__PURE__*/React.createElement("p", {
    className: "review-abstract"
  }, r.abstract[lang]), /*#__PURE__*/React.createElement("div", {
    className: "review-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-tags"
  }, r.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    className: "review-tag"
  }, "#", t))), /*#__PURE__*/React.createElement("span", {
    className: "review-more"
  }, lang === 'ru' ? 'читать' : 'read', " \u2192")))))));
}
function ToolsPage({
  tweaks
}) {
  const lang = tweaks.lang;
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement("header", {
    className: "hero hero--narrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-grid",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hero-eyebrow"
  }, lang === "ru" ? "Инструменты · браузер" : "Tools · browser-side"), /*#__PURE__*/React.createElement("h1", {
    className: "hero-title"
  }, "Tools"), /*#__PURE__*/React.createElement("p", {
    className: "hero-lead"
  }, /*#__PURE__*/React.createElement(L, {
    en: "Small, focused utilities that run entirely in your browser.",
    ru: "\u041D\u0435\u0431\u043E\u043B\u044C\u0448\u0438\u0435 \u0443\u0442\u0438\u043B\u0438\u0442\u044B, \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0449\u0438\u0435 \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u043E \u043D\u0430 \u0441\u0442\u043E\u0440\u043E\u043D\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430.",
    lang: lang
  })))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-kicker"
  }, "01"), /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement(L, {
    en: "Available now",
    ru: "\u0421\u0435\u0439\u0447\u0430\u0441 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E",
    lang: lang
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tool-grid"
  }, TOOLS.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.slug,
    className: "tool-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tool-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tool-icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 32 32",
    width: "26",
    height: "26",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "6",
    width: "24",
    height: "20",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "11",
    x2: "28",
    y2: "11"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "8.5",
    r: "0.6",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "8.5",
    r: "0.6",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 17 L14 17 M9 20 L18 20 M9 23 L12 23"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, t.name), /*#__PURE__*/React.createElement("span", {
    className: `tool-status tool-status--${t.status}`
  }, t.status))), /*#__PURE__*/React.createElement("p", {
    className: "tool-usecase"
  }, t.useCase[lang]), /*#__PURE__*/React.createElement("div", {
    className: "tool-when"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tool-when-label"
  }, lang === 'ru' ? 'Когда пригодится' : 'When to use'), /*#__PURE__*/React.createElement("p", null, t.when[lang])), /*#__PURE__*/React.createElement("div", {
    className: "tool-tags"
  }, t.tags.map(tag => /*#__PURE__*/React.createElement("span", {
    key: tag,
    className: "tool-tag"
  }, tag))), /*#__PURE__*/React.createElement("a", {
    className: "btn btn--primary",
    href: t.href
  }, lang === 'ru' ? 'Открыть' : 'Launch', " \u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "tool-card tool-card--soon"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tool-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tool-icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 32 32",
    width: "26",
    height: "26",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeDasharray: "3 3"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "6",
    width: "24",
    height: "20",
    rx: "2"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, lang === "ru" ? "APDU Explorer" : "APDU Explorer"), /*#__PURE__*/React.createElement("span", {
    className: "tool-status tool-status--wip"
  }, "WIP"))), /*#__PURE__*/React.createElement("p", {
    className: "tool-usecase",
    style: {
      whiteSpace: 'pre-line'
    }
  }, /*#__PURE__*/React.createElement(L, {
    en: "Interactive APDU session walker with fuzzing presets [in progress  see the repo for current state]",
    ru: "Интерактивный обход APDU-сессий с fuzzing-пресетами.\n[в работе - актуальное состояние в репозитории]",
    lang: lang
  }))))));
}
function RssPage({
  tweaks
}) {
  const lang = tweaks.lang;
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement("header", {
    className: "hero hero--narrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-grid",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hero-eyebrow"
  }, lang === "ru" ? "Публичная лента" : "Public stream"), /*#__PURE__*/React.createElement("h1", {
    className: "hero-title"
  }, "RSS"), /*#__PURE__*/React.createElement("p", {
    className: "hero-lead"
  }, /*#__PURE__*/React.createElement(L, {
    en: "Public updates on infosec.exchange.",
    ru: "\u041F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0435 \u0430\u043F\u0434\u0435\u0439\u0442\u044B \u043D\u0430 infosec.exchange.",
    lang: lang
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn--primary",
    href: "https://infosec.exchange/@sigdevel",
    target: "_blank",
    rel: "noopener"
  }, "@sigdevel@infosec.exchange"), /*#__PURE__*/React.createElement("a", {
    className: "btn btn--ghost",
    href: "https://infosec.exchange/@sigdevel.rss",
    target: "_blank",
    rel: "noopener"
  }, "RSS feed")))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-kicker"
  }, "01"), /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement(L, {
    en: "Latest post",
    ru: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u043F\u043E\u0441\u0442",
    lang: lang
  }))), /*#__PURE__*/React.createElement("div", {
    className: "post-embed"
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-embed-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-avatar"
  }, "@s"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "post-name"
  }, "@sigdevel"), /*#__PURE__*/React.createElement("p", {
    className: "post-handle"
  }, "@sigdevel@infosec.exchange \xB7 2d")), /*#__PURE__*/React.createElement("span", {
    className: "post-platform"
  }, "Mastodon")), /*#__PURE__*/React.createElement("p", {
    className: "post-body"
  }, /*#__PURE__*/React.createElement(L, {
    en: "New structure-aware mutator set for MP4 box trees landed. Notes and reproducers in the reviews section.",
    ru: "\u0412\u044B\u043B\u043E\u0436\u0435\u043D \u043D\u043E\u0432\u044B\u0439 \u043D\u0430\u0431\u043E\u0440 structure-aware \u043C\u0443\u0442\u0430\u0442\u043E\u0440\u043E\u0432 \u0434\u043B\u044F \u0434\u0435\u0440\u0435\u0432\u0430 MP4 box'\u043E\u0432. \u0417\u0430\u043C\u0435\u0442\u043A\u0438 \u0438 \u0440\u0435\u043F\u0440\u043E\u0434\u044C\u044E\u0441\u0435\u0440\u044B \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 reviews.",
    lang: lang
  })), /*#__PURE__*/React.createElement("div", {
    className: "post-foot"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://infosec.exchange/@sigdevel",
    target: "_blank",
    rel: "noopener"
  }, lang === 'ru' ? 'Открыть на Mastodon' : 'View on Mastodon', " \u2192")))));
}

// ---------- Tweaks panel ----------
function TweaksPanel({
  tweaks,
  setTweaks,
  open,
  setOpen,
  available
}) {
  if (!available) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: `tweaks ${open ? 'is-open' : ''}`
  }, /*#__PURE__*/React.createElement("button", {
    className: "tweaks-toggle",
    onClick: () => setOpen(v => !v),
    "aria-label": "tweaks"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 12l2 0M3 12l2 0M12 3l0 2M12 19l0 2M17.5 6.5l1.4 -1.4M5.1 18.9l1.4 -1.4M17.5 17.5l1.4 1.4M5.1 5.1l1.4 1.4"
  })), /*#__PURE__*/React.createElement("span", null, "Tweaks")), open && /*#__PURE__*/React.createElement("div", {
    className: "tweaks-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tweaks-field"
  }, /*#__PURE__*/React.createElement("label", null, "Typography"), /*#__PURE__*/React.createElement("div", {
    className: "tweaks-seg"
  }, ["serif-sans", "all-sans", "mono-accent"].map(v => /*#__PURE__*/React.createElement("button", {
    key: v,
    className: tweaks.typography === v ? 'is-active' : '',
    onClick: () => setTweaks(t => ({
      ...t,
      typography: v
    }))
  }, v === "serif-sans" ? "Serif + Sans" : v === "all-sans" ? "All Sans" : "Mono accent")))), /*#__PURE__*/React.createElement("div", {
    className: "tweaks-field"
  }, /*#__PURE__*/React.createElement("label", null, "Palette"), /*#__PURE__*/React.createElement("div", {
    className: "tweaks-seg"
  }, ["cream", "paper", "dark"].map(v => /*#__PURE__*/React.createElement("button", {
    key: v,
    className: tweaks.palette === v ? 'is-active' : '',
    onClick: () => setTweaks(t => ({
      ...t,
      palette: v
    }))
  }, v)))), /*#__PURE__*/React.createElement("div", {
    className: "tweaks-field"
  }, /*#__PURE__*/React.createElement("label", null, "Density"), /*#__PURE__*/React.createElement("div", {
    className: "tweaks-seg"
  }, ["compact", "comfortable", "spacious"].map(v => /*#__PURE__*/React.createElement("button", {
    key: v,
    className: tweaks.density === v ? 'is-active' : '',
    onClick: () => setTweaks(t => ({
      ...t,
      density: v
    }))
  }, v)))), /*#__PURE__*/React.createElement("div", {
    className: "tweaks-field"
  }, /*#__PURE__*/React.createElement("label", null, "Decor intensity ", /*#__PURE__*/React.createElement("span", {
    className: "tweaks-value"
  }, tweaks.decor, "%")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "100",
    step: "5",
    value: tweaks.decor,
    onChange: e => setTweaks(t => ({
      ...t,
      decor: Number(e.target.value)
    }))
  })), /*#__PURE__*/React.createElement("p", {
    className: "tweaks-note"
  }, "Typography, palette & density are the \"sliders\" the user asked for. Decor controls the engineering-grid / glitch layer.")));
}

// ---------- App root ----------
function App() {
  const [tweaks, setTweaks] = useTweaks();
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return PAGES.find(p => p.id === hash) ? hash : "home";
  });
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [tweaksAvailable, setTweaksAvailable] = useState(false);
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      if (PAGES.find(p => p.id === h)) setPage(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    window.location.hash = page;
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, [page]);

  // Tweaks protocol
  useEffect(() => {
    const onMsg = e => {
      if (e.data?.type === '__activate_edit_mode') {
        setTweaksAvailable(true);
        setTweaksOpen(true);
      }
      if (e.data?.type === '__deactivate_edit_mode') {
        setTweaksAvailable(false);
        setTweaksOpen(false);
      }
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener("message", onMsg);
  }, []);
  useEffect(() => {
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits: tweaks
    }, '*');
  }, [tweaks]);
  let pageEl = null;
  if (page === "home") pageEl = /*#__PURE__*/React.createElement(HomePage, {
    tweaks: tweaks,
    setPage: setPage
  });else if (page === "cv") pageEl = /*#__PURE__*/React.createElement(CvPage, {
    tweaks: tweaks
  });else if (page === "reviews") pageEl = /*#__PURE__*/React.createElement(ReviewsPage, {
    tweaks: tweaks
  });else if (page === "tools") pageEl = /*#__PURE__*/React.createElement(ToolsPage, {
    tweaks: tweaks
  });else if (page === "rss") pageEl = /*#__PURE__*/React.createElement(RssPage, {
    tweaks: tweaks
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "layout",
    "data-screen-label": page
  }, /*#__PURE__*/React.createElement(SidebarNav, {
    page: page,
    setPage: setPage,
    tweaks: tweaks,
    setTweaks: setTweaks
  }), /*#__PURE__*/React.createElement("main", {
    className: "content"
  }, pageEl, /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("p", null, "\xA9 2025\u20132026 \xB7 @sigdevel \xB7 ", /*#__PURE__*/React.createElement("span", {
    className: "footer-muted"
  }, "SDL \xB7 DAST \xB7 AppSec")))), /*#__PURE__*/React.createElement(TweaksPanel, {
    tweaks: tweaks,
    setTweaks: setTweaks,
    open: tweaksOpen,
    setOpen: setTweaksOpen,
    available: tweaksAvailable
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));