# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server with live reload + SCSS watcher (runs both concurrently)
npm run compile-css  # one-shot SCSS compile
npm run watch-css  # watch SCSS and recompile on change
```

`npm run dev` opens a live-server instance at localhost and watches `scss/` for changes. There are no tests or linters.

## Architecture

Static HTML site — no build framework, no bundler. The output is `index.html` + `styles/styles.css` + `scripts/app.js` deployed directly to GitHub Pages.

**CSS** — SCSS compiled via `sass` (dart-sass). Entry point is `scss/styles.scss`, which imports in order: variables → mixins → global → components. All partials follow the `_name.scss` convention. The compiled output goes to `styles/styles.css` (committed to repo, served directly).

**JS** — Single vanilla JS file at `scripts/app.js`. No modules or bundling. Loaded at the bottom of `index.html`. Dependencies (GSAP + ScrollTrigger, lazysizes) are loaded from CDN `<script>` tags in the HTML. GSAP's `ScrollTrigger` plugin must be registered before use and is at the top of `app.js`.

**Modals** — Portfolio items are anchor links (`<a href="#portfolio-yeti" class="portfolio-link">`). Clicking one finds the matching `<section class="modal" id="portfolio-yeti">` and adds `active` then `show` CSS classes with a 50ms delay (for CSS transition). Images inside modals use `lazysizes` with `class="lazyload"` and `data-src`. Because lazysizes uses IntersectionObserver and modals start as `display:none`, images inside closed modals are not observed until the modal opens — triggering a manual `lazySizes.loader.checkElems()` after the modal becomes visible may be needed for Safari compatibility.

**Node version** — Project requires Node 16.5.0 (see `.node-version`). Use `nvm use` in the project root.
