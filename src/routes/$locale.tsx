import { createFileRoute,notFound,Outlet } from '@tanstack/react-router';
import { registry,type PublicLocale } from '@/lib/public-locale-routing.mjs';
import { PublicLocaleProvider } from '@/components/content/public-localized';
export const Route=createFileRoute('/$locale')({
 loader:({params})=>{if(!registry.activeLocales.includes(params.locale as PublicLocale))throw notFound();return {locale:params.locale as PublicLocale};},
 component:()=>{const {locale}=Route.useLoaderData();return <PublicLocaleProvider locale={locale}><Outlet/></PublicLocaleProvider>;},
});
