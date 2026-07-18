import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import type { Item, ItemMeta, SiteConfig } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
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
  };
}

function getItemFilePaths(): string[] {
  if (!fs.existsSync(ITEMS_DIR)) return [];
  return fs
    .readdirSync(ITEMS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(ITEMS_DIR, f));
}

export function getAllItemsMeta(): ItemMeta[] {
  return getItemFilePaths().map((filePath) => {
    const { data } = matter(readFileSafe(filePath));
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

export function getItemBySlug(slug: string): Item | null {
  const filePath = path.join(ITEMS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = matter(readFileSafe(filePath));
  return {
    title: data.title ?? "Tanpa Judul",
    slug: data.slug ?? slug,
    category: data.category ?? "umum",
    price: data.price,
    summary: data.summary ?? "",
    images: Array.isArray(data.images) ? data.images : [],
    body: content,
  };
}

export async function renderMarkdown(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown);
  return result.toString();
}

export function getItemsByCategory(category: string): ItemMeta[] {
  return getAllItemsMeta().filter((item) => item.category === category);
}

export function getAllCategories(): string[] {
  const cats = new Set(getAllItemsMeta().map((i) => i.category));
  return Array.from(cats);
}
