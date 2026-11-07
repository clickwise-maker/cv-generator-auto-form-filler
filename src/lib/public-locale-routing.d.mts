export type PublicLocale = 'en' | 'hi' | 'pl' | 'ar' | 'es' | 'zh-cn' | 'ru' | 'de' | 'fr' | 'pt' | 'ja' | 'id';
export type PublicPage = 'home' | 'templates' | 'services' | 'faq' | 'about' | 'help';
export type PublicMatch = {locale:PublicLocale;page:PublicPage;url:string;dir:'ltr'|'rtl';languageTag:string};
export const registry: {schemaVersion:number;origin:string;activeLocales:PublicLocale[];plannedLocales:string[];pages:PublicPage[];legacyPages:Record<string,PublicPage>;legacyEnglishPaths:string[];locales:Record<PublicLocale,{label:string;dir:'ltr'|'rtl';appLocale:string;ogLocale:string;languageTag:string}>};
export function publicUrl(locale:PublicLocale,page?:PublicPage):string;
export function resolvePublicRoute(pathname:string):PublicMatch|null;
export function legacyPublicRoute(pathname:string,lang:unknown):PublicMatch|null;
export function canonicalRedirect(input:string):string|null;
export function publicAlternates(locale:PublicLocale,page:PublicPage):{rel:string;hrefLang:string;href:string}[];
