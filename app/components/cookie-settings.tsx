"use client";
export function CookieSettings() {
  return <button type="button" className="cookie-settings" onClick={() => document.dispatchEvent(new Event("ogoldy:cookie_settings"))}>Cookie settings</button>;
}
