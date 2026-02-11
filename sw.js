const CACHE_NAME = "gravome-sepa-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./Synonyms word Groups.html",
  "./Antonyms word Groups.html",
  "./Antonyms.html",
  "./Synonyms.html",
  "./Capitalization.html",
  "./Punctuation.html",
  "./Spelling.html",
  "./Grammar.html",
  "./Sentence.html",
  "./tap.mp3",
  "./success.mp3",
  "./reset.mp3"
];

// INSTALL
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// FETCH (OFFLINE MODE)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
