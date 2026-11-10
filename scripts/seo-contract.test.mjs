import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const robots = readFileSync(new URL('../public/robots.txt', import.meta.url), 'utf8');
const seo = readFileSync(new URL('../src/lib/seo-locales.ts', import.meta.url), 'utf8');

test('every named crawler group repeats the shared crawl exclusions', () => {
  const groups = robots.split(/\n\s*\n/).filter((g) => /^User-agent:/mi.test(g));
  assert.ok(groups.length >= 1);
  for (const g of groups) {
    const lines = g.split('\n').map((l) => l.trim());
    assert.ok(lines.includes('Allow: /'), g);
    for (const path of ['/c/', '/api/', '/dashboard']) {
      assert.ok(lines.includes(`Disallow: ${path}`), `${path} missing in group:\n${g}`);
    }
  }
});

test('robots advertises the canonical production sitemap', () => {
  assert.match(robots, /^Sitemap: https:\/\/formzalo\.com\/sitemap\.xml$/m);
});

test('India homepage descriptions do not advertise paused legal modules', () => {
  assert.doesNotMatch(seo, /affidavit|vakalatnama|शपथ पत्र|कानूनी ड्राफ्टिंग/i);
});
