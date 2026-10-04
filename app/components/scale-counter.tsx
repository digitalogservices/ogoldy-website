"use client";
import { useEffect, useRef } from "react";
export function ScaleCounter() {
  const section = useRef<HTMLElement>(null);
  const number = useRef<HTMLElement>(null);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !section.current || !number.current || !window.IntersectionObserver) return;
    let frame = 0, started = false;
    const final = () => { cancelAnimationFrame(frame); if (number.current) number.current.textContent = "1,138,000+"; };
    const observer = new IntersectionObserver(entries => {
      if (started || !entries.some(e => e.isIntersecting)) return;
      started = true; observer.disconnect();
      if (motion.matches) { final(); return; }
      const start = performance.now();
      const tick = (now: number) => {
        if (motion.matches) { final(); return; }
        const progress = Math.min((now - start) / 1350, 1);
        if (number.current) number.current.textContent = `${Math.round(1138000 * (1 - Math.pow(1 - progress, 3))).toLocaleString("en-US")}+`;
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      if (number.current) number.current.textContent = "0";
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.2 });
    observer.observe(section.current);
    const changed = () => { if (motion.matches) final(); };
    motion.addEventListener("change", changed);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); motion.removeEventListener("change", changed); };
  }, []);
  return <section ref={section} className="scale-counter" aria-label="Selected executed project scale"><div className="section-shell"><strong><span className="sr-only">1,138,000+</span><span ref={number} className="scale-number" aria-hidden="true">1,138,000+</span></strong><p>sq ft across selected executed enterprise projects</p></div></section>;
}
