"use client";
import { useEffect } from "react";
import Script from "next/script";
import { GA_ID, analyticsOn, track } from "@/lib/analytics";

const NETWORKS: Record<string, string> = { "linkedin.com": "linkedin", "github.com": "github", "instagram.com": "instagram", "facebook.com": "facebook" };

/** Loads GA4 and reports clicks (links, downloads, outbound), section views and scroll depth with one set of listeners. */
export default function Analytics() {
  useEffect(() => {
    if (!analyticsOn()) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const text = (a.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 60);
      if (href.startsWith("mailto:")) return track("contact_click", { method: "email", link_text: text });
      if (href.startsWith("tel:")) return track("contact_click", { method: "phone" });
      if (/\.pdf($|\?)/i.test(href)) return track("file_download", { file_name: href.split("/").pop(), file_extension: "pdf", link_text: text });
      if (href.startsWith("/work/")) return track("select_content", { content_type: "case_study", item_id: href.split("/")[2]?.replace(/\/$/, ""), link_text: text });
      let url: URL; try { url = new URL(a.href); } catch { return; }
      if (url.origin !== location.origin) {
        const host = url.hostname.replace(/^www\./, "");
        const network = NETWORKS[host];
        track(network ? "social_click" : "outbound_click", { network, link_domain: host, link_url: url.href, link_text: text });
      }
    };
    document.addEventListener("click", onClick);

    // Each section the first time it is mostly on screen.
    const seen = new Set<string>();
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        const id = (en.target as HTMLElement).id;
        if (en.isIntersecting && id && !seen.has(id)) { seen.add(id); track("section_view", { section: id }); }
      }
    }, { threshold: 0.4 });
    document.querySelectorAll("main section[id], main [id]:is(section)").forEach((el) => io.observe(el));

    // Scroll depth, once per step.
    const done = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (max <= 0) return;
      const pct = Math.round((scrollY / max) * 100);
      for (const step of [25, 50, 75, 100]) if (pct >= step && !done.has(step)) { done.add(step); track("scroll_depth", { percent: step }); }
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => { document.removeEventListener("click", onClick); io.disconnect(); removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}</Script>
    </>
  );
}
