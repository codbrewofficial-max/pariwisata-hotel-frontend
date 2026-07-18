import { getSiteConfig, getHotelInfo } from "@/lib/data";
import FacilityList from "@/components/FacilityList";
import Gallery from "@/components/Gallery";
import Watermark from "@/components/Watermark";

export default function FacilitiesPage() {
  const config = getSiteConfig();
  const hotel = getHotelInfo();

  const areaImages = [
    "/images/areas/lobby.jpg",
    "/images/areas/pool.jpg",
    "/images/areas/restaurant.jpg",
    "/images/areas/garden.jpg",
  ];

  return (
    <div className="container-page py-12">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-teal">
          Fasilitas
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-ink sm:text-4xl">
          Semua yang Kami Sediakan
        </h1>
        <p className="mt-3 text-ink-soft">
          Kami merawat setiap detail agar menginap terasa mudah, nyaman, dan
          menenangkan — mulai dari lobi hingga kolam renang.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="font-serif text-xl font-semibold text-ink">
          Fasilitas Umum
        </h2>
        <div className="mt-5">
          <FacilityList facilities={hotel.facilities} columns={4} icon="star" />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-xl font-semibold text-ink">
          Suasana Area Kami
        </h2>
        <div className="mt-5">
          <Gallery images={areaImages} />
        </div>
      </section>

      {!config.isPaid && (
        <div className="mt-10">
          <Watermark variant="inline" isPaid={config.isPaid} />
        </div>
      )}
    </div>
  );
}
