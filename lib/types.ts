export type RoomCategory = "Standard" | "Deluxe" | "Suite" | "Family";

export interface RoomType {
  title: string;
  slug: string;
  category: RoomCategory;
  capacity: number;
  bedType: string;
  size: number;
  price: number;
  facilities: string[];
  featured: boolean;
  coverImage: string;
  gallery: string[];
  content: string;
  unavailableDates: string[];
}

export interface RoomMeta {
  title: string;
  slug: string;
  category: RoomCategory;
  capacity: number;
  bedType: string;
  size: number;
  price: number;
  facilities: string[];
  featured: boolean;
  coverImage: string;
  unavailableDates: string[];
}

export interface Landmark {
  name: string;
  distanceKm: number;
}

export interface HotelInfo {
  facilities: string[];
  landmarks: Landmark[];
  content: string;
}

export interface SiteConfig {
  site_name: string;
  wa_number: string;
  address?: string;
  business_hours?: string;
  isPaid: boolean;
  value_props: string[];
  rating?: number;
  reviews?: number;
  maps_embed_url?: string;
}
