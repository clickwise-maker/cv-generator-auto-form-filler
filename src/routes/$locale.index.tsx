import {createFileRoute} from '@tanstack/react-router';
import {PublicLocalizedPage} from '@/components/content/public-localized';
export const Route=createFileRoute('/$locale/')({component:()=> <PublicLocalizedPage page="home"/>});
