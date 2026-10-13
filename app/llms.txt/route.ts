import { llmsText } from "@/lib/seo";
export const dynamic = "force-static";
export const GET = () => new Response(llmsText(false), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
