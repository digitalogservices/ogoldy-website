import { conditions, readiness, numericLabels, displayNumeric, qualityLabels, disclaimer } from "../../lib/asset-decision/model";
import type { Assessment } from "../../lib/asset-decision/session";

export function AssessmentSummary({ assessment }: { assessment: Assessment }) {
  const { inputs: i, result: r } = assessment;
  return <section className="assessment-summary" aria-label="Assessment summary">
    <h2>Your assessment</h2><p><strong>{r.recommendation}</strong><br/>Data quality: {qualityLabels[r.data_quality]}</p>
    <dl>
      <div><dt>Asset / category</dt><dd>{i.asset || "Not supplied"}</dd></div>
      <div><dt>Quantity</dt><dd>{displayNumeric(i.quantity)}</dd></div>
      <div><dt>Location</dt><dd>{i.location || "Not supplied"}</dd></div>
      <div><dt>Age (years)</dt><dd>{displayNumeric(i.age)}</dd></div>
      <div><dt>Condition</dt><dd>{conditions[i.condition]}</dd></div>
      <div><dt>Reuse readiness</dt><dd>{readiness[i.reuseReadiness]}</dd></div>
      {Object.entries(numericLabels).map(([key,label]) => <div key={key}><dt>{label}</dt><dd>{displayNumeric(i[key as keyof typeof numericLabels], key !== "reuseHorizon")}</dd></div>)}
    </dl>
    <details><summary>Reasoning, missing information and assumptions</summary>
      <h3>Why</h3><ul>{r.reasons.map(x=><li key={x}>{x}</li>)}</ul>
      <h3>Economics considered</h3><ul>{r.economics.map(x=><li key={x}>{x}</li>)}</ul>
      <h3>Missing / uncertain information</h3><ul>{(r.missing.length ? r.missing : ["No decision inputs missing; estimates remain unverified."]).map(x=><li key={x}>{x}</li>)}</ul>
      <h3>What could change the recommendation</h3><ul>{r.couldChange.map(x=><li key={x}>{x}</li>)}</ul>
      <h3>Assumptions</h3><ul>{r.assumptions.map(x=><li key={x}>{x}</li>)}</ul>
    </details>
    <p className="microcopy">{disclaimer}</p><p className="microcopy">This read-only assessment will be submitted with your enquiry. You do not need to enter it again.</p>
  </section>;
}
