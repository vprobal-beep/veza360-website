# Veza360 website prototype

Responsive static homepage, Platform page, and Software Engineering page implemented from the supplied Veza360 desktop and mobile Figma frames. The pages share local navigation, typography, and footer styles. Page imagery and Figma exports are stored locally for developer handoff. Fonts use Outfit, Montserrat, and Inter, with system fallbacks.

## Run locally

From this folder, run:

```sh
python3 -m http.server 5173
```

Then open [http://localhost:5173](http://localhost:5173).

## Project files

- `index.html` contains the page structure and content.
- `platform.html` contains the Platform page.
- `engineering.html` contains the Software Engineering page.
- `styles.css` contains desktop, tablet, and mobile layouts.
- `script.js` controls the accessible mobile navigation.
- `assets/figma/` contains the local Figma exports used by the page.

The main navigation, footer, and homepage solution card link to the pages currently implemented. IT & QA Services and About Us still link to their corresponding sections on Home until those pages are built.
The hero now uses `assets/veza360-hero-orbit-1080p.mov` as a muted, looping background video. CSS `object-fit: cover` crops the 16:9 clip to the hero frame on desktop and mobile; the static hero artwork remains the poster and fallback. The video is hidden when reduced motion is enabled.
`assets/hero-loop-source.png` is the 1914 × 822 high-resolution still prepared as the source frame for future loop animation. Its soft blue palette follows the original reference, and the left side remains clear for the HTML headline.
