import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { PageHero } from "../components/page-hero";
import { AssetOrbit } from "../components/asset-orbit";

export const metadata: Metadata = {
  title: "About Ogoldy | Enterprise Asset Transition India",
  description:
    "How Siddharth’s experience across logistics, reverse logistics and value recovery led to Ogoldy’s enterprise asset-transition model.",
  alternates: { canonical: "/about" },
};

export default function About() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Siddharth",
    jobTitle: "Founder",
    worksFor: { "@type": "Organization", name: "Ogoldy" },
    description:
      "Founder of Ogoldy, with an operating journey spanning Pikkol, logistics, reverse logistics, Ferraille Global and enterprise asset transition.",
  };
  return (
    <>
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
        <PageHero
          eyebrow="About Ogoldy"
          title="Built from the realities of moving, recovering and redeploying assets"
          intro="Ogoldy is an enterprise asset-transition partner for the complicated space between a site decision and a documented outcome."
        />
        <section className="about-o-section">
          <div className="section-shell about-o-grid">
            <div>
              <span className="eyebrow light">The Ogoldy O</span>
              <h2>Assets should keep moving towards their next best use.</h2>
              <p>
                Capture, move, hold, reuse, redeploy, recover, liquidate or
                recycle. The O is not decoration; it represents the operating
                loop Ogoldy manages.
              </p>
              <div
                className="about-operating-loop"
                aria-label="Ogoldy operating loop"
              >
                <span>Survey</span>
                <span>Structure</span>
                <span>Execute</span>
                <span>Recover</span>
              </div>
            </div>
            <AssetOrbit />
          </div>
        </section>
        <section className="section-shell founder-story">
          <div>
            <span className="eyebrow">Founder journey</span>
            <h2>
              Movement became reverse logistics. Reverse logistics became value
              recovery.
            </h2>
          </div>
          <div className="story-timeline visual-timeline">
            <article>
              <span>01</span>
              <div>
                <strong>Pikkol founding team</strong>
                <p>
                  Siddharth’s early operating experience was in Pikkol’s
                  founding team, close to the practical realities of relocation
                  logistics and moving business assets.
                </p>
                <small>
                  Pikkol was acquired by Hybrid Shifting in 2023. This is prior
                  track-record context, not an Ogoldy affiliation.
                </small>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <strong>Logistics and reverse logistics</strong>
                <p>
                  That experience expanded into multi-step movement, return
                  flows, custody and the need for better asset visibility after
                  removal.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <strong>Ferraille Global</strong>
                <p>
                  Work in asset recovery and liquidation added the commercial
                  layer: condition, reuse, buyers, scrap streams and responsible
                  clearance.
                </p>
              </div>
            </article>
            <article>
              <span>04</span>
              <div>
                <strong>Ogoldy</strong>
                <p>
                  Ogoldy brings those disciplines together so enterprises do not
                  have to coordinate dismantlers, movers, warehouses and buyers
                  as disconnected vendors.
                </p>
              </div>
            </article>
          </div>
        </section>
        <section className="dark-section">
          <div className="section-shell split-section">
            <div>
              <span className="eyebrow light">What Ogoldy does</span>
              <h2>One operating chain. One accountable partner.</h2>
              <p>
                Survey → structure BOQ → value → dismantle → move → hold →
                redeploy → liquidate → document.
              </p>
            </div>
            <div className="principle-list">
              <p>
                <strong>Scope honestly.</strong> Validate BOQs against actual
                conditions.
              </p>
              <p>
                <strong>Separate value streams.</strong> Reuse, redeploy,
                resale, scrap and disposal are different decisions.
              </p>
              <p>
                <strong>Protect traceability.</strong> Movement and custody need
                records, not memory.
              </p>
              <p>
                <strong>Preserve optionality.</strong> Holding assets can
                prevent distressed disposal.
              </p>
            </div>
          </div>
        </section>
        <section className="section-shell two-col-content">
          <div>
            <span className="eyebrow">Where we work</span>
            <h2>Enterprise sites across India</h2>
            <p>
              Offices, stores, warehouses, factories, branches and distributed
              project networks. Geography is assessed commercially, not rejected
              at the website level.
            </p>
          </div>
          <div>
            <span className="eyebrow">What we are not</span>
            <h2>Not merely a scrap dealer or mover</h2>
            <p>
              Ogoldy connects physical execution, asset decisions and evidence.
              A requirement may end in redeployment, custody, resale, recycling
              or a combination.
            </p>
          </div>
        </section>
        <section className="section-shell final-cta">
          <div>
            <span className="eyebrow">Have a live requirement?</span>
            <h2>Bring Ogoldy in before the scope hardens.</h2>
          </div>
          <Link className="button button-primary" href="/contact">
            Discuss the site <ArrowRight size={18} />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
