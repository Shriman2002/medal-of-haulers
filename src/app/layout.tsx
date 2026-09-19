import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { IS_PREVIEW, SITE_URL } from "@/lib/metadata";
import { businessJsonLd } from "@/lib/schema";
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
            __html: JSON.stringify(businessJsonLd),
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
