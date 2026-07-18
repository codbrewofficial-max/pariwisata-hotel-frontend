export interface SiteConfig {
  site_name: string;
  wa_number: string;
  address?: string;
  business_hours?: string;
  isPaid: boolean;
  value_props: string[];
}

export interface Item {
  title: string;
  slug: string;
  category: string;
  price?: number;
  summary: string;
  images: string[];
  body: string;
}

export interface ItemMeta {
  title: string;
  slug: string;
  category: string;
  price?: number;
  summary: string;
  images: string[];
}
