const cacheUrls = [
  '/home',
  '_next/static/css/app/layout.css',
  '_next/static/chunks/app/layout.js',
  '_next/static/chunks/webpack.js',
  '_next/static/chunks/main-app.js',
  '_next/static/chunks/app-pages-internals.js',
  '_next/static/css/app/layout.css?v=1698067289462',
  '_next/static/css/app/layout.css?v=1698067334885'

  // '_next/static/css/app/layout.css',
  // '_next/static/chunks/app/layout.js',
  // '_next/static/chunks/app/(app)/dashboard/page.js'
]
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(cache => {
      return cache.addAll(cacheUrls)
    })
  )
})
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})
