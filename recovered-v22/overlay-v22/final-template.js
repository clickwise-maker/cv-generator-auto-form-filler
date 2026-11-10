async () => {
 const BASE_VERSION='f4f320aa-3f38-404f-9b63-864866526000';
 const REN=%REN%;
 const E_PREV=%EPREV%;
 const E_NEW=%ENEW%;
 const JWT=%JWT%;
 const base = `/accounts/${accountId}/workers/scripts/formzolo`;
 const ds=await cloudflare.request({method:'GET',path:base+'/deployments'});
 const latest=await cloudflare.request({method:'GET',path:base+'/versions',query:{per_page:1}});
 const d0=ds.result.deployments[0];
 if(d0.versions.length!==1||d0.versions[0].version_id!==BASE_VERSION||d0.versions[0].percentage!==100||latest.result.items[0].id!==BASE_VERSION) throw Error('Baseline is not f4f320aa at 100%; STOP');
 const settings=(await cloudflare.request({method:'GET',path:base+'/settings'})).result;
 const secretNames=settings.bindings.filter(b=>b.type==='secret_text').map(b=>b.name);
 if(settings.compatibility_date!=='2025-10-01'||JSON.stringify(settings.compatibility_flags)!=='["nodejs_compat"]'||!secretNames.includes('RAZORPAY_KEY_ID')||!secretNames.includes('RAZORPAY_KEY_SECRET')||!settings.bindings.some(x=>x.name==='ASSETS'&&x.type==='assets')||!settings.bindings.some(x=>x.name==='NODE_ENV'&&x.type==='plain_text'&&x.text==='production')) throw Error('Unexpected settings; STOP');
 const bv=(await cloudflare.request({method:'GET',path:base+'/versions/'+BASE_VERSION})).result;
 const a0=bv.resources.script_runtime.assets;
 const raw=await cloudflare.request({method:'GET',path:base});
 const boundary=raw.slice(2,raw.indexOf('\r\n'));
 const files=raw.split('--'+boundary).slice(1,-1).map(p=>{const i=p.indexOf('\r\n\r\n');return {name:p.slice(0,i).match(/name="([^"]+)"/)[1],code:p.slice(i+4,-2)};});
 const hash=async(s)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s))),b=>b.toString(16).padStart(2,'0')).join('');
 if(files.length!==69||new Set(files.map(x=>x.name)).size!==69)throw Error('Incomplete module inventory');
 for(const f of files){if(!E_PREV[f.name]||await hash(f.code)!==E_PREV[f.name])throw Error('Module drift (base): '+f.name);}
 const names=Object.keys(REN).sort((a,b)=>b.length-a.length);
 const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const rx=new RegExp('(?<![A-Za-z0-9_.\\-])('+names.map(esc).join('|')+')','g');
 const once=(s,a,b)=>{if(s.split(a).length!==2)throw Error('Nonunique anchor');return s.replace(a,()=>b);};
 const hdr=files.find(x=>x.name==='_ssr/site-header-DONlhDL_.mjs');
 hdr.code=once(hdr.code,'/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {\n\t\t\t\t\t\tclassName: "grid size-9 shrink-0 place-items-center rounded-lg bg-forest font-serif text-sm text-sheet",\n\t\t\t\t\t\t"aria-hidden": true,\n\t\t\t\t\t\tchildren: "FZ"\n\t\t\t\t\t})','/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {\n\t\t\t\t\t\tsrc: "/logo-header.png",\n\t\t\t\t\t\talt: "FormZalo",\n\t\t\t\t\t\twidth: 36,\n\t\t\t\t\t\theight: 36,\n\t\t\t\t\t\tclassName: "size-9 shrink-0 rounded-full"\n\t\t\t\t\t})');
 const changed=[];
 for(const f of files){ if(f.name==='index.mjs'||f.name.startsWith('_tanstack-start-manifest')) f.code=f.code.replace(rx,m=>REN[m]); }
 for(const f of files){ const h=await hash(f.code); if(h!==E_NEW[f.name]) throw Error('digest mismatch: '+f.name); if(h!==E_PREV[f.name]) changed.push(f.name); }
 const metadata={main_module:'index.mjs',assets:{jwt:JWT,config:{_headers:a0.raw_headers,run_worker_first:false}},keep_bindings:['secret_text'],bindings:settings.bindings.filter(b=>b.type!=='secret_text'),compatibility_date:settings.compatibility_date,compatibility_flags:settings.compatibility_flags,usage_model:settings.usage_model,tags:settings.tags,tail_consumers:settings.tail_consumers,logpush:settings.logpush,observability:settings.observability};
 const form=new FormData();form.append('metadata',new Blob([JSON.stringify(metadata)],{type:'application/json'}));
 for(const f of files)form.append(f.name,new Blob([f.code],{type:'application/javascript+module'}),f.name);
 if(!JWT) return {dry:true,changed,metadataKeys:Object.keys(metadata)};
 const res=await cloudflare.request({method:'PUT',path:base,query:{bindings_inherit:'strict'},body:form});
 return {changed,success:res.success,errors:res.errors,etag:res.result&&res.result.etag};
}
