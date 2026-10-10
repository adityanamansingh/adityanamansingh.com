// Merges the public contribution calendars (and recent public commits) of multiple GitHub accounts
// into data/github.json. Usage: node scripts/sync-github.mjs   (no token needed; public data only)
import { writeFileSync, mkdirSync } from "node:fs";

const ACCOUNTS = ["adityanamansingh", "adityanamansingh-mono"];

async function calendar(user) {
  const html = await (await fetch(`https://github.com/users/${user}/contributions`)).text();
  const tips = Object.fromEntries([...html.matchAll(/for="(contribution-day-component-[\d-]+)"[^>]*>([^<]*)<\/tool-tip>/g)].map((m) => [m[1], m[2]]));
  return [...html.matchAll(/data-date="(\d{4}-\d\d-\d\d)"[^>]*?id="(contribution-day-component-[\d-]+)"/g)].map(([, date, id]) => {
    const m = /^(\d+) contribution/.exec(tips[id] ?? "");
    return { date, count: m ? Number(m[1]) : 0 };
  });
}

async function recentCommits(user) {
  try {
    const r = await fetch(`https://api.github.com/users/${user}/events/public?per_page=60`, { headers: { "User-Agent": "portfolio-sync" } });
    if (!r.ok) return [];
    const ev = await r.json();
    return ev.filter((e) => e.type === "PushEvent").flatMap((e) =>
      (e.payload.commits ?? []).map((c) => ({ repo: e.repo.name, message: c.message.split("\n")[0], date: e.created_at, account: user })));
  } catch { return []; }
}

const perAccount = {};
const byDate = new Map();
for (const u of ACCOUNTS) {
  const days = await calendar(u);
  perAccount[u] = days.reduce((s, d) => s + d.count, 0);
  for (const d of days) byDate.set(d.date, (byDate.get(d.date) ?? 0) + d.count);
}
const days = [...byDate].sort(([a], [b]) => (a < b ? -1 : 1)).map(([date, count]) => ({ date, count }));
const max = Math.max(1, ...days.map((d) => d.count));
const q = [0, 0.25, 0.5, 0.75].map((f) => Math.ceil(max * f));
const level = (c) => (c === 0 ? 0 : c <= q[1] ? 1 : c <= q[2] ? 2 : c <= q[3] ? 3 : 4);
const out = days.map((d) => ({ ...d, level: level(d.count) }));

let best = 0, run = 0, current = 0;
for (const d of out) { run = d.count ? run + 1 : 0; best = Math.max(best, run); }
for (let i = out.length - 1; i >= 0; i--) { if (out[i].count) current++; else if (i !== out.length - 1) break; }

const commits = (await Promise.all(ACCOUNTS.map(recentCommits))).flat().sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 8);

mkdirSync(new URL("../data/", import.meta.url), { recursive: true });
writeFileSync(new URL("../data/github.json", import.meta.url), JSON.stringify({
  generatedAt: new Date().toISOString(), accounts: ACCOUNTS, perAccount,
  total: out.reduce((s, d) => s + d.count, 0), bestStreak: best, currentStreak: current,
  activeDays: out.filter((d) => d.count).length, days: out, commits,
}));
console.log("accounts", perAccount, "total", out.reduce((s, d) => s + d.count, 0), "days", out.length, "streak", best, "commits", commits.length);
