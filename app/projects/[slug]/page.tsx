import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { getProject, projects } from "../../data/projects";

export const generateStaticParams = () => projects.map(p => ({slug:p.slug}));
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const p=getProject((await params).slug);return p?{title:`${p.client} ${p.location} Project | Ogoldy`,description:p.summary,alternates:{canonical:`/projects/${p.slug}`},openGraph:{title:`${p.client} project | Ogoldy`,description:p.summary,images:[p.image]}}:{};}

export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
  const p=getProject((await params).slug); if(!p) notFound();
  const schema={"@context":"https://schema.org","@type":"Article",headline:p.title,description:p.summary,about:p.scope,author:{"@type":"Organization",name:"Ogoldy"},publisher:{"@type":"Organization",name:"Ogoldy",url:"https://www.ogoldy.com"}};
  return <><SiteHeader/><main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <section className="project-detail-hero"><div className="section-shell"><Link className="back-link" href="/projects"><ArrowLeft size={16}/> All projects</Link><div className="project-detail-grid"><div><span className="eyebrow light">{p.sector} · {p.location}</span><p className="case-client">{p.client}</p><h1>{p.title}</h1><p>{p.summary}</p><div className="fact-row light">{p.facts.map(f=><b key={f}>{f}</b>)}</div></div><Image src={p.image} alt={p.imageAlt} width={1000} height={760} priority/></div></div></section>
    <section className="section-shell project-detail-body"><div><span className="eyebrow">Verified scope</span><h2>One connected operating chain</h2><p>The published record is limited to public-safe scope confirmed in the Ogoldy project evidence set.</p></div><div className="project-scope-list">{p.scope.map((s,i)=><div key={s}><span>{String(i+1).padStart(2,"0")}</span><Check/><strong>{s}</strong></div>)}</div></section>
    <section className="project-outcome"><div className="section-shell"><span className="eyebrow light">What this demonstrates</span><h2>{p.outcome}</h2><Link className="button button-primary" href="/contact" data-track="project_cta">Discuss a similar requirement <ArrowRight size={18}/></Link></div></section>
  </main><SiteFooter/></>;
}
