(function () {
  "use strict";

  const config = window.NEXLOCAL_CONFIG || {};
  const serviceItems = Array.isArray(config.services) ? config.services : [];

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
  }

  function currentFile() {
    const value = window.location.pathname.split("/").pop();
    return value || "index.html";
  }

  function arrowIcon() {
    return '<svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>';
  }

  function cubeMark() {
    return '<img src="assets/icons/nexlocal-mark.svg" width="48" height="48" alt="" aria-hidden="true">';
  }

  function renderHeader() {
    const mount = document.querySelector("[data-site-header]");
    if (!mount) return;

    const page = currentFile();
    const servicesOpen = page === "all-services.html" || serviceItems.some((item) => item.href === page);
    const navItems = (config.navigation && config.navigation.header || []).map((item) => {
      if (item.children) {
        return `<li class="nl-nav__item nl-nav__item--services">
          <div class="nl-nav__service-link"><a href="${escapeHtml(item.href)}" ${servicesOpen ? 'aria-current="page"' : ""}>${escapeHtml(item.label)}</a><button class="nl-nav__dropdown-toggle" type="button" aria-expanded="false" aria-controls="services-dropdown" data-services-toggle><span class="nl-sr-only">Open services menu</span><svg aria-hidden="true" viewBox="0 0 16 16"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button></div>
          <div class="nl-services-dropdown" id="services-dropdown" hidden data-services-dropdown>
            <div class="nl-services-dropdown__intro"><span>Explore the system</span><strong>Eight practical setup pathways.</strong><a href="all-services.html">View all services ${arrowIcon()}</a></div>
            <ul>${serviceItems.map((service, index) => `<li><a href="${escapeHtml(service.href)}"><span>0${index + 1}</span><span><strong>${escapeHtml(service.name)}</strong><small>${escapeHtml(service.short)}</small></span>${arrowIcon()}</a></li>`).join("")}</ul>
          </div>
        </li>`;
      }
      const active = item.href === page;
      return `<li class="nl-nav__item"><a href="${escapeHtml(item.href)}" ${active ? 'aria-current="page"' : ""}>${escapeHtml(item.label)}</a></li>`;
    }).join("");

    mount.innerHTML = `<a class="nl-skip-link" href="#main-content">Skip to main content</a>
      <header class="nl-header" data-header>
        <div class="nl-container nl-header__inner">
          <a class="nl-logo" href="index.html" aria-label="Nexlocal home"><img src="assets/icons/nexlocal-logo.svg" width="184" height="44" alt="Nexlocal"></a>
          <nav class="nl-nav" aria-label="Primary navigation"><ul>${navItems}</ul></nav>
          <a class="nl-button nl-button--primary nl-header__cta" href="digital-audit.html">${escapeHtml(config.cta && config.cta.primary || "Request a Digital Audit")}${arrowIcon()}</a>
          <button class="nl-menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle><span></span><span></span><span class="nl-sr-only">Open menu</span></button>
        </div>
      </header>
      <div class="nl-mobile-menu" id="mobile-menu" aria-hidden="true" data-mobile-menu>
        <div class="nl-mobile-menu__backdrop" data-menu-close></div>
        <div class="nl-mobile-menu__panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div class="nl-mobile-menu__top"><a class="nl-logo" href="index.html"><img src="assets/icons/nexlocal-logo.svg" width="184" height="44" alt="Nexlocal"></a><button class="nl-menu-close" type="button" data-menu-close aria-label="Close menu"><span></span><span></span></button></div>
          <nav aria-label="Mobile navigation"><ul class="nl-mobile-menu__main">${(config.navigation && config.navigation.header || []).map((item) => item.children ? `<li><button type="button" aria-expanded="false" aria-controls="mobile-services" data-mobile-services-toggle>Services <span>+</span></button><ul id="mobile-services" hidden>${serviceItems.map((service) => `<li><a href="${escapeHtml(service.href)}">${escapeHtml(service.name)}</a></li>`).join("")}</ul></li>` : `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`).join("")}</ul></nav>
          <div class="nl-mobile-menu__footer"><a href="${escapeHtml(config.company && config.company.emailHref || "")}">${escapeHtml(config.company && config.company.email || "")}</a><a class="nl-button nl-button--primary" href="digital-audit.html">Request a Digital Audit ${arrowIcon()}</a><div><a href="privacy-policy.html">Privacy</a><a href="terms-of-service.html">Terms</a><a href="cookie-policy.html">Cookies</a></div></div>
        </div>
      </div>`;
  }

  function renderFooter() {
    const mount = document.querySelector("[data-site-footer]");
    if (!mount) return;
    const company = config.company || {};
    const legal = config.legal || {};
    mount.innerHTML = `<footer class="nl-footer">
      <div class="nl-container">
        <div class="nl-footer__lead"><div><span class="nl-eyebrow nl-eyebrow--light">Ready for a clearer path?</span><h2>${escapeHtml(config.cta && config.cta.recurringHeading || "Connect what matters.")}</h2></div><a class="nl-button nl-button--primary" href="contact.html?request=digital-audit">Start an inquiry ${arrowIcon()}</a></div>
        <div class="nl-footer__grid">
          <div class="nl-footer__brand"><img src="assets/icons/nexlocal-logo.svg" width="214" height="51" alt="Nexlocal"><p>${escapeHtml(config.footer && config.footer.description || "")}</p>${cubeMark()}</div>
          <div><h3>Services</h3><ul>${serviceItems.slice(0, 5).map((item) => `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.name)}</a></li>`).join("")}</ul></div>
          <div><h3>Platform</h3><ul>${(config.navigation && config.navigation.footer || []).map((item) => `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`).join("")}</ul></div>
          <div><h3>Connect</h3><a class="nl-footer__email" href="${escapeHtml(company.emailHref || "")}">${escapeHtml(company.email || "")}</a><address>${escapeHtml(company.addressLine1 || "")}<br>${escapeHtml(company.cityStateZip || "")}<br>${escapeHtml(company.country || "")}</address><a class="nl-text-link" href="${escapeHtml(company.mapHref || "")}" target="_blank" rel="noopener">View map ${arrowIcon()}</a></div>
        </div>
        <p class="nl-footer__disclaimer">${escapeHtml(legal.aggregatorDisclaimer || "")}</p>
        <div class="nl-footer__bottom"><span>${escapeHtml(config.footer && config.footer.copyright || "")}</span><div><a href="privacy-policy.html">Privacy</a><a href="terms-of-service.html">Terms</a><a href="cookie-policy.html">Cookies</a><button type="button" data-cookie-reset>Cookie settings</button></div></div>
      </div>
    </footer>`;
  }

  function resolveConfigPath(path) {
    return String(path || "").split(".").reduce((value, key) => value && value[key], config);
  }

  function injectConfigValues() {
    document.querySelectorAll("[data-config-text]").forEach((node) => {
      const value = resolveConfigPath(node.dataset.configText);
      if (typeof value === "string") node.textContent = value;
    });
    document.querySelectorAll("[data-config-href]").forEach((node) => {
      const value = resolveConfigPath(node.dataset.configHref);
      if (typeof value === "string" && /^(https?:|mailto:|[a-z0-9./?=&_-]+$)/i.test(value)) node.setAttribute("href", value);
    });
  }

  function initHeader() {
    const header = document.querySelector("[data-header]");
    const menu = document.querySelector("[data-mobile-menu]");
    const menuToggle = document.querySelector("[data-menu-toggle]");
    let previousFocus = null;

    if (header) {
      const updateHeader = () => header.classList.toggle("is-compact", window.scrollY > 18);
      updateHeader();
      window.addEventListener("scroll", updateHeader, { passive: true });
    }

    const servicesToggle = document.querySelector("[data-services-toggle]");
    const servicesDropdown = document.querySelector("[data-services-dropdown]");
    const closeServices = () => {
      if (!servicesToggle || !servicesDropdown) return;
      servicesToggle.setAttribute("aria-expanded", "false");
      servicesDropdown.hidden = true;
    };
    if (servicesToggle && servicesDropdown) {
      servicesToggle.addEventListener("click", () => {
        const open = servicesToggle.getAttribute("aria-expanded") === "true";
        servicesToggle.setAttribute("aria-expanded", String(!open));
        servicesDropdown.hidden = open;
      });
      document.addEventListener("click", (event) => {
        if (!event.target.closest(".nl-nav__item--services")) closeServices();
      });
    }

    const openMenu = () => {
      if (!menu || !menuToggle) return;
      previousFocus = document.activeElement;
      menu.classList.add("is-open");
      menu.setAttribute("aria-hidden", "false");
      menuToggle.setAttribute("aria-expanded", "true");
      document.documentElement.classList.add("has-menu-open");
      const first = menu.querySelector("button, a");
      if (first) first.focus();
    };
    const closeMenu = () => {
      if (!menu || !menuToggle) return;
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
      menuToggle.setAttribute("aria-expanded", "false");
      document.documentElement.classList.remove("has-menu-open");
      if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
    };
    if (menuToggle && menu) {
      menuToggle.addEventListener("click", openMenu);
      menu.querySelectorAll("[data-menu-close]").forEach((node) => node.addEventListener("click", closeMenu));
      menu.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
        if (event.key !== "Tab") return;
        const focusable = Array.from(menu.querySelectorAll("a[href], button:not([disabled])")).filter((node) => !node.closest("[hidden]"));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      });
    }
    const mobileServicesToggle = document.querySelector("[data-mobile-services-toggle]");
    if (mobileServicesToggle) {
      mobileServicesToggle.addEventListener("click", () => {
        const target = document.getElementById(mobileServicesToggle.getAttribute("aria-controls"));
        const open = mobileServicesToggle.getAttribute("aria-expanded") === "true";
        mobileServicesToggle.setAttribute("aria-expanded", String(!open));
        if (target) target.hidden = open;
      });
    }
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") { closeServices(); if (menu && menu.classList.contains("is-open")) closeMenu(); }
    });
  }

  function initCookieConsent() {
    const key = "nexlocal-cookie-consent";
    let saved = null;
    try { saved = localStorage.getItem(key); } catch (error) { saved = null; }
    const banner = document.createElement("aside");
    banner.className = "nl-cookie";
    banner.setAttribute("aria-label", "Cookie consent");
    banner.hidden = Boolean(saved);
    banner.innerHTML = `<div><strong>Cookie preference</strong><p>${escapeHtml(config.cookie && config.cookie.message || "")}</p><a href="cookie-policy.html">Cookie Policy</a></div><div class="nl-cookie__actions"><button class="nl-button nl-button--outline" type="button" data-cookie-choice="declined">${escapeHtml(config.cookie && config.cookie.rejectLabel || "Decline")}</button><button class="nl-button nl-button--primary" type="button" data-cookie-choice="accepted">${escapeHtml(config.cookie && config.cookie.acceptLabel || "Accept")}</button></div>`;
    document.body.appendChild(banner);
    banner.querySelectorAll("[data-cookie-choice]").forEach((button) => button.addEventListener("click", () => {
      try { localStorage.setItem(key, button.dataset.cookieChoice); } catch (error) { }
      banner.hidden = true;
    }));
    window.NexlocalCookieConsent = {
      reset() {
        try { localStorage.removeItem(key); } catch (error) { }
        banner.hidden = false;
        const firstButton = banner.querySelector("button");
        if (firstButton) firstButton.focus();
      }
    };
    document.querySelectorAll("[data-cookie-reset]").forEach((button) => button.addEventListener("click", window.NexlocalCookieConsent.reset));
  }

  function initAccordions() {
    document.querySelectorAll("[data-accordion]").forEach((root) => {
      if (root.dataset.initialized === "true") return;
      root.dataset.initialized = "true";
      const single = root.dataset.accordion !== "multi";
      const buttons = Array.from(root.querySelectorAll("[data-accordion-button]"));
      buttons.forEach((button) => {
        const panel = document.getElementById(button.getAttribute("aria-controls"));
        if (!panel) return;
        const sync = (expanded) => {
          button.setAttribute("aria-expanded", String(expanded));
          panel.hidden = !expanded;
        };
        sync(button.getAttribute("aria-expanded") === "true");
        button.addEventListener("click", () => {
          const open = button.getAttribute("aria-expanded") === "true";
          if (single && !open) buttons.forEach((other) => {
            const otherPanel = document.getElementById(other.getAttribute("aria-controls"));
            other.setAttribute("aria-expanded", "false");
            if (otherPanel) otherPanel.hidden = true;
          });
          sync(!open);
        });
      });
    });
  }

  function initReveal() {
    const nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    document.documentElement.classList.add("has-reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { rootMargin: "0px 0px -8%", threshold: 0.08 });
    nodes.forEach((node) => observer.observe(node));
  }

  function initAos() {
    if (!window.AOS || typeof window.AOS.init !== "function") return;
    document.documentElement.classList.add("has-aos");
    window.AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      anchorPlacement: "top-bottom",
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
    });
  }

  function runPageInitializers() {
    const initializers = Array.isArray(window.NEXLOCAL_PAGE_INITS) ? window.NEXLOCAL_PAGE_INITS : [];
    initializers.forEach((initializer) => { if (typeof initializer === "function") initializer(); });
  }

  function boot() {
    renderHeader();
    renderFooter();
    injectConfigValues();
    initHeader();
    initAccordions();
    initCookieConsent();
    initReveal();
    initAos();
    runPageInitializers();
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
