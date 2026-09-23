const stages = [
  "Capture",
  "Move",
  "Reuse",
  "Redeploy",
  "Recover",
  "Liquidate / recycle",
];
export function AssetOrbit({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={compact ? "asset-orbit compact" : "asset-orbit"}
      role="img"
      aria-label="Ogoldy asset lifecycle: capture, move, reuse, redeploy, recover, liquidate or recycle"
    >
      <div className="orbit-core">O</div>
      {stages.map((stage, index) => (
        <div className={`orbit-stage orbit-stage-${index + 1}`} key={stage}>
          <i aria-hidden="true" />
          <span>{stage}</span>
        </div>
      ))}
      <div className="orbit-line orbit-line-one" />
      <div className="orbit-line orbit-line-two" />
    </div>
  );
}
