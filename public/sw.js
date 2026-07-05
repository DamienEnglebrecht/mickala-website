const CACHE_NAME = 'mickala-ops-v1'
const STATIC_ASSETS = [
  '/operations',
  '/operations/pre-start-meeting',
  '/operations/safety-interaction',
  '/operations/uniform-request',
  '/operations/pre-hire-inspection',
  '/operations/500-hour-service',
  '/operations/onsite-audit',
  '/operations/build-record',
  '/operations/vehicle-inspection',
  '/operations/fuel-trailer-service',
  '/operations/gps-installation',
  '/pre-delivery-checklist',
  '/error',
  '/offline',
]

// Install: cache static pages
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
})

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
})

// Fetch: network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return

  // Skip non-http(s) requests and API calls
  const url = new URL(event.request.url)
  if (!url.protocol.startsWith('http') || url.pathname.startsWith('/api/')) return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses for static pages
        if (response.status === 200 && !url.pathname.includes('/_next/static')) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone)
          })
        }
        return response
      })
      .catch(() => {
        // Offline: serve from cache
        return caches.match(event.request).then((cached) => {
          return cached || caches.match('/operations')
        })
      })
  )
})
