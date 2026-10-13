// Cloudflare Pages Function: POST /api/contact
// 1. checks the Turnstile token with Cloudflare, 2. forwards the message to Web3Forms (which emails it), 3. adds where it came from
// using the location Cloudflare already knows about the request (no extra lookup service).
// Config: TURNSTILE_SECRET (secret), WEB3FORMS_KEY (in wrangler.jsonc vars), optional TURNSTILE_HOSTNAMES (comma separated).
interface Env { TURNSTILE_SECRET?: string; WEB3FORMS_KEY?: string; TURNSTILE_HOSTNAMES?: string }
type Cf = { city?: string; region?: string; country?: string; timezone?: string; asOrganization?: string };

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  const missing = (["TURNSTILE_SECRET", "WEB3FORMS_KEY"] as const).filter((k) => !env[k]); // names only, never values
  if (missing.length) return json({ ok: false, error: "not_configured", missing }, 500);
  let b: Record<string, unknown>;
  try { b = await request.json(); } catch { return json({ ok: false, error: "bad_request" }, 400); }

  const name = str(b.name, 120), email = str(b.email, 200), message = str(b.message, 5000), topic = str(b.topic, 60);
  if (b.botcheck) return json({ ok: true }); // honeypot: pretend it worked
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ ok: false, error: "invalid" }, 400);

  // Turnstile: token must be a fresh, real one for this form and this site.
  const token = typeof b["cf-turnstile-response"] === "string" ? (b["cf-turnstile-response"] as string) : "";
  if (!token || token.length > 2048) return json({ ok: false, error: "captcha_missing" }, 403);
  const ip = request.headers.get("CF-Connecting-IP") ?? "";
  try {
    const v = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, ...(ip && { remoteip: ip }) }), signal: AbortSignal.timeout(10000),
    });
    const r = (await v.json()) as { success?: boolean; action?: string; hostname?: string };
    const hosts = (env.TURNSTILE_HOSTNAMES ?? "adityanamansingh.com,www.adityanamansingh.com,adityanamansingh-com.pages.dev").split(",").map((h) => h.trim());
    if (!v.ok || r.success !== true || r.action !== "contact" || !r.hostname || !hosts.includes(r.hostname)) return json({ ok: false, error: "captcha_failed" }, 403);
  } catch { return json({ ok: false, error: "captcha_unavailable" }, 502); }

  const cf = ((request as unknown as { cf?: Cf }).cf ?? {}) as Cf;
  const sent = await fetch("https://api.web3forms.com/submit", {
    method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: env.WEB3FORMS_KEY, subject: `Portfolio: ${topic || "General"} from ${name}`, from_name: "adityanamansingh.com",
      name, email, message, topic: topic || "General",
      location: [cf.city, cf.region, cf.country].filter(Boolean).join(", "), ip, network: cf.asOrganization ?? "", timezone: cf.timezone ?? "",
      page: str(b.page, 300), referrer: str(b.referrer, 300) || "direct",
    }),
  }).catch(() => null);
  const ok = !!sent && sent.ok && ((await sent.json().catch(() => ({}))) as { success?: boolean }).success === true;
  return ok ? json({ ok: true }) : json({ ok: false, error: "delivery_failed" }, 502);
};
