type WatermarkVariant = "inline" | "footer" | "image";

interface WatermarkProps {
  variant?: WatermarkVariant;
  isPaid: boolean;
}

const BRAND = "Lentera Pasar";
const COMMUNITY = "LabKerKomIT Community";

export default function Watermark({ variant = "inline", isPaid }: WatermarkProps) {
  // Paid: only footer watermark (small), nothing else.
  if (isPaid) {
    if (variant === "footer") {
      return (
        <span className="text-xs text-gray-400">
          Powered by {BRAND} · {COMMUNITY}
        </span>
      );
    }
    return null;
  }

  // Not paid: full watermark everywhere.
  if (variant === "image") {
    return (
      <span className="pointer-events-none absolute bottom-1 right-1 rounded bg-black/55 px-1.5 py-0.5 text-[10px] leading-tight text-white">
        {BRAND}
        <br />
        {COMMUNITY}
      </span>
    );
  }

  if (variant === "footer") {
    return (
      <span className="text-xs text-gray-300">
        Dibuat dengan {BRAND} · {COMMUNITY}
      </span>
    );
  }

  return (
    <div className="my-6 rounded-md border border-dashed border-gray-300 bg-gray-50 p-3 text-center text-xs text-gray-500">
      Situs ini dibuat menggunakan <strong>{BRAND}</strong> — {COMMUNITY}
    </div>
  );
}
