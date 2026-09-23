import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "../data/services";
export function ServiceGrid({ limit }: { limit?: number }) {
  return (
    <div className="service-grid">
      {services.slice(0, limit).map((s, i) => (
        <Link
          href={`/services/${s.slug}`}
          className="service-card"
          key={s.slug}
        >
          <span>{String(i + 1).padStart(2, "0")}</span>
          <h3>{s.title}</h3>
          <p>{s.short}</p>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}
