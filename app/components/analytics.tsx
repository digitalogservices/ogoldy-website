"use client";
import { useEffect } from "react";
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
const utm = () =>
  JSON.stringify(
    Object.fromEntries(
      [...new URLSearchParams(location.search)].filter(([k]) =>
        k.startsWith("utm_"),
      ),
    ),
  );
export function Analytics() {
  useEffect(() => {
    if (sessionStorage.getItem("ogoldy_landing") === null)
      sessionStorage.setItem("ogoldy_landing", location.pathname);
    if (sessionStorage.getItem("ogoldy_referrer") === null)
      sessionStorage.setItem("ogoldy_referrer", document.referrer);
    const campaign = new URLSearchParams(location.search);
    for (const key of ["source", "medium", "campaign", "content", "term"]) {
      const value = campaign.get(`utm_${key}`);
      if (value) sessionStorage.setItem(`ogoldy_utm_${key}`, value);
    }
    const session =
      sessionStorage.getItem("ogoldy_session") ||
      (crypto.randomUUID?.() ??
        `${Date.now()}-${Math.random().toString(36).slice(2)}`);
    sessionStorage.setItem("ogoldy_session", session);
    const send = (eventName: string, label = "", leadId = "", attributes: Record<string, string> = {}) => {
      const payload = {
        eventName,
        sessionId: session,
        leadId,
        path: location.pathname,
        referrer: document.referrer,
        utm: utm(),
        label,
      };
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        lead_id: leadId,
        page_path: location.pathname,
        cta_label: label,
        utm: JSON.parse(payload.utm),
        ...attributes,
      });
    };
    send("page_view");
    const gtm = "GTM-K9522SR8";
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${gtm}`;
    document.head.appendChild(s);
    window.dataLayer?.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const click = (e: MouseEvent) => {
      const a = (e.target as Element).closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const label = (a.textContent || href).trim();
      send(
        href.startsWith("tel:") ? "click_phone"
          : href.startsWith("mailto:") ? "click_email"
          : href.includes("wa.me/") ? "click_whatsapp"
          : href.includes("asset-value-estimate") ? "get_value_estimate"
          : a.dataset.track === "project_cta" ? "project_case_cta"
          : "cta_click",
        label,
      );
    };
    const start = (e: Event) => {
      if ((e.target as Element).closest("form"))
        send("form_start", "enterprise enquiry");
    };
    const submitted = (e: Event) => {
      const d = (e as CustomEvent).detail || {};
      send("generate_lead", "enterprise enquiry", d.id || "", {
        form_type: d.formType || "",
        decision_result: d.decisionToolResult || "",
      });
    };
    document.addEventListener("click", click);
    document.addEventListener("input", start, { once: true });
    document.addEventListener("ogoldy:lead_submitted", submitted);
    return () => {
      document.removeEventListener("click", click);
      document.removeEventListener("ogoldy:lead_submitted", submitted);
    };
  }, []);
  return null;
}
