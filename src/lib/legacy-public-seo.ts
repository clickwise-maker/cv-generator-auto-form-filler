import guides from '@/content/guides/en.json';
import terms from '@/content/terms.json';
import privacyPolicy from '@/content/privacy-policy.json';
export const LEGACY_PUBLIC_SEO:Record<string,{title:string;description:string}>={
 '/guides':{title:'CV and job application guides',description:'Free guides on writing a CV, cover letters, government job forms and photo/signature specifications.'},
 '/privacy-policy':{title:privacyPolicy.title,description:privacyPolicy.desc},
 '/terms':{title:terms.title,description:terms.desc},
 '/privacy':{title:'Privacy notice (DPDP)',description:'FormZalo privacy notice in English and Hindi: data collected, purpose, storage, retention, your rights, grievance contact.'},
 '/refund-policy':{title:'Refund Policy',description:'FormZalo refund policy in English and Hindi.'},
 ...Object.fromEntries(guides.map(g=>['/guides/'+g.slug,{title:g.title,description:g.desc}]))
};
export function legacyBreadcrumbs(path:string){const data=LEGACY_PUBLIC_SEO[path];if(!data)return [];return [{name:'Home',item:'https://formzalo.com/en/'},...(path.startsWith('/guides/')?[{name:'Guides',item:'https://formzalo.com/guides'}]:[]),{name:data.title,item:'https://formzalo.com'+path}];}
