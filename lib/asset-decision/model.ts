import { z } from "zod";
import { decisionRules } from "./rules";

export const numericSchema = z.discriminatedUnion("state", [
  z.object({ state: z.literal("known"), value: z.number().finite().nonnegative() }),
  z.object({ state: z.literal("unknown"), value: z.null() }),
]);
export type Numeric = z.infer<typeof numericSchema>;
export const unknown: Numeric = { state: "unknown", value: null };
export function parseNumeric(raw: string, notSure = false): Numeric {
  if (notSure || raw.trim() === "") return { ...unknown };
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) throw new Error("Enter a non-negative number or choose Unknown / not sure.");
  return { state: "known", value };
}
export const conditions = {
  usable: "Usable as-is",
  repairable: "Usable with repair or testing",
  uncertain: "Condition uncertain — inspection needed",
  end_of_life: "End-of-life or unsafe",
} as const;
export const readiness = {
  identified: "Identified internal use",
  likely: "Likely but unconfirmed",
  none: "No identified use",
  unknown: "Unknown",
} as const;
export const numericLabels = {
  reuseHorizon: "Reuse horizon (months)",
  replacementValue: "Replacement value (₹)",
  storageCost: "Monthly storage / custody cost (₹)",
  redeploymentCost: "Transport / redeployment cost (₹)",
  resaleEstimate: "Resale estimate (₹)",
  scrapEstimate: "Scrap estimate (₹)",
} as const;
export type FinancialKey = keyof typeof numericLabels;
export const inputSchema = z.object({
  asset: z.string().max(160), quantity: numericSchema, age: numericSchema,
  location: z.string().max(160),
  condition: z.enum(["usable", "repairable", "uncertain", "end_of_life"]),
  reuseReadiness: z.enum(["identified", "likely", "none", "unknown"]),
  reuseHorizon: numericSchema, replacementValue: numericSchema, storageCost: numericSchema,
  redeploymentCost: numericSchema, resaleEstimate: numericSchema, scrapEstimate: numericSchema,
});
export type AssessmentInputs = z.infer<typeof inputSchema>;
export const recommendationLabels = {
  redeploy: "Redeploy internally",
  hold: "Hold temporarily",
  sell: "Sell or liquidate",
  scrap: "Recycle or scrap",
  insufficient_information: "Insufficient information — review required",
} as const;
export type Decision = keyof typeof recommendationLabels;
export type DataQuality = "complete" | "partial" | "review_required";
export const qualityLabels: Record<DataQuality, string> = {
  complete: "Decision inputs supplied; unverified",
  partial: "Some information missing or unconfirmed",
  review_required: "Decision-critical information needs review",
};
export const disclaimer = "Preliminary asset disposition assessment: rule-based guidance from your information. This is not a valuation, engineering certification or guaranteed commercial outcome. Ogoldy must validate condition, internal use and commercial assumptions before action.";
export function displayNumeric(n: Numeric, currency = false): string {
  return n.state === "unknown" ? "Unknown / not sure" : `${currency ? "₹" : ""}${n.value.toLocaleString("en-IN")}`;
}
export type AssessmentResult = {
  decision: Decision; recommendation: string; data_quality: DataQuality;
  rule: string; reasons: string[]; economics: string[]; missing: string[];
  couldChange: string[]; assumptions: string[];
};

export function evaluateAssessment(input: AssessmentInputs, rules = decisionRules): AssessmentResult {
  const i = inputSchema.parse(input);
  const value = (key: FinancialKey) => i[key].value;
  const horizon = value("reuseHorizon"), replacement = value("replacementValue"), move = value("redeploymentCost"), storage = value("storageCost"), resale = value("resaleEstimate"), scrap = value("scrapEstimate");
  const missing = Object.entries(numericLabels).filter(([key]) => i[key as FinancialKey].state === "unknown").map(([, label]) => `${label}: unknown / not sure`);
  if (i.condition === "uncertain") missing.push("Condition: inspection needed");
  if (i.condition === "repairable") missing.push("Repair/testing scope and suitability for reuse are unverified");
  if (i.reuseReadiness === "likely") missing.push("Internal use: likely but not confirmed");
  if (i.reuseReadiness === "unknown") missing.push("Internal use: unknown");
  const economics = Object.entries(numericLabels).filter(([key]) => key !== "reuseHorizon").map(([key, label]) => `${label}: ${displayNumeric(i[key as FinancialKey], true)}`);
  const assumptions = [
    "All amounts are user-supplied estimates for the same assessed assets; no values have been invented or independently verified.",
    "Age, quantity and location provide enquiry context; they do not adjust the decision or estimates.",
    `Guidance windows: redeploy within ${rules.maxRedeployHorizonMonths} months; temporary hold within ${rules.maxTemporaryHoldMonths} months. These are configurable operating guidance, not industry benchmarks.`,
  ];
  function result(decision: Decision, rule: string, reasons: string[], couldChange: string[]): AssessmentResult {
    return { decision, recommendation: recommendationLabels[decision], rule,
      data_quality: decision === "insufficient_information" ? "review_required" : missing.length ? "partial" : "complete",
      reasons, economics, missing, couldChange, assumptions };
  }
  // 1. Safety overrides every economic branch, including attractive holding or resale.
  if (i.condition === "end_of_life") return result("scrap", "safety_gate", [
    "You marked the assets end-of-life or unsafe; internal redeployment and ordinary resale are excluded.",
    "Safety takes precedence over storage cost, reuse timing and estimated recoveries. Validate the authorised disposal route before action.",
  ], ["A competent inspection establishes that the assets are safe and reusable.", "Material classification and disposal requirements confirm the appropriate recovery route."]);
  // 2. Unknown/repairable condition is never an automatic scrap instruction.
  if (i.condition !== "usable") return result("insufficient_information", "condition_review", [
    conditions[i.condition],
    "Inspection or testing must establish safe, usable condition before choosing reuse, sale or recycling.",
  ], ["Inspection confirms safe usable condition.", "Repair/testing scope and internal demand are confirmed."]);
  const credibleUse = i.reuseReadiness === "identified";
  // 3. Redeploy requires condition + identified demand + timing + known movement economics.
  if (credibleUse && horizon !== null && horizon <= rules.maxRedeployHorizonMonths && replacement !== null && move !== null && (!rules.requireMovementBelowReplacement || move < replacement)) {
    economics.push(`Stated movement (${displayNumeric(i.redeploymentCost, true)}) is below replacement (${displayNumeric(i.replacementValue, true)}).`);
    return result("redeploy", "redeployment_economics", [
      "Assets are stated to be usable as-is and have an identified internal use.",
      `Expected reuse is in ${horizon} months, within the configured redeployment window.`,
      "Known movement cost is below known replacement value; confirm receiving-site readiness before execution.",
    ], ["Receiving use is withdrawn or delayed.", "Verified condition, movement costs or replacement requirements differ from the estimates."]);
  }
  // 4. Preserve V1 holding arithmetic for rule evaluation; no new B comparison feature.
  if (credibleUse && horizon !== null && horizon > 0 && horizon <= rules.maxTemporaryHoldMonths && replacement !== null && storage !== null && move !== null) {
    const holding = storage * horizon;
    economics.push(`Holding rule: ${displayNumeric(i.storageCost, true)} per month × ${horizon} months + ${displayNumeric(i.redeploymentCost, true)} movement compared with ${displayNumeric(i.replacementValue, true)} replacement.`);
    if (!rules.requireHoldingAndMovementBelowReplacement || holding + move < replacement) return result("hold", "holding_economics", [
      "Assets are usable as-is with an identified internal use, but immediate redeployment has not been selected.",
      "The stated reuse horizon is within the temporary holding window.",
      "Known holding plus movement costs are below known replacement value; holding is temporary and needs a confirmed review date.",
    ], ["The reuse date or internal use changes.", "Custody or movement costs increase, or replacement value falls."]);
  }
  // 5. Disposal economics only where internal reuse is not credible, distant or uneconomic.
  const uneconomic = credibleUse && replacement !== null && move !== null && (horizon === 0 ? move >= replacement : horizon !== null && storage !== null && storage * horizon + move >= replacement);
  const disposalEligible = !credibleUse || (horizon !== null && horizon > rules.maxTemporaryHoldMonths) || uneconomic;
  if (disposalEligible && resale !== null && scrap !== null && resale !== scrap) {
    // Repairable/uncertain has already returned review, so this cannot auto-scrap them.
    const sell = resale > scrap;
    return result(sell ? "sell" : "scrap", "recovery_comparison", [
      !credibleUse ? "No confirmed internal use supports redeployment." : uneconomic ? "Known reuse costs do not support retention against replacement." : "Expected reuse is outside the temporary holding window.",
      `Both recovery estimates are known; the ${sell ? "resale" : "scrap"} estimate is higher. This is a comparison of supplied estimates, not a valuation.`,
      sell ? "Validate buyer demand, condition and sale terms before disposal." : "Confirm that resale/reuse options have been checked and the disposal route is appropriate before recycling usable assets.",
    ], ["An internal receiving use is confirmed with suitable timing and economics.", "Inspection, buyer demand, fees or verified recovery estimates change the comparison."]);
  }
  // 6. Missing/conflicting evidence is explicit, independently of data quality.
  return result("insufficient_information", "insufficient_evidence", [
    credibleUse ? "An internal use is identified, but known timing and economics do not yet justify redeployment or temporary holding." : "Internal use is absent or unconfirmed, so timing and movement costs alone cannot justify redeployment.",
    resale !== null && scrap !== null && resale === scrap ? "The stated resale and scrap estimates are equal; neither recovery route has a clear economic advantage." : "The available recovery estimates or reuse evidence do not establish a supported next action.",
  ], ["Confirm condition, internal use and the expected reuse date.", "Supply or verify missing financial estimates and comparable sale/recycling terms."]);
}
