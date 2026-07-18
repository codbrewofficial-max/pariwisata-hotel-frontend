import ItemCard from "./ItemCard";
import type { ItemMeta } from "@/lib/types";

export default function ItemGrid({ items }: { items: ItemMeta[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Belum ada item. Tambahkan file markdown di folder <code>/data/items</code>.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ItemCard key={item.slug} item={item} />
      ))}
    </div>
  );
}
