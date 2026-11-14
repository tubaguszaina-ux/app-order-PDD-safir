/* Service worker cangkang Order PDD.
   Hanya menyimpan cangkang (halaman, manifest, ikon) supaya terbuka cepat dan menampilkan
   pesan "tidak ada koneksi" yang rapi. Apps Script dan permintaan ke Google tidak disentuh,
   jadi data order selalu diambil langsung dari server.
   Kalau mengubah berkas cangkang, naikkan nomor VERSI agar HP memuat yang baru. */
var VERSI = 'order-pdd-v1';
var BERKAS = [
  './', 'index.html', 'manifest.json',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png', 'icons/favicon-32.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSI).then(function (c) { return c.addAll(BERKAS); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== VERSI; }).map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET') return;
  var u = new URL(r.url);
  if (u.origin !== self.location.origin) return;            // Google/Apps Script: biarkan langsung ke jaringan

  if (r.mode === 'navigate') {                              // halaman: jaringan dulu, cadangan dari cache
    e.respondWith(
      fetch(r).then(function (res) {
        var salinan = res.clone();
        caches.open(VERSI).then(function (c) { c.put('index.html', salinan); });
        return res;
      }).catch(function () { return caches.match('index.html'); })
    );
    return;
  }
  e.respondWith(caches.match(r).then(function (c) { return c || fetch(r); }));   // ikon dan manifest: cache dulu
});
