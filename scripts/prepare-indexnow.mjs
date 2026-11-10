// OFFLINE ONLY. No network client, key creation, hosted key file or automatic hook.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {canonicalRedirect} from '../src/lib/public-locale-routing.mjs';
const manifest=JSON.parse(readFileSync(new URL('../docs/ai-discovery/product-manifest.json',import.meta.url),'utf8'));
export const ENDPOINT='https://api.indexnow.org/indexnow';
export function prepareIndexNow(config,urls){
 assert.equal(config.enabled,false,'Networking is not implemented; configuration must remain disabled');
 assert.equal(config.endpoint,ENDPOINT);assert.equal(config.host,'formzalo.com');
 assert.ok(Array.isArray(urls)&&urls.length>0&&urls.length<=10000,'Provide 1–10000 recently changed canonical public URLs');
 const allowed=new Set(manifest.publicPaths.map(p=>manifest.canonicalOrigin+p));
 const normalized=[...new Set(urls.map(value=>{
  assert.equal(typeof value,'string');const u=new URL(value);
  assert.equal(u.origin,manifest.canonicalOrigin,'Canonical HTTPS apex required');assert.equal(u.username+u.password+u.search+u.hash,'','No credentials, queries or fragments');
  const redirect=canonicalRedirect(u.href);const result=redirect?new URL(redirect,manifest.canonicalOrigin).href:u.href;
  assert.ok(allowed.has(result),'Only registry public canonical pages; no private/auth/API/token paths');return result;
 }))];
 if(config.key===null){assert.equal(config.keyLocation,null);return{mode:'dry-run',submissionAllowed:false,status:'BLOCKED: no key, live key verification or approved deployment',endpoint:ENDPOINT,urlList:normalized,payload:null};}
 assert.match(config.key,/^[a-zA-Z0-9-]{8,128}$/);
 assert.equal(config.keyLocation,manifest.canonicalOrigin+'/'+config.key+'.txt','Root-hosted matching key file only');
 return{mode:'dry-run',submissionAllowed:false,status:'DRAFT ONLY: public key hosting/ownership and deployment not verified here',endpoint:ENDPOINT,payload:{host:config.host,key:config.key,keyLocation:config.keyLocation,urlList:normalized}};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const args=process.argv.slice(2);assert.equal(args.shift(),'--dry-run','Only --dry-run is supported; no submit mode exists');
 const config=JSON.parse(readFileSync(args.shift()??new URL('../docs/ai-discovery/indexnow.config.example.json',import.meta.url),'utf8'));
 console.log(JSON.stringify(prepareIndexNow(config,args.length?args:['https://formzalo.com/en/']),null,2));
}
