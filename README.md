# Veza 360 Website

Responsive static multi-page marketing website for **Veza 360** built with semantic HTML, CSS, and vanilla JavaScript. Page imagery and Figma exports are stored locally under `assets/`. Fonts use `Outfit`, `Montserrat`, and `Inter` via Google Fonts with system fallbacks.

## Run locally

From this folder, start any static HTTP server, for example:

```sh
python3 -m http.server 5173
```

Then open [http://localhost:5173](http://localhost:5173).

## Project files

### Pages
- `index.html` — Homepage (hero, three solution cards, value proposition, and contact CTA banner).
- `platform.html` — Product Information Exchange platform overview, features, audience, testimonial, and demo CTA.
- `engineering.html` — Software Engineering capabilities (including UI/UX & Product Design), animated delivery process, and project CTA.
- `it-qa.html` — IT & QA Services overview, capabilities, EquipSee testimonial, and quote/contact CTAs.
- `about.html` — Company story, values, and Work With Us CTA.
- `contact.html` — Interactive contact inquiry form, contact details card, and filterable FAQ section.

### Styles & Scripts
- `styles.css` — Shared header, footer, typography, responsive layout rules, and page sections across the site.
- `contact.css` — Contact page hero, focus-highlighted form fields, custom full-width dropdowns (form interest & mobile FAQ category), and FAQ styling.
- `about-values.css` — Icon matte filter styling for the About Us values section.
- `script.js` — Accessible mobile navigation drawer, reduced-motion handling, and `IntersectionObserver` trigger for the Software Engineering *Our Process* animation.
- `contact.js` — Custom accessible dropdown controllers (inquiry interest & mobile FAQ selector), FAQ category switching, and `mailto:` inquiry draft builder.

### Assets
- `assets/hero_image_home.png`, `assets/hero-loop-source.png`, `assets/veza360-hero-orbit*.mov` — Home hero artwork and loop media.
- `assets/figma/` — Local SVG icons and photography organized by page (`platform/`, `engineering/`, `it-qa/`, `about/`, `contact/`).

## Developer handoff notes

- **Contact form submission (`contact.js`)**: Submitting the form currently builds a `mailto:info@veza360.com` draft rather than posting to a backend API or form service. Wire this to your production form endpoint before launch.
- **Placeholder links & phone**: Footers and `contact.html` use placeholder phone `+1 234 5678` (`tel:+12345678`), and Privacy Policy / Terms & Conditions links point to `#contact` or `mailto:info@veza360.com` until dedicated legal pages are added.
- **Image optimization**: `assets/figma/it-qa/hero.png` (`4096×2734` PNG) and `assets/figma/engineering/hero.jpg` (`4096×2732` JPEG) are high-resolution source files; consider resizing/compressing to WebP or optimized JPEG for production performance.
- **SEO & metadata**: Add a favicon, Open Graph tags, and `<meta name="description">` on `about.html` and `contact.html` before launch.
