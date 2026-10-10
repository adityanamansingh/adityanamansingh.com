# adityanamansingh.com

Personal portfolio site of Aditya Naman Singh. Static single-page site (no build step, no package.json) plus two standalone PHP scripts for the unrelated "Layali" project.

## Layout

- `index.html` — the entire site (~100 KB). Sections: about, resume, contact, etc. Includes Google Analytics (`G-68RMVK0HFE`).
- `css/` — vendor CSS (bootstrap, fontawesome, flaticon, leaflet, animations) plus the site's own `default.css`, `style.css`, `responsive.css`.
- `js/` — vendor libs (jQuery 1.12.4, bootstrap, three.js, vanta-dots, leaflet, carouFredSel, easytabs, vanilla-tilt, etc.). Own code is `js/main.js` (preloader, `data-background` images, scroll-to-top, knob bars, accordion, vanta) and `js/menu.js`.
- `images/` — `about/`, `hero/`, `logo/`, `resume/`.
- `fonts/` — icon/web fonts.
- `india_states.geojson` (~1 MB) — map data used with leaflet.
- `aditya-naman-singh-cv.pdf` — downloadable CV.
- `service/` — `layali-contact.php` (contact-form POST endpoint, MySQL) and `layali-leads.php` (admin page listing leads). Not part of the portfolio itself.

## Working notes

- No build/test tooling. Open `index.html` directly or serve the folder (`python3 -m http.server`) to preview.
- Edit only the site's own files (`index.html`, `css/style.css`, `css/default.css`, `css/responsive.css`, `js/main.js`, `js/menu.js`); treat vendor files in `css/` and `js/` as read-only.
- Script load order in `index.html` matters (jQuery before plugins before `main.js`).
- `service/*.php` contain hardcoded DB credentials and a hardcoded admin login. Don't copy them elsewhere or echo them in output; moving them to env/config would be a good cleanup if asked.
- Untracked at times: `package-lock.json` (stray, empty of deps) — not part of the project.

## Git

- Remote `origin`: `git@github-personal:adityanamansingh/adityanamansingh.com.git` (SSH alias `github-personal`), branch `main`.
- Never run `git commit`; the user commits manually.

## Earlier redesigns (v2, v3, v4) — removed

v2 (cinematic three.js), v3 ("The Ascent" mountain trek) and v4 (v3 + polish/accessibility) were deleted once v5 was chosen as final. They were never committed, so they are gone for good; see "History" below. Only the old static site (root) and `v5/` remain.

## v5/ (Bento + Terminal redesign) — the final version

`cd v5 && npm run dev` (port 3004); production: `npm run build && npx next start -H 0.0.0.0 -p 3005`. Next.js 16, TypeScript, Tailwind v4, Framer Motion (`MotionConfig reducedMotion="user"`), lucide-react v1 (no brand icons), `@anthropic-ai/sdk`. Read `v5/AGENTS.md` too (Next 16 notes: `params` is a Promise, etc.).

### Page structure (top to bottom, `components/Bento.tsx`)
Uses a 12-col grid with `lg:auto-rows-[minmax(7.25rem,auto)]` (fixed row heights clipped content before).
1. Hero (8) + Portrait (4, photo only, `hideTitle`, no name/time/title overlay). Hero metrics are 3 (years, clients, ML accuracy); "Admissions powered" and "9s → 0.6s" live only under CollegeSearch, not in the hero.
2. Terminal (7) + Code activity / Now (5). The GitHub tile just shows the two account links.
3. Group heading "What I've done, and what I know": Skills (5, left) + Experience (7, right), then Certifications (12, all 27 in 3 columns, no white space).
4. Group heading "Things I've built": Work (12, 3 equal project cards).
5. Beyond code (4, left) + Kind words (8, right, so long recommendations fit).
6. Contact (12, horizontal on lg, intent chips: hiring / freelance / chit-chat / trek buddy).

Files: `components/tiles.tsx` (HeroTile, PortraitTile, GitHubTile/Heatmap, NowTile, ExperienceTile/GitLog, ProjectsTile/ProjectCard, SkillsTile, CertsTile, TestimonialsTile + `Person`, LifeMosaic, ContactTile), `Tile.tsx` (spotlight hover, optional maximize, `hideTitle`, `level` 2|3; inner div needs `h-full`), `Panel.tsx` (dialogs via `useModal`), `Header.tsx`, `ThemeToggle.tsx`, `modal.ts`, `Terminal.tsx`.

### Copy rules (owner feedback, keep following)
- Visitor-facing text only: no builder/meta lines ("merged from…", "snapshot…", "from my résumé and LinkedIn", "27 certifications, grouped by area…", skill counts, "git log", commit hashes, "(HEAD → main)", "offline answer"). Prefer a short factual line or nothing.
- Only claims the owner confirmed (CV, LinkedIn, or text he pasted). Do not invent ownership ("I owned…"), outcomes or numbers. Recommendations are verbatim from LinkedIn, never summarised. Experience bullets use the owner's own wording.
- Each number appears where it belongs: CollegeSearch (9s → 0.6s, ~80% CWV/SEO, 1.4L+ requests, ~1,700 admissions, 200+ crons), AdmitQuest (93% ML accuracy), Mono (20+ Vue 3 components).

### Experience tile (`GitLog` in `tiles.tsx`, data in `data/profile.ts`)
- 8 roles on the main page: Mono Solutions (current, Senior Software Engineer), Sunstone (Software Engineer in Technology & Product; CollegeSearch and AdmitQuest were their products there), then compact older rows: COER intern, Vienhance Studio, Rowdy Meals, Masha Art, Kalour, Cryptina. Wisdom Players and Le Abha Fashion were removed on request.
- Mono and Sunstone are shown larger (44px logo, paragraph-length `summary`); older roles are compact (24px logo, one-line `summary`). Text sizes are identical for all roles (owner asked not to vary font size); only logo size and spacing differ.
- Each role has a `summary` (collapsed) and a "Read more" button (`aria-expanded`) that shows all groups/bullets; the maximize dialog shows everything. Mono includes a "Flagship revamp" group (revamp of an older product with admin panel, Keycloak, PostgreSQL, Redis, Argo CD) and Mono's stack merges all CV pipe-lines (Vue 3, TypeScript, Storybook, SCSS, Chromatic, Git, PHP, Laravel, Stripe, REST APIs, PostgreSQL, MySQL, Docker, AWS S3, LocalStack, Redis, Keycloak, Argo CD).
- Company logos: `orgs` map + `orgOf()` in `data/profile.ts` (files in `public/images/orgs/`, 100px from LinkedIn; company name links to its LinkedIn page). Cryptina India and The Asian School have no LinkedIn logo. Education is not rendered on the page (only used by `ask`).

### Content (all in `data/`, only facts from CV + LinkedIn)
- `data/profile.ts`: bio, `metrics`, experience (Mono Solutions is the real employer, hired via Adaan Digital Solutions India; location Delhi NCR), education incl. M.Tech, 27 certifications (`certGroupOf()` → AI & GenAI 6 / Software & web 11 / Marketing, tools & more 10), `skillGroups`, `beyond` (hobbies; source: the owner's own ChatGPT history summary, kept modest: trekking and comparing routes like Phulara Ridge/Madhyamaheshwar, music, a little dancing, road trips, sunrises, GenAI curiosity, learning by building), testimonials come from `data/recommendations.json`.
- Skills: 106 across 12 groups shown in relevance order (Languages, Backend & APIs, Frontend & web, AI & ML, Databases & big data, Cloud, DevOps & servers, Ways of working, Data analysis, SEO & analytics, Design, Leadership & business), flowed in 2 CSS columns (`break-inside-avoid`) so groups leave no big gaps; chips stay >= 28px. Source: CV skills + LinkedIn (all five skill tabs) + tools named in project work (Keycloak and Argo CD added from the Mono revamp). LinkedIn lazy-loads each tab: when re-scraping, click each tab separately and scroll the INNER scroll containers until the text stops growing. LinkedIn "Email Address / Domains / Mono Blog" under "All" are not skills. Hover caption uses `skillInfo` + projects used in.
- `data/projects.ts`: case studies `mono-solutions`, `admitquest`, `collegesearch`, `ikio-technologies`, `rlux`, `dhoa`, `ikio-led-lighting`, `rowdy-meals` (Layali was removed on request) + `now` list. AdmitQuest/CollegeSearch stories use the owner's exact bullet wording. `stub: true` shows a "write-up coming" note. Layali/Rowdy Meals details still to be supplied.
- `data/github.json`: merged heatmap from public contribution calendars of `adityanamansingh` + `adityanamansingh-mono` via `node scripts/sync-github.mjs` (no token). Private repo commit messages never shown.
- Contact form: `app/api/contact/route.ts` validates + logs `intent`, no email provider wired yet.
- Metadata: `app/icon.svg`, `app/opengraph-image.tsx`, `public/aditya-naman-singh-cv.pdf`.

### Terminal (`components/Terminal.tsx`)
Dark island (`data-theme="dark"` on its root, intentional in both themes). Commands: `help`, `whoami`, `about`, `experience` (plain list; `log` still works as an alias), `projects`/`work`, `open <n|name>`, `skills [filter]` (e.g. `skills cloud`), `certs [filter]` (all 27), `github`, `now`, `contact`, `cv`, `ask ...`, `clear`, `sudo`, `ls`. Anything unknown is treated as a question for `/api/ask`. Starts with welcome + `help` output and command chips. `/` or Ctrl/Cmd+K focuses the input.

### `ask` backend (`app/api/ask/route.ts`, `lib/knowledge.ts`)
- With `ANTHROPIC_API_KEY` in `v5/.env.local` it calls Claude: default `claude-opus-5-5` (override `ASK_MODEL`, e.g. `claude-haiku-5-5` for lower cost), `output_config: {effort: "low"}`, `max_tokens: 700`, prompt-cached system prompt, `betas: ["server-side-fallback-2026-07-01"]` + `fallbacks: "default"`, typed error chain, refusal handling. Params are cast through `unknown` to `Anthropic.Beta.Messages.MessageCreateParamsNonStreaming` to satisfy the types.
- Without a key it answers locally with keyword matching over the profile data (this is the only path tested; there is no API key on this machine).
- Limits: 6 req/min/IP and `ASK_DAILY_CAP` (default 300) per server process. Answers are grounded only in `lib/knowledge.ts` chunks; never put private info in `data/`.

### LinkedIn recommendations sync
- `data/recommendations.json` holds the recommendations received on LinkedIn, verbatim (text, date, relationship, `role` label, `photo`, `linkedin` URL). `data/profile.ts` exports `testimonials` from it, skipping `"hidden": true` entries (Himanshu Kumar Singh and Aditya Kaushik are hidden on purpose). Photos are stored in `public/images/people/` (LinkedIn's signed image links expire; only the 100px size works).
- `npm run sync:linkedin` (`scripts/sync-linkedin.mjs`, uses `puppeteer-core` + installed Google Chrome, session kept in git-ignored `.linkedin-profile/`): first run opens Chrome, log in once; later `-- --headless`; `-- --prune` removes people whose recommendation is gone. It refreshes text/date/photo, keeps your edited `role` and `hidden`, adds new people at the top, and prints what changed. Rebuild/restart the production server afterwards. The extraction logic was verified against the live page; a full logged-in run of the script itself has not been done yet.
- Testimonial UI: `Person` in `components/tiles.tsx` (avatar + LinkedIn link, opens in new tab). Long quotes scroll inside a focusable region with a hint; "Read all" dialog shows every quote in full with paragraphs. LinkedIn only serves 100px photos (larger sizes return 403).
- Beyond code tile: trek, "Haridwar & Ganga ji" (key `mountain`, Waves icon; owner is from Haridwar, not Dehradun; schools in Haridwar/Dehradun stay in education), music, dance, moving places. Mosaic is `compact` (2 columns) inside the 4-col tile and large in its dialog, which also lists the curiosity one-liners.

### Responsive + performance (owner asked for phones, tablets, folds, laptops, old Windows)
- Breakpoints: 1 column below `md` (768), 2 columns at `md` (`md:grid-flow-dense`: portrait and Code activity sit side by side, everything else full width), 12 columns at `lg`. Never leave a lone half-width tile at `md`.
- Phones: `MobileMenu.tsx` (section links, below `md`), header shows "Aditya Singh" under 440px and only the logo mark under 360px (sr-only name), `viewportFit: "cover"` + `.safe-x` padding for notches, header is not sticky in short landscape (`.site-header`), terminal and form inputs are 16px on mobile (stops iOS zoom), `.tap` links are 24px (44px on coarse pointers), Skills/Certifications/older roles collapse behind "Show all…" buttons on small screens, dialogs use `.panel-shell` (92dvh).
- Performance: `next/image` for portrait/covers/life photos (portrait 295KB -> ~12-22KB AVIF/WebP; Next 16 only allows quality 75, so do not pass `quality`), `LazyMotion` + `m.*` components instead of `motion.*`, `Panel` is dynamically imported, `/images/*` cache headers in `next.config.mjs`, above-the-fold tiles (index < 2) do not fade in (LCP 770ms -> ~70ms locally, CLS 0).
- Verified (emulated): widths 280 (Galaxy Fold), 344, 360, 375, 390, 430, 673 (fold unfolded), 768, 912 (Surface Pro), 1024, 1366x768, 1536 @1.25, 1280x720, 2560, landscape phone 844x390: no horizontal overflow, no controls under 24px, Lighthouse a11y/best-practices/SEO/agentic 100 on mobile and desktop, no console errors. Not verified on real hardware, real Safari/Firefox, or real old browsers (`color-mix`, `text-wrap` need ~2023+ browsers; they degrade to plain colours/wrapping).
- Visual background: `Backdrop.tsx` + `.backdrop*` in `globals.css` (blueprint grid + pointer glow, decorative, off for reduced motion/touch/forced-colors). `body` must not have its own background or it hides the backdrop. Header is `bg-bg/95` because a translucent header failed contrast against the grid.

### Resume PDFs
`v5/public/aditya-naman-singh-resume.pdf` (accent `#a03318` on name/headings, linked from the site) and `aditya-naman-singh-resume-ats.pdf` (all black, for job portals) are generated from `v5/resume/resume.html` (replace `ACCENT` with a hex, then `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --print-to-pdf=out.pdf file:///.../resume.html`). Content = the owner's CV text + the Mono flagship revamp + Keycloak/Argo CD/Vue 3/PostgreSQL/Redis skills. The original `aditya-naman-singh-cv.pdf` is kept untouched. Update `resume.html` when the CV changes.

- Collapsed by default on every screen (owner asked for tighter tiles): Experience shows Mono + Sunstone and a "Show N earlier roles" toggle; Skills shows the first 6 areas and a "Show N more skill areas" toggle; Certifications shows only the 9 flagged `top: true` in `data/profile.ts` (5 Google/Hack2skill GenAI badges, Goldman Sachs job simulation, Angular, MEAN, Applied ML) in that order, with "Show all 27" opening the filterable dialog. All three tiles have the expand (maximize) button: Experience dialog = full log, Skills dialog = all 106 skills, Certifications dialog = all 27 + filter. Skills is 7 columns, Experience 5. The terminal tile has a fixed height (`relative` wrapper + `absolute inset-0`) so output scrolls inside it and never grows the page. `.tap` lives in `@layer components` so `sm:hidden`/`md:hidden` can override it (it didn't when unlayered).
### Images
- Case-study page (`app/work/[slug]/page.tsx`): two-column on desktop with a sticky "More work" sidebar (related projects first: the three LED-lighting sites together, AdmitQuest with CollegeSearch); it replaced the old "Next project" card. Empty role/year/stack are hidden; no "coming soon" or developer notes are shown to visitors.
- Client sites (IKIO Technologies, RLUX, DHOA, IKIO LED Lighting): role "Design & development", stack PHP/Laravel/CodeIgniter (owner said "mostly"), year left empty on purpose. IKIO Technologies was built ahead of the company's IPO (15 Investors sub-sections, admin panel for investor-relations content). RLUX, IKIO LED and DHOA also have admin panels (RLUX: categories to OEM forms; IKIO LED: products, stock, categories, sub-categories; DHOA: owner has no access now, so no detail). Rowdy Meals is filled from the owner's Canva deck (no-contact delivery in Haridwar). Layali was removed.
- Work covers: file name must match the project slug exactly (`project-admitquest.svg`, `project-collegesearch.jpg`, ...); jpg/png/webp/avif/svg all work. `lib/images.ts` adds `?v=<mtime>` so browsers refetch a replaced file (needs `images.localPatterns` in `next.config.mjs`). Screenshots are cropped 16:10 (1920x1200) so cards never crop them; SVG covers with a transparent background use `coverBg` in `data/projects.ts` (Mono uses the "New Mono Gradient", AdmitQuest a dark backdrop) and render with `object-contain`. The Work tile shows only projects that have a cover; when the count leaves one over (7), the first card is shown wide. The Mono SVG was edited: the "We're working on this page" paragraph removed, mask removed and canvas widened to 630x335 so the whole UI fits (original backup was kept outside the repo). Projects added: IKIO Technologies, RLUX, IKIO LED Lighting, DHOA (Design House of Alexandra); their role/year/stack are still `—` until the owner supplies them (empty fields are hidden on the case-study page). Screenshots of sites behind Cloudflare bot checks cannot be taken automatically; the owner supplies them.
Drop files in `public/images/` named per `public/images/README.md`: `portrait`, `life-trek|mountain|music|dance|travel`, `project-<slug>[-2..4]`. `lib/images.ts` detects them by name at request/build time (restart the production server after adding). No code change needed. Until then the portrait falls back to `/photo.jpg` and project cards show a tinted placeholder. The owner will supply real images.

### Theming (dark + light)
Toggle in the header; choice kept in localStorage; applied before first paint by an inline script in `layout.tsx` (`html[data-theme]`, default dark, `suppressHydrationWarning`). Tokens live in `app/globals.css` under `[data-theme="dark"]` / `[data-theme="light"]` and are mapped in `@theme inline`.
- Brand is `#a03318` (owner's choice, replacing the earlier parrot green). `--brand` is for fills (buttons, dots, logo) with white `--on-brand`; `--accent` is the text-safe version (light `#a03318` 7:1, dark `#ff9a7a` 8.8:1).
- Surfaces come from the old site's palette. Dark: bg `#14161b`, tile `#1c1f26`, tile-2 `#232731`, line `#2f343e`, fg `#f7f6f6`, muted `#a8a9b0`. Light: bg `#f7f6f6`, tile `#fff`, tile-2 `#f0f2fb`, line `#e0e0e0`, fg `#2f343e`, muted `#5d5f66`. Heatmap uses `var(--h0..h4)`.
- Never hard-code colours in components; use tokens (`bg-brand`, `text-accent`, `bg-tile`...). Fonts: Geist, Geist Mono, Instrument Serif (accent words).
- Known: dark-mode brand button edge vs background is 2.57:1 (label contrast 7:1); adding a border would fix it if wanted.

### Accessibility rules (owner insists: do not compromise accessibility)
Tokens contrast-checked in BOTH themes; real buttons/links with 24px+ (44px for primary) targets; decorative things `aria-hidden`; animated text has an `sr-only` copy; `MotionConfig reducedMotion="user"`; no auto-advancing carousels; never animate `top/left` for scroll-driven motion (use `transform`); dialogs use `useModal` (focus trap, Esc, focus return, Lenis pause); keep the skip link and `<main id="main">`; forced-colors and reduced-motion handled in `globals.css`.

### Verified
Production build passes; all routes 200 (404 for unknown `/work/slug`); Lighthouse a11y / best-practices / SEO / agentic 100 on desktop and mobile for `/` in dark, and desktop in light (snapshot mode); contrast sampler over 1062 text nodes: 0 failures in each theme; CLS 0.0002, LCP ~1.1s; no console errors; 390px no horizontal overflow; light theme persists after reload. Not verified: real screen readers (VoiceOver/NVDA), Safari/Firefox, live Claude responses.

## History of this redesign effort (what was done, in order)
1. Reviewed the old static site, wrote this CLAUDE.md, confirmed GitHub remote.
2. v2: Next.js rebuild with three.js scene, content pulled from the CV PDF and LinkedIn (experience, projects, certs, skills, testimonials, education incl. M.Tech). Numbered nav removed.
3. v3 "The Ascent" (mountain trek; owner likes trekking, music, dance, travel, mountains), inspired by kunalgaur.in and vidushidesigns.com. Merged GitHub heatmap added.
4. v4: Lenis, mask reveals, sunrise intro, confetti, OG image, favicon, full accessibility pass (contrast fixes, transform-based motion, `useModal`).
5. LAN access attempts failed (`ERR_ADDRESS_UNREACHABLE`, likely client isolation), so Cloudflare quick tunnels are used instead.
6. v5: owner said no v2–v4 section felt good, so a brand-new bento + terminal concept ("B+A"). Then iterated: portrait tile cleaned, metrics one line, certs in terminal, Experience/Skills/Certs grouped before Work, dark/light toggle, old-site palette then `#a03318`, all 27 certs filling their tile, skills re-extracted fully (now 106).
7. Later polish: recommendations made verbatim with avatars + LinkedIn links and a LinkedIn sync script; company logos + per-role summaries/Read more; older roles compacted and two removed; Skills/Experience swapped; skills reordered by relevance; meta copy and git-log theming removed; Kind words/Beyond code swapped; Mountain tile became Haridwar & Ganga ji; Mono flagship revamp, Keycloak/Argo CD added; production server rebuilt after each change.

## Running things (state at last session; may be stale)
- Dev: v5 :3004. Production: v5 :3005.
- Cloudflare quick tunnels (URLs change on restart): `cloudflared tunnel --url http://localhost:PORT`. v5 was `https://discussing-finds-switched-propose.trycloudflare.com` (changes on every restart). Rebuild the production server after content changes or the tunnel serves old output.

## Gotchas learned
- Never truncate a file by opening it for write before reading it (this emptied `app/icon.svg` once and broke the build).
- Next.js `app/api/*` directories must exist before writing route files.
- Edits fail on non-breaking spaces: copy the exact line from the file.
- Hero rows clip with fixed row heights; use `minmax(..., auto)`.

## Open items
- Owner to supply: real images, role/year/stack/what-I-did for IKIO Technologies, RLUX, DHOA, IKIO LED Lighting (and optionally Rowdy Meals tech side), `ANTHROPIC_API_KEY` (and model/cost choice), contact-form email provider.
- Optional border on dark brand buttons; test with VoiceOver/Safari/Firefox; run `npm run sync:linkedin` logged in for the first time and report any issue; confirm the real before/after page-load numbers if they differ from LinkedIn's 9s → 0.6s; optionally render education with logos.
- The owner commits manually; never run `git commit`.

## Owner preferences
Writes Hinglish; wants modern + professional + interactive, genuinely different (not clones of reference sites); keeps older versions so they can switch; wants accessibility preserved; wants things shareable via Cloudflare tunnel; dislikes verbose/meta copy and explanatory notes aimed at builders; wants exact wording from his own sources (recommendations verbatim); asks for small layout polish iteratively and checks screenshots (so verify visually after UI changes).
