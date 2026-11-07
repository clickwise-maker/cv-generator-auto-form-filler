// Explicit opt-in integration check. Requires build:render; never invokes migrations,
// browsers, authentication or public network services. DB points at closed loopback.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {registry,publicUrl,publicAlternates,resolvePublicRoute,canonicalRedirect,legacyPublicRoute} from '../src/lib/public-locale-routing.mjs';
const origin='http://127.0.0.1:4148';
const catalogs=Object.fromEntries(registry.activeLocales.map(l=>[l,JSON.parse(readFileSync(new URL(`../src/content/public-locales/${l}.json`,import.meta.url),'utf8'))]));
const manifest=JSON.parse(readFileSync(new URL('../docs/ai-discovery/product-manifest.json',import.meta.url),'utf8'));
let logs='';
const child=spawn(process.execPath,['.output/server/index.mjs'],{cwd:new URL('../',import.meta.url),env:{PATH:process.env.PATH,NODE_ENV:'production',NITRO_HOST:'127.0.0.1',NITRO_PORT:'4148',DATABASE_URL:'postgresql://disabled:disabled@127.0.0.1:1/disabled?connect_timeout=1'},stdio:['ignore','pipe','pipe']});
child.stdout.on('data',s=>logs+=s);child.stderr.on('data',s=>logs+=s);
const decode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;|&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const attributes=s=>Object.fromEntries([...s.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m=>[m[1].toLowerCase(),decode(m[2])]));
const links=html=>[...html.matchAll(/<link\b[^>]*>/gi)].map(m=>attributes(m[0]));
async function page(path){const response=await fetch(origin+path,{redirect:'manual',signal:AbortSignal.timeout(20000)});return{status:response.status,location:response.headers.get('location'),html:await response.text()};}
function check(path,html){const match=resolvePublicRoute(path),copy=catalogs[match.locale],p=copy.pages[match.page];const htmlAttrs=attributes(html.match(/<html\b[^>]*>/i)?.[0]??'');assert.equal(htmlAttrs.lang,match.languageTag,path);assert.equal(htmlAttrs.dir,match.dir,path);assert.equal(decode(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]??''),p.h1,path);assert.equal(decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]??''),p.title+' | formzolo',path);const anchors=[...html.matchAll(/<a\b[^>]*>/gi)].map(m=>attributes(m[0]));assert.ok(anchors.some(a=>a.href===`/?lang=${encodeURIComponent(registry.locales[match.locale].appLocale)}#signin`));if(match.page==='templates')for(const template of ['meridian','consulate','atlas'])assert.ok(anchors.some(a=>a.href===`/?lang=${encodeURIComponent(registry.locales[match.locale].appLocale)}&template=${template}#signin`));const ls=links(html);assert.deepEqual(ls.filter(l=>l.rel==='canonical').map(l=>l.href),[publicUrl(match.locale,match.page)]);assert.deepEqual(ls.filter(l=>l.rel==='alternate'&&l.hreflang).map(l=>[l.hreflang,l.href]).sort(),publicAlternates(match.locale,match.page).map(l=>[l.hrefLang,l.href]).sort());const schemas=[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].flatMap(m=>{const s=JSON.parse(m[1]);return s['@graph']??[s];});assert.equal(schemas.find(s=>s['@type']==='WebPage')?.inLanguage,match.languageTag);assert.deepEqual(anchors.filter(a=>a.hreflang).map(a=>[a.hreflang,a.href]).sort(),publicAlternates(match.locale,match.page).filter(a=>a.hrefLang!=='x-default').map(a=>[a.hrefLang,a.href]).sort());const metas=[...html.matchAll(/<meta\b[^>]*>/gi)].map(m=>attributes(m[0]));assert.equal(metas.find(m=>m.name==='description')?.content,p.description);if(match.page==='faq'){assert.ok(!schemas.some(s=>s['@type']==='FAQPage'));for(const q of copy.faq){assert.ok(decode(html).includes(q.question));assert.ok(decode(html).includes(q.answer));}}checkGraph(path,html);}
const pages=new Map();
function checkGraph(path,html){
 const canonical='https://formzalo.com'+path;
 const schemas=[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].flatMap(m=>{const s=JSON.parse(m[1]);return s['@graph']??[s];});
 assert.equal(new Set(schemas.map(n=>n['@id'])).size,schemas.length,path+' unique schema ids');
 for(const type of ['Organization','WebSite','WebPage'])assert.equal(schemas.filter(n=>n['@type']===type).length,1,path+' '+type);
 assert.ok(!schemas.some(n=>['FAQPage','Product','Offer','OfferCatalog','AggregateRating'].includes(n['@type'])));
 const title=decode(html.match(/<title>([\s\S]*?)<\/title>/i)[1]);const metas=[...html.matchAll(/<meta\b[^>]*>/gi)].map(m=>attributes(m[0]));
 const web=schemas.find(s=>s['@type']==='WebPage');assert.equal(web.url,canonical);assert.equal(web.name,title);assert.equal(web.description,metas.find(m=>m.name==='description')?.content);
 for(const field of ['og:title','twitter:title'])assert.equal(metas.find(m=>(m.property??m.name)===field)?.content,title,path+field);
 for(const field of ['og:description','twitter:description'])assert.equal(metas.find(m=>(m.property??m.name)===field)?.content,web.description,path+field);
 assert.equal(metas.find(m=>m.property==='og:url')?.content,canonical);assert.deepEqual(links(html).filter(l=>l.rel==='canonical').map(l=>l.href),[canonical]);
 const match=resolvePublicRoute(path),app=schemas.filter(n=>n['@type']==='SoftwareApplication');assert.equal(app.length,match?.page==='home'?1:0);
 const crumb=schemas.find(n=>n['@type']==='BreadcrumbList');if(!match||match.page!=='home'){assert.ok(crumb,path+' breadcrumb');assert.equal(crumb.itemListElement.at(-1).item,canonical);for(const item of crumb.itemListElement){assert.ok(decode(html).includes(item.name),path+' visible breadcrumb');}}
 if(!match){assert.equal(web.inLanguage,'en');assert.deepEqual(links(html).filter(l=>l.rel==='alternate'&&l.hreflang).map(l=>l.hreflang).sort(),['en','x-default']);}
 pages.set(path,html);
}

try{
 let ready=false;for(let i=0;i<100;i++){if(child.exitCode!==null)throw Error('SSR process exited: '+logs);try{await page('/en/');ready=true;break;}catch{await new Promise(r=>setTimeout(r,100));}}assert.ok(ready,'SSR did not start');
 // Real simultaneous router requests; do not touch the singleton legacy locale store.
 await Promise.all(registry.activeLocales.flatMap(l=>registry.pages.map(async p=>{const path=new URL(publicUrl(l,p)).pathname;const r=await page(path);assert.equal(r.status,200,path);check(path,r.html);})));
 for(let i=0;i<3;i++)await Promise.all(registry.activeLocales.map(async l=>{const path='/'+l+'/';const r=await page(path);assert.equal(r.status,200);check(path,r.html);}));
 for(const [from,to]of [['/AR/faq','/ar/faq/'],['/es','/es/'],['/pl/faq/?lang=hi','/pl/faq/'],['/templates?lang=hi&ref=old','/hi/templates/?ref=old'],['/services?lang=es-ES','/es/services/'],['/about','/en/about/'],['/ZH-CN/faq?lang=hi','/zh-cn/faq/'],['/templates?lang=zh-CN','/zh-cn/templates/'],['/templates?lang=fr-FR','/fr/templates/'],['/templates?lang=ja','/ja/templates/']]){const r=await page(from);assert.equal(r.status,301,from);assert.equal(r.location,to,from);const target=await page(to);assert.equal(target.status,200,to);check(new URL(to,origin).pathname,target.html);}
 for(const l of ['ko','it','nl','tr','sv','zz','xx']){assert.equal((await page('/'+l+'/')).status,404,l);}
 for(const path of registry.legacyEnglishPaths){const r=await page(path);assert.equal(r.status,200,path);checkGraph(path,r.html);}
 const paths=new Set(manifest.publicPaths),visited=new Set(),queue=['/en/'];
 while(queue.length){const path=queue.shift();if(visited.has(path))continue;visited.add(path);for(const m of pages.get(path).matchAll(/<a\b[^>]*>/gi)){const href=attributes(m[0]).href;if(!href)continue;let u;try{u=new URL(href,'https://formzalo.com'+path);}catch{continue;}if(u.origin!=='https://formzalo.com')continue;const r=canonicalRedirect(u.href);const alias=legacyPublicRoute(u.pathname,u.searchParams.get('lang')??undefined);const candidate=r?new URL(r,u.origin).pathname:alias?new URL(alias.url).pathname:u.pathname;if(paths.has(candidate)&&!visited.has(candidate))queue.push(candidate);}}
 assert.equal(visited.size,84,'All canonical pages reachable from English home through real anchors');
 const legacy=await page('/?lang=hi');assert.equal(legacy.status,200,'legacy editor entry remains alive');assert.deepEqual(links(legacy.html).filter(l=>l.rel==='canonical').map(l=>l.href),[publicUrl('hi')]);
 assert.doesNotMatch(logs,/PGLite|Applying migration|ECONNREFUSED|\[db\]/,'Unexpected DB activity');
 console.log(JSON.stringify({canonicalLocalizedPages:72,sitemapRoutesWith200:manifest.publicPaths.length,mixedLocaleConcurrentRequests:108,canonicalRedirectCases:10,unrequestedLocales404:7,legacyEditorEntry:'200; new canonical',visibleFAQWithoutRichResultMarkup:'twelve locales pass',structuralSchemaAndSocialParity:84,internalCrawlGraphReachable:84,database:'disabled; no DB activity',browserHydration:'not tested',mobileVisual:'not tested'}));
}catch(error){console.error(logs);throw error;}finally{child.kill('SIGTERM');}
