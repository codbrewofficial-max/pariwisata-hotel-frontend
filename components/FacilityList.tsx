import FacilityIcon, { type FacilityIconName } from "@/lib/facility-icons";

interface FacilityListProps {
  facilities: string[];
  columns?: 2 | 3 | 4;
  icon?: FacilityIconName;
}

export default function FacilityList({
  facilities,
  columns = 3,
  icon = "star",
}: FacilityListProps) {
  if (facilities.length === 0) {
    return <p className="text-sm text-ink-muted">Belum ada fasilitas.</p>;
  }

  const colClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <ul className={`grid grid-cols-1 gap-3 ${colClass}`}>
      {facilities.map((f, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-xl border border-sand-100 bg-surface px-4 py-3 shadow-soft"
        >
          <FacilityIcon name={icon} />
          <span className="text-sm text-ink-soft">{f}</span>
        </li>
      ))}
    </ul>
  );
}
