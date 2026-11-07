import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { manifest, policy, renderAssets, renderRobots, checkGenerated, validateManifest } from './generate-ai-assets.mjs';
import { validateSitemap, validateSourceFacts } from './validate-ai-assets.mjs';
const root = new URL('../',import.meta.url);
function parseGroups(text) {
 const groups=[]; let group;
 for(const raw of text.split('\n')) {
  const line=raw.split('#')[0].trim();if(!line)continue;
  const i=line.indexOf(':'); const key=line.slice(0,i).toLowerCase(),value=line.slice(i+1).trim();
  if(key==='user-agent'){group={token:value,rules:[]};groups.push(group);}
  else if(['allow','disallow'].includes(key))group.rules.push({allow:key==='allow',path:value});
 }
 return groups;
}
// Exact documented robots tokens are used here; longest matching path wins,
// with Allow winning an equal-specificity tie (Google/RFC behavior).
function allowed(text, token, path) {
 const groups=parseGroups(text);const specific=groups.filter(g=>g.token.toLowerCase()===token.toLowerCase());
 const applicable=specific.length?specific:groups.filter(g=>g.token==='*');
 const matches=applicable.flatMap(g=>g.rules).filter(r=>r.path && path.startsWith(r.path));
 matches.sort((a,b)=>b.path.length-a.path.length || Number(b.allow)-Number(a.allow));
 return matches[0]?.allow ?? true;
}
const agents=['Googlebot','bingbot','OAI-SearchBot','Claude-SearchBot','PerplexityBot','Applebot','ChatGPT-User','Claude-User','Perplexity-User','Otherbot'];
test('all six generated files are deterministic and current',()=>{assert.deepEqual([...renderAssets()], [...renderAssets()]);checkGenerated();});
test('public machine product exactly matches canonical manifest and schema',()=>{validateManifest(manifest);assert.deepEqual(JSON.parse(readFileSync(new URL('public/ai-product.json',root),'utf8')),manifest);});
test('manifest facts match current source contract',()=>{assert.equal(validateSourceFacts(),true);});
test('free product facts cannot silently claim no signup, unlimited quota, Word or active AI',()=>{for(const change of [m=>m.freeCv.signInRequiredForEditor=false,m=>m.freeCv.numericDailyQuota=999,m=>m.freeCv.formats.push('docx'),m=>m.generativeAi.activeModelIntegrationVerified=true]){const m=structuredClone(manifest);change(m);assert.throws(()=>validateManifest(m));}});
test('existing public contact is not an invented mailbox',()=>{assert.equal(manifest.support.publicEmail,'team@formzalo.com');assert.equal(manifest.support.mailboxDeliverabilityTested,false);});
test('UI, OCR, output-heading and sitemap language scopes remain distinct',()=>{assert.equal(manifest.languages.uiLocaleIds.length,8);assert.equal(manifest.languages.baseLanguageCount,7);assert.deepEqual(manifest.documentReader.ocrLanguageCodes,['eng']);assert.equal(manifest.sitemap.localeIds.length,5);assert.equal(manifest.languages.unicodePdfValidation,'not_completed');});
test('default preserves allow training decision',()=>{assert.equal(policy.trainingPolicy,'allow');for(const a of ['GPTBot','ClaudeBot','Google-Extended','Applebot-Extended','CCBot'])assert.equal(allowed(renderRobots(),a,'/'),true);});
test('every named allow group repeats all sensitive exclusions',()=>{for(const group of parseGroups(renderRobots()))for(const path of policy.protectedPaths)assert.ok(group.rules.some(r=>!r.allow && r.path===path),`${group.token}: ${path}`);});
test('search and user-fetch public access unchanged under training toggle',()=>{for(const trainingPolicy of ['allow','deny'])for(const a of agents)for(const path of ['/','/templates','/guides/cv-for-freshers'])assert.equal(allowed(renderRobots({...policy,trainingPolicy}),a,path),true,`${trainingPolicy}: ${a} ${path}`);});
test('named groups cannot override sensitive-path exclusions under either policy',()=>{for(const trainingPolicy of ['allow','deny'])for(const a of [...agents,'GPTBot','ClaudeBot','Google-Extended','Applebot-Extended'])for(const path of ['/api/paid-export/status','/c/example','/dashboard'])assert.equal(allowed(renderRobots({...policy,trainingPolicy}),a,path),false,`${trainingPolicy}: ${a} ${path}`);});
test('deny controls only verified training tokens, not a blanket undocumented provider policy',()=>{const text=renderRobots({...policy,trainingPolicy:'deny'});for(const a of ['GPTBot','ClaudeBot','Google-Extended','Applebot-Extended'])assert.equal(allowed(text,a,'/templates'),false);assert.equal(allowed(text,'CCBot','/templates'),true);assert.doesNotMatch(text,/User-agent: Bravebot/);});
test('invalid training value cannot silently produce a policy',()=>{assert.throws(()=>renderRobots({...policy,trainingPolicy:'maybe'}));});
test('sitemap XML, 42 canonical implemented URLs and reciprocal alternates',()=>{assert.equal(validateSitemap(),42);});
test('sitemap rejects malformed XML, foreign/new routes, duplicate URLs and fake future lastmod',()=>{const xml=readFileSync(new URL('public/sitemap.xml',root),'utf8');for(const bad of [xml.replace('</urlset>',''),xml.replace('https://formzalo.com/','https://example.com/'),xml.replace('https://formzalo.com/en/templates/','https://formzalo.com/ru/'),xml.replace('<loc>','<lastmod>2099-01-01</lastmod><loc>'),xml.replace('https://formzalo.com/en/services/','https://formzalo.com/en/')])assert.throws(()=>validateSitemap(bad));});
test('all generated summaries disclose dated availability and no visibility guarantee',()=>{for(const [path,text] of renderAssets())if(/\.(txt|md)$/.test(path) && !path.endsWith('robots.txt')){assert.ok(text.includes(manifest.paidCheckout.observedAt));assert.match(text,/not guarantee|not universal|non-guaranteed/);assert.doesNotMatch(text,/Free watermarked download|one clean CV download OR one form fill/);}});

test('generated public facts contain no credential material or fabricated contact aliases',()=>{for(const [,text] of renderAssets()){assert.doesNotMatch(text,/service_role|BEGIN (?:RSA |EC )?PRIVATE KEY|access_token|refresh_token|eyJ[A-Za-z0-9_-]{30,}/);assert.doesNotMatch(text,/(?:support|hello|billing|contact)@formzalo\.com/);}});
