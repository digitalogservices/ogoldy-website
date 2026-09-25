import type { Metadata } from "next";
import "./globals.css";
import "./brand.css";
import "./v5.css";
import "./v6.css";
import "./v9.css";
import { Analytics } from "./components/analytics";
import { headers } from "next/headers";
import Script from "next/script";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host")?.toLowerCase().split(":")[0];
  const indexable = host === "www.ogoldy.com" && process.env.OGOLDY_INDEXATION_APPROVED === "true";
  return {
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
}

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
        <Script id="ogoldy-gtm" strategy="beforeInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-K9522SR8');`}</Script>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K9522SR8" height="0" width="0" style={{display:"none",visibility:"hidden"}} title="Google Tag Manager" /></noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(identitySchema) }} />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
