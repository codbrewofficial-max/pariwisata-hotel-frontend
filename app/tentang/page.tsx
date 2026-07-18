import { getSiteConfig, getHotelInfo } from "@/lib/data";
import { renderMarkdown } from "@/lib/data";
import LandmarkDistance from "@/components/LandmarkDistance";
import Watermark from "@/components/Watermark";

export default async function AboutPage() {
  const config = getSiteConfig();
  const hotel = getHotelInfo();
  const html = await renderMarkdown(hotel.content);

  return (
    <div className="container-page py-12">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-teal">
          Tentang & Lokasi
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-ink sm:text-4xl">
          Cerita & Tempat Kami
        </h1>
      </header>

      <article
        className="mt-8 max-w-3xl space-y-4 leading-relaxed text-ink-soft"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <section className="mt-12">
        <h2 className="font-serif text-xl font-semibold text-ink">
          Dekat dengan Tempat Menarik
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Letak kami strategis — banyak tujuan ada dalam jarak tempuh singkat.
        </p>
        <div className="mt-5 max-w-2xl">
          <LandmarkDistance landmarks={hotel.landmarks} />
        </div>
      </section>

      {config.maps_embed_url && (
        <section className="mt-12">
          <h2 className="font-serif text-xl font-semibold text-ink">Peta Lokasi</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-sand-100 shadow-card">
            <iframe
              title="Peta lokasi hotel"
              src={config.maps_embed_url}
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {!config.isPaid && (
        <div className="mt-10">
          <Watermark variant="inline" isPaid={config.isPaid} />
        </div>
      )}
    </div>
  );
}
