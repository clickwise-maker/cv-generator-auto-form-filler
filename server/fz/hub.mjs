/* eslint-disable @typescript-eslint/ban-ts-comment, no-undef, @typescript-eslint/no-unused-vars */
// @ts-nocheck
// FormZalo Opportunities Hub + range-capable hero video + post-hydration promo (2026-11-10, approved by owner).
// Self-contained: no changes to the TanStack app, locales, ads flags, ads.txt or auth. Wired in by server/middleware/fz-hub.ts.
// Data: ./opportunities.json (59 entries, 'iso' deadline => auto-removed after it passes).
import DATA from "./opportunities.json" with { type: "json" };
const SITE = "https://formzalo.com";
const ADSENSE = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5439325240008654";
const CONTACT = "team@formzalo.com";

const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function liveItems(now) {
  return DATA.items.filter((x) => !x.iso || Date.parse(x.iso) > now);
}

function card(x) {
  const rel = x.aff ? "nofollow sponsored noopener noreferrer" : "noopener noreferrer";
  const badges = [];
  if (x.aff) badges.push('<span class="fz-badge fz-badge-aff" title="Affiliate, referral or sponsored programme">Affiliate / Sponsored</span>');
  if (x.new) badges.push('<span class="fz-badge fz-badge-new">New</span>');
  badges.push('<span class="fz-badge fz-badge-' + (x.ik === "unk" ? "muted" : "in") + '">' + esc(x.il) + "</span>");
  return '<article class="fz-card" data-in="' + (x.ik === "unk" ? "0" : "1") + '" data-q="' + esc((x.name + " " + x.org + " " + x.desc).toLowerCase()) + '">' +
    '<div class="fz-badges">' + badges.join("") + "</div>" +
    '<h3 class="fz-card-title">' + esc(x.name) + "</h3>" +
    '<p class="fz-org">' + esc(x.org) + "</p>" +
    '<p class="fz-desc">' + esc(x.desc) + "</p>" +
    '<dl class="fz-meta"><div><dt>Eligibility</dt><dd>' + esc(x.elig) + "</dd></div>" +
    '<div><dt>Deadline</dt><dd>' + esc(x.dl) + "</dd></div></dl>" +
    (x.aff ? '<p class="fz-disc"><strong>Disclosure:</strong> this is an affiliate, referral or sponsored programme. FormZalo may earn a commission or fee if you join through links we mark this way. It does not change what you pay.</p>' : "") +
    '<a class="fz-btn" href="' + esc(x.url) + '" target="_blank" rel="' + rel + '">Open official page <span aria-hidden="true">\u2197</span></a>' +
    "</article>";
}

const HUB_CSS = `
:root{--forest:#1b4d3e;--forest-deep:#102e26;--ink:#1c1915;--line:#e3dacb;--muted:#5c554c;--paper:#f3eee4;--sheet:#fffdf8;--brass:#a68456;--brass-soft:#f3eadc;--mist:#d7e6de}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--paper);color:var(--ink);font-family:"Outfit",ui-sans-serif,system-ui,sans-serif;line-height:1.5}
a{color:inherit}h1,h2,h3,.serif{font-family:"Fraunces","Iowan Old Style",Georgia,serif;font-weight:560}
.fz-wrap{max-width:72rem;margin:0 auto;padding:0 1rem}
header.fz-top{position:sticky;top:0;z-index:30;border-bottom:1px solid var(--line);background:rgba(243,238,228,.95);backdrop-filter:blur(4px)}
.fz-top .fz-wrap{display:flex;flex-wrap:wrap;align-items:center;gap:.25rem;padding-top:.75rem;padding-bottom:.75rem}
.fz-logo{display:flex;align-items:center;gap:.75rem;text-decoration:none;margin-inline-end:.5rem}
.fz-mark{display:grid;place-items:center;width:2.25rem;height:2.25rem;border-radius:.5rem;background:var(--forest);color:var(--sheet);font-family:"Fraunces",Georgia,serif;font-size:.875rem}
.fz-logo b{display:block;font-family:"Fraunces",Georgia,serif;font-size:1.125rem;line-height:1;font-weight:560}
.fz-logo small{display:block;font-size:.75rem;color:var(--muted)}
.fz-nav{margin-inline-start:auto;display:flex;flex-wrap:wrap;align-items:center}
.fz-nav a{height:2.75rem;display:flex;align-items:center;padding:0 .5rem;font-size:.875rem;font-weight:500;color:var(--forest);text-decoration:none}
.fz-nav a[aria-current=page]{color:var(--ink);text-decoration:underline;text-underline-offset:4px}
.fz-hero{padding:2.5rem 0 1.5rem}
.fz-kicker{letter-spacing:.16em;text-transform:uppercase;font-size:.72rem;font-weight:600;color:var(--forest);margin:0}
.fz-hero h1{margin:.6rem 0 0;font-size:clamp(2rem,5vw,3rem);line-height:1.15}
.fz-hero p.lead{margin:.9rem 0 0;max-width:46rem;color:var(--muted);font-size:1.05rem}
.fz-notice{margin:1.25rem 0 0;border:1px solid var(--brass);background:var(--brass-soft);border-radius:.75rem;padding:.9rem 1rem;font-size:.875rem}
.fz-notice strong{font-weight:600}
.fz-tools{margin-top:1.5rem;display:flex;flex-wrap:wrap;gap:.5rem;align-items:center}
.fz-chip{border:1px solid var(--line);background:var(--sheet);color:var(--forest);border-radius:999px;padding:.4rem .85rem;font:500 .85rem "Outfit",sans-serif;cursor:pointer}
.fz-chip[aria-pressed=true]{background:var(--forest);color:var(--sheet);border-color:var(--forest)}
.fz-search{margin-top:.75rem;display:flex;flex-wrap:wrap;gap:.75rem;align-items:center}
.fz-search input[type=search]{flex:1 1 14rem;max-width:24rem;border:1px solid var(--line);border-radius:999px;background:var(--sheet);padding:.5rem 1rem;font:400 .9rem "Outfit",sans-serif}
.fz-search label{font-size:.85rem;color:var(--muted);display:flex;gap:.4rem;align-items:center}
.fz-count{font-size:.85rem;color:var(--muted)}
.fz-layout{display:grid;gap:2rem;margin-top:1.5rem;padding-bottom:3rem}
@media(min-width:62rem){.fz-layout{grid-template-columns:minmax(0,1fr) 17rem;align-items:start}}
.fz-sec{margin-bottom:2.25rem}
.fz-sec h2{margin:0;font-size:1.5rem}.fz-sec .fz-sub{margin:.25rem 0 0;color:var(--muted);font-size:.875rem}
.fz-grid{display:grid;gap:1rem;margin-top:1rem;grid-template-columns:repeat(auto-fill,minmax(18.5rem,1fr))}
.fz-card{display:flex;flex-direction:column;border:1px solid var(--line);background:var(--sheet);border-radius:.75rem;padding:1.1rem;box-shadow:0 1px 0 var(--line),0 12px 28px #1c19150d}
.fz-card[hidden],.fz-sec[hidden]{display:none}
.fz-badges{display:flex;flex-wrap:wrap;gap:.35rem}
.fz-badge{font-size:.7rem;font-weight:600;border-radius:999px;padding:.15rem .6rem;border:1px solid var(--line);color:var(--muted);background:var(--paper)}
.fz-badge-aff{background:var(--brass-soft);border-color:var(--brass);color:#6d5330}
.fz-badge-new{background:var(--mist);border-color:var(--forest);color:var(--forest-deep)}
.fz-badge-in{background:#eaf3ee;border-color:#9bc2b0;color:var(--forest-deep)}
.fz-card-title{margin:.7rem 0 0;font-size:1.15rem;line-height:1.25}
.fz-org{margin:.1rem 0 0;font-size:.8rem;color:var(--muted)}
.fz-desc{margin:.6rem 0 0;font-size:.9rem}
.fz-meta{margin:.75rem 0 0;font-size:.82rem}.fz-meta div{margin-top:.35rem}.fz-meta dt{font-weight:600;display:inline}.fz-meta dt:after{content:": "}.fz-meta dd{display:inline;margin:0;color:var(--muted)}
.fz-disc{margin:.75rem 0 0;font-size:.75rem;color:#6d5330;background:var(--brass-soft);border-radius:.5rem;padding:.5rem .65rem}
.fz-btn{margin-top:auto;align-self:flex-start;display:inline-flex;align-items:center;gap:.4rem;height:2.5rem;padding:0 1.1rem;border-radius:999px;background:var(--forest);color:var(--sheet);font-size:.875rem;font-weight:500;text-decoration:none}
.fz-card .fz-btn{margin-top:1rem}
.fz-btn:hover{background:var(--forest-deep)}
aside.fz-side{position:sticky;top:5rem}
.fz-sponsor{border:2px dashed var(--brass);border-radius:.75rem;background:var(--brass-soft);padding:1.1rem;font-size:.875rem}
.fz-sponsor .tag{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:#6d5330}
.fz-sponsor h2{margin:.5rem 0 0;font-size:1.15rem}
.fz-sponsor p{margin:.5rem 0 0;color:var(--muted)}
.fz-sponsor a{color:var(--forest);font-weight:600}
.fz-foot-note{border-top:1px solid var(--line);padding:1.25rem 0;font-size:.8rem;color:var(--muted)}
footer.fz-footer{border-top:1px solid var(--line);background:var(--paper);padding:1.5rem 1rem;text-align:center;font-size:.75rem;color:rgba(28,25,21,.6)}
footer.fz-footer .serif{font-size:1rem;color:var(--ink);margin:0}footer.fz-footer p{margin:.25rem 0}
footer.fz-footer nav{margin-top:.75rem}footer.fz-footer a{text-underline-offset:2px}.fz-footer .sep{margin:0 .5rem}
.fz-empty{border:1px dashed var(--line);border-radius:.75rem;padding:1.5rem;text-align:center;color:var(--muted)}
.fz-skip{position:absolute;left:-999px}.fz-skip:focus{left:1rem;top:1rem;background:#fff;padding:.5rem;z-index:99}
`;

const HUB_JS = `(function(){
var chips=[].slice.call(document.querySelectorAll('.fz-chip'));
var secs=[].slice.call(document.querySelectorAll('.fz-sec'));
var q=document.getElementById('fz-q'),inOnly=document.getElementById('fz-in'),cnt=document.getElementById('fz-count'),empty=document.getElementById('fz-empty');
var cat='all';
function apply(){
 var term=(q.value||'').toLowerCase().trim(),only=inOnly.checked,shown=0,total=0;
 secs.forEach(function(s){
  var secShow=0;
  [].forEach.call(s.querySelectorAll('.fz-card'),function(c){
   total++;
   var ok=(cat==='all'||s.getAttribute('data-cat')===cat)&&(!term||c.getAttribute('data-q').indexOf(term)>-1)&&(!only||c.getAttribute('data-in')==='1');
   c.hidden=!ok;if(ok){secShow++;shown++;}
  });
  s.hidden=secShow===0;
 });
 cnt.textContent='Showing '+shown+' of '+total+' opportunities';
 empty.hidden=shown!==0;
}
chips.forEach(function(b){b.addEventListener('click',function(){cat=b.getAttribute('data-cat');chips.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});apply();});});
q.addEventListener('input',apply);inOnly.addEventListener('change',apply);apply();
})();`;

const SUBS = {
  "Affiliate & Referral Programs": "Publisher networks and brand programmes where you can earn commission by referring customers.",
  "Worldwide Dropshipping Opportunities": "Platforms and suppliers for starting a dropshipping or print-on-demand store from almost anywhere.",
  "Startup Credits & Benefits": "Cloud, software and government benefits for early-stage startups.",
  "Newly Launched Programs": "Partner and affiliate programmes announced in the last few weeks. Newer vendors have unproven payouts \u2014 do your own checks.",
  "Business & Income Opportunities": "Marketplaces and partner programmes for selling, publishing and creating online.",
  "Sponsored Tools & Offers": "Career and learning tools that run affiliate programmes. Links here are affiliate/sponsored programme pages.",
  "Application-based Opportunities": "Accelerators, grants and competitions with an application. Check deadlines on the official page.",
};

function slug(c) { return c.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

export function renderHub(now) {
  const items = liveItems(now);
  const secs = DATA.cats.map((c) => {
    const list = items.filter((x) => x.cat === c);
    if (!list.length) return "";
    return '<section class="fz-sec" id="' + slug(c) + '" data-cat="' + esc(c) + '" aria-labelledby="h-' + slug(c) + '"><h2 id="h-' + slug(c) + '">' + esc(c) + ' <span class="fz-count">(' + list.length + ')</span></h2><p class="fz-sub">' + esc(SUBS[c] || "") + '</p><div class="fz-grid">' + list.map(card).join("") + "</div></section>";
  }).join("");
  const chips = ['<button type="button" class="fz-chip" data-cat="all" aria-pressed="true">All (' + items.length + ")</button>"].concat(
    DATA.cats.map((c) => { const n = items.filter((x) => x.cat === c).length; return n ? '<button type="button" class="fz-chip" data-cat="' + esc(c) + '" aria-pressed="false">' + esc(c) + " (" + n + ")</button>" : ""; })
  ).join("");
  const title = "New Opportunities \u2014 Discover. Learn. Grow. | FormZalo";
  const desc = "Verified affiliate programmes, dropshipping platforms, startup credits, new partner programmes and application-based opportunities, each linked to the official page. Updated " + DATA.checked + ".";
  const ld = JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: "New Opportunities \u2014 Discover. Learn. Grow.", url: SITE + "/opportunities", description: desc, isPartOf: { "@type": "WebSite", name: "FormZalo", url: SITE } }).replace(/</g, "\\u003c");
  return '<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
    "<title>" + esc(title) + "</title>" +
    '<meta name="description" content="' + esc(desc) + '"><meta name="robots" content="index,follow"><meta name="theme-color" content="#1b4d3e">' +
    '<link rel="canonical" href="' + SITE + '/opportunities"><link rel="icon" type="image/svg+xml" href="/favicon.svg">' +
    '<meta property="og:type" content="website"><meta property="og:site_name" content="FormZalo"><meta property="og:title" content="' + esc(title) + '"><meta property="og:description" content="' + esc(desc) + '"><meta property="og:url" content="' + SITE + '/opportunities"><meta property="og:image" content="' + SITE + '/og.jpg"><meta name="twitter:card" content="summary_large_image">' +
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,650&family=Outfit:wght@400;500;600;700&display=swap">' +
    '<script src="' + ADSENSE + '" async="" crossorigin="anonymous"></script>' +
    "<style>" + HUB_CSS + '</style><script type="application/ld+json">' + ld + "</script></head><body>" +
    '<a class="fz-skip" href="#fz-main">Skip to content</a>' +
    '<header class="fz-top"><div class="fz-wrap"><a href="/" class="fz-logo" aria-label="FormZalo home"><span class="fz-mark" aria-hidden="true">FZ</span><span><b>FormZalo</b><small>Free CV generator &amp; auto form filler</small></span></a>' +
    '<nav class="fz-nav" aria-label="Main"><a href="/">CV generator</a><a href="/templates">Templates</a><a href="/guides">Guides</a><a href="/opportunities" aria-current="page">Opportunities</a><a href="/dashboard">Dashboard</a><a href="/about">About &amp; Contact</a></nav></div></header>' +
    '<main id="fz-main"><div class="fz-wrap"><div class="fz-hero"><p class="fz-kicker">Opportunities Hub</p><h1>New Opportunities \u2014 Discover. Learn. Grow.</h1>' +
    '<p class="lead">A hand-checked list of programmes you can join or apply to: affiliate networks, dropshipping platforms, startup credits, new partner programmes and accelerators. Every card links to the provider\u2019s own page.</p>' +
    '<div class="fz-notice" role="note"><strong>Disclosure:</strong> some listings are affiliate, referral or sponsored programmes and are labelled <em>Affiliate / Sponsored</em>. FormZalo may earn a commission or fee if you join through links marked that way, at no extra cost to you. Listings are not endorsements or guarantees of income, and we do not ask anyone to pay to be listed or to apply. Details were read from each provider\u2019s page on ' + esc(DATA.checked) + " and can change \u2014 always confirm eligibility, fees and deadlines on the official page. India eligibility is noted where the provider states it.</div>" +
    '<div class="fz-tools" role="group" aria-label="Filter by category">' + chips + "</div>" +
    '<div class="fz-search"><input id="fz-q" type="search" placeholder="Search opportunities" aria-label="Search opportunities"><label><input id="fz-in" type="checkbox"> India-eligible or India-specific only</label><span class="fz-count" id="fz-count" aria-live="polite">Showing ' + items.length + " of " + items.length + " opportunities</span></div></div>" +
    '<div class="fz-layout"><div>' + secs + '<p class="fz-empty" id="fz-empty" hidden>No opportunities match your filters.</p></div>' +
    '<aside class="fz-side" aria-label="Sponsored"><div class="fz-sponsor"><span class="tag">Sponsored</span><h2>Sponsored \u2014 your listing here</h2><p>Reach job-seekers, freelancers and founders who visit FormZalo. Sponsored listings will always be labelled.</p><p>Contact: <a href="mailto:' + CONTACT + '">' + CONTACT + '</a></p></div></aside></div>' +
    '<p class="fz-foot-note">Information as of ' + esc(DATA.checked) + ". Listings with a past deadline are removed automatically. Know an opportunity that should be here? Email <a href=\"mailto:" + CONTACT + "\">" + CONTACT + "</a>. This page is in English only.</p></div></main>" +
    '<footer class="fz-footer"><p class="serif">FormZalo</p><p>Free CV generator and auto form filler</p><p>Contact: <a href="mailto:partners@formzalo.com">partners@formzalo.com</a></p><nav><a href="/guides">Guides</a><span class="sep">\u00b7</span><a href="/templates">Templates</a><span class="sep">\u00b7</span><a href="/opportunities" aria-current="page">Opportunities</a><span class="sep">\u00b7</span><a href="/refund-policy">Refund Policy</a><span class="sep">\u00b7</span><a href="/services">Services &amp; Plans</a><span class="sep">\u00b7</span><a href="/privacy">Privacy &amp; DPDP</a><span class="sep">\u00b7</span><a href="/terms">Terms</a><span class="sep">\u00b7</span><a href="/faq">FAQ</a><span class="sep">\u00b7</span><a href="/about">About &amp; Contact</a><span class="sep">\u00b7</span><a href="/report">Report a problem</a></nav><p>\u00a9 2026 FormZalo. All rights reserved.</p></footer>' +
    "<script>" + HUB_JS + "</script></body></html>";
}

// ---- Range-capable copy of the hero video (static assets layer answers Range with a full 200) ----
let videoBytes = null;
async function serveVideo(request, env, url) {
  if (!videoBytes) {
    const r = env && env.ASSETS ? await env.ASSETS.fetch(new Request(url.origin + "/hero-video.mp4")) : await fetch(url.origin + "/hero-video.mp4");
    if (!r.ok) return new Response("Not found", { status: 404 });
    videoBytes = new Uint8Array(await r.arrayBuffer());
  }
  const size = videoBytes.byteLength;
  const base = { "content-type": "video/mp4", "accept-ranges": "bytes", "cache-control": "public, max-age=86400", "x-content-type-options": "nosniff" };
  const range = request.headers.get("range");
  if (range) {
    const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    if (m && (m[1] !== "" || m[2] !== "")) {
      let start, end;
      if (m[1] === "") { const n = parseInt(m[2], 10); start = Math.max(0, size - n); end = size - 1; }
      else { start = parseInt(m[1], 10); end = m[2] === "" ? size - 1 : Math.min(parseInt(m[2], 10), size - 1); }
      if (start >= size || start > end) return new Response(null, { status: 416, headers: { ...base, "content-range": "bytes */" + size } });
      return new Response(request.method === "HEAD" ? null : videoBytes.slice(start, end + 1), { status: 206, headers: { ...base, "content-range": "bytes " + start + "-" + end + "/" + size, "content-length": String(end - start + 1) } });
    }
  }
  return new Response(request.method === "HEAD" ? null : videoBytes, { status: 200, headers: { ...base, "content-length": String(size) } });
}

// Handles routes that this module owns. Returns a Response, or undefined to fall through to the app.
export async function fzHandle(request, env, url) {
  const p = url.pathname;
  const get = request.method === "GET" || request.method === "HEAD";
  if (!get) return undefined;
  if (p === "/opportunities" || p === "/opportunities/") {
    const html = renderHub(Date.now());
    return new Response(request.method === "HEAD" ? null : html, { status: 200, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=300", "x-content-type-options": "nosniff", "referrer-policy": "strict-origin-when-cross-origin", "strict-transport-security": "max-age=31536000; includeSubDomains" } });
  }
  if (p === "/media/hero-video.mp4") return serveVideo(request, env, url);
  if (p === "/sitemap-opportunities.xml") {
    const body = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + SITE + "/opportunities</loc><lastmod>" + DATA.checked + "</lastmod><changefreq>weekly</changefreq></url></urlset>\n";
    return new Response(request.method === "HEAD" ? null : body, { status: 200, headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
  }
  return undefined;
}

// ---- Additive HTML injection on SSR pages (appended at the end of <body>; scripts/styles only, run after hydration) ----
const INJECT = `<style id="fz-opps-css">
@media (max-width:767px){video[poster="/hero-video-poster.jpg"]{display:block!important}img[src="/hero-video-poster.jpg"].md\\:hidden{display:none!important}}
.fz-opps-promo{border-top:1px solid #e3dacb;background:#f3eadc;padding:1.5rem 1rem;font-family:Outfit,ui-sans-serif,system-ui,sans-serif;color:#1c1915}
.fz-opps-promo>div{max-width:72rem;margin:0 auto;display:flex;flex-wrap:wrap;gap:1rem;align-items:center;justify-content:space-between}
.fz-opps-promo b{display:block;font-family:Fraunces,Georgia,serif;font-size:1.25rem;font-weight:560}
.fz-opps-promo span.s{display:block;font-size:.875rem;color:#5c554c;margin-top:.25rem;max-width:44rem}
.fz-opps-promo a{display:inline-flex;align-items:center;height:2.75rem;padding:0 1.25rem;border-radius:999px;background:#1b4d3e;color:#fffdf8;font-weight:500;font-size:.9rem;text-decoration:none}
</style><script id="fz-opps-js">(function(){
var pageRe=/^\\/(?:(?:[a-z]{2}(?:-[A-Za-z]{2,4})?)(?:\\/(?:cv-maker)?)?|cv-maker)?\\/?$/;
function ensure(){try{
 var want=pageRe.test(location.pathname);
 var pr=document.getElementById('fz-opps-promo');
 if(want&&!pr){pr=document.createElement('aside');pr.id='fz-opps-promo';pr.className='fz-opps-promo';pr.setAttribute('aria-label','New opportunities');pr.innerHTML='<div><div><b>New Opportunities \\u2014 Discover. Learn. Grow.</b><span class="s">Affiliate programmes, dropshipping platforms, startup credits and application-based opportunities, each linked to the official page. Some listings are affiliate or sponsored and are labelled.</span></div><a href="/opportunities">Browse opportunities \\u2192</a></div>';document.body.appendChild(pr)}
 else if(!want&&pr){pr.remove()}
}catch(e){}}
function swap(){try{var v=document.querySelector('video');if(!v||v.getAttribute('src')!=='/hero-video.mp4')return;var t=v.currentTime;v.src='/media/hero-video.mp4';v.addEventListener('loadedmetadata',function f(){v.removeEventListener('loadedmetadata',f);try{if(t)v.currentTime=t}catch(e){}v.muted=true;var p=v.play();if(p&&p.catch)p.catch(function(){})});v.load()}catch(e){}}
var t0=Date.now();(function wait(){if(document.documentElement.dataset.hydrated==='true'||(document.readyState==='complete'&&Date.now()-t0>5000)){setTimeout(function(){ensure();swap();setInterval(function(){ensure();swap()},1000)},3000)}else setTimeout(wait,300)})();
})();</script>`;

export function fzPost(request, res) {
  try {
    if (request.method !== "GET" || res.status !== 200) return res;
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("text/html")) return res;
    const p = new URL(request.url).pathname;
    if (p.startsWith("/api/") || p.startsWith("/opportunities")) return res;
    const out = new Response(res.body, { status: res.status, statusText: res.statusText, headers: res.headers });
    if (typeof HTMLRewriter !== "undefined") {
      return new HTMLRewriter().on("body", { element(el) { el.append(INJECT, { html: true }); } }).transform(out);
    }
    // Node (preview/test) runtime: buffer the HTML and insert before the last </body>.
    return out.text().then((html) => {
      const i = html.lastIndexOf("</body>");
      const body = i === -1 ? html + INJECT : html.slice(0, i) + INJECT + html.slice(i);
      const headers = new Headers(res.headers);
      headers.delete("content-length");
      return new Response(body, { status: res.status, statusText: res.statusText, headers });
    });
  } catch (e) {
    return res;
  }
}
