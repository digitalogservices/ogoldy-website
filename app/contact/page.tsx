import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { EstimateForm } from "../asset-value-estimate/form";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

export const metadata: Metadata = {
  title: "Contact Ogoldy | Enterprise Asset Transition India",
  description:
    "Send Ogoldy an enterprise dismantling, movement, custody, redeployment, liquidation or value-recovery requirement.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="contact-v6-hero">
          <div className="section-shell">
            <span className="eyebrow light">Enterprise enquiry</span>
            <h1>Tell us what needs to move, clear, hold or recover.</h1>
            <p>
              Start with a location and requirement. Add the BOQ or photos if
              available; they are useful, not mandatory.
            </p>
          </div>
        </section>
        <section className="section-shell contact-v6-layout">
          <aside className="contact-v6-details">
            <div>
              <Mail />
              <span>Email</span>
              <a href="mailto:growth@ogoldy.com">growth@ogoldy.com</a>
            </div>
            <div>
              <Phone />
              <span>Phone</span>
              <a href="tel:+918826207270">+91 88262 07270</a>
            </div>
            <div>
              <MapPin />
              <span>Coverage</span>
              <strong>Pan-India requirements</strong>
              <small>Registered office: Rajouri Garden, New Delhi</small>
            </div>
            <p>
              Need only an indicative valuation?{" "}
              <Link href="/asset-value-estimate">
                Use the dedicated value-estimate page.
              </Link>
            </p>
          </aside>
          <div>
            <EstimateForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
