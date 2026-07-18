import { getSiteConfig, getAllRoomsMeta } from "@/lib/data";
import RoomGrid from "@/components/RoomGrid";
import AvailabilitySummaryList from "@/components/AvailabilitySummaryList";
import Watermark from "@/components/Watermark";

export default function RoomsPage() {
  const config = getSiteConfig();
  const rooms = getAllRoomsMeta();

  return (
    <div className="container-page py-12">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-teal">
          Tipe Kamar
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-ink sm:text-4xl">
          Pilih Ruang Istirahat Anda
        </h1>
        <p className="mt-3 text-ink-soft">
          Dari kamar nyaman untuk satu hingga keluarga kecil, setiap ruang kami
          siap menyambut dengan ketenangan dan kenyamanan.
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

      <div className="mt-12">
        <h2 className="font-serif text-xl font-semibold text-ink">
          Semua Tipe Kamar
        </h2>
        <div className="mt-4">
          <RoomGrid rooms={rooms} />
        </div>
      </div>

      {!config.isPaid && (
        <div className="mt-10">
          <Watermark variant="inline" isPaid={config.isPaid} />
        </div>
      )}
    </div>
  );
}
