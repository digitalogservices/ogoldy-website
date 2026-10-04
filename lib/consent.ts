export const consentKey = "ogoldy_privacy_choice";
export const consentVersion = 1;
export type AnalyticsConsent = "denied" | "granted";
export function readConsent(): AnalyticsConsent | null {
  try {
    const value = JSON.parse(localStorage.getItem(consentKey) || "null");
    return value?.version === consentVersion && ["denied", "granted"].includes(value.analytics)
      ? value.analytics : null;
  } catch { return null; }
}
declare global {
  interface Window {
    ogoldyAnalyticsAllowed?: boolean;
    ogoldyGtmLoaded?: boolean;
    "ga-disable-G-193MG85HSP"?: boolean;
    dataLayer?: unknown[];
  }
}
function command(..._args: unknown[]) {
  void _args;
  window.dataLayer = window.dataLayer || [];
  // Google consent commands use an Arguments object, not an event object.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}
function removeAnalyticsCookies() {
  const parts = location.hostname.split(".");
  const domains = ["", ...parts.map((_, i) => parts.slice(i).join("."))];
  const paths = ["/", ...location.pathname.split("/").filter(Boolean).map((_, i, a) => "/" + a.slice(0, i + 1).join("/"))];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!/^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(name)) continue;
    for (const path of paths) for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=${path}${domain ? `; domain=${domain}` : ""}; SameSite=Lax`;
    }
  }
}
export function applyConsent(analytics: AnalyticsConsent, persist = true) {
  const allowed = analytics === "granted";
  const changed = window.ogoldyAnalyticsAllowed !== allowed;
  // Block collection synchronously before queuing withdrawal to Google.
  window["ga-disable-G-193MG85HSP"] = !allowed;
  window.ogoldyAnalyticsAllowed = allowed;
  if (persist) try { localStorage.setItem(consentKey, JSON.stringify({ version: consentVersion, analytics })); } catch { /* Current-page choice still works when storage is unavailable. */ }
  if (changed) command("consent", "update", { analytics_storage: analytics });
  if (!allowed) removeAnalyticsCookies();
  if (allowed && !window.ogoldyGtmLoaded) {
    window.ogoldyGtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.id = "ogoldy-gtm";
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-K9522SR8";
    document.head.appendChild(script);
  }
  if (changed) document.dispatchEvent(new CustomEvent("ogoldy:analytics_consent", { detail: { allowed } }));
}
export function pushAnalytics(fields: Record<string, unknown>) {
  if (!window.ogoldyAnalyticsAllowed) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(fields);
}
