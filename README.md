# Lentera Pasar — Base Template

Base template repositori untuk produk **Lentera Pasar**. Repo ini di-clone
berkali-kali untuk membuat website custom per klien di berbagai jenis usaha
(showroom, penginapan, yayasan, EO, dll).

**Prinsip utama:** repo ini **generik** dan tidak mengikat ke satu jenis usaha.
Semua konten spesifik klien dibaca dari file Markdown di folder `/data` — tidak
ada hardcode konten di dalam komponen. Styling default netral (Tailwind) dan
akan diganti saat di-clone.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Parsing Markdown: `gray-matter` + `remark`
- Deployment: Vercel-friendly (static/SSG)

## Cara Menjalankan

```bash
npm install
cp .env.example .env.local   # isi variabel sesuai kebutuhan
npm run dev
```

Build & typecheck:

```bash
npm run build
npm run typecheck
```

## Struktur Folder

```
app/
  layout.tsx              # root layout: header, footer, tracking, robots meta
  page.tsx                # beranda (listing preview + contact + popup)
  globals.css             # Tailwind base
  sitemap.ts              # sitemap otomatis dari /data/items
  robots.ts               # robots.txt otomatis (Allow/Disallow by isPaid)
  [category]/
    page.tsx              # halaman listing per kategori
    [slug]/
      page.tsx            # halaman detail dinamis + SEO otomatis
components/
  ItemCard.tsx            # card listing generik
  ItemGrid.tsx            # grid yang render banyak ItemCard
  Gallery.tsx             # galeri + lightbox
  WhatsAppButton.tsx      # tombol WA reusable (props: message)
  WhatsAppPopup.tsx       # modal popup WA (trigger: load/scroll/manual)
  ContactForm.tsx         # form → pesan WA terformat
  Watermark.tsx           # watermark (source of truth: isPaid)
  Header.tsx / Footer.tsx # layout generik (nama situs dari site-config)
  tracking/               # GTM + GA4 scripts
data/
  site-config.md          # konfigurasi situs (nama, WA, alamat, isPaid, dll)
  items/
    *.md                  # 1 file per item listing
lib/
  data.ts                 # parser markdown + helpers data
  types.ts                # tipe SiteConfig & Item
  utils.ts                # buildWaLink, formatCurrency
```

## Cara Menambah Item Baru

Cukup tambahkan file `.md` baru di `data/items/`. Contoh `data/items/mobil-avanza.md`:

```markdown
---
title: "Toyota Avanza 2018"
slug: "mobil-avanza"
category: "mobil"          # bebas; dipakai sebagai segmen URL /[category]/[slug]
price: 120000000
summary: "MPV family, terawat, pajak panjang."
images:
  - "https://.../foto1.jpg"
  - "https://.../foto2.jpg"
---

Isi deskripsi panjang di sini (markdown didukung).
```

Halaman listing `/mobil` dan detail `/mobil/mobil-avanza` akan otomatis
ter-generate. Sitemap juga ikut ter-update. **Tidak perlu ubah kode.**

> Field frontmatter bersifat generik (`title`, `slug`, `category`, `price`,
> `summary`, `images`). Field spesifik jenis usaha (mis. `transmisi`) bisa
> ditambahkan sendiri saat clone — base ini tidak memaksakannya.

## Mengubah Status `isPaid`

`isPaid` adalah **satu-satunya sumber kebenaran** untuk status pelunasan,
didefinisikan di frontmatter `data/site-config.md`:

- `isPaid: false` → robots `noindex, nofollow` + watermark penuh di konten & gambar.
- `isPaid: true` → robots `index, follow` + watermark hanya di footer.

Cukup ubah nilai tersebut di `site-config.md`, build ulang. Logika SEO robots
**dan** watermark membaca nilai yang sama — jangan membuat variabel terpisah.

## Environment Variables

Lihat `.env.example`. Yang wajib: `NEXT_PUBLIC_WA_NUMBER`. Opsional:
`NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_SITE_URL`.

## Yang Tidak Termasuk di Base Ini (ditambahkan saat clone)

- Filter kompleks (harga/tahun/dll)
- Halaman/section spesifik jenis usaha
- Desain branding final
- Backend / database / admin panel
