"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { applyConsent, readConsent } from "../../lib/consent";

export function PrivacyConsent() {
  const [firstVisit, setFirstVisit] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const saved = readConsent();
    applyConsent(saved || "denied", false);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Browser-only preference hydration.
    setFirstVisit(saved === null);
    const open = () => {
      previousFocus.current = document.activeElement as HTMLElement;
      setAnalytics(window.ogoldyAnalyticsAllowed === true);
      dialog.current?.showModal();
    };
    document.addEventListener("ogoldy:cookie_settings", open);
    const sync = (event: StorageEvent) => {
      if (event.key !== "ogoldy_privacy_choice" && event.key !== null) return;
      const saved = readConsent();
      applyConsent(saved || "denied", false);
      setFirstVisit(saved === null);
    };
    window.addEventListener("storage", sync);
    return () => { document.removeEventListener("ogoldy:cookie_settings", open); window.removeEventListener("storage", sync); };
  }, []);
  const choose = (allowed: boolean) => { applyConsent(allowed ? "granted" : "denied"); setFirstVisit(false); };
  return <>
    {firstVisit && <section className="privacy-banner" aria-labelledby="privacy-banner-title">
      <h2 id="privacy-banner-title">We value your privacy</h2>
      <p>We use essential storage to keep the site working. With your permission, we also use analytics to understand how the site is used and improve it. You can accept, reject or manage analytics now, and change your choice later in Cookie settings.</p>
      <Link href="/privacy">Privacy Policy</Link>
      <div className="privacy-actions">
        <button type="button" onClick={() => choose(false)}>Reject optional cookies</button>
        <button type="button" onClick={() => document.dispatchEvent(new Event("ogoldy:cookie_settings"))}>Manage preferences</button>
        <button type="button" onClick={() => choose(true)}>Accept all</button>
      </div>
    </section>}
    <dialog ref={dialog} className="privacy-preferences" aria-labelledby="privacy-preferences-title" onClose={() => {
      const target = previousFocus.current?.isConnected ? previousFocus.current : document.querySelector<HTMLElement>(".cookie-settings");
      target?.focus();
    }}>
      <button type="button" className="privacy-close" aria-label="Close privacy preferences" onClick={() => dialog.current?.close()}>×</button>
      <h2 id="privacy-preferences-title">Privacy preferences</h2>
      <p>Choose whether Ogoldy may use optional analytics. Strictly necessary storage is always on because it supports essential site functions and remembers your privacy choice.</p>
      <div className="privacy-category"><h3>Strictly necessary</h3><p>Used for essential site functions and to remember your privacy choice. Always on.</p><strong>Always on</strong></div>
      <div className="privacy-category"><label><input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} /> <strong>Analytics</strong></label><p>Helps us understand how visitors use the site so we can improve pages, tools and enquiry journeys. Analytics is optional and only runs when you allow it.</p></div>
      <button type="button" className="privacy-save" onClick={() => { choose(analytics); dialog.current?.close(); }}>Save preferences</button>
    </dialog>
  </>;
}
