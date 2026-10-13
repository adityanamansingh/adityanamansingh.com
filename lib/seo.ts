import { profile, experience, education, skillGroups, certifications } from "@/data/profile";
import { projects } from "@/data/projects";

export const SITE = "https://adityanamansingh.com";
export const SITE_DESC = "Full Stack & AI Engineer with 6+ years in Laravel, Node.js, Vue and Gemini. Case studies, an interactive terminal, and how to reach me.";

/** schema.org Person + WebSite, built from the same data the page shows (so search engines and AI answers match what visitors read). */
export function siteJsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${SITE}/#person`,
    name: profile.name,
    alternateName: ["Aditya Singh", "Aditya Naman"],
    url: SITE,
    image: `${SITE}/images/portrait.jpg`,
    jobTitle: experience[0].role,
    description: SITE_DESC,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Delhi NCR", addressCountry: "IN" },
    sameAs: profile.socials.map((s) => s.href),
    worksFor: { "@type": "Organization", name: "Mono Solutions ApS" },
    alumniOf: education.slice(0, 2).map((e) => ({ "@type": "CollegeOrUniversity", name: e.org })),
    knowsAbout: skillGroups.slice(0, 5).flatMap((g) => g.items.slice(0, 6)),
    knowsLanguage: ["English", "Hindi"],
  };
  const website = { "@type": "WebSite", "@id": `${SITE}/#website`, url: SITE, name: `${profile.name}, portfolio`, inLanguage: "en", publisher: { "@id": `${SITE}/#person` } };
  return { "@context": "https://schema.org", "@graph": [person, website] };
}

export function caseStudyJsonLd(slug: string) {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return null;
  const url = `${SITE}/work/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CreativeWork", "@id": `${url}#work`, name: p.title, headline: p.title, description: p.summary, url, creator: { "@id": `${SITE}/#person` }, about: p.kind, keywords: p.stack.join(", "), image: `${SITE}/opengraph-image` },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Work", item: `${SITE}/#work` },
        { "@type": "ListItem", position: 3, name: p.title, item: url },
      ] },
    ],
  };
}

/** Plain-text summary for AI assistants (llms.txt convention). `full` adds every case study, skill and certification. */
export function llmsText(full: boolean) {
  const L: string[] = [];
  L.push(`# ${profile.name}`, "", `> ${profile.name} is a ${profile.role} based in ${profile.location}, with 6+ years in Laravel, Node.js, Vue and Gemini. This site has his case studies, experience, skills and contact details.`, "");
  L.push("## Contact", `- Email: ${profile.email}`, ...profile.socials.map((s) => `- ${s.label}: ${s.href}`), `- Résumé (PDF): ${SITE}${profile.cv}`, "");
  L.push("## About", ...profile.about.map((a) => a), "");
  L.push("## Experience", ...experience.map((e) => `- ${e.role}, ${e.org.split(" · ")[0]} (${e.period})`), "");
  L.push("## Education", ...education.slice(0, 2).map((e) => `- ${e.title}, ${e.org} (${e.period})`), "");
  L.push("## Work", ...projects.map((p) => `- [${p.title}](${SITE}/work/${p.slug}): ${p.summary}`), "");
  if (full) {
    L.push("## Case studies in detail", "");
    for (const p of projects) {
      L.push(`### ${p.title} (${p.kind}${p.year && p.year !== "—" ? ", " + p.year : ""})`, p.summary);
      if (p.stack.length) L.push(`Stack: ${p.stack.join(", ")}`);
      for (const r of p.results) L.push(`- ${r.value} ${r.label}`);
      for (const s of p.story) { L.push(`${s.heading}:`); for (const pt of s.points) L.push(`- ${pt}`); }
      L.push(`URL: ${SITE}/work/${p.slug}`, "");
    }
    L.push("## Skills", ...skillGroups.map((g) => `- ${g.group}: ${g.items.join(", ")}`), "");
    L.push("## Certifications", ...certifications.map((c) => `- ${c.title} (${c.org}, ${c.period})`), "");
  }
  L.push("## Optional", `- [Full details for AI assistants](${SITE}/llms-full.txt)`, `- [Sitemap](${SITE}/sitemap.xml)`, "");
  return L.join("\n");
}
