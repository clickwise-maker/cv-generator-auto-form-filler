// Shared cv_profile completeness check (browser + node). Same list used by popup banner and generator.
(function(root){
const REQ=[ // [key, label, test]
 ['first_name','First name',p=>s(p.first_name)],
 ['last_name','Last name',p=>s(p.last_name)],
 ['dob','DOB',p=>/^\d{4}-\d{2}-\d{2}$/.test(p.dob||'')],
 ['gender','Gender',p=>s(p.gender)],
 ['marital_status','Marital status',p=>s(p.marital_status)],
 ['mobile','Mobile',p=>/^\+?[\d\s()-]{7,}$/.test(p.mobile||'')],
 ['email','Email',p=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.email||'')],
 ['address','Address',p=>{const a=p.address||{};return s(a.line1)&&s(a.city)&&s(a.state)&&s(a.postal_code)&&s(a.country)}],
 ['title','Job title',p=>s(p.title)],
 ['summary','Summary',p=>s(p.summary)&&p.summary.trim().length>=40],
 ['experience','Work experience',p=>arr(p.experience).some(e=>s(e.role)&&s(e.company))],
 ['skills','Skills',p=>arr(p.skills).some(x=>s(typeof x==='string'?x:x&&x.name))],
 ['education','Education',p=>arr(p.education).some(e=>s(e.degree)&&s(e.institution))],
 ['languages','Languages',p=>arr(p.languages).some(x=>s(x&&x.name))],
];
function s(v){return typeof v==='string'&&v.trim().length>0}
function arr(v){return Array.isArray(v)?v:[]}
function missing(p){p=p||{};return REQ.filter(r=>!r[2](p)).map(r=>({key:r[0],label:r[1]}))}
function joinList(a){return a.length<2?a.join(''):a.slice(0,-1).join(', ')+' and '+a[a.length-1]}
function message(m){if(!m.length)return '';const l=m.map(x=>x.label);
 return `Your ${joinList(l)} ${l.length>1?'are':'is'} missing — update ${l.length>1?'them':'it'} so I can generate your CV.`}
const API={REQ,missing,message,isComplete:p=>missing(p).length===0};
if(typeof module!=='undefined')module.exports=API;else root.CvProfile=API;
})(this);
