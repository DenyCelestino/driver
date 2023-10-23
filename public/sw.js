// service-worker.js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(cache => {
      return cache.addAll([
        '/',
        '/dashboard'

        // '_next/static/css/app/layout.css'
        // 'src/app/globals.css'

        // '/globals.css' // Inclua o arquivo CSS no cache

        // '/static/css/styles.css' // Exemplo de recurso a ser armazenado em cache
        // Adicione outras rotas e recursos que deseja armazenar em cache
      ])
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
