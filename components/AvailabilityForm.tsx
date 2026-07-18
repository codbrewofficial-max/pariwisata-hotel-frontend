"use client";

import { useState } from "react";
import { buildWaLink } from "@/lib/utils";

interface AvailabilityFormProps {
  waNumber: string;
  roomTitle?: string;
  variant?: "card" | "plain";
  checkIn?: string;
  onCheckInChange?: (value: string) => void;
}

function formatDate(value: string): string {
  if (!value) return "";
  const d = new Date(value + "T00:00:00");
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AvailabilityForm({
  waNumber,
  roomTitle,
  variant = "card",
  checkIn: controlledCheckIn,
  onCheckInChange,
}: AvailabilityFormProps) {
  const [internalCheckIn, setInternalCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [error, setError] = useState("");

  const isControlled = controlledCheckIn !== undefined;
  const checkIn = isControlled ? controlledCheckIn : internalCheckIn;
  const setCheckIn = (value: string) => {
    if (isControlled) onCheckInChange?.(value);
    else setInternalCheckIn(value);
  };

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      setError("Mohon lengkapi tanggal check-in dan check-out.");
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError("Tanggal check-out harus setelah check-in.");
      return;
    }
    setError("");

    const roomPart = roomTitle
      ? `kamar ${roomTitle}`
      : "kamar di hotel Anda";
    const message =
      `Halo, saya ingin cek ketersediaan ${roomPart} untuk ` +
      `check-in ${formatDate(checkIn)} - check-out ${formatDate(checkOut)}, ` +
      `${guestCount} tamu. Apakah tersedia?`;

    window.open(
      buildWaLink(waNumber, message),
      "_blank",
      "noopener,noreferrer",
    );
  };

  const inner = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            className="block text-sm font-medium text-ink-soft"
            htmlFor="av-checkin"
          >
            Check-in
          </label>
          <input
            id="av-checkin"
            type="date"
            min={today}
            required
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-1 w-full rounded-xl border border-sand-200 bg-surface px-3 py-2.5 text-sm text-ink focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-ink-soft"
            htmlFor="av-checkout"
          >
            Check-out
          </label>
          <input
            id="av-checkout"
            type="date"
            min={checkIn || today}
            required
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 w-full rounded-xl border border-sand-200 bg-surface px-3 py-2.5 text-sm text-ink focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
          />
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-medium text-ink-soft"
          htmlFor="av-guests"
        >
          Jumlah tamu
        </label>
        <select
          id="av-guests"
          value={guestCount}
          onChange={(e) => setGuestCount(Number(e.target.value))}
          className="mt-1 w-full rounded-xl border border-sand-200 bg-surface px-3 py-2.5 text-sm text-ink focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} tamu
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-coral-dark">{error}</p>}

      <button type="submit" className="btn-accent w-full">
        Cek Ketersediaan via WhatsApp
      </button>
      <p className="text-center text-xs text-ink-muted">
        Tanpa booking otomatis — kami balas secepatnya untuk konfirmasi.
      </p>
    </form>
  );

  if (variant === "plain") return inner;

  return (
    <div className="card-surface p-6">
      <h3 className="font-serif text-lg font-semibold text-ink">
        Cek Ketersediaan
      </h3>
      <p className="mt-1 text-sm text-ink-soft">
        Isi rencana menginap Anda, kami siapkan yang terbaik.
      </p>
      <div className="mt-5">{inner}</div>
    </div>
  );
}
