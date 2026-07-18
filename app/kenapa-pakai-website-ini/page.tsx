import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSiteConfig } from "@/lib/data";
import WhatsAppButton from "@/components/WhatsAppButton";
import { buildWaLink } from "@/lib/utils";
import type { FacilityIconName } from "@/lib/facility-icons";
import FacilityIcon from "@/lib/facility-icons";

export const metadata: Metadata = {
  title: "Kenapa Pakai Website Ini?",
  description:
    "Alasan memilih produk website dari Lentera Pasar untuk bisnis Anda.",
  robots: { index: false, follow: false },
};

interface Benefit {
  icon: FacilityIconName;
  title: string;
  body: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: "wifi",
    title: "Ditemukan Calon Pelanggan Baru",
    body: "Website di-optimasi supaya muncul di pencarian Google, bukan cuma mengandalkan kenalan atau mulut ke mulut. Orang asing yang butuh layanan Anda jadi bisa menemukan bisnis ini.",
  },
  {
    icon: "star",
    title: "Kesan Profesional & Terpercaya",
    body: "Tampilannya dibuat khusus menyesuaikan karakter bisnis Anda, bukan template generik yang persis sama dengan bisnis lain. Pengunjung langsung merasa yakin.",
  },
  {
    icon: "clock",
    title: "Leads Otomatis Lewat WhatsApp",
    body: "Pengunjung bisa langsung menghubungi Anda via WhatsApp dari mana saja di halaman. Tanpa form ribet, closing jadi lebih mudah dan cepat.",
  },
  {
    icon: "bed",
    title: "Nyaman Diakses dari HP",
    body: "Tampilan otomatis menyesuaikan di semua perangkat, dari layar HP sampai desktop. Mayoritas calon pelanggan browsing dari HP, jadi pengalaman mereka tetap nyaman.",
  },
  {
    icon: "spa",
    title: "Data Pengunjung Terukur",
    body: "Terintegrasi Google Analytics, jadi Anda tahu siapa saja yang berkunjung, dari mana, dan halaman apa yang paling diminati. Keputusan bisnis jadi bukan sekadar tebakan.",
  },
  {
    icon: "gym",
    title: "Bisa Berkembang Ke Depannya",
    body: "Ke depan tersedia opsi upgrade supaya Anda bisa mengelola sendiri isi website tanpa perlu bantuan teknis terus-menerus. Tumbuh seirama dengan bisnis Anda.",
  },
];

export default function WhyThisWebsitePage() {
  const config = getSiteConfig();

  // Route-level guard: this pitching page is only for the pre-sale phase.
  // Once the site is paid/sold, direct URL access is redirected home.
  if (config.isPaid) {
    redirect("/");
  }

  const ctaMessage =
    "Halo, saya tertarik punya website seperti ini untuk bisnis saya. Boleh info lebih lanjut?";

  return (
    <div className="container-page py-12">
      {/* Hero */}
      <section className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-teal">
          Untuk Pemilik Bisnis
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          Bisnis Bagus Sering Tidak Ditemukan — Padahal Bisa.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Banyak bisnis pelanggannya datang cuma dari mulut ke mulut. Padahal
          ada orang asing di sekitar yang sedang mencari persis layanan itu,
          tapi tidak tahu Anda ada. Website ini adalah jawabannya: membuat bisnis
          Anda mudah ditemukan, dipercaya, dan langsung bisa dihubungi.
        </p>
      </section>

      {/* Benefits */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
          Apa yang Anda Dapat
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <div key={i} className="card-surface p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-soft">
                <FacilityIcon name={b.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-ink">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mt-14 rounded-2xl bg-teal px-6 py-10 text-center text-white sm:px-10">
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
          Tertarik punya website seperti ini untuk bisnis Anda?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/85">
          Hubungi kami, kami bantu buatkan website yang membuat bisnis Anda
          mudah ditemukan dan dipercaya calon pelanggan.
        </p>
        <div className="mt-6 flex justify-center">
          <WhatsAppButton
            waNumber={config.wa_number}
            message={ctaMessage}
            variant="accent"
            label="Hubungi Kami"
            className="!bg-coral hover:!bg-coral-dark"
          />
        </div>
        <p className="mt-3 text-xs text-white/60">
          Balasan cepat & ramah — tanpa jargon, langsung ke solusi.
        </p>
      </section>

      <p className="mt-8 text-center text-xs text-ink-muted">
        Halaman ini otomatis tidak tampil setelah website resmi diserahkan ke
        pemilik bisnis.
      </p>
    </div>
  );
}
