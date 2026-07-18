import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GtmScript from "@/components/tracking/GtmScript";
import GtmNoScript from "@/components/tracking/GtmNoScript";
import Ga4Script from "@/components/tracking/Ga4Script";
import { getSiteConfig } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const { isPaid, site_name } = getSiteConfig();
  return {
    title: {
      default: site_name,
      template: `%s · ${site_name}`,
    },
    description: "Template website generik dari Lentera Pasar.",
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
  const meta = await generateMetadata();

  return (
    <html lang="id">
      <head>
        <title>{meta.title as string}</title>
        <meta name="description" content={meta.description as string} />
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
          <Header siteName={config.site_name} />
          <main className="flex-1">{children}</main>
          <Footer
            siteName={config.site_name}
            address={config.address}
            businessHours={config.business_hours}
            isPaid={config.isPaid}
          />
        </div>
      </body>
    </html>
  );
}
