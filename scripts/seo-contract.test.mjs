import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const robots = readFileSync(new URL('../public/robots.txt', import.meta.url), 'utf8');
const seo = readFileSync(new URL('../src/lib/seo-locales.ts', import.meta.url), 'utf8');

test('named crawler groups cannot bypass the shared crawl exclusions', () => {
  assert.deepEqual([...robots.matchAll(/^User-agent:\s*(.+)$/gmi)].map(m => m[1].trim()), ['*']);
  for (const path of ['/c/', '/api/', '/dashboard']) {
    assert.ok(robots.split('\n').includes(`Disallow: ${path}`));
  }
  assert.ok(robots.split('\n').includes('Allow: /'));
});

test('robots advertises the canonical production sitemap', () => {
  assert.match(robots, /^Sitemap: https:\/\/formzalo\.com\/sitemap\.xml$/m);
});

test('India homepage descriptions do not advertise paused legal modules', () => {
  assert.doesNotMatch(seo, /affidavit|vakalatnama|शपथ पत्र|कानूनी ड्राफ्टिंग/i);
});

test('India homepage descriptions reflect sign-in and free watermark-free PDF downloads', () => {
  assert.match(seo, /Sign in to create your resume and download free Color and Plain PDFs with no watermark/);
  assert.match(seo, /साइन इन करके बिना वॉटरमार्क के रंगीन और सादा PDF मुफ़्त डाउनलोड करें/);
});
