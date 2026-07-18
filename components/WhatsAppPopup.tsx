"use client";

import { useEffect, useState } from "react";
import { buildWaLink } from "@/lib/utils";

type TriggerMode = "load" | "scroll" | "manual";

interface WhatsAppPopupProps {
  waNumber: string;
  text: string;
  message?: string;
  trigger?: TriggerMode;
  delayMs?: number;
  scrollThreshold?: number;
  buttonLabel?: string;
  title?: string;
}

export default function WhatsAppPopup({
  waNumber,
  text,
  message = "Halo, saya tertarik dengan layanan Anda.",
  trigger = "load",
  delayMs = 3000,
  scrollThreshold = 60,
  buttonLabel = "Chat Sekarang",
  title = "Butuh bantuan?",
}: WhatsAppPopupProps) {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    if (trigger === "load") {
      const t = setTimeout(() => setOpen(true), delayMs);
      return () => clearTimeout(t);
    }

    if (trigger === "scroll") {
      const onScroll = () => {
        const scrolled =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100;
        if (scrolled >= scrollThreshold) setOpen(true);
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [dismissed, trigger, delayMs, scrollThreshold]);

  if (trigger === "manual") {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
      >
        {text}
      </button>
    );
  }

  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white p-4 shadow-xl">
      <button
        type="button"
        onClick={() => {
          setOpen(false);
          setDismissed(true);
        }}
        className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
        aria-label="Tutup popup"
      >
        &times;
      </button>
      <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
      <p className="mt-1 text-sm text-gray-600">{text}</p>
      <a
        href={buildWaLink(waNumber, message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
      >
        {buttonLabel}
      </a>
    </div>
  );
}
