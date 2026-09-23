"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Upload, CheckCircle2 } from "lucide-react";

export function EstimateForm() {
  const startedAt = useRef(0);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [assetType, setAssetType] = useState("");

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    const data = new FormData(e.currentTarget);
    data.set("form-name", "ogoldy-enterprise-enquiry");
    data.set("timestamp", new Date().toISOString());
    data.set("landingPage", sessionStorage.getItem("ogoldy_landing") || window.location.pathname);
    data.set("sourcePage", window.location.pathname);
    data.set("referrer", document.referrer);
    const query=new URLSearchParams(window.location.search);
    for(const key of ["source","medium","campaign","content","term"]) data.set(`utm_${key}`,query.get(`utm_${key}`)||"");
    data.set("formType", "enterprise-enquiry");
    data.set("decisionToolResult", query.get("decision") || "");
    try {
      const res = await fetch("/", { method: "POST", body: data });
      if (!res.ok) {
        setMessage("Submission unavailable");
        setStatus("error");
        return;
      }
      document.dispatchEvent(
        new CustomEvent("ogoldy:lead_submitted", {
          detail: { id: "netlify-form" },
        }),
      );
      setStatus("success");
    } catch {
      setMessage("Submission unavailable");
      setStatus("error");
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
    <form className="estimate-form" name="ogoldy-enterprise-enquiry" method="POST" encType="multipart/form-data" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submit}>
      <input type="hidden" name="form-name" value="ogoldy-enterprise-enquiry" />
      <input type="hidden" name="landingPage" />
      <input type="hidden" name="sourcePage" />
      <input type="hidden" name="referrer" />
      <input type="hidden" name="utm_source" />
      <input type="hidden" name="utm_medium" />
      <input type="hidden" name="utm_campaign" />
      <input type="hidden" name="utm_content" />
      <input type="hidden" name="utm_term" />
      <input type="hidden" name="formType" value="enterprise-enquiry" />
      <input type="hidden" name="timestamp" />
      <input type="hidden" name="decisionToolResult" />
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
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
        <label>
          City / site location
          <input required name="location" maxLength={160} />
        </label>
        <label>
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
        </label>
        {assetType.toLowerCase().includes("relocation") && (
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
        <label className="wide">
          Approximate quantity or site size
          <input
            required
            name="quantity"
            maxLength={200}
            placeholder="For example: 450 workstations or 20,000 sq ft"
          />
        </label>
        <label className="wide">
          Notes
          <textarea
            required
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
            <small>PDF, Excel, Word or CSV. Up to 10 MB.</small>
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
            <small>JPG, PNG or WebP. Up to 5 files.</small>
          </span>
          <input
            type="file"
            name="photos"
            accept="image/jpeg,image/png,image/webp"
            multiple
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
      {status === "error" && (
        <p className="form-error" role="alert">
          {message}. Please retry or email growth@ogoldy.com.
        </p>
      )}
      <button
        className="button button-primary submit-button"
        disabled={status === "sending"}
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
