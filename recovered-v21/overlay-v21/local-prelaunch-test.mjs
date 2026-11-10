import fs from 'node:fs';import path from 'node:path';
import { chromium } from 'playwright';
const W='.';
Date.now; globalThis.__realFetch=globalThis.fetch;
const app=(await import(W+'/patched21/index.mjs')).default;
const man=JSON.parse(fs.readFileSync(W+'/v21/manifest.json'));
const ct={js:'text/javascript; charset=utf-8',css:'text/css',png:'image/png',jpg:'image/jpeg',svg:'image/svg+xml',ico:'image/x-icon',txt:'text/plain',xml:'application/xml',webp:'image/webp',json:'application/json',wasm:'application/wasm'};
const find=(p)=>{ for(const d of [W+'/v21/files',W+'/live-files']){const f=d+p; if(fs.existsSync(f)&&fs.statSync(f).isFile()) return f;} return null;};
const env={NODE_ENV:'production',ASSETS:{fetch:async(r)=>{const u=new URL(r.url);const f=find(u.pathname);return f?new Response(fs.readFileSync(f),{headers:{'content-type':ct[f.split('.').pop()]||'application/octet-stream'}}):new Response('nf',{status:404})}}};
const b=await chromium.launch(); const res={};
for(const [name,vp] of [['desktop',{width:1280,height:800}],['mobile',{width:390,height:844}]]){
 const ctx=await b.newContext({viewport:vp}); const page=await ctx.newPage(); const errs=[];const missing=[];
 page.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,200))}); page.on('pageerror',e=>errs.push('PE '+String(e).slice(0,200)));
 await page.route('**/*',async route=>{const u=new URL(route.request().url()); if(u.hostname!=='formzalo.com'){return route.fulfill({status:204,body:''});}
  const f=find(u.pathname); if(f&&!u.pathname.endsWith('.xml')||f&&u.pathname==='/sitemap.xml'){return route.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':ct[f.split('.').pop()]||'application/octet-stream'}});}
  const rq=route.request(); const r=await app.fetch(new Request(u.href,{method:rq.method(),headers:rq.headers(),body:rq.postData()||undefined}),env,{waitUntil(){}});
  if(r.status===404&&u.pathname.startsWith('/assets/')) missing.push(u.pathname);
  return route.fulfill({status:r.status,headers:Object.fromEntries(r.headers),body:Buffer.from(await r.arrayBuffer())});});
 for(const p of ['/','/contact','/faq','/services','/cv-maker','/about']){
  errs.length=0; await page.goto('https://formzalo.com'+p+'?lang=en',{waitUntil:'networkidle'}).catch(e=>errs.push('GOTO '+e.message));
  await page.waitForTimeout(800);
  const html=await page.content();
  res[name+' '+p]={team:html.includes('team@formzalo.com'),partners:html.includes('partners@'),errs:[...errs],h1:(await page.locator('h1').first().textContent().catch(()=>null))?.slice(0,50)};
 }
 // client-side nav
 errs.length=0; await page.goto('https://formzalo.com/?lang=en',{waitUntil:'networkidle'});
 await page.evaluate(()=>{document.querySelectorAll('[role=dialog] button').forEach(()=>{})});
 for(const href of ['/faq','/contact','/services']){const a=page.locator(`a[href^="${href}"]`).first(); if(await a.count()){await a.evaluate(e=>e.click()); await page.waitForTimeout(1500); res[name+' nav '+href]={url:page.url(),errs:[...errs]};}}
 res[name+' missing']=missing;
 await ctx.close();
}
await b.close(); fs.writeFileSync('/workspace/formzalo-live-20261110/local-v21-test.json',JSON.stringify(res,null,1)); console.log(JSON.stringify(res,null,1));
