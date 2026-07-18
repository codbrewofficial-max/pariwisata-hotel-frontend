"use client";

import { useState } from "react";

export default function Gallery({ images }: { images: string[] }) {
  const [active, setActive] = useState<string | null>(null);

  if (images.length === 0) {
    return <p className="text-sm text-gray-500">Tidak ada gambar.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActive(src)}
            className="overflow-hidden rounded-md border border-gray-200 bg-gray-100"
            aria-label={`Buka gambar ${idx + 1} lebih besar`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Gambar ${idx + 1}`}
              className="h-32 w-full object-cover transition hover:opacity-90"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active}
            alt="Pratinjau gambar"
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-gray-900"
            onClick={() => setActive(null)}
          >
            Tutup
          </button>
        </div>
      )}
    </div>
  );
}
