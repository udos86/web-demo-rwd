self.addEventListener("install", installEvent => {

    const cacheName = "my-cache";
    const filePaths = [
        './index.html',
        './css/styles.css',
        './img/astronaut.jpg',
        './img/astronaut@2x.jpg',
        './img/bg.jpg',
        './img/bg@2x.jpg',
        './img/design.jpg',
        './img/design@2x.jpg',
        './img/road.jpg',
        './img/road@2x.jpg'
    ];

    const cacheOpened = caches.open(cacheName).then(cache => cache.addAll(filePaths));

    installEvent.waitUntil(cacheOpened);
});

self.addEventListener("fetch", fetchEvent => {

    const request = fetchEvent.request;
    const response = caches.match(request).then(response => {
        return response ? response : fetch(request);
    });

    fetchEvent.respondWith(response);
});