"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
  siteName: string;
  nav: { label: string; href: string }[];
}

export default function Header({ siteName, nav }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-sand-100 bg-surface/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex min-h-[44px] items-center font-serif text-lg font-semibold text-ink"
        >
          {siteName}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium transition ${
                isActive(item.href)
                  ? "text-teal"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-ink hover:bg-sand-100 md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div ref={menuRef} className="border-t border-sand-100 bg-surface md:hidden">
          <nav className="container-page flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-[44px] items-center rounded-lg px-2 text-base font-medium transition ${
                  isActive(item.href)
                    ? "bg-teal-soft text-teal"
                    : "text-ink-soft hover:bg-sand-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
