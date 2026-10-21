const CACHE_VERSION = 'portfolio-v1'
const APP_SHELL = [
  '/Portfolio_V2/',
  '/Portfolio_V2/index.html',
  '/Portfolio_V2/manifest.webmanifest',
  '/Portfolio_V2/favicon.svg',
  '/Portfolio_V2/icons.svg',
  '/Portfolio_V2/robots.txt',
  '/Portfolio_V2/sitemap.xml',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const requestUrl = new URL(event.request.url)
  if (requestUrl.origin !== self.location.origin) return

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone()
          caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, responseClone))
          return response
        })
        .catch(() =>
          caches.match(event.request).then((cached) => cached || caches.match('/Portfolio_V2/'))
        )
    )
    return
  }

  const isStaticAsset =
    requestUrl.pathname.startsWith('/Portfolio_V2/assets/') ||
    ['style', 'script', 'image', 'font'].includes(event.request.destination)

  if (isStaticAsset) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached
        return fetch(event.request).then((response) => {
          const responseClone = response.clone()
          caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, responseClone))
          return response
        })
      })
    )
  }
})
