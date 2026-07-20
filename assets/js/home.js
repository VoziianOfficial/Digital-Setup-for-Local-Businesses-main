(function () {
  "use strict";
  window.NEXLOCAL_PAGE_INITS = window.NEXLOCAL_PAGE_INITS || [];
  window.NEXLOCAL_PAGE_INITS.push(function initHome() {
    const hero = document.querySelector(".home-hero");
    if (!hero || hero.dataset.initialized === "true") return;
    hero.dataset.initialized = "true";
    if (window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
      let frame = 0;
      hero.addEventListener("pointermove", (event) => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect();
          hero.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width - 0.5) * 18}px`);
          hero.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height - 0.5) * 18}px`);
        });
      });
    }
  });
})();
