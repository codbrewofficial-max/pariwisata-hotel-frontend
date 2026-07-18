import type { SVGProps } from "react";

export type FacilityIconName =
  | "star"
  | "wifi"
  | "pool"
  | "restaurant"
  | "ac"
  | "tv"
  | "coffee"
  | "parking"
  | "shower"
  | "breakfast"
  | "spa"
  | "clock"
  | "bed"
  | "desk"
  | "fridge"
  | "gym";

const PATHS: Record<FacilityIconName, JSX.Element> = {
  star: <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" />,
  wifi: <path d="M12 18h.01M8.5 14.5a5 5 0 017 0M5 11a10 10 0 0114 0M2 7.5a15 15 0 0120 0" />,
  pool: <path d="M2 16c2 0 2 1.5 4 1.5S10 16 12 16s2 1.5 4 1.5S20 16 22 16M2 20c2 0 2 1.5 4 1.5S10 20 12 20s2 1.5 4 1.5S20 20 22 20M7 14V5a2 2 0 014 0M14 14V5a2 2 0 014 0" />,
  restaurant: <path d="M3 3v8a3 3 0 006 0V3M6 3v18M15 3c-1.5 0-3 2-3 5s1.5 4 3 4v9" />,
  ac: <path d="M3 5h18v9a4 4 0 01-4 4H7a4 4 0 01-4-4zM7 13h.01M11 13h.01M15 13h.01" />,
  tv: <path d="M3 5h18v12H3zM8 21h8" />,
  coffee: <path d="M4 8h13v5a4 4 0 01-4 4H8a4 4 0 01-4-4zM17 9h2a2 2 0 010 4h-2M6 2v2M10 2v2M14 2v2" />,
  parking: <path d="M5 3h14v18H5zM9 17V7h3.5a3 3 0 010 6H9" />,
  shower: <path d="M5 13V6a2 2 0 014 0M5 13h4M9 13a4 4 0 008 0M13 17v.01M15 19v.01M11 21v.01" />,
  breakfast: <path d="M4 8h13v4a4 4 0 01-4 4H8a4 4 0 01-4-4zM17 9h2a2 2 0 010 4h-2M7 3v2M11 3v2" />,
  spa: <path d="M12 21c-4-3-7-6-7-10a4 4 0 018-1 4 4 0 018 1c0 4-3 7-7 10M12 21V9" />,
  clock: <path d="M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  bed: <path d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6M3 14h18M3 18v2M21 18v2M7 10V8a1 1 0 011-1h2a1 1 0 011 1v2" />,
  desk: <path d="M3 7h18M4 7v12M20 7v12M4 12h16" />,
  fridge: <path d="M7 3h10v18H7zM7 12h10M10 7v2M10 16v2" />,
  gym: <path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" />,
};

export default function FacilityIcon({
  name,
  ...props
}: { name: FacilityIconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0 text-teal"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {PATHS[name] ?? PATHS.star}
    </svg>
  );
}
