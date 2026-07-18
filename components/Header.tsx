import Link from "next/link";

interface HeaderProps {
  siteName: string;
}

export default function Header({ siteName }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-gray-900">
          {siteName}
        </Link>
        <nav className="flex items-center gap-4 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Beranda
          </Link>
          <Link href="/contoh" className="hover:text-gray-900">
            Daftar Item
          </Link>
        </nav>
      </div>
    </header>
  );
}
