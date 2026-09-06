// アプリ本体だけをキャッシュ（地図タイルは対象外）
const CACHE='rallynav-v1';
const FILES=['./','./index.html','./manifest.json','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{ const u=e.request.url; if(u.includes('tile.openstreetmap.org')||u.includes('cartocdn')) return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))); });
