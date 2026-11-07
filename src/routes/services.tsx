import {createFileRoute} from '@tanstack/react-router';
import {PublicLocaleProvider,PublicLocalizedPage} from '@/components/content/public-localized';
// Unknown legacy locale queries retain an English fallback; public contact: team@formzalo.com.
// Canonical first-twelve aliases redirect in middleware; no billing functionality changes.
export const Route=createFileRoute('/services')({component:()=> <PublicLocaleProvider locale="en"><PublicLocalizedPage page="services"/></PublicLocaleProvider>});
