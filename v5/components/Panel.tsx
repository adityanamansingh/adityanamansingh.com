"use client";
import { useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useModal } from "./modal";
import { track } from "@/lib/analytics";
import { profile, certifications, certGroups, certGroupOf, testimonials, beyond, skillGroups } from "@/data/profile";
import { projects } from "@/data/projects";
import gh from "@/data/github.json";
import { GitLog, Heatmap, LifeMosaic, Person, ProjectCard, intents, type Images } from "./tiles";

export type PanelId = "experience" | "skills" | "github" | "certs" | "testimonials" | "work" | "life" | "contact";
const titles: Record<PanelId, string> = { experience: "Experience", skills: "Skills", github: "Code activity", certs: "Certifications", testimonials: "Kind words", work: "All work", life: "Beyond code", contact: "Write to me" };

/** Approximate place the message was sent from (city/country level), via the free ipwho.is lookup (no key). Never blocks sending: 2.5s timeout, any failure just means no location. */
async function whereFrom() {
  try {
    const r = await fetch("https://ipwho.is/?fields=success,ip,city,region,country,timezone,connection", { signal: AbortSignal.timeout(2500) });
    const d = await r.json();
    if (!d.success) return {};
    return { location: [d.city, d.region, d.country].filter(Boolean).join(", "), ip: d.ip, network: d.connection?.isp || d.connection?.org || "", timezone: d.timezone?.id || "" };
  } catch { return {}; }
}

function ContactForm({ initialIntent }: { initialIntent?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [intent, setIntent] = useState(initialIntent ?? "");
  const [msg, setMsg] = useState(() => intents.find((i) => i.key === initialIntent)?.text ?? "");
  const pick = (k: (typeof intents)[number]) => {
    const prev = intents.find((i) => i.key === intent);
    const next = intent === k.key ? "" : k.key;
    setIntent(next);
    if (!msg || (prev && msg === prev.text)) setMsg(next ? k.text : "");
  };
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("sending"); track("form_submit", { intent: intent || "none" });
    const form = e.currentTarget;
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const label = intents.find((i) => i.key === intent)?.label ?? "General";
    if (!key) { // no form service configured: hand over to the visitor's mail app instead
      location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio: ${label}`)}&body=${encodeURIComponent(`${msg}\n\n${data.name} (${data.email})`)}`;
      track("form_mailto_fallback"); setState("idle"); return;
    }
    try {
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: key, subject: `Portfolio: ${label} from ${data.name}`, from_name: "adityanamansingh.com", name: data.name, email: data.email, message: msg, topic: label, botcheck: data.botcheck ?? "", ...(await whereFrom()), page: location.href, referrer: document.referrer || "direct" }) });
      const ok = r.ok && (await r.json()).success === true;
      setState(ok ? "ok" : "err"); track(ok ? "generate_lead" : "form_error", { intent: intent || "none", value: 1, currency: "INR" }); if (ok) { form.reset(); setMsg(""); setIntent(""); }
    } catch { setState("err"); track("form_error", { intent: intent || "none", reason: "network" }); }
  }
  const field = "w-full rounded-xl border border-line2 bg-bg px-4 py-3 text-base placeholder:text-muted sm:text-sm";
  return (
    <form onSubmit={submit} className="space-y-4">
      <p className="text-muted">Email works too: <a className="text-fg underline underline-offset-4" href={`mailto:${profile.email}`}>{profile.email}</a>. Pick what this is about, I read everything.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm"><span className="mb-1.5 block text-muted">Your name</span><input name="name" required autoComplete="name" placeholder="Jane Doe" className={field} /></label>
        <label className="block text-sm"><span className="mb-1.5 block text-muted">Your email</span><input name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className={field} /></label>
      </div>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex flex-wrap gap-2" role="group" aria-label="What is this about?">
        {intents.map((k) => <button key={k.key} type="button" aria-pressed={intent === k.key} onClick={() => pick(k)} className="chip">{k.label}</button>)}
      </div>
      <label className="block text-sm"><span className="mb-1.5 block text-muted">Message</span><textarea required rows={6} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Tell me what's on your mind…" className={`${field} resize-none`} /></label>
      <div className="flex items-center gap-4">
        <button disabled={state === "sending"} className="btn-primary disabled:opacity-60">{state === "sending" ? "Sending…" : "Send message"} <ArrowRight size={16} aria-hidden="true" /></button>
        <p role="status" className="text-sm">{state === "ok" && <span className="text-accent">Thanks! I&apos;ll get back to you soon.</span>}{state === "err" && <span className="text-[var(--danger)]">Something went wrong. Please email me directly.</span>}</p>
      </div>
      <p className="text-xs text-muted">Sending also shares your approximate location (city and country), so I know where a message came from.</p>
    </form>
  );
}

function CertList() {
  const [q, setQ] = useState("");
  const list = useMemo(() => certifications.filter((c) => (c.title + c.org).toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <div>
      <label className="block text-sm"><span className="sr-only">Filter certifications</span><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Filter ${certifications.length} certifications…`} className="mb-4 w-full rounded-xl border border-line2 bg-bg px-4 py-3 text-base placeholder:text-muted sm:text-sm" /></label>
      <div className="space-y-6">
        {certGroups.map((g) => {
          const items = list.filter((c) => certGroupOf(c.title) === g);
          if (!items.length) return null;
          return (
            <section key={g} aria-labelledby={`cg-${g}`}>
              <h3 id={`cg-${g}`} className="mono-label !text-[11px]">{g} · {items.length}</h3>
              <ul className="mt-2 grid gap-3 sm:grid-cols-2">{items.map((c) => <li key={c.title} className="rounded-2xl border border-line bg-tile2 p-4"><p className="font-medium">{c.title}</p><p className="text-sm text-muted">{c.org} · {c.period}</p></li>)}</ul>
            </section>
          );
        })}
      </div>
      <p role="status" className="mt-3 text-sm text-muted">{list.length === 0 ? "No match." : ""}</p>
    </div>
  );
}

export default function Panel({ open, intent, onClose, images }: { open: PanelId | null; intent?: string; onClose: () => void; images: Images }) {
  const ref = useRef<HTMLDivElement>(null);
  useModal(open !== null, ref, onClose);
  let body: ReactNode = null;
  if (open === "experience") body = <GitLog verbose />;
  if (open === "skills") body = <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">{skillGroups.map((g) => <section key={g.group}><h3 className="mono-label !text-[11px]">{g.group}</h3><ul className="mt-2 flex flex-wrap gap-1.5">{g.items.map((s) => <li key={s} className="rounded-full border border-line2 px-2.5 py-1 text-xs">{s}</li>)}</ul></section>)}</div>;
  if (open === "github") body = (<div className="space-y-5"><dl className="grid grid-cols-3 gap-3 text-center">{[[gh.total, "contributions"], [gh.activeDays, "active days"], [gh.bestStreak, "day best streak"]].map(([v, l]) => <div key={String(l)} className="rounded-2xl border border-line bg-tile2 p-4"><dd className="text-3xl font-semibold tabular-nums">{String(v)}</dd><dt className="text-sm text-muted">{l}</dt></div>)}</dl><Heatmap cell={12} /><ul className="space-y-1 text-sm text-muted">{gh.accounts.map((u) => <li key={u}><a className="text-fg underline underline-offset-4" href={`https://github.com/${u}`} target="_blank" rel="noreferrer">@{u}<span className="sr-only"> (opens in new tab)</span></a> · {(gh.perAccount as Record<string, number>)[u]} contributions</li>)}</ul></div>);
  if (open === "certs") body = <CertList />;
  if (open === "testimonials") body = <ul className="grid gap-4 sm:grid-cols-2">{testimonials.map((t) => <li key={t.name} className="rounded-2xl border border-line bg-tile2 p-5"><p className="serif whitespace-pre-line text-lg leading-snug">{t.text}</p><Person t={t} className="mt-4" /></li>)}</ul>;
  if (open === "work") body = <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{projects.map((p) => <ProjectCard key={p.slug} p={p} images={images} />)}</div>;
  if (open === "life") body = <div className="space-y-6"><LifeMosaic images={images} big /><ul className="grid gap-3 sm:grid-cols-2">{beyond.curiosity.map((c) => <li key={c} className="rounded-2xl border border-line bg-tile2 p-4 text-sm leading-relaxed">{c}</li>)}</ul></div>;
  if (open === "contact") body = <ContactForm initialIntent={intent} />;
  return (
    <AnimatePresence>
      {open && (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6" onClick={onClose}>
          <m.div ref={ref} role="dialog" aria-modal="true" aria-labelledby="panel-title" initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }} transition={{ type: "spring", damping: 26, stiffness: 260 }}
            className="panel-shell relative flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-line2 bg-tile shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-7"><h2 id="panel-title" className="text-xl font-semibold tracking-tight">{titles[open]}</h2>
              <button onClick={onClose} className="flex h-11 items-center gap-2 rounded-full border border-line2 px-4 text-sm hover:border-accent">Close <X size={15} aria-hidden="true" /></button></div>
            <div className="overflow-y-auto px-5 py-6 sm:px-7">{body}</div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
