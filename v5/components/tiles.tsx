"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import Image from "next/image";
import { animate, useInView } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Compass, Copy, Disc3, Download, ExternalLink, Music2, Plane, Tent, Waves, type LucideIcon } from "lucide-react";
import { profile, metrics, orgOf, experience, certifications, certGroupOf, skillGroups, skillInfo, testimonials } from "@/data/profile";
import { projects, now, type Project } from "@/data/projects";
import gh from "@/data/github.json";
import { copyText } from "@/lib/copy";

export type Images = Record<string, string>;
export const hashOf = (s: string) => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h.toString(16).padStart(7, "0").slice(0, 7); };

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => { if (!inView) return; const c = animate(0, value, { duration: 1.4, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) }); return () => c.stop(); }, [inView, value]);
  return <span ref={ref}><span aria-hidden="true">{n.toLocaleString("en-US")}{suffix}</span><span className="sr-only">{value.toLocaleString("en-US")}{suffix}</span></span>;
}

/* ---------- Hero ---------- */
export function HeroTile({ onWork }: { onWork: () => void }) {
  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-line2 px-3 py-1 text-sm text-muted">
          <span aria-hidden="true" className="pulse-dot h-2 w-2 rounded-full bg-brand" />
          {profile.available ? "Available for freelance" : "Heads down"} · {profile.location}
        </p>
        <h1 className="mt-5 text-[clamp(2.4rem,5.6vw,4.6rem)] font-semibold leading-[1.02] tracking-tight">
          Full-stack engineer who ships <span className="serif text-accent">AI</span> products that last.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted">
          I&apos;m {profile.name.split(" ")[0]}, a Senior Software Engineer at Mono Solutions. Six years across Laravel, Node.js, Vue and Gemini, from design systems and billing to RAG chatbots.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button onClick={onWork} className="btn-primary">See my work <ArrowDown size={16} aria-hidden="true" /></button>
          <a href={profile.cv} download className="btn-ghost"><Download size={16} aria-hidden="true" /> Résumé</a>
        </div>
      </div>
      <dl className="grid grid-cols-3 gap-4 border-t border-line pt-5">
        {metrics.map((m) => (
          <div key={m.label}><dt className="order-2 whitespace-nowrap text-sm text-muted">{m.label}</dt><dd className="text-2xl font-semibold tabular-nums"><Counter value={m.value} suffix={m.suffix} /></dd></div>
        ))}
      </dl>
    </div>
  );
}

/* ---------- Portrait ---------- */
export function PortraitTile({ images }: { images: Images }) {
  const src = images.portrait ?? "/photo.jpg";
  return (
    <div className="relative -mx-5 -mb-5 -mt-5 flex-1 overflow-hidden">
      <Image src={src} alt={`Portrait of ${profile.name}`} fill priority sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover object-[50%_30%]" />
    </div>
  );
}

/* ---------- GitHub heatmap ---------- */
type Day = { date: string; count: number; level: number };
export const heat = ["var(--h0)", "var(--h1)", "var(--h2)", "var(--h3)", "var(--h4)"];
export const fmtDate = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function Heatmap({ weeksToShow, cell = 11 }: { weeksToShow?: number; cell?: number }) {
  const days = gh.days as Day[];
  const [hover, setHover] = useState<Day | null>(null);
  const weeks = useMemo(() => {
    const cols: (Day | null)[][] = []; let col: (Day | null)[] = [];
    const first = new Date(days[0].date + "T00:00:00").getDay();
    for (let i = 0; i < first; i++) col.push(null);
    for (const d of days) { col.push(d); if (col.length === 7) { cols.push(col); col = []; } }
    if (col.length) cols.push(col);
    return weeksToShow ? cols.slice(-weeksToShow) : cols;
  }, [days, weeksToShow]);
  return (
    <div>
      <div role="img" tabIndex={0} aria-label={`Contribution heatmap, last year: ${gh.total} contributions across two GitHub accounts, ${gh.activeDays} active days, best streak ${gh.bestStreak} days.`} className="overflow-x-auto rounded pb-1">
        <div className="flex w-max gap-[3px]">
          {weeks.map((w, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {w.map((d, di) => d
                ? <span key={di} onMouseEnter={() => setHover(d)} onMouseLeave={() => setHover(null)} className="block rounded-[3px]" style={{ width: cell, height: cell, background: heat[d.level] }} />
                : <span key={di} className="block" style={{ width: cell, height: cell }} />)}
            </div>
          ))}
        </div>
      </div>
      <p aria-hidden="true" className="mt-2 h-4 font-mono text-xs text-muted">{hover ? `${hover.count} contribution${hover.count === 1 ? "" : "s"} · ${fmtDate(hover.date)}` : ""}</p>
    </div>
  );
}

export function GitHubTile() {
  return (
    <div className="flex h-full flex-col justify-between gap-3">
      <dl className="grid grid-cols-3 gap-3">
        {[[gh.total, "contributions / yr"], [gh.activeDays, "active days"], [gh.bestStreak, "day best streak"]].map(([v, l]) => (
          <div key={String(l)}><dd className="text-2xl font-semibold tabular-nums"><Counter value={Number(v)} /></dd><dt className="text-xs text-muted">{l}</dt></div>
        ))}
      </dl>
      <Heatmap weeksToShow={30} />
      <p className="text-xs text-muted">{gh.accounts.map((u, i) => <span key={u}>{i > 0 && " · "}<a href={`https://github.com/${u}`} target="_blank" rel="noopener noreferrer" className="tap text-fg underline underline-offset-4 hover:text-accent">@{u}<span className="sr-only"> on GitHub (opens in new tab)</span></a></span>)}</p>
    </div>
  );
}

/* ---------- Currently ---------- */
export function NowTile() {
  return (
    <dl className="grid gap-3">
      {now.map((n) => (
        <div key={n.label} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-line pb-3 last:border-0 last:pb-0"><dt className="mono-label !normal-case !tracking-normal pt-0.5">{n.label}</dt><dd className="text-sm">{n.value}</dd></div>
      ))}
    </dl>
  );
}

/* ---------- Experience ---------- */
export function GitLog({ limit, verbose }: { limit?: number; verbose?: boolean }) {
  const list = limit ? experience.slice(0, limit) : experience;
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [allRoles, setAllRoles] = useState(false);
  const toggle = (k: string) => setOpen((s) => { const n = new Set(s); if (n.has(k)) n.delete(k); else n.add(k); return n; });
  return (
    <>
    <ol className="space-y-3.5 font-mono text-[13px]">
      {list.map((e, i) => {
        const key = e.role + e.org, id = `exp-${hashOf(key)}`, isOpen = verbose || open.has(key);
        const earlier = "earlier" in e && !!e.earlier, org = orgOf(e.org), orgName = e.org.split(" · ")[0];
        const groups = "groups" in e && e.groups ? e.groups : [{ title: "", points: e.points ?? [] }];
        const pts = groups.flatMap((g) => g.points);
        const summary = ("summary" in e && e.summary) || pts[0];
        const summaryNode = Array.isArray(summary) ? <ul className="mt-2 list-disc space-y-1 pl-4 font-sans text-sm text-muted">{summary.map((x) => <li key={x}>{x}</li>)}</ul> : summary ? <p className="mt-1.5 font-sans text-sm text-muted">{summary}</p> : null;
        const more = pts.length > 1 || groups.length > 1;
        const name = org?.url ? <a href={org.url} target="_blank" rel="noopener noreferrer" className="tap underline-offset-4 hover:text-accent hover:underline">{orgName}<span className="sr-only"> on LinkedIn (opens in new tab)</span></a> : orgName;
        return (
          <li key={key} className={`${i >= 2 && !allRoles && !verbose ? "hidden" : ""} relative pl-5 before:absolute before:left-[3px] before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-brand after:absolute after:bottom-[-1rem] after:left-[6.5px] after:top-4 after:w-px after:bg-line2 last:after:hidden`}>
            <div className={`flex ${earlier ? "gap-2" : "mt-1.5 gap-3"}`}>
              {org?.logo && (/* eslint-disable-next-line @next/next/no-img-element */ <img src={org.logo} alt="" width={32} height={32} loading="lazy" className={`shrink-0 rounded-md bg-white object-cover ${earlier ? "mt-0.5 h-6 w-6" : "h-11 w-11"}`} />)}
              <div className="min-w-0 flex-1 leading-snug">
                <p className="font-sans text-[15px] font-medium !leading-snug text-fg">{e.role}</p>
                <p className="mt-1 text-xs !leading-[1.35] text-muted">{name}</p>
                <p className="text-xs !leading-[1.35] text-muted">{e.period}</p>
              </div>
            </div>
            {!isOpen && summaryNode}
            {isOpen && <div id={id} className="mt-2 space-y-3 font-sans text-sm text-muted">{groups.map((g) => <div key={g.title + g.points[0]}>{g.title && <p className="font-medium text-fg">{g.title}</p>}<ul className="mt-1 list-disc space-y-1 pl-4">{g.points.map((p) => <li key={p}>{p}</li>)}</ul></div>)}</div>}
            {!verbose && more && <button type="button" onClick={() => toggle(key)} aria-expanded={isOpen} aria-controls={isOpen ? id : undefined} className="tap mt-1 font-sans text-[13px] text-accent underline underline-offset-4">{isOpen ? "Show less" : "Read more"}<span className="sr-only"> about {e.role} at {orgName}</span></button>}
          </li>
        );
      })}
    </ol>
    {!verbose && list.length > 2 && <button type="button" onClick={() => setAllRoles((a) => !a)} aria-expanded={allRoles} className="tap mt-3 font-sans text-sm text-accent underline underline-offset-4">{allRoles ? "Show fewer roles" : `Show ${list.length - 2} earlier roles`}</button>}
    </>
  );
}
export function ExperienceTile() { return <GitLog />; }

/* ---------- Projects ---------- */
export function ProjectCard({ p, images, className = "", featured = false }: { p: Project; images: Images; className?: string; featured?: boolean }) {
  const cover = images[`project-${p.slug}`];
  return (
    <Link href={`/work/${p.slug}`} className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-tile2 transition hover:-translate-y-1 hover:border-accent ${featured ? "md:flex-row" : ""} ${className}`}>
      <div style={p.coverBg ? { background: p.coverBg } : undefined} className={`relative aspect-[16/10] overflow-hidden bg-bg ${featured ? "md:w-3/5 md:shrink-0" : ""}`}>
        {cover
          // eslint-disable-next-line @next/next/no-img-element
          ? <Image src={cover} alt={`${p.title} screenshot`} unoptimized={cover.split("?")[0].endsWith(".svg")} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className={`transition duration-500 group-hover:scale-105 ${p.coverBg ? "object-contain" : "object-cover"}`} />
          : <div aria-hidden="true" className="relative flex h-full w-full items-end overflow-hidden bg-[linear-gradient(135deg,var(--tile-2),var(--bg))] p-4">
              <span className="absolute -right-2 -top-6 select-none text-[7rem] font-semibold leading-none tracking-tighter text-fg/[0.06]">{p.title.slice(0, 2)}</span>
              <span className="relative flex flex-wrap gap-1.5">{p.stack.slice(0, featured ? 5 : 3).map((t) => <span key={t} className="rounded-full border border-line2 px-2 py-0.5 font-mono text-[11px] text-muted">{t}</span>)}</span>
            </div>}
      </div>
      <div className={`flex flex-1 flex-col gap-1 p-4 ${featured ? "md:justify-center md:gap-2 md:p-8" : ""}`}>
        <p className="mono-label !text-[11px]">{p.kind}{p.year !== "—" ? ` · ${p.year}` : ""}</p>
        <p className="flex items-center justify-between gap-2 text-lg font-semibold tracking-tight">{p.title}<ArrowUpRight size={18} aria-hidden="true" className="shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" /></p>
        <p className={`text-sm text-muted ${featured ? "md:text-base" : "line-clamp-2"}`}>{p.summary}</p>
      </div>
    </Link>
  );
}
export function ProjectsTile({ images }: { images: Images }) {
  // Only projects that have a cover image; the rest stay in the "all work" dialog until a cover is added.
  const list = projects.filter((p) => images[`project-${p.slug}`]);
  const rem = list.length % 3;
  return (
    <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-6">
      {list.map((p, i) => {
        // 6-column grid: cards take 2 columns; a leftover pair takes 3 each, a lone leftover card spans the row (the lead project).
        const span = rem === 1 && i === 0 ? "sm:col-span-6" : rem === 2 && i >= list.length - 2 ? "sm:col-span-3" : "sm:col-span-2";
        return <ProjectCard key={p.slug} p={p} images={images} featured={span === "sm:col-span-6"} className={span} />;
      })}
    </div>
  );
}

/* ---------- Skills ---------- */
export function SkillsTile() {
  const [active, setActive] = useState<string | null>(null);
  const used = active ? projects.filter((p) => p.stack.some((s) => s.toLowerCase().includes(active.toLowerCase()))).map((p) => p.title) : [];
  const [all, setAll] = useState(false);
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="sm:columns-2 sm:gap-x-6">
        {skillGroups.map((g, gi) => (
          <div key={g.group} className={`mb-3.5 break-inside-avoid ${gi >= 6 && !all ? "hidden" : ""}`}>
            <p className="mono-label !text-[11px]">{g.group}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <button key={s} onMouseEnter={() => setActive(s)} onFocus={() => setActive(s)} onMouseLeave={() => setActive(null)} onBlur={() => setActive(null)} aria-describedby="skill-caption" className="chip !min-h-7 !px-2.5 !py-1 !text-xs">{s}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => setAll((a) => !a)} aria-expanded={all} className="tap -mt-1 self-start text-sm text-accent underline underline-offset-4">{all ? "Show fewer skills" : `Show ${skillGroups.length - 6} more skill areas`}</button>
      <p id="skill-caption" aria-live="polite" className="mt-auto min-h-[3.25rem] border-t border-line pt-3 text-sm text-muted">
        {active ? <><span className="text-accent">{active}</span>{skillInfo[active] ? `: ${skillInfo[active]}` : ""}{used.length > 0 && <span className="text-fg"> Used in {used.join(", ")}.</span>}</> : "Hover or focus a skill to see where I've used it."}
      </p>
    </div>
  );
}

/* ---------- Certifications ---------- */
export function CertsTile({ onAll }: { onAll: () => void }) {
  // Most relevant first (flagged `top` in data/profile.ts, kept in that order); the full list opens in the dialog.
  const featured = certifications.filter((c) => "top" in c && c.top);
  return (
    <div className="flex h-full flex-col gap-5">
      <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((c) => <li key={c.title} className="border-l-2 border-line pl-3"><p className="text-sm font-medium leading-snug">{c.title}</p><p className="text-xs text-muted">{c.org} · {c.period}</p></li>)}
      </ul>
      <button type="button" onClick={onAll} aria-haspopup="dialog" className="tap self-start text-sm text-accent underline underline-offset-4">Show all {certifications.length} certifications</button>
    </div>
  );
}

export function Person({ t, className = "" }: { t: (typeof testimonials)[number]; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={t.photo} alt="" width={48} height={48} loading="lazy" className="h-12 w-12 shrink-0 rounded-full border border-line2 object-cover" />
      <div className="min-w-0">
        <p className="text-sm font-medium">
          <a href={t.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${t.name} on LinkedIn (opens in a new tab)`} className="tap gap-1.5 underline-offset-4 hover:text-accent hover:underline">{t.name}<ExternalLink size={12} aria-hidden="true" className="text-muted" /></a>
        </p>
        <p className="text-xs text-muted">{t.role}</p>
      </div>
    </div>
  );
}

/* ---------- Testimonials ---------- */
export function TestimonialsTile({ onAll }: { onAll: () => void }) {
  const [i, setI] = useState(0);
  const n = testimonials.length, t = testimonials[i];
  return (
    <div role="region" aria-roledescription="carousel" aria-label="Testimonials" className="flex h-full flex-col">
      <div aria-live="polite" aria-atomic="true" className="flex-1">
        <div tabIndex={0} role="group" aria-label={`Recommendation from ${t.name}, scrollable`} className="max-h-[21rem] overflow-y-auto pr-2"><p className={`serif whitespace-pre-line leading-snug text-fg ${t.text.length > 450 ? "text-base" : t.text.length > 200 ? "text-lg" : "text-[1.35rem]"}`}>{t.text}</p></div>
        <Person t={t} className="mt-4" />
        {t.text.length > 850 && <p className="mt-1 font-mono text-[11px] text-muted">Scroll the quote to read it all</p>}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous testimonial" className="flex h-11 w-11 items-center justify-center rounded-full border border-line2 hover:border-accent"><ArrowLeft size={16} aria-hidden="true" /></button>
          <button onClick={() => setI((i + 1) % n)} aria-label="Next testimonial" className="flex h-11 w-11 items-center justify-center rounded-full border border-line2 hover:border-accent"><ArrowRight size={16} aria-hidden="true" /></button>
          <span className="font-mono text-xs tabular-nums text-muted">{String(i + 1).padStart(2, "0")} / {n}</span>
        </div>
        <button onClick={onAll} className="min-h-11 px-2 text-sm text-muted underline underline-offset-4 hover:text-fg">Read all</button>
      </div>
    </div>
  );
}

/* ---------- Beyond code ---------- */
const tint = (hue: string) => `linear-gradient(135deg, color-mix(in srgb, ${hue} 28%, var(--tile-2)), var(--tile))`;
export const lifeItems: { key: string; title: string; note: string; Icon: LucideIcon; art: string }[] = [
  { key: "trek", title: "Trekking", note: "Eyeing Phulara Ridge and Madhyamaheshwar.", Icon: Tent, art: tint("#5aa469") },
  { key: "mountain", title: "Haridwar & Ganga ji", note: "Roots by the Ganga. Quiet mornings, sunrises.", Icon: Waves, art: tint("#4aa3c7") },
  { key: "music", title: "Music", note: "Music on while I think.", Icon: Music2, art: tint("#a56bce") },
  { key: "dance", title: "Dance", note: "A little dancing when the mood strikes.", Icon: Disc3, art: tint("#e0577a") },
  { key: "travel", title: "Moving places", note: "Long drives, new places.", Icon: Plane, art: tint("#ffb324") },
];
export function LifeMosaic({ images, big, compact }: { images: Images; big?: boolean; compact?: boolean }) {
  const span = compact ? ["col-span-2", "", "", "md:col-span-2 lg:col-span-1", "md:col-span-2 lg:col-span-1"] : ["col-span-2", "", "", "col-span-2", "col-span-2"];
  return (
    <ul className={`grid flex-1 grid-cols-2 gap-3 ${compact ? "auto-rows-[7rem] md:grid-cols-4 lg:grid-cols-2" : `sm:grid-cols-4 ${big ? "auto-rows-[11rem]" : "auto-rows-[8.5rem]"}`}`}>
      {lifeItems.map((it, i) => {
        const src = images[`life-${it.key}`];
        return (
          <li key={it.key} className={`relative overflow-hidden rounded-2xl border border-line ${span[i]}`} style={{ background: it.art }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {src ? <Image src={src} alt={it.title} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" /> : <it.Icon aria-hidden="true" size={big ? 54 : compact ? 26 : 40} strokeWidth={1.2} className={`absolute text-fg/20 ${compact ? "right-3 top-3" : "right-4 top-4"}`} />}
            <div className={`absolute inset-x-0 bottom-0 p-3 ${src ? "bg-gradient-to-t from-bg/90 to-transparent pt-8" : ""}`}><p className="text-sm font-medium">{it.title}</p><p className="text-xs text-muted">{it.note}</p></div>
          </li>
        );
      })}
    </ul>
  );
}
export function LifeTile({ images }: { images: Images }) { return <LifeMosaic images={images} compact />; }

/* ---------- Contact ---------- */
export const intents = [
  { key: "hiring", label: "I'm hiring", text: "Hi Aditya, we're hiring and your profile caught our eye. The role is: " },
  { key: "freelance", label: "Freelance project", text: "Hi Aditya, I have a project in mind: " },
  { key: "chat", label: "Just chit-chat ☕", text: "Hey Aditya! No agenda, just wanted to say hi. " },
  { key: "trek", label: "Trek / travel buddy", text: "Hey Aditya, I'm planning a trip or trek and thought of you: " },
] as const;

export function ContactTile({ onOpen }: { onOpen: (intent?: string) => void }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex h-full flex-col gap-5 lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
      <div>
      <p className="text-3xl font-semibold leading-tight tracking-tight">Have something in mind? <span className="serif text-accent">Let&apos;s talk.</span></p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <a href={`mailto:${profile.email}`} className="tap break-all text-sm underline underline-offset-4 hover:text-accent">{profile.email}</a>
        <button onClick={() => copyText(profile.email).then((ok) => { if (ok) track("copy_email"); setCopied(ok); setTimeout(() => setCopied(false), 1800); })} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line2 px-3 text-xs hover:border-accent" aria-live="polite">
          {copied ? <><Check size={13} aria-hidden="true" /> Copied</> : <><Copy size={13} aria-hidden="true" /> Copy</>}
        </button>
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm" aria-label="Social profiles">
        {profile.socials.map((s) => (
          <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="tap gap-1.5 text-muted underline-offset-4 hover:text-accent hover:underline">{s.label}<span className="text-xs text-muted/80">{s.handle}</span><ExternalLink size={12} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></li>
        ))}
      </ul>
      </div>
      <div>
        <p className="mono-label !text-[11px]">What is this about?</p>
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="What is this about?">
          {intents.map((k) => <button key={k.key} onClick={() => onOpen(k.key)} className="chip">{k.label}</button>)}
        </div>
        <button onClick={() => onOpen()} className="btn-primary mt-5">Write a message <ArrowRight size={16} aria-hidden="true" /></button>
      </div>
    </div>
  );
}
export { Compass };
