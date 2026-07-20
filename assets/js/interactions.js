(function () {
  "use strict";

  const register = (initializer) => {
    window.NEXLOCAL_PAGE_INITS = window.NEXLOCAL_PAGE_INITS || [];
    window.NEXLOCAL_PAGE_INITS.push(initializer);
  };

  function initSelectors() {
    document.querySelectorAll("[data-content-selector]").forEach((root) => {
      if (root.dataset.initialized === "true") return;
      root.dataset.initialized = "true";
      const triggers = Array.from(root.querySelectorAll("[data-selector-trigger]"));
      const panels = Array.from(root.querySelectorAll("[data-selector-panel]"));
      const activate = (key, moveFocus) => {
        triggers.forEach((trigger) => {
          const active = trigger.dataset.selectorTrigger === key;
          trigger.classList.toggle("is-active", active);
          trigger.setAttribute("aria-selected", String(active));
          trigger.tabIndex = active ? 0 : -1;
          if (active && moveFocus) trigger.focus();
        });
        panels.forEach((panel) => {
          const active = panel.dataset.selectorPanel === key;
          panel.hidden = !active;
          panel.classList.toggle("is-active", active);
        });
      };
      triggers.forEach((trigger, index) => {
        trigger.addEventListener("click", () => activate(trigger.dataset.selectorTrigger, false));
        trigger.addEventListener("focus", () => { if (window.matchMedia("(hover: hover)").matches) activate(trigger.dataset.selectorTrigger, false); });
        trigger.addEventListener("keydown", (event) => {
          if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;
          event.preventDefault();
          const delta = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
          const next = (index + delta + triggers.length) % triggers.length;
          activate(triggers[next].dataset.selectorTrigger, true);
        });
      });
      const initial = triggers.find((trigger) => trigger.classList.contains("is-active")) || triggers[0];
      if (initial) activate(initial.dataset.selectorTrigger, false);
    });
  }

  function initComparison() {
    document.querySelectorAll("[data-comparison]").forEach((root) => {
      if (root.dataset.initialized === "true") return;
      root.dataset.initialized = "true";
      const buttons = root.querySelectorAll("[data-comparison-state]");
      const range = root.querySelector("input[type='range']");
      const setState = (connected) => {
        root.dataset.state = connected ? "connected" : "scattered";
        root.style.setProperty("--comparison", connected ? "100%" : "0%");
        if (range) range.value = connected ? "100" : "0";
        buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.comparisonState === root.dataset.state)));
      };
      buttons.forEach((button) => button.addEventListener("click", () => setState(button.dataset.comparisonState === "connected")));
      if (range) range.addEventListener("input", () => {
        root.style.setProperty("--comparison", `${range.value}%`);
        root.dataset.state = Number(range.value) >= 50 ? "connected" : "scattered";
      });
      setState(false);
    });
  }

  function initFilters() {
    document.querySelectorAll("[data-filter-root]").forEach((root) => {
      if (root.dataset.initialized === "true") return;
      root.dataset.initialized = "true";
      const buttons = root.querySelectorAll("[data-filter]");
      const items = root.querySelectorAll("[data-filter-item]");
      buttons.forEach((button) => button.addEventListener("click", () => {
        const key = button.dataset.filter;
        buttons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
        items.forEach((item) => { item.hidden = key !== "all" && item.dataset.filterItem !== key; });
      }));
    });
  }

  function initHotspots() {
    document.querySelectorAll("[data-hotspots]").forEach((root) => {
      if (root.dataset.initialized === "true") return;
      root.dataset.initialized = "true";
      const buttons = root.querySelectorAll("[data-hotspot]");
      const title = root.querySelector("[data-hotspot-title]");
      const text = root.querySelector("[data-hotspot-text]");
      buttons.forEach((button) => button.addEventListener("click", () => {
        buttons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
        if (title) title.textContent = button.dataset.title || button.textContent;
        if (text) text.textContent = button.dataset.description || "";
      }));
    });
  }

  function initDiagnostic() {
    document.querySelectorAll("[data-diagnostic]").forEach((root) => {
      if (root.dataset.initialized === "true") return;
      root.dataset.initialized = "true";
      const nodes = root.querySelectorAll("[data-diagnostic-node]");
      const output = root.querySelector("[data-diagnostic-output]");
      nodes.forEach((node) => node.addEventListener("click", () => {
        nodes.forEach((other) => other.setAttribute("aria-pressed", String(other === node)));
        if (output) output.innerHTML = `<strong>${node.dataset.title || node.textContent}</strong><span>${node.dataset.description || "Explore how this category may connect with the rest of your setup."}</span>`;
      }));
    });
  }

  function initMarquees() {
    document.querySelectorAll("[data-marquee]").forEach((root) => {
      root.addEventListener("mouseenter", () => root.classList.add("is-paused"));
      root.addEventListener("mouseleave", () => root.classList.remove("is-paused"));
      root.addEventListener("focusin", () => root.classList.add("is-paused"));
      root.addEventListener("focusout", () => root.classList.remove("is-paused"));
    });
  }

  register(function initSharedInteractions() {
    initSelectors();
    initComparison();
    initFilters();
    initHotspots();
    initDiagnostic();
    initMarquees();
  });

  window.NexlocalInteractions = { initSelectors, initComparison, initFilters, initHotspots, initDiagnostic };
})();
