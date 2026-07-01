const sectionLinks = Array.from(document.querySelectorAll(".main-nav a"));
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const languageToggle = document.querySelector(".language-toggle");

function setLanguage(lang) {
  document.body.dataset.lang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title =
    lang === "zh"
      ? "\u5434\u51a0\u5c27 | Academic Homepage"
      : "Guanyao Wu | Academic Homepage";

  document.querySelectorAll(".lang-zh").forEach((element) => {
    element.hidden = lang !== "zh";
  });
  document.querySelectorAll(".lang-en").forEach((element) => {
    element.hidden = lang !== "en";
  });

  if (languageToggle) {
    languageToggle.textContent = lang === "zh" ? "EN" : "\u4e2d\u6587";
    languageToggle.setAttribute(
      "aria-label",
      lang === "zh" ? "Switch to English" : "\u5207\u6362\u5230\u4e2d\u6587",
    );
  }
}

languageToggle?.addEventListener("click", () => {
  setLanguage(document.body.dataset.lang === "zh" ? "en" : "zh");
});

setLanguage(document.body.dataset.lang === "zh" ? "zh" : "en");

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    sectionLinks.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${visible.target.id}`,
      );
    });
  },
  {
    rootMargin: "-20% 0px -65% 0px",
    threshold: [0.1, 0.4, 0.7],
  },
);

sections.forEach((section) => observer.observe(section));
