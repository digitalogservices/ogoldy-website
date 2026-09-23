"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Camera, Check, MapPin, PackageCheck, Truck } from "lucide-react";

const workflow=["Capture","Classify / specify","Hold / track","Request / redeploy","Move","Receive","Review economics","Sell / scrap / close"];
const missingLabels:Record<string,string>={replacementValue:"replacement value",storageCost:"monthly holding cost",redeploymentCost:"redeployment cost",resaleEstimate:"resale estimate",scrapEstimate:"scrap estimate"};

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
    <Link className="button button-primary" href="/asset-decision-tool">Should I store, redeploy, sell or scrap? <ArrowRight size={18}/></Link>
  </div></section>;
}

export function AssetDecisionTool(){
  const [started,setStarted]=useState(false);
  const [result,setResult]=useState<null|{decision:string;reasons:string[];missing:string[]}>(null);
  function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const d=new FormData(e.currentTarget);
    const n=(k:string)=>Number(d.get(k)||0);
    const condition=String(d.get("condition"));
    const reuse=n("reuseHorizon"), replacement=n("replacementValue"), storage=n("storageCost"), move=n("redeploymentCost"), resale=n("resaleEstimate"), scrap=n("scrapEstimate");
    const missing=["replacementValue","storageCost","redeploymentCost","resaleEstimate","scrapEstimate"].filter(k=>!n(k)).map(k=>missingLabels[k]);
    let decision="Human review required";
    const reasons:string[]=[];
    if(condition==="poor"&&scrap>0&&scrap>=resale){decision="Scrap / recycle";reasons.push("Condition is poor and the stated scrap estimate is at least the resale estimate.");}
    else if(reuse>0&&reuse<=6&&replacement>0&&move>0&&move<replacement*.45){decision="Redeploy";reasons.push("Expected reuse is within six months and stated movement cost is below 45% of replacement value.");}
    else if(reuse>12&&resale>scrap&&resale>0){decision="Sell / liquidate";reasons.push("Reuse is more than twelve months away and stated resale value exceeds scrap value.");}
    else if(reuse>0&&reuse<=12&&storage>0&&replacement>0&&storage*reuse<replacement*.25){decision="Continue holding";reasons.push("Expected holding cost to reuse is below 25% of stated replacement value.");}
    else reasons.push("The supplied values do not meet a configured decision threshold, so an operating review is safer.");
    setResult({decision,reasons,missing});
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({event:"asset_decision_tool_completed",decision});
  }
  function start(){
    if(started)return;
    setStarted(true);
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({event:"asset_decision_tool_started"});
  }
  return <div className="decision-tool"><form onSubmit={submit} onInput={start}><div className="tool-grid">
    <label>Asset / category<input name="asset" required/></label><label>Quantity<input name="quantity" type="number" min="1" required/></label>
    <label>Age (years)<input name="age" type="number" min="0" step="0.5"/></label><label>Condition<select name="condition" required><option value="">Select</option><option value="good">Good / reusable</option><option value="fair">Fair / repairable</option><option value="poor">Poor / end-of-life</option></select></label>
    <label>Current location<input name="location" required/></label><label>Expected reuse horizon (months)<input name="reuseHorizon" type="number" min="0"/></label>
    <label>Replacement value (₹)<input name="replacementValue" type="number" min="0"/></label><label>Monthly storage / custody (₹)<input name="storageCost" type="number" min="0"/></label>
    <label>Redeployment cost (₹)<input name="redeploymentCost" type="number" min="0"/></label><label>Resale estimate (₹)<input name="resaleEstimate" type="number" min="0"/></label>
    <label>Scrap estimate (₹)<input name="scrapEstimate" type="number" min="0"/></label>
  </div><button className="button button-primary">Review the decision</button></form>
  {result&&<div className="tool-result" aria-live="polite"><span>Preliminary rule-based result</span><h2>{result.decision}</h2>{result.reasons.map(x=><p key={x}>{x}</p>)}<h3>Assumptions</h3><p>Thresholds compare stated values only: redeploy below 45% of replacement value; hold where expected holding cost stays below 25%; sell when reuse is over 12 months away and resale exceeds scrap.</p>{result.missing.length>0&&<><h3>Missing data</h3><p>{result.missing.join(", ")}. Add these for a stronger review.</p></>}<Link className="button button-secondary" href={`/contact?decision=${encodeURIComponent(result.decision)}`}>Want Ogoldy to validate this? <ArrowRight size={18}/></Link></div>}</div>;
}
