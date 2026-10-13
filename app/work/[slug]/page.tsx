import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import { projects } from "@/data/projects";
import { getImages } from "@/lib/images";
import { SITE, caseStudyJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? {
    title: p.title, description: p.summary, keywords: p.stack,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${p.title} · Aditya Naman Singh`, description: p.summary, url: `${SITE}/work/${p.slug}`, type: "article", siteName: "Aditya Naman Singh" },
    twitter: { card: "summary_large_image", title: p.title, description: p.summary },
  } : {};
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const p = projects[i];
  // Related work: same group first (the LED lighting sites, the Sunstone products), then the rest in order.
  const group = (slug: string) => (["ikio-technologies", "rlux", "ikio-led-lighting"].includes(slug) ? "led" : ["admitquest", "collegesearch"].includes(slug) ? "sunstone" : slug);
  const others = projects.filter((x) => x.slug !== p.slug);
  const related = [...others.filter((x) => group(x.slug) === group(p.slug)), ...others.filter((x) => group(x.slug) !== group(p.slug))];
  const images = getImages();
  const cover = images[`project-${p.slug}`];
  const gallery = [2, 3, 4].map((n) => images[`project-${p.slug}-${n}`]).filter(Boolean);
  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-full bg-brand px-4 py-2 font-medium text-on-brand focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to main content</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd(p.slug)) }} />
      <Header />
      <main id="main" tabIndex={-1} className="safe-x mx-auto max-w-7xl pb-20 pt-8 outline-none">
        <Link href="/#work" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg"><ArrowLeft size={16} aria-hidden="true" /> Back to all work</Link>
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
        <article className="min-w-0">
          <header className="mt-4">
            <p className="mono-label">{p.kind}{p.year !== "—" ? ` · ${p.year}` : ""}</p>
            <h1 className="mt-3 text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.03] tracking-tight">{p.title}</h1>
            <p className="mt-4 max-w-2xl text-xl text-muted">{p.summary}</p>
            {(p.role !== "—" || p.year !== "—" || p.stack.length > 0) && <dl className="mt-8 grid gap-6 border-y border-line py-6 sm:grid-cols-3">
              {p.role !== "—" && <div><dt className="mono-label">Role</dt><dd className="mt-1">{p.role}</dd></div>}
              {p.year !== "—" && <div><dt className="mono-label">When</dt><dd className="mt-1">{p.year}</dd></div>}
              {p.stack.length > 0 && <div><dt className="mono-label">Stack</dt><dd className="mt-1 flex flex-wrap gap-1.5">{p.stack.map((s) => <span key={s} className="rounded-full border border-line2 px-2.5 py-0.5 text-xs">{s}</span>)}</dd></div>}
            </dl>}
          </header>

          {cover && (
            <div style={p.coverBg ? { background: p.coverBg } : undefined} className="mt-8 overflow-hidden rounded-3xl border border-line bg-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cover} alt={`${p.title} cover`} className={p.coverBg ? "aspect-[16/9] w-full object-contain" : "h-auto w-full"} />
            </div>
          )}

          {p.results.length > 0 && (
            <section aria-labelledby="results" className="mt-12">
              <h2 id="results" className="mono-label">Results</h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {p.results.map((r) => <li key={r.label} className="rounded-2xl border border-line bg-tile p-5"><p className="text-3xl font-semibold tracking-tight text-accent">{r.value}</p><p className="mt-1 text-sm text-muted">{r.label}</p></li>)}
              </ul>
            </section>
          )}

          {p.story.map((s) => (
            <section key={s.heading} className="mt-12 grid gap-4 md:grid-cols-[14rem_1fr]">
              <h2 className="text-lg font-semibold tracking-tight">{s.heading}</h2>
              <ul className="list-disc space-y-2.5 pl-5 text-lg text-muted marker:text-accent">{s.points.map((pt) => <li key={pt} className="text-fg/90">{pt}</li>)}</ul>
            </section>
          ))}

          {gallery.length > 0 && (
            <section aria-labelledby="gallery" className="mt-12"><h2 id="gallery" className="mono-label">Gallery</h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">{gallery.map((g, n) => <li key={g} className="overflow-hidden rounded-2xl border border-line">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={g} alt={`${p.title} screenshot ${n + 2}`} className="w-full" /></li>)}</ul></section>
          )}

          {p.links.length > 0 && <p className="mt-10 flex flex-wrap gap-3">{p.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn-ghost">{l.label} <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in new tab)</span></a>)}</p>}
        </article>

        <aside aria-labelledby="more-work" className="mt-16 lg:sticky lg:top-24 lg:mt-12 lg:self-start">
          <h2 id="more-work" className="mono-label">More work</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {related.map((r) => {
              const rc = images[`project-${r.slug}`];
              return (
                <li key={r.slug}>
                  <Link href={`/work/${r.slug}`} className="group flex items-center gap-3 rounded-2xl border border-line bg-tile p-3 transition hover:border-accent">
                    <span style={r.coverBg ? { background: r.coverBg } : undefined} className="relative block aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-lg bg-tile2">
                      {rc && <Image src={rc} alt="" fill sizes="96px" unoptimized={rc.split("?")[0].endsWith(".svg")} className={r.coverBg ? "object-contain" : "object-cover"} />}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium tracking-tight group-hover:text-accent">{r.title}</span>
                      <span className="mt-0.5 block text-xs text-muted">{r.kind}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
        </div>
      </main>
    </>
  );
}
