const CACHE_NAME = 'kanban-app-v1';
const PRECACHE_URLS = [
  '/',
  '/manifest.webmanifest',
  '/App_Logo_192.png',
  '/App_Logo_512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Navigation routing: try cache first, then network. If both fail, return fallback (root).
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/'))
    );
    return;
  }

  // For other requests, try cache first, then network.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          // optionally cache successful GET responses
          if (event.request.method === 'GET' && response && response.status === 200) {
            const rClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, rClone));
          }
          return response;
        })
        .catch(() => caches.match('/'));
    })
  );
});
