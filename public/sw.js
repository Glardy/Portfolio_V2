const CACHE_VERSION = 'portfolio-v1'
const APP_SHELL = [
  '/portfolio/',
  '/portfolio/index.html',
  '/portfolio/manifest.webmanifest',
  '/portfolio/favicon.svg',
  '/portfolio/icons.svg',
  '/portfolio/robots.txt',
  '/portfolio/sitemap.xml',
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
          caches.match(event.request).then((cached) => cached || caches.match('/portfolio/'))
        )
    )
    return
  }

  const isStaticAsset =
    requestUrl.pathname.startsWith('/portfolio/assets/') ||
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
