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
