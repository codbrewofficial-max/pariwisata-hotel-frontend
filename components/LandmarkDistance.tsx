import type { Landmark } from "@/lib/types";

export default function LandmarkDistance({
  landmarks,
}: {
  landmarks: Landmark[];
}) {
  if (landmarks.length === 0) {
    return <p className="text-sm text-ink-muted">Belum ada data lokasi.</p>;
  }

  const sorted = [...landmarks].sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {sorted.map((l, i) => (
        <li
          key={i}
          className="flex items-center justify-between rounded-xl border border-sand-100 bg-surface px-4 py-3 shadow-soft"
        >
          <span className="text-sm font-medium text-ink">{l.name}</span>
          <span className="text-sm text-teal">{l.distanceKm} km</span>
        </li>
      ))}
    </ul>
  );
}
