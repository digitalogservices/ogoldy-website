import type { Metadata } from "next";
import "./globals.css";
import "./brand.css";
import "./v5.css";
import "./v6.css";
import "./v9.css";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ogoldy.com"),
  title: "Ogoldy | Enterprise Asset Transition, Custody & Liquidation",
  description:
    "Pan-India dismantling, de-fitment, asset movement, custody, redeployment, scrap purchase and enterprise liquidation.",
  applicationName: "Ogoldy",
  alternates: { canonical: "/" },
  robots: { index: false, follow: false, noarchive: true },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body className="antialiased">
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K9522SR8" height="0" width="0" style={{display:"none",visibility:"hidden"}} title="Google Tag Manager" /></noscript>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
