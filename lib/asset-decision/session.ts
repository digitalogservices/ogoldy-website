import { z } from "zod";
import { evaluateAssessment, inputSchema, type AssessmentInputs, type AssessmentResult } from "./model";

const key = "ogoldy_assessment_v2";
const draftKey = "ogoldy_assessment_draft_v2";
export const attributionSchema = z.object({
  source_page: z.string(), landing_page: z.string(), referrer: z.string(),
  utm_source: z.string(), utm_medium: z.string(), utm_campaign: z.string(), utm_content: z.string(), utm_term: z.string(),
});
export type Attribution = z.infer<typeof attributionSchema>;
export type Assessment = {
  tool_version: "2"; inputs: AssessmentInputs; result: AssessmentResult;
  unknown_flags: Record<string, boolean>; attribution: Attribution;
};
const savedSchema = z.object({ tool_version: z.literal("2"), inputs: inputSchema, attribution: attributionSchema });
let memory: Assessment | null = null;
export function storageRead(key: string): string {
  try { return sessionStorage.getItem(key) || ""; } catch { return ""; }
}
function storageWrite(key: string, value: string): boolean {
  try { sessionStorage.setItem(key, value); return true; } catch { return false; }
}
export function captureAttribution(): Attribution {
  const query = new URLSearchParams(window.location.search);
  let referrer = storageRead("ogoldy_referrer") || document.referrer;
  try { const url = new URL(referrer); referrer = `${url.origin}${url.pathname}`; } catch { referrer = ""; }
  const attribution = {
    source_page: "/asset-decision-tool",
    landing_page: storageRead("ogoldy_landing") || window.location.pathname,
    referrer,
    ...Object.fromEntries(["source", "medium", "campaign", "content", "term"].map(k => [`utm_${k}`, query.get(`utm_${k}`) || storageRead(`ogoldy_utm_${k}`)])),
  } as Attribution;
  // Functional enquiry attribution survives independently of analytics consent/tag loading.
  storageWrite("ogoldy_landing", attribution.landing_page);
  storageWrite("ogoldy_referrer", referrer);
  return attribution;
}
export function makeAssessment(inputs: AssessmentInputs, attribution: Attribution): Assessment {
  return { tool_version: "2", inputs, result: evaluateAssessment(inputs), attribution,
    unknown_flags: {
      ...Object.fromEntries(Object.entries(inputs).filter(([,v]) => typeof v === "object").map(([k,v]) => [k, (v as {state:string}).state === "unknown"])),
      condition: inputs.condition === "uncertain", reuseReadiness: inputs.reuseReadiness === "unknown",
    },
  };
}
export function saveAssessment(assessment: Assessment): boolean {
  memory = assessment;
  return storageWrite(key, JSON.stringify(assessment));
}
export function loadAssessment(): Assessment | null {
  try {
    const parsed = savedSchema.safeParse(JSON.parse(storageRead(key)));
    if (parsed.success) return makeAssessment(parsed.data.inputs, parsed.data.attribution);
  } catch { /* Invalid/old data cannot become an assessment. */ }
  return memory;
}
export function clearAssessment() {
  memory = null;
  try { sessionStorage.removeItem(key); } catch { /* Storage may be disabled. */ }
}
export function saveDraft(form: HTMLFormElement) {
  const draft = Object.fromEntries([...new FormData(form).entries()].filter(([,value]) => typeof value === "string"));
  storageWrite(draftKey, JSON.stringify(draft));
}
export function loadDraft(): Record<string,string> {
  try {
    const parsed = z.record(z.string()).safeParse(JSON.parse(storageRead(draftKey)));
    return parsed.success ? parsed.data : {};
  } catch { return {}; }
}
// Analytics boundary: only approved controlled fields; never spread an assessment/input.
export function toolEvent(event: "asset_decision_tool_started" | "asset_decision_tool_completed", result?: AssessmentResult) {
  return { event, tool_version: "2", ...(result ? { decision_result: result.decision, data_quality: result.data_quality } : {}) };
}
