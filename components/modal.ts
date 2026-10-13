import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/** Dialog behaviour: move focus in, trap Tab, close on Escape, pause smooth scroll, give focus back on close. */
export function useModal(open: boolean, ref: RefObject<HTMLElement | null>, onClose: () => void) {
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const items = () => (ref.current ? [...ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)] : []);
    (items()[0] ?? ref.current)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); close.current(); return; }
      if (e.key !== "Tab") return;
      const f = items();
      if (!f.length) { e.preventDefault(); return; }
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; lenis?.start(); prev?.focus?.(); };
  }, [open, ref]);
}
