import registry from '../content/public-locales/registry.json' with { type: 'json' };
export { registry };
export function publicUrl(locale, page = 'home') {
  if (!registry.activeLocales.includes(locale) || !registry.pages.includes(page)) throw new Error('Unsupported public counterpart');
  return `${registry.origin}/${locale}/${page === 'home' ? '' : `${page}/`}`;
}
export function resolvePublicRoute(pathname) {
  let parts;
  try { parts=pathname.split('/').filter(Boolean).map(s=>decodeURIComponent(s).toLowerCase()); } catch { return null; }
  if(parts.length<1 || parts.length>2 || !registry.activeLocales.includes(parts[0]))return null;
  const page=parts[1]??'home';if(!registry.pages.includes(page) || page==='home' && parts.length===2)return null;
  return {locale:parts[0],page,url:publicUrl(parts[0],page),dir:registry.locales[parts[0]].dir,languageTag:registry.locales[parts[0]].languageTag};
}
export function legacyPublicRoute(pathname, lang) {
  const path=pathname==='/'?'/':pathname.replace(/\/+$/,'');const page=registry.legacyPages[path];if(!page)return null;
  const raw=typeof lang==='string'?lang.toLowerCase():'en';const base=raw==='zh-cn'?'zh-cn':raw.split('-')[0];
  if(!registry.activeLocales.includes(base))return null;
  return {locale:base,page,url:publicUrl(base,page),dir:registry.locales[base].dir,languageTag:registry.locales[base].languageTag};
}
export function canonicalRedirect(input) {
  const url=new URL(input);const publicRoute=resolvePublicRoute(url.pathname);
  if(publicRoute) {
    const canonical=new URL(publicRoute.url).pathname;
    if(url.pathname!==canonical || url.searchParams.has('lang')) { url.pathname=canonical;url.searchParams.delete('lang');return url.pathname+url.search; }
    return null;
  }
  // Keep legacy home/editor URLs alive: fragments and OAuth/app entry state are
  // not visible to server middleware. Their head canonical points to public home.
  if(url.pathname==='/')return null;
  const legacy=legacyPublicRoute(url.pathname,url.searchParams.get('lang')??undefined);
  if(!legacy)return null;
  url.pathname=new URL(legacy.url).pathname;url.searchParams.delete('lang');return url.pathname+url.search;
}
export function publicAlternates(locale,page) {
  publicUrl(locale,page);
  return [...registry.activeLocales.map(l=>({rel:'alternate',hrefLang:registry.locales[l].languageTag,href:publicUrl(l,page)})),{rel:'alternate',hrefLang:'x-default',href:publicUrl('en',page)}];
}
