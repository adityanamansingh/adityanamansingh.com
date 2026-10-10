import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { localAnswer, systemPrompt } from "@/lib/knowledge";

export const runtime = "nodejs";

// Model is overridable without a code change: ASK_MODEL=claude-haiku-5-5 (cheaper) or any other model id.
const MODEL = process.env.ASK_MODEL || "claude-opus-5-5";

// Basic abuse protection for a public endpoint (in-memory, per server instance).
const PER_IP_PER_MIN = 6;
const DAILY_CAP = Number(process.env.ASK_DAILY_CAP || 300);
const hits = new Map<string, number[]>();
let day = new Date().toDateString();
let dayCount = 0;

function allowed(ip: string): boolean {
  const today = new Date().toDateString();
  if (today !== day) { day = today; dayCount = 0; }
  if (dayCount >= DAILY_CAP) return false;
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (recent.length >= PER_IP_PER_MIN) return false;
  recent.push(now); hits.set(ip, recent); dayCount += 1;
  return true;
}

type Turn = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { q?: unknown; history?: unknown } | null;
  const q = typeof body?.q === "string" ? body.q.trim() : "";
  if (!q || q.length > 400) return NextResponse.json({ error: "Ask a question up to 400 characters." }, { status: 400 });
  const history: Turn[] = Array.isArray(body?.history)
    ? (body!.history as unknown[])
        .slice(-6)
        .filter((t): t is Turn => !!t && typeof t === "object" && ((t as Turn).role === "user" || (t as Turn).role === "assistant") && typeof (t as Turn).content === "string")
        .map((t) => ({ role: t.role, content: t.content.slice(0, 800) }))
    : [];

  const ip = (req.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  if (!allowed(ip)) return NextResponse.json({ answer: "That's a lot of questions at once. Give it a minute, or email Aditya directly.", source: "limited" }, { status: 429 });

  // No key configured: answer from the local knowledge base so the terminal still works.
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) {
    return NextResponse.json({ answer: localAnswer(q), source: "local" });
  }

  try {
    const client = new Anthropic();
    while (history.length && history[0].role !== "user") history.shift(); // history must start with a user turn
    const params = {
      model: MODEL,
      max_tokens: 700, // short answers by design
      betas: ["server-side-fallback-2026-07-01"],
      // On a safety decline the API re-runs the same request on a fallback model inside the same call.
      fallbacks: "default",
      system: [{ type: "text", text: systemPrompt(), cache_control: { type: "ephemeral" } }], // large, stable prefix: cache it
      output_config: { effort: "low" }, // simple lookups don't need deep reasoning
      messages: [...history, { role: "user", content: q }],
    } as unknown as Anthropic.Beta.Messages.MessageCreateParamsNonStreaming; // `fallbacks` may be newer than the SDK's typings
    const response = await client.beta.messages.create(params);

    if (response.stop_reason === "refusal") {
      return NextResponse.json({ answer: "I can't help with that one. Ask me about Aditya's work, or email him directly.", source: "claude" });
    }
    const text = response.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("\n").trim();
    return NextResponse.json({ answer: text || localAnswer(q), source: "claude" });
  } catch (error) {
    // Typed chain, most specific first. Never leak provider details to visitors; fall back to local answers.
    if (error instanceof Anthropic.RateLimitError) return NextResponse.json({ answer: localAnswer(q), source: "local" });
    if (error instanceof Anthropic.AuthenticationError) { console.error("[ask] invalid Anthropic credentials"); return NextResponse.json({ answer: localAnswer(q), source: "local" }); }
    if (error instanceof Anthropic.BadRequestError) { console.error("[ask] bad request:", error.message); return NextResponse.json({ answer: localAnswer(q), source: "local" }); }
    if (error instanceof Anthropic.APIError) { console.error(`[ask] API error ${error.status}`); return NextResponse.json({ answer: localAnswer(q), source: "local" }); }
    console.error("[ask] unexpected error");
    return NextResponse.json({ answer: localAnswer(q), source: "local" });
  }
}
