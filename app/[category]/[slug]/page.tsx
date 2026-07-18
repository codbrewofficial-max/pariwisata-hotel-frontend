import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getItemBySlug,
  getItemsByCategory,
  getSiteConfig,
} from "@/lib/data";
import { renderMarkdown } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import Gallery from "@/components/Gallery";
import WhatsAppButton from "@/components/WhatsAppButton";
import Watermark from "@/components/Watermark";

interface PageProps {
  params: { category: string; slug: string };
}

export function generateStaticParams() {
  return getItemsByCategory("contoh").map((item) => ({
    category: item.category,
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const item = getItemBySlug(params.slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.summary,
    openGraph: {
      title: item.title,
      description: item.summary,
      images: item.images[0] ? [item.images[0]] : undefined,
    },
  };
}

export default async function ItemDetailPage({ params }: PageProps) {
  const item = getItemBySlug(params.slug);
  const config = getSiteConfig();

  if (!item || item.category !== params.category) {
    notFound();
  }

  const html = await renderMarkdown(item.body);

  const waMessage = `Halo, saya tertarik dengan "${item.title}". Boleh minta info lebih lanjut?`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
        {typeof item.price === "number" && (
          <p className="mt-2 text-lg font-semibold text-brand">
            {formatCurrency(item.price)}
          </p>
        )}
        <p className="mt-2 text-gray-600">{item.summary}</p>
      </header>

      <div className="relative mt-6">
        <Gallery images={item.images} />
        {!config.isPaid && (
          <Watermark variant="image" isPaid={config.isPaid} />
        )}
      </div>

      <article
        className="prose mt-8 max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="mt-8">
        <WhatsAppButton waNumber={config.wa_number} message={waMessage} />
      </div>

      {!config.isPaid && <Watermark variant="inline" isPaid={config.isPaid} />}
    </div>
  );
}
