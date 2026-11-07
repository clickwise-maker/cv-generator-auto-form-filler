import {canonicalRedirect} from '../../src/lib/public-locale-routing.mjs';
export default function publicLocaleCanonical(event:{url:URL;req:{method?:string}},next:()=>unknown){
 if(event.req.method && !['GET','HEAD'].includes(event.req.method))return next();
 const location=canonicalRedirect(event.url.href);
 return location?new Response(null,{status:301,headers:{location}}):next();
}
