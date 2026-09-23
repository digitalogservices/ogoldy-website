import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { PageHero } from "../components/page-hero";
import { projects } from "../data/projects";

export const metadata: Metadata = {
  title: "Enterprise Asset Transition Projects India | Ogoldy",
  description: "Verified Ogoldy project records across offices, retail networks, warehouses, branches and institutional sites in India.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <><SiteHeader/><main>
    <PageHero eyebrow="Verified project portfolio" title="Enterprise transitions, recorded project by project" intro="Real scopes showing how Ogoldy connects survey, dismantling, movement, custody, redeployment, liquidation and close-out." />
    <section className="section-shell project-index">
      {projects.map((p, i) => <Link className="project-index-card" href={`/projects/${p.slug}`} key={p.slug}>
        <div className="project-index-image"><Image src={p.image} alt={p.imageAlt} width={720} height={560}/></div>
        <div><span>{String(i+1).padStart(2,"0")} · {p.sector}</span><h2>{p.client}</h2><h3>{p.title}</h3><p>{p.summary}</p><div className="fact-row">{p.facts.map(f=><b key={f}>{f}</b>)}</div><em>View project <ArrowRight size={16}/></em></div>
      </Link>)}
    </section>
  </main><SiteFooter/></>;
}
