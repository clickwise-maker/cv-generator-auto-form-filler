import {useRouterState} from '@tanstack/react-router';
import {legacyBreadcrumbs} from '@/lib/legacy-public-seo';
export function Breadcrumbs({items,label}:{items:{name:string;item:string}[];label:string}){
 if(items.length<2)return null;
 return <nav aria-label={label} className="mb-5 text-sm"><ol className="flex flex-wrap gap-2">{items.map((item,i)=><li key={item.item}>{i>0?<span aria-hidden="true" className="me-2">/</span>:null}{i===items.length-1?<span aria-current="page">{item.name}</span>:<a href={item.item} className="underline">{item.name}</a>}</li>)}</ol></nav>;
}
export function LegacyBreadcrumbs(){const path=useRouterState({select:s=>s.location.pathname.replace(/\/+$/,'')||'/'});return <Breadcrumbs items={legacyBreadcrumbs(path)} label="Breadcrumb"/>;}
