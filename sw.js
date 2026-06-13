const CACHE = 'interview-coach-v1';
const ASSETS = [
  '/interview-coach/',
  '/interview-coach/index.html',
  '/interview-coach/manifest.json',
  '/interview-coach/icon-192.png',
  '/interview-coach/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => 
      cached || fetch(e.request).catch(() => 
        caches.match('/interview-coach/index.html')
      )
    )
  );
});
