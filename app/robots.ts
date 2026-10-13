import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";
export const dynamic = "force-static";

// Everything is public. AI crawlers are named so the intent is explicit (they may read and quote the site).
const AI = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "CCBot"];
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }, ...AI.map((userAgent) => ({ userAgent, allow: "/" }))], sitemap: `${SITE}/sitemap.xml`, host: SITE };
}
