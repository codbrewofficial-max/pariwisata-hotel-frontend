import Link from "next/link";
import {
  getSiteConfig,
  getFeaturedRooms,
  getHotelInfo,
} from "@/lib/data";
import RoomGrid from "@/components/RoomGrid";
import AvailabilityForm from "@/components/AvailabilityForm";
import WhatsAppPopup from "@/components/WhatsAppPopup";
import Watermark from "@/components/Watermark";
import FacilityList from "@/components/FacilityList";
import { buildWaLink } from "@/lib/utils";

export default function HomePage() {
  const config = getSiteConfig();
  const featured = getFeaturedRooms();
  const hotel = getHotelInfo();

  const ratingText =
    config.rating && config.reviews
      ? `Rated ${config.rating.toFixed(1)} / 5 dari ${config.reviews} ulasan tamu`
      : "Dipercaya oleh ratusan tamu yang kembali lagi";

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-teal text-white">
        <div className="container-page grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-teal-soft">
              Penginapan • Kota
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Selamat datang di {config.site_name}
            </h1>
            <p className="mt-5 max-w-md text-base text-white/85">
              Tempat beristirahat yang tenang dan nyaman di jantung kota. Kami
              siap menyambut Anda — cek ketersediaan kamar dan kami bantu siapkan
              yang terbaik untuk setiap perjalanan Anda.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/kamar" className="btn-accent">
                Lihat Tipe Kamar
              </a>
              <a
                href={buildWaLink(
                  config.wa_number,
                  "Halo, saya ingin bertanya tentang kamar di " +
                    config.site_name +
                    ".",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !border-white/30 !bg-transparent !text-white hover:!bg-white/10"
              >
                Tanya via WhatsApp
              </a>
            </div>
            <p className="mt-5 text-sm text-white/70">{ratingText}</p>
          </div>

          <div className="lg:pl-6">
            <AvailabilityForm waNumber={config.wa_number} />
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/5" />
      </section>

      {/* Featured rooms */}
      <section className="container-page py-14">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
              Pilihan Kamar Kami
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Ruang yang dirancang untuk istirahat yang pulih.
            </p>
          </div>
          <Link
            href="/kamar"
            className="hidden text-sm font-medium text-teal hover:text-teal-dark sm:inline"
          >
            Lihat semua →
          </Link>
        </div>
        <div className="mt-8">
          <RoomGrid rooms={featured.length > 0 ? featured : getFeaturedRooms()} />
        </div>
        <Link
          href="/kamar"
          className="mt-6 inline-block text-sm font-medium text-teal hover:text-teal-dark sm:hidden"
        >
          Lihat semua kamar →
        </Link>
      </section>

      {/* Trust signals */}
      <section className="bg-surface">
        <div className="container-page grid grid-cols-1 gap-8 py-14 sm:grid-cols-3">
          <div className="text-center">
            <p className="font-serif text-3xl font-semibold text-teal-dark">
              {config.rating ? config.rating.toFixed(1) : "4.8"}
            </p>
            <p className="mt-1 text-sm text-ink-soft">Rata-rata kepuasan</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl font-semibold text-teal-dark">
              {hotel.facilities.length}+
            </p>
            <p className="mt-1 text-sm text-ink-soft">Fasilitas untuk Anda</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl font-semibold text-teal-dark">
              24 Jam
            </p>
            <p className="mt-1 text-sm text-ink-soft">Resepsionis siaga</p>
          </div>
        </div>
      </section>

      {/* Hotel facilities preview */}
      {hotel.facilities.length > 0 && (
        <section className="container-page py-14">
          <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
            Fasilitas yang Menyenangkan
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Semua yang Anda butuhkan selama menginap, tersedia.
          </p>
          <div className="mt-8">
            <FacilityList facilities={hotel.facilities.slice(0, 6)} />
          </div>
        </section>
      )}

      {!config.isPaid && (
        <div className="container-page">
          <Watermark variant="inline" isPaid={config.isPaid} />
        </div>
      )}

      <WhatsAppPopup
        waNumber={config.wa_number}
        text="Halo! Ada yang bisa kami bantu untuk rencana menginap Anda?"
        trigger="load"
        delayMs={5000}
      />
    </div>
  );
}
