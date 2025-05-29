self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('offline-cache').then((cache) => {
            return cache.addAll(['/clock.html']);
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.endsWith('/clock.html')) {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});

