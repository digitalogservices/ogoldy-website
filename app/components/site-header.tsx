"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" href="/" aria-label="Ogoldy home">
          <Image src="/ogoldy-wordmark.png" alt="OGOLDY" width={640} height={132} priority />
        </Link>
        <button
          className="menu-button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          className={open ? "main-nav open" : "main-nav"}
          aria-label="Main navigation"
        >
          <Link href="/services" onClick={() => setOpen(false)}>
            Services
          </Link>
          <Link href="/projects" onClick={() => setOpen(false)}>Projects</Link>
          <Link href="/case-studies" onClick={() => setOpen(false)}>
            Case Studies
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
          <Link
            className="nav-cta"
            href="/asset-value-estimate"
            onClick={() => setOpen(false)}
          >
            Get value estimate
          </Link>
        </nav>
      </div>
    </header>
  );
}
