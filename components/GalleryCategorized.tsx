"use client";

import { useState } from "react";

interface Category {
  label: string;
  images: string[];
}

interface GalleryCategorizedProps {
  categories: Category[];
}

export default function GalleryCategorized({
  categories,
}: GalleryCategorizedProps) {
  const valid = categories.filter((c) => c.images.length > 0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (valid.length === 0) {
    return <p className="text-sm text-ink-muted">Tidak ada gambar.</p>;
  }

  const active = valid[activeIdx];

  return (
    <div>
      {valid.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {valid.map((c, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                i === activeIdx
                  ? "bg-teal text-white"
                  : "border border-sand-200 bg-surface text-ink-soft hover:bg-sand-100"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {active.images.map((src, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setLightbox(src)}
            className="overflow-hidden rounded-xl border border-sand-100 bg-sand-100"
            aria-label={`Buka gambar ${idx + 1} lebih besar`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${active.label} ${idx + 1}`}
              className="h-36 w-full object-cover transition hover:opacity-90 sm:h-44"
            />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt="Pratinjau gambar"
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-ink"
            onClick={() => setLightbox(null)}
          >
            Tutup
          </button>
        </div>
      )}
    </div>
  );
}
