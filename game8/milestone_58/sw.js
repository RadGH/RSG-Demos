// Vagrant & Ash — Service Worker
// Cache-first strategy for all assets; network-first for navigation.

const CACHE_NAME = 'vna-v1'

// Install: cache nothing proactively (let runtime caching fill the cache).
self.addEventListener('install', event => {
  self.skipWaiting()
})

// Activate: clean up old caches.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  )
})

// Fetch: cache-first for assets, network-first for HTML navigation.
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET and cross-origin (fonts loaded from google are cached separately by browser)
  if (request.method !== 'GET') return
  if (url.origin !== self.location.origin) return

  // Navigation requests: network-first with cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
          return response
        })
        .catch(() => caches.match(request).then(r => r ?? caches.match('/')))
    )
    return
  }

  // Assets: cache-first, then network, then update cache
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached
      return fetch(request).then(response => {
        if (!response || response.status !== 200) return response
        const clone = response.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
        return response
      })
    })
  )
})
