# fetch-event
FetchEvent outside Service Worker

Simple http mocking
```js
var nodeFetch = require('node-fetch')
var {fetch, Response} = require('./node')(nodeFetch)

fetch.on('fetch', event => {
  console.log(event.request.url) // http://example.com
  event.respondWith(new Response('hello'))
})

fetch('http://example.com')
.then(res => res.text())
.then(console.log) // hello
```

Using [fetch-cachestorage][1] you can create your own cache mechanism
```js
var nodeFetch = require('node-fetch')
var {fetch, Response} = require('./node')(nodeFetch)

/*
 * Will see if it exist in the cache, if not it will fetch it
 * store it, and respond with a copy - secound time it will load
 * from the cache
 */
fetch.on('fetch', event => event.respondWith(
  caches.match(event.request).then(res =>
    res || nodeFetch(event.request).then(res =>
      caches.open('v1').then(cache => (
        cache.put(event.request, res.clone()), res
      ))
    )
  )
))
```

  [1]: cacheStorage
