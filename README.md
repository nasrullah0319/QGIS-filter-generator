# 🎯 QGIS Filter Generator dari Excel

Aplikasi web sederhana untuk membantu membuat string filter QGIS berdasarkan daftar IDBS atau IDSLS dari file Excel, memudahkan untuk layouting peta WB dan WS.

## 🔧 Fitur
- Pilih jenis filter: **IDBS** atau **IDSLS**
- Unggah file Excel berisi daftar kode (satu per baris, kolom A mulai dari baris ke-2).
- Hasilkan string filter dalam format:
    ```
    "idbs" = '6306010001001B' OR "idbs" = '6306010001002B'
    ```
- Copy hasil filter ke clipboard dengan satu klik.
- Download template Excel siap pakai.

## Cara Menggunakan
1. Buka halaman [GitHub Pages](https://nasrullah0319.github.io/QGIS-filter-generator/) atau clone dan jalankan `index.html` secara lokal.
2. Pilih jenis filter (IDBS atau IDSLS).
3. Klik **Download Template Excel** untuk mengunduh format isian.
4. Masukkan data di kolom A (mulai dari baris kedua).
5. Unggah file Excel yang sudah diisi.
6. Klik **Generate Filter** untuk membuat string filter.
7. Klik **Copy to Clipboard** untuk menyalin hasil ke QGIS.

## 📝 Contoh Format Excel
| A               |
|-----------------|
| IDBS / IDSLS    |
| 6306010001001B  |
| 6306010001002B  |

## 🛠 Teknologi yang Digunakan
- [Bootstrap 5](https://getbootstrap.com/)
- [SheetJS (xlsx)](https://sheetjs.com/) untuk membaca file Excel
- Vanilla JavaScript (tanpa framework tambahan)

## 📄 Lisensi
Proyek ini dilisensikan dengan lisensi MIT. Bebas digunakan dan dimodifikasi.
