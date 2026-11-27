/* ألعاب الورق — يخلّي التطبيق يفتح بدون إنترنت. v1.7 */
const C='lamma-1.7-1795810463331';
const CORE=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png','./icons/favicon-64.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
const put=(r,res)=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res};
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin===location.origin){
    if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>put('./index.html',res)).catch(()=>caches.match('./index.html')));return}
    if(u.pathname.indexOf('/.netlify/')===0)return;
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>put(r,res))));return;
  }
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com')
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>put(r,res))));
});