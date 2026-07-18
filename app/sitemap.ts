import type { MetadataRoute } from "next";
import { getSiteConfig, getAllItemsMeta } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const items = getAllItemsMeta();

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/contoh`, lastModified: new Date() },
  ];

  const itemRoutes = items.map((item) => ({
    url: `${baseUrl}/${item.category}/${item.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...itemRoutes];
}
