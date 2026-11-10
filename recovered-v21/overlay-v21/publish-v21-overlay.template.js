async (PUBLISH) => {
 const publish = %PUBLISH%;
 const BASE_VERSION='d7d4103e-a992-4417-9c86-68fdb182823f';
 const manifest=/* overlay-v21/manifest.json */{};
 const REN=/* overlay-v21/rename-map.json */{};
 const E20=/* sha256 of v20 modules */{};
 const E21=/* overlay-v21/expected-v21.json */{};
 const INLINE={};
 const base = `/accounts/${accountId}/workers/scripts/formzolo`;
 const ds=await cloudflare.request({method:'GET',path:base+'/deployments'});
 const latest=await cloudflare.request({method:'GET',path:base+'/versions',query:{per_page:1}});
 const d0=ds.result.deployments[0];
 if(d0.versions.length!==1||d0.versions[0].version_id!==BASE_VERSION||d0.versions[0].percentage!==100||latest.result.items[0].id!==BASE_VERSION) throw Error('Baseline is not v20 at 100%; STOP');
 const settings=(await cloudflare.request({method:'GET',path:base+'/settings'})).result;
 const secretNames=settings.bindings.filter(b=>b.type==='secret_text').map(b=>b.name);
 if(settings.compatibility_date!=='2025-10-01'||JSON.stringify(settings.compatibility_flags)!=='["nodejs_compat"]'||!secretNames.includes('RAZORPAY_KEY_ID')||!secretNames.includes('RAZORPAY_KEY_SECRET')||!settings.bindings.some(x=>x.name==='ASSETS'&&x.type==='assets')||!settings.bindings.some(x=>x.name==='NODE_ENV'&&x.type==='plain_text'&&x.text==='production')) throw Error('Unexpected settings; STOP');
 const v20=(await cloudflare.request({method:'GET',path:base+'/versions/'+BASE_VERSION})).result;
 const a20=v20.resources.script_runtime.assets;
 const v20o=(await cloudflare.request({method:'GET',path:base+'/versions/3890d8ab-99a0-4aa6-beb4-b1a969772c7a'})).result;
 if(JSON.stringify(v20o.resources.script_runtime)!==JSON.stringify(v20.resources.script_runtime)) throw Error('runtime differs from v20');
 const raw=await cloudflare.request({method:'GET',path:base});
 const boundary=raw.slice(2,raw.indexOf('\r\n'));
 const files=raw.split('--'+boundary).slice(1,-1).map(p=>{const i=p.indexOf('\r\n\r\n');return {name:p.slice(0,i).match(/name="([^"]+)"/)[1],code:p.slice(i+4,-2)};});
 const hash=async(s)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s))),b=>b.toString(16).padStart(2,'0')).join('');
 if(files.length!==69||new Set(files.map(x=>x.name)).size!==69)throw Error('Incomplete module inventory');
 for(const f of files){if(!E20[f.name]||await hash(f.code)!==E20[f.name])throw Error('Module drift (v20): '+f.name);}
 const names=Object.keys(REN).sort((a,b)=>b.length-a.length);
 const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const rx=new RegExp('(?<![A-Za-z0-9_.\\-])('+names.map(esc).join('|')+')','g');
 let changed=[];
 for(const f of files){const n=f.code.replace(rx,m=>REN[m]).split('partners@formzalo.com').join('team@formzalo.com'); if(n!==f.code){changed.push(f.name);f.code=n;}}
 for(const f of files){if(await hash(f.code)!==E21[f.name])throw Error('v21 digest mismatch: '+f.name);}
 // assets
 const sess=await cloudflare.request({method:'POST',path:base+'/assets-upload-session',body:{manifest}});
 let sr=sess.result||sess; let jwt=sr.jwt; const buckets=sr.buckets||[];
 let uploaded=0;
 for(const bucket of buckets){
  const fd=new FormData();
  for(const h of bucket){const it=INLINE[h]; if(!it) throw Error('Server requested a file I do not have: '+h); if(!publish) continue; fd.append(h,new Blob([it.b],{type:it.t}),h);}
  if(!publish) continue;
  const r=await fetch('https://api.cloudflare.com/client/v4/accounts/'+accountId+'/workers/assets/upload?base64=true',{method:'POST',headers:{Authorization:'Bearer '+jwt},body:fd});
  const j=await r.json(); if(!r.ok||!j.success) throw Error('upload failed '+r.status+' '+JSON.stringify(j.errors));
  uploaded+=bucket.length; if(j.result&&j.result.jwt) jwt=j.result.jwt;
 }
 const metadata={main_module:'index.mjs',assets:{jwt,config:{_headers:a20.raw_headers,run_worker_first:false}},keep_bindings:['secret_text'],bindings:settings.bindings.filter(b=>b.type!=='secret_text'),compatibility_date:settings.compatibility_date,compatibility_flags:settings.compatibility_flags,usage_model:settings.usage_model,tags:settings.tags,tail_consumers:settings.tail_consumers,logpush:settings.logpush,observability:settings.observability};
 if(!publish) return {ready:true,changedModules:changed,buckets:buckets.map(b=>b.length),jwtLen:jwt.length,bindings:metadata.bindings};
 const form=new FormData();form.append('metadata',new Blob([JSON.stringify(metadata)],{type:'application/json'}));
 for(const f of files)form.append(f.name,new Blob([f.code],{type:'application/javascript+module'}),f.name);
 const res=await cloudflare.request({method:'PUT',path:base,query:{bindings_inherit:'strict'},body:form});
 const nv=res.result&&(res.result.deployment_id?res.result:res.result);
 return {uploaded,changed,res:{success:res.success,errors:res.errors,keys:Object.keys(res.result||{}),id:res.result&&res.result.id,etag:res.result&&res.result.etag,versionId:res.result&&res.result.deployment_id}};
}