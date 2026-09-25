"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const campaignKeys = ["source", "medium", "campaign", "content", "term"] as const;

// Campaign labels are controlled identifiers, never email addresses or free text.
function campaign() {
  const query = new URLSearchParams(location.search);
  return Object.fromEntries(
    campaignKeys.flatMap((key) => {
      const explicit = query.get(`utm_${key}`);
      if (explicit) sessionStorage.setItem(`ogoldy_utm_${key}`, explicit);
      const value = explicit || sessionStorage.getItem(`ogoldy_utm_${key}`) || "";
      return /^[a-z0-9][a-z0-9._-]{0,79}$/i.test(value) && !/^\d{8,}$/.test(value)
        ? [[`utm_${key}`, value]]
        : [];
    }),
  );
}

function push(event: string, fields: Record<string, string> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, page_path: location.pathname, ...campaign(), ...fields });
}

function placement(link: HTMLAnchorElement) {
  return link.dataset.placement || (link.closest("header") ? "header"
    : link.closest("footer") ? "footer" : "main");
}

function referrer() {
  try {
    const url = new URL(document.referrer);
    return `${url.origin}${url.pathname}`;
  } catch {
    return "";
  }
}

export function Analytics() {
  const pathname = usePathname();
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("ogoldy_landing") === null)
      sessionStorage.setItem("ogoldy_landing", location.pathname);
    if (sessionStorage.getItem("ogoldy_referrer") === null)
      sessionStorage.setItem("ogoldy_referrer", referrer());
    const startedForms = new WeakSet<HTMLFormElement>();
    const click = (e: MouseEvent) => {
      const link = (e.target as Element).closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const url = new URL(href, location.href);
      const linkUrl = href.startsWith("mailto:") || href.startsWith("tel:")
        ? href : `${url.origin}${url.pathname}`;
      const ctaId = link.dataset.ctaId || (href.startsWith("mailto:") ? "email"
        : href.startsWith("tel:") ? "phone"
        : url.hostname === "wa.me" ? "whatsapp"
        : url.pathname === "/asset-value-estimate" ? "value_estimate" : "");
      const common = { cta_id: ctaId, placement: placement(link), link_url: linkUrl };
      if (href.startsWith("mailto:")) push("click_email", common);
      else if (href.startsWith("tel:")) push("click_phone", common);
      else if (url.hostname === "wa.me") push("click_whatsapp", common);
      else if (link.dataset.track === "case_study_cta") {
        const parts = location.pathname.split("/").filter(Boolean);
        push("case_study_cta_click", {
          case_id: `${parts[0]}/${parts[1]}`,
          cta_id: ctaId || "case_enquiry",
          destination: url.pathname,
          placement: placement(link),
        });
      } else if (url.pathname === "/asset-value-estimate")
        push("get_value_estimate", common);
    };
    const start = (e: Event) => {
      const form = (e.target as Element).closest<HTMLFormElement>('form[name="ogoldy-enterprise-enquiry"]');
      if (!form || startedForms.has(form)) return;
      startedForms.add(form);
      push("form_start", { form_type: new URLSearchParams(location.search).has("decision")
        ? "decision_tool" : location.pathname === "/contact" ? "contact" : "value_estimate" });
    };
    const submitted = (e: Event) => {
      const detail = (e as CustomEvent<{ formType?: string; decisionToolResult?: string }>).detail;
      if (!detail?.formType) return;
      push("generate_lead", {
        form_type: detail.formType,
        ...(detail.decisionToolResult ? { decision_result: detail.decisionToolResult } : {}),
      });
    };
    document.addEventListener("click", click);
    document.addEventListener("input", start);
    document.addEventListener("ogoldy:lead_submitted", submitted);
    return () => {
      document.removeEventListener("click", click);
      document.removeEventListener("input", start);
      document.removeEventListener("ogoldy:lead_submitted", submitted);
    };
  }, []);

  useEffect(() => {
    if (!pathname || lastPage.current === pathname) return;
    lastPage.current = pathname;
    push("page_view", { page_location: `${location.origin}${pathname}` });
  }, [pathname]);

  return null;
}
