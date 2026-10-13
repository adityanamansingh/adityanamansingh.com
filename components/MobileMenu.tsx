"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

// Section links for small screens (the inline nav is hidden below md). Simple disclosure: Esc / outside tap / link tap closes it.
export default function MobileMenu({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null), btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    const away = (e: PointerEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    addEventListener("keydown", key); addEventListener("pointerdown", away);
    return () => { removeEventListener("keydown", key); removeEventListener("pointerdown", away); };
  }, [open]);
  return (
    <div ref={wrap} className="md:hidden">
      <button ref={btn} type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-line2 hover:border-accent">
        {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
      </button>
      {open && (
        <ul id="mobile-menu" className="absolute inset-x-0 top-full z-50 border-b border-line bg-bg px-4 pb-3 pt-1 shadow-xl">
          {items.map(([l, h]) => (
            <li key={h}><a href={h} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-line/60 text-base last:border-0 hover:text-accent">{l}</a></li>
          ))}
        </ul>
      )}
    </div>
  );
}
