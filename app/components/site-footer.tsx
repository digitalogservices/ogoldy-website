import Link from "next/link";
import Image from "next/image";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <Image src="/ogoldy-wordmark.png" alt="OGOLDY" width={640} height={132} />
          </Link>
          <p>
            Enterprise asset transition, custody and liquidation across India.
          </p>
        </div>
        <div>
          <strong>Services</strong>
          <Link href="/services/office-dismantling-defitment">
            Office dismantling
          </Link>
          <Link href="/services/bare-shell-reinstatement">Bare shell</Link>
          <Link href="/services/scrap-disposal-purchase">Scrap disposal</Link>
          <Link href="/services/asset-buyback-liquidation">Asset buyback</Link>
        </div>
        <div>
          <strong>Company</strong>
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/case-studies">Case studies</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/asset-value-estimate">Value estimate</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
        <div>
          <strong>India-wide solutions</strong>
          <Link href="/solutions/office-asset-transition">Offices</Link>
          <Link href="/solutions/retail-store-asset-transition">Retail stores</Link>
          <Link href="/solutions/warehouse-asset-transition">Warehouses</Link>
          <Link href="/solutions/factory-industrial-asset-transition">Factories</Link>
          <Link href="/solutions/branch-network-asset-disposal">Branch networks</Link>
        </div>
        <div>
          <strong>Contact</strong>
          <Link href="mailto:growth@ogoldy.com">growth@ogoldy.com</Link>
          <Link href="tel:+918826207270">+91 88262 07270</Link>
          <a href="https://wa.me/918826207270" target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="https://www.linkedin.com/company/ogoldy" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="http://facebook.com/OgoldyIn" target="_blank" rel="noreferrer">Facebook</a>
          <p className="registered-office">
            Registered Office: Rajouri Garden, New Delhi
          </p>
        </div>
      </div>
      <div className="section-shell footer-bottom">
        <span>© {new Date().getFullYear()} Ogoldy Enterprises</span>
        <span>V9 staging preview · Noindex</span>
      </div>
      <a className="whatsapp-float" href="https://wa.me/918826207270?text=Hello%20Ogoldy%2C%20I%20want%20to%20discuss%20an%20enterprise%20asset%20requirement." target="_blank" rel="noreferrer" aria-label="Discuss a requirement on WhatsApp">WhatsApp</a>
    </footer>
  );
}
