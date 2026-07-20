(function () {
  "use strict";
  window.NEXLOCAL_PAGE_INITS = window.NEXLOCAL_PAGE_INITS || [];

  window.NEXLOCAL_PAGE_INITS.push(function initContact() {
    const form = document.querySelector("[data-contact-form]");
    if (!form || form.dataset.initialized === "true") return;
    form.dataset.initialized = "true";

    const config = window.NEXLOCAL_CONFIG || {};
    const forms = config.forms || {};
    const requestSelect = form.elements.requestType;
    const serviceSelect = form.elements.service;
    const summary = document.querySelector("[data-form-summary]");
    const status = form.querySelector("[data-form-status]");
    const submitButton = form.querySelector("[data-submit-button]");

    function populateSelect(select, values, placeholder, mapValue) {
      if (!select || !Array.isArray(values) || !values.length) return;
      const previous = select.value;
      select.textContent = "";
      const empty = document.createElement("option");
      empty.value = "";
      empty.textContent = placeholder;
      select.appendChild(empty);
      values.forEach((value) => {
        const option = document.createElement("option");
        option.value = typeof mapValue === "function" ? mapValue(value) : value;
        option.textContent = typeof value === "string" ? value : value.name;
        select.appendChild(option);
      });
      if (Array.from(select.options).some((option) => option.value === previous)) select.value = previous;
    }

    populateSelect(requestSelect, forms.requestTypes, "Choose a request type");
    const services = Array.isArray(config.services) ? config.services.slice() : [];
    services.push({ name: "Not sure yet", slug: "not-sure" });
    populateSelect(serviceSelect, services, "Choose a service", (service) => service.slug);
    populateSelect(form.elements.businessCategory, forms.businessCategories, "Choose a category");
    populateSelect(form.elements.budget, forms.budgetOptions, "Choose a range");
    populateSelect(form.elements.timeline, forms.timelineOptions, "Choose a timeline");

    const params = new URLSearchParams(window.location.search);
    const requestKey = params.get("request");
    const serviceKey = params.get("service");
    const requestValue = forms.requestMap && forms.requestMap[requestKey];
    if (requestValue && requestSelect && Array.from(requestSelect.options).some((option) => option.value === requestValue)) requestSelect.value = requestValue;
    if (serviceKey && serviceSelect && Array.from(serviceSelect.options).some((option) => option.value === serviceKey)) serviceSelect.value = serviceKey;
    if (form.elements.sourcePage) form.elements.sourcePage.value = `${window.location.pathname}${window.location.search}`.slice(0, 300);

    document.querySelectorAll("[data-request-path]").forEach((button) => button.addEventListener("click", () => {
      const value = button.dataset.requestPath;
      if (requestSelect && Array.from(requestSelect.options).some((option) => option.value === value)) requestSelect.value = value;
      document.getElementById("inquiry-form").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      requestSelect.focus({ preventScroll: true });
    }));

    const fieldRules = {
      fullName: (value) => value.trim().length >= 2 ? "" : "Enter your full name.",
      businessName: (value) => value.trim().length >= 2 ? "" : "Enter the business name.",
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Enter a valid email address.",
      website: (value) => {
        if (!value.trim()) return "";
        try { const url = new URL(value); return /^https?:$/.test(url.protocol) ? "" : "Enter a valid website URL."; } catch (error) { return "Enter a valid website URL."; }
      },
      requestType: (value) => Array.isArray(forms.requestTypes) && forms.requestTypes.includes(value) ? "" : "Choose a request type.",
      service: (value) => services.some((service) => service.slug === value) ? "" : "Choose a service of interest.",
      businessCategory: (value) => Array.isArray(forms.businessCategories) && forms.businessCategories.includes(value) ? "" : "Choose a business category.",
      currentSetup: (value) => value.trim().length >= 5 ? "" : "Briefly describe the current setup.",
      budget: (value) => Array.isArray(forms.budgetOptions) && forms.budgetOptions.includes(value) ? "" : "Choose an estimated budget range.",
      timeline: (value) => Array.isArray(forms.timelineOptions) && forms.timelineOptions.includes(value) ? "" : "Choose a desired timeline.",
      message: (value) => value.trim().length >= 20 ? "" : "Add at least 20 characters about your goals.",
      privacy: (_, field) => field.checked ? "" : "Privacy consent is required."
    };

    function validateField(field) {
      const rule = fieldRules[field.name];
      if (!rule) return "";
      const message = rule(field.value || "", field);
      const error = document.getElementById(`${field.name}-error`);
      field.setAttribute("aria-invalid", String(Boolean(message)));
      if (error) error.textContent = message;
      return message;
    }

    Object.keys(fieldRules).forEach((name) => {
      const field = form.elements[name];
      if (!field) return;
      field.addEventListener(field.type === "checkbox" || field.tagName === "SELECT" ? "change" : "blur", () => validateField(field));
    });

    function validateForm() {
      const errors = [];
      Object.keys(fieldRules).forEach((name) => {
        const field = form.elements[name];
        if (!field) return;
        const message = validateField(field);
        if (message) errors.push({ field, message });
      });
      if (summary) {
        summary.hidden = errors.length === 0;
        summary.innerHTML = errors.length ? `<strong>Please review ${errors.length} field${errors.length === 1 ? "" : "s"}.</strong><ul>${errors.map((error) => `<li>${error.message}</li>`).join("")}</ul>` : "";
      }
      if (errors.length) {
        if (summary) summary.focus();
        errors[0].field.focus();
      }
      return errors.length === 0;
    }

    form.addEventListener("submit", async (event) => {
      if (!validateForm()) { event.preventDefault(); return; }
      if (!window.fetch) return;
      event.preventDefault();
      submitButton.disabled = true;
      submitButton.setAttribute("aria-busy", "true");
      status.textContent = "Sending your inquiry…";
      status.className = "nl-form__status";
      try {
        const response = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { "Accept": "application/json" } });
        let payload = {};
        try { payload = await response.json(); } catch (error) { payload = {}; }
        if (!response.ok || !payload.success) throw new Error(payload.message || forms.errorMessage || "The inquiry could not be sent.");
        status.textContent = payload.message || forms.successMessage || "Thank you. Your inquiry has been submitted successfully.";
        status.classList.add("is-success");
        form.reset();
        if (summary) { summary.hidden = true; summary.textContent = ""; }
        Object.keys(fieldRules).forEach((name) => { const field = form.elements[name]; if (field) field.setAttribute("aria-invalid", "false"); });
      } catch (error) {
        status.textContent = error.message || forms.errorMessage || "Your message could not be sent. Please review the form and try again.";
        status.classList.add("is-error");
      } finally {
        submitButton.disabled = false;
        submitButton.removeAttribute("aria-busy");
        status.focus?.();
      }
    });
  });
})();
