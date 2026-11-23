const C='auto-cam-v32';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url),same=u.origin===location.origin;
 if(!same&&!/jsdelivr|googleapis|gstatic/.test(u.hostname))return;
 // صفحات التطبيق: الإنترنت أولاً (لتصل التحديثات). المكتبات والنماذج: الذاكرة أولاً (للسرعة).
 const net=()=>fetch(e.request,same?{cache:'no-store'}:undefined).then(r=>{if(r.ok){const k=r.clone();caches.open(C).then(c=>c.put(e.request,k))}return r});
 e.respondWith(same?net().catch(()=>caches.match(e.request)):caches.match(e.request).then(h=>h||net()));
});
