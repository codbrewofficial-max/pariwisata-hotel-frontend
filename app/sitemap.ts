import type { MetadataRoute } from "next";
import { getSiteConfig, getAllRoomSlugs } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const slugs = getAllRoomSlugs();

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/kamar`, lastModified: new Date() },
    { url: `${baseUrl}/fasilitas`, lastModified: new Date() },
    { url: `${baseUrl}/tentang`, lastModified: new Date() },
    { url: `${baseUrl}/kontak`, lastModified: new Date() },
  ];

  const roomRoutes = slugs.map((slug) => ({
    url: `${baseUrl}/kamar/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...roomRoutes];
}
