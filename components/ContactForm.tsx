"use client";

import { useState } from "react";
import { buildWaLink } from "@/lib/utils";

interface ContactFormProps {
  waNumber: string;
  siteName?: string;
  submitLabel?: string;
}

export default function ContactForm({
  waNumber,
  siteName = "kami",
  submitLabel = "Kirim via WhatsApp",
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted =
      `Halo ${siteName}, saya ingin menghubungi Anda.\n\n` +
      `Nama: ${name}\n` +
      `Kontak: ${contact}\n` +
      `Pesan: ${message}`;
    window.open(buildWaLink(waNumber, formatted), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="cf-name">
          Nama
        </label>
        <input
          id="cf-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="cf-contact">
          Kontak (telepon/email)
        </label>
        <input
          id="cf-contact"
          type="text"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="cf-message">
          Pesan
        </label>
        <textarea
          id="cf-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
      >
        {submitLabel}
      </button>
    </form>
  );
}
