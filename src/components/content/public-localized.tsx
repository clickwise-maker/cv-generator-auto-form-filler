import { createContext, useContext, type ReactNode } from 'react';
import { PUBLIC_COPY } from '@/lib/public-locales';
import { registry,publicUrl,type PublicLocale,type PublicPage } from '@/lib/public-locale-routing.mjs';
// Provider value is route loader data, never a mutable module/global locale.
const LocaleContext=createContext<PublicLocale|null>(null);
export function PublicLocaleProvider({locale,children}:{locale:PublicLocale;children:ReactNode}){return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;}
function usePublicLocale(){const locale=useContext(LocaleContext);if(!locale)throw new Error('Public locale context missing');return locale;}
export function PublicLocalizedPage({page}:{page:PublicPage}){
 const locale=usePublicLocale(),copy=PUBLIC_COPY[locale],content=copy.pages[page];
 const app=`/?lang=${encodeURIComponent(registry.locales[locale].appLocale)}#signin`;
 return <div data-public-locale={locale} data-public-page={page}>
  <header className="border-b border-line bg-sheet"><div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-4">
   <a href={publicUrl(locale)} className="me-auto font-serif text-xl text-forest">formzolo</a>
   <nav aria-label={copy.language} className="flex flex-wrap gap-3 text-sm">{registry.activeLocales.map(l=><a key={l} href={publicUrl(l,page)} hrefLang={registry.locales[l].languageTag} lang={registry.locales[l].languageTag} aria-current={locale===l?'page':undefined} className="underline">{registry.locales[l].label}</a>)}</nav>
  </div><nav aria-label={copy.navLabel} className="mx-auto flex max-w-6xl flex-wrap gap-4 px-4 pb-4 text-sm">{registry.pages.map(p=><a key={p} href={publicUrl(locale,p)} aria-current={p===page?'page':undefined} className="underline">{copy.nav[p]}</a>)}</nav></header>
  <main className="mx-auto max-w-4xl px-4 py-10 text-start"><h1 className="font-serif text-3xl text-forest sm:text-5xl">{content.h1}</h1><p className="mt-5 text-lg leading-relaxed">{content.intro}</p>
   {content.sections.map(s=><section key={s.heading} className="mt-8"><h2 className="font-serif text-2xl">{s.heading}</h2><p className="mt-3 leading-relaxed">{s.body}</p></section>)}
   {page==='templates'?<ul className="mt-8 grid gap-5 sm:grid-cols-3">{['meridian','consulate','atlas'].map(name=><li key={name}><img src={`/templates/${name}.png`} width="300" height="424" alt={copy.templateAlt.replace('{name}',name)} loading="lazy" className="w-full rounded-xl border border-line"/><h2 className="mt-3 font-serif text-xl">{name}</h2><a href={`/?lang=${encodeURIComponent(registry.locales[locale].appLocale)}&template=${name}#signin`} className="mt-3 inline-block underline">{copy.chooseTemplate}</a></li>)}</ul>:null}
   {page==='faq'?<section className="mt-8"><h2 className="font-serif text-2xl">{copy.faqTitle}</h2>{copy.faq.map(item=><section key={item.question} className="mt-6"><h3 className="font-semibold">{item.question}</h3><p className="mt-2 leading-relaxed">{item.answer}</p></section>)}</section>:null}
   <a href={app} className="mt-10 inline-block rounded-full bg-forest px-6 py-3 font-medium text-sheet">{copy.openEditor}</a><p className="mt-4 text-sm leading-relaxed text-muted">{copy.editorNote}</p>
  </main><footer className="border-t border-line px-4 py-6"><div className="mx-auto max-w-4xl"><p>{copy.contact}: <a href="mailto:team@formzalo.com" className="underline">team@formzalo.com</a></p><div className="mt-3 flex flex-wrap gap-4 text-sm"><a href="/privacy-policy" className="underline">{copy.privacyLabel}</a><a href="/terms" className="underline">{copy.termsLabel}</a></div></div></footer>
 </div>;
}
