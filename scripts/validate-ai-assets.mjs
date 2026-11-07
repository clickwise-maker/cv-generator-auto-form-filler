import assert from 'node:assert/strict';
import { resolvePublicRoute, publicAlternates } from '../src/lib/public-locale-routing.mjs';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { checkGenerated, manifest, validateManifest } from './generate-ai-assets.mjs';
const root = new URL('../', import.meta.url);
export function validateSitemap(xml = readFileSync(new URL('public/sitemap.xml', root), 'utf8'), m = manifest) {
  const parsed = spawnSync('python3', ['-c', `import sys,json,xml.etree.ElementTree as E
r=E.fromstring(sys.stdin.read())
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9','x':'http://www.w3.org/1999/xhtml'}
assert r.tag=='{'+ns['s']+'}urlset','Expected sitemap urlset namespace'
rows=[]
for u in r:
 assert u.tag=='{'+ns['s']+'}url','Unexpected urlset child'
 assert len(u.findall('s:loc',ns))==1,'Expected exactly one loc'
 rows.append({'loc':u.find('s:loc',ns).text,'lastmod':[x.text for x in u.findall('s:lastmod',ns)],'alternates':[dict(x.attrib) for x in u.findall('x:link',ns)]})
print(json.dumps(rows))`], {input:xml, encoding:'utf8', timeout:5000, maxBuffer:1024*1024});
  assert.equal(parsed.status, 0, `Sitemap XML parse failed: ${parsed.error?.message ?? parsed.stderr}`);
  const rows = JSON.parse(parsed.stdout);
  const expected = new Set(m.publicPaths.map(path => m.canonicalOrigin+path));
  assert.equal(rows.length, m.sitemap.expectedUrlCount);
  assert.equal(new Set(rows.map(r => r.loc)).size, rows.length, 'duplicate loc');
  assert.deepEqual(new Set(rows.map(r => r.loc)), expected, 'only implemented canonical routes');
  for (const row of rows) {
    const url=new URL(row.loc); assert.equal(url.origin,m.canonicalOrigin); assert.equal(url.hash,''); assert.equal(url.search,'');
    const match=resolvePublicRoute(url.pathname);
    const links=match?publicAlternates(match.locale,match.page).map(({hrefLang,href})=>({rel:'alternate',hreflang:hrefLang,href})):[];
    assert.deepEqual(row.alternates,links,`${row.loc}: reciprocal hreflang/x-default parity`);
    assert.deepEqual(row.lastmod,[],'No invented lastmod dates');
  }
  return rows.length;
}
export function validateSourceFacts(m = manifest) {
  validateManifest(m);
  const text = path => readFileSync(new URL(path, root),'utf8');
  const reader=text('src/lib/cv/read-document.ts');
  assert.match(reader,/file\.size > 12 \* 1024 \* 1024/);
  assert.match(reader,/Math\.min\(pdf\.numPages \|\| 1, 2\)/);
  assert.match(reader,/createWorker\("eng"/);
  assert.match(text('src/components/landing/auth-gate.tsx'),/if \(session\) return/);
  assert.match(text('src/routes/index.tsx'),/<AuthGate>/);
  const preview=text('src/components/studio/preview-doc.tsx');
  assert.match(preview,/downloadCvPdf\(layeredProfile\(\), current, style\)/);
  assert.match(preview,/if \(!session\)/);
  for(const style of m.freeCv.styles) assert.ok(preview.includes(`download("${style}")`));
  assert.ok(text('src/routes/services.tsx').includes(m.support.publicEmail));
  const langs=text('src/lib/i18n/i18n.ts');
  for(const lang of m.languages.uiLocaleIds) assert.ok(langs.includes(`id: "${lang}"`));
  return true;
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
  validateSourceFacts(); checkGenerated();
  console.log(JSON.stringify({generatedAssets:6,sitemapUrls:validateSitemap(),sourceFacts:'pass',runtimeObservation:'dated snapshot; not re-fetched by this validator'}));
}
