(function () {
    "use strict";

    const BENEFIT_ICONS = [
        `
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor"
        stroke-linecap="round" stroke-linejoin="round"
        aria-hidden="true">
        <circle cx="22" cy="22" r="13"></circle>
        <path d="m32 32 9 9"></path>
        <path d="M16 22h12"></path>
        <path d="M22 16v12"></path>
      </svg>
    `,
        `
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor"
        stroke-linecap="round" stroke-linejoin="round"
        aria-hidden="true">
        <rect x="7" y="9" width="34" height="27" rx="3"></rect>
        <path d="M7 17h34"></path>
        <path d="M14 24h12"></path>
        <path d="M14 30h20"></path>
        <path d="M19 41h10"></path>
        <path d="M24 36v5"></path>
      </svg>
    `,
        `
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor"
        stroke-linecap="round" stroke-linejoin="round"
        aria-hidden="true">
        <path d="M8 10h32v26H20l-8 7v-7H8z"></path>
        <path d="M15 19h18"></path>
        <path d="M15 26h12"></path>
      </svg>
    `,
        `
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor"
        stroke-linecap="round" stroke-linejoin="round"
        aria-hidden="true">
        <circle cx="16" cy="20" r="6"></circle>
        <circle cx="33" cy="20" r="6"></circle>
        <path d="M5 39c1-8 5-12 11-12s10 4 11 12"></path>
        <path d="M27 30c2-2 4-3 7-3 5 0 8 4 9 12"></path>
      </svg>
    `,
        `
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor"
        stroke-linecap="round" stroke-linejoin="round"
        aria-hidden="true">
        <circle cx="13" cy="24" r="4"></circle>
        <circle cx="24" cy="13" r="4"></circle>
        <circle cx="35" cy="24" r="4"></circle>
        <circle cx="24" cy="35" r="4"></circle>
        <path d="m16 21 5-5"></path>
        <path d="m27 16 5 5"></path>
        <path d="m32 27-5 5"></path>
        <path d="m21 32-5-5"></path>
      </svg>
    `,
        `
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor"
        stroke-linecap="round" stroke-linejoin="round"
        aria-hidden="true">
        <path d="M8 37V25"></path>
        <path d="M18 37V18"></path>
        <path d="M28 37V11"></path>
        <path d="M38 37V6"></path>
        <path d="M6 41h36"></path>
        <path d="m9 19 9-7 8 3 13-11"></path>
      </svg>
    `
    ];

    const CARD_VARIANTS = [
        "",
        "service-benefit-card--violet",
        "service-benefit-card--soft",
        "service-benefit-card--dark",
        "service-benefit-card--mixed",
        ""
    ];

    const SERVICE_BENEFITS = {
        "small-business-websites": [
            {
                title: "Clear Positioning",
                text: "Organize the page so visitors can understand the business, service context, location, and next step."
            },
            {
                title: "Mobile-First Structure",
                text: "Consider how navigation, content, forms, and actions work across smaller screens."
            },
            {
                title: "Inquiry Path",
                text: "Create a straightforward route from customer interest to a useful form, call, or booking action."
            },
            {
                title: "Local Trust Signals",
                text: "Present practical business information without relying on unsupported claims or decorative promises."
            },
            {
                title: "Content Priorities",
                text: "Focus attention on the information customers need before deciding whether to make contact."
            },
            {
                title: "Measurement Foundation",
                text: "Identify the customer actions that may be useful to measure after the website is launched."
            }
        ],

        "google-business-profile-setup": [
            {
                title: "Accurate Core Details",
                text: "Review the business name, category, location, service area, hours, and customer contact information."
            },
            {
                title: "Category Structure",
                text: "Explore categories that accurately reflect the business without adding unrelated service claims."
            },
            {
                title: "Service Visibility",
                text: "Organize public information so customers can understand the relevant services more clearly."
            },
            {
                title: "Customer Actions",
                text: "Connect profile discovery to calls, website visits, directions, bookings, or other suitable actions."
            },
            {
                title: "Review Workflow",
                text: "Consider a permission-aware process for requesting, organizing, and responding to customer feedback."
            },
            {
                title: "Profile Measurement",
                text: "Focus reporting on useful customer actions instead of decorative visibility numbers."
            }
        ],

        "online-booking-setup": [
            {
                title: "Service Selection",
                text: "Clarify which services can be booked online and which requests need a separate conversation."
            },
            {
                title: "Availability Rules",
                text: "Structure duration, preparation time, staff availability, capacity, and scheduling boundaries."
            },
            {
                title: "Confirmation Flow",
                text: "Make the next step clear after a customer selects an appointment or submits a booking request."
            },
            {
                title: "Reminder Planning",
                text: "Consider useful, permission-based reminders that support attendance without unnecessary messaging."
            },
            {
                title: "Website Connection",
                text: "Place booking actions where customers can find them without disrupting the rest of the journey."
            },
            {
                title: "Booking Measurement",
                text: "Identify the events that show completed, abandoned, rescheduled, or cancelled booking activity."
            }
        ],

        "lead-forms-call-tracking": [
            {
                title: "Focused Questions",
                text: "Collect the information needed for a useful response without making the form unnecessarily long."
            },
            {
                title: "Request Qualification",
                text: "Separate essential project context from questions that can be handled later in the conversation."
            },
            {
                title: "Clear Routing",
                text: "Define where inquiries should go and who is responsible for the next step."
            },
            {
                title: "Call Context",
                text: "Explore call tracking in a way that preserves clear customer communication and practical context."
            },
            {
                title: "Follow-Up Triggers",
                text: "Plan what should happen after a form submission, missed call, or qualified customer request."
            },
            {
                title: "Conversion Events",
                text: "Measure meaningful inquiry actions rather than treating every visit as a completed lead."
            }
        ],

        "review-management": [
            {
                title: "Request Timing",
                text: "Choose moments when a review request is relevant to the customer experience."
            },
            {
                title: "Consent and Tone",
                text: "Use respectful, permission-aware communication without pressure or misleading incentives."
            },
            {
                title: "Review Path",
                text: "Make it easier for customers to reach an appropriate public or private feedback option."
            },
            {
                title: "Team Workflow",
                text: "Clarify who monitors feedback, who responds, and when an issue needs internal attention."
            },
            {
                title: "Response Process",
                text: "Create a consistent approach for acknowledging feedback without sharing private customer details."
            },
            {
                title: "Feedback Signals",
                text: "Use recurring customer themes to identify possible service, communication, or process improvements."
            }
        ],

        "email-sms-automation": [
            {
                title: "Permission First",
                text: "Plan communication around appropriate consent, customer expectations, and relevant message types."
            },
            {
                title: "Useful Triggers",
                text: "Identify events that justify a message, such as an inquiry, booking, reminder, or status update."
            },
            {
                title: "Message Clarity",
                text: "Keep each message focused on one useful action instead of adding unnecessary promotional noise."
            },
            {
                title: "Audience Segments",
                text: "Separate communication by customer context rather than sending every message to every contact."
            },
            {
                title: "Follow-Up Logic",
                text: "Define what should happen when a customer responds, completes an action, or needs human support."
            },
            {
                title: "Performance Signals",
                text: "Review useful engagement and customer-action data without relying only on open-rate numbers."
            }
        ],

        "analytics-setup": [
            {
                title: "Meaningful Events",
                text: "Identify actions that correspond to real customer intent, such as calls, forms, and bookings."
            },
            {
                title: "Conversion Paths",
                text: "Understand which pages and steps customers use before completing an important action."
            },
            {
                title: "Channel Context",
                text: "Compare traffic sources without assuming that every visit has the same value or purpose."
            },
            {
                title: "Clean Tracking",
                text: "Reduce duplicate events, unclear naming, and measurements that cannot support a decision."
            },
            {
                title: "Practical Reporting",
                text: "Organize reporting around questions the business can actually act on."
            },
            {
                title: "Decision Signals",
                text: "Use measurement to identify friction, useful content, and possible next-step priorities."
            }
        ],

        "crm-setup": [
            {
                title: "Contact Structure",
                text: "Organize customer and inquiry information around the details the business actually needs."
            },
            {
                title: "Pipeline Stages",
                text: "Define clear stages that reflect how a request moves from first contact to the next outcome."
            },
            {
                title: "Ownership Rules",
                text: "Clarify who is responsible for each inquiry, task, update, or follow-up action."
            },
            {
                title: "Task Routing",
                text: "Create practical reminders and assignments without adding unnecessary workflow complexity."
            },
            {
                title: "System Connections",
                text: "Explore how forms, booking, communication, and analytics can pass useful context into the CRM."
            },
            {
                title: "Useful Reporting",
                text: "Focus CRM reporting on response needs, workflow status, and actionable customer context."
            }
        ]
    };

    const FALLBACK_BENEFITS = [
        {
            title: "Clear Starting Point",
            text: "Clarify the current setup, customer journey, and most important practical need."
        },
        {
            title: "Connected Structure",
            text: "Consider how this service connects with the website, inquiries, communication, and measurement."
        },
        {
            title: "Customer Path",
            text: "Review how customers discover the option and understand the next useful action."
        },
        {
            title: "Practical Workflow",
            text: "Organize responsibilities and follow-up around the way the business currently operates."
        },
        {
            title: "Compatibility Review",
            text: "Consider existing tools, technical constraints, content, data, and implementation requirements."
        },
        {
            title: "Next-Step Clarity",
            text: "Identify which questions or service categories may deserve attention before broader changes."
        }
    ];

    function getCurrentSlug() {
        const bodySlug =
            document.body.dataset.serviceSlug;

        if (bodySlug) {
            return bodySlug;
        }

        const fileName =
            window.location.pathname
                .split("/")
                .pop()
                .split("?")[0]
                .split("#")[0];

        return fileName.replace(/\.html$/i, "");
    }

    function getServiceName(slug) {
        const services =
            window.NEXLOCAL_CONFIG &&
                Array.isArray(window.NEXLOCAL_CONFIG.services)
                ? window.NEXLOCAL_CONFIG.services
                : [];

        const service =
            services.find(function (item) {
                return item.slug === slug;
            });

        return service
            ? service.name
            : "this service";
    }

    function createBenefitCard(item, index) {
        const card =
            document.createElement("article");

        card.className =
            "service-benefit-card " +
            CARD_VARIANTS[index % CARD_VARIANTS.length];

        card.setAttribute("data-reveal", "");

        const icon =
            document.createElement("div");

        icon.className =
            "service-benefit-card__icon";

        icon.setAttribute("aria-hidden", "true");
        icon.innerHTML =
            BENEFIT_ICONS[index % BENEFIT_ICONS.length];

        const number =
            document.createElement("span");

        number.className =
            "service-benefit-card__number";

        number.textContent =
            String(index + 1).padStart(2, "0");

        const title =
            document.createElement("h3");

        title.textContent =
            item.title;

        const text =
            document.createElement("p");

        text.textContent =
            item.text;

        const line =
            document.createElement("span");

        line.className =
            "service-benefit-card__line";

        line.setAttribute("aria-hidden", "true");

        card.append(
            icon,
            number,
            title,
            text,
            line
        );

        return card;
    }

    function initServiceBenefits() {
        const page =
            document.querySelector(".service-page");

        if (page) {
            page.dataset.ready = "true";
        }

        const section =
            document.querySelector("[data-service-benefits]");

        if (
            !section ||
            section.dataset.benefitsInitialized === "true"
        ) {
            return;
        }

        const grid =
            section.querySelector(
                "[data-service-benefits-grid]"
            );

        if (!grid) {
            return;
        }

        const slug =
            getCurrentSlug();

        const items =
            SERVICE_BENEFITS[slug] ||
            FALLBACK_BENEFITS;

        const serviceName =
            getServiceName(slug);

        const title =
            section.querySelector(
                "[data-service-benefits-title]"
            );

        if (title) {
            title.textContent =
                "Important considerations for " +
                serviceName;
        }

        const fragment =
            document.createDocumentFragment();

        items.forEach(function (item, index) {
            fragment.appendChild(
                createBenefitCard(item, index)
            );
        });

        grid.replaceChildren(fragment);

        section.dataset.benefitsInitialized =
            "true";
    }

    window.NEXLOCAL_PAGE_INITS =
        window.NEXLOCAL_PAGE_INITS || [];

    window.NEXLOCAL_PAGE_INITS.push(
        initServiceBenefits
    );

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initServiceBenefits,
            { once: true }
        );
    } else {
        initServiceBenefits();
    }
})();