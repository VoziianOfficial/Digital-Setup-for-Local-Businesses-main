(function () {
    "use strict";

    const CATEGORY_MAP = {
        "small-business-websites": {
            category: "presence",
            label: "Presence",
            image: "assets/images/home/local-owner-office.jpg",
            imageAlt:
                "Local business owner reviewing a website and digital information"
        },

        "google-business-profile-setup": {
            category: "presence",
            label: "Presence",
            image: "assets/images/home/cafe-owner-tablet.jpg",
            imageAlt:
                "Local business owner reviewing public business information"
        },

        "online-booking-setup": {
            category: "lead-flow",
            label: "Lead Flow",
            image: "assets/images/services/salon-owner-schedule.jpg",
            imageAlt:
                "Business owner organizing customer appointments"
        },

        "lead-forms-call-tracking": {
            category: "lead-flow",
            label: "Lead Flow",
            image:
                "assets/images/services/home-service-owner-workshop.jpg",
            imageAlt:
                "Home service business owner organizing customer inquiries"
        },

        "review-management": {
            category: "communication",
            label: "Communication",
            image:
                "assets/images/services/clinic-manager-tablet.jpg",
            imageAlt:
                "Local business manager reviewing customer information"
        },

        "email-sms-automation": {
            category: "communication",
            label: "Communication",
            image: "assets/images/home/cafe-owner-tablet.jpg",
            imageAlt:
                "Business owner reviewing customer communication"
        },

        "analytics-setup": {
            category: "operations",
            label: "Operations",
            image: "assets/images/home/local-owner-office.jpg",
            imageAlt:
                "Local business team reviewing digital performance information"
        },

        "crm-setup": {
            category: "operations",
            label: "Operations",
            image:
                "assets/images/services/home-service-owner-workshop.jpg",
            imageAlt:
                "Local business team organizing customer requests and workflows"
        }
    };


    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    function getCategoryData(service) {
        return CATEGORY_MAP[service.slug] || {
            category: "operations",
            label: "Digital Setup",
            image:
                "assets/images/home/local-owner-office.jpg",
            imageAlt:
                "Local business digital setup planning"
        };
    }


    function createCard(service, index) {
        const metadata =
            getCategoryData(service);

        const article =
            document.createElement("article");

        article.className =
            "services-showcase-card";

        article.dataset.showcaseCategory =
            metadata.category;

        article.dataset.showcaseSlug =
            service.slug;

        article.innerHTML = `
      <picture class="services-showcase-card__image">
        <img
          src="${escapeHtml(metadata.image)}"
          width="1200"
          height="1500"
          loading="lazy"
          decoding="async"
          alt="${escapeHtml(metadata.imageAlt)}"
        >
      </picture>

      <div class="services-showcase-card__top">
        <span class="services-showcase-card__index">
          ${String(index + 1).padStart(2, "0")}
        </span>

        <span class="services-showcase-card__category">
          ${escapeHtml(metadata.label)}
        </span>
      </div>

      <div class="services-showcase-card__panel">
        <div class="services-showcase-card__panel-copy">
          <span>
            ${escapeHtml(metadata.label)}
          </span>

          <h3>
            ${escapeHtml(service.name)}
          </h3>
        </div>

        <a
          class="services-showcase-card__link"
          href="${escapeHtml(service.href)}"
          aria-label="Explore ${escapeHtml(service.name)}"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M7 17 17 7"></path>
            <path d="M8 7h9v9"></path>
          </svg>
        </a>
      </div>
    `;

        return article;
    }


    function updateCounts(
        filtersRoot,
        services
    ) {
        const counts = {
            all: services.length,
            presence: 0,
            "lead-flow": 0,
            communication: 0,
            operations: 0
        };

        services.forEach((service) => {
            const metadata =
                getCategoryData(service);

            if (
                Object.prototype.hasOwnProperty.call(
                    counts,
                    metadata.category
                )
            ) {
                counts[metadata.category] += 1;
            }
        });

        filtersRoot
            .querySelectorAll(
                "[data-filter-count]"
            )
            .forEach((counter) => {
                const key =
                    counter.dataset.filterCount;

                counter.textContent =
                    String(counts[key] || 0);
            });
    }


    function animateVisibleCards(grid) {
        const visibleCards = [
            ...grid.querySelectorAll(
                ".services-showcase-card:not([hidden])"
            )
        ];

        visibleCards.forEach(
            (card, index) => {
                card.classList.add(
                    "is-entering"
                );

                card.style.setProperty(
                    "--showcase-delay",
                    `${index * 55}ms`
                );
            }
        );

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                visibleCards.forEach((card) => {
                    card.classList.remove(
                        "is-entering"
                    );
                });
            });
        });
    }


    function filterCards(
        grid,
        selectedCategory
    ) {
        const cards = [
            ...grid.querySelectorAll(
                ".services-showcase-card"
            )
        ];

        cards.forEach((card) => {
            const matches =
                selectedCategory === "all" ||
                card.dataset.showcaseCategory ===
                selectedCategory;

            card.hidden = !matches;

            if (!matches) {
                card.classList.remove(
                    "is-entering"
                );
            }
        });

        animateVisibleCards(grid);
    }


    function setActiveFilter(
        filtersRoot,
        grid,
        selectedButton
    ) {
        const buttons = [
            ...filtersRoot.querySelectorAll(
                "[data-showcase-filter]"
            )
        ];

        buttons.forEach((button) => {
            const isSelected =
                button === selectedButton;

            button.classList.toggle(
                "is-active",
                isSelected
            );

            button.setAttribute(
                "aria-selected",
                String(isSelected)
            );

            button.tabIndex =
                isSelected ? 0 : -1;
        });

        filterCards(
            grid,
            selectedButton.dataset.showcaseFilter
        );
    }


    function handleFilterKeyboard(
        event,
        filtersRoot,
        grid
    ) {
        const buttons = [
            ...filtersRoot.querySelectorAll(
                "[data-showcase-filter]"
            )
        ];

        const currentIndex =
            buttons.indexOf(event.target);

        if (currentIndex === -1) {
            return;
        }

        let nextIndex = currentIndex;

        if (
            event.key === "ArrowRight" ||
            event.key === "ArrowDown"
        ) {
            nextIndex =
                (currentIndex + 1) %
                buttons.length;
        } else if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowUp"
        ) {
            nextIndex =
                (
                    currentIndex -
                    1 +
                    buttons.length
                ) %
                buttons.length;
        } else if (event.key === "Home") {
            nextIndex = 0;
        } else if (event.key === "End") {
            nextIndex =
                buttons.length - 1;
        } else {
            return;
        }

        event.preventDefault();

        buttons[nextIndex].focus();

        setActiveFilter(
            filtersRoot,
            grid,
            buttons[nextIndex]
        );
    }


    function initServiceShowcase() {
        const page =
            document.querySelector(
                ".services-page"
            );

        if (page) {
            page.dataset.ready = "true";
        }

        const root =
            document.querySelector(
                "[data-service-showcase]"
            );

        if (!root) {
            return;
        }




        if (
            root.dataset.showcaseInitialized ===
            "true"
        ) {
            return;
        }

        const grid =
            root.querySelector(
                "[data-service-showcase-grid]"
            );

        const filtersRoot =
            root.querySelector(
                "[data-service-showcase-filters]"
            );

        const config =
            window.NEXLOCAL_CONFIG;

        const services =
            Array.isArray(config?.services)
                ? config.services
                : [];

        if (
            !grid ||
            !filtersRoot ||
            services.length === 0
        ) {
            console.warn(
                "Nexlocal service showcase was not initialized.",
                {
                    gridFound: Boolean(grid),
                    filtersFound:
                        Boolean(filtersRoot),
                    servicesCount:
                        services.length
                }
            );

            return;
        }

        root.dataset.showcaseInitialized =
            "true";

        const fragment =
            document.createDocumentFragment();

        services.forEach(
            (service, index) => {
                fragment.append(
                    createCard(service, index)
                );
            }
        );

        grid.replaceChildren(fragment);

        updateCounts(
            filtersRoot,
            services
        );

        const initialButton =
            filtersRoot.querySelector(
                ".is-active[data-showcase-filter]"
            ) ||
            filtersRoot.querySelector(
                "[data-showcase-filter]"
            );

        if (initialButton) {
            setActiveFilter(
                filtersRoot,
                grid,
                initialButton
            );
        }

        filtersRoot.addEventListener(
            "click",
            (event) => {
                const button =
                    event.target.closest(
                        "[data-showcase-filter]"
                    );

                if (
                    !button ||
                    !filtersRoot.contains(button)
                ) {
                    return;
                }

                setActiveFilter(
                    filtersRoot,
                    grid,
                    button
                );
            }
        );

        filtersRoot.addEventListener(
            "keydown",
            (event) => {
                handleFilterKeyboard(
                    event,
                    filtersRoot,
                    grid
                );
            }
        );
    }






    window.NEXLOCAL_PAGE_INITS =
        window.NEXLOCAL_PAGE_INITS || [];

    window.NEXLOCAL_PAGE_INITS.push(
        initServiceShowcase
    );






    function fallbackInit() {
        const root =
            document.querySelector(
                "[data-service-showcase]"
            );

        if (
            root &&
            root.dataset.showcaseInitialized !==
            "true"
        ) {
            initServiceShowcase();
        }
    }


    if (
        document.readyState === "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            fallbackInit,
            { once: true }
        );
    } else {
        fallbackInit();
    }
})();