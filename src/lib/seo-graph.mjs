import {registry} from './public-locale-routing.mjs';
export function schemaGraph({url,title,description,language,breadcrumbs=[],freeBuilder=false}){
 const origin=registry.origin;
 if(new URL(url).origin!==origin)throw new Error('Schema URL must use canonical origin');
 const graph=[
  {'@type':'Organization','@id':origin+'/#organization',name:'formzolo',alternateName:'FormZalo',url:origin+'/en/',logo:origin+'/favicon.svg'},
  {'@type':'WebSite','@id':origin+'/#website',name:'formzolo',alternateName:'FormZalo',url:origin+'/en/',publisher:{'@id':origin+'/#organization'},inLanguage:registry.activeLocales.map(l=>registry.locales[l].languageTag)},
  {'@type':'WebPage','@id':url+'#webpage',url,name:title,description,inLanguage:language,isPartOf:{'@id':origin+'/#website'}}
 ];
 if(breadcrumbs.length>1){graph.push({'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:breadcrumbs.map((b,i)=>({'@type':'ListItem',position:i+1,name:b.name,item:b.item}))});graph[2].breadcrumb={'@id':url+'#breadcrumb'};}
 if(freeBuilder){graph.push({'@type':'SoftwareApplication','@id':origin+'/#free-cv-builder',name:'formzolo free CV builder',url:origin+'/en/',applicationCategory:'BusinessApplication',operatingSystem:'Web browser',isAccessibleForFree:true,browserRequirements:'Sign-in required for editor and free PDF downloads',availableLanguage:['en','en-GB','hi','ar','zh-CN','es-ES','fr-FR','ja'],featureList:['Three CV templates','Signed-in Color PDF and Plain PDF downloads without watermark'],publisher:{'@id':origin+'/#organization'}});graph[2].about={'@id':origin+'/#free-cv-builder'};}
 return {'@context':'https://schema.org','@graph':graph};
}
