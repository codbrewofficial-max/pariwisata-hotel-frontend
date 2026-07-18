import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GtmScript from "@/components/tracking/GtmScript";
import GtmNoScript from "@/components/tracking/GtmNoScript";
import Ga4Script from "@/components/tracking/Ga4Script";
import { getSiteConfig } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const NAV = [
  { label: "Beranda", href: "/" },
  { label: "Tipe Kamar", href: "/kamar" },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Tentang & Lokasi", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
];

export async function generateMetadata(): Promise<Metadata> {
  const { isPaid, site_name } = getSiteConfig();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: site_name,
      template: `%s · ${site_name}`,
    },
    description:
      "Penginapan tenang dan nyaman dengan pelayanan ramah. Cek ketersediaan kamar dengan mudah.",
    robots: {
      index: isPaid,
      follow: isPaid,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = getSiteConfig();

  // Pitching page only visible before the site is sold (isPaid === false),
  // same principle as the watermark. Nav link follows this rule.
  const nav = config.isPaid
    ? NAV
    : [...NAV, { label: "Kenapa Website Ini?", href: "/kenapa-pakai-website-ini" }];

  return (
    <html lang="id" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <meta
          name="robots"
          content={config.isPaid ? "index, follow" : "noindex, nofollow"}
        />
        <GtmScript />
        <Ga4Script />
      </head>
      <body>
        <GtmNoScript />
        <div className="flex min-h-screen flex-col">
          <Header siteName={config.site_name} nav={nav} />
          <main className="flex-1">{children}</main>
          <Footer
            siteName={config.site_name}
            address={config.address}
            businessHours={config.business_hours}
            waNumber={config.wa_number}
            isPaid={config.isPaid}
          />
        </div>
      </body>
    </html>
  );
}
