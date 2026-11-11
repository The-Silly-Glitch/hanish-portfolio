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

## Digital Frontier revision — 11 November 2026

Local-only revision inspired by cinematic sci-fi city environments. No Diamante assets, logos, copy, proprietary fonts or code are included. The painting gallery and large painting inserts have been removed from the rendered portfolio. The original artwork files remain in the source archive for revision history.

The opening combines an original generated cybercity matte with a transparent Three.js scene: foreground architecture, a chrome security core, moving worker packets, and a layered memory sculpture. GSAP ScrollTrigger drives a continuous camera path. Chapter navigation, ambient-animation pause, direct project dialogs, and a skip-to-work link remain available. Reduced-motion mode presents a static opening and directs the primary button to the projects. The lower sections use the same violet/silver palette and locally hosted Space Grotesk type.

Custom asset: `public/cybercity-v1.webp`, generated with the built-in image-generation tool. Generation brief: `DESIGN_BRIEF.md`. No user files were uploaded or published. The city is an illustrative environment; the network objects are conceptual diagrams rather than live telemetry.

Validation: TypeScript check; production build; desktop and 390px mobile browser inspection; chapter jump and SecureGeoCrypt dialog; skip-to-work; browser console check (no errors).

## Vertical Descent rebuild — 11 November 2026

The active design now uses `VerticalDescent.tsx`, replacing the forward-moving Three.js opening. The city matte translates only vertically under GSAP ScrollTrigger; independent billboard motion adds depth. The header stays fixed, with the wordmark left, a centred white navigation island and a violet clipped CV action right. A compact nine-panel dark feature grid leads into three wide illustrated case-study panels. All ten project records and the established professional information remain available.

Four original images were generated for this revision and compressed to local WebP assets. See `DESIGN_BRIEF.md` for their prompts. The heading uses a locally hosted, widened DejaVu Sans Bold treatment; it does not bundle Diamante’s commercial Druk typeface. No reference website source code, branded imagery, logos or font binaries were copied.

Checks: TypeScript; production build; vertical translation inspected mid-scroll; fixed header position; desktop and 390px mobile layouts; mobile menu; project detail open/close; no horizontal overflow on mobile; no captured browser errors. Remains local-only.

## Project imagery and link icons — 11 November 2026

Replaced the generated project-object illustrations in the visible feature grid and project panels with authored SVG technical plates and the real distributed-password-auditing dashboard screenshot from the supplied local project. The screenshot is labelled as a demonstration run. The other plates are explicitly schematic: contextual access, continual-learning replay, browser encryption and the Linux build roadmap. The approved city artwork and vertical scroll sequence are unchanged.

Added recognisable GitHub and LinkedIn SVG marks to the connection panel, footer and repository links. Replaced the decorative rising chart with 24 checked cells corresponding to the existing project's documented test count. No new claims or benchmark values were introduced.

Verified TypeScript, production build, desktop/mobile visual fit, project dialog, and browser console. Local-only; no upload or publication.


## Text transition refinement

Replaced threshold-based CSS text switches with sequential fades and small vertical movement on the same scrubbed GSAP timeline as the city. Outgoing text disappears before incoming text becomes visible, with reversible scroll progress. Accessibility state follows the smoothed timeline. Reduced-motion fallback is preserved. TypeScript and production build pass. The live browser connection closed before this revision could be visually rechecked.


## Pixel typography refinement

Added locally hosted Silkscreen (SIL Open Font License) to the wordmark, main headings, project titles and skill headings. GlitchText uses two decorative, accessibility-hidden clipped colour layers for brief cyan/violet offsets. The active hero has a brief effect every eight seconds; section headings respond on hover. Body copy keeps its readable existing typeface. Reduced-motion mode disables the effects. Desktop/mobile fit, intermediate scroll-fade opacity, TypeScript and production build were checked. Font license: public/fonts/Silkscreen-OFL.txt.
