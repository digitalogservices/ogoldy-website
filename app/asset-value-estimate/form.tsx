"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Upload, CheckCircle2 } from "lucide-react";
import { AssessmentSummary } from "../components/assessment-summary";
import { loadAssessment, storageRead, type Assessment } from "../../lib/asset-decision/session";
import { displayNumeric, conditions, readiness, numericLabels } from "../../lib/asset-decision/model";

export function EstimateForm() {
  const startedAt = useRef(0);
  const submitting = useRef(false);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [assetType, setAssetType] = useState("");
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [assessmentMissing, setAssessmentMissing] = useState(false);

  useEffect(() => {
    startedAt.current = Date.now();
    if (window.location.pathname.startsWith("/contact") && new URLSearchParams(window.location.search).get("decision") === "assessment_v2") {
      const saved = loadAssessment();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Read browser-only session data after the server render.
      setAssessment(saved);
      setAssessmentMissing(!saved);
    }
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setStatus("sending");
    setMessage("");
    const data = new FormData(e.currentTarget);
    data.set("form-name", "ogoldy-enterprise-enquiry");
    data.set("submitted_at", new Date().toISOString());
    data.set("landing_page", storageRead("ogoldy_landing") || window.location.pathname);
    data.set("source_page", window.location.pathname);
    const rawReferrer = storageRead("ogoldy_referrer") || document.referrer;
    try {
      const url = new URL(rawReferrer);
      data.set("referrer", `${url.origin}${url.pathname}`);
    } catch {
      data.set("referrer", "");
    }
    const query = new URLSearchParams(window.location.search);
    for (const key of ["source", "medium", "campaign", "content", "term"])
      data.set(`utm_${key}`, query.get(`utm_${key}`) || storageRead(`ogoldy_utm_${key}`) || "");
    const legacyDecision = ({
      "Continue holding": "hold",
      Redeploy: "redeploy",
      "Sell / liquidate": "sell",
      "Scrap / recycle": "scrap",
      "Human review required": "human_review",
    } as Record<string, string>)[query.get("decision") || ""] || "";
    const decision = assessment?.result.decision || legacyDecision;
    if (assessmentMissing) {
      setStatus("error"); setMessage("The saved assessment is unavailable. Return to the tool to review it again");
      submitting.current = false; return;
    }
    if (assessment) {
      data.set("assessment_payload", JSON.stringify(assessment));
      data.set("assessment_summary", [
        `Asset / category: ${assessment.inputs.asset}`,
        `Quantity: ${displayNumeric(assessment.inputs.quantity)}`,
        `Location: ${assessment.inputs.location || "Not supplied"}`,
        `Age (years): ${displayNumeric(assessment.inputs.age)}`,
        `Condition: ${conditions[assessment.inputs.condition]}`,
        `Reuse readiness: ${readiness[assessment.inputs.reuseReadiness]}`,
        ...Object.entries(numericLabels).map(([key,label]) => `${label}: ${displayNumeric(assessment.inputs[key as keyof typeof numericLabels], key !== "reuseHorizon")}`),
        `Recommendation: ${assessment.result.recommendation}`, `Data quality: ${assessment.result.data_quality}`,
        "Why:", ...assessment.result.reasons, "Economics considered:", ...assessment.result.economics,
        "Missing / uncertain information:", ...assessment.result.missing,
        "What could change the recommendation:", ...assessment.result.couldChange,
        "Assumptions:", ...assessment.result.assumptions,
      ].join("\n"));
      data.set("tool_version", assessment.tool_version);
      data.set("data_quality", assessment.result.data_quality);
      data.set("assetType", assessment.inputs.asset);
      data.set("quantity", displayNumeric(assessment.inputs.quantity));
      if (assessment.inputs.location) data.set("location", assessment.inputs.location);
      for (const [key,value] of Object.entries(assessment.attribution)) data.set(key,value);
      data.set("enquiry_page", window.location.pathname);
      data.set("marketing_consent", data.get("marketing_consent") === "yes" ? "yes" : "no");
    }
    const formType = decision ? "decision_tool" : window.location.pathname.startsWith("/contact") ? "contact" : "value_estimate";
    data.set("form_type", formType);
    data.set("decision_result", decision);
    for (const key of ["boq", "photos"]) {
      const file = data.get(key);
      if (file instanceof File && !file.name) data.delete(key);
    }
    const uploadBytes = [...data.values()]
      .filter((value): value is File => value instanceof File)
      .reduce((total, file) => total + file.size, 0);
    if (uploadBytes > 7_500_000) {
      setMessage("Combined uploads must be under 7.5 MB");
      setStatus("error");
      submitting.current = false;
      return;
    }
    try {
      const res = await fetch("/netlify-forms.html", { method: "POST", body: data });
      if (!res.ok) {
        setMessage("Submission unavailable");
        setStatus("error");
        return;
      }
      document.dispatchEvent(
        new CustomEvent("ogoldy:lead_submitted", {
          detail: { formType, decisionToolResult: decision },
        }),
      );
      setStatus("success");
    } catch {
      setMessage("Submission unavailable");
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  if (status === "success")
    return (
      <div className="form-success" role="status">
        <CheckCircle2 />
        <h2>Requirement received</h2>
        <p>
          Thank you. The Ogoldy team will review the information and contact you
          for verification or a site survey.
        </p>
      </div>
    );

  return (
    <form className={assessment ? "estimate-form assessment-enquiry" : "estimate-form"} name="ogoldy-enterprise-enquiry" method="POST" action="/netlify-forms.html" encType="multipart/form-data" data-netlify-honeypot="bot-field" onSubmit={submit}>
      <input type="hidden" name="form-name" value="ogoldy-enterprise-enquiry" />
      <input type="hidden" name="landing_page" />
      <input type="hidden" name="source_page" />
      <input type="hidden" name="referrer" />
      <input type="hidden" name="utm_source" />
      <input type="hidden" name="utm_medium" />
      <input type="hidden" name="utm_campaign" />
      <input type="hidden" name="utm_content" />
      <input type="hidden" name="utm_term" />
      <input type="hidden" name="form_type" />
      <input type="hidden" name="submitted_at" />
      <input type="hidden" name="decision_result" />
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {assessmentMissing && <p className="form-error" role="alert">Your saved assessment is unavailable in this session. <Link href="/asset-decision-tool">Return to the tool</Link> to review it again.</p>}
      {assessment && <AssessmentSummary assessment={assessment}/>}
      <div className="form-grid">
        <label>
          Company
          <input
            required
            name="company"
            autoComplete="organization"
            maxLength={120}
          />
        </label>
        <label>
          Contact name
          <input
            required
            name="contactName"
            autoComplete="name"
            maxLength={100}
          />
        </label>
        <label>
          Business email
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder="name@company.com"
            maxLength={160}
          />
        </label>
        <label>
          Phone
          <input
            required
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
          />
        </label>
        {!assessment?.inputs.location && <label>
          {assessment ? "City / site location (optional missing context)" : "City / site location"}
          <input required={!assessment} name="location" maxLength={160} />
        </label>}
        {!assessment && <label>
          Asset or requirement type
          <select
            required
            name="assetType"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
          >
            <option value="" disabled>
              Select one
            </option>
            <option>Office furniture and fixtures</option>
            <option>Scrap disposal / purchase</option>
            <option>Dismantling / de-fitment</option>
            <option>Bare shell / reinstatement</option>
            <option>IT assets / e-waste</option>
            <option>Warehouse racks</option>
            <option>Asset movement / custody</option>
            <option>Office relocation</option>
            <option>Factory / industrial relocation</option>
            <option>Warehouse relocation</option>
            <option>Other</option>
          </select>
        </label>}
        {!assessment && assetType.toLowerCase().includes("relocation") && (
          <fieldset className="wide relocation-fields">
            <legend>Relocation details</legend>
            <div className="form-grid">
              <label>
                Origin
                <input
                  required
                  name="origin"
                  maxLength={180}
                  placeholder="Current site / city"
                />
              </label>
              <label>
                Destination
                <input
                  required
                  name="destination"
                  maxLength={180}
                  placeholder="New site / city"
                />
              </label>
              <label>
                Preferred move date
                <input type="date" name="moveDate" />
              </label>
              <label>
                Site size / asset volume
                <input
                  required
                  name="moveVolume"
                  maxLength={180}
                  placeholder="Sq ft, pallets, machines or workstations"
                />
              </label>
              <div className="wide checkbox-group">
                <span>Assets in scope</span>
                {[
                  "IT / server assets",
                  "Machinery / heavy equipment",
                  "Racking / shelving",
                  "Furniture / fixtures",
                ].map((x) => (
                  <label key={x}>
                    <input type="checkbox" name="moveAssets" value={x} />
                    {x}
                  </label>
                ))}
              </div>
              {[
                ["needsDismantling", "Dismantling needed"],
                ["needsCustody", "Storage / custody needed"],
                ["needsLiquidation", "Disposal / liquidation needed"],
              ].map(([name, label]) => (
                <label className="option-check" key={name}>
                  <input type="checkbox" name={name} value="yes" />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        )}
        {!assessment && <label className="wide">
          Approximate quantity or site size
          <input
            required
            name="quantity"
            maxLength={200}
            placeholder="For example: 450 workstations or 20,000 sq ft"
          />
        </label>}
        <label className="wide">
          {assessment ? "Additional information (optional)" : "Notes"}
          <textarea
            required={!assessment}
            name="notes"
            maxLength={3000}
            rows={5}
            placeholder="Tell us the scope, timeline, access constraints and expected outcome."
          />
        </label>
        <label className="file-field">
          <Upload />
          <span>
            <strong>Upload BOQ / asset list</strong>
            <small>PDF, Excel, Word or CSV. Combined uploads under 7.5 MB.</small>
          </span>
          <input
            type="file"
            name="boq"
            accept=".pdf,.xlsx,.xls,.doc,.docx,.csv"
          />
        </label>
        <label className="file-field">
          <Upload />
          <span>
            <strong>Upload site / asset photos</strong>
            <small>JPG, PNG or WebP. One photo per submission.</small>
          </span>
          <input
            type="file"
            name="photos"
            accept="image/jpeg,image/png,image/webp"
          />
        </label>
      </div>
      <label className="consent">
        <input required type="checkbox" name="consent" value="yes" />{" "}
        <span>
          I have authority to share these business details and files. Ogoldy may
          use them to assess and respond to this enquiry as described in the{" "}
          <Link href="/privacy">privacy notice</Link>.
        </span>
      </label>
      {assessment && <label className="consent">
        <input type="checkbox" name="marketing_consent" value="yes" />
        <span><small>Optional</small><br/>Email me occasional Ogoldy updates, project insights and service information. I can unsubscribe at any time.</span>
      </label>}
      {status === "error" && (
        <p className="form-error" role="alert">
          {message}. Please retry or email growth@ogoldy.com.
        </p>
      )}
      <button
        className="button button-primary submit-button"
        disabled={status === "sending" || assessmentMissing}
      >
        {status === "sending" ? "Submitting…" : "Submit for assessment"}
      </button>
      <p className="microcopy">
        This is not an instant or guaranteed quote. Commercials follow
        verification of condition, quantity, location and execution constraints.
      </p>
    </form>
  );
}
