import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import type { RoomMeta } from "@/lib/types";

type Status = "available" | "limited" | "full";

function statusForMonth(
  unavailableDates: string[],
  year: number,
  month: number,
): Status {
  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  const count = unavailableDates.filter((d) => d.startsWith(prefix)).length;
  if (count > 6) return "full";
  if (count >= 3) return "limited";
  return "available";
}

const STATUS_BADGE: Record<Status, { label: string; className: string }> = {
  available: {
    label: "Tersedia",
    className: "bg-teal-soft text-teal-dark",
  },
  limited: {
    label: "Terbatas",
    className: "bg-coral/10 text-coral-dark",
  },
  full: {
    label: "Penuh Bulan Ini",
    className: "bg-red-50 text-red-600",
  },
};

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export default function AvailabilitySummaryList({
  rooms,
}: {
  rooms: RoomMeta[];
}) {
  const now = new Date();
  const currentLabel = `${MONTHS[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <div>
      <p className="mb-4 text-sm text-ink-soft">
        Status ketersediaan untuk bulan{" "}
        <span className="font-medium text-ink">{currentLabel}</span> (indikatif).
      </p>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {rooms.map((room) => {
          const status = statusForMonth(
            room.unavailableDates,
            now.getFullYear(),
            now.getMonth(),
          );
          const badge = STATUS_BADGE[status];
          return (
            <li
              key={room.slug}
              className="flex items-center justify-between gap-3 rounded-xl border border-sand-100 bg-surface px-4 py-3 shadow-soft"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">
                  {room.title}
                </p>
                <p className="text-xs text-ink-muted">
                  {room.capacity} tamu ·{" "}
                  {formatCurrency(room.price)}/malam
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${badge.className}`}
                >
                  {badge.label}
                </span>
                <Link
                  href={`/kamar/${room.slug}`}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-teal hover:bg-teal-soft"
                >
                  Detail →
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-xs text-ink-muted">
        Ketersediaan bersifat indikatif, konfirmasi final melalui WhatsApp.
      </p>
    </div>
  );
}
