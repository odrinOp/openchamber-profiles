(()=>{var k="openchamber.sdk",U=1;var Ht=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function Vt(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let t=new WeakMap;e.addEventListener("scroll",(n)=>{let s=n.target===e?o:n.target;if(!(s instanceof Element))return;if(!s.hasAttribute("data-oc-scrolling"))s.setAttribute("data-oc-scrolling","");let a=t.get(s);if(a!==void 0)clearTimeout(a);t.set(s,setTimeout(()=>{t.delete(s),s.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Yr=`(${Vt.toString()})(document);`;var Xt=128,Ft=65536;var _t=128;var St=65536;var Fo=/^[a-z][a-z0-9-]{0,39}$/;var Ho=(e)=>Object(e)===e&&!Array.isArray(e),Bt=(e,o)=>Object.keys(e).every((t)=>o.includes(t)),Vo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Xo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Bo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let t of e){if(!Ho(t)||!Fo.test(t.id)||!Vo(t.label))return!1;if(t.disabled!==void 0&&t.disabled!==!0&&t.disabled!==!1)return!1;if(o.has(t.id))return!1;if(o.add(t.id),t.kind==="button"){if(!Bt(t,["kind","id","label","disabled"]))return!1;continue}if(t.kind!=="select"||!Bt(t,["kind","id","label","value","options","disabled"]))return!1;if(!Xo(t.value)||!Array.isArray(t.options)||t.options.length<1||t.options.length>16)return!1;let n=new Set;for(let s of t.options){if(!Ho(s)||!Bt(s,["value","label"])||!Xo(s.value)||!Vo(s.label)||n.has(s.value))return!1;n.add(s.value)}if(!n.has(t.value))return!1}return!0};var $o=["{id}","{segment}","{segments+}"];var Kn=new Set($o);var jo=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Wn=new Set(jo);var Tt=20000000,mt=256;var $t=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Ko=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let t=0;t<e.bytes.byteLength;t+=1)if(e.bytes[t]!==o.bytes[t])return!1;return!0};var zo=/^[A-Za-z0-9_-]{1,80}$/;var Wo=["left","right","top","bottom"];var Jo=(e,o=0,t={remaining:16000})=>{if(--t.remaining<0||o>=32)return!1;if(e===null)return!0;let n=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let s of n)if(!Jo(s,o+1,t))return!1;return!0},jt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(jt);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(jt)}return String(e)===e||Number.isFinite(e)},Kt=(e)=>{try{if(String(e.id)!==e.id||!zo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Wo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Jo(e.data)||!jt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Wt=2000;var Yo=["file","directory","other","missing"],Jt=(e)=>Boolean(e&&"sessionId"in e),Qt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Zo=/^[0-9a-f]{7,64}$/i,Yt=(e)=>Zo.test(e),ht=500,Ot=32000,qo=16000,er=128,tr=200,or=2000,rr=16000,nr=80,sr=200,ir=16000;var ar=2000;var Zt=20000,At=1024,xt=2000000;var gt=64000,Rt=8000,qt=4000;var eo=960000;var cr=999,lr=1e4,it=500,dr=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],pr=["stopped","starting","ready","failed"],qr=new Set(dr),ur=(e)=>qr.has(e),fr=(e)=>e&&ur(e)?e:"HOST_REJECTED",Qe=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Qe);if(Object(e)===e)return Object.values(e).every(Qe);return!1},Er=(e)=>Qe(e)&&JSON.stringify(e).length<=ir,Qo=(e)=>e?.trim().slice(0,sr)??"",Ye=(e)=>{let o=e.id.trim().slice(0,er),t=e.title.trim().slice(0,tr),n=e.url.trim().slice(0,or),s=e.text?.trim().slice(0,rr),a=e.author?.trim().slice(0,nr),c=e.kind==="pull"?"pull":"issue",d={providerId:e.providerId.trim(),id:o,title:t||o,url:n,kind:c};if(s)d.text=s;if(a)d.author=a;if(c==="pull"){let u=Qo(e.branches?.head),T=Qo(e.branches?.base);if(u&&T)d.branches={head:u,base:T}}if(Er(e.data))d.data=e.data;return d},to=(e)=>{let o=Ye(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},oo=(e)=>{let o={text:e.text.trim().slice(0,qo)};if(e.send)o.send=!0;return o},ro=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(cr,Math.max(0,Math.round(e)))},no=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(lr,Math.max(0,Math.ceil(e)))};var Ze=(e)=>e.length>0&&e.length<=At&&!e.includes("\x00")&&!e.includes("\\");var bt=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>ar)return!1;return!e.split("/").some((t)=>t==="."||t==="..")},en=new Set(pr),so=(e)=>Boolean(e&&"status"in e&&en.has(String(e.status))&&!("body"in e)),yt=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),io=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),ao=(e)=>Boolean(e&&"written"in e&&e.written===!0),co=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),tn=new Set(Yo),lo=(e)=>Boolean(e&&"kind"in e&&"size"in e&&tn.has(String(e.kind))&&Number.isFinite(e.size)),po=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),on=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),rn=(e)=>Object(e)===e?e:null,zt=(e)=>String(e)===e&&e.length>0,nn=(e)=>{if(!zt(e.id))return null;if(e.ok===!0){let o={channel:k,v:U,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&zt(e.error))return{channel:k,v:U,type:"result",id:e.id,ok:!1,error:e.error,code:fr(zt(e.code)?e.code:void 0)};return null},uo=(e)=>{let o=rn(e);if(!o||o.channel!==k||o.v!==U)return null;if(o.type==="result")return nn(o);if(!on.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var _r=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),sn=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class b extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Sr=()=>Promise.reject(new b("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),vt=()=>Promise.reject(new b("BAD_PATH",`File path must be 1 to ${At} characters without NUL or backslash.`)),Ct=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new b("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},y=(e)=>(e.value+=1,`oc-${e.value}`),fo=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new b("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let t=e.acceptSource??((r)=>r===o.parent),n=e.requestTimeoutMs??Zt,s=new Set,a=new Set,c=new Set,d=new Set,u=new Set,T=new Set,_=new Set,m=new Set,A=new Set,h=new Set,v=new Set,C=new Set,M=[],I=null,G=null,Q=new Set,w=new Set,x=null,f=null,g=!1,Y=new Map,q=new Map,le=new Map,Z=!1,l={value:0},p=null,ue=null,Le=!1,Ce=!1,ct=null,je=(r)=>{if(!r)return null;return{sessionId:r.id,phase:r.busy?"started":"completed"}},ne=(r)=>{o.parent.postMessage(r,"*")},Oe=()=>{if(Z||o.parent===o||C.size===0||p?.features?.lateGenerateResults!==!0)return;ne({channel:k,v:U,type:"generate-late-listen"})},L=(r,i)=>{for(let S of r)try{S(i)}catch(O){console.error(O)}},De=(r)=>{if(!(r instanceof MessageEvent))return;if(!t(r.source))return;let i=uo(r.data);if(!i)return;if(i.type==="workspace"){let O=q.get(i.payload.subscriptionId);if(O)L([O],i.payload.snapshot);return}if(i.type==="shells"){let O=le.get(i.payload.subscriptionId);if(O)L([O],i.payload.snapshot);return}if(i.type==="ready"){if(p=i.payload,ue=je(i.payload.session),L(s,i.payload),L(a,i.payload.directory),L(c,i.payload.session),ue)L(d,ue);if(L(u,i.payload.connection),L(T,i.payload.settings),L(_,i.payload.item),i.payload.block)L(m,i.payload.block);Oe();return}if(i.type==="service-event"){L(A,i.payload);return}if(i.type==="generate-late"){if(C.size===0)M.push(i.payload);else L(C,i.payload);return}if(i.type==="directory"){if(p)p={...p,directory:i.payload.directory};L(a,i.payload.directory);return}if(i.type==="session"){if(p)p={...p,session:i.payload.session};if(!i.payload.session)ue=null;else if(ue?.sessionId!==i.payload.session.id)ue=je(i.payload.session);L(c,i.payload.session);return}if(i.type==="session-lifecycle"){ue=i.payload,L(d,i.payload);return}if(i.type==="connection"){if(p)p={...p,connection:i.payload.connection};L(u,i.payload.connection);return}if(i.type==="settings"){if(p)p={...p,settings:i.payload.settings};L(T,i.payload.settings);return}if(i.type==="item"){if(p)p={...p,item:i.payload.item};L(_,i.payload.item);return}if(i.type==="status-control-event"){L(h,i.payload);return}if(i.type==="popover-closed"){L(v,i.payload);return}if(i.type==="action"){let O=(N)=>{if(!Z)ne({channel:k,v:U,type:"action-result",id:i.id,payload:N})},V=G;if(!V){O({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>V(i.payload)).then(()=>O({ok:!0}),(N)=>{let B=(N instanceof Error?N.message:String(N)).trim();O({ok:!1,error:(B||"Action failed.").slice(0,it)})});return}if(i.type==="file-open"){let O=i.payload;if(f&&Ko(f,O))return;f=O,L(Q,i.payload);return}if(i.type==="file-saved"){L(w,i.payload.version);return}if(i.type==="file-snapshot"){let O=(B)=>{if(!Z)ne({channel:k,v:U,type:"file-snapshot-result",id:i.id,payload:B})},V=(B)=>O({error:(B.trim()||"Could not read the edited file.").slice(0,it)}),N=x;if(!N){V("This extension does not edit files.");return}Promise.resolve().then(()=>N(i.payload.purpose)).then((B)=>{if($t(B)>Tt){V(`The file is over ${Tt} ${"bytes"in B?"bytes":"characters"}.`);return}if(B.version.length>mt){V(`The snapshot version is over ${mt} characters.`);return}O({snapshot:"bytes"in B?{bytes:B.bytes,version:B.version}:{content:B.content,version:B.version}})},(B)=>V(B instanceof Error?B.message:String(B)));return}if(i.type==="resolve"){let O=(N)=>{ne({channel:k,v:U,type:"resolve-result",id:i.id,payload:N})},V=I;if(!V){O({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>V(i.payload)).then((N)=>O({item:N?Ye(N):null}),(N)=>{let B=(N instanceof Error?N.message:String(N)).trim();O({error:(B||"Command failed.").slice(0,it)})});return}let S=Y.get(i.id);if(!S)return;if(clearTimeout(S.timer),Y.delete(i.id),i.ok){S.resolve(i.payload);return}S.reject(new b(i.code,i.error))};o.addEventListener("message",De),ne({channel:k,v:U,type:"hello"});let ee=(r,i=n)=>{if(Z||o.parent===o)return Promise.reject(new b("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((S,O)=>{let V=setTimeout(()=>{Y.delete(r.id),O(new b("HOST_TIMEOUT","Host did not answer in time."))},i);Y.set(r.id,{resolve:S,reject:O,timer:V}),ne(r)})},P=(r)=>ee(r).then(()=>{return}),D={channel:k,v:U},de=(r)=>{if(!Z&&o.parent!==o)ne(r)},Ge=()=>de({...D,type:"file-save"}),tt=(r)=>{if(!_r(r)||!sn(r))return;r.preventDefault(),Ge()},ot=(r)=>{if(!_r(r)||r.key!=="Escape"||p?.surface!=="popover"||!p.popover)return;r.preventDefault(),lt(p.popover.id,"escape").catch(()=>{return})},Ie=()=>{let r=p?.surface==="popover"?p.popover:void 0;if(!r)return;let i=Le||Ce;if(ct===i)return;ct=i,dt(r.id,i).catch(()=>{return})},Ke=()=>{if(p?.surface!=="popover"||Le)return;Le=!0,Ie()},Te=(r)=>{if(p?.surface!=="popover"||r.relatedTarget!==null||!Le)return;Le=!1,Ie()},ze=()=>{if(p?.surface!=="popover"||Ce)return;Ce=!0,Ie()},We=()=>{if(p?.surface!=="popover"||!Ce)return;Ce=!1,Ie()},se=(r,i=1024)=>{if(!r.trim()||r.length>i)throw new b("HOST_REJECTED",`Identity must contain 1 to ${i} characters.`)},Ae=async(r)=>{if(r.kind!=="projects")se(r.projectId);let i=await ee({...D,type:"workspace-read",id:y(l),payload:r});if(!i||!("kind"in i)||!("state"in i)||i.kind!==r.kind)throw new b("HOST_REJECTED","Host did not return workspace data.");return i},Ee=async(r,i)=>{if(r.kind!=="projects")se(r.projectId);let S=y(l);q.set(S,i);try{await P({...D,type:"workspace-subscribe",id:y(l),payload:{subscriptionId:S,query:r}})}catch(O){if(q.delete(S),!Z)ne({...D,type:"workspace-unsubscribe",id:y(l),payload:{subscriptionId:S}});throw O}return()=>{if(!q.delete(S)||Z)return;ne({...D,type:"workspace-unsubscribe",id:y(l),payload:{subscriptionId:S}})}},rt=async(r,i)=>{if(r.kind==="session")se(r.sessionId);if(r.kind==="project")se(r.projectId);let S=y(l);le.set(S,i);try{await P({...D,type:"shells-subscribe",id:y(l),payload:{subscriptionId:S,scope:r}})}catch(O){if(le.delete(S),!Z)ne({...D,type:"shells-unsubscribe",id:y(l),payload:{subscriptionId:S}});throw O}return()=>{if(!le.delete(S)||Z)return;ne({...D,type:"shells-unsubscribe",id:y(l),payload:{subscriptionId:S}})}},xe=async(r)=>{if("key"in r&&(r.key.length===0||r.key.length>Xt))throw new b("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(r.op==="set"&&!Qe(r.value))throw new b("HOST_REJECTED","Storage values must be JSON.");if(r.op==="set"&&new TextEncoder().encode(JSON.stringify(r.value)).length>Ft)throw new b("HOST_REJECTED","Storage value exceeds 64 KiB.");if(r.scope==="device"&&p?.features?.deviceStorage!==!0)throw new b("UNSUPPORTED","This host does not support device storage.");let i=await ee({...D,type:"storage",id:y(l),payload:r});if(!i||!("storage"in i)||i.op!==r.op)throw new b("HOST_REJECTED","Host did not return storage data.");return i},lt=(r,i)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===r)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):P({...D,type:"popover-close",id:y(l),payload:i?{id:r,reason:i}:{id:r}}),dt=(r,i)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===r)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):P({...D,type:"popover-anchor",id:y(l),payload:{id:r,active:i}});return o.addEventListener("keydown",ot,!0),o.addEventListener("pointerover",Ke),o.addEventListener("pointermove",Ke),o.addEventListener("pointerout",Te),o.addEventListener("focus",ze),o.addEventListener("blur",We),{onAction:(r)=>(G=r,()=>{if(G===r)G=null}),listProjects:async()=>{let r=await Ae({kind:"projects"});if(r.kind!=="projects")throw new b("HOST_REJECTED","Expected projects.");return r},listWorktrees:async(r)=>{let i=await Ae({kind:"worktrees",projectId:r});if(i.kind!=="worktrees")throw new b("HOST_REJECTED","Expected worktrees.");return i},listSessions:async(r)=>{let i=await Ae({kind:"sessions",projectId:r});if(i.kind!=="sessions")throw new b("HOST_REJECTED","Expected sessions.");return i},onProjects:(r)=>Ee({kind:"projects"},(i)=>{if(i.kind==="projects")r(i)}),onWorktrees:(r,i)=>Ee({kind:"worktrees",projectId:r},(S)=>{if(S.kind==="worktrees")i(S)}),onSessions:(r,i)=>Ee({kind:"sessions",projectId:r},(S)=>{if(S.kind==="sessions")i(S)}),onRunningShells:(r,i)=>rt(r,i),readShellOutput:async(r,i)=>{se(r,_t);let S=i?.cursor;if(S!==void 0&&(!Number.isInteger(S)||S<0))throw new b("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let O=i?.tailBytes;if(O!==void 0&&(!Number.isInteger(O)||O<1||O>St))throw new b("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${St}.`);let N=await ee({...D,type:"shell-output",id:y(l),payload:{shellId:r,cursor:S,tailBytes:O}});if(!N||typeof N.output!=="string"||!Number.isFinite(N.cursor))throw new b("HOST_REJECTED","Host did not return shell output.");return N},stopShell:async(r)=>{if(se(r,_t),(await ee({...D,type:"shell-stop",id:y(l),payload:{shellId:r}}))?.stopped!==!0)throw new b("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(r)=>{se(r),await P({...D,type:"open-session",id:y(l),payload:{sessionId:r}})},storage:{get:async(r,i)=>{let S=Ct(i),O={op:"get",key:r};if(S)O.scope=S;let V=await xe(O);return V.op==="get"&&V.found?V.value:void 0},set:async(r,i,S)=>{let O=Ct(S),V={op:"set",key:r,value:i};if(O)V.scope=O;await xe(V)},delete:async(r,i)=>{let S=Ct(i),O={op:"delete",key:r};if(S)O.scope=S;await xe(O)},keys:async(r)=>{let i=Ct(r),S={op:"keys"};if(i)S.scope=i;let O=await xe(S);if(O.op!=="keys")throw new b("HOST_REJECTED","Expected storage keys.");return O.keys}},onReady:(r)=>{if(s.add(r),p)r(p);return()=>{s.delete(r)}},onDirectory:(r)=>{if(a.add(r),p)r(p.directory);return()=>{a.delete(r)}},onSession:(r)=>{if(c.add(r),p)r(p.session);return()=>{c.delete(r)}},onSessionLifecycle:(r)=>{if(d.add(r),ue)r(ue);return()=>{d.delete(r)}},onConnection:(r)=>{if(u.add(r),p)r(p.connection);return()=>{u.delete(r)}},onSettings:(r)=>{if(T.add(r),p)r(p.settings);return()=>{T.delete(r)}},onItem:(r)=>{if(_.add(r),p)r(p.item);return()=>{_.delete(r)}},onBlock:(r)=>{if(m.add(r),p?.block)r(p.block);return()=>{m.delete(r)}},onServiceEvent:(r)=>(A.add(r),()=>{A.delete(r)}),onStatusControl:(r)=>(h.add(r),()=>{h.delete(r)}),onPopoverClosed:(r)=>(v.add(r),()=>{v.delete(r)}),setStatusControls:(r)=>{if(p?.features?.statusControls!==!0)return Promise.reject(new b("UNSUPPORTED","This host does not support status controls."));if(!Bo(r))return Promise.reject(new b("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return P({...D,type:"status-controls",id:y(l),payload:{controls:r}})},openPopover:(r)=>{if(p?.features?.popovers!==!0)return Promise.reject(new b("UNSUPPORTED","This host does not support popovers."));if(!Kt(r))return Promise.reject(new b("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return P({...D,type:"popover-open",id:y(l),payload:r})},closePopover:lt,setPopoverAnchorActive:dt,onResolve:(r)=>(I=r,()=>{if(I===r)I=null}),toast:(r)=>{let i=r.message.trim();if(!i||i.length>ht)return Promise.reject(new b("HOST_REJECTED",`Toast message must contain 1 to ${ht} characters.`));if(r.copy&&r.copy!==!0&&(!r.copy.text.length||r.copy.text.length>Ot))return Promise.reject(new b("HOST_REJECTED",`Toast copy text must contain 1 to ${Ot} characters.`));return P({channel:k,v:U,type:"toast",id:y(l),payload:{...r,message:i}})},openUrl:(r)=>P({channel:k,v:U,type:"open-url",id:y(l),payload:{url:r}}),openCommit:(r)=>Yt(r)?P({channel:k,v:U,type:"open-commit",id:y(l),payload:{sha:r}}):Promise.reject(new b("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(r)=>P({channel:k,v:U,type:"block-answer",id:y(l),payload:{text:r.trim().slice(0,Wt)}}),openSurface:(r)=>P({channel:k,v:U,type:"open-surface",id:y(l),payload:{surfaceId:r}}),writeClipboard:(r)=>P({channel:k,v:U,type:"clipboard-write",id:y(l),payload:{text:r}}),compose:(r)=>P({channel:k,v:U,type:"compose",id:y(l),payload:r}),attach:(r)=>P({channel:k,v:U,type:"attach",id:y(l),payload:Ye(r)}),startSession:async(r)=>{if(r.projectId!==void 0)se(r.projectId);let i=r.worktree;if(i&&i!==!0)if(i.kind==="existing")se(i.directory);else{if(i.name!==void 0)se(i.name,200);if(i.baseBranch!==void 0)se(i.baseBranch,200)}let S=await ee({channel:k,v:U,type:"start-session",id:y(l),payload:to(r)},e.requestTimeoutMs??180000);if(!Jt(S))throw new b("HOST_REJECTED","Host did not return a session.");return S},prompt:(r)=>ee({channel:k,v:U,type:"prompt",id:y(l),payload:oo(r)}).then((i)=>{if(!Qt(i))throw new b("HOST_REJECTED","Host did not return a prompt result.");return i}),sessionLink:(r)=>P({channel:k,v:U,type:"session-link",id:y(l),payload:Ye(r)}),close:()=>P({channel:k,v:U,type:"close",id:y(l)}),oauthStart:()=>P({channel:k,v:U,type:"oauth-start",id:y(l)}),oauthDisconnect:()=>P({channel:k,v:U,type:"oauth-disconnect",id:y(l)}),request:(r)=>(bt(r.path)?ee({channel:k,v:U,type:"request",id:y(l),payload:r}):Sr()).then((i)=>{if(!yt(i))throw new b("HOST_REJECTED","Host request result was empty.");return i}),serviceRequest:(r)=>(bt(r.path)?ee({channel:k,v:U,type:"service-request",id:y(l),payload:r}):Sr()).then((i)=>{if(!yt(i))throw new b("HOST_REJECTED","Host service request result was empty.");return i}),serviceStatus:()=>ee({channel:k,v:U,type:"service-status",id:y(l)}).then((r)=>{if(!so(r))throw new b("HOST_REJECTED","Host did not return service status.");return r}),readFile:(r)=>(Ze(r)?ee({channel:k,v:U,type:"file-read",id:y(l),payload:{path:r}}):vt()).then((i)=>{if(!io(i))throw new b("HOST_REJECTED","Host did not return file content.");return i}),writeFile:(r,i)=>{if(!Ze(r))return vt();if(i.length>xt)return Promise.reject(new b("FILE_TOO_LARGE",`Content is over ${xt} characters.`));return ee({channel:k,v:U,type:"file-write",id:y(l),payload:{path:r,content:i}}).then((S)=>{if(!ao(S))throw new b("HOST_REJECTED","Host did not confirm the write.");return S})},listDir:(r)=>(Ze(r)?ee({channel:k,v:U,type:"file-list",id:y(l),payload:{path:r}}):vt()).then((i)=>{if(!co(i))throw new b("HOST_REJECTED","Host did not return directory entries.");return i}),stat:(r)=>(Ze(r)?ee({channel:k,v:U,type:"file-stat",id:y(l),payload:{path:r}}):vt()).then((i)=>{if(!lo(i))throw new b("HOST_REJECTED","Host did not return file status.");return i}),generate:(r)=>{let i=r.prompt.trim(),S=r.system?.trim();if(i.length===0||i.length>gt)return Promise.reject(new b("HOST_REJECTED",`Prompt must be 1 to ${gt} characters.`));if(S!==void 0&&(S.length===0||S.length>Rt))return Promise.reject(new b("HOST_REJECTED",`System prompt must be 1 to ${Rt} characters.`));let O=r.maxOutputTokens===void 0?void 0:Math.min(qt,Math.max(1,Math.floor(r.maxOutputTokens)));if(O!==void 0&&!Number.isFinite(O))return Promise.reject(new b("HOST_REJECTED","maxOutputTokens must be a number."));let V={prompt:i};if(S!==void 0)V.system=S;if(O!==void 0)V.maxOutputTokens=O;return ee({channel:k,v:U,type:"generate",id:y(l),payload:V},e.requestTimeoutMs??eo).then((N)=>{if(!po(N))throw new b("HOST_REJECTED","Host did not return generated text.");return N})},onLateGenerateResult:(r)=>{C.add(r);for(let i of M.splice(0))L([r],i);return Oe(),()=>{C.delete(r)}},setBadge:(r)=>P({channel:k,v:U,type:"badge",id:y(l),payload:{count:ro(r)}}),setHeight:(r)=>P({channel:k,v:U,type:"resize",id:y(l),payload:{height:no(r)}}),onFileOpen:(r)=>{if(Q.add(r),!g)g=!0,o.addEventListener("keydown",tt,!0);if(f)r(f);return()=>{Q.delete(r)}},onFileSnapshot:(r)=>(x=r,()=>{if(x===r)x=null}),onFileSaved:(r)=>(w.add(r),()=>{w.delete(r)}),reportFileChange:(r)=>de({...D,type:"file-change",payload:{dirty:r.dirty,edited:r.edited}}),requestFileSave:Ge,reportFileUnsupported:()=>de({...D,type:"file-unsupported"}),dispose:()=>{for(let r of q.keys())ne({...D,type:"workspace-unsubscribe",id:y(l),payload:{subscriptionId:r}});q.clear();for(let r of le.keys())ne({...D,type:"shells-unsubscribe",id:y(l),payload:{subscriptionId:r}});if(le.clear(),Z=!0,I=null,G=null,x=null,Q.clear(),w.clear(),g)o.removeEventListener("keydown",tt,!0);o.removeEventListener("message",De),o.removeEventListener("keydown",ot,!0),o.removeEventListener("pointerover",Ke),o.removeEventListener("pointermove",Ke),o.removeEventListener("pointerout",Te),o.removeEventListener("focus",ze),o.removeEventListener("blur",We);for(let r of Y.values())clearTimeout(r.timer),r.reject(new b("HOST_UNAVAILABLE","Host client was disposed."));Y.clear(),s.clear(),a.clear(),c.clear(),d.clear(),u.clear(),T.clear(),_.clear(),m.clear(),A.clear(),h.clear(),v.clear(),C.clear(),M.length=0}}};var Tr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var ls=new Set(Tr);var mr=["none","agent","user"];var ps=new Set(mr);var an=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],cn=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],hr=(e,o)=>{o.style.colorScheme=e.mode;for(let[t,n]of an)o.style.setProperty(t,e.tokens[n]);for(let[t,n,s]of cn){let a=e.tokens[s]??"";o.style.setProperty(t,a),o.style.setProperty(n,a)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},Eo=(e,o)=>{if(hr(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};var ln={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},j=(e,o)=>`var(--${e}, var(--oc-${ln[e]}, ${o}))`,ye=j("surface-background","transparent"),kt=j("surface-elevated","transparent"),qe=j("surface-elevated-foreground","inherit"),fe=j("surface-foreground","inherit"),K=j("surface-muted-foreground","gray"),dn=j("surface-muted","transparent"),Ve=j("interactive-border","currentColor"),pe=j("interactive-hover","transparent"),Xe=j("interactive-active","transparent"),_o=j("interactive-selection","transparent"),So=j("interactive-selection-foreground","inherit"),be=j("primary","currentColor"),To=j("primary-text","inherit"),mo=j("error-text","inherit"),pn=j("font-sans","inherit"),ho=j("font-mono","monospace"),gr=j("radius","9px"),Oo=`calc(${gr} - 2px)`,Or=`calc(${gr} - 4px)`,z=(e,o,t="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${t})`,Ar=`background-image: linear-gradient(${pe}, ${pe});`,Ao=(e,o="0.5px")=>`box-shadow: inset 0 0 0 ${o} ${e}, var(--oc-sdk-field-lift);`,xo="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",xr="box-shadow: var(--oc-sdk-lit);",go=`inset 0 0.5px 0 0 ${z(fe,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,un=`
:root {
  --oc-sdk-edge: ${z(fe,16)};
  --oc-sdk-field-bg: ${kt};
  --oc-sdk-raised-bg: ${ye};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${z(fe,14)};
  --oc-sdk-field-bg: ${z(ye,50,kt)};
  --oc-sdk-raised-bg: ${kt};
  --oc-sdk-field-lift: ${go};
  --oc-sdk-raised-lift: ${go};
  --oc-sdk-lit: ${go};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,It=(e)=>{let o=j(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${j(`${e}-text`,"inherit")}; }`},fn=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: 2px; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,Rr=`${un}
.oc-sdk { color: ${fe}; font-family: ${pn}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Ar} }
.oc-sdk-mono { font-family: ${ho}; }
.oc-sdk-muted { color: ${K}; }
${It("success")}${It("warning")}${It("error")}${It("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${be}; --oc-sdk-tone-text: ${To}; }

.oc-sdk-btn { border-radius: ${Oo}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Or}; }
.oc-sdk-btn[data-variant="default"] { color: ${To}; background: ${z(be,10,ye)}; border-color: ${z(be,12)}; ${xr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${z(be,16,ye)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${z(be,22,ye)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${dn}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${pe}, ${pe}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Xe}, ${Xe}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${qe}; ${xo} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${pe}, ${pe}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Xe}, ${Xe}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${pe}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Xe}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${j("status-error","red")}; color: ${mo}; background: ${z("var(--oc-sdk-tone)",7,ye)}; border-color: ${z("var(--oc-sdk-tone)",12)}; ${xr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${z("var(--oc-sdk-tone)",9,ye)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${z("var(--oc-sdk-tone)",11,ye)}; box-shadow: none; }

.oc-sdk-field-note { color: ${K}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${mo}; }
.oc-sdk-input { border-radius: ${Oo}; background: var(--oc-sdk-field-bg); color: ${qe}; ${Ao("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${K}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${pe}, ${pe}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Ao(z(fe,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Ao(j("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${ho}; }

.oc-sdk-search-icon { color: ${K}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${be}; }
.oc-sdk-search-clear { border-radius: ${Or}; color: ${K}; }
.oc-sdk-search-clear:hover { background: ${pe}; color: ${fe}; }

.oc-sdk-trigger { border-radius: ${Oo}; background: var(--oc-sdk-raised-bg); color: ${qe}; ${xo} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${pe}, ${pe}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Xe}, ${Xe}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${K}; }
.oc-sdk-trigger-chevron { color: ${K}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${qe}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${kt}; background-clip: padding-box; color: ${qe}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${pe}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${_o}; color: ${So}; }
.oc-sdk-option-check { color: ${fe}; }
.oc-sdk-option[data-destructive="true"] { color: ${mo}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${z(j("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${K}; }
.oc-sdk-popup-empty { color: ${K}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Ve}; border-radius: 4px; color: ${fe}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${z(fe,60,Ve)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Ve}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ye}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${be}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Ar} }
.oc-sdk-check-desc { color: ${K}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${z(fe,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${K}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${fe}; }
.oc-sdk-tab[aria-selected="true"] { color: ${So}; background: ${_o}; border-color: ${Ve}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${qe}; background: var(--oc-sdk-raised-bg); ${xo} }
.oc-sdk-tab-count { color: ${K}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${z(fe,6)}; color: ${K}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${z("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${pe}; }
.oc-sdk-row[aria-selected="true"] { background: ${_o}; color: ${So}; }
.oc-sdk-row-lead { font-family: ${ho}; color: ${K}; }
.oc-sdk-row-sub { color: ${K}; }
.oc-sdk-row-meta { color: ${K}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${K}; }

.oc-sdk-empty-body { color: ${K}; }

.oc-sdk-spinner { color: ${K}; }
.oc-sdk-spinner-ring { border-color: ${Ve}; border-top-color: ${be}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${z("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${K}; }

.oc-sdk-separator { color: ${K}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${z(Ve,40)}; }

.oc-sdk-progress-label { color: ${K}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${z(fe,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${be}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${j("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${j("success-text","inherit")}; }

.oc-sdk-text a { color: ${To}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${z(Ve,60)}; }
`,X=`
${Ht}
${fn}
${Rr}`;var br="oc-sdk-ui-style",Fe=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},F=(e)=>{let o=document.getElementById(br);if(o instanceof HTMLStyleElement){if(o.textContent!==e)o.textContent=e;return}Vt(document);let t=document.createElement("style");t.id=br,t.textContent=e,document.head.appendChild(t)},R=(e,o)=>{let t=document.createElement(e);if(o)t.className=o;return t},_e=(e)=>{let o=R("button",e);return o.type="button",o},W=(e,o)=>{let t=o??"";if(e.textContent!==t)e.textContent=t},Se=(e,o,t)=>{if(t===void 0||t===null||t==="")e.removeAttribute(o);else if(e.getAttribute(o)!==t)e.setAttribute(o,t)},yr=(e,o)=>{let t=(n)=>{if(n.target instanceof Node&&e.contains(n.target))return;o()};return document.addEventListener("pointerdown",t,!0),()=>{document.removeEventListener("pointerdown",t,!0)}};var En=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},J=(e,o)=>{F(X);let t=o,n=_e("oc-sdk oc-sdk-btn"),s=En(),a=document.createElement("span");n.append(a),e.append(n);let c=()=>{if(n.dataset.variant=t.variant??"default",n.dataset.size=t.size??"default",n.disabled=Boolean(t.disabled)||Boolean(t.loading),n.dataset.loading=t.loading?"true":"false",n.setAttribute("aria-busy",t.loading?"true":"false"),t.loading&&s.parentNode!==n)n.prepend(s);else if(!t.loading&&s.parentNode===n)s.remove();W(a,t.label)},d=()=>{if(t.disabled||t.loading)return;t.onClick()};return n.addEventListener("click",d),c(),{update:(u)=>{t={...t,...u},c()},dispose:()=>{n.removeEventListener("click",d),n.remove()}}};var Ut=(e,o)=>{F(X);let t=o,n=R("label","oc-sdk oc-sdk-field"),s=R("span","oc-sdk-field-label"),a=t.multiline?R("textarea","oc-sdk-input"):R("input","oc-sdk-input"),c=R("span","oc-sdk-field-note");n.append(s,a,c),e.append(n);let d=()=>{if(W(s,t.label),s.hidden=!t.label,a instanceof HTMLInputElement)a.type=t.password?"password":"text";else a.rows=t.rows??3;if(a.value!==t.value)a.value=t.value;a.disabled=Boolean(t.disabled),Se(a,"placeholder",t.placeholder),a.dataset.mono=t.mono?"true":"false";let T=Boolean(t.error);n.dataset.invalid=T?"true":"false",a.setAttribute("aria-invalid",T?"true":"false");let _=t.error??t.helper??"";W(c,_),c.hidden=_===""},u=()=>{t.onChange(a.value)};return a.addEventListener("input",u),d(),{update:(T)=>{t={...t,...T},d()},dispose:()=>{a.removeEventListener("input",u),n.remove()}}};var _n={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},ve=(e,o,t)=>{let n=document.createElementNS("http://www.w3.org/2000/svg","svg");if(n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("width",String(o)),n.setAttribute("height",String(o)),n.setAttribute("aria-hidden","true"),n.setAttribute("fill","currentColor"),t)n.setAttribute("class",t);let s=document.createElementNS("http://www.w3.org/2000/svg","path");return s.setAttribute("d",_n[e]),n.append(s),n};var Ro=(e,o)=>{F(X);let t=o,n=R("div","oc-sdk oc-sdk-search"),s=R("input","oc-sdk-input");s.type="text",s.spellcheck=!1,s.autocomplete="off",s.setAttribute("role","searchbox");let a=_e("oc-sdk-search-clear");a.append(ve("close",14)),a.tabIndex=-1,n.append(ve("search",16,"oc-sdk-search-icon"),s,a),e.append(n);let c=()=>{let _=t.placeholder??"Search";if(Se(s,"placeholder",_),s.setAttribute("aria-label",t.label??_),a.setAttribute("aria-label","Clear search"),s.value!==t.value)s.value=t.value;n.dataset.active=t.value.trim()===""?"false":"true"},d=()=>{if(t.value!=="")t.onChange("");s.focus()},u=()=>{t.onChange(s.value)},T=(_)=>{if(_.key==="Escape"&&s.value!=="")_.preventDefault(),d()};if(s.addEventListener("input",u),s.addEventListener("keydown",T),a.addEventListener("click",d),c(),t.autofocus)s.focus();return{update:(_)=>{t={...t,..._},c()},dispose:()=>{s.removeEventListener("input",u),s.removeEventListener("keydown",T),a.removeEventListener("click",d),n.remove()}}};var Me=(e,o="vertical")=>{let[t,n]=o==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===t||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===n||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},Be=(e,o,t)=>{let n=e.filter((u)=>!u.disabled);if(n.length===0)return null;let s=n[0],a=n[n.length-1];if(t==="first"||!s||!a)return s?.id??null;if(t==="last")return a.id;let c=n.findIndex((u)=>u.id===o);if(c===-1)return t==="next"?s.id:a.id;return n[Math.min(n.length-1,Math.max(0,c+(t==="next"?1:-1)))]?.id??null};var vr=(e,o)=>`${e}-${o??""}`,bo=(e,o,t,n)=>{let s=_e("oc-sdk-option");if(s.id=vr(e,t.id),s.setAttribute("role",o),s.tabIndex=-1,s.disabled=Boolean(t.disabled),o==="option")s.setAttribute("aria-selected",t.selected?"true":"false");s.dataset.destructive=t.destructive?"true":"false";let a=R("span","oc-sdk-option-label");if(a.textContent=t.label,s.append(a),t.hint){let c=R("span","oc-sdk-option-hint");c.textContent=t.hint,s.append(c)}if(o==="option"){s.dataset.mark="check";let c=R("span","oc-sdk-option-check");c.append(ve("check",14)),s.append(c)}return s.addEventListener("pointerenter",n.hover),s.addEventListener("click",n.pick),s},yo=(e,o,t,n)=>{let s=vr(t,n);for(let a of Array.from(e.children))if(a instanceof HTMLElement&&a.classList.contains("oc-sdk-option"))a.dataset.active=a.id===s?"true":"false";Se(o,"aria-activedescendant",n?s:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Sn=(e,o)=>{let t=o.getBoundingClientRect();e.style.minWidth=`${Math.round(t.width)}px`,e.style.left=`${Math.round(t.left)}px`,e.style.top=`${Math.round(t.bottom+4)}px`;let n=e.offsetHeight,s=window.innerHeight-t.bottom-8;if(n>s&&t.top-8>s)e.style.top=`${Math.max(8,Math.round(t.top-4-n))}px`;let a=t.left+e.offsetWidth-window.innerWidth+8;if(a>0)e.style.left=`${Math.max(8,Math.round(t.left-a))}px`},vo=(e,o,t,n)=>{e.append(t),Sn(t,o);let s=yr(e,n),a=()=>{n()},c=(d)=>{if(d.target instanceof Node&&t.contains(d.target))return;n()};return window.addEventListener("resize",a),window.addEventListener("scroll",c,!0),()=>{s(),window.removeEventListener("resize",a),window.removeEventListener("scroll",c,!0),t.remove()}};var Cr=(e,o)=>{let t=o.trim().toLowerCase();if(!t)return[...e];return e.filter((n)=>n.label.toLowerCase().includes(t)||n.id.toLowerCase().includes(t))},Tn=0,Co=(e,o)=>{F(X);let t=o,n=`oc-sdk-select-${Tn+=1}`,s=R("div","oc-sdk oc-sdk-select"),a=R("span","oc-sdk-field-label");a.id=`${n}-label`;let c=_e("oc-sdk-trigger");c.setAttribute("aria-haspopup","listbox"),c.setAttribute("aria-labelledby",a.id);let d=R("span","oc-sdk-trigger-value");c.append(d,ve("chevron",14,"oc-sdk-trigger-chevron")),s.append(a,c),e.append(s);let u="",T=null,_=null,m=R("div","oc-sdk oc-sdk-popup"),A=R("div","oc-sdk-popup-search"),h=R("input","oc-sdk-input");h.type="text",h.autocomplete="off",A.append(h);let v=R("div");v.setAttribute("role","listbox"),v.tabIndex=-1,m.append(v);let C=()=>Cr(t.options,t.searchable?u:""),M=()=>t.searchable?h:v,I=(l)=>{T=l,yo(v,M(),n,l)},G=()=>{Fe(v);let l=C();if(l.length===0){let p=R("div","oc-sdk-popup-empty");p.textContent="No matches",v.append(p)}for(let p of l)v.append(bo(n,"option",{...p,selected:p.id===t.value},{hover:()=>I(p.id),pick:()=>x(p.id)}));I(l.some((p)=>p.id===T)?T:l[0]?.id??null)},Q=()=>{let l=_;_=null,l?.(),u="",h.value="",c.setAttribute("aria-expanded","false")},w=()=>{if(_||t.disabled)return;if(T=t.value,h.placeholder=t.searchPlaceholder??"Search",t.searchable)m.prepend(A);else A.remove();G(),_=vo(s,c,m,Q),c.setAttribute("aria-expanded","true"),M().focus()},x=(l)=>{if(Q(),c.focus(),l!==t.value)t.onChange(l)},f=()=>{if(_)Q();else w()},g=(l)=>{if(!_&&Me(l))l.preventDefault(),w()},Y=(l)=>{let p=Me(l);if(p)l.preventDefault(),I(Be(C(),T,p));else if(l.key==="Enter"){if(l.preventDefault(),T)x(T)}else if(l.key==="Escape")l.preventDefault(),Q(),c.focus();else if(t.searchable&&l.target!==h&&l.key.length===1&&!l.ctrlKey&&!l.metaKey)h.focus()},q=()=>{u=h.value,G()},le=(l)=>{if(_&&!(l.relatedTarget instanceof Node&&s.contains(l.relatedTarget)))Q()},Z=()=>{W(a,t.label),a.hidden=!t.label;let l=t.options.find((p)=>p.id===t.value);if(W(d,l?.label??t.placeholder??"Select"),d.dataset.empty=l?"false":"true",c.disabled=Boolean(t.disabled),_)G()};return c.addEventListener("click",f),c.addEventListener("keydown",g),m.addEventListener("keydown",Y),h.addEventListener("input",q),s.addEventListener("focusout",le),Z(),{update:(l)=>{t={...t,...l},Z()},dispose:()=>{Q(),c.removeEventListener("click",f),c.removeEventListener("keydown",g),m.removeEventListener("keydown",Y),h.removeEventListener("input",q),s.removeEventListener("focusout",le),s.remove()}}};var Nt=(e,o)=>{Se(e,"data-tone",o&&o!=="neutral"?o:null)},Io=(e,o)=>{F(X);let t=o,n=R("span","oc-sdk oc-sdk-badge");e.append(n);let s=()=>{W(n,t.label),Nt(n,t.tone)};return s(),{update:(a)=>{t={...t,...a},s()},dispose:()=>{n.remove()}}};var mn=0,at=(e,o)=>{F(X);let t=o,n=`oc-sdk-list-${mn+=1}`,s=R("div","oc-sdk oc-sdk-list");s.setAttribute("role","listbox"),s.tabIndex=0,e.append(s);let a=null,c=(m)=>`${n}-${m}`,d=(m)=>{a=m;for(let A of Array.from(s.children))if(A instanceof HTMLElement)A.dataset.active=A.id===c(m??"")?"true":"false";Se(s,"aria-activedescendant",m?c(m):null),s.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},u=(m,A)=>{let h=R("span",m);return h.textContent=A,h},T=()=>{if(Fe(s),Se(s,"aria-label",t.ariaLabel),t.items.length===0){s.append(u("oc-sdk-list-empty",t.emptyText??"Nothing here")),d(null);return}for(let A of t.items){let h=_e("oc-sdk-row");if(h.id=c(A.id),h.setAttribute("role","option"),h.setAttribute("aria-selected",A.id===t.selectedId?"true":"false"),h.disabled=Boolean(A.disabled),h.tabIndex=-1,A.leading)h.append(u("oc-sdk-row-lead",A.leading));let v=R("span","oc-sdk-row-main");if(v.append(u("oc-sdk-row-title",A.title)),A.subtitle)v.append(u("oc-sdk-row-sub",A.subtitle));if(h.append(v),A.badge){let C=u("oc-sdk-badge",A.badge.label);Nt(C,A.badge.tone),h.append(C)}if(A.meta)h.append(u("oc-sdk-row-meta",A.meta));h.addEventListener("click",()=>t.onSelect(A.id)),s.append(h)}let m=t.items.some((A)=>A.id===a&&!A.disabled);d(m?a:t.selectedId??null)},_=(m)=>{let A=Me(m);if(A){m.preventDefault(),d(Be(t.items,a,A));return}if((m.key==="Enter"||m.key===" ")&&a)m.preventDefault(),t.onSelect(a)};return s.addEventListener("keydown",_),T(),{update:(m)=>{t={...t,...m},T()},dispose:()=>{s.removeEventListener("keydown",_),s.remove()}}};var Mt=(e,o)=>{F(X);let t=o,n=R("div","oc-sdk oc-sdk-empty"),s=R("h2","oc-sdk-empty-title"),a=R("p","oc-sdk-empty-body"),c=R("div","oc-sdk-empty-action");n.append(s,a,c),e.append(n);let d=null,u=()=>{if(W(s,t.title),W(a,t.body),a.hidden=!t.body,c.hidden=!t.action,!t.action){d?.dispose(),d=null;return}let T={label:t.action.label,onClick:t.action.onClick};if(d)d.update(T);else d=J(c,{...T,variant:"outline",size:"sm"})};return u(),{update:(T)=>{t={...t,...T},u()},dispose:()=>{d?.dispose(),d=null,n.remove()}}};var ko=(e,o={})=>{F(X);let t=o,n=R("span","oc-sdk oc-sdk-spinner");n.setAttribute("role","status");let s=R("span","oc-sdk-spinner-ring");s.setAttribute("aria-hidden","true");let a=R("span");n.append(s,a),e.append(n);let c=()=>{n.dataset.size=t.size??"default",W(a,t.label),a.hidden=!t.label,n.setAttribute("aria-label",t.label??"Loading")};return c(),{update:(d)=>{t={...t,...d},c()},dispose:()=>{n.remove()}}};var wt=(e,o)=>{F(X);let t=o,n=R("div","oc-sdk oc-sdk-banner"),s=R("div","oc-sdk-banner-text"),a=R("div","oc-sdk-banner-title"),c=R("div","oc-sdk-banner-body"),d=R("div","oc-sdk-banner-action");s.append(a,c),n.append(s,d),e.append(n);let u=null,T=()=>{if(n.dataset.tone=t.tone,n.setAttribute("role",t.tone==="error"||t.tone==="warning"?"alert":"status"),W(a,t.title),W(c,t.body),c.hidden=!t.body,d.hidden=!t.action,!t.action){u?.dispose(),u=null;return}let _={label:t.action.label,onClick:t.action.onClick};if(u)u.update(_);else u=J(d,{..._,variant:"outline",size:"xs"})};return T(),{update:(_)=>{t={...t,..._},T()},dispose:()=>{u?.dispose(),u=null,n.remove()}}};var Pt=(e,o={})=>{F(X);let t=o,n=R("div","oc-sdk oc-sdk-separator");n.setAttribute("role","separator");let s=R("span");n.append(s),e.append(n);let a=()=>{W(s,t.label),s.hidden=!t.label,n.dataset.labeled=t.label?"true":"false"};return a(),{update:(c)=>{t={...t,...c},a()},dispose:()=>{n.remove()}}};var Lt=(e)=>{let o=e.trim();return o.startsWith("/")||/^[A-Za-z]:[\\/]/.test(o)},et=(e,o={})=>{let t=e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/");if(t.length>1&&t.endsWith("/"))t=t.replace(/\/+$/,"");if(t==="")t=e.trim().startsWith("/")?"/":"";return o.caseInsensitive?t.toLowerCase():t},we=(e,o,t={})=>et(e,t)===et(o,t);var Ir="default",$e=()=>({version:1,activeId:Ir,profiles:[{id:Ir,name:"Default",folders:[]}]}),hn=(e)=>e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"profile",On=(e,o)=>{let t=hn(o),n=new Set(e.profiles.map((a)=>a.id));if(!n.has(t))return t;let s=2;while(n.has(`${t}-${s}`))s+=1;return`${t}-${s}`},Uo=(e,o,t)=>{if(!e.profiles.some((n)=>n.id===o))throw Error(`Unknown profile: ${o}`);return{...e,profiles:e.profiles.map((n)=>n.id===o?t(n):n)}},kr=(e)=>{let o=e.trim();if(!o)throw Error("Profile name is required");return o},Ur=(e,o)=>{let t=kr(o),n={id:On(e,t),name:t,folders:[]};return{...e,profiles:[...e.profiles,n]}},Nr=(e,o,t)=>{let n=kr(t);return Uo(e,o,(s)=>({...s,name:n}))},Mr=(e,o)=>{if(!e.profiles.some((s)=>s.id===o))throw Error(`Unknown profile: ${o}`);let t=e.profiles.filter((s)=>s.id!==o);if(t.length===0)return $e();let n=e.activeId===o?t[0].id:e.activeId;return{...e,activeId:n,profiles:t}},No=(e,o)=>{if(!e.profiles.some((t)=>t.id===o))throw Error(`Unknown profile: ${o}`);return{...e,activeId:o}},wr=(e,o,t)=>{if(!Lt(t))throw Error("Folder path must be absolute");let n=et(t);return Uo(e,o,(s)=>s.folders.some((a)=>we(a,n))?s:{...s,folders:[...s.folders,n]})},Pr=(e,o,t)=>Uo(e,o,(n)=>({...n,folders:n.folders.filter((s)=>!we(s,t))}));var Lr="profiles.v1",Dr=(e)=>typeof e==="object"&&e!==null&&!Array.isArray(e),An=(e)=>{if(!Dr(e)||typeof e.id!=="string"||!e.id||typeof e.name!=="string"||!Array.isArray(e.folders))return null;if(!e.folders.every((n)=>typeof n==="string"))return null;let o=new Set,t=[];for(let n of e.folders){let s=et(n);if(s&&!o.has(s))o.add(s),t.push(s)}return{id:e.id,name:e.name,folders:t}},xn=(e)=>{if(e===void 0)return{state:$e(),corrupt:!1};if(!Dr(e)||e.version!==1||!Array.isArray(e.profiles))return{state:$e(),corrupt:!0};let o=e.profiles.map(An),t=o.filter((a)=>a!==null),n=new Set(t.map((a)=>a.id));if(t.length===0||o.length!==t.length||n.size!==t.length)return{state:$e(),corrupt:!0};return{state:{version:1,activeId:typeof e.activeId==="string"&&n.has(e.activeId)?e.activeId:t[0].id,profiles:t},corrupt:!1}},Gr=async(e)=>xn(await e.get(Lr)),Hr=(e,o)=>e.set(Lr,o);var Vr=20,gn=["waiting-permission","waiting-question"],Rn=["running","retrying"],bn=(e)=>{if(e.some((o)=>gn.includes(o.activity)))return"waiting";if(e.some((o)=>Rn.includes(o.activity)))return"running";return"idle"},yn=(e,o)=>{for(let t of o.projects)if(we(e,t.directory))return{project:t,via:"project"};for(let t of o.projects)if((o.worktrees[t.id]??[]).some((n)=>we(e,n.directory)))return{project:t,via:"worktree"};return null},vn=(e,o)=>{let t=yn(e,o);if(!t)return{path:e,kind:"not-added",project:null,sessions:[],hiddenSessions:0,attention:"idle"};let n=(o.sessions[t.project.id]??[]).filter((s)=>!s.parentId&&!s.archivedAt).filter((s)=>t.via==="project"||we(s.directory,e)).sort((s,a)=>a.updatedAt-s.updatedAt);return{path:e,kind:"registered",project:{id:t.project.id,name:t.project.name},sessions:n.slice(0,Vr).map(({id:s,title:a,updatedAt:c,activity:d})=>({id:s,title:a,updatedAt:c,activity:d})),hiddenSessions:Math.max(0,n.length-Vr),attention:bn(n)}},Xr=(e,o)=>e.projects.filter((t)=>{let n=[t.directory,...(e.worktrees[t.id]??[]).map((s)=>s.directory)];return!o.some((s)=>n.some((a)=>we(s,a)))}).map((t)=>({projectId:t.id,name:t.name,path:t.directory})),Fr=(e)=>{let{state:o}=e,t=o.profiles.find((n)=>n.id===o.activeId)??o.profiles[0];return{profiles:o.profiles.map((n)=>({id:n.id,name:n.name,folderCount:n.folders.length,active:n.id===t.id})),activeProfile:{id:t.id,name:t.name,folders:t.folders.map((n)=>vn(n,e))},unassigned:Xr(e,o.profiles.flatMap((n)=>n.folders)),pickable:Xr(e,t.folders)}};var Cn=31,Mo=(e)=>e instanceof Error?e.message:String(e),Br=(e)=>{let o=$e(),t=!1,n=!1,s=[],a="loading",c={},d={},u,T=!1,_=new Map,m=null,A=new Set,h,v=()=>{let x=Fr({state:o,projects:s,worktrees:c,sessions:d}),f="ready",g;if(u)f="error",g=u;else if(!n||a==="loading")f="loading";else if(a==="error"&&s.length===0)f="error",g="Could not load projects from OpenChamber.";return{status:f,error:g,corrupt:t,vm:x}},C=()=>{h=v(),M();for(let x of A)x()},M=()=>{let x=new Set;for(let f of h.vm.activeProfile.folders){if(f.project)x.add(f.project.id);if(x.size>=Cn)break}for(let[f,g]of _)if(!x.has(f))g(),_.delete(f),delete d[f];for(let f of x){if(_.has(f))continue;_.set(f,()=>{}),e.onSessions(f,(g)=>{d={...d,[f]:g.sessions},C()}).then((g)=>{if(T||!_.has(f))g();else _.set(f,g)}).catch((g)=>{_.delete(f),console.error("sessions subscription failed",f,g)})}},I=async(x)=>{let f=await Promise.all(x.map(async(g)=>{try{return[g.id,(await e.listWorktrees(g.id)).worktrees]}catch{return[g.id,[]]}}));if(T)return;c=Object.fromEntries(f),C()},G=(x)=>{try{w(x(o))}catch(f){e.toast({kind:"error",message:Mo(f)})}},Q=Promise.resolve(),w=(x)=>{o=x,t=!1,C(),Q=Q.then(()=>Hr(e.storage,o)).catch((f)=>{e.toast({kind:"error",message:`Could not save profiles: ${Mo(f)}`})})};return h=v(),(async()=>{try{let x=await Gr(e.storage);o=x.state,t=x.corrupt,n=!0,C();let f=await e.onProjects((g)=>{s=g.projects,a=g.state,C(),I(s)});if(T)f();else m=f}catch(x){u=Mo(x),C()}})(),{get:()=>h,subscribe(x){return A.add(x),()=>A.delete(x)},selectProfile:(x)=>G((f)=>No(f,x)),createProfile:(x)=>G((f)=>{let g=Ur(f,x);return No(g,g.profiles[g.profiles.length-1].id)}),renameProfile:(x,f)=>G((g)=>Nr(g,x,f)),deleteProfile:(x)=>G((f)=>Mr(f,x)),addFolder:(x,f)=>G((g)=>wr(g,f??g.activeId,x)),removeFolder:(x)=>G((f)=>Pr(f,f.activeId,x)),dispose(){T=!0,m?.();for(let x of _.values())x();_.clear(),A.clear()}}};var $r=`
/* Layout container */
.oc-profiles-app {
  display: flex;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  background: var(--surface-background, var(--oc-bg, transparent));
  color: var(--surface-foreground, var(--oc-fg, inherit));
  font-family: var(--font-sans, var(--oc-font, inherit));
  font-size: 0.875rem;
  line-height: 1.45;
}

.oc-profiles-app *,
.oc-profiles-app *::before,
.oc-profiles-app *::after {
  box-sizing: border-box;
}

/* Sidebar (Left Column) */
.oc-profiles-sidebar {
  flex: 0 0 240px;
  width: 240px;
  min-width: 200px;
  max-width: 300px;
  border-right: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.18)));
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  background: var(--surface-background, var(--oc-bg, transparent));
}

.oc-profiles-sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px 0;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
}

.oc-profiles-sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.oc-profiles-sidebar-footer {
  margin-top: auto;
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* New Profile inline form in sidebar */
.oc-profiles-sidebar-action {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 2px;
}

.oc-profiles-new-profile-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 10px;
  border-radius: var(--radius, 9px);
  background: var(--surface-elevated, var(--oc-elevated, rgba(128, 128, 128, 0.04)));
  border: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.2)));
}

.oc-profiles-form-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Main Area */
.oc-profiles-main {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 24px 32px;
  gap: 20px;
}

.oc-profiles-main-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.oc-profiles-header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.oc-profiles-header-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.oc-profiles-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.oc-profiles-main-title {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.015em;
  margin: 0;
  color: var(--surface-foreground, var(--oc-fg, inherit));
}

.oc-profiles-main-subtitle {
  font-size: 0.8125rem;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  margin: 0;
}

/* Inline rename form */
.oc-profiles-rename-form {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  width: 100%;
}

.oc-profiles-rename-form .oc-sdk-input {
  height: 28px;
  font-size: 1rem;
  font-weight: 600;
  max-width: 320px;
}

/* Inline delete confirmation */
.oc-profiles-delete-confirm {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
  border-radius: var(--radius, 10px);
  background: color-mix(in srgb, var(--status-error, var(--oc-error, #ef4444)) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--status-error, var(--oc-error, #ef4444)) 22%, transparent);
}

.oc-profiles-delete-confirm-text {
  font-size: 0.8125rem;
  color: var(--surface-foreground, var(--oc-fg, inherit));
  line-height: 1.4;
  margin: 0;
}

/* Add folder panel */
.oc-profiles-add-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: var(--radius, 10px);
  background: var(--surface-elevated, var(--oc-elevated, rgba(128, 128, 128, 0.04)));
  border: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.2)));
  box-shadow: var(--oc-sdk-raised-lift, 0 1px 1.5px 0 rgb(0 0 0 / 0.06));
}

.oc-profiles-add-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.oc-profiles-add-panel-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
}

.oc-profiles-add-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.oc-profiles-add-section-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
}

.oc-profiles-pickable-list-wrap {
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.16)));
  border-radius: calc(var(--radius, 9px) - 2px);
  padding: 2px;
}

.oc-profiles-empty-hint {
  font-size: 0.8125rem;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  margin: 0;
  padding: 6px 2px;
}

.oc-profiles-typed-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.oc-profiles-typed-row .oc-sdk-field {
  flex: 1 1 auto;
}

.oc-profiles-banner-slot {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.oc-profiles-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
}

.oc-profiles-loading-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 16px;
}

/* Folder Cards */
.oc-profiles-folder-card {
  border: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.18)));
  border-radius: var(--radius, 10px);
  background: var(--surface-elevated, var(--oc-elevated, rgba(128, 128, 128, 0.03)));
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 150ms ease, box-shadow 150ms ease;
  box-shadow: var(--oc-sdk-raised-lift, 0 1px 1.5px 0 rgb(0 0 0 / 0.06));
}

.oc-profiles-folder-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.oc-profiles-folder-meta {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  flex: 1 1 auto;
}

.oc-profiles-folder-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.oc-profiles-folder-basename {
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.oc-profiles-folder-path {
  font-size: 0.75rem;
  font-family: var(--font-mono, var(--oc-mono, monospace));
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.oc-profiles-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  flex-shrink: 0;
  display: inline-block;
}

.oc-profiles-status-dot[data-status="waiting"] {
  background: var(--status-warning, var(--oc-warning, #f59e0b));
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--status-warning, #f59e0b) 25%, transparent);
}

.oc-profiles-status-dot[data-status="running"] {
  background: var(--status-info, var(--oc-info, #3b82f6));
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--status-info, #3b82f6) 25%, transparent);
}

.oc-profiles-status-dot[data-status="idle"] {
  background: var(--surface-muted-foreground, var(--oc-muted, #888888));
  opacity: 0.6;
}

.oc-profiles-folder-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* Not-added state */
.oc-profiles-not-added-callout {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: calc(var(--radius, 9px) - 2px);
  font-size: 0.8125rem;
  background: color-mix(in srgb, var(--surface-foreground, currentColor) 4%, transparent);
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  border: 1px dashed var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.25)));
}

.oc-profiles-not-added-icon {
  font-size: 0.875rem;
  flex-shrink: 0;
}

/* Sessions list */
.oc-profiles-sessions-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.12)));
  padding-top: 10px;
}

.oc-profiles-sessions-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.oc-profiles-session-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 8px;
  border-radius: calc(var(--radius, 9px) - 3px);
  font-size: 0.8125rem;
  transition: background 120ms ease;
}

.oc-profiles-session-row:hover {
  background: var(--interactive-hover, var(--oc-hover, rgba(128, 128, 128, 0.06)));
}

.oc-profiles-session-lead {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1 1 auto;
}

.oc-profiles-session-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  color: var(--surface-foreground, var(--oc-fg, inherit));
}

.oc-profiles-session-trail {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  font-size: 0.75rem;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  font-variant-numeric: tabular-nums;
}

.oc-profiles-session-actions {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.oc-profiles-sessions-more {
  font-size: 0.75rem;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  font-weight: 500;
  padding: 4px 8px;
}

.oc-profiles-sessions-empty {
  font-size: 0.8125rem;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  padding: 6px 4px;
}

/* Unassigned cards */
.oc-profiles-unassigned-card {
  border: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.18)));
  border-radius: var(--radius, 10px);
  background: var(--surface-elevated, var(--oc-elevated, rgba(128, 128, 128, 0.03)));
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  box-shadow: var(--oc-sdk-raised-lift, 0 1px 1.5px 0 rgb(0 0 0 / 0.06));
}

.oc-profiles-unassigned-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1 1 auto;
}

.oc-profiles-unassigned-name {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.oc-profiles-unassigned-path {
  font-size: 0.75rem;
  font-family: var(--font-mono, var(--oc-mono, monospace));
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.oc-profiles-unassigned-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* Narrow viewport adaptations */
@media (max-width: 640px) {
  .oc-profiles-app {
    flex-direction: column;
  }

  .oc-profiles-sidebar {
    width: 100%;
    flex: 0 0 auto;
    max-width: none;
    border-right: none;
    border-bottom: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.18)));
    padding: 12px;
  }

  .oc-profiles-main {
    padding: 16px;
    gap: 16px;
  }

  .oc-profiles-header-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .oc-profiles-typed-row {
    flex-direction: column;
    align-items: stretch;
  }

  .oc-profiles-unassigned-card {
    flex-direction: column;
    align-items: stretch;
  }

  .oc-profiles-unassigned-actions {
    justify-content: flex-end;
  }
}
`;var In=(e)=>{let o=e.replace(/[\\/]+$/,""),t=Math.max(o.lastIndexOf("/"),o.lastIndexOf("\\"));if(t>=0)return o.slice(t+1)||e;return e},kn=(e,o=Date.now())=>{let t=Math.max(0,o-e),n=Math.floor(t/1000);if(n<60)return"just now";let s=Math.floor(n/60);if(s<60)return`${s}m ago`;let a=Math.floor(s/60);if(a<24)return`${a}h ago`;let c=Math.floor(a/24);if(c<30)return`${c}d ago`;let d=Math.floor(c/30);if(d<12)return`${d}mo ago`;return`${Math.floor(c/365)}y ago`},Un=(e)=>{switch(e){case"waiting-permission":return{label:"waiting for permission",tone:"warning"};case"waiting-question":return{label:"waiting for answer",tone:"warning"};case"running":return{label:"running",tone:"info"};case"retrying":return{label:"retrying",tone:"warning"};case"idle":case"unknown":default:return{label:"idle",tone:"neutral"}}},Nn=(e)=>{let t=document.getElementById("oc-profiles-view-style");if(!t)t=document.createElement("style"),t.id="oc-profiles-view-style",document.head.appendChild(t);if(t.textContent!==e)t.textContent=e},Mn=(e,o)=>{let t=document.createElement("div");t.className="oc-profiles-folder-card";let n=document.createElement("div");n.className="oc-profiles-folder-header";let s=document.createElement("div");s.className="oc-profiles-folder-meta";let a=document.createElement("div");a.className="oc-profiles-folder-title-row";let c=document.createElement("span");c.className="oc-profiles-status-dot";let d=document.createElement("span");d.className="oc-profiles-folder-basename",a.appendChild(c),a.appendChild(d);let u=document.createElement("span");u.className="oc-profiles-folder-path",s.appendChild(a),s.appendChild(u);let T=document.createElement("div");T.className="oc-profiles-folder-actions";let _=J(T,{label:"Remove",variant:"ghost",size:"xs",onClick:()=>o.removeFolder(e.path)});n.appendChild(s),n.appendChild(T),t.appendChild(n);let m=document.createElement("div");m.className="oc-profiles-not-added-callout";let A=document.createElement("span");A.className="oc-profiles-not-added-icon",A.textContent="ℹ";let h=document.createElement("span");h.textContent="Add this folder as a project in the sidebar once",m.appendChild(A),m.appendChild(h);let v=document.createElement("div");v.className="oc-profiles-sessions-container";let C=document.createElement("div");C.className="oc-profiles-sessions-empty",C.textContent="No sessions yet";let M=document.createElement("div");M.className="oc-profiles-sessions-list";let I=document.createElement("div");I.className="oc-profiles-sessions-more",v.appendChild(C),v.appendChild(M),v.appendChild(I);let G=[],Q=(w,x)=>{if(c.dataset.status=w.attention,c.setAttribute("title",`Status: ${w.attention}`),c.setAttribute("aria-label",`Status: ${w.attention}`),d.textContent=In(w.path),d.title=w.path,u.textContent=w.path,u.title=w.path,_.update({onClick:()=>x.removeFolder(w.path)}),w.kind==="not-added"){if(!m.parentElement)t.appendChild(m);if(v.parentElement)v.remove()}else{if(m.parentElement)m.remove();if(!v.parentElement)t.appendChild(v);if(w.sessions.length===0)C.style.display="",M.style.display="none",I.style.display="none";else{C.style.display="none",M.style.display="";while(G.length<w.sessions.length){let f=document.createElement("div");f.className="oc-profiles-session-row";let g=document.createElement("div");g.className="oc-profiles-session-lead";let Y=document.createElement("span");Y.className="oc-profiles-session-title",g.appendChild(Y);let q=document.createElement("span");g.appendChild(q);let le=Io(q,{label:"",tone:"neutral"}),Z=document.createElement("div");Z.className="oc-profiles-session-trail";let l=document.createElement("span");Z.appendChild(l);let p=document.createElement("div");p.className="oc-profiles-session-actions",p.setAttribute("aria-hidden","true"),Z.appendChild(p),f.appendChild(g),f.appendChild(Z),M.appendChild(f),G.push({element:f,titleEl:Y,badgeHandle:le,timeEl:l})}while(G.length>w.sessions.length){let f=G.pop();f.badgeHandle.dispose(),f.element.remove()}if(w.sessions.forEach((f,g)=>{let Y=G[g];Y.titleEl.textContent=f.title||"Untitled session",Y.titleEl.title=f.title||"Untitled session";let q=Un(f.activity);Y.badgeHandle.update({label:q.label,tone:q.tone}),Y.timeEl.textContent=kn(f.updatedAt)}),w.hiddenSessions>0)I.style.display="",I.textContent=`+${w.hiddenSessions} more`;else I.style.display="none"}}};return Q(e,o),{element:t,update:Q,dispose:()=>{_.dispose();for(let w of G)w.badgeHandle.dispose();G=[],t.remove()}}},wn=(e,o,t)=>{let n=document.createElement("div");n.className="oc-profiles-unassigned-card";let s=document.createElement("div");s.className="oc-profiles-unassigned-info";let a=document.createElement("span");a.className="oc-profiles-unassigned-name";let c=document.createElement("span");c.className="oc-profiles-unassigned-path",s.appendChild(a),s.appendChild(c);let d=document.createElement("div");d.className="oc-profiles-unassigned-actions",n.appendChild(s),n.appendChild(d);let u=null,T=null,_=null,m=o.find((h)=>h.active)?.id??o[0]?.id??"",A=(h,v,C)=>{if(a.textContent=h.name,c.textContent=h.path,c.title=h.path,!v.some((M)=>M.id===m))m=v.find((M)=>M.active)?.id??v[0]?.id??"";if(v.length<=1){if(T)T.dispose(),T=null;if(_)_.dispose(),_=null;let M=v[0]?.name??"profile",I=v[0]?.id;if(!u)u=J(d,{label:`Add to ${M}`,variant:"secondary",size:"sm",onClick:()=>{if(I)C.addFolder(h.path,I);else C.addFolder(h.path)}});else u.update({label:`Add to ${M}`,onClick:()=>{if(I)C.addFolder(h.path,I);else C.addFolder(h.path)}})}else{if(u)u.dispose(),u=null;let M=v.map((I)=>({id:I.id,label:I.active?`${I.name} (active)`:I.name}));if(!T)T=Co(d,{options:M,value:m,onChange:(I)=>{m=I}});else T.update({options:M,value:m});if(!_)_=J(d,{label:"Add",variant:"secondary",size:"sm",onClick:()=>{C.addFolder(h.path,m)}});else _.update({onClick:()=>{C.addFolder(h.path,m)}})}};return A(e,o,t),{element:n,update:A,dispose:()=>{u?.dispose(),T?.dispose(),_?.dispose(),n.remove()}}},jr=(e)=>{Nn($r);let o=null,t=null,n={kind:"profile"},s=!1,a="",c,d=!1,u=null,T="",_=!1,m=null,A=!1,h="",v="",C;while(e.firstChild)e.removeChild(e.firstChild);let M=document.createElement("div");M.className="oc-profiles-app oc-sdk",e.appendChild(M);let I=document.createElement("aside");I.className="oc-profiles-sidebar",M.appendChild(I);let G=document.createElement("div");G.className="oc-profiles-sidebar-header",G.textContent="Profiles",I.appendChild(G);let Q=document.createElement("div");Q.className="oc-profiles-sidebar-section",I.appendChild(Q);let w=at(Q,{items:[],ariaLabel:"Profiles",onSelect:(E)=>{if(n={kind:"profile"},t?.selectProfile(E),o&&t)ce(o,t)}}),x=document.createElement("div");x.className="oc-profiles-sidebar-action",I.appendChild(x);let f=document.createElement("div");x.appendChild(f);let g=document.createElement("div");g.className="oc-profiles-new-profile-form",g.style.display="none",x.appendChild(g);let Y=document.createElement("div");g.appendChild(Y);let q=document.createElement("div");q.className="oc-profiles-form-actions",g.appendChild(q);let le=()=>{let E=a.trim();if(!E){c="Name cannot be empty",p.update({error:c});return}if(t?.createProfile(E),s=!1,a="",c=void 0,o&&t)ce(o,t)},Z=()=>{if(s=!1,a="",c=void 0,o&&t)ce(o,t)},l=J(f,{label:"+ New profile",variant:"ghost",size:"sm",onClick:()=>{if(s=!0,a="",c=void 0,o&&t)ce(o,t);g.querySelector("input")?.focus()}}),p=Ut(Y,{placeholder:"Profile name",value:"",onChange:(E)=>{a=E,c=void 0,p.update({value:E,error:void 0}),ue.update({disabled:!E.trim()})}}),ue=J(q,{label:"Create",variant:"default",size:"xs",disabled:!0,onClick:le}),Le=J(q,{label:"Cancel",variant:"ghost",size:"xs",onClick:Z});g.addEventListener("keydown",(E)=>{if(E.key==="Enter")E.preventDefault(),le();else if(E.key==="Escape")E.preventDefault(),Z()});let Ce=document.createElement("div");I.appendChild(Ce);let ct=Pt(Ce,{label:"Library"}),je=document.createElement("div");je.className="oc-profiles-sidebar-section",I.appendChild(je);let ne=at(je,{items:[],ariaLabel:"Unassigned library",onSelect:()=>{if(n={kind:"unassigned"},o&&t)ce(o,t)}}),Oe=document.createElement("main");Oe.className="oc-profiles-main",M.appendChild(Oe);let L=document.createElement("header");L.className="oc-profiles-main-header",Oe.appendChild(L);let De=document.createElement("div");De.className="oc-profiles-header-top",L.appendChild(De);let ee=document.createElement("div");ee.className="oc-profiles-header-title-row",De.appendChild(ee);let P=document.createElement("h1");P.className="oc-profiles-main-title",ee.appendChild(P);let D=document.createElement("div");D.className="oc-profiles-rename-form",D.style.display="none",ee.appendChild(D);let de=document.createElement("input");de.type="text",de.className="oc-sdk-input",de.placeholder="Profile name",D.appendChild(de);let Ge=document.createElement("div");Ge.className="oc-profiles-form-actions",D.appendChild(Ge);let tt=()=>{let E=T.trim();if(E&&u)t?.renameProfile(u,E);if(d=!1,u=null,o&&t)ce(o,t)},ot=()=>{if(d=!1,u=null,o&&t)ce(o,t)},Ie=J(Ge,{label:"Save",variant:"default",size:"xs",onClick:tt}),Ke=J(Ge,{label:"Cancel",variant:"ghost",size:"xs",onClick:ot});de.addEventListener("input",()=>{T=de.value,Ie.update({disabled:!T.trim()})}),de.addEventListener("keydown",(E)=>{if(E.key==="Enter")E.preventDefault(),tt();else if(E.key==="Escape")E.preventDefault(),ot()});let Te=document.createElement("div");Te.className="oc-profiles-header-actions",De.appendChild(Te);let ze=J(Te,{label:"Rename",variant:"ghost",size:"xs",onClick:()=>{if(!o)return;d=!0,u=o.vm.activeProfile.id,T=o.vm.activeProfile.name,de.value=T,_=!1,ce(o,t),de.focus(),de.select()}}),We=J(Te,{label:"Delete",variant:"ghost",size:"xs",onClick:()=>{if(!o)return;_=!0,m=o.vm.activeProfile.id,d=!1,ce(o,t)}}),se=J(Te,{label:"+ Add folder",variant:"secondary",size:"sm",onClick:()=>{if(A=!A,o&&t)ce(o,t)}}),Ae=document.createElement("p");Ae.className="oc-profiles-main-subtitle",L.appendChild(Ae);let Ee=document.createElement("div");Ee.className="oc-profiles-delete-confirm",Ee.style.display="none",L.appendChild(Ee);let rt=document.createElement("p");rt.className="oc-profiles-delete-confirm-text",Ee.appendChild(rt);let xe=document.createElement("div");xe.className="oc-profiles-form-actions",Ee.appendChild(xe);let lt=J(xe,{label:"Delete profile",variant:"destructive",size:"xs",onClick:()=>{if(m&&t)t.deleteProfile(m);if(_=!1,m=null,o&&t)ce(o,t)}}),dt=J(xe,{label:"Cancel",variant:"ghost",size:"xs",onClick:()=>{if(_=!1,m=null,o&&t)ce(o,t)}}),r=document.createElement("div");r.className="oc-profiles-add-panel",r.style.display="none",Oe.appendChild(r);let i=document.createElement("div");i.className="oc-profiles-add-panel-header",r.appendChild(i);let S=document.createElement("h3");S.className="oc-profiles-add-panel-title",i.appendChild(S);let O=()=>{if(A=!1,h="",v="",C=void 0,o&&t)ce(o,t)},V=J(i,{label:"Cancel",variant:"ghost",size:"xs",onClick:O}),N=document.createElement("div");N.className="oc-profiles-add-section",r.appendChild(N);let B=document.createElement("span");B.className="oc-profiles-add-section-label",B.textContent="Registered projects",N.appendChild(B);let pt=document.createElement("div");N.appendChild(pt);let wo=Ro(pt,{placeholder:"Filter projects…",value:"",onChange:(E)=>{if(h=E,o&&t)Go(o,t)}}),nt=document.createElement("div");nt.className="oc-profiles-pickable-list-wrap",N.appendChild(nt);let Po=at(nt,{items:[],emptyText:"No matching projects",onSelect:(E)=>{t?.addFolder(E),O()}}),Je=document.createElement("p");Je.className="oc-profiles-empty-hint",Je.textContent="All registered projects are already in this profile",Je.style.display="none",N.appendChild(Je);let Lo=document.createElement("div");r.appendChild(Lo);let Jr=Pt(Lo,{label:"or"}),Dt=document.createElement("div");Dt.className="oc-profiles-add-section",r.appendChild(Dt);let ut=document.createElement("div");ut.className="oc-profiles-typed-row",Dt.appendChild(ut);let Gt=document.createElement("div");ut.appendChild(Gt);let Do=()=>{let E=v.trim();if(!Lt(E)){C="Use an absolute path, e.g. /Users/me/project",ft.update({error:C});return}t?.addFolder(E),O()},ft=Ut(Gt,{label:"Or type a folder path",placeholder:"/path/to/folder or C:\\path\\to\\folder",mono:!0,value:"",onChange:(E)=>{v=E,C=void 0,ft.update({value:E,error:void 0})}});Gt.addEventListener("keydown",(E)=>{if(E.key==="Enter")E.preventDefault(),Do();else if(E.key==="Escape")E.preventDefault(),O()});let Qr=J(ut,{label:"Add path",variant:"secondary",size:"sm",onClick:Do}),Go=(E,Ue)=>{let st=h.trim().toLowerCase(),H=E.vm.pickable.filter((re)=>!st||re.name.toLowerCase().includes(st)||re.path.toLowerCase().includes(st)).map((re)=>({id:re.path,title:re.name,subtitle:re.path}));if(E.vm.pickable.length===0)pt.style.display="none",nt.style.display="none",Je.style.display="";else pt.style.display="",nt.style.display="",Je.style.display="none",Po.update({items:H})},Et=document.createElement("div");Et.className="oc-profiles-banner-slot",Oe.appendChild(Et);let He=document.createElement("section");He.className="oc-profiles-content",Oe.appendChild(He);let ge=null,Re=null,ke=null,ie=null,ae=null,me=new Map,he=new Map,ce=(E,Ue)=>{if(o=E,t=Ue,u&&u!==E.vm.activeProfile.id)d=!1,u=null;if(m&&m!==E.vm.activeProfile.id)_=!1,m=null;if(E.corrupt)if(!ge)ge=wt(Et,{tone:"warning",title:"Profiles read warning",body:"Saved profiles couldn't be read. Showing defaults; nothing is overwritten until you make a change."});else ge.update({body:"Saved profiles couldn't be read. Showing defaults; nothing is overwritten until you make a change."});else if(ge)ge.dispose(),ge=null;if(E.status==="error"){let H=E.error||"An unexpected error occurred loading profiles.";if(!Re)Re=wt(Et,{tone:"error",title:"Unable to load profiles",body:H});else Re.update({body:H})}else if(Re)Re.dispose(),Re=null;let st=E.vm.profiles.map((H)=>({id:H.id,title:H.name,meta:H.folderCount===1?"1 folder":`${H.folderCount} folders`,badge:H.active?{label:"active",tone:"primary"}:void 0}));if(w.update({items:st,selectedId:n.kind==="profile"?E.vm.activeProfile.id:null}),s)f.style.display="none",g.style.display="",p.update({value:a,error:c}),ue.update({disabled:!a.trim()});else f.style.display="",g.style.display="none";if(ne.update({items:[{id:"unassigned",title:"Unassigned",meta:String(E.vm.unassigned.length)}],selectedId:n.kind==="unassigned"?"unassigned":null}),E.status==="loading"){if(!ke)ke=ko(He,{label:"Loading profiles and projects…"});for(let H of me.values())H.element.style.display="none";for(let H of he.values())H.element.style.display="none";if(ie)ie.dispose(),ie=null;if(ae)ae.dispose(),ae=null;P.textContent="Loading…",Ae.textContent="",Te.style.display="none",r.style.display="none";return}if(ke)ke.dispose(),ke=null;if(n.kind==="profile"){let H=E.vm.activeProfile;if(Te.style.display="",d&&u===H.id)P.style.display="none",D.style.display="",Ie.update({disabled:!T.trim()}),ze.update({disabled:!0}),We.update({disabled:!0});else P.style.display="",P.textContent=H.name,D.style.display="none",ze.update({disabled:!1}),We.update({disabled:!1});if(_&&m===H.id){Ee.style.display="";let te=E.vm.profiles.length===1;rt.textContent=te?`Delete "${H.name}"? Its folders move to Unassigned unless another profile holds them. Projects aren't touched. This is your last profile, so it will reset to an empty Default profile.`:`Delete "${H.name}"? Its folders move to Unassigned unless another profile holds them. Projects aren't touched.`}else Ee.style.display="none";let re=H.folders.length;if(Ae.textContent=`${re} ${re===1?"project folder":"project folders"}`,A)r.style.display="",S.textContent=`Add folder to ${H.name}`,se.update({label:"✕ Close add"}),wo.update({value:h}),Go(E,Ue),ft.update({value:v,error:C});else r.style.display="none",se.update({label:"+ Add folder"});for(let te of he.values())te.dispose();if(he.clear(),ae)ae.dispose(),ae=null;if(re===0){for(let oe of me.values())oe.dispose();me.clear();let te={title:"No folders yet",body:"Add some from Unassigned or choose a project above.",action:{label:"+ Add folder",onClick:()=>{A=!0,ce(E,Ue)}}};if(!ie)ie=Mt(He,te);else ie.update(te)}else{if(ie)ie.dispose(),ie=null;let te=new Set(H.folders.map((oe)=>oe.path));for(let[oe,Ne]of me)if(!te.has(oe))Ne.dispose(),me.delete(oe);for(let oe of H.folders){let Ne=me.get(oe.path);if(!Ne)Ne=Mn(oe,Ue),me.set(oe.path,Ne);else Ne.element.style.display="",Ne.update(oe,Ue);He.appendChild(Ne.element)}}return}if(n.kind==="unassigned"){P.style.display="",P.textContent="Unassigned projects",D.style.display="none",Ee.style.display="none",Te.style.display="none",r.style.display="none";let H=E.vm.unassigned.length;Ae.textContent=`Projects in OpenChamber not included in any profile (${H})`;for(let re of me.values())re.dispose();if(me.clear(),ie)ie.dispose(),ie=null;if(H===0){for(let te of he.values())te.dispose();he.clear();let re={title:"Every project is in a profile.",body:"All registered projects in OpenChamber belong to at least one profile."};if(!ae)ae=Mt(He,re);else ae.update(re)}else{if(ae)ae.dispose(),ae=null;let re=new Set(E.vm.unassigned.map((te)=>te.path));for(let[te,oe]of he)if(!re.has(te))oe.dispose(),he.delete(te);for(let te of E.vm.unassigned){let oe=he.get(te.path);if(!oe)oe=wn(te,E.vm.profiles,Ue),he.set(te.path,oe);else oe.element.style.display="",oe.update(te,E.vm.profiles,Ue);He.appendChild(oe.element)}}}};return{render:ce,dispose:()=>{if(w.dispose(),l.dispose(),p.dispose(),ue.dispose(),Le.dispose(),ct.dispose(),ne.dispose(),Ie.dispose(),Ke.dispose(),ze.dispose(),We.dispose(),se.dispose(),lt.dispose(),dt.dispose(),V.dispose(),wo.dispose(),Po.dispose(),Jr.dispose(),ft.dispose(),Qr.dispose(),ge)ge.dispose(),ge=null;if(Re)Re.dispose(),Re=null;if(ke)ke.dispose(),ke=null;if(ie)ie.dispose(),ie=null;if(ae)ae.dispose(),ae=null;for(let E of me.values())E.dispose();me.clear();for(let E of he.values())E.dispose();he.clear(),M.remove()}}};var Kr=fo(),zr=document.getElementById("app");if(!zr)throw Error("Missing #app");var Pn=jr(zr),Pe=Br(Kr),Ln={selectProfile:(e)=>Pe.selectProfile(e),createProfile:(e)=>Pe.createProfile(e),renameProfile:(e,o)=>Pe.renameProfile(e,o),deleteProfile:(e)=>Pe.deleteProfile(e),addFolder:(e,o)=>Pe.addFolder(e,o),removeFolder:(e)=>Pe.removeFolder(e)},Wr=()=>Pn.render(Pe.get(),Ln);Kr.onReady((e)=>Eo(e,document.documentElement));Pe.subscribe(Wr);Wr();})();
