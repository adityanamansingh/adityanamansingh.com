import { NextResponse } from "next/server";

// TODO: wire up an email provider (e.g. Resend) via env vars. For now this validates and logs.
export async function POST(req: Request) {
  const { name, email, message, intent } = await req.json().catch(() => ({}));
  if (!name || !email || !message) return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  console.log("[contact]", { intent: intent || "unspecified", name, email, message });
  return NextResponse.json({ ok: true });
}
