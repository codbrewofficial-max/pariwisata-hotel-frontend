import Link from "next/link";
import { getSiteConfig, getAllItemsMeta } from "@/lib/data";
import ItemGrid from "@/components/ItemGrid";
import WhatsAppPopup from "@/components/WhatsAppPopup";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactForm from "@/components/ContactForm";
import Watermark from "@/components/Watermark";

export default function HomePage() {
  const config = getSiteConfig();
  const items = getAllItemsMeta();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          {config.site_name}
        </h1>
        {config.address && (
          <p className="mt-2 text-sm text-gray-600">{config.address}</p>
        )}
        <div className="mt-6 flex justify-center">
          <WhatsAppButton
            waNumber={config.wa_number}
            message="Halo, saya ingin informasi lebih lanjut."
            label="Hubungi Kami"
          />
        </div>
      </section>

      {config.value_props.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">Keunggulan Kami</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {config.value_props.map((prop, i) => (
              <li
                key={i}
                className="rounded-md border border-gray-200 bg-white p-4 text-sm text-gray-700"
              >
                {prop}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Daftar Item</h2>
          <Link href="/contoh" className="text-sm text-brand hover:underline">
            Lihat semua →
          </Link>
        </div>
        <div className="mt-4">
          <ItemGrid items={items.slice(0, 6)} />
        </div>
        {!config.isPaid && <Watermark variant="inline" isPaid={config.isPaid} />}
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900">Hubungi Kami</h2>
        <div className="mt-4 max-w-xl">
          <ContactForm waNumber={config.wa_number} siteName={config.site_name} />
        </div>
      </section>

      <WhatsAppPopup
        waNumber={config.wa_number}
        text="Halo! Ada yang bisa kami bantu?"
        trigger="load"
        delayMs={4000}
      />
    </div>
  );
}
