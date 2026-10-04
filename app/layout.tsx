import type { Metadata } from "next";
import "./globals.css";
import "./brand.css";
import "./v5.css";
import "./v6.css";
import "./v9.css";
import { Analytics } from "./components/analytics";
import { PrivacyConsent } from "./components/privacy-consent";
import Script from "next/script";

const indexable = process.env.OGOLDY_INDEXATION_APPROVED === "true";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ogoldy.com"),
  title: "Ogoldy | Enterprise Asset Transition, Custody & Liquidation",
  description:
    "Pan-India dismantling, de-fitment, asset movement, custody, redeployment, scrap purchase and enterprise liquidation.",
  applicationName: "Ogoldy",
  alternates: { canonical: "/" },
  robots: { index: indexable, follow: indexable, noarchive: !indexable },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Ogoldy",
    title: "Ogoldy | Enterprise Asset Transition",
    description:
      "Survey, dismantle, move, hold, redeploy and liquidate enterprise assets across India.",
    images: [{ url: "/ogoldy-wordmark.png", alt: "Ogoldy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ogoldy | Enterprise Asset Transition",
    description:
      "Survey, dismantle, move, hold, redeploy and liquidate enterprise assets across India.",
    images: ["/ogoldy-wordmark.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const identitySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.ogoldy.com/#organization",
      name: "Ogoldy",
      url: "https://www.ogoldy.com/",
      logo: "https://www.ogoldy.com/ogoldy-wordmark.png",
      email: "growth@ogoldy.com",
      telephone: "+91 8826207270",
      areaServed: { "@type": "Country", name: "India" },
      sameAs: ["http://facebook.com/OgoldyIn", "https://www.linkedin.com/company/ogoldy"],
      founder: { "@id": "https://www.ogoldy.com/#founder" },
    },
    {
      "@type": "Person",
      "@id": "https://www.ogoldy.com/#founder",
      name: "Siddharth Gulati",
      jobTitle: "Founder",
      worksFor: { "@id": "https://www.ogoldy.com/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body className="antialiased">
        <Script id="ogoldy-consent-default" strategy="beforeInteractive">{`window.dataLayer=window.dataLayer||[];window.ogoldyAnalyticsAllowed=false;window['ga-disable-G-193MG85HSP']=true;(function(){window.dataLayer.push(arguments);})('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});`}</Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(identitySchema) }} />
        <Analytics />
        <PrivacyConsent />
        {children}
      </body>
    </html>
  );
}
