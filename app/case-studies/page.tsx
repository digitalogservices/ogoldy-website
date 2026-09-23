import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { PageHero } from "../components/page-hero";
import { caseStudies } from "../data/case-studies";
export const metadata: Metadata = {
  title: "Enterprise Asset Transition Case Studies | Ogoldy",
  description:
    "Case studies covering office decommissioning, reverse logistics, custody, racking dismantling and asset value recovery across India.",
  alternates: { canonical: "/case-studies" },
};
export default function Cases() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Selected operating evidence"
          title="The work behind an asset transition"
          intro="Named project evidence showing how Ogoldy connects survey, dismantling, movement, custody, redeployment and liquidation."
        />
        <section className="section-shell content-section">
          <div className="case-hub-grid">
            {caseStudies.map((item, index) => (
              <Link
                className="case-feature"
                href={`/case-studies/${item.slug}`}
                key={item.slug}
              >
                <figure className="case-feature-image">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={1200}
                    height={1160}
                    sizes="(max-width: 700px) 100vw, 50vw"
                  />
                </figure>
                <div className="case-feature-top">
                  <span>
                    {String(index + 1).padStart(2, "0")} · {item.sector}
                  </span>
                  <ArrowUpRight />
                </div>
                <div>
                  <p className="case-client">{item.client}</p>
                  <h2>{item.title}</h2>
                  <p>{item.summary}</p>
                </div>
                <div className="metric-row">
                  {item.metrics.map((m) => (
                    <div key={m.label}>
                      <strong>{m.value}</strong>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
