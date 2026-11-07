import {createFileRoute,notFound} from '@tanstack/react-router';
import {registry,type PublicPage} from '@/lib/public-locale-routing.mjs';
import {PublicLocalizedPage} from '@/components/content/public-localized';
export const Route=createFileRoute('/$locale/$page')({
 loader:({params})=>{if(params.page==='home' || !registry.pages.includes(params.page as PublicPage))throw notFound();return {page:params.page as PublicPage};},
 component:()=>{const {page}=Route.useLoaderData();return <PublicLocalizedPage page={page}/>;},
});
