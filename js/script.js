const revealSection = function () {
  const allNavList = [...document.querySelectorAll(".nav__link")];
  const allSections = document.querySelectorAll(".section");

  const revealSection = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    allNavList.forEach((nav) => {
      nav.classList.remove("nav__link--active");
      if (entry.target.classList[1] === nav.dataset.name)
        nav.classList.add("nav__link--active");
    });
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.8,
  });

  allSections.forEach(function (section) {
    sectionObserver.observe(section);
  });
};

const removeHoverEffect = function () {
  function hasTouch() {
    return (
      "ontouchstart" in document.documentElement ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }
  if (hasTouch()) {
    try {
      for (let si in document.styleSheets) {
        let styleSheet = document.styleSheets[si];
        if (!styleSheet.rules) continue;
        for (let ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
          if (!styleSheet.rules[ri].selectorText) continue;
          if (styleSheet.rules[ri].selectorText.match(":hover")) {
            styleSheet.deleteRule(ri);
          }
        }
      }
    } catch (ex) {}
  }
};

const init = function () {
  revealSection();
  removeHoverEffect();
};

init();
