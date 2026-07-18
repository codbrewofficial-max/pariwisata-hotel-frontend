import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import type {
  HotelInfo,
  RoomMeta,
  RoomType,
  SiteConfig,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const ROOMS_DIR = path.join(DATA_DIR, "rooms");
const HOTEL_INFO_FILE = path.join(DATA_DIR, "hotel-info.md");
const ITEMS_DIR = path.join(DATA_DIR, "items");

function readFileSafe(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

export function getSiteConfig(): SiteConfig {
  const raw = readFileSafe(path.join(DATA_DIR, "site-config.md"));
  const { data } = matter(raw);
  return {
    site_name: data.site_name ?? "Lentera Pasar",
    wa_number: data.wa_number ?? "",
    address: data.address,
    business_hours: data.business_hours,
    // Single source of truth for paid status, shared by SEO robots + Watermark.
    isPaid: Boolean(data.isPaid),
    value_props: Array.isArray(data.value_props) ? data.value_props : [],
    rating: typeof data.rating === "number" ? data.rating : undefined,
    reviews: typeof data.reviews === "number" ? data.reviews : undefined,
    maps_embed_url: data.maps_embed_url,
  };
}

function getRoomFilePaths(): string[] {
  if (!fs.existsSync(ROOMS_DIR)) return [];
  return fs
    .readdirSync(ROOMS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(ROOMS_DIR, f));
}

export function getAllRoomsMeta(): RoomMeta[] {
  return getRoomFilePaths().map((filePath) => {
    const { data } = matter(readFileSafe(filePath));
    const gallery = Array.isArray(data.gallery) ? data.gallery : [];
    const coverImage =
      typeof data.coverImage === "string" && data.coverImage.length > 0
        ? data.coverImage
        : gallery[0] ?? "";
    return {
      title: data.title ?? "Tanpa Judul",
      slug: data.slug ?? "",
      category: data.category ?? "Standard",
      capacity: Number(data.capacity) || 2,
      bedType: data.bedType ?? "",
      size: Number(data.size) || 0,
      price: Number(data.price) || 0,
      facilities: Array.isArray(data.facilities) ? data.facilities : [],
      featured: Boolean(data.featured),
      coverImage,
      unavailableDates: Array.isArray(data.unavailableDates)
        ? data.unavailableDates.map((d: string) => String(d))
        : [],
    };
  });
}

export function getFeaturedRooms(): RoomMeta[] {
  return getAllRoomsMeta().filter((room) => room.featured);
}

export function getRoomBySlug(slug: string): RoomType | null {
  const filePath = path.join(ROOMS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = matter(readFileSafe(filePath));
  const gallery = Array.isArray(data.gallery) ? data.gallery : [];
  const coverImage =
    typeof data.coverImage === "string" && data.coverImage.length > 0
      ? data.coverImage
      : gallery[0] ?? "";
  return {
    title: data.title ?? "Tanpa Judul",
    slug: data.slug ?? slug,
    category: data.category ?? "Standard",
    capacity: Number(data.capacity) || 2,
    bedType: data.bedType ?? "",
    size: Number(data.size) || 0,
    price: Number(data.price) || 0,
    facilities: Array.isArray(data.facilities) ? data.facilities : [],
    featured: Boolean(data.featured),
    coverImage,
    gallery,
    content,
    unavailableDates: Array.isArray(data.unavailableDates)
      ? data.unavailableDates.map((d: string) => String(d))
      : [],
  };
}

export function getAllRoomSlugs(): string[] {
  return getRoomFilePaths().map((filePath) => {
    const { data } = matter(readFileSafe(filePath));
    return data.slug ?? path.basename(filePath, ".md");
  });
}

export async function renderMarkdown(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown);
  return result.toString();
}

export function getHotelInfo(): HotelInfo {
  if (!fs.existsSync(HOTEL_INFO_FILE)) {
    return { facilities: [], landmarks: [], content: "" };
  }
  const { data, content } = matter(readFileSafe(HOTEL_INFO_FILE));
  return {
    facilities: Array.isArray(data.facilities) ? data.facilities : [],
    landmarks: Array.isArray(data.landmarks)
      ? data.landmarks.map((l: { name: string; distanceKm: number }) => ({
          name: l.name,
          distanceKm: Number(l.distanceKm) || 0,
        }))
      : [],
    content,
  };
}

// Kept for backward compatibility (legacy generic items listing).
export function getAllItemsMeta() {
  if (!fs.existsSync(ITEMS_DIR)) return [];
  return fs
    .readdirSync(ITEMS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data } = matter(readFileSafe(path.join(ITEMS_DIR, f)));
      return {
        title: data.title ?? "Tanpa Judul",
        slug: data.slug ?? "",
        category: data.category ?? "umum",
        price: data.price,
        summary: data.summary ?? "",
        images: Array.isArray(data.images) ? data.images : [],
      };
    });
}
