/** Clipboard API needs HTTPS; fall back to execCommand so it also works on plain-http LAN/dev. Resolves false if both fail. */
export async function copyText(text: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(text); return true; } catch { /* fall through */ }
  try {
    const ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand("copy"); document.body.removeChild(ta); return ok;
  } catch { return false; }
}
