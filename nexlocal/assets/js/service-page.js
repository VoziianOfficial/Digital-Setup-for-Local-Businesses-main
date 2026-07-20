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

(function () {
    "use strict";

    const SERVICE_FOCUS_CONTENT = {
        "small-business-websites": {
            eyebrow: "A clearer website direction",
            title: "Build around what customers need to understand first.",
            lead:
                "A useful business website should make the offer, location, context, and next step easier to understand.",
            text:
                "The structure can be shaped around real customer questions instead of unnecessary sections or decorative features. Content, navigation, mobile behavior, inquiry paths, and measurement should support the same clear journey.",
            points: [
                "Explain the business and service context without unnecessary complexity.",
                "Create a clear mobile journey from discovery to contact.",
                "Connect important customer actions with practical measurement."
            ],
            image: "assets/images/home/card-6.jpg",
            alt: "Local business team reviewing a website and customer journey"
        },

        "google-business-profile-setup": {
            eyebrow: "From local discovery to action",
            title: "Make public business information easier to trust and use.",
            lead:
                "A local profile should help customers confirm the essential details and understand the next suitable action.",
            text:
                "The setup may include categories, public details, service information, website connections, booking pathways, review workflows, and useful measurement questions. Accuracy and relevance matter more than filling every available field.",
            points: [
                "Organize accurate business, location, service, and contact details.",
                "Connect profile discovery to the most relevant customer action.",
                "Plan review and measurement workflows around real activity."
            ],
            image: "assets/images/home/card-7.jpg",
            alt: "Local business owner reviewing public business information"
        },

        "online-booking-setup": {
            eyebrow: "A clearer appointment pathway",
            title: "Shape booking around real services and availability.",
            lead:
                "Online booking should reduce uncertainty without forcing every customer request into the same process.",
            text:
                "Service types, appointment duration, staff availability, preparation time, confirmation, rescheduling, reminders, and website placement all influence whether the booking journey feels useful.",
            points: [
                "Define which services and request types can be booked online.",
                "Clarify availability, confirmation, and scheduling boundaries.",
                "Connect booking actions with the wider customer journey."
            ],
            image: "assets/images/home/card-8.jpg",
            alt: "Business owner organizing an online appointment schedule"
        },

        "lead-forms-call-tracking": {
            eyebrow: "From customer interest to context",
            title: "Collect enough information for a more useful response.",
            lead:
                "A lead pathway should help the customer take action while giving the business enough context for the next step.",
            text:
                "The right structure may include focused forms, inquiry qualification, routing, call context, follow-up triggers, and meaningful conversion events without making the contact journey unnecessarily long.",
            points: [
                "Ask focused questions that support a useful response.",
                "Route forms and calls to a clear owner or workflow.",
                "Measure meaningful inquiries rather than decorative activity."
            ],
            image: "assets/images/home/card-9.jpg",
            alt: "Local business owner organizing customer inquiries"
        },

        "review-management": {
            eyebrow: "A clearer feedback workflow",
            title: "Build review requests around timing, relevance, and respect.",
            lead:
                "Customer feedback is more useful when the request process fits the experience and does not create unnecessary pressure.",
            text:
                "Review timing, message tone, permission, public and private feedback paths, internal responsibility, and response practices can be organized into one clearer workflow.",
            points: [
                "Choose appropriate moments for customer feedback requests.",
                "Keep communication clear, relevant, and permission-aware.",
                "Organize monitoring, responses, and internal follow-up."
            ],
            image: "assets/images/home/card-10.jpg",
            alt: "Business owner reviewing customer feedback information"
        },

        "email-sms-automation": {
            eyebrow: "Communication with a clear purpose",
            title: "Send useful messages at the moments that matter.",
            lead:
                "Email and SMS workflows should support a defined customer action instead of adding unnecessary communication.",
            text:
                "Triggers, audience context, consent, message purpose, follow-up logic, and human handoff all affect whether an automated workflow remains useful and understandable.",
            points: [
                "Define permission-aware triggers for each message type.",
                "Keep every message focused on one useful customer action.",
                "Plan what happens after a response or completed step."
            ],
            image: "assets/images/home/card-11.jpg",
            alt: "Business owner planning customer communication workflows"
        },

        "analytics-setup": {
            eyebrow: "Measurement with practical context",
            title: "Track the customer actions that support real decisions.",
            lead:
                "Useful analytics begins with business questions, not with collecting every available number.",
            text:
                "Calls, forms, bookings, customer paths, channel context, event naming, and reporting can be organized around actions the business can understand and use.",
            points: [
                "Identify events that represent meaningful customer intent.",
                "Reduce duplicated, unclear, or decorative tracking.",
                "Build reporting around questions the business can act on."
            ],
            image: "assets/images/home/card-12.jpg",
            alt: "Business manager reviewing analytics and customer activity"
        },

        "crm-setup": {
            eyebrow: "Customer context in one workflow",
            title: "Organize inquiries around ownership and the next action.",
            lead:
                "A CRM structure should make it easier to see who needs attention, what has happened, and what should happen next.",
            text:
                "Contact information, pipeline stages, responsibility, tasks, forms, booking, communication, and analytics connections can be organized around the way the business actually operates.",
            points: [
                "Define clear stages for inquiries and customer activity.",
                "Assign ownership for responses, tasks, and follow-up.",
                "Connect useful context from forms, booking, and communication."
            ],
            image: "assets/images/home/card-13.jpg",
            alt: "Business manager reviewing CRM and customer workflow information"
        }
    };

    const FALLBACK_CONTENT = {
        eyebrow: "A clearer digital direction",
        title: "Choose what matters to your business and your customers.",
        lead:
            "Focus on the part of the digital experience that creates the most useful change for customers and the business.",
        text:
            "The right setup depends on the current workflow, customer journey, technical constraints, and the actions the business wants to make clearer.",
        points: [
            "Review the current customer journey.",
            "Identify practical friction and priorities.",
            "Explore a suitable next-step pathway."
        ],
        image: "assets/images/home/card-14.jpg",
        alt: "Local business team reviewing digital setup priorities"
    };

    function getServiceFocusSlug() {
        const bodySlug = document.body.dataset.serviceSlug;

        if (bodySlug) {
            return bodySlug;
        }

        const fileName = window.location.pathname
            .split("/")
            .pop()
            .split("?")[0]
            .split("#")[0];

        return fileName.replace(/\.html$/i, "");
    }

    function setServiceFocusText(section, selector, value) {
        const element = section.querySelector(selector);

        if (element && value) {
            element.textContent = value;
        }
    }

    function initServiceFocus() {
        const section = document.querySelector("[data-service-focus]");

        if (
            !section ||
            section.dataset.focusInitialized === "true"
        ) {
            return;
        }

        const slug = getServiceFocusSlug();

        const content =
            SERVICE_FOCUS_CONTENT[slug] ||
            FALLBACK_CONTENT;

        setServiceFocusText(
            section,
            "[data-service-focus-eyebrow]",
            content.eyebrow
        );

        setServiceFocusText(
            section,
            "[data-service-focus-title]",
            content.title
        );

        setServiceFocusText(
            section,
            "[data-service-focus-lead]",
            content.lead
        );

        setServiceFocusText(
            section,
            "[data-service-focus-text]",
            content.text
        );

        const image = section.querySelector(
            "[data-service-focus-image]"
        );

        if (image) {
            image.src = content.image;
            image.alt = content.alt;
        }

        const points = section.querySelector(
            "[data-service-focus-points]"
        );

        if (points) {
            const fragment =
                document.createDocumentFragment();

            content.points.forEach(function (text, index) {
                const item = document.createElement("li");
                const number = document.createElement("span");
                const paragraph = document.createElement("p");

                number.textContent =
                    String(index + 1).padStart(2, "0");

                paragraph.textContent = text;

                item.append(number, paragraph);
                fragment.appendChild(item);
            });

            points.replaceChildren(fragment);
        }

        const cta = section.querySelector(
            "[data-service-focus-cta]"
        );

        if (cta) {
            cta.href =
                "contact.html?request=service&service=" +
                encodeURIComponent(slug);
        }

        section.dataset.focusInitialized = "true";
    }

    window.NEXLOCAL_PAGE_INITS =
        window.NEXLOCAL_PAGE_INITS || [];

    window.NEXLOCAL_PAGE_INITS.push(
        initServiceFocus
    );

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initServiceFocus,
            { once: true }
        );
    } else {
        initServiceFocus();
    }
})();

(function () {
    "use strict";

    const SERVICE_GUIDANCE = {
        "small-business-websites": {
            title: "What a business website",
            accent: "should clarify",
            image: "assets/images/home/card-1.jpg",
            alt: "Local business team reviewing website priorities",

            slides: [
                {
                    label: "Website clarity",
                    text:
                        "A useful website should help a new visitor understand the business, service context, location, and next suitable action without needing to search through unnecessary content."
                },
                {
                    label: "Customer journey",
                    text:
                        "Navigation, mobile layout, calls to action, forms, and supporting information should work as one connected path rather than as separate decorative elements."
                },
                {
                    label: "Practical measurement",
                    text:
                        "Website analytics are most useful when they focus on customer actions such as calls, inquiries, bookings, directions, or other meaningful next steps."
                }
            ]
        },

        "google-business-profile-setup": {
            title: "What local profile setup",
            accent: "should clarify",
            image: "assets/images/home/card-2.jpg",
            alt: "Local business owner reviewing profile information",

            slides: [
                {
                    label: "Accurate information",
                    text:
                        "The profile should present consistent business details, relevant categories, location or service-area information, operating hours, and suitable customer contact options."
                },
                {
                    label: "Discovery pathway",
                    text:
                        "Local discovery should connect customers with a useful next step, such as visiting the website, calling, requesting directions, or beginning a booking journey."
                },
                {
                    label: "Review workflow",
                    text:
                        "Review requests and responses should be organized around timing, relevance, customer consent, and clear internal responsibility."
                }
            ]
        },

        "online-booking-setup": {
            title: "What online booking",
            accent: "should simplify",
            image: "assets/images/home/card-3.jpg",
            alt: "Business owner reviewing appointment availability",

            slides: [
                {
                    label: "Service selection",
                    text:
                        "Customers should be able to understand which services can be booked directly and which requests require a separate conversation or qualification step."
                },
                {
                    label: "Availability rules",
                    text:
                        "Duration, preparation time, staff capacity, working hours, confirmation, and scheduling boundaries should reflect the way the business actually operates."
                },
                {
                    label: "Customer confirmation",
                    text:
                        "After a booking action, the customer should clearly understand whether the appointment is confirmed, pending, or waiting for additional information."
                }
            ]
        },

        "lead-forms-call-tracking": {
            title: "What an inquiry pathway",
            accent: "should collect",
            image:
                "assets/images/home/card-4.jpg",
            alt: "Business owner reviewing customer inquiry information",

            slides: [
                {
                    label: "Focused forms",
                    text:
                        "A useful inquiry form collects enough context for an appropriate response without creating unnecessary fields or making the customer journey feel difficult."
                },
                {
                    label: "Clear routing",
                    text:
                        "Each form submission or tracked call should have a clear destination, responsible owner, and practical next action."
                },
                {
                    label: "Meaningful conversion",
                    text:
                        "Measurement should distinguish meaningful customer requests from general visits, accidental actions, or incomplete contact attempts."
                }
            ]
        },

        "review-management": {
            title: "What a feedback workflow",
            accent: "should respect",
            image: "assets/images/home/card-5.jpg",
            alt: "Business owner reviewing customer feedback",

            slides: [
                {
                    label: "Appropriate timing",
                    text:
                        "A review request should be connected to a relevant customer experience rather than being sent automatically without useful context."
                },
                {
                    label: "Clear communication",
                    text:
                        "Feedback requests should remain respectful, permission-aware, easy to understand, and free from misleading pressure or unsupported incentives."
                },
                {
                    label: "Internal responsibility",
                    text:
                        "The business should know who monitors new feedback, who prepares responses, and when an issue needs internal follow-up."
                }
            ]
        },

        "email-sms-automation": {
            title: "What automated communication",
            accent: "should support",
            image:
                "assets/images/home/card-6.jpg",
            alt: "Business owner planning customer communication",

            slides: [
                {
                    label: "Permission first",
                    text:
                        "Email and SMS workflows should be planned around appropriate consent, customer expectations, and a clearly defined reason for each message."
                },
                {
                    label: "Useful triggers",
                    text:
                        "A message should be connected to a meaningful event such as an inquiry, appointment, reminder, status update, or required customer action."
                },
                {
                    label: "Human handoff",
                    text:
                        "Automation should make it clear when a customer response requires personal attention instead of continuing through an unsuitable automated sequence."
                }
            ]
        },

        "analytics-setup": {
            title: "What useful analytics",
            accent: "should reveal",
            image:
                "assets/images/home/card-7.jpg",
            alt: "Business manager reviewing analytics information",

            slides: [
                {
                    label: "Meaningful actions",
                    text:
                        "Analytics should focus on events that represent real customer intent, including calls, completed forms, bookings, directions, and other practical actions."
                },
                {
                    label: "Clean structure",
                    text:
                        "Clear event names and consistent tracking reduce duplicated data, confusing reports, and measurements that cannot support a business decision."
                },
                {
                    label: "Decision context",
                    text:
                        "Reporting becomes more useful when it helps identify customer friction, effective content, and areas that may deserve further attention."
                }
            ]
        },

        "crm-setup": {
            title: "What a CRM workflow",
            accent: "should organize",
            image:
                "assets/images/home/card-8.jpg",
            alt: "Business manager reviewing customer workflow information",

            slides: [
                {
                    label: "Pipeline clarity",
                    text:
                        "CRM stages should reflect how inquiries actually move through the business instead of copying a generic pipeline that does not match the workflow."
                },
                {
                    label: "Clear ownership",
                    text:
                        "Every active inquiry, follow-up task, or customer update should have a clear owner and an understandable next action."
                },
                {
                    label: "Connected context",
                    text:
                        "Forms, bookings, communication, analytics, and customer notes should provide useful context without creating unnecessary duplication."
                }
            ]
        }
    };

    const FALLBACK_GUIDANCE = {
        title: "What this digital service",
        accent: "should clarify",
        image:
            "assets/images/home/card-9.jpg",
        alt:
            "Local business team reviewing digital setup priorities",

        slides: [
            {
                label: "Current context",
                text:
                    "Begin with the systems, customer journey, and practical workflow the business already uses."
            },
            {
                label: "Useful priority",
                text:
                    "Focus first on the area that creates the most visible customer or operational friction."
            },
            {
                label: "Suitable pathway",
                text:
                    "Consider compatibility, responsibilities, scope, and next-step requirements before adding more tools."
            }
        ]
    };

    function getServiceGuidanceSlug() {
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

    function createGuidanceSlide(item, index) {
        const slide =
            document.createElement("div");

        slide.className =
            "swiper-slide service-guidance-slide";

        const quote =
            document.createElement("p");

        quote.className =
            "service-guidance-slide__quote";

        quote.textContent =
            item.text;

        const meta =
            document.createElement("div");

        meta.className =
            "service-guidance-slide__meta";

        const badge =
            document.createElement("span");

        badge.className =
            "service-guidance-slide__badge";

        badge.textContent =
            String(index + 1).padStart(2, "0");

        const source =
            document.createElement("strong");

        source.textContent =
            "Nexlocal guidance";

        const label =
            document.createElement("span");

        label.textContent =
            item.label;

        meta.append(
            badge,
            source,
            label
        );

        slide.append(
            quote,
            meta
        );

        return slide;
    }

    function initServiceGuidance() {
        const section =
            document.querySelector(
                "[data-service-guidance]"
            );

        if (
            !section ||
            section.dataset.guidanceInitialized === "true"
        ) {
            return;
        }

        const slug =
            getServiceGuidanceSlug();

        const content =
            SERVICE_GUIDANCE[slug] ||
            FALLBACK_GUIDANCE;

        const title =
            section.querySelector(
                "[data-service-guidance-title]"
            );

        const accent =
            section.querySelector(
                "[data-service-guidance-accent]"
            );

        const image =
            section.querySelector(
                "[data-service-guidance-image]"
            );

        const wrapper =
            section.querySelector(
                "[data-service-guidance-wrapper]"
            );

        const swiperElement =
            section.querySelector(
                "[data-service-guidance-swiper]"
            );

        if (title) {
            title.textContent = content.title;
        }

        if (accent) {
            accent.textContent = content.accent;
        }

        if (image) {
            image.src = content.image;
            image.alt = content.alt;
        }

        if (!wrapper || !swiperElement) {
            return;
        }

        const fragment =
            document.createDocumentFragment();

        content.slides.forEach(function (item, index) {
            fragment.appendChild(
                createGuidanceSlide(item, index)
            );
        });

        wrapper.replaceChildren(fragment);

        if (typeof window.Swiper !== "function") {
            section.classList.add("is-static");
            section.dataset.guidanceInitialized = "true";
            return;
        }

        const previousButton =
            section.querySelector(
                "[data-service-guidance-prev]"
            );

        const nextButton =
            section.querySelector(
                "[data-service-guidance-next]"
            );

        const pagination =
            section.querySelector(
                "[data-service-guidance-pagination]"
            );

        const swiper = new window.Swiper(swiperElement, {
            slidesPerView: 1,
            spaceBetween: 24,
            speed: 720,

            loop: content.slides.length > 1,
            rewind: false,

            autoHeight: true,
            grabCursor: true,
            watchOverflow: true,
            observer: true,
            observeParents: true,

            allowTouchMove: content.slides.length > 1,

            keyboard: {
                enabled: true,
                onlyInViewport: true
            },

            navigation: {
                prevEl: previousButton,
                nextEl: nextButton
            },

            pagination: {
                el: pagination,
                clickable: true,
                dynamicBullets: false
            },

            a11y: {
                enabled: true,
                prevSlideMessage: "Previous service guidance",
                nextSlideMessage: "Next service guidance",
                firstSlideMessage: "This is the first guidance item",
                lastSlideMessage: "This is the last guidance item"
            },

            on: {
                init: function () {
                    section.classList.add("is-ready");
                }
            }
        });

        section.serviceGuidanceSwiper = swiper;

        section.dataset.guidanceInitialized =
            "true";
    }

    window.NEXLOCAL_PAGE_INITS =
        window.NEXLOCAL_PAGE_INITS || [];

    window.NEXLOCAL_PAGE_INITS.push(
        initServiceGuidance
    );

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initServiceGuidance,
            { once: true }
        );
    } else {
        initServiceGuidance();
    }
})();

const SERVICE_STORY_CONTENT = {
    "small-business-websites.html": {
        eyebrow: "Website setup direction",
        title: "A clearer website can help customers understand and act faster.",
        text1: "This pathway helps local businesses explore a website structure that explains the offer clearly, supports trust, and creates a more practical route to inquiry.",
        text2: "The focus is not just visual presentation, but useful page hierarchy, a clearer next step, and a digital foundation that supports how the business actually works.",
        image: "assets/images/home/card-10.jpg",
        alt: "Local business owner reviewing website setup options"
    },

    "google-business-profile-setup.html": {
        eyebrow: "Visibility direction",
        title: "A better profile setup can make local discovery more consistent.",
        text1: "This pathway helps organize business information, categories, service areas, and profile clarity so customers can more easily understand what the business offers.",
        text2: "The goal is to reduce confusion, improve consistency, and create a more reliable local presence across the places customers already search.",
        image: "assets/images/home/card-11.jpg",
        alt: "Business owner reviewing profile and local visibility details"
    },

    "online-booking-setup.html": {
        eyebrow: "Booking direction",
        title: "A simpler booking flow can reduce friction before the first appointment.",
        text1: "This service explores practical booking pathways that help customers choose, schedule, and confirm appointments with less confusion.",
        text2: "The main goal is to support a clearer experience for both the customer and the business while keeping the process easier to manage.",
        image: "assets/images/home/card-12.jpg",
        alt: "Business owner managing online appointment setup"
    },

    "lead-forms-call-tracking.html": {
        eyebrow: "Lead flow direction",
        title: "A clearer inquiry pathway can make demand easier to capture and follow.",
        text1: "This service helps businesses review how inquiries are collected, routed, and measured across forms, calls, and important landing points.",
        text2: "The focus is on reducing friction, improving visibility, and creating a more useful structure for future decisions.",
        image: "assets/images/home/card-13.jpg",
        alt: "Business owner reviewing inquiry and lead pathways"
    },

    "review-management.html": {
        eyebrow: "Feedback direction",
        title: "A better review workflow can make customer feedback easier to organize.",
        text1: "This pathway explores when requests are sent, how responses are managed, and how feedback can be handled more consistently.",
        text2: "The goal is to support a more responsible and practical process without artificial claims, ratings, or outcomes.",
        image: "assets/images/home/card-14.jpg",
        alt: "Business owner reviewing customer feedback workflow"
    },

    "email-sms-automation.html": {
        eyebrow: "Communication direction",
        title: "A more useful follow-up pathway can improve customer communication.",
        text1: "This service helps businesses explore message timing, workflow triggers, and communication sequences that feel more relevant and easier to manage.",
        text2: "The result is a more structured pathway for reminders, updates, and customer follow-up built around real business needs.",
        image: "assets/images/home/card-1.jpg",
        alt: "Business owner reviewing digital communication workflows"
    },

    "analytics-setup.html": {
        eyebrow: "Measurement direction",
        title: "A clearer analytics setup can make decisions more grounded.",
        text1: "This pathway focuses on event tracking, conversions, and useful reporting structures so the business can better understand what is actually happening.",
        text2: "The purpose is to reduce guesswork and create a more practical measurement foundation for future improvements.",
        image: "assets/images/home/card-2.jpg",
        alt: "Business team reviewing analytics and reporting setup"
    },

    "crm-setup.html": {
        eyebrow: "Operations direction",
        title: "A more connected CRM setup can make customer handling easier to manage.",
        text1: "This service explores how leads, follow-up, internal tasks, and customer records can be organized into a clearer day-to-day workflow.",
        text2: "The goal is to create a more useful operational structure that supports visibility, consistency, and easier coordination.",
        image: "assets/images/home/card-3.jpg",
        alt: "Business team organizing leads and customer workflows"
    }
};

function initServiceStory() {
    const section = document.querySelector(".service-story");
    if (!section) return;

    const fileName = window.location.pathname.split("/").pop();
    const content = SERVICE_STORY_CONTENT[fileName];
    if (!content) return;

    const eyebrow = section.querySelector(".nl-eyebrow");
    const title = section.querySelector("h2");
    const paragraphs = section.querySelectorAll(".service-story__content p");
    const image = section.querySelector(".service-story__image-frame img");

    if (eyebrow) eyebrow.textContent = content.eyebrow;
    if (title) title.textContent = content.title;

    if (paragraphs[0]) paragraphs[0].textContent = content.text1;
    if (paragraphs[1]) paragraphs[1].textContent = content.text2;

    if (image) {
        image.src = content.image;
        image.alt = content.alt;
    }
}

document.addEventListener("DOMContentLoaded", initServiceStory);


(function () {
    "use strict";

    const ICONS = [
        `
      <svg viewBox="0 0 48 48" fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true">
        <circle cx="24" cy="24" r="15"></circle>
        <path d="m18 25 4 4 9-11"></path>
      </svg>
    `,
        `
      <svg viewBox="0 0 48 48" fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
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
      <svg viewBox="0 0 48 48" fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true">
        <path d="M8 37V25"></path>
        <path d="M18 37V18"></path>
        <path d="M28 37V11"></path>
        <path d="M38 37V6"></path>
        <path d="M6 41h36"></path>
      </svg>
    `
    ];

    const SERVICE_DIRECTIONS_CONTENT = {
        "small-business-websites": {
            eyebrow: "A clearer website foundation",
            title: "Three areas that shape a useful business website.",
            intro:
                "Bring content, responsive behavior, and customer actions together in one clearer digital experience.",

            cards: [
                {
                    title: "Information Structure",
                    text:
                        "Organize the business offer, service context, location, and practical details around real customer questions."
                },
                {
                    title: "Responsive Journey",
                    text:
                        "Create a consistent experience across desktop, tablet, and mobile without hiding essential information."
                },
                {
                    title: "Inquiry Foundation",
                    text:
                        "Connect important pages with forms, calls, booking actions, and useful measurement events."
                }
            ]
        },

        "google-business-profile-setup": {
            eyebrow: "A clearer local presence",
            title: "Three areas that shape useful local discovery.",
            intro:
                "Connect accurate public information with meaningful customer actions and responsible feedback workflows.",

            cards: [
                {
                    title: "Accurate Business Details",
                    text:
                        "Organize categories, operating information, location or service area, hours, and contact pathways."
                },
                {
                    title: "Local Discovery Path",
                    text:
                        "Help customers move from profile discovery to the website, directions, calls, or booking."
                },
                {
                    title: "Review and Action Flow",
                    text:
                        "Consider review requests, profile updates, customer responses, and useful activity measurement."
                }
            ]
        },

        "online-booking-setup": {
            eyebrow: "A clearer booking pathway",
            title: "Three areas that make booking easier to understand.",
            intro:
                "Shape service choices, availability, and customer communication around the way the business actually operates.",

            cards: [
                {
                    title: "Service and Availability",
                    text:
                        "Define which services can be booked, their duration, staff availability, and scheduling boundaries."
                },
                {
                    title: "Booking Experience",
                    text:
                        "Make service selection, date selection, and customer details easier to complete across devices."
                },
                {
                    title: "Confirmation and Follow-Up",
                    text:
                        "Clarify confirmation, reminders, rescheduling, cancellation, and any required human follow-up."
                }
            ]
        },

        "lead-forms-call-tracking": {
            eyebrow: "A clearer inquiry pathway",
            title: "Three areas that create more useful lead context.",
            intro:
                "Collect enough information for an appropriate response while keeping the customer journey understandable.",

            cards: [
                {
                    title: "Focused Qualification",
                    text:
                        "Ask the questions needed for a useful response without turning the inquiry into a long application."
                },
                {
                    title: "Routing and Call Context",
                    text:
                        "Clarify where forms and calls go, who owns the response, and what context should be retained."
                },
                {
                    title: "Conversion Measurement",
                    text:
                        "Separate meaningful customer inquiries from incomplete forms, general visits, and accidental actions."
                }
            ]
        },

        "review-management": {
            eyebrow: "A clearer feedback process",
            title: "Three areas that support responsible review workflows.",
            intro:
                "Organize request timing, feedback pathways, and internal response ownership without artificial rating claims.",

            cards: [
                {
                    title: "Request Timing",
                    text:
                        "Choose appropriate moments for requesting feedback based on the actual customer experience."
                },
                {
                    title: "Feedback Pathways",
                    text:
                        "Help customers reach suitable public or private feedback options with clear, respectful communication."
                },
                {
                    title: "Response Ownership",
                    text:
                        "Define who monitors feedback, prepares responses, and handles issues requiring internal attention."
                }
            ]
        },

        "email-sms-automation": {
            eyebrow: "A clearer communication flow",
            title: "Three areas that keep automated messages useful.",
            intro:
                "Connect permission, customer context, and human follow-up instead of sending unnecessary communication.",

            cards: [
                {
                    title: "Permission-Aware Triggers",
                    text:
                        "Define when communication is appropriate and what customer action or event should start the workflow."
                },
                {
                    title: "Clear Message Logic",
                    text:
                        "Keep each message focused on one purpose, one context, and one understandable next action."
                },
                {
                    title: "Human Follow-Up",
                    text:
                        "Clarify when an automated sequence should stop and a customer response needs personal attention."
                }
            ]
        },

        "analytics-setup": {
            eyebrow: "A clearer measurement foundation",
            title: "Three areas that make analytics more useful.",
            intro:
                "Move beyond decorative numbers by connecting tracking with meaningful customer actions and business questions.",

            cards: [
                {
                    title: "Meaningful Events",
                    text:
                        "Track customer actions such as calls, completed forms, bookings, directions, and other relevant outcomes."
                },
                {
                    title: "Clean Reporting",
                    text:
                        "Use consistent event names and reduce duplicate or unclear measurements across the digital setup."
                },
                {
                    title: "Decision Context",
                    text:
                        "Organize reports around customer friction, useful content, and areas that may deserve further attention."
                }
            ]
        },

        "crm-setup": {
            eyebrow: "A clearer customer workflow",
            title: "Three areas that make CRM organization more practical.",
            intro:
                "Connect customer information, responsibility, and next actions around the way the business actually works.",

            cards: [
                {
                    title: "Pipeline Structure",
                    text:
                        "Define stages that reflect how inquiries and customer activity move through the real business process."
                },
                {
                    title: "Ownership and Tasks",
                    text:
                        "Clarify who owns each inquiry, follow-up task, update, and next customer action."
                },
                {
                    title: "Connected Customer Context",
                    text:
                        "Bring useful form, booking, communication, and analytics context into one understandable workflow."
                }
            ]
        }
    };

    const FALLBACK_CONTENT = {
        eyebrow: "Three practical directions",
        title: "Focus on the parts of the setup that matter most.",
        intro:
            "Explore connected areas that may create a clearer customer journey and a more practical workflow.",

        cards: [
            {
                title: "Clarify the Starting Point",
                text:
                    "Review the current customer experience, systems, and practical business requirements."
            },
            {
                title: "Connect the Journey",
                text:
                    "Organize discovery, customer action, communication, and follow-up as one pathway."
            },
            {
                title: "Measure Useful Activity",
                text:
                    "Focus on customer actions and information that can support a practical next decision."
            }
        ]
    };

    function getServiceDirectionsSlug() {
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

    function createDirectionCard(item, index, slug) {
        const card =
            document.createElement("article");

        card.className =
            "service-direction-card";

        if (index === 1) {
            card.classList.add(
                "service-direction-card--featured"
            );
        }

        if (index === 2) {
            card.classList.add(
                "service-direction-card--dark"
            );
        }

        card.setAttribute("data-reveal", "");

        const number =
            document.createElement("span");

        number.className =
            "service-direction-card__number";

        number.textContent =
            String(index + 1).padStart(2, "0");

        const icon =
            document.createElement("span");

        icon.className =
            "service-direction-card__icon";

        icon.setAttribute("aria-hidden", "true");

        icon.innerHTML =
            ICONS[index % ICONS.length];

        const heading =
            document.createElement("h3");

        heading.textContent =
            item.title;

        const text =
            document.createElement("p");

        text.textContent =
            item.text;

        const link =
            document.createElement("a");

        link.className =
            "service-direction-card__link";

        link.href =
            "contact.html?request=service&service=" +
            encodeURIComponent(slug);

        link.innerHTML =
            "Discuss this area " +
            '<span aria-hidden="true">↗</span>';

        card.append(
            number,
            icon,
            heading,
            text,
            link
        );

        return card;
    }

    function initServiceDirections() {
        const section =
            document.querySelector(
                "[data-service-directions]"
            );

        if (
            !section ||
            section.dataset.directionsInitialized === "true"
        ) {
            return;
        }

        const slug =
            getServiceDirectionsSlug();

        const content =
            SERVICE_DIRECTIONS_CONTENT[slug] ||
            FALLBACK_CONTENT;

        const eyebrow =
            section.querySelector(
                "[data-service-directions-eyebrow]"
            );

        const title =
            section.querySelector(
                "[data-service-directions-title]"
            );

        const intro =
            section.querySelector(
                "[data-service-directions-intro]"
            );

        const grid =
            section.querySelector(
                "[data-service-directions-grid]"
            );

        const footerLink =
            section.querySelector(
                "[data-service-directions-cta]"
            );

        if (eyebrow) {
            eyebrow.textContent =
                content.eyebrow;
        }

        if (title) {
            title.textContent =
                content.title;
        }

        if (intro) {
            intro.textContent =
                content.intro;
        }

        if (grid) {
            const fragment =
                document.createDocumentFragment();

            content.cards.forEach(function (item, index) {
                fragment.appendChild(
                    createDirectionCard(
                        item,
                        index,
                        slug
                    )
                );
            });

            grid.replaceChildren(fragment);
        }

        if (footerLink) {
            footerLink.href =
                "contact.html?request=service&service=" +
                encodeURIComponent(slug);
        }

        section.dataset.directionsInitialized =
            "true";
    }

    window.NEXLOCAL_PAGE_INITS =
        window.NEXLOCAL_PAGE_INITS || [];

    window.NEXLOCAL_PAGE_INITS.push(
        initServiceDirections
    );

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initServiceDirections,
            { once: true }
        );
    } else {
        initServiceDirections();
    }
})();