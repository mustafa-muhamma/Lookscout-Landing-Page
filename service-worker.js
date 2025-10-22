const CACHE_NAME = 'cache-v#1';
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/css/style.css',
    '/assets/images/Company Logo.png',
    '/manifest_and_icons/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
    console.log('Service Worker: Installed');
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) =>
            Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
        )
    );
    console.log('Service Worker: Activated');
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    if (url.origin !== location.origin) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(response => {
            return (
                response ||
                fetch(event.request).catch(() => caches.match('/index.html'))
            );
        })
    );
});



self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Notification';
    const options = {
        body: data.body || 'You have a new message!',
        icon: '/assets/images/Company Logo.png',
        badge: '/assets/images/Company Logo.png',
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
