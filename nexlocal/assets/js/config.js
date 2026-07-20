(function () {
  "use strict";

  const aggregatorDisclaimer = "Nexlocal is an independent digital setup information and inquiry platform. We do not directly perform every service listed. Submitted requests may be reviewed and, where appropriate, connected with independent service providers or technology specialists. Availability, scope, pricing and delivery terms vary by project, location and provider.";

  window.NEXLOCAL_CONFIG = {
    brand: {
      name: "Nexlocal",
      tagline: "A clearer digital foundation for local business.",
      shortDescription: "An independent platform helping local businesses explore practical website, visibility, booking, lead, analytics and communication setup options."
    },
    company: {
      legalName: "Nexlocal Platform LLC",
      email: "support@nexlocal.com",
      emailHref: "mailto:support@nexlocal.com",
      addressLine1: "2450 Lakeside Drive, Suite 210",
      cityStateZip: "Austin, TX 78704",
      country: "United States",
      fullAddress: "2450 Lakeside Drive, Suite 210, Austin, TX 78704, United States",
      mapHref: "https://maps.google.com/?q=2450%20Lakeside%20Drive%20Suite%20210%20Austin%20TX%2078704"
    },
    navigation: {
      header: [
        { label: "Home", href: "index.html" },
        { label: "About", href: "about.html" },
        { label: "Services", href: "all-services.html", children: true },
        { label: "Packages", href: "service-packages.html" },
        { label: "Digital Audit", href: "digital-audit.html" },
        { label: "Contact", href: "contact.html" }
      ],
      footer: [
        { label: "About", href: "about.html" },
        { label: "All Services", href: "all-services.html" },
        { label: "Setup Packages", href: "service-packages.html" },
        { label: "Digital Audit", href: "digital-audit.html" },
        { label: "Contact", href: "contact.html" }
      ]
    },
    services: [
      { name: "Small Business Websites", slug: "small-business-websites", href: "small-business-websites.html", short: "Clear, responsive websites and focused landing-page setup options." },
      { name: "Google Business Profile Setup", slug: "google-business-profile-setup", href: "google-business-profile-setup.html", short: "Profile structure, business information consistency and category guidance." },
      { name: "Online Booking Setup", slug: "online-booking-setup", href: "online-booking-setup.html", short: "Booking-flow options for appointment-led businesses." },
      { name: "Lead Forms & Call Tracking", slug: "lead-forms-call-tracking", href: "lead-forms-call-tracking.html", short: "Inquiry forms, routing and measurement for your own communication channels." },
      { name: "Review Management", slug: "review-management", href: "review-management.html", short: "Review request workflows, feedback organization and response pathways." },
      { name: "Email & SMS Automation", slug: "email-sms-automation", href: "email-sms-automation.html", short: "Permission-based follow-up and practical customer communication workflows." },
      { name: "Analytics Setup", slug: "analytics-setup", href: "analytics-setup.html", short: "Events, conversions, inquiry attribution and practical reporting foundations." },
      { name: "CRM Setup", slug: "crm-setup", href: "crm-setup.html", short: "Lead organization, pipeline structure, task routing and basic integrations." }
    ],
    packages: [
      { name: "Local Launch Foundation", slug: "local-launch-foundation", description: "A focused starting point for a clear website, inquiry capture and basic measurement." },
      { name: "Visibility & Booking", slug: "visibility-booking", description: "A connected pathway for local discovery, appointments and review requests." },
      { name: "Lead Flow Essentials", slug: "lead-flow-essentials", description: "A practical structure for landing pages, routed inquiries and follow-up." },
      { name: "Connected Operations", slug: "connected-operations", description: "A coordinated foundation for CRM, booking, communication and analytics." },
      { name: "Custom Digital Setup", slug: "custom-digital-setup", description: "A tailored combination for requirements that do not fit a standard pathway." }
    ],
    forms: {
      recipientPublic: "support@nexlocal.com",
      requestTypes: ["Request a Digital Audit", "Ask About a Service", "Request Package Information", "Advertise & Collaborate", "Discuss a Partnership", "General Inquiry"],
      requestMap: {
        "digital-audit": "Request a Digital Audit",
        "service": "Ask About a Service",
        "package-information": "Request Package Information",
        "advertise-collaborate": "Advertise & Collaborate",
        "partnership": "Discuss a Partnership",
        "general": "General Inquiry"
      },
      businessCategories: ["Restaurants & Cafes", "Salons & Wellness", "Clinics", "Home Services", "Retail", "Professional Services", "Other"],
      budgetOptions: ["Not sure yet", "Under $2,500", "$2,500–$5,000", "$5,000–$10,000", "$10,000+", "Prefer to discuss"],
      timelineOptions: ["Exploring options", "Within 1 month", "Within 1–3 months", "Within 3–6 months", "Flexible"],
      labels: {
        fullName: "Full Name", businessName: "Business Name", email: "Email", website: "Website URL (optional)", requestType: "Request Type", service: "Service of Interest", businessCategory: "Business Category", currentSetup: "Current Setup", budget: "Estimated Budget", timeline: "Desired Timeline", message: "Message / Goals", privacy: "I agree that Nexlocal may use the information submitted to review and respond to this inquiry."
      },
      successMessage: "Thank you. Your inquiry has been submitted successfully.",
      errorMessage: "Your message could not be sent. Please review the form and try again."
    },
    collaboration: {
      title: "Advertise & Collaborate",
      text: "We are always open to new opportunities, high-impact collaborations, and tailored business partnerships. Whether you want to advertise your brand to our audience, launch a joint project, or book our professional services, we are ready to bring your ideas to life. Every business is unique, and we don't believe in one-size-fits-all solutions. Please reach out to us using the contact form below, tell us a bit about your goals, and our team will get back to you with an exclusive, custom-tailored proposal designed strictly for your budget and objectives. Let’s build something great together."
    },
    legal: {
      aggregatorDisclaimer,
      privacyHref: "privacy-policy.html",
      termsHref: "terms-of-service.html",
      cookieHref: "cookie-policy.html",
      lastUpdated: "July 20, 2026"
    },
    cookie: {
      message: "Nexlocal stores your consent preference in this browser. Optional analytics are not loaded unless you accept, and no analytics tool is currently configured.",
      acceptLabel: "Accept",
      rejectLabel: "Decline",
      settingsLabel: "Cookie settings"
    },
    social: { linkedin: "", instagram: "", facebook: "" },
    footer: {
      description: "Clearer digital setup pathways for local businesses—organized through one independent information and inquiry platform.",
      copyright: "© 2026 Nexlocal Platform LLC. All rights reserved."
    },
    cta: {
      primary: "Request a Digital Audit",
      secondary: "Explore Services",
      contact: "Send an Inquiry",
      packages: "Explore Setup Packages",
      recurringHeading: "Bring the essential parts of your digital setup into focus.",
      recurringText: "Share your context and explore a clearer pathway for the systems your business may need."
    },
    seo: {
      defaultTitle: "Nexlocal | Digital Setup Options for Local Businesses",
      defaultDescription: "Explore practical website, booking, visibility, lead, review, analytics and customer communication setup options for local businesses."
    }
  };
})();
