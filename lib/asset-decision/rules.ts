export type DecisionRules = {
  version: string;
  maxRedeployHorizonMonths: number;
  maxTemporaryHoldMonths: number;
  requireMovementBelowReplacement: boolean;
  requireHoldingAndMovementBelowReplacement: boolean;
};
// Guidance settings, not calibrated industry benchmarks. Priority B/C refinement is deferred.
export const decisionRules: DecisionRules = {
  version: "2",
  maxRedeployHorizonMonths: 6,
  maxTemporaryHoldMonths: 12,
  // Both comparisons require known values; no default amounts or percentage shortcut.
  requireMovementBelowReplacement: true,
  requireHoldingAndMovementBelowReplacement: true,
};
