import Watermark from "./Watermark";

interface FooterProps {
  siteName: string;
  address?: string;
  businessHours?: string;
  waNumber?: string;
  isPaid: boolean;
}

export default function Footer({
  siteName,
  address,
  businessHours,
  waNumber,
  isPaid,
}: FooterProps) {
  return (
    <footer className="mt-20 border-t border-sand-100 bg-surface">
      <div className="container-page grid grid-cols-1 gap-8 py-10 sm:grid-cols-3">
        <div>
          <p className="font-serif text-lg font-semibold text-ink">{siteName}</p>
          <p className="mt-2 max-w-xs text-sm text-ink-soft">
            Penginapan tenang di jantung kota — tempat beristirahat yang nyaman
            untuk setiap perjalanan Anda.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Kontak</p>
          {address && <p className="mt-2 text-sm text-ink-soft">{address}</p>}
          {businessHours && (
            <p className="mt-1 text-sm text-ink-soft">{businessHours}</p>
          )}
          {waNumber && (
            <a
              href={`https://wa.me/${waNumber.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-sm font-medium text-teal hover:text-teal-dark"
            >
              Chat via WhatsApp
            </a>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Navigasi</p>
          <ul className="mt-2 space-y-1 text-sm text-ink-soft">
            <li>
              <a href="/" className="hover:text-ink">
                Beranda
              </a>
            </li>
            <li>
              <a href="/kamar" className="hover:text-ink">
                Tipe Kamar
              </a>
            </li>
            <li>
              <a href="/fasilitas" className="hover:text-ink">
                Fasilitas
              </a>
            </li>
            <li>
              <a href="/tentang" className="hover:text-ink">
                Tentang & Lokasi
              </a>
            </li>
            <li>
              <a href="/kontak" className="hover:text-ink">
                Kontak
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sand-100">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 sm:flex-row">
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} {siteName}. Seluruh hak cipta dilindungi.
          </p>
          <Watermark variant="footer" isPaid={isPaid} />
        </div>
      </div>
    </footer>
  );
}
