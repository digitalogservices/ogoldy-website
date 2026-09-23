import type { Metadata } from "next";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { AssetDecisionTool, SeeIdleShowcase } from "../components/seeidle-showcase";
export const metadata:Metadata={title:"Store, Redeploy, Sell or Scrap Asset Decision Tool | Ogoldy",description:"Use transparent rules to review whether enterprise assets should be held, redeployed, sold or recycled.",alternates:{canonical:"/asset-decision-tool"}};
export default function Page(){return <><SiteHeader/><main><section className="decision-hero"><div className="section-shell"><span className="eyebrow light">SeeIdle-powered decision support</span><h1>Should I store, redeploy, sell or scrap these assets?</h1><p>Enter what you know. The tool shows a preliminary result, the rule behind it and what is still missing—before any enquiry form.</p></div></section><section className="section-shell tool-section"><AssetDecisionTool/></section><SeeIdleShowcase compact/></main><SiteFooter/></>}
