const CACHE_NAME = 'colectivos-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'css/styles.css',
  'js/script.js',
  'img/parada-verde.png',
  'img/parada-naranja.png',
  'img/persona.png'
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
