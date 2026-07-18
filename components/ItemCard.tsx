import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import type { ItemMeta } from "@/lib/types";

export default function ItemCard({ item }: { item: ItemMeta }) {
  const href = `/${item.category}/${item.slug}`;
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:shadow-md"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {item.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.images[0]}
            alt={item.title}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            Tidak ada gambar
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-600">{item.summary}</p>
        {typeof item.price === "number" && (
          <p className="mt-2 text-sm font-medium text-brand">
            {formatCurrency(item.price)}
          </p>
        )}
      </div>
    </Link>
  );
}
