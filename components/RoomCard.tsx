import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import type { RoomMeta } from "@/lib/types";

const CATEGORY_BADGE: Record<string, string> = {
  Standard: "bg-sand-100 text-ink-soft",
  Deluxe: "bg-teal-soft text-teal-dark",
  Suite: "bg-teal text-white",
  Family: "bg-coral/10 text-coral-dark",
};

export default function RoomCard({ room }: { room: RoomMeta }) {
  return (
    <Link
      href={`/kamar/${room.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-sand-100 bg-surface shadow-card transition hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={room.coverImage}
          alt={room.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${
            CATEGORY_BADGE[room.category] ?? "bg-sand-100 text-ink-soft"
          }`}
        >
          {room.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-semibold text-ink">
          {room.title}
        </h3>
        <p className="mt-1 text-sm text-ink-muted">
          {room.bedType} · {room.size} m² · {room.capacity} tamu
        </p>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs text-ink-muted">mulai dari</p>
            <p className="font-serif text-lg font-semibold text-teal-dark">
              {formatCurrency(room.price)}
              <span className="text-xs font-normal text-ink-muted"> /malam</span>
            </p>
          </div>
          <span className="rounded-lg bg-sand-50 px-3 py-1.5 text-sm font-medium text-teal group-hover:bg-teal group-hover:text-white">
            Lihat →
          </span>
        </div>
      </div>
    </Link>
  );
}
