import en from '@/content/public-locales/en.json';
import hi from '@/content/public-locales/hi.json';
import pl from '@/content/public-locales/pl.json';
import ar from '@/content/public-locales/ar.json';
import es from '@/content/public-locales/es.json';
import type { PublicLocale, PublicMatch } from './public-locale-routing.mjs';
import zh_cn from '@/content/public-locales/zh-cn.json';
import ru from '@/content/public-locales/ru.json';
import de from '@/content/public-locales/de.json';
import fr from '@/content/public-locales/fr.json';
import pt from '@/content/public-locales/pt.json';
import ja from '@/content/public-locales/ja.json';
import id from '@/content/public-locales/id.json';
export type PublicCopy = typeof en;
export const PUBLIC_COPY: Record<PublicLocale,PublicCopy> = {en,hi,pl,ar,es,"zh-cn":zh_cn,ru,de,fr,pt,ja,id};
export function publicPageCopy(match:PublicMatch){return PUBLIC_COPY[match.locale].pages[match.page];}

export function publicBreadcrumbs(locale:PublicLocale,page:PublicMatch["page"]){const copy=PUBLIC_COPY[locale];return [{name:copy.nav.home,item:`https://formzalo.com/${locale}/`},...(page!=="home"?[{name:copy.nav[page],item:`https://formzalo.com/${locale}/${page}/`}]:[])];}
