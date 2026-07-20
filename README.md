# Nexlocal website

This directory contains the complete multi-page Nexlocal website: a responsive information, inquiry and independent provider-matching experience for local businesses.

## Architecture

- `index.html` — 12-section homepage
- `about.html`, `all-services.html`, `service-packages.html`, `digital-audit.html`, `contact.html` — core pages
- Eight service-category pages, each with seven post-hero sections
- `privacy-policy.html`, `terms-of-service.html`, `cookie-policy.html`, `404.html` — legal and utility pages
- `assets/css/` — shared foundation, components and page-level styles
- `assets/js/config.js` — central business, navigation, form and legal configuration
- `assets/js/global.js` — header, footer, mobile navigation, accordions, cookie preference and shared initialization
- `assets/js/interactions.js` — reusable tabs, selectors, filters and diagnostic maps
- `assets/js/*.js` — page-level progressive enhancement
- `contact.php` and `config/contact-config.php` — server-side contact validation and email delivery
- `assets/images/image-manifest.json` — generated image placement, crop and alt-text reference

## Local preview

For a visual-only preview, serve the `nexlocal` directory with any static web server. The contact form needs PHP and a working mail transport:

```sh
php -S 127.0.0.1:8000 -t nexlocal
```

Open `http://127.0.0.1:8000/`. PHP's built-in server does not configure outbound email by itself; `mail()` must be connected to a mail transfer agent in the deployment environment.

## Contact delivery

Edit `config/contact-config.php` to change the fixed recipient or sender. The public JavaScript configuration exposes only the support address used in page copy; it does not control delivery.

The endpoint includes:

- POST-only handling and response negotiation for AJAX or regular form submissions
- allowlists for all controlled select values
- required-field, length, email and URL validation
- control-character removal and fixed mail headers
- a honeypot, request-size cap and short session-based rate limit
- success only when PHP confirms that `mail()` accepted the message

For production, route email through a reputable authenticated SMTP or transactional email service. Keep credentials outside the public web root and replace the `mail()` transport without weakening validation.

## Images and fonts

The five editorial photographs were created with the built-in image generation workflow, resized locally and stored as optimized JPEG fallbacks. They contain no text, badges, logos, fabricated dashboards or UI. The logo and cube mark are original SVG assets in `assets/icons/`. Syne and Manrope load from Google Fonts, with system fallbacks defined in CSS.

## Deployment checklist

1. Point the document root to this directory and confirm PHP 8+ is available.
2. Configure HTTPS and the outbound mail transport.
3. Confirm the production domain and canonical URLs in HTML and `sitemap.xml`.
4. Test the inquiry form, including error handling and delivery, on the deployed server.
5. Review legal text with qualified counsel for the final operating model and jurisdictions.
6. Revisit cookie consent before adding any optional analytics, advertising or embedded third-party tool.
7. Serve HTML with UTF-8 and apply appropriate security headers at the host or CDN.

Nexlocal intentionally publishes no telephone contact. Do not add one to visible copy, metadata, structured data or source comments without changing the business requirement.
