import Watermark from "./Watermark";

interface FooterProps {
  siteName: string;
  address?: string;
  businessHours?: string;
  isPaid: boolean;
}

export default function Footer({
  siteName,
  address,
  businessHours,
  isPaid,
}: FooterProps) {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">{siteName}</p>
            {address && <p className="mt-1 text-sm text-gray-600">{address}</p>}
            {businessHours && (
              <p className="mt-1 text-sm text-gray-600">{businessHours}</p>
            )}
          </div>
          <Watermark variant="footer" isPaid={isPaid} />
        </div>
      </div>
    </footer>
  );
}
