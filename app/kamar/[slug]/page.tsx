import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getRoomBySlug, getAllRoomSlugs, getSiteConfig } from "@/lib/data";
import { renderMarkdown } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import GalleryCategorized from "@/components/GalleryCategorized";
import FacilityList from "@/components/FacilityList";
import AvailabilityForm from "@/components/AvailabilityForm";
import AvailabilitySection from "@/components/AvailabilitySection";
import WhatsAppButton from "@/components/WhatsAppButton";
import Watermark from "@/components/Watermark";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllRoomSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const room = getRoomBySlug(params.slug);
  if (!room) return {};
  return {
    title: room.title,
    description: `${room.category} · ${room.bedType} · ${room.size} m² · ${room.capacity} tamu. Mulai ${formatCurrency(room.price)} / malam.`,
    openGraph: {
      title: room.title,
      description: room.content.slice(0, 140),
      images: room.coverImage ? [room.coverImage] : undefined,
    },
  };
}

const AREA_GALLERY: Record<string, string[]> = {
  area: [
    "/images/areas/lobby.jpg",
    "/images/areas/pool.jpg",
    "/images/areas/restaurant.jpg",
    "/images/areas/garden.jpg",
  ],
};

export default async function RoomDetailPage({ params }: PageProps) {
  const room = getRoomBySlug(params.slug);
  const config = getSiteConfig();

  if (!room) {
    notFound();
  }

  const html = await renderMarkdown(room.content);
  const waMessage = `Halo, saya tertarik dengan kamar "${room.title}" (${room.category}, ${formatCurrency(room.price)}/malam). Boleh minta info lebih lanjut?`;

  const categories = [
    { label: "Kamar", images: room.gallery },
    { label: "Area Umum", images: AREA_GALLERY.area },
  ];

  return (
    <div className="container-page py-10">
      <nav className="mb-6 text-sm text-ink-muted">
        <a href="/kamar" className="hover:text-ink">
          Tipe Kamar
        </a>{" "}
        / <span className="text-ink-soft">{room.title}</span>
      </nav>

      <header className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-teal-soft px-3 py-1 text-xs font-medium text-teal-dark">
            {room.category}
          </span>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-ink sm:text-4xl">
            {room.title}
          </h1>
          <p className="mt-3 text-ink-soft">
            {room.bedType} · {room.size} m² · untuk {room.capacity} tamu
          </p>
          <p className="mt-4 font-serif text-2xl font-semibold text-teal-dark">
            {formatCurrency(room.price)}
            <span className="text-sm font-normal text-ink-muted"> / malam</span>
          </p>
        </div>
        <div className="lg:pl-6">
          <AvailabilitySection
            waNumber={config.wa_number}
            roomTitle={room.title}
            unavailableDates={room.unavailableDates}
          />
        </div>
      </header>

      <div className="relative mt-10">
        <GalleryCategorized categories={categories} />
        {!config.isPaid && <Watermark variant="image" isPaid={config.isPaid} />}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-serif text-xl font-semibold text-ink">
            Tentang Kamar Ini
          </h2>
          <article
            className="mt-4 space-y-4 leading-relaxed text-ink-soft"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <h2 className="mt-10 font-serif text-xl font-semibold text-ink">
            Fasilitas Kamar
          </h2>
          <div className="mt-4">
            <FacilityList facilities={room.facilities} columns={3} icon="star" />
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <WhatsAppButton
              waNumber={config.wa_number}
              message={waMessage}
              variant="accent"
              label={`Tanya kamar ${room.title}`}
              className="w-full"
            />
            <p className="mt-3 text-center text-xs text-ink-muted">
              Balasan cepat dari resepsionis kami.
            </p>
          </div>
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
