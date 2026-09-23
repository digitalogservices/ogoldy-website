import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardCheck,
  FileCheck2,
  ScanLine,
} from "lucide-react";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { caseStudies } from "../../data/case-studies";
export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = caseStudies.find((c) => c.slug === slug);
  if (!item) return {};
  return {
    title: `${item.client} Case Study | Ogoldy`,
    description: item.summary,
    alternates: { canonical: `/case-studies/${slug}` },
  };
}
export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = caseStudies.find((c) => c.slug === slug);
  if (!item) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    about: item.services,
    author: { "@type": "Organization", name: "Ogoldy" },
    publisher: {
      "@type": "Organization",
      name: "Ogoldy",
      url: "https://ogoldy.com",
    },
  };
  return (
    <>
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <section className="case-hero">
          <div className="section-shell">
            <Link className="back-link" href="/case-studies">
              <ArrowLeft size={17} /> All case studies
            </Link>
            <div className="case-hero-grid">
              <div>
                <span className="eyebrow">
                  {item.sector} · {item.location}
                </span>
                <p className="case-client">{item.client}</p>
                <h1>{item.title}</h1>
                <p className="hero-copy">{item.summary}</p>
                <div className="metric-row hero-metrics">
                  {item.metrics.map((m) => (
                    <div key={m.label}>
                      <strong>{m.value}</strong>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <figure className="case-hero-visual">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={1200}
                  height={1160}
                  priority
                  sizes="(max-width: 900px) 100vw, 42vw"
                />
              </figure>
            </div>
          </div>
        </section>
        <section className="section-shell case-body">
          <aside>
            <strong>Project facts</strong>
            <span>{item.client}</span>
            <span>{item.sector}</span>
            <span>{item.location}</span>
            {item.metrics.map((m) => (
              <span key={m.label}>
                {m.value} {m.label}
              </span>
            ))}
          </aside>
          <div>
            <section>
              <span className="eyebrow">Challenge</span>
              <h2>A connected operating problem</h2>
              <p>{item.challenge}</p>
            </section>
            <section className="case-site-assets">
              <span className="eyebrow">Site and assets</span>
              <h2>Scope defined around the asset decision</h2>
              <p>{item.summary}</p>
              <div className="scope-chips">
                {item.services.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </section>
            <section>
              <span className="eyebrow">Ogoldy approach and execution</span>
              <h2>Structure before mobilisation</h2>
              <ol className="approach-list">
                {item.approach.map((a, i) => (
                  <li key={a}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {a}
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <span className="eyebrow">Outcome</span>
              <h2>What this demonstrates</h2>
              <p>{item.outcome}</p>
              {item.note && <p className="verification-note">{item.note}</p>}
            </section>
            <section>
              <span className="eyebrow">Controls and documentation</span>
              <h2>Evidence at the handoffs</h2>
              <div className="control-grid">
                <div>
                  <ScanLine />
                  <strong>Scope control</strong>
                  <p>
                    Site conditions, asset categories and access constraints are
                    validated before execution.
                  </p>
                </div>
                <div>
                  <ClipboardCheck />
                  <strong>Movement control</strong>
                  <p>
                    Packing, loading, custody and onward movement are structured
                    around agreed asset records.
                  </p>
                </div>
                <div>
                  <FileCheck2 />
                  <strong>Closure evidence</strong>
                  <p>
                    Handover and disposal, sale or redeployment records follow
                    the agreed project scope.
                  </p>
                </div>
              </div>
            </section>
            <section>
              <span className="eyebrow">Related services</span>
              <div className="related-links">
                {item.services.map((s) => (
                  <Link href="/services" key={s}>
                    {s}
                    <ArrowRight size={15} />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </section>
        <section className="section-shell final-cta">
          <div>
            <span className="eyebrow">Planning a similar scope?</span>
            <h2>Start with a BOQ, photos or the site requirement.</h2>
          </div>
          <Link className="button button-primary" href="/asset-value-estimate">
            Get an asset value estimate <ArrowRight size={18} />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
