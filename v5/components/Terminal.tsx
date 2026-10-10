"use client";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { profile, experience, certifications, skillGroups, skillInfo } from "@/data/profile";
import { projects, now } from "@/data/projects";
import gh from "@/data/github.json";

type Line = { id: number; node: ReactNode };

const hash = (s: string) => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h.toString(16).padStart(7, "0").slice(0, 7); };
const Dim = ({ children }: { children: ReactNode }) => <span className="text-muted">{children}</span>;
const Acc = ({ children }: { children: ReactNode }) => <span className="text-accent">{children}</span>;

const HELP: [string, string][] = [
  ["help", "list commands"], ["whoami", "one-line intro"], ["about", "short bio"], ["experience", "my roles"],
  ["projects", "list case studies"], ["open <n|name>", "open a case study"], ["skills [filter]", "what I work with, e.g. skills cloud"], ["certs [filter]", "all certifications, e.g. certs google"],
  ["github", "commit activity"], ["now", "what I'm up to"], ["contact", "email, phone, links"], ["cv", "download résumé"],
  ["clear", "clear the screen"],
];

export default function Terminal({ focusKey }: { focusKey?: number }) {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const idRef = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hist = useRef<string[]>([]);
  const histPos = useRef(-1);

  const push = useCallback((node: ReactNode) => { const id = ++idRef.current; setLines((l) => [...l, { id, node }]); return id; }, []);

  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight }); }, [lines]);
  useEffect(() => { if (focusKey) inputRef.current?.focus({ preventScroll: true }); }, [focusKey]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable], [role=dialog]")) return;
      if (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) { e.preventDefault(); document.getElementById("terminal")?.scrollIntoView({ block: "center" }); inputRef.current?.focus({ preventScroll: true }); }
    };
    addEventListener("keydown", onKey); return () => removeEventListener("keydown", onKey);
  }, []);

  const projectByArg = useCallback((arg: string) => {
    const n = Number(arg);
    if (Number.isInteger(n) && n >= 1 && n <= projects.length) return projects[n - 1];
    const a = arg.toLowerCase();
    return projects.find((p) => p.slug === a || p.title.toLowerCase() === a || p.slug.includes(a) || p.title.toLowerCase().includes(a));
  }, []);

  const run = useCallback(async (raw: string) => {
    const input = raw.trim();
    if (!input) return;
    hist.current.unshift(input); histPos.current = -1;
    push(<div><Acc>$</Acc> {input}</div>);
    const [cmd, ...rest] = input.split(/\s+/);
    const arg = rest.join(" ");
    switch (cmd.toLowerCase()) {
      case "help": push(<dl className="grid grid-cols-[auto_1fr] gap-x-4">{HELP.map(([c, d]) => <div key={c} className="contents"><dt><Acc>{c}</Acc></dt><dd><Dim>{d}</Dim></dd></div>)}</dl>); break;
      case "whoami": push(<div>{profile.name} — {profile.role}, {profile.location}. <Dim>6+ years, Laravel, Node.js, Vue, Gemini.</Dim></div>); break;
      case "about": push(<div className="space-y-2">{profile.about.slice(1, 4).map((p) => <p key={p}>{p}</p>)}</div>); break;
      case "experience": case "log": push(<ul className="space-y-1.5">{experience.map((e, i) => (
        <li key={e.role + e.org}><Acc>*</Acc> {e.role} <Dim>@ {e.org.split(" · ")[0]} · {e.period}</Dim></li>))}</ul>); break;
      case "projects": case "work": push(<ol className="space-y-1">{projects.map((p, i) => <li key={p.slug}><Acc>{i + 1}.</Acc> {p.title} <Dim>— {p.kind}. </Dim></li>)}<li><Dim>Type <Acc>open &lt;n&gt;</Acc> to read a case study.</Dim></li></ol>); break;
      case "open": {
        const p = arg ? projectByArg(arg) : undefined;
        if (!p) push(<span className="text-[var(--danger)]">No such project. Try: {projects.map((x) => x.slug).join(", ")}</span>);
        else { push(<Dim>Opening {p.title}…</Dim>); router.push(`/work/${p.slug}`); }
        break;
      }
      case "skills": {
        const f = arg.toLowerCase();
        const gs = skillGroups.map((g) => ({ ...g, items: g.group.toLowerCase().includes(f) ? g.items : g.items.filter((it) => it.toLowerCase().includes(f)) })).filter((g) => !f || g.items.length > 0);
        push(gs.length === 0
          ? <span className="text-[var(--danger)]">No skill matches &ldquo;{arg}&rdquo;. Try: skills cloud, skills ai, skills laravel</span>
          : <div className="space-y-1.5">{gs.map((g) => <div key={g.group}><Acc>{g.group}</Acc> <Dim>({g.items.length})</Dim><div>{g.items.join(", ")}</div></div>)}{!f && <Dim>Filter with: skills cloud · skills ai · skills laravel</Dim>}</div>);
        break;
      }
      case "certs": case "certifications": case "cert": {
        const f = arg.toLowerCase();
        const list = certifications.filter((c) => !f || (c.title + " " + c.org + " " + c.period).toLowerCase().includes(f));
        push(list.length === 0
          ? <span className="text-[var(--danger)]">No certification matches &ldquo;{arg}&rdquo;. Try: certs google, certs gemini, certs 2025</span>
          : <div><Dim>{f ? `${list.length} of ${certifications.length}` : certifications.length} certifications{f ? ` matching "${arg}"` : ""}:</Dim><ul className="mt-1 space-y-0.5">{list.map((c) => <li key={c.title}><Acc>·</Acc> {c.title} <Dim>({c.org}, {c.period})</Dim></li>)}</ul>{!f && <Dim>Filter with: certs google · certs gemini · certs 2025</Dim>}</div>);
        break;
      }
      case "github": push(<div>{gh.total} contributions in the last year · {gh.activeDays} active days · best streak {gh.bestStreak} days.<br /><Dim>@{gh.accounts.join(" · @")}</Dim></div>); break;
      case "now": push(<dl className="grid grid-cols-[auto_1fr] gap-x-4">{now.map((n) => <div key={n.label} className="contents"><dt><Acc>{n.label}</Acc></dt><dd>{n.value}</dd></div>)}</dl>); break;
      case "contact": case "email": push(<div className="space-y-0.5"><div>Email <a className="text-accent underline underline-offset-4" href={`mailto:${profile.email}`}>{profile.email}</a></div><div>Phone <a className="text-accent underline underline-offset-4" href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></div><div>{profile.socials.map((s) => <a key={s.label} className="mr-3 text-accent underline underline-offset-4" href={s.href} target="_blank" rel="noreferrer">{s.label}<span className="sr-only"> (opens in new tab)</span></a>)}</div></div>); break;
      case "cv": case "resume": push(<a className="text-accent underline underline-offset-4" href={profile.cv} download>Download résumé (PDF)</a>); break;
      case "clear": setLines([]); break;
      case "sudo": push(<span className="text-[var(--danger)]">Nice try. Permission denied.</span>); break;
      case "ls": push(<div className="text-accent">about.md &nbsp; experience.log &nbsp; projects/ &nbsp; skills.json &nbsp; contact.txt</div>); break;
      default: push(<span className="text-[var(--danger)]">command not found: {cmd}. Type <Acc>help</Acc> to see what works.</span>);
    }
  }, [push, router, projectByArg]);

  useEffect(() => {
    setLines([
      { id: ++idRef.current, node: <div><Acc>Welcome.</Acc> This is a real terminal. Type a command to explore.</div> },
      { id: ++idRef.current, node: <div><Acc>$</Acc> help</div> },
      { id: ++idRef.current, node: <dl className="grid grid-cols-[auto_1fr] gap-x-4">{HELP.map(([c, d]) => <div key={c} className="contents"><dt><Acc>{c}</Acc></dt><dd><Dim>{d}</Dim></dd></div>)}</dl> },
    ]);
  }, []);

  const chips = useMemo(() => ["help", "projects", "experience", "skills", "certs"], []);

  return (
    <div data-theme="dark" className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-line bg-bg font-mono text-[13px] leading-relaxed text-fg" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      <div className="flex items-center gap-2 border-b border-line bg-tile2 px-3 py-2" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-muted">aditya@portfolio — zsh</span>
      </div>
      <div ref={logRef} role="log" aria-label="Terminal output" aria-live="polite" tabIndex={0} className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain p-3">
        {lines.map((l) => <div key={l.id}>{l.node}</div>)}
      </div>
      <form className="flex items-center gap-2 border-t border-line px-3 py-2" onSubmit={(e) => { e.preventDefault(); const v = value; setValue(""); void run(v); }}>
        <label htmlFor="term-input" className="text-accent" aria-hidden="true">$</label>
        <input id="term-input" ref={inputRef} value={value} onChange={(e) => setValue(e.target.value)} autoComplete="off" autoCapitalize="off" spellCheck={false}
          aria-label="Type a command" placeholder="type help  ( / to focus )" className="min-h-11 min-w-0 flex-1 bg-transparent text-base text-fg placeholder:text-muted sm:min-h-9 sm:text-[13px]"
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") { e.preventDefault(); histPos.current = Math.min(histPos.current + 1, hist.current.length - 1); setValue(hist.current[histPos.current] ?? ""); }
            if (e.key === "ArrowDown") { e.preventDefault(); histPos.current = Math.max(histPos.current - 1, -1); setValue(hist.current[histPos.current] ?? ""); }
          }} />
        <button type="submit" disabled={!value.trim()} className="min-h-11 rounded-md px-3 py-1 text-xs text-muted hover:text-fg disabled:opacity-40 sm:min-h-9">Run</button>
      </form>
      <div className="flex flex-wrap gap-2 border-t border-line p-2" role="group" aria-label="Quick commands">
        {chips.map((c) => <button key={c} onClick={() => void run(c)} className="chip !py-1 font-mono text-xs disabled:opacity-50">{c}</button>)}
      </div>
    </div>
  );
}
