"use client";

import { useState } from "react";

interface AvailabilityCalendarProps {
  unavailableDates: string[];
  selectedDate?: string;
  onSelectDate?: (date: string) => void;
}

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];
const DOW = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

function toISO(year: number, month: number, day: number): string {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

export default function AvailabilityCalendar({
  unavailableDates,
  selectedDate,
  onSelectDate,
}: AvailabilityCalendarProps) {
  const today = new Date();
  const [view, setView] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const unavailable = new Set(unavailableDates);
  const firstDay = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

  const todayISO = today.toISOString().split("T")[0];

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const goPrev = () => {
    setView((v) =>
      v.month === 0
        ? { year: v.year - 1, month: 11 }
        : { year: v.year, month: v.month - 1 },
    );
  };
  const goNext = () => {
    setView((v) =>
      v.month === 11
        ? { year: v.year + 1, month: 0 }
        : { year: v.year, month: v.month + 1 },
    );
  };

  return (
    <div className="card-surface p-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Bulan sebelumnya"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft hover:bg-sand-100"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <p className="font-serif text-base font-semibold text-ink">
          {MONTHS[view.month]} {view.year}
        </p>
        <button
          type="button"
          onClick={goNext}
          aria-label="Bulan berikutnya"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft hover:bg-sand-100"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {DOW.map((d) => (
          <div key={d} className="py-1 text-xs font-medium text-ink-muted">
            {d}
          </div>
        ))}
        {cells.map((day, idx) => {
          if (day === null) return <div key={`e${idx}`} />;
          const iso = toISO(view.year, view.month, day);
          const isUnavailable = unavailable.has(iso);
          const isPast = iso < todayISO;
          const isDisabled = isUnavailable || isPast;
          const isSelected = selectedDate === iso;

          if (isDisabled) {
            return (
              <div
                key={iso}
                aria-disabled="true"
                className={`relative flex h-9 items-center justify-center rounded-lg text-sm text-ink-muted line-through opacity-50 ${
                  isUnavailable ? "bg-sand-100" : ""
                }`}
                title={isUnavailable ? "Tidak tersedia" : "Tanggal sudah lewat"}
              >
                {day}
              </div>
            );
          }

          return (
            <button
              key={iso}
              type="button"
              onClick={() => onSelectDate?.(iso)}
              className={`flex h-9 items-center justify-center rounded-lg text-sm font-medium transition ${
                isSelected
                  ? "bg-teal text-white"
                  : "text-ink hover:bg-teal-soft"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-soft">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded bg-teal" /> Terpilih
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded bg-sand-100" /> Tidak tersedia
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded border border-sand-200" /> Tersedia
        </span>
      </div>

      <p className="mt-3 text-xs text-ink-muted">
        Ketersediaan bersifat indikatif, konfirmasi final melalui WhatsApp.
      </p>
    </div>
  );
}
