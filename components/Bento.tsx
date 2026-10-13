"use client";
import { useState } from "react";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import dynamic from "next/dynamic";
import Tile from "./Tile";
import Terminal from "./Terminal";
import type { PanelId } from "./Panel";
const Panel = dynamic(() => import("./Panel"), { ssr: false });
import { HeroTile, PortraitTile, GitHubTile, NowTile, ExperienceTile, ProjectsTile, SkillsTile, CertsTile, TestimonialsTile, LifeTile, ContactTile, type Images } from "./tiles";
import { profile } from "@/data/profile";
import { track } from "@/lib/analytics";

function GroupHeading({ id, title, accent, sub }: { id: string; title: string; accent: string; sub: string }) {
  return (
    <div className="col-span-full mt-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-2 border-b border-line pb-4 first:mt-0">
      <h2 id={id} className="text-3xl font-semibold tracking-tight sm:text-4xl">{title} <span className="serif text-accent">{accent}</span></h2>
      <p className="max-w-md text-muted">{sub}</p>
    </div>
  );
}

export default function Bento({ images }: { images: Images }) {
  const [open, setOpen] = useState<PanelId | null>(null);
  const [intent, setIntent] = useState<string | undefined>();
  const [focusKey, setFocusKey] = useState(0);
  const openPanel = (id: PanelId, i?: string) => { setIntent(i); setOpen(id); track("panel_open", { panel: id, intent: i }); };
  const toWork = () => document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <LazyMotion features={domAnimation}><MotionConfig reducedMotion="user">
      <main id="main" tabIndex={-1} className="safe-x mx-auto max-w-7xl pb-16 pt-6 outline-none">
        <div className="grid grid-cols-1 gap-4 md:grid-flow-dense md:grid-cols-2 lg:auto-rows-[minmax(7.25rem,auto)] lg:grid-flow-row lg:grid-cols-12">
          <Tile id="top" title="Hello" index={0} className="md:col-span-2 lg:col-span-7 lg:row-span-4"><HeroTile onWork={toWork} /></Tile>
          <Tile id="portrait" title="Portrait" hideTitle index={1} className="min-h-[24rem] md:col-span-1 lg:col-span-5 lg:row-span-4"><PortraitTile images={images} /></Tile>

          <Tile id="terminal" title="Terminal" index={2} className="md:col-span-2 lg:col-span-7 lg:row-span-5"><div className="relative min-h-[28rem] flex-1"><div className="absolute inset-0 flex flex-col"><Terminal focusKey={focusKey} /></div></div></Tile>
          <Tile id="now" title="Right now" index={4} className="md:col-span-2 lg:col-span-5 lg:row-span-2"><NowTile /></Tile>
          <Tile id="code" title="Code activity" index={3} onOpen={() => openPanel("github")} openLabel="Open code activity details" className="md:col-span-1 lg:col-span-5 lg:row-span-3"><GitHubTile /></Tile>

          <GroupHeading id="background" title="What I've done," accent="and what I know" sub="Roles, tools and certifications." />
          <Tile id="skills" level={3} title="Skills" index={6} onOpen={() => openPanel("skills")} openLabel="Open all skills" className="md:col-span-2 lg:col-span-7 lg:row-span-5"><SkillsTile /></Tile>
          <Tile id="experience" level={3} title="Experience" index={5} onOpen={() => openPanel("experience")} openLabel="Open full experience" className="md:col-span-2 lg:col-span-5 lg:row-span-5"><ExperienceTile /></Tile>
          <Tile id="learning" level={3} title="Certifications" index={7} onOpen={() => openPanel("certs")} openLabel="Search and filter all certifications" className="md:col-span-2 lg:col-span-12 lg:row-span-2"><CertsTile onAll={() => openPanel("certs")} /></Tile>

          <GroupHeading id="things-built" title="Things I've" accent="built" sub="Case studies, with the numbers." />
          <Tile id="work" level={3} title="Selected work" index={8} onOpen={() => openPanel("work")} openLabel="Open all work" className="md:col-span-2 lg:col-span-12 lg:row-span-4"><ProjectsTile images={images} /></Tile>

          <Tile id="life" title="Beyond code" index={10} onOpen={() => openPanel("life")} openLabel="Open beyond code" className="md:col-span-2 lg:col-span-4 lg:row-span-3"><LifeTile images={images} /></Tile>
          <Tile id="kind-words" title="Kind words" index={9} onOpen={() => openPanel("testimonials")} openLabel="Open all testimonials" className="md:col-span-2 lg:col-span-8 lg:row-span-3"><TestimonialsTile onAll={() => openPanel("testimonials")} /></Tile>
          <Tile id="contact" title="Contact" index={11} className="md:col-span-2 lg:col-span-12 lg:row-span-2"><ContactTile onOpen={(i) => openPanel("contact", i)} /></Tile>
        </div>
        <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-sm text-muted">
          <p>© {new Date().getFullYear()} {profile.name}. Built with Next.js, TypeScript and Tailwind.</p>
          <button onClick={() => { document.getElementById("terminal")?.scrollIntoView({ block: "center" }); setFocusKey((k) => k + 1); }} className="min-h-11 px-2 underline underline-offset-4 hover:text-fg">Press / to talk to the terminal</button>
        </footer>
      </main>
      <Panel open={open} intent={intent} onClose={() => setOpen(null)} images={images} />
    </MotionConfig></LazyMotion>
  );
}
