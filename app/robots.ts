import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  const { isPaid } = getSiteConfig();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  return {
    rules: {
      userAgent: "*",
      allow: isPaid ? "/" : "",
      disallow: isPaid ? "" : "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
