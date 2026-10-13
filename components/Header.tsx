import Link from "next/link";
import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";

const nav: [string, string][] = [["Work", "/#work"], ["Terminal", "/#terminal"], ["Experience", "/#experience"], ["Contact", "/#contact"]];

export default function Header() {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-line/70 bg-bg/95 backdrop-blur-md">
      <nav aria-label="Primary" className="safe-x mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 sm:gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 font-semibold tracking-tight">
          <Logo />
          <span aria-hidden="true" className="truncate max-[359px]:sr-only min-[440px]:hidden">Aditya Singh</span><span aria-hidden="true" className="truncate max-[439px]:hidden">Aditya Naman Singh</span><span className="sr-only">Aditya Naman Singh, home</span>
        </Link>
        <ul className="hidden items-center gap-1 text-sm text-muted md:flex">
          {nav.map(([l, h]) => <li key={h}><Link href={h} className="rounded-full px-3 py-2 transition hover:bg-tile2 hover:text-fg">{l}</Link></li>)}
        </ul>
        <div className="flex shrink-0 items-center gap-2">
          <MobileMenu items={nav} />
          <ThemeToggle />
  <a href={profile.cv} download className="btn-ghost !min-h-10 !px-4 text-sm"><Download size={15} aria-hidden="true" /> <span className="hidden sm:inline">Résumé</span><span className="sr-only sm:hidden">Download résumé</span></a>
        </div>
      </nav>
    </header>
  );
}
