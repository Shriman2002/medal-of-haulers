import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { CONTACT, SERVICE_AREAS } from "@/content/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { IS_PREVIEW, SITE_URL } from "@/lib/metadata";
import "./globals.css";

// Self-hosted at build time by next/font — no request to Google at runtime.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Medal of Haulers | Veteran-Owned Moving, Junk Removal & Donation Pickup",
    template: "%s | Medal of Haulers",
  },
  description:
    "Veteran-owned moving, junk removal, and donation pickup serving the DMV, Northern Virginia, and Richmond. Free estimates and upfront pricing.",
  // Keep the client-review deployment out of search results entirely.
  ...(IS_PREVIEW
    ? { robots: { index: false, follow: false, nocache: true } }
    : {}),
};

/**
 * Local-service structured data. This business lives on local search, so the
 * phone, service area, and price floors are worth stating machine-readably.
 */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: CONTACT.business,
  telephone: CONTACT.phone,
  email: CONTACT.email,
  url: SITE_URL,
  description:
    "Veteran-owned moving, junk removal, and donation pickup serving the DMV, Northern Virginia, and Richmond areas.",
  areaServed: SERVICE_AREAS.map((name) => ({ "@type": "Place", name })),
  sameAs: [CONTACT.instagram, CONTACT.facebook],
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <ScrollToTop />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <CtaBanner />
        <SiteFooter />
        <MobileActionBar />
      </body>
    </html>
  );
}
