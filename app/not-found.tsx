import Link from "next/link";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Page Not Found | Ogoldy",
  robots: { index: false, follow: false },
};
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero section-shell">
          <span className="eyebrow">404</span>
          <h1>Page not found</h1>
          <p>The page may have moved or the address may be incorrect.</p>
          <div className="button-row">
            <Link className="button button-primary" href="/">
              Return home
            </Link>
            <Link className="button button-secondary" href="/services">
              View services
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
