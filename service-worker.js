const CACHE_NAME = 'presupuesto-realtech-v1';
// Lista de archivos necesarios para que la aplicación funcione offline
const urlsToCache = [
  './', // Ruta principal (index.html)
  './index.html',
  './manifest.json',
  // Asume que también tendrás el logo guardado localmente para el modo offline
  './icon-512.png',
  './logo_realtech.png' 
];

self.addEventListener('install', event => {
  // Pre-cachea todos los archivos esenciales
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Archivos cacheados');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Intercepta todas las peticiones y revisa si el recurso está en el caché
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en el caché, lo devuelve (funciona offline)
        if (response) {
          return response;
        }
        // Si no está, lo pide a la red
        return fetch(event.request);
      }
    )
  );
});
