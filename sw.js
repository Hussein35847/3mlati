const CACHE_NAME = '3mlati-v2';

// Only cache same-origin assets to avoid CDN CORS errors
const PRECACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json'
];

// Install – pre-cache local files only
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE))
            .then(() => self.skipWaiting())
    );
});

// Activate – remove old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch strategy:
//   - API requests (exchange-rate): network-only, no cache
//   - Everything else: cache-first with network fallback
self.addEventListener('fetch', event => {
    const url = event.request.url;

    // Always hit network for live exchange rate API
    if (url.includes('exchangerate-api.com')) {
        event.respondWith(fetch(event.request));
        return;
    }

    // For cross-origin requests (fonts, CDN, flags) – network with cache fallback
    if (!url.startsWith(self.location.origin)) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // Cache a copy if successful
                    if (response && response.status === 200) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    }
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // Same-origin: cache-first
    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;
            return fetch(event.request).then(response => {
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            });
        })
    );
});
