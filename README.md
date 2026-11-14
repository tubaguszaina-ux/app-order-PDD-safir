# Order PDD (cangkang aplikasi)

Halaman kecil yang membuat web app Apps Script **Link Orderan PDD Safir 1448** bisa dipasang di layar utama HP
dengan ikon logo PDD dan terbuka layar penuh. Semua logika dan data tetap di Apps Script dan Google Sheets.

- `index.html`: cangkang. Link Apps Script ada di `https://script.google.com/macros/s/AKfycbyUmHubeD4bb5G-bxYSP4bZLHB3Q_vOIMDeP4__1qpC1ShBGXX3ICOAg12EdrP-WR_g/exec` (bagian script).
- `manifest.json`: nama dan ikon aplikasi.
- `sw.js`: menyimpan cangkang untuk pesan "tidak ada koneksi". Naikkan `VERSI` kalau berkas cangkang diubah.
- `icons/`: ikon aplikasi.

Kalau cangkang gagal menampilkan aplikasi, buka alamat cangkang dengan tambahan `?langsung` untuk membuka Apps Script tanpa cangkang.
