"use client";
import { track } from "@/lib/analytics";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

/** Dark/light switch. Choice is remembered in localStorage; the inline script in layout.tsx applies it before first paint. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => { setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark"); }, []);
  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    track("theme_toggle", { theme: next });
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch { /* private mode: still works for this visit */ }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#14161b" : "#f7f6f6");
  };
  return (
    <button onClick={toggle} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line2 text-muted transition hover:border-accent hover:text-fg">
      {theme === "dark" ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  );
}
