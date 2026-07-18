import { getSiteConfig, getAllRoomsMeta } from "@/lib/data";
import AvailabilityForm from "@/components/AvailabilityForm";
import AvailabilitySummaryList from "@/components/AvailabilitySummaryList";
import ContactForm from "@/components/ContactForm";
import Watermark from "@/components/Watermark";

export default function ContactPage() {
  const config = getSiteConfig();
  const rooms = getAllRoomsMeta();

  return (
    <div className="container-page py-12">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-teal">
          Kontak & Booking
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-ink sm:text-4xl">
          Kami Siap Menyambut Anda
        </h1>
        <p className="mt-3 text-ink-soft">
          Cek ketersediaan kamar atau kirim pesan langsung. Tim kami akan
          merespons dengan hangat dan cepat.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="font-serif text-xl font-semibold text-ink">
          Ringkasan Ketersediaan
        </h2>
        <div className="mt-4">
          <AvailabilitySummaryList rooms={rooms} />
        </div>
      </section>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <AvailabilityForm waNumber={config.wa_number} variant="plain" />
          <div className="card-surface p-6">
            <h3 className="font-serif text-lg font-semibold text-ink">
              Kirim Pesan
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              Ada pertanyaan lain? Tulis saja, kami jawab.
            </p>
            <div className="mt-5">
              <ContactForm waNumber={config.wa_number} siteName={config.site_name} />
            </div>
          </div>
        </div>

        <aside className="card-surface h-fit p-6">
          <h3 className="font-serif text-lg font-semibold text-ink">
            Informasi Kontak
          </h3>
          <dl className="mt-4 space-y-4 text-sm">
            {config.address && (
              <div>
                <dt className="font-medium text-ink">Alamat</dt>
                <dd className="text-ink-soft">{config.address}</dd>
              </div>
            )}
            {config.business_hours && (
              <div>
                <dt className="font-medium text-ink">Resepsionis</dt>
                <dd className="text-ink-soft">{config.business_hours}</dd>
              </div>
            )}
            <div>
              <dt className="font-medium text-ink">WhatsApp</dt>
              <dd className="text-ink-soft">{config.wa_number}</dd>
            </div>
          </dl>
        </aside>
      </div>

      {!config.isPaid && (
        <div className="mt-10">
          <Watermark variant="inline" isPaid={config.isPaid} />
        </div>
      )}
    </div>
  );
}
