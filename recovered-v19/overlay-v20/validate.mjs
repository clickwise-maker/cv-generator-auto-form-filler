import fs from 'node:fs/promises';
const flavor=process.argv[2];
Date.now=()=>1794114000000;
globalThis.fetch=async()=>{throw new Error('outbound fetch')};
const app=(await import(`./${flavor}/index.mjs`)).default;
const env={NODE_ENV:'production',ASSETS:{fetch:async(r)=>new Response('TEST ASSET',{headers:{'content-type':'text/css'}})}};
const reqs=[];
for(const p of ['/','/?lang=hi','/?lang=ja','/?lang=ar','/?lang=zh-CN','/?lang=es-ES','/?lang=fr-FR','/?lang=en-GB','/contact','/cv-maker','/ar/cv-maker','/zh-cn/cv-maker','/report','/privacy','/privacy-policy','/terms','/faq','/about','/services','/templates','/guides','/dashboard','/next-steps','/refund-policy','/not-a-real-route','/BingSiteAuth.xml','/api/complaints/x']) reqs.push(['https://formzalo.com'+p,'GET']);
reqs.push(['https://www.formzalo.com/contact?lang=hi','GET'],['http://www.formzalo.com/','GET'],['https://www.formzalo.com/','HEAD']);
const out={};
for(const [u,m] of reqs){ try{const r=await app.fetch(new Request(u,{method:m,redirect:'manual'}),env,{waitUntil(){}}); const t=m==='HEAD'?'':await r.text(); out[m+' '+u]={status:r.status,loc:r.headers.get('location'),ct:r.headers.get('content-type'),body:t};}catch(e){out[m+' '+u]={error:String(e)}} }
await fs.writeFile(`${flavor}-responses.json`,JSON.stringify(out,null,1));
console.log(flavor,Object.keys(out).length);
