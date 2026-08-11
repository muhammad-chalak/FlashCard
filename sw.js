const CACHE_NAME = 'vocab-master-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/words_a1.js',
  '/words_a2.js',
  '/words_b1.js',
  '/words_b2.js',
  '/words_c1.js'
];

// کاتی ئینستاڵکردنی Service Worker فایلەکان خەزن دەکات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// کاتێک ئەپەکە دەکرێتەوە و ئینتەرنێت نییە، فایلە خەزنکراوەکان دەهێنێت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // ئەگەر لە کاشدا هەبوو ئەوە بگەڕێنەوە
        }
        return fetch(event.request); // ئەگەر نا، لە ئینتەرنێتەوە بیهێنە
      })
  );
});

// سڕینەوەی کاشە کۆنەکان کاتێک ئەپەکە ئەپدەیت دەبێت
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
