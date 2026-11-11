# Hanish Vigneshwar — portfolio

An editorial portfolio with a scroll-driven Three.js particle journey and GSAP entrance animations.

## Run

- `npm run dev` starts the local Vinext preview.
- `npm run build` creates the Cloudflare Worker deployment.
- `./scripts/deploy-site.sh` deploys it to https://the-silly-glitch.tech (keeps the custom domains attached — always deploy through this script, not bare `wrangler deploy`).
- `npx tsc --noEmit` checks TypeScript.

## Edit

- `app/data.ts`: project case studies, credentials and skills.
- `app/page.tsx`: narrative, experience, leadership and contact sections.
- `app/globals.css`: typography, responsive layouts and visual system.
- `components/ParticleFlight.tsx`: custom particle shader and camera travel.
- `components/ProjectArt.tsx`: original SVG technical illustrations.
- `public/Hanish-Vigneshwar-CV.pdf`: downloadable CV.

## Content boundaries

SecureGeoCrypt and ASCF-AW have no public source links. Submission status is not acceptance. MADAR benchmarking remains in progress. All cited evaluation results retain their context. The Security+ specialization records course completion, not a passed CompTIA certification exam.

## Access and motion

New Sites deployment is private by default. Public sharing can be enabled separately. The page respects reduced-motion preferences; intrinsic particle motion can also be paused. Project dialogs support Escape and return focus to their trigger.


## The Starry Notebook theme

Local-only revision: the opening uses a slowly moving crop of Vincent van Gogh’s public-domain The Starry Night. Source: https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg . Optimized local asset: public/starry-night.webp. Custom SVG project illustrations and monogram use the painting’s blue and ochre palette. Caveat headings use the included OFL license; body text uses TeX Gyre Pagella.

No portfolio source or CV has been uploaded.


## Curiosity Gallery revision

Eight credited artworks now form the visual collection. Authoritative file pages, artists and approximate artwork dates are recorded in app/artworks.ts. Local optimized reproductions live in public/art/. Gallery thumbnails open a keyboard-accessible viewer, preserve each artwork’s full aspect ratio, and link to the source. The opening scroll blends Van Gogh, Hokusai and Kandinsky; later rooms derive their palettes from Leonardo, Monet and Klimt. Art commentary is an editorial design choice, not a claim that the artist endorsed this portfolio.

User preference remains local only: do not publish or synchronize the source repository unless separately authorized.


## Artistic engineering layer

The engineering desk includes a real Web Crypto AES-256-GCM round-trip demo. Each encryption generates a fresh non-exportable key and 96-bit nonce. Input changes/reset clear the stored payload; no network or persistence is used. Technical project figures are annotated schematics, not live telemetry. Browser QA covered Unicode/Tamil/emoji round-trip recovery.


## Art × cyberpunk crossover

The current visual layer combines classical artworks with ultraviolet/acid-yellow interface accents, circuit framing, technical typography, scan-line texture and dark gallery rooms. Original artwork remains available without interface overlays in the artwork viewer. Browser motion preferences remain respected. Cipher demo and portfolio content are unchanged.


## Reference-led cyberpunk revision

The supplied yellow/black/cyan reference replaces the earlier ultraviolet styling. The local portfolio uses original HNV branding, an industrial headline panel, angled technical windows, a triangular circuit mesh, cyan controls and hazard-yellow section accents. The featured project window opens SecureGeoCrypt’s case study; it does not publish its private source. All artwork credits and browser-only cipher functionality are retained.
