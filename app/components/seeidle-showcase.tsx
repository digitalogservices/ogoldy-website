"use client";
import Link from "next/link";
import { ArrowRight, Camera, Check, MapPin, PackageCheck, Truck } from "lucide-react";

const workflow=["Capture","Classify / specify","Hold / track","Request / redeploy","Move","Receive","Review economics","Sell / scrap / close"];

export function SeeIdleShowcase({compact=false}:{compact?:boolean}){
  return <section className={compact?"seeidle-section compact":"seeidle-section"}><div className="section-shell">
    <div className="section-heading"><div><span className="eyebrow light">SeeIdle-powered capability</span><h2>Know what exists. Decide what happens next.</h2></div><p>SeeIdle is a separate asset-workflow technology used by Ogoldy to support visibility, custody, movement and reconciliation.</p></div>
    <div className="seeidle-window">
      <div className="window-bar"><i/><i/><i/><span>SeeIdle · asset workflow</span></div>
      <div className="seeidle-screen">
        <div className="capture-phone"><div><strong>Capture</strong><small>Record an asset at source</small></div><div className="capture-tile"><Camera/><b>Capture asset</b><span>Photo · quantity · location · condition</span></div><p><Check/> Asset captured <b>IDL-2026-000171</b></p></div>
        <div className="asset-dashboard"><div className="dashboard-kpis"><div><b>34</b><span>assets received</span></div><div><b>₹</b><span>value recorded</span></div><div><b>8</b><span>decisions due</span></div></div>
          <div className="asset-line"><span className="asset-icon"><PackageCheck/></span><p><b>Air handling unit</b><small>Warehouse A · Qty 6</small></p><em>In custody</em></div>
          <div className="asset-line"><span className="asset-icon"><Truck/></span><p><b>Movement packet</b><small>Invoice · vehicle · receipt proof</small></p><em>Received</em></div>
          <div className="asset-line"><span className="asset-icon"><MapPin/></span><p><b>Task chairs</b><small>Mumbai · Qty 42 · reusable</small></p><em>Available</em></div>
        </div>
      </div>
    </div>
    {!compact&&<><div className="seeidle-flow">{workflow.map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span><strong>{x}</strong></div>)}</div><div className="economics-strip"><div><b>Replacement value</b><span>What would equivalent assets cost?</span></div><div><b>Holding cost</b><span>Storage, custody and insurance timing</span></div><div><b>Next-use cost</b><span>Transport and redeployment</span></div><div><b>Recovery range</b><span>Resale or scrap estimate</span></div></div></>}
    <div className="button-row seeidle-actions"><Link className="button button-primary" href="/asset-decision-tool">Should I store, redeploy, sell or scrap? <ArrowRight size={18}/></Link><a className="button button-dark" href="https://seeidle.com">Visit SeeIdle <ArrowRight size={18}/></a></div>
  </div></section>;
}

export { AssetDecisionTool } from "./asset-decision-tool";
