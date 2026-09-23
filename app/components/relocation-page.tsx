import Link from "next/link";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  PackageCheck,
  Route,
  Tags,
  Warehouse,
} from "lucide-react";
import type { RelocationPage as Data } from "../data/relocation-pages";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
const process = [
  {
    i: Route,
    t: "Survey",
    d: "Origin, destination, access, asset and programme constraints.",
  },
  {
    i: Tags,
    t: "Dismantle & tag",
    d: "Identify what moves, stays, stores or exits the asset base.",
  },
  {
    i: PackageCheck,
    t: "Pack & transport",
    d: "Practical preservation, loading, documents and movement control.",
  },
  {
    i: Warehouse,
    t: "Receive & resolve",
    d: "Redeploy, hold, liquidate or dispose with a recorded handoff.",
  },
];
export function RelocationPage({ data }: { data: Data }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.h1,
    serviceType: data.title,
    description: data.description,
    provider: {
      "@type": "Organization",
      name: "Ogoldy",
      url: "https://ogoldy.com",
    },
    areaServed: { "@type": "Country", name: "India" },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
  return (
    <>
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
        />
        <section className="relocation-hero">
          <div className="section-shell">
            <span className="eyebrow light">{data.eyebrow}</span>
            <h1>{data.h1}</h1>
            <p>{data.intro}</p>
            <div className="button-row">
              <Link className="button button-primary" href="/contact">
                Plan the relocation <ArrowRight size={18} />
              </Link>
              <Link
                className="button button-secondary"
                href="/asset-value-estimate"
              >
                Share BOQ or asset list
              </Link>
            </div>
          </div>
        </section>
        <section className="relocation-decision">
          <div className="section-shell">
            <span>One accountable chain</span>
            <h2>What stays. What moves. What waits. What recovers value.</h2>
            <p>
              Ogoldy manages the asset decisions around a relocation, not only
              the transport leg.
            </p>
          </div>
        </section>
        <section className="section-shell relocation-two">
          <div>
            <span className="eyebrow">Use cases</span>
            <h2>Built for operational transitions</h2>
            {data.useCases.map((x) => (
              <p className="check-line" key={x}>
                <Check />
                {x}
              </p>
            ))}
          </div>
          <div>
            <span className="eyebrow">What can move</span>
            <h2>Asset-heavy enterprise scope</h2>
            {data.assets.map((x) => (
              <p className="check-line" key={x}>
                <Check />
                {x}
              </p>
            ))}
          </div>
        </section>
        <section className="relocation-process">
          <div className="section-shell">
            <span className="eyebrow light">Operating sequence</span>
            <h2>Survey to documented close-out</h2>
            <div className="relocation-process-grid">
              {process.map((x, n) => (
                <article key={x.t}>
                  <x.i />
                  <span>0{n + 1}</span>
                  <h3>{x.t}</h3>
                  <p>{x.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section-shell relocation-two">
          <div>
            <span className="eyebrow">Downtime and control</span>
            <h2>Plan the handoffs before mobilisation</h2>
            <p>
              Phasing, after-hours execution, lift windows, gate permissions,
              vehicle sequencing and destination readiness are resolved against
              the actual programme.
            </p>
            <div className="control-list">
              {data.controls.map((x) => (
                <p key={x}>
                  <ClipboardCheck />
                  {x}
                </p>
              ))}
            </div>
          </div>
          <div className="relocation-chain">
            <span className="eyebrow">Connected services</span>
            <h2>One move can require more than movers.</h2>
            <Link href="/services/office-dismantling-defitment">
              Dismantling and de-fitment <ArrowRight />
            </Link>
            <Link href="/services/bare-shell-reinstatement">
              Bare shell and reinstatement <ArrowRight />
            </Link>
            <Link href="/services/managed-asset-custody">
              Managed custody <ArrowRight />
            </Link>
            <Link href="/services/asset-relocation-redeployment">
              Asset redeployment <ArrowRight />
            </Link>
            <Link href="/services/asset-buyback-liquidation">
              Liquidation and buyback <ArrowRight />
            </Link>
          </div>
        </section>
        <section className="dark-section">
          <div className="section-shell relocation-proof">
            <div>
              <span className="eyebrow light">Relevant operating evidence</span>
              <h2>Relocation capability built from real asset transitions.</h2>
            </div>
            <div>
              {data.proof.map((x) => (
                <Link href={x.href} key={x.href}>
                  {x.label}
                  <ArrowRight />
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="faq-section">
          <div className="section-shell">
            <span className="eyebrow">Relocation questions</span>
            <h2>Scope before assumptions</h2>
            <div className="faq-grid">
              {data.faq.map((x) => (
                <article key={x.q}>
                  <h3>{x.q}</h3>
                  <p>{x.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section-shell final-cta">
          <div>
            <span className="eyebrow">Plan a move</span>
            <h2>Start with the origin, destination and asset volume.</h2>
          </div>
          <Link className="button button-primary" href="/contact">
            Send relocation details <ArrowRight size={18} />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
