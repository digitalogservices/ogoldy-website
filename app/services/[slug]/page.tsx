import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDown,
  ArrowRight,
  Box,
  Check,
  ClipboardCheck,
  Layers3,
  MapPinned,
  Move3d,
  PackageCheck,
  Recycle,
  ScanLine,
  Warehouse,
} from "lucide-react";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { getService, services } from "../../data/services";
import { serviceRefresh, refreshFaq } from "../../data/service-refresh";
const icons = [
  ScanLine,
  Layers3,
  Recycle,
  PackageCheck,
  Box,
  Warehouse,
  Move3d,
  MapPinned,
  ClipboardCheck,
];
const visuals = [
  "/editorial/topsoe-faridabad-office-decommissioning.webp",
  "/editorial/topsoe-faridabad-office-decommissioning.webp",
  "/editorial/lifecycle.webp",
  "/editorial/mtc-ford-racking-redeployment.webp",
  "/editorial/decathlon-pan-india-reverse-logistics.webp",
  "/editorial/landmark-chennai-racking-liquidation.webp",
  "/editorial/mtc-ford-racking-redeployment.webp",
  "/editorial/decathlon-pan-india-reverse-logistics.webp",
  "/editorial/lifecycle.webp",
];
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  const refresh = serviceRefresh[s.slug];
  return {
    title: refresh?.title ?? `${s.title} India | Ogoldy`,
    description: refresh?.meta ?? s.intro,
    keywords: s.keywords,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: refresh?.title ?? `${s.title} India | Ogoldy`, description: refresh?.meta ?? s.intro },
    twitter: {
      card: "summary",
      title: refresh?.title ?? `${s.title} India | Ogoldy`,
      description: refresh?.meta ?? s.intro,
    },
  };
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const refresh = serviceRefresh[s.slug];
  const index = services.findIndex((x) => x.slug === s.slug);
  const faq = refreshFaq[s.slug] ?? s.faq;
  const Icon = icons[index] ?? ScanLine;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    provider: { "@id": "https://www.ogoldy.com/#organization" },
    areaServed: { "@type": "Country", name: "India" },
    description: refresh?.lead ?? s.intro,
  };
  return (
    <>
      <SiteHeader />
      <main>
        <section className="service-v6-hero">
          <div className="section-shell service-v6-grid">
            <div>
              <span className="service-number">0{index + 1}</span>
              <Icon className="service-main-icon" />
              <span className="eyebrow light">
                Enterprise service · Pan-India
              </span>
              <h1>{refresh?.h1 ?? s.title}</h1>
              <p>{refresh?.lead ?? s.intro}</p>
              <div className="button-row">
                <Link className="button button-primary" href="/contact">
                  {refresh?.cta ?? "Discuss this requirement"} <ArrowRight size={18} />
                </Link>
                <a className="service-scroll" href="#scope">
                  See scope <ArrowDown size={16} />
                </a>
              </div>
            </div>
            <div className="service-visual">
              <Image
                src={visuals[index] ?? "/editorial/lifecycle.webp"}
                alt={`Conceptual visual showing the operating flow for ${s.title.toLowerCase()}`}
                width={1200}
                height={1160}
                priority
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </div>
          </div>
        </section>
        <section className="service-process-strip">
          <div className="section-shell">
            {s.process.map((x, i) => (
              <div key={x}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{x}</strong>
              </div>
            ))}
          </div>
        </section>
        <section className="section-shell service-v6-body" id="scope">
          <div>
            <span className="eyebrow">Scope</span>
            <h2>What can be included</h2>
            <p className="section-intro">
              The final BOQ is validated against site conditions, access,
              quantities and the intended asset outcome.
            </p>
          </div>
          <div className="scope-grid">
            {s.scope.map((x, i) => (
              <article key={x}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <Check />
                <strong>{x}</strong>
              </article>
            ))}
          </div>
        </section>
        <section className="service-controls">
          <div className="section-shell service-controls-grid">
            <div>
              <ClipboardCheck />
              <h3>Scope clarity</h3>
              <p>
                Assumptions, access and exclusions are resolved before
                deployment.
              </p>
            </div>
            <div>
              <Warehouse />
              <h3>Asset control</h3>
              <p>
                Reusable, saleable, scrap and disposal streams are separated.
              </p>
            </div>
            <div>
              <PackageCheck />
              <h3>Close-out</h3>
              <p>
                Movement, handover and agreed documentation complete the scope.
              </p>
            </div>
          </div>
        </section>
        {refresh && (
          <section className="section-shell service-refresh">
            <span className="eyebrow">Execution approach</span>
            <div className="service-refresh-grid">
              {refresh.sections.map((section) => (
                <article key={section.heading}>
                  <h2>{section.heading}</h2>
                  <p>{section.text}</p>
                </article>
              ))}
            </div>
          </section>
        )}
        {s.slug === "asset-relocation-redeployment" && (
          <section className="section-shell relocation-intent-links">
            <div>
              <span className="eyebrow">Related relocation scopes</span>
              <h2>Moving an entire site?</h2>
              <p>
                This page focuses on asset-level movement and redeployment
                between locations. Use the dedicated route when the requirement
                is a complete office, factory or warehouse relocation.
              </p>
            </div>
            <div>
              <Link href="/office-relocation-services">
                Office relocation services <ArrowRight />
              </Link>
              <Link href="/factory-industrial-relocation">
                Factory & industrial relocation <ArrowRight />
              </Link>
              <Link href="/warehouse-relocation-asset-movement">
                Warehouse relocation & asset movement <ArrowRight />
              </Link>
            </div>
          </section>
        )}
        {refresh && (
          <section className="section-shell service-refresh service-refresh-proof">
            <span className="eyebrow">Verified project scope</span>
            <h2>Related execution</h2>
            <div className="service-refresh-grid">
              {refresh.proof.map((item) => (
                <article key={item.href}>
                  <h3>{item.label}</h3>
                  <p>{item.detail}</p>
                  <Link href={item.href}>View project <ArrowRight size={16} /></Link>
                </article>
              ))}
            </div>
            <Link href="/projects/">Explore all projects <ArrowRight size={16} /></Link>
          </section>
        )}
        {refresh && (
          <section className="section-shell service-refresh service-refresh-links">
            <span className="eyebrow">Related services and use cases</span>
            <h2>Plan the next step</h2>
            <div className="service-refresh-link-grid">
              {refresh.links.map((item) => (
                <Link href={item.href} key={item.href}>{item.label} <ArrowRight size={16} /></Link>
              ))}
            </div>
          </section>
        )}
        <section className="faq-section">
          <div className="section-shell">
            <span className="eyebrow">Useful answers</span>
            <h2>Frequently asked questions</h2>
            <div className="faq-grid">
              {faq.map((f) => (
                <article key={f.q}>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section-shell final-cta">
          <div>
            <span className="eyebrow">Next step</span>
            <h2>{refresh?.cta ?? "Send the BOQ, photos or asset list."}</h2>
          </div>
          <Link className="button button-primary" href={refresh?.ctaHref ?? "/contact"}>
            {refresh?.ctaHref ? "Get an asset value estimate" : "Start an enquiry"} <ArrowRight size={18} />
          </Link>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, ...(faq.length ? [{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] : [])]) }}
      />
      <SiteFooter />
    </>
  );
}
