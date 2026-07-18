import { notFound } from "next/navigation";
import { getItemsByCategory, getAllCategories, getSiteConfig } from "@/lib/data";
import ItemGrid from "@/components/ItemGrid";
import Watermark from "@/components/Watermark";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const config = getSiteConfig();
  const items = getItemsByCategory(params.category);

  if (items.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold capitalize text-gray-900">
        {params.category.replace(/-/g, " ")}
      </h1>
      <div className="mt-6">
        <ItemGrid items={items} />
      </div>
      {!config.isPaid && <Watermark variant="inline" isPaid={config.isPaid} />}
    </div>
  );
}
