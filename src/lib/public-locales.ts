import en from '@/content/public-locales/en.json';
import hi from '@/content/public-locales/hi.json';
import pl from '@/content/public-locales/pl.json';
import ar from '@/content/public-locales/ar.json';
import es from '@/content/public-locales/es.json';
import type { PublicLocale, PublicMatch } from './public-locale-routing.mjs';
export type PublicCopy = typeof en;
export const PUBLIC_COPY: Record<PublicLocale,PublicCopy> = {en,hi,pl,ar,es};
export function publicPageCopy(match:PublicMatch){return PUBLIC_COPY[match.locale].pages[match.page];}
