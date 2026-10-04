import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award } from "lucide-react";
import { ServiceGrid } from "./components/service-grid";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import { SeeIdleShowcase } from "./components/seeidle-showcase";
import { ScaleCounter } from "./components/scale-counter";
import { approvedClients } from "./data/case-studies";
import { projects } from "./data/projects";

export default function Home(){
 const featured=projects.filter(p=>p.featured).slice(0,4);
 return <><SiteHeader/><main>
  <section className="v9-hero"><div className="section-shell"><span className="eyebrow light">Enterprise scrap purchase, asset buyback and dismantling · Pan-India</span><h1>We buy, dismantle and remove <span>enterprise assets.</span></h1><p>Ogoldy buys enterprise scrap and, where commercially viable, old or surplus business assets. We dismantle and remove assets from offices, stores, warehouses and factories across India.</p><div className="button-row"><Link className="button button-primary" href="/contact">Discuss a requirement <ArrowRight size={18}/></Link><Link className="button button-dark" href="/asset-value-estimate">Get a value estimate</Link></div></div></section>
  <section className="section-shell why-ogoldy"><div><span className="eyebrow">Why Ogoldy</span><h2>More than a scrap buyer.</h2><p>Buying scrap or surplus assets is only one possible outcome. Ogoldy can also move assets, hold them in managed custody, redeploy them, liquidate or dispose of them, recycle where required, de-fit and reinstate sites, and keep the movement and handover documented.</p></div><div className="hero-chain" aria-label="Operating chain"><span>Assess</span><i aria-hidden="true">→</i><span>Buy / move</span><i aria-hidden="true">→</i><span>Hold</span><i aria-hidden="true">→</i><span>Redeploy / liquidate</span><i aria-hidden="true">→</i><span>Dispose / recycle</span><i aria-hidden="true">→</i><span>Reinstate</span><i aria-hidden="true">→</i><span>Document</span></div></section>
  <section className="section-shell v6-services"><div className="section-heading"><div><span className="eyebrow">Services</span><h2>Use one scope—or connect the full chain.</h2></div><p>From office de-fitment and industrial relocation to custody, liquidation and reinstatement.</p></div><ServiceGrid limit={6}/><div className="center-link"><Link href="/services">Explore all services <ArrowRight size={17}/></Link></div></section>
  <SeeIdleShowcase/>
  <section className="section-shell featured-projects"><div className="section-heading"><div><span className="eyebrow">Flagship projects</span><h2>Proof at enterprise scale.</h2></div><Link href="/projects">View all projects <ArrowRight size={17}/></Link></div><div className="featured-project-grid">{featured.map(p=><Link href={`/projects/${p.slug}`} key={p.slug}><Image src={p.image} alt={p.imageAlt} width={800} height={600}/><span>{p.sector} · {p.location}</span><h3>{p.client}</h3><p>{p.title}</p><div className="fact-row">{p.facts.slice(0,2).map(f=><b key={f}>{f}</b>)}</div></Link>)}</div></section>
  <ScaleCounter/>
  <section className="client-proof v6-client-proof"><div className="section-shell"><span className="proof-label">Selected enterprise experience</span><div className="client-marquee" aria-label="Selected client names"><div>{[...approvedClients,...approvedClients].map((c,i)=><span key={c+i}>{c}</span>)}</div></div></div></section>
  <section className="recognition-section"><div className="section-shell recognition-grid"><div className="award-block"><Award/><span className="eyebrow light">Independent recognition</span><h2>Emerging FM Agency of the Year</h2><p>BW Businessworld Facility Management Excellence Awards 2026</p><a href="https://www.youtube.com/watch?v=emjHbWx-X3Q" target="_blank" rel="noreferrer">Watch the award video <ArrowRight size={17}/></a></div><div className="about-teaser"><div className="mini-orbit" aria-hidden="true"><span>O</span></div><span className="eyebrow">About Ogoldy</span><h2>Built from logistics, asset recovery and enterprise transition.</h2><p>Siddharth Gulati’s operating journey began with Pikkol, moved through enterprise asset recovery and liquidation work at Ferraille Global, and evolved into Ogoldy.</p><b>Pikkol → Ferraille Global → Ogoldy</b><Link href="/about">About Ogoldy <ArrowRight size={17}/></Link></div></div></section>
  <section className="section-shell final-cta"><div><span className="eyebrow">Start with what you have</span><h2>Share a BOQ, asset list, photos or simply the requirement.</h2></div><div className="button-row"><Link className="button button-primary" href="/contact">Start an enquiry <ArrowRight size={18}/></Link><Link className="button button-secondary" href="/asset-value-estimate">Get value estimate</Link></div></section>
 </main><SiteFooter/></>;
}
