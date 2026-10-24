const C=window.CVS_SUPABASE,sb=supabase.createClient(C.url,C.anonKey,{auth:{flowType:'implicit',detectSessionInUrl:true,persistSession:true}});
const $=i=>document.getElementById(i),qs=new URLSearchParams(location.search);
const say=(t,ok)=>{const m=$('msg');m.textContent=t;m.className=ok?'ok':''};
const next=()=>{const n=qs.get('next');return n&&n.startsWith('/')&&!n.startsWith('//')?n:'/'};
const base=location.origin;
async function google(){try{const s=await (await fetch(C.url+'/auth/v1/settings',{headers:{apikey:C.anonKey}})).json();
 if(!(s.external&&s.external.google)){say('Google sign-in is not configured yet.');return}
 const {error}=await sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:base+next()}});if(error)say(error.message)}catch(e){say(e.message)}}
