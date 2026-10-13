"use client";
import { m } from "framer-motion";
import { Maximize2 } from "lucide-react";
import type { ReactNode } from "react";

export default function Tile({ id, title, className = "", index = 0, onOpen, openLabel, hideTitle = false, level = 2, children }: {
  id: string; title: string; className?: string; index?: number; onOpen?: () => void; openLabel?: string; hideTitle?: boolean; level?: 2 | 3; children: ReactNode;
}) {
  const H = level === 3 ? "h3" : "h2";
  return (
    <m.section
      id={id} aria-labelledby={`${id}-title`}
      initial={index < 2 ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index, 6) * 0.06, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`); }}
      className={`tile relative flex scroll-mt-24 flex-col overflow-hidden rounded-3xl ${className}`}
    >
      <header className={hideTitle ? "" : "flex items-center justify-between gap-3 px-5 pt-4"}>
        <H id={`${id}-title`} className={hideTitle ? "sr-only" : "mono-label"}>{title}</H>
        {onOpen && (
          <button onClick={onOpen} aria-label={openLabel ?? `Open ${title}`} aria-haspopup="dialog"
            className="-mr-2 flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-line hover:text-fg [@media(pointer:coarse)]:h-11 [@media(pointer:coarse)]:w-11">
            <Maximize2 size={15} aria-hidden="true" />
          </button>
        )}
      </header>
      <div className={`relative flex min-h-0 flex-1 flex-col px-5 pb-5 ${hideTitle ? "pt-5" : "pt-3"}`}>{children}</div>
    </m.section>
  );
}
