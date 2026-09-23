import type { Metadata } from "next";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { PageHero } from "../components/page-hero";
import { ServiceGrid } from "../components/service-grid";
import Link from "next/link";
import { ArrowRight, Building2, Factory, Warehouse } from "lucide-react";
export const metadata: Metadata = {
  title: "Enterprise Asset Services India | Ogoldy",
  description:
    "Dismantling, bare-shell reinstatement, scrap disposal, buyback, relocation, custody and liquidation services across India.",
  alternates: { canonical: "/services" },
};
export default function Services() {
  const chain=["Assess","Decide","Dismantle","Pack","Move","Track","Redeploy / Hold / Liquidate","Reinstate"];
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Services"
          title="From site exit to asset recovery"
          intro="Use one service or combine multiple workstreams into an accountable enterprise asset-transition programme."
        />
        <section className="section-shell content-section">
          <div className="seeidle-flow service-chain">{chain.map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span><strong>{x}</strong></div>)}</div>
          <ServiceGrid />
        </section>
        <section className="section-shell sector-links services-sector-links"><h2>Solutions by operating environment</h2><div><Link href="/solutions/office-asset-transition">Offices</Link><Link href="/solutions/retail-store-asset-transition">Retail stores</Link><Link href="/solutions/warehouse-asset-transition">Warehouses</Link><Link href="/solutions/factory-industrial-asset-transition">Factories</Link><Link href="/solutions/branch-network-asset-disposal">Branch networks</Link><Link href="/solutions/mall-store-dismantling">Malls</Link><Link href="/solutions/high-street-store-dismantling">High streets</Link><Link href="/solutions/it-park-office-transition">IT parks</Link><Link href="/solutions/sez-asset-transition">SEZs</Link></div></section>
        <section className="relocation-hub">
          <div className="section-shell">
            <div className="section-heading">
              <div>
                <span className="eyebrow light">Relocation search paths</span>
                <h2>Move the site and resolve the asset decisions.</h2>
              </div>
              <p>
                Dedicated enterprise relocation scopes for offices, factories
                and warehouses. Not household packers and movers.
              </p>
            </div>
            <div className="relocation-hub-grid">
              <Link href="/office-relocation-services">
                <Building2 />
                <h3>Office relocation</h3>
                <p>
                  Corporate office shifting with tagging, IT coordination,
                  de-fitment and destination handoff.
                </p>
                <span>
                  Explore office relocation <ArrowRight />
                </span>
              </Link>
              <Link href="/factory-industrial-relocation">
                <Factory />
                <h3>Factory & industrial relocation</h3>
                <p>
                  Machinery, plant and heavy-equipment movement planned around
                  operational constraints.
                </p>
                <span>
                  Explore industrial relocation <ArrowRight />
                </span>
              </Link>
              <Link href="/warehouse-relocation-asset-movement">
                <Warehouse />
                <h3>Warehouse relocation</h3>
                <p>
                  Racking, fixtures and enterprise assets moved, held,
                  redeployed or liquidated.
                </p>
                <span>
                  Explore warehouse relocation <ArrowRight />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
