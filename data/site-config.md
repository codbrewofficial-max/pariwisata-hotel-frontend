---
site_name: "Nama Situs Anda"
wa_number: "6281234567890"
address: "Alamat usaha Anda, Kota"
business_hours: "Senin - Sabtu, 09:00 - 17:00"
isPaid: false
value_props:
  - "Layanan ramah & profesional"
  - "Harga transparan tanpa biaya tersembunyi"
  - "Respons cepat via WhatsApp"
---

# Tentang Situs Ini

Isi deskripsi umum situs di sini. File ini adalah konfigurasi generik yang akan
diganti setiap kali repo ini di-clone untuk klien baru. Jangan hardcode konten
spesifik jenis usaha di dalam komponen — ubah file ini saja.

## Catatan

- `isPaid: false` → situs belum dilunasi: robots `noindex, nofollow` dan watermark
  penuh tampil di konten + gambar.
- `isPaid: true` → situs lunas: robots `index, follow` dan watermark hanya di footer.
