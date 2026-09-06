// アプリ本体をキャッシュ（オフライン起動用）。更新が反映されるよう、ネット優先で取りに行き、失敗時にキャッシュを使う
const CACHE='rallynav-v2';
const FILES=['./','./index.html','./manifest.json','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{ const u=e.request.url; if(e.request.method!=='GET'||u.includes('tile.openstreetmap.org')||u.includes('cartocdn')) return;
  e.respondWith(fetch(e.request).then(r=>{ const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return r; }).catch(()=>caches.match(e.request))); });
