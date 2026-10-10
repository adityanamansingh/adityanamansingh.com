// Syncs the recommendations you have RECEIVED on LinkedIn into data/recommendations.json and
// downloads each recommender's current profile photo into public/images/people/.
//
//   npm run sync:linkedin               opens Chrome (first run: log in to LinkedIn once; the session is kept)
//   npm run sync:linkedin -- --headless after the first login, run without a visible window
//   npm run sync:linkedin -- --prune    also drop people whose recommendation no longer exists on LinkedIn
//
// What it does per recommendation (matched by the LinkedIn profile slug):
//   - text, date, relationship and photo are refreshed from LinkedIn (verbatim, never summarised)
//   - "role" (the label shown under the name) is kept if you edited it; new people get their LinkedIn headline
//   - "hidden": true entries stay hidden (that is how people are excluded from the site)
//   - new recommendations are added at the top
// Needs Google Chrome installed (set CHROME_PATH if it is somewhere else). The login session lives in
// .linkedin-profile/ (git-ignored). Nothing is sent anywhere except to linkedin.com and its image CDN.
import puppeteer from "puppeteer-core";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const JSON_PATH = join(root, "data/recommendations.json");
const PEOPLE_DIR = join(root, "public/images/people");
const PROFILE = "adityanamansingh";
const headless = process.argv.includes("--headless");
const prune = process.argv.includes("--prune");
const CHROME = process.env.CHROME_PATH || ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium", "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"].find(existsSync);
if (!CHROME) { console.error("Chrome not found. Install it or set CHROME_PATH."); process.exit(1); }

const slugOf = (url) => decodeURIComponent((/\/in\/([^/?#]+)/.exec(url) ?? [])[1] ?? "").toLowerCase();
const fileSlug = (name) => name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless,
  userDataDir: join(root, ".linkedin-profile"),
  defaultViewport: { width: 1280, height: 900 },
  args: ["--no-first-run", "--disable-blink-features=AutomationControlled"],
});

try {
  const page = (await browser.pages())[0] ?? (await browser.newPage());
  await page.goto(`https://www.linkedin.com/in/${PROFILE}/details/recommendations/?detailScreenTabIndex=0`, { waitUntil: "domcontentloaded" });

  // Wait for the login (first run only). Gives you 5 minutes.
  const onRecs = () => /\/details\/recommendations/.test(page.url());
  if (!onRecs()) {
    if (headless) { console.error("Not logged in. Run once without --headless and log in."); process.exit(1); }
    console.log("Log in to LinkedIn in the opened window. Waiting up to 5 minutes...");
    for (let i = 0; i < 150 && !onRecs(); i++) await sleep(2000);
    if (!onRecs()) await page.goto(`https://www.linkedin.com/in/${PROFILE}/details/recommendations/?detailScreenTabIndex=0`, { waitUntil: "domcontentloaded" });
  }
  await page.waitForSelector("main", { timeout: 30000 });
  await sleep(2500);

  // Load everything: scroll the page and any inner scroll container, and expand every "… more".
  await page.evaluate(async () => {
    let last = -1;
    for (let i = 0; i < 30; i++) {
      const scrollers = [...document.querySelectorAll("*")].filter((e) => e.scrollHeight > e.clientHeight + 50 && /auto|scroll/.test(getComputedStyle(e).overflowY));
      scrollers.forEach((e) => (e.scrollTop = e.scrollHeight));
      window.scrollTo(0, document.body.scrollHeight);
      document.querySelectorAll("button").forEach((b) => { if (/^(…|\.\.\.)?\s*more$/i.test(b.innerText.trim()) || /see more/i.test(b.innerText)) b.click(); });
      await new Promise((r) => setTimeout(r, 800));
      const len = document.body.innerText.length;
      if (len === last && i > 4) break;
      last = len;
    }
  });

  // Each recommendation = the smallest ancestor of a profile link (with avatar) that holds exactly one such link.
  const scraped = await page.evaluate(() => {
    const links = [...document.querySelectorAll('main a[href*="/in/"]')].filter((a) => a.querySelector("img"));
    const seen = new Set(), out = [];
    for (const a of links) {
      const href = a.href.split("?")[0];
      if (seen.has(href)) continue;
      seen.add(href);
      let card = a;
      while (card.parentElement && card.parentElement !== document.body && [...card.parentElement.querySelectorAll('a[href*="/in/"]')].filter((x) => x.querySelector("img")).every((x) => x.href.split("?")[0] === href)) card = card.parentElement;
      const lines = card.innerText.split("\n").map((l) => l.trim());
      const nonEmpty = lines.filter(Boolean);
      const name = nonEmpty[0];
      const headline = nonEmpty.find((l, i) => i > 1 && !/^·/.test(l)) ?? "";
      const rel = nonEmpty.find((l) => /^[A-Z][a-z]+ \d{1,2}, \d{4}, /.test(l)) ?? "";
      const m = /\nOn\n+([\s\S]*)$/.exec(card.innerText.replace(/\r/g, ""));
      const text = (m ? m[1] : "").replace(/\n\s*(…|\.\.\.)\s*more\s*$/i, "").trim().split("\n").map((l) => l.replace(/[ \t]+/g, " ").trim()).join("\n");
      out.push({ name: name?.replace(/\s+/g, " ").trim(), href, headline, rel, text, img: a.querySelector("img").currentSrc || a.querySelector("img").src });
    }
    return out;
  });

  // The page also lists "Given"/"Pending" only behind other tabs, so everything here is "Received".
  if (!scraped.length || scraped.every((s) => !s.text)) { console.error("Found no recommendations; leaving files untouched (LinkedIn markup may have changed)."); process.exit(1); }

  mkdirSync(PEOPLE_DIR, { recursive: true });
  const existing = JSON.parse(readFileSync(JSON_PATH, "utf8"));
  const bySlug = new Map(existing.map((e) => [slugOf(e.linkedin), e]));
  const added = [], updated = [], fresh = [];

  for (const s of scraped) {
    const slug = slugOf(s.href);
    const prev = bySlug.get(slug);
    const dm = /^([A-Z][a-z]+ \d{1,2}, \d{4}), (.*)$/.exec(s.rel);
    const rel = dm ? dm[2].replace(/^.*? (was|managed|studied|worked)/, "$1") : "";
    const entry = {
      ...(prev ?? {}),
      name: prev?.name ?? s.name,
      linkedin: prev?.linkedin ?? s.href,
      role: prev?.role || (s.headline.length > 90 ? s.headline.slice(0, 87).replace(/[\s|•,-]+\S*$/, "") + "…" : s.headline),
      photo: prev?.photo ?? `/images/people/${fileSlug(s.name)}.jpg`,
      text: s.text || prev?.text || "",
      date: dm ? dm[1] : prev?.date,
      relationship: rel || prev?.relationship,
    };
    if (entry.hidden) { fresh.push(entry); continue; } // keep excluded people excluded, but keep their data current
    // photo: download (the CDN link is signed and expires, so we store our own copy)
    try {
      const res = await fetch(s.img, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (res.ok && (res.headers.get("content-type") ?? "").startsWith("image/")) {
        const buf = Buffer.from(await res.arrayBuffer());
        const file = join(root, "public", entry.photo);
        const same = existsSync(file) && readFileSync(file).equals(buf);
        if (!same) { writeFileSync(file, buf); console.log(`  photo ${prev ? "changed" : "saved"}: ${entry.photo}`); }
      } else console.warn(`  photo skipped for ${entry.name} (HTTP ${res.status})`);
    } catch (e) { console.warn(`  photo failed for ${entry.name}: ${e.message}`); }
    if (!prev) added.push(entry.name);
    else if (prev.text !== entry.text || prev.date !== entry.date) updated.push(entry.name);
    fresh.push(entry);
  }

  const seenSlugs = new Set(scraped.map((s) => slugOf(s.href)));
  const missing = existing.filter((e) => !seenSlugs.has(slugOf(e.linkedin)));
  const newOnes = fresh.filter((e) => added.includes(e.name));
  const kept = existing.map((e) => fresh.find((f) => slugOf(f.linkedin) === slugOf(e.linkedin)) ?? (prune ? null : e)).filter(Boolean);
  writeFileSync(JSON_PATH, JSON.stringify([...newOnes, ...kept], null, 2) + "\n");

  console.log(`\nLinkedIn recommendations found: ${scraped.length}`);
  console.log(`  added:   ${added.join(", ") || "none"}`);
  console.log(`  changed: ${updated.join(", ") || "none"}`);
  if (missing.length) console.log(`  no longer on LinkedIn: ${missing.map((m) => m.name).join(", ")} ${prune ? "(removed)" : "(kept; run with --prune to remove)"}`);
  if (added.length) console.log("New people were added with their LinkedIn headline as 'role'; edit data/recommendations.json to tidy it, or set \"hidden\": true to exclude.");
  console.log("Restart the production server (or rebuild) to see the changes.");
} finally {
  await browser.close();
}
