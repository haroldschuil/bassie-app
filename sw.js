// Service Worker voor Bassie app
// Stuurt dagelijkse check-meldingen via de browser

const CACHE_NAME = 'bassie-v1';
const ASSETS = ['/', '/index.html', '/manifest.json'];

// Install: cache bestanden
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: oude caches opruimen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first strategie
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});

// Push notificatie ontvangen (voor toekomstige server-push uitbreiding)
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : { title: 'Bassie', body: 'Check de app!' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      tag: 'bassie-push',
      vibrate: [200, 100, 200]
    })
  );
});

// Notificatie klik: open de app
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('bassie') && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});

// Periodieke sync (werkt op Android Chrome als app is geinstalleerd als PWA)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'bassie-daily-check') {
    event.waitUntil(doDailyCheck());
  }
});

async function doDailyCheck() {
  // Lees data uit cache of geef melding
  // De echte data zit in localStorage van de main thread
  // Stuur een melding om de app te openen voor de check
  const registration = self.registration;

  // Haal opgeslagen check-data op via IndexedDB als die beschikbaar is
  // Simpele fallback: stuur reminder en laat app zelf beoordelen
  await registration.showNotification('🐍 Bassie check', {
    body: 'Even kijken of Bassie eten nodig heeft!',
    icon: 'icon-192.png',
    tag: 'bassie-daily',
    requireInteraction: false
  });
}
