import type { Metadata } from "next";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { EstimateForm } from "./form";
export const metadata: Metadata = {
  title: "Get an Asset Value Estimate | Ogoldy",
  description:
    "Share your BOQ, asset list and photos for an indicative enterprise asset value and execution assessment.",
  alternates: { canonical: "/asset-value-estimate" },
};
export default function Estimate() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="estimate-layout section-shell">
          <div className="estimate-intro">
            <span className="eyebrow">Qualified enterprise assessment</span>
            <h1>Get an asset value estimate</h1>
            <p>
              Share the information you already have. We will assess recoverable
              value together with dismantling, logistics, custody or disposal
              requirements.
            </p>
            <div className="estimate-note">
              <strong>Useful inputs</strong>
              <span>Asset list or BOQ</span>
              <span>Current photos and condition</span>
              <span>Site location and access</span>
              <span>Required completion timeline</span>
            </div>
          </div>
          <EstimateForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
