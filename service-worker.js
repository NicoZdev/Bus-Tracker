const CACHE_NAME = 'colectivos-cache-v1';
const urlsToCache = [
  '/bus-tracker/',
  '/bus-tracker/index.html',
  '/bus-tracker/css/styles.css',
  '/bus-tracker/js/script.js',
  '/bus-tracker/img/parada-verde.png',
  '/bus-tracker/img/parada-naranja.png',
  '/bus-tracker/img/persona.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
