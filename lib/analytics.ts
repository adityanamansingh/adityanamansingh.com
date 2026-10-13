// Google Analytics 4. Event names follow GA4's recommended ones where one exists (generate_lead, select_content, file_download,
// share-like clicks) and are lowercase snake_case otherwise. Nothing personal is sent: no names, emails, messages or terminal arguments.
export const GA_ID = "G-68RMVK0HFE";

type Params = Record<string, string | number | boolean | undefined>;
declare global { interface Window { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void } }

/** Analytics runs only on the real site (not localhost or preview URLs), and not for visitors who send Do Not Track. */
export const analyticsOn = () =>
  typeof window !== "undefined" && /^(www\.)?adityanamansingh\.com$/.test(location.hostname) && navigator.doNotTrack !== "1";

export function track(event: string, params: Params = {}) {
  try { if (analyticsOn() && window.gtag) window.gtag("event", event, params); } catch { /* analytics must never break the page */ }
}
