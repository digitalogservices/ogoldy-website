"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { pushAnalytics } from "../../lib/consent";
import { conditions, readiness, numericLabels, parseNumeric, evaluateAssessment, inputSchema, qualityLabels, disclaimer, type AssessmentInputs } from "../../lib/asset-decision/model";
import { captureAttribution, makeAssessment, saveAssessment, loadAssessment, clearAssessment, saveDraft, loadDraft, toolEvent, type Assessment } from "../../lib/asset-decision/session";

function NumericField({ name, label, step = "any" }: { name: string; label: string; step?: string }) {
  const [notSure, setNotSure] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Hydrate browser-session data after the server render.
    setNotSure(loadDraft()[`${name}Unknown`] === "yes");
  }, [name]);
  return <div className="tool-numeric">
    <label htmlFor={`tool-${name}`}>{label}</label>
    <input id={`tool-${name}`} name={name} type="number" min="0" step={step} disabled={notSure} placeholder="Blank = unknown" />
    <label className="unknown-option"><input type="checkbox" name={`${name}Unknown`} value="yes" checked={notSure} onChange={e=>setNotSure(e.target.checked)}/>Unknown / not sure</label>
  </div>;
}
export function AssetDecisionTool() {
  const formRef = useRef<HTMLFormElement>(null);
  const started = useRef(false), lastCompleted = useRef("");
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const draft = loadDraft();
    if (formRef.current) for (const [name,value] of Object.entries(draft)) {
      const control = formRef.current.elements.namedItem(name);
      if (control instanceof HTMLInputElement && control.type !== "checkbox" || control instanceof HTMLSelectElement) control.value = value;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Hydrate the external session record after the server render.
    setAssessment(loadAssessment());
    captureAttribution();
  }, []);
  function changed() {
    if (!formRef.current) return;
    saveDraft(formRef.current);
    clearAssessment(); setAssessment(null); setMessage("");
    if (!started.current) {
      started.current = true; lastCompleted.current = "";
      pushAnalytics(toolEvent("asset_decision_tool_started"));
    }
  }
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget, d = new FormData(form);
    const text = (key: string) => String(d.get(key) || "");
    const numeric = (key: string) => parseNumeric(text(key), d.get(`${key}Unknown`) === "yes");
    try {
      const inputs = inputSchema.parse({
        asset: text("asset"), location: text("location"), quantity: numeric("quantity"), age: numeric("age"),
        condition: text("condition"), reuseReadiness: text("reuseReadiness"),
        ...Object.fromEntries(Object.keys(numericLabels).map(key=>[key,numeric(key)])),
      }) as AssessmentInputs;
      const result = evaluateAssessment(inputs);
      const next = makeAssessment(inputs, captureAttribution());
      setAssessment(next); saveDraft(form);
      setMessage(saveAssessment(next) ? "" : "Session storage is unavailable. Keep this tab open while continuing to your enquiry; refresh may clear the assessment.");
      const fingerprint = JSON.stringify(inputs);
      if (lastCompleted.current !== fingerprint) {
        pushAnalytics(toolEvent("asset_decision_tool_completed", result));
        lastCompleted.current = fingerprint;
      }
      started.current = false;
    } catch { setMessage("Select condition and reuse readiness, and enter non-negative numbers or choose Unknown / not sure."); }
  }
  const result = assessment?.result;
  return <div className="decision-tool decision-v2">
    <form ref={formRef} onSubmit={submit} onChange={changed} aria-label="Asset disposition assessment">
      <h2>Preliminary asset disposition assessment</h2>
      <p>Enter what you know. Blank numbers and “Unknown / not sure” stay unknown; 0 is a known value.</p>
      <fieldset><legend>Asset context</legend><p className="tool-help">These details identify the assets for enquiry. Age, quantity and location do not change the decision rules.</p>
        <div className="tool-grid"><label>Asset / category (context)<input name="asset" required maxLength={160}/></label>
          <NumericField name="quantity" label="Quantity (context)"/>
          <label>Current location (optional context)<input name="location" maxLength={160}/></label>
          <NumericField name="age" label="Age in years (optional context)"/>
        </div>
      </fieldset>
      <fieldset><legend>Decision inputs</legend><p className="tool-help">Condition and internal use determine feasible routes. Known timing and costs support the economic comparison.</p>
        <div className="tool-grid">
          <label>Condition<select name="condition" required defaultValue=""><option value="" disabled>Select condition</option>{Object.entries(conditions).map(([v,label])=><option key={v} value={v}>{label}</option>)}</select></label>
          <label>Reuse readiness<select name="reuseReadiness" required defaultValue=""><option value="" disabled>Select internal use</option>{Object.entries(readiness).map(([v,label])=><option key={v} value={v}>{label}</option>)}</select></label>
          {Object.entries(numericLabels).map(([name,label])=><NumericField key={name} name={name} label={label}/>)}
        </div>
      </fieldset>
      <button className="button button-primary">Review the decision</button>
      {message && <p role="alert">{message}</p>}
    </form>
    {result && <section className="tool-result" aria-live="polite" aria-label="Assessment result">
      <span>Recommendation</span><h2>{result.recommendation}</h2><p>Data quality: {qualityLabels[result.data_quality]}</p>
      <h3>Why</h3><ul>{result.reasons.map(x=><li key={x}>{x}</li>)}</ul>
      <h3>Economics considered</h3><ul>{result.economics.map(x=><li key={x}>{x}</li>)}</ul>
      <h3>Missing / uncertain information</h3><ul>{(result.missing.length ? result.missing : ["No decision inputs missing; all estimates remain unverified."]).map(x=><li key={x}>{x}</li>)}</ul>
      <h3>What could change the recommendation</h3><ul>{result.couldChange.map(x=><li key={x}>{x}</li>)}</ul>
      <h3>Assumptions</h3><ul>{result.assumptions.map(x=><li key={x}>{x}</li>)}</ul>
      <p className="assessment-disclaimer">{disclaimer}</p>
      <Link className="button button-secondary" href="/contact?decision=assessment_v2">Ask Ogoldy to validate this assessment <ArrowRight size={18}/></Link>
    </section>}
  </div>;
}
