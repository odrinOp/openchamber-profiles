(()=>{var I="openchamber.sdk",k=1;var Vt=`
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
`;function Xt(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let t=new WeakMap;e.addEventListener("scroll",(n)=>{let s=n.target===e?o:n.target;if(!(s instanceof Element))return;if(!s.hasAttribute("data-oc-scrolling"))s.setAttribute("data-oc-scrolling","");let a=t.get(s);if(a!==void 0)clearTimeout(a);t.set(s,setTimeout(()=>{t.delete(s),s.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Yr=`(${Xt.toString()})(document);`;var Ft=128,Bt=65536;var St=128;var mt=65536;var Fo=/^[a-z][a-z0-9-]{0,39}$/;var Ho=(e)=>Object(e)===e&&!Array.isArray(e),$t=(e,o)=>Object.keys(e).every((t)=>o.includes(t)),Vo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Xo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Bo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let t of e){if(!Ho(t)||!Fo.test(t.id)||!Vo(t.label))return!1;if(t.disabled!==void 0&&t.disabled!==!0&&t.disabled!==!1)return!1;if(o.has(t.id))return!1;if(o.add(t.id),t.kind==="button"){if(!$t(t,["kind","id","label","disabled"]))return!1;continue}if(t.kind!=="select"||!$t(t,["kind","id","label","value","options","disabled"]))return!1;if(!Xo(t.value)||!Array.isArray(t.options)||t.options.length<1||t.options.length>16)return!1;let n=new Set;for(let s of t.options){if(!Ho(s)||!$t(s,["value","label"])||!Xo(s.value)||!Vo(s.label)||n.has(s.value))return!1;n.add(s.value)}if(!n.has(t.value))return!1}return!0};var $o=["{id}","{segment}","{segments+}"];var zn=new Set($o);var jo=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Jn=new Set(jo);var Tt=20000000,ht=256;var jt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Ko=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let t=0;t<e.bytes.byteLength;t+=1)if(e.bytes[t]!==o.bytes[t])return!1;return!0};var zo=/^[A-Za-z0-9_-]{1,80}$/;var Wo=["left","right","top","bottom"];var Jo=(e,o=0,t={remaining:16000})=>{if(--t.remaining<0||o>=32)return!1;if(e===null)return!0;let n=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let s of n)if(!Jo(s,o+1,t))return!1;return!0},Kt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(Kt);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(Kt)}return String(e)===e||Number.isFinite(e)},zt=(e)=>{try{if(String(e.id)!==e.id||!zo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Wo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Jo(e.data)||!Kt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Jt=2000;var Yo=["file","directory","other","missing"],Qt=(e)=>Boolean(e&&"sessionId"in e),Yt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Zo=/^[0-9a-f]{7,64}$/i,Zt=(e)=>Zo.test(e),Ot=500,gt=32000,qo=16000,er=128,tr=200,or=2000,rr=16000,nr=80,sr=200,ir=16000;var ar=2000;var qt=20000,xt=1024,At=2000000;var Rt=64000,bt=8000,eo=4000;var to=960000;var cr=999,lr=1e4,at=500,dr=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],pr=["stopped","starting","ready","failed"],qr=new Set(dr),ur=(e)=>qr.has(e),fr=(e)=>e&&ur(e)?e:"HOST_REJECTED",Ye=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Ye);if(Object(e)===e)return Object.values(e).every(Ye);return!1},Er=(e)=>Ye(e)&&JSON.stringify(e).length<=ir,Qo=(e)=>e?.trim().slice(0,sr)??"",Ze=(e)=>{let o=e.id.trim().slice(0,er),t=e.title.trim().slice(0,tr),n=e.url.trim().slice(0,or),s=e.text?.trim().slice(0,rr),a=e.author?.trim().slice(0,nr),c=e.kind==="pull"?"pull":"issue",p={providerId:e.providerId.trim(),id:o,title:t||o,url:n,kind:c};if(s)p.text=s;if(a)p.author=a;if(c==="pull"){let f=Qo(e.branches?.head),m=Qo(e.branches?.base);if(f&&m)p.branches={head:f,base:m}}if(Er(e.data))p.data=e.data;return p},oo=(e)=>{let o=Ze(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},ro=(e)=>{let o={text:e.text.trim().slice(0,qo)};if(e.send)o.send=!0;return o},no=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(cr,Math.max(0,Math.round(e)))},so=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(lr,Math.max(0,Math.ceil(e)))};var qe=(e)=>e.length>0&&e.length<=xt&&!e.includes("\x00")&&!e.includes("\\");var yt=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>ar)return!1;return!e.split("/").some((t)=>t==="."||t==="..")},en=new Set(pr),io=(e)=>Boolean(e&&"status"in e&&en.has(String(e.status))&&!("body"in e)),vt=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),ao=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),co=(e)=>Boolean(e&&"written"in e&&e.written===!0),lo=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),tn=new Set(Yo),po=(e)=>Boolean(e&&"kind"in e&&"size"in e&&tn.has(String(e.kind))&&Number.isFinite(e.size)),uo=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),on=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),rn=(e)=>Object(e)===e?e:null,Wt=(e)=>String(e)===e&&e.length>0,nn=(e)=>{if(!Wt(e.id))return null;if(e.ok===!0){let o={channel:I,v:k,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&Wt(e.error))return{channel:I,v:k,type:"result",id:e.id,ok:!1,error:e.error,code:fr(Wt(e.code)?e.code:void 0)};return null},fo=(e)=>{let o=rn(e);if(!o||o.channel!==I||o.v!==k)return null;if(o.type==="result")return nn(o);if(!on.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var _r=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),sn=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class b extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Sr=()=>Promise.reject(new b("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Ct=()=>Promise.reject(new b("BAD_PATH",`File path must be 1 to ${xt} characters without NUL or backslash.`)),It=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new b("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},y=(e)=>(e.value+=1,`oc-${e.value}`),Eo=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new b("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let t=e.acceptSource??((r)=>r===o.parent),n=e.requestTimeoutMs??qt,s=new Set,a=new Set,c=new Set,p=new Set,f=new Set,m=new Set,_=new Set,x=new Set,A=new Set,T=new Set,v=new Set,C=new Set,D=[],U=null,V=null,J=new Set,ee=new Set,te=null,ne=null,u=!1,E=new Map,O=new Map,Q=new Map,B=!1,d={value:0},l=null,ae=null,W=!1,ce=!1,le=null,Te=(r)=>{if(!r)return null;return{sessionId:r.id,phase:r.busy?"started":"completed"}},se=(r)=>{o.parent.postMessage(r,"*")},Ee=()=>{if(B||o.parent===o||C.size===0||l?.features?.lateGenerateResults!==!0)return;se({channel:I,v:k,type:"generate-late-listen"})},N=(r,i)=>{for(let h of r)try{h(i)}catch(g){console.error(g)}},xe=(r)=>{if(!(r instanceof MessageEvent))return;if(!t(r.source))return;let i=fo(r.data);if(!i)return;if(i.type==="workspace"){let g=O.get(i.payload.subscriptionId);if(g)N([g],i.payload.snapshot);return}if(i.type==="shells"){let g=Q.get(i.payload.subscriptionId);if(g)N([g],i.payload.snapshot);return}if(i.type==="ready"){if(l=i.payload,ae=Te(i.payload.session),N(s,i.payload),N(a,i.payload.directory),N(c,i.payload.session),ae)N(p,ae);if(N(f,i.payload.connection),N(m,i.payload.settings),N(_,i.payload.item),i.payload.block)N(x,i.payload.block);Ee();return}if(i.type==="service-event"){N(A,i.payload);return}if(i.type==="generate-late"){if(C.size===0)D.push(i.payload);else N(C,i.payload);return}if(i.type==="directory"){if(l)l={...l,directory:i.payload.directory};N(a,i.payload.directory);return}if(i.type==="session"){if(l)l={...l,session:i.payload.session};if(!i.payload.session)ae=null;else if(ae?.sessionId!==i.payload.session.id)ae=Te(i.payload.session);N(c,i.payload.session);return}if(i.type==="session-lifecycle"){ae=i.payload,N(p,i.payload);return}if(i.type==="connection"){if(l)l={...l,connection:i.payload.connection};N(f,i.payload.connection);return}if(i.type==="settings"){if(l)l={...l,settings:i.payload.settings};N(m,i.payload.settings);return}if(i.type==="item"){if(l)l={...l,item:i.payload.item};N(_,i.payload.item);return}if(i.type==="status-control-event"){N(T,i.payload);return}if(i.type==="popover-closed"){N(v,i.payload);return}if(i.type==="action"){let g=(M)=>{if(!B)se({channel:I,v:k,type:"action-result",id:i.id,payload:M})},H=V;if(!H){g({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>H(i.payload)).then(()=>g({ok:!0}),(M)=>{let j=(M instanceof Error?M.message:String(M)).trim();g({ok:!1,error:(j||"Action failed.").slice(0,at)})});return}if(i.type==="file-open"){let g=i.payload;if(ne&&Ko(ne,g))return;ne=g,N(J,i.payload);return}if(i.type==="file-saved"){N(ee,i.payload.version);return}if(i.type==="file-snapshot"){let g=(j)=>{if(!B)se({channel:I,v:k,type:"file-snapshot-result",id:i.id,payload:j})},H=(j)=>g({error:(j.trim()||"Could not read the edited file.").slice(0,at)}),M=te;if(!M){H("This extension does not edit files.");return}Promise.resolve().then(()=>M(i.payload.purpose)).then((j)=>{if(jt(j)>Tt){H(`The file is over ${Tt} ${"bytes"in j?"bytes":"characters"}.`);return}if(j.version.length>ht){H(`The snapshot version is over ${ht} characters.`);return}g({snapshot:"bytes"in j?{bytes:j.bytes,version:j.version}:{content:j.content,version:j.version}})},(j)=>H(j instanceof Error?j.message:String(j)));return}if(i.type==="resolve"){let g=(M)=>{se({channel:I,v:k,type:"resolve-result",id:i.id,payload:M})},H=U;if(!H){g({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>H(i.payload)).then((M)=>g({item:M?Ze(M):null}),(M)=>{let j=(M instanceof Error?M.message:String(M)).trim();g({error:(j||"Command failed.").slice(0,at)})});return}let h=E.get(i.id);if(!h)return;if(clearTimeout(h.timer),E.delete(i.id),i.ok){h.resolve(i.payload);return}h.reject(new b(i.code,i.error))};o.addEventListener("message",xe),se({channel:I,v:k,type:"hello"});let G=(r,i=n)=>{if(B||o.parent===o)return Promise.reject(new b("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((h,g)=>{let H=setTimeout(()=>{E.delete(r.id),g(new b("HOST_TIMEOUT","Host did not answer in time."))},i);E.set(r.id,{resolve:h,reject:g,timer:H}),se(r)})},w=(r)=>G(r).then(()=>{return}),P={channel:I,v:k},_e=(r)=>{if(!B&&o.parent!==o)se(r)},Ve=()=>_e({...P,type:"file-save"}),ot=(r)=>{if(!_r(r)||!sn(r))return;r.preventDefault(),Ve()},rt=(r)=>{if(!_r(r)||r.key!=="Escape"||l?.surface!=="popover"||!l.popover)return;r.preventDefault(),dt(l.popover.id,"escape").catch(()=>{return})},Me=()=>{let r=l?.surface==="popover"?l.popover:void 0;if(!r)return;let i=W||ce;if(le===i)return;le=i,pt(r.id,i).catch(()=>{return})},ze=()=>{if(l?.surface!=="popover"||W)return;W=!0,Me()},Ae=(r)=>{if(l?.surface!=="popover"||r.relatedTarget!==null||!W)return;W=!1,Me()},We=()=>{if(l?.surface!=="popover"||ce)return;ce=!0,Me()},Je=()=>{if(l?.surface!=="popover"||!ce)return;ce=!1,Me()},de=(r,i=1024)=>{if(!r.trim()||r.length>i)throw new b("HOST_REJECTED",`Identity must contain 1 to ${i} characters.`)},ve=async(r)=>{if(r.kind!=="projects")de(r.projectId);let i=await G({...P,type:"workspace-read",id:y(d),payload:r});if(!i||!("kind"in i)||!("state"in i)||i.kind!==r.kind)throw new b("HOST_REJECTED","Host did not return workspace data.");return i},he=async(r,i)=>{if(r.kind!=="projects")de(r.projectId);let h=y(d);O.set(h,i);try{await w({...P,type:"workspace-subscribe",id:y(d),payload:{subscriptionId:h,query:r}})}catch(g){if(O.delete(h),!B)se({...P,type:"workspace-unsubscribe",id:y(d),payload:{subscriptionId:h}});throw g}return()=>{if(!O.delete(h)||B)return;se({...P,type:"workspace-unsubscribe",id:y(d),payload:{subscriptionId:h}})}},nt=async(r,i)=>{if(r.kind==="session")de(r.sessionId);if(r.kind==="project")de(r.projectId);let h=y(d);Q.set(h,i);try{await w({...P,type:"shells-subscribe",id:y(d),payload:{subscriptionId:h,scope:r}})}catch(g){if(Q.delete(h),!B)se({...P,type:"shells-unsubscribe",id:y(d),payload:{subscriptionId:h}});throw g}return()=>{if(!Q.delete(h)||B)return;se({...P,type:"shells-unsubscribe",id:y(d),payload:{subscriptionId:h}})}},Ce=async(r)=>{if("key"in r&&(r.key.length===0||r.key.length>Ft))throw new b("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(r.op==="set"&&!Ye(r.value))throw new b("HOST_REJECTED","Storage values must be JSON.");if(r.op==="set"&&new TextEncoder().encode(JSON.stringify(r.value)).length>Bt)throw new b("HOST_REJECTED","Storage value exceeds 64 KiB.");if(r.scope==="device"&&l?.features?.deviceStorage!==!0)throw new b("UNSUPPORTED","This host does not support device storage.");let i=await G({...P,type:"storage",id:y(d),payload:r});if(!i||!("storage"in i)||i.op!==r.op)throw new b("HOST_REJECTED","Host did not return storage data.");return i},dt=(r,i)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===r)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):w({...P,type:"popover-close",id:y(d),payload:i?{id:r,reason:i}:{id:r}}),pt=(r,i)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===r)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):w({...P,type:"popover-anchor",id:y(d),payload:{id:r,active:i}});return o.addEventListener("keydown",rt,!0),o.addEventListener("pointerover",ze),o.addEventListener("pointermove",ze),o.addEventListener("pointerout",Ae),o.addEventListener("focus",We),o.addEventListener("blur",Je),{onAction:(r)=>(V=r,()=>{if(V===r)V=null}),listProjects:async()=>{let r=await ve({kind:"projects"});if(r.kind!=="projects")throw new b("HOST_REJECTED","Expected projects.");return r},listWorktrees:async(r)=>{let i=await ve({kind:"worktrees",projectId:r});if(i.kind!=="worktrees")throw new b("HOST_REJECTED","Expected worktrees.");return i},listSessions:async(r)=>{let i=await ve({kind:"sessions",projectId:r});if(i.kind!=="sessions")throw new b("HOST_REJECTED","Expected sessions.");return i},onProjects:(r)=>he({kind:"projects"},(i)=>{if(i.kind==="projects")r(i)}),onWorktrees:(r,i)=>he({kind:"worktrees",projectId:r},(h)=>{if(h.kind==="worktrees")i(h)}),onSessions:(r,i)=>he({kind:"sessions",projectId:r},(h)=>{if(h.kind==="sessions")i(h)}),onRunningShells:(r,i)=>nt(r,i),readShellOutput:async(r,i)=>{de(r,St);let h=i?.cursor;if(h!==void 0&&(!Number.isInteger(h)||h<0))throw new b("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let g=i?.tailBytes;if(g!==void 0&&(!Number.isInteger(g)||g<1||g>mt))throw new b("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${mt}.`);let M=await G({...P,type:"shell-output",id:y(d),payload:{shellId:r,cursor:h,tailBytes:g}});if(!M||typeof M.output!=="string"||!Number.isFinite(M.cursor))throw new b("HOST_REJECTED","Host did not return shell output.");return M},stopShell:async(r)=>{if(de(r,St),(await G({...P,type:"shell-stop",id:y(d),payload:{shellId:r}}))?.stopped!==!0)throw new b("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(r)=>{de(r),await w({...P,type:"open-session",id:y(d),payload:{sessionId:r}})},storage:{get:async(r,i)=>{let h=It(i),g={op:"get",key:r};if(h)g.scope=h;let H=await Ce(g);return H.op==="get"&&H.found?H.value:void 0},set:async(r,i,h)=>{let g=It(h),H={op:"set",key:r,value:i};if(g)H.scope=g;await Ce(H)},delete:async(r,i)=>{let h=It(i),g={op:"delete",key:r};if(h)g.scope=h;await Ce(g)},keys:async(r)=>{let i=It(r),h={op:"keys"};if(i)h.scope=i;let g=await Ce(h);if(g.op!=="keys")throw new b("HOST_REJECTED","Expected storage keys.");return g.keys}},onReady:(r)=>{if(s.add(r),l)r(l);return()=>{s.delete(r)}},onDirectory:(r)=>{if(a.add(r),l)r(l.directory);return()=>{a.delete(r)}},onSession:(r)=>{if(c.add(r),l)r(l.session);return()=>{c.delete(r)}},onSessionLifecycle:(r)=>{if(p.add(r),ae)r(ae);return()=>{p.delete(r)}},onConnection:(r)=>{if(f.add(r),l)r(l.connection);return()=>{f.delete(r)}},onSettings:(r)=>{if(m.add(r),l)r(l.settings);return()=>{m.delete(r)}},onItem:(r)=>{if(_.add(r),l)r(l.item);return()=>{_.delete(r)}},onBlock:(r)=>{if(x.add(r),l?.block)r(l.block);return()=>{x.delete(r)}},onServiceEvent:(r)=>(A.add(r),()=>{A.delete(r)}),onStatusControl:(r)=>(T.add(r),()=>{T.delete(r)}),onPopoverClosed:(r)=>(v.add(r),()=>{v.delete(r)}),setStatusControls:(r)=>{if(l?.features?.statusControls!==!0)return Promise.reject(new b("UNSUPPORTED","This host does not support status controls."));if(!Bo(r))return Promise.reject(new b("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return w({...P,type:"status-controls",id:y(d),payload:{controls:r}})},openPopover:(r)=>{if(l?.features?.popovers!==!0)return Promise.reject(new b("UNSUPPORTED","This host does not support popovers."));if(!zt(r))return Promise.reject(new b("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return w({...P,type:"popover-open",id:y(d),payload:r})},closePopover:dt,setPopoverAnchorActive:pt,onResolve:(r)=>(U=r,()=>{if(U===r)U=null}),toast:(r)=>{let i=r.message.trim();if(!i||i.length>Ot)return Promise.reject(new b("HOST_REJECTED",`Toast message must contain 1 to ${Ot} characters.`));if(r.copy&&r.copy!==!0&&(!r.copy.text.length||r.copy.text.length>gt))return Promise.reject(new b("HOST_REJECTED",`Toast copy text must contain 1 to ${gt} characters.`));return w({channel:I,v:k,type:"toast",id:y(d),payload:{...r,message:i}})},openUrl:(r)=>w({channel:I,v:k,type:"open-url",id:y(d),payload:{url:r}}),openCommit:(r)=>Zt(r)?w({channel:I,v:k,type:"open-commit",id:y(d),payload:{sha:r}}):Promise.reject(new b("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(r)=>w({channel:I,v:k,type:"block-answer",id:y(d),payload:{text:r.trim().slice(0,Jt)}}),openSurface:(r)=>w({channel:I,v:k,type:"open-surface",id:y(d),payload:{surfaceId:r}}),writeClipboard:(r)=>w({channel:I,v:k,type:"clipboard-write",id:y(d),payload:{text:r}}),compose:(r)=>w({channel:I,v:k,type:"compose",id:y(d),payload:r}),attach:(r)=>w({channel:I,v:k,type:"attach",id:y(d),payload:Ze(r)}),startSession:async(r)=>{if(r.projectId!==void 0)de(r.projectId);let i=r.worktree;if(i&&i!==!0)if(i.kind==="existing")de(i.directory);else{if(i.name!==void 0)de(i.name,200);if(i.baseBranch!==void 0)de(i.baseBranch,200)}let h=await G({channel:I,v:k,type:"start-session",id:y(d),payload:oo(r)},e.requestTimeoutMs??180000);if(!Qt(h))throw new b("HOST_REJECTED","Host did not return a session.");return h},prompt:(r)=>G({channel:I,v:k,type:"prompt",id:y(d),payload:ro(r)}).then((i)=>{if(!Yt(i))throw new b("HOST_REJECTED","Host did not return a prompt result.");return i}),sessionLink:(r)=>w({channel:I,v:k,type:"session-link",id:y(d),payload:Ze(r)}),close:()=>w({channel:I,v:k,type:"close",id:y(d)}),oauthStart:()=>w({channel:I,v:k,type:"oauth-start",id:y(d)}),oauthDisconnect:()=>w({channel:I,v:k,type:"oauth-disconnect",id:y(d)}),request:(r)=>(yt(r.path)?G({channel:I,v:k,type:"request",id:y(d),payload:r}):Sr()).then((i)=>{if(!vt(i))throw new b("HOST_REJECTED","Host request result was empty.");return i}),serviceRequest:(r)=>(yt(r.path)?G({channel:I,v:k,type:"service-request",id:y(d),payload:r}):Sr()).then((i)=>{if(!vt(i))throw new b("HOST_REJECTED","Host service request result was empty.");return i}),serviceStatus:()=>G({channel:I,v:k,type:"service-status",id:y(d)}).then((r)=>{if(!io(r))throw new b("HOST_REJECTED","Host did not return service status.");return r}),readFile:(r)=>(qe(r)?G({channel:I,v:k,type:"file-read",id:y(d),payload:{path:r}}):Ct()).then((i)=>{if(!ao(i))throw new b("HOST_REJECTED","Host did not return file content.");return i}),writeFile:(r,i)=>{if(!qe(r))return Ct();if(i.length>At)return Promise.reject(new b("FILE_TOO_LARGE",`Content is over ${At} characters.`));return G({channel:I,v:k,type:"file-write",id:y(d),payload:{path:r,content:i}}).then((h)=>{if(!co(h))throw new b("HOST_REJECTED","Host did not confirm the write.");return h})},listDir:(r)=>(qe(r)?G({channel:I,v:k,type:"file-list",id:y(d),payload:{path:r}}):Ct()).then((i)=>{if(!lo(i))throw new b("HOST_REJECTED","Host did not return directory entries.");return i}),stat:(r)=>(qe(r)?G({channel:I,v:k,type:"file-stat",id:y(d),payload:{path:r}}):Ct()).then((i)=>{if(!po(i))throw new b("HOST_REJECTED","Host did not return file status.");return i}),generate:(r)=>{let i=r.prompt.trim(),h=r.system?.trim();if(i.length===0||i.length>Rt)return Promise.reject(new b("HOST_REJECTED",`Prompt must be 1 to ${Rt} characters.`));if(h!==void 0&&(h.length===0||h.length>bt))return Promise.reject(new b("HOST_REJECTED",`System prompt must be 1 to ${bt} characters.`));let g=r.maxOutputTokens===void 0?void 0:Math.min(eo,Math.max(1,Math.floor(r.maxOutputTokens)));if(g!==void 0&&!Number.isFinite(g))return Promise.reject(new b("HOST_REJECTED","maxOutputTokens must be a number."));let H={prompt:i};if(h!==void 0)H.system=h;if(g!==void 0)H.maxOutputTokens=g;return G({channel:I,v:k,type:"generate",id:y(d),payload:H},e.requestTimeoutMs??to).then((M)=>{if(!uo(M))throw new b("HOST_REJECTED","Host did not return generated text.");return M})},onLateGenerateResult:(r)=>{C.add(r);for(let i of D.splice(0))N([r],i);return Ee(),()=>{C.delete(r)}},setBadge:(r)=>w({channel:I,v:k,type:"badge",id:y(d),payload:{count:no(r)}}),setHeight:(r)=>w({channel:I,v:k,type:"resize",id:y(d),payload:{height:so(r)}}),onFileOpen:(r)=>{if(J.add(r),!u)u=!0,o.addEventListener("keydown",ot,!0);if(ne)r(ne);return()=>{J.delete(r)}},onFileSnapshot:(r)=>(te=r,()=>{if(te===r)te=null}),onFileSaved:(r)=>(ee.add(r),()=>{ee.delete(r)}),reportFileChange:(r)=>_e({...P,type:"file-change",payload:{dirty:r.dirty,edited:r.edited}}),requestFileSave:Ve,reportFileUnsupported:()=>_e({...P,type:"file-unsupported"}),dispose:()=>{for(let r of O.keys())se({...P,type:"workspace-unsubscribe",id:y(d),payload:{subscriptionId:r}});O.clear();for(let r of Q.keys())se({...P,type:"shells-unsubscribe",id:y(d),payload:{subscriptionId:r}});if(Q.clear(),B=!0,U=null,V=null,te=null,J.clear(),ee.clear(),u)o.removeEventListener("keydown",ot,!0);o.removeEventListener("message",xe),o.removeEventListener("keydown",rt,!0),o.removeEventListener("pointerover",ze),o.removeEventListener("pointermove",ze),o.removeEventListener("pointerout",Ae),o.removeEventListener("focus",We),o.removeEventListener("blur",Je);for(let r of E.values())clearTimeout(r.timer),r.reject(new b("HOST_UNAVAILABLE","Host client was disposed."));E.clear(),s.clear(),a.clear(),c.clear(),p.clear(),f.clear(),m.clear(),_.clear(),x.clear(),A.clear(),T.clear(),v.clear(),C.clear(),D.length=0}}};var mr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var ds=new Set(mr);var Tr=["none","agent","user"];var us=new Set(Tr);var an=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],cn=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],hr=(e,o)=>{o.style.colorScheme=e.mode;for(let[t,n]of an)o.style.setProperty(t,e.tokens[n]);for(let[t,n,s]of cn){let a=e.tokens[s]??"";o.style.setProperty(t,a),o.style.setProperty(n,a)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},_o=(e,o)=>{if(hr(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};var ln={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},K=(e,o)=>`var(--${e}, var(--oc-${ln[e]}, ${o}))`,Ne=K("surface-background","transparent"),Ut=K("surface-elevated","transparent"),et=K("surface-elevated-foreground","inherit"),me=K("surface-foreground","inherit"),Y=K("surface-muted-foreground","gray"),dn=K("surface-muted","transparent"),Fe=K("interactive-border","currentColor"),Se=K("interactive-hover","transparent"),Be=K("interactive-active","transparent"),So=K("interactive-selection","transparent"),mo=K("interactive-selection-foreground","inherit"),Ue=K("primary","currentColor"),To=K("primary-text","inherit"),ho=K("error-text","inherit"),pn=K("font-sans","inherit"),Oo=K("font-mono","monospace"),Ar=K("radius","9px"),go=`calc(${Ar} - 2px)`,Or=`calc(${Ar} - 4px)`,Z=(e,o,t="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${t})`,gr=`background-image: linear-gradient(${Se}, ${Se});`,xo=(e,o="0.5px")=>`box-shadow: inset 0 0 0 ${o} ${e}, var(--oc-sdk-field-lift);`,Ao="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",xr="box-shadow: var(--oc-sdk-lit);",Ro=`inset 0 0.5px 0 0 ${Z(me,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,un=`
:root {
  --oc-sdk-edge: ${Z(me,16)};
  --oc-sdk-field-bg: ${Ut};
  --oc-sdk-raised-bg: ${Ne};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Z(me,14)};
  --oc-sdk-field-bg: ${Z(Ne,50,Ut)};
  --oc-sdk-raised-bg: ${Ut};
  --oc-sdk-field-lift: ${Ro};
  --oc-sdk-raised-lift: ${Ro};
  --oc-sdk-lit: ${Ro};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,kt=(e)=>{let o=K(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${K(`${e}-text`,"inherit")}; }`},fn=`
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
.oc-sdk { color: ${me}; font-family: ${pn}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${gr} }
.oc-sdk-mono { font-family: ${Oo}; }
.oc-sdk-muted { color: ${Y}; }
${kt("success")}${kt("warning")}${kt("error")}${kt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Ue}; --oc-sdk-tone-text: ${To}; }

.oc-sdk-btn { border-radius: ${go}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Or}; }
.oc-sdk-btn[data-variant="default"] { color: ${To}; background: ${Z(Ue,10,Ne)}; border-color: ${Z(Ue,12)}; ${xr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Z(Ue,16,Ne)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Z(Ue,22,Ne)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${dn}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${Se}, ${Se}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Be}, ${Be}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${et}; ${Ao} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${Se}, ${Se}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Be}, ${Be}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${Se}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Be}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${K("status-error","red")}; color: ${ho}; background: ${Z("var(--oc-sdk-tone)",7,Ne)}; border-color: ${Z("var(--oc-sdk-tone)",12)}; ${xr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Z("var(--oc-sdk-tone)",9,Ne)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Z("var(--oc-sdk-tone)",11,Ne)}; box-shadow: none; }

.oc-sdk-field-note { color: ${Y}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${ho}; }
.oc-sdk-input { border-radius: ${go}; background: var(--oc-sdk-field-bg); color: ${et}; ${xo("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${Y}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${Se}, ${Se}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${xo(Z(me,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${xo(K("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Oo}; }

.oc-sdk-search-icon { color: ${Y}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Ue}; }
.oc-sdk-search-clear { border-radius: ${Or}; color: ${Y}; }
.oc-sdk-search-clear:hover { background: ${Se}; color: ${me}; }

.oc-sdk-trigger { border-radius: ${go}; background: var(--oc-sdk-raised-bg); color: ${et}; ${Ao} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${Se}, ${Se}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Be}, ${Be}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${Y}; }
.oc-sdk-trigger-chevron { color: ${Y}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${et}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Ut}; background-clip: padding-box; color: ${et}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${Se}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${So}; color: ${mo}; }
.oc-sdk-option-check { color: ${me}; }
.oc-sdk-option[data-destructive="true"] { color: ${ho}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${Z(K("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${Y}; }
.oc-sdk-popup-empty { color: ${Y}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Fe}; border-radius: 4px; color: ${me}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Z(me,60,Fe)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Fe}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${Ne}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Ue}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${gr} }
.oc-sdk-check-desc { color: ${Y}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Z(me,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${Y}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${me}; }
.oc-sdk-tab[aria-selected="true"] { color: ${mo}; background: ${So}; border-color: ${Fe}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${et}; background: var(--oc-sdk-raised-bg); ${Ao} }
.oc-sdk-tab-count { color: ${Y}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${Z(me,6)}; color: ${Y}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${Z("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${Se}; }
.oc-sdk-row[aria-selected="true"] { background: ${So}; color: ${mo}; }
.oc-sdk-row-lead { font-family: ${Oo}; color: ${Y}; }
.oc-sdk-row-sub { color: ${Y}; }
.oc-sdk-row-meta { color: ${Y}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${Y}; }

.oc-sdk-empty-body { color: ${Y}; }

.oc-sdk-spinner { color: ${Y}; }
.oc-sdk-spinner-ring { border-color: ${Fe}; border-top-color: ${Ue}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${Z("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${Y}; }

.oc-sdk-separator { color: ${Y}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${Z(Fe,40)}; }

.oc-sdk-progress-label { color: ${Y}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${Z(me,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Ue}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${K("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${K("success-text","inherit")}; }

.oc-sdk-text a { color: ${To}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Z(Fe,60)}; }
`,X=`
${Vt}
${fn}
${Rr}`;var br="oc-sdk-ui-style",$e=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},F=(e)=>{let o=document.getElementById(br);if(o instanceof HTMLStyleElement){if(o.textContent!==e)o.textContent=e;return}Xt(document);let t=document.createElement("style");t.id=br,t.textContent=e,document.head.appendChild(t)},R=(e,o)=>{let t=document.createElement(e);if(o)t.className=o;return t},Oe=(e)=>{let o=R("button",e);return o.type="button",o},q=(e,o)=>{let t=o??"";if(e.textContent!==t)e.textContent=t},ge=(e,o,t)=>{if(t===void 0||t===null||t==="")e.removeAttribute(o);else if(e.getAttribute(o)!==t)e.setAttribute(o,t)},yr=(e,o)=>{let t=(n)=>{if(n.target instanceof Node&&e.contains(n.target))return;o()};return document.addEventListener("pointerdown",t,!0),()=>{document.removeEventListener("pointerdown",t,!0)}};var En=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},z=(e,o)=>{F(X);let t=o,n=Oe("oc-sdk oc-sdk-btn"),s=En(),a=document.createElement("span");n.append(a),e.append(n);let c=()=>{if(n.dataset.variant=t.variant??"default",n.dataset.size=t.size??"default",n.disabled=Boolean(t.disabled)||Boolean(t.loading),n.dataset.loading=t.loading?"true":"false",n.setAttribute("aria-busy",t.loading?"true":"false"),t.loading&&s.parentNode!==n)n.prepend(s);else if(!t.loading&&s.parentNode===n)s.remove();q(a,t.label)},p=()=>{if(t.disabled||t.loading)return;t.onClick()};return n.addEventListener("click",p),c(),{update:(f)=>{t={...t,...f},c()},dispose:()=>{n.removeEventListener("click",p),n.remove()}}};var Nt=(e,o)=>{F(X);let t=o,n=R("label","oc-sdk oc-sdk-field"),s=R("span","oc-sdk-field-label"),a=t.multiline?R("textarea","oc-sdk-input"):R("input","oc-sdk-input"),c=R("span","oc-sdk-field-note");n.append(s,a,c),e.append(n);let p=()=>{if(q(s,t.label),s.hidden=!t.label,a instanceof HTMLInputElement)a.type=t.password?"password":"text";else a.rows=t.rows??3;if(a.value!==t.value)a.value=t.value;a.disabled=Boolean(t.disabled),ge(a,"placeholder",t.placeholder),a.dataset.mono=t.mono?"true":"false";let m=Boolean(t.error);n.dataset.invalid=m?"true":"false",a.setAttribute("aria-invalid",m?"true":"false");let _=t.error??t.helper??"";q(c,_),c.hidden=_===""},f=()=>{t.onChange(a.value)};return a.addEventListener("input",f),p(),{update:(m)=>{t={...t,...m},p()},dispose:()=>{a.removeEventListener("input",f),n.remove()}}};var _n={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},we=(e,o,t)=>{let n=document.createElementNS("http://www.w3.org/2000/svg","svg");if(n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("width",String(o)),n.setAttribute("height",String(o)),n.setAttribute("aria-hidden","true"),n.setAttribute("fill","currentColor"),t)n.setAttribute("class",t);let s=document.createElementNS("http://www.w3.org/2000/svg","path");return s.setAttribute("d",_n[e]),n.append(s),n};var bo=(e,o)=>{F(X);let t=o,n=R("div","oc-sdk oc-sdk-search"),s=R("input","oc-sdk-input");s.type="text",s.spellcheck=!1,s.autocomplete="off",s.setAttribute("role","searchbox");let a=Oe("oc-sdk-search-clear");a.append(we("close",14)),a.tabIndex=-1,n.append(we("search",16,"oc-sdk-search-icon"),s,a),e.append(n);let c=()=>{let _=t.placeholder??"Search";if(ge(s,"placeholder",_),s.setAttribute("aria-label",t.label??_),a.setAttribute("aria-label","Clear search"),s.value!==t.value)s.value=t.value;n.dataset.active=t.value.trim()===""?"false":"true"},p=()=>{if(t.value!=="")t.onChange("");s.focus()},f=()=>{t.onChange(s.value)},m=(_)=>{if(_.key==="Escape"&&s.value!=="")_.preventDefault(),p()};if(s.addEventListener("input",f),s.addEventListener("keydown",m),a.addEventListener("click",p),c(),t.autofocus)s.focus();return{update:(_)=>{t={...t,..._},c()},dispose:()=>{s.removeEventListener("input",f),s.removeEventListener("keydown",m),a.removeEventListener("click",p),n.remove()}}};var Ge=(e,o="vertical")=>{let[t,n]=o==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===t||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===n||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},je=(e,o,t)=>{let n=e.filter((f)=>!f.disabled);if(n.length===0)return null;let s=n[0],a=n[n.length-1];if(t==="first"||!s||!a)return s?.id??null;if(t==="last")return a.id;let c=n.findIndex((f)=>f.id===o);if(c===-1)return t==="next"?s.id:a.id;return n[Math.min(n.length-1,Math.max(0,c+(t==="next"?1:-1)))]?.id??null};var vr=(e,o)=>`${e}-${o??""}`,yo=(e,o,t,n)=>{let s=Oe("oc-sdk-option");if(s.id=vr(e,t.id),s.setAttribute("role",o),s.tabIndex=-1,s.disabled=Boolean(t.disabled),o==="option")s.setAttribute("aria-selected",t.selected?"true":"false");s.dataset.destructive=t.destructive?"true":"false";let a=R("span","oc-sdk-option-label");if(a.textContent=t.label,s.append(a),t.hint){let c=R("span","oc-sdk-option-hint");c.textContent=t.hint,s.append(c)}if(o==="option"){s.dataset.mark="check";let c=R("span","oc-sdk-option-check");c.append(we("check",14)),s.append(c)}return s.addEventListener("pointerenter",n.hover),s.addEventListener("click",n.pick),s},vo=(e,o,t,n)=>{let s=vr(t,n);for(let a of Array.from(e.children))if(a instanceof HTMLElement&&a.classList.contains("oc-sdk-option"))a.dataset.active=a.id===s?"true":"false";ge(o,"aria-activedescendant",n?s:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Sn=(e,o)=>{let t=o.getBoundingClientRect();e.style.minWidth=`${Math.round(t.width)}px`,e.style.left=`${Math.round(t.left)}px`,e.style.top=`${Math.round(t.bottom+4)}px`;let n=e.offsetHeight,s=window.innerHeight-t.bottom-8;if(n>s&&t.top-8>s)e.style.top=`${Math.max(8,Math.round(t.top-4-n))}px`;let a=t.left+e.offsetWidth-window.innerWidth+8;if(a>0)e.style.left=`${Math.max(8,Math.round(t.left-a))}px`},Co=(e,o,t,n)=>{e.append(t),Sn(t,o);let s=yr(e,n),a=()=>{n()},c=(p)=>{if(p.target instanceof Node&&t.contains(p.target))return;n()};return window.addEventListener("resize",a),window.addEventListener("scroll",c,!0),()=>{s(),window.removeEventListener("resize",a),window.removeEventListener("scroll",c,!0),t.remove()}};var Cr=(e,o)=>{let t=o.trim().toLowerCase();if(!t)return[...e];return e.filter((n)=>n.label.toLowerCase().includes(t)||n.id.toLowerCase().includes(t))},mn=0,Io=(e,o)=>{F(X);let t=o,n=`oc-sdk-select-${mn+=1}`,s=R("div","oc-sdk oc-sdk-select"),a=R("span","oc-sdk-field-label");a.id=`${n}-label`;let c=Oe("oc-sdk-trigger");c.setAttribute("aria-haspopup","listbox"),c.setAttribute("aria-labelledby",a.id);let p=R("span","oc-sdk-trigger-value");c.append(p,we("chevron",14,"oc-sdk-trigger-chevron")),s.append(a,c),e.append(s);let f="",m=null,_=null,x=R("div","oc-sdk oc-sdk-popup"),A=R("div","oc-sdk-popup-search"),T=R("input","oc-sdk-input");T.type="text",T.autocomplete="off",A.append(T);let v=R("div");v.setAttribute("role","listbox"),v.tabIndex=-1,x.append(v);let C=()=>Cr(t.options,t.searchable?f:""),D=()=>t.searchable?T:v,U=(d)=>{m=d,vo(v,D(),n,d)},V=()=>{$e(v);let d=C();if(d.length===0){let l=R("div","oc-sdk-popup-empty");l.textContent="No matches",v.append(l)}for(let l of d)v.append(yo(n,"option",{...l,selected:l.id===t.value},{hover:()=>U(l.id),pick:()=>te(l.id)}));U(d.some((l)=>l.id===m)?m:d[0]?.id??null)},J=()=>{let d=_;_=null,d?.(),f="",T.value="",c.setAttribute("aria-expanded","false")},ee=()=>{if(_||t.disabled)return;if(m=t.value,T.placeholder=t.searchPlaceholder??"Search",t.searchable)x.prepend(A);else A.remove();V(),_=Co(s,c,x,J),c.setAttribute("aria-expanded","true"),D().focus()},te=(d)=>{if(J(),c.focus(),d!==t.value)t.onChange(d)},ne=()=>{if(_)J();else ee()},u=(d)=>{if(!_&&Ge(d))d.preventDefault(),ee()},E=(d)=>{let l=Ge(d);if(l)d.preventDefault(),U(je(C(),m,l));else if(d.key==="Enter"){if(d.preventDefault(),m)te(m)}else if(d.key==="Escape")d.preventDefault(),J(),c.focus();else if(t.searchable&&d.target!==T&&d.key.length===1&&!d.ctrlKey&&!d.metaKey)T.focus()},O=()=>{f=T.value,V()},Q=(d)=>{if(_&&!(d.relatedTarget instanceof Node&&s.contains(d.relatedTarget)))J()},B=()=>{q(a,t.label),a.hidden=!t.label;let d=t.options.find((l)=>l.id===t.value);if(q(p,d?.label??t.placeholder??"Select"),p.dataset.empty=d?"false":"true",c.disabled=Boolean(t.disabled),_)V()};return c.addEventListener("click",ne),c.addEventListener("keydown",u),x.addEventListener("keydown",E),T.addEventListener("input",O),s.addEventListener("focusout",Q),B(),{update:(d)=>{t={...t,...d},B()},dispose:()=>{J(),c.removeEventListener("click",ne),c.removeEventListener("keydown",u),x.removeEventListener("keydown",E),T.removeEventListener("input",O),s.removeEventListener("focusout",Q),s.remove()}}};var wt=(e,o)=>{ge(e,"data-tone",o&&o!=="neutral"?o:null)},ko=(e,o)=>{F(X);let t=o,n=R("span","oc-sdk oc-sdk-badge");e.append(n);let s=()=>{q(n,t.label),wt(n,t.tone)};return s(),{update:(a)=>{t={...t,...a},s()},dispose:()=>{n.remove()}}};var Tn=0,ct=(e,o)=>{F(X);let t=o,n=`oc-sdk-list-${Tn+=1}`,s=R("div","oc-sdk oc-sdk-list");s.setAttribute("role","listbox"),s.tabIndex=0,e.append(s);let a=null,c=(x)=>`${n}-${x}`,p=(x)=>{a=x;for(let A of Array.from(s.children))if(A instanceof HTMLElement)A.dataset.active=A.id===c(x??"")?"true":"false";ge(s,"aria-activedescendant",x?c(x):null),s.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},f=(x,A)=>{let T=R("span",x);return T.textContent=A,T},m=()=>{if($e(s),ge(s,"aria-label",t.ariaLabel),t.items.length===0){s.append(f("oc-sdk-list-empty",t.emptyText??"Nothing here")),p(null);return}for(let A of t.items){let T=Oe("oc-sdk-row");if(T.id=c(A.id),T.setAttribute("role","option"),T.setAttribute("aria-selected",A.id===t.selectedId?"true":"false"),T.disabled=Boolean(A.disabled),T.tabIndex=-1,A.leading)T.append(f("oc-sdk-row-lead",A.leading));let v=R("span","oc-sdk-row-main");if(v.append(f("oc-sdk-row-title",A.title)),A.subtitle)v.append(f("oc-sdk-row-sub",A.subtitle));if(T.append(v),A.badge){let C=f("oc-sdk-badge",A.badge.label);wt(C,A.badge.tone),T.append(C)}if(A.meta)T.append(f("oc-sdk-row-meta",A.meta));T.addEventListener("click",()=>t.onSelect(A.id)),s.append(T)}let x=t.items.some((A)=>A.id===a&&!A.disabled);p(x?a:t.selectedId??null)},_=(x)=>{let A=Ge(x);if(A){x.preventDefault(),p(je(t.items,a,A));return}if((x.key==="Enter"||x.key===" ")&&a)x.preventDefault(),t.onSelect(a)};return s.addEventListener("keydown",_),m(),{update:(x)=>{t={...t,...x},m()},dispose:()=>{s.removeEventListener("keydown",_),s.remove()}}};var Mt=(e,o)=>{F(X);let t=o,n=R("div","oc-sdk oc-sdk-empty"),s=R("h2","oc-sdk-empty-title"),a=R("p","oc-sdk-empty-body"),c=R("div","oc-sdk-empty-action");n.append(s,a,c),e.append(n);let p=null,f=()=>{if(q(s,t.title),q(a,t.body),a.hidden=!t.body,c.hidden=!t.action,!t.action){p?.dispose(),p=null;return}let m={label:t.action.label,onClick:t.action.onClick};if(p)p.update(m);else p=z(c,{...m,variant:"outline",size:"sm"})};return f(),{update:(m)=>{t={...t,...m},f()},dispose:()=>{p?.dispose(),p=null,n.remove()}}};var Uo=(e,o={})=>{F(X);let t=o,n=R("span","oc-sdk oc-sdk-spinner");n.setAttribute("role","status");let s=R("span","oc-sdk-spinner-ring");s.setAttribute("aria-hidden","true");let a=R("span");n.append(s,a),e.append(n);let c=()=>{n.dataset.size=t.size??"default",q(a,t.label),a.hidden=!t.label,n.setAttribute("aria-label",t.label??"Loading")};return c(),{update:(p)=>{t={...t,...p},c()},dispose:()=>{n.remove()}}};var Pt=(e,o)=>{F(X);let t=o,n=R("div","oc-sdk oc-sdk-banner"),s=R("div","oc-sdk-banner-text"),a=R("div","oc-sdk-banner-title"),c=R("div","oc-sdk-banner-body"),p=R("div","oc-sdk-banner-action");s.append(a,c),n.append(s,p),e.append(n);let f=null,m=()=>{if(n.dataset.tone=t.tone,n.setAttribute("role",t.tone==="error"||t.tone==="warning"?"alert":"status"),q(a,t.title),q(c,t.body),c.hidden=!t.body,p.hidden=!t.action,!t.action){f?.dispose(),f=null;return}let _={label:t.action.label,onClick:t.action.onClick};if(f)f.update(_);else f=z(p,{..._,variant:"outline",size:"xs"})};return m(),{update:(_)=>{t={...t,..._},m()},dispose:()=>{f?.dispose(),f=null,n.remove()}}};var Lt=(e,o={})=>{F(X);let t=o,n=R("div","oc-sdk oc-sdk-separator");n.setAttribute("role","separator");let s=R("span");n.append(s),e.append(n);let a=()=>{q(s,t.label),s.hidden=!t.label,n.dataset.labeled=t.label?"true":"false"};return a(),{update:(c)=>{t={...t,...c},a()},dispose:()=>{n.remove()}}};var Dt=(e)=>{let o=e.trim();return o.startsWith("/")||/^[A-Za-z]:[\\/]/.test(o)},tt=(e,o={})=>{let t=e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/");if(t.length>1&&t.endsWith("/"))t=t.replace(/\/+$/,"");if(t==="")t=e.trim().startsWith("/")?"/":"";return o.caseInsensitive?t.toLowerCase():t},He=(e,o,t={})=>tt(e,t)===tt(o,t);var Ir="default",Ke=()=>({version:1,activeId:Ir,profiles:[{id:Ir,name:"Default",folders:[]}]}),hn=(e)=>e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"profile",On=(e,o)=>{let t=hn(o),n=new Set(e.profiles.map((a)=>a.id));if(!n.has(t))return t;let s=2;while(n.has(`${t}-${s}`))s+=1;return`${t}-${s}`},No=(e,o,t)=>{if(!e.profiles.some((n)=>n.id===o))throw Error(`Unknown profile: ${o}`);return{...e,profiles:e.profiles.map((n)=>n.id===o?t(n):n)}},kr=(e)=>{let o=e.trim();if(!o)throw Error("Profile name is required");return o},Ur=(e,o)=>{let t=kr(o),n={id:On(e,t),name:t,folders:[]};return{...e,profiles:[...e.profiles,n]}},Nr=(e,o,t)=>{let n=kr(t);return No(e,o,(s)=>({...s,name:n}))},wr=(e,o)=>{if(!e.profiles.some((s)=>s.id===o))throw Error(`Unknown profile: ${o}`);let t=e.profiles.filter((s)=>s.id!==o);if(t.length===0)return Ke();let n=e.activeId===o?t[0].id:e.activeId;return{...e,activeId:n,profiles:t}},wo=(e,o)=>{if(!e.profiles.some((t)=>t.id===o))throw Error(`Unknown profile: ${o}`);return{...e,activeId:o}},Mr=(e,o,t)=>{if(!Dt(t))throw Error("Folder path must be absolute");let n=tt(t);return No(e,o,(s)=>s.folders.some((a)=>He(a,n))?s:{...s,folders:[...s.folders,n]})},Pr=(e,o,t)=>No(e,o,(n)=>({...n,folders:n.folders.filter((s)=>!He(s,t))}));var Lr="profiles.v1",Dr=(e)=>typeof e==="object"&&e!==null&&!Array.isArray(e),gn=(e)=>{if(!Dr(e)||typeof e.id!=="string"||!e.id||typeof e.name!=="string"||!Array.isArray(e.folders))return null;if(!e.folders.every((n)=>typeof n==="string"))return null;let o=new Set,t=[];for(let n of e.folders){let s=tt(n);if(s&&!o.has(s))o.add(s),t.push(s)}return{id:e.id,name:e.name,folders:t}},xn=(e)=>{if(e===void 0)return{state:Ke(),corrupt:!1};if(!Dr(e)||e.version!==1||!Array.isArray(e.profiles))return{state:Ke(),corrupt:!0};let o=e.profiles.map(gn),t=o.filter((a)=>a!==null),n=new Set(t.map((a)=>a.id));if(t.length===0||o.length!==t.length||n.size!==t.length)return{state:Ke(),corrupt:!0};return{state:{version:1,activeId:typeof e.activeId==="string"&&n.has(e.activeId)?e.activeId:t[0].id,profiles:t},corrupt:!1}},Gr=async(e)=>xn(await e.get(Lr)),Hr=(e,o)=>e.set(Lr,o);var Vr=20,An=["waiting-permission","waiting-question"],Rn=["running","retrying"],bn=(e)=>{if(e.some((o)=>An.includes(o.activity)))return"waiting";if(e.some((o)=>Rn.includes(o.activity)))return"running";return"idle"},yn=(e,o)=>{for(let t of o.projects)if(He(e,t.directory))return{project:t,via:"project"};for(let t of o.projects)if((o.worktrees[t.id]??[]).some((n)=>He(e,n.directory)))return{project:t,via:"worktree"};return null},vn=(e,o)=>{let t=yn(e,o);if(!t)return{path:e,kind:"not-added",project:null,via:null,sessions:[],hiddenSessions:0,attention:"idle"};let n=(o.sessions[t.project.id]??[]).filter((s)=>!s.parentId&&!s.archivedAt).filter((s)=>t.via==="project"||He(s.directory,e)).sort((s,a)=>a.updatedAt-s.updatedAt);return{path:e,kind:"registered",project:{id:t.project.id,name:t.project.name},via:t.via,sessions:n.slice(0,Vr).map(({id:s,title:a,updatedAt:c,activity:p})=>({id:s,title:a,updatedAt:c,activity:p})),hiddenSessions:Math.max(0,n.length-Vr),attention:bn(n)}},Xr=(e,o)=>e.projects.filter((t)=>{let n=[t.directory,...(e.worktrees[t.id]??[]).map((s)=>s.directory)];return!o.some((s)=>n.some((a)=>He(s,a)))}).map((t)=>({projectId:t.id,name:t.name,path:t.directory})),Fr=(e)=>{let{state:o}=e,t=o.profiles.find((n)=>n.id===o.activeId)??o.profiles[0];return{profiles:o.profiles.map((n)=>({id:n.id,name:n.name,folderCount:n.folders.length,active:n.id===t.id})),activeProfile:{id:t.id,name:t.name,folders:t.folders.map((n)=>vn(n,e))},unassigned:Xr(e,o.profiles.flatMap((n)=>n.folders)),pickable:Xr(e,t.folders)}};var Cn=31,In="https://github.com/odrinOp/openchamber-profiles",lt=(e)=>e instanceof Error?e.message:String(e),Br=(e)=>{let o=Ke(),t=!1,n=!1,s=[],a="loading",c={},p={},f,m=!1,_=new Map,x=null,A=new Set,T,v=()=>{let u=Fr({state:o,projects:s,worktrees:c,sessions:p}),E="ready",O;if(f)E="error",O=f;else if(!n||a==="loading")E="loading";else if(a==="error"&&s.length===0)E="error",O="Could not load projects from OpenChamber.";return{status:E,error:O,corrupt:t,vm:u}},C=()=>{T=v(),D();for(let u of A)u()},D=()=>{let u=new Set;for(let E of T.vm.activeProfile.folders){if(E.project)u.add(E.project.id);if(u.size>=Cn)break}for(let[E,O]of _)if(!u.has(E))O(),_.delete(E),delete p[E];for(let E of u){if(_.has(E))continue;_.set(E,()=>{}),e.onSessions(E,(O)=>{p={...p,[E]:O.sessions},C()}).then((O)=>{if(m||!_.has(E))O();else _.set(E,O)}).catch((O)=>{_.delete(E),console.error("sessions subscription failed",E,O)})}},U=async(u)=>{let E=await Promise.all(u.map(async(O)=>{try{return[O.id,(await e.listWorktrees(O.id)).worktrees]}catch{return[O.id,[]]}}));if(m)return;c=Object.fromEntries(E),C()},V=(u)=>{try{ne(u(o))}catch(E){e.toast({kind:"error",message:lt(E)})}},J=new Set,ee=async(u)=>{let E=T.vm.activeProfile.folders.find((O)=>O.path===u);if(!E?.project||J.has(u))return;J.add(u);try{let O=T.vm.activeProfile,Q=await e.startSession({providerId:"profiles",id:`profile:${O.id}`,title:O.name,url:In,data:{profileId:O.id},projectId:E.project.id,navigation:"open",...E.via==="worktree"?{worktree:{kind:"existing",directory:E.path}}:{}});if(Q.sessionId===null)e.toast({kind:"error",message:`Could not start a session (${Q.failure}).`})}catch(O){e.toast({kind:"error",message:`Could not start a session: ${lt(O)}`})}finally{J.delete(u)}},te=Promise.resolve(),ne=(u)=>{o=u,t=!1,C(),te=te.then(()=>Hr(e.storage,o)).catch((E)=>{e.toast({kind:"error",message:`Could not save profiles: ${lt(E)}`})})};return T=v(),(async()=>{try{let u=await Gr(e.storage);o=u.state,t=u.corrupt,n=!0,C();let E=await e.onProjects((O)=>{s=O.projects,a=O.state,C(),U(s)});if(m)E();else x=E}catch(u){f=lt(u),C()}})(),{get:()=>T,subscribe(u){return A.add(u),()=>A.delete(u)},selectProfile:(u)=>V((E)=>wo(E,u)),createProfile:(u)=>V((E)=>{let O=Ur(E,u);return wo(O,O.profiles[O.profiles.length-1].id)}),renameProfile:(u,E)=>V((O)=>Nr(O,u,E)),deleteProfile:(u)=>V((E)=>wr(E,u)),addFolder:(u,E)=>V((O)=>Mr(O,E??O.activeId,u)),removeFolder:(u)=>V((E)=>Pr(E,E.activeId,u)),newSession:(u)=>void ee(u),openSession:(u)=>{e.openSession(u).catch((E)=>{e.toast({kind:"error",message:`Could not open the session: ${lt(E)}`})})},dispose(){m=!0,x?.();for(let u of _.values())u();_.clear(),A.clear()}}};var $r=`
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

.oc-profiles-worktree-tag {
  font-size: 10px;
  line-height: 14px;
  padding: 0 5px;
  opacity: 0.85;
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
  cursor: pointer;
}

.oc-profiles-session-title:hover {
  text-decoration: underline;
  color: var(--primary-text, var(--primary, inherit));
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
`;var kn=(e)=>{let o=e.replace(/[\\/]+$/,""),t=Math.max(o.lastIndexOf("/"),o.lastIndexOf("\\"));if(t>=0)return o.slice(t+1)||e;return e},Un=(e,o=Date.now())=>{let t=Math.max(0,o-e),n=Math.floor(t/1000);if(n<60)return"just now";let s=Math.floor(n/60);if(s<60)return`${s}m ago`;let a=Math.floor(s/60);if(a<24)return`${a}h ago`;let c=Math.floor(a/24);if(c<30)return`${c}d ago`;let p=Math.floor(c/30);if(p<12)return`${p}mo ago`;return`${Math.floor(c/365)}y ago`},Nn=(e)=>{switch(e){case"waiting-permission":return{label:"waiting for permission",tone:"warning"};case"waiting-question":return{label:"waiting for answer",tone:"warning"};case"running":return{label:"running",tone:"info"};case"retrying":return{label:"retrying",tone:"warning"};case"idle":case"unknown":default:return{label:"idle",tone:"neutral"}}},wn=(e)=>{let t=document.getElementById("oc-profiles-view-style");if(!t)t=document.createElement("style"),t.id="oc-profiles-view-style",document.head.appendChild(t);if(t.textContent!==e)t.textContent=e},Mn=(e,o)=>{let t=document.createElement("div");t.className="oc-profiles-folder-card";let n=e,s=o,a=!1,c=null,p=document.createElement("div");p.className="oc-profiles-folder-header";let f=document.createElement("div");f.className="oc-profiles-folder-meta";let m=document.createElement("div");m.className="oc-profiles-folder-title-row";let _=document.createElement("span");_.className="oc-profiles-status-dot";let x=document.createElement("span");x.className="oc-profiles-folder-basename";let A=document.createElement("span");A.className="oc-sdk-badge oc-profiles-worktree-tag",A.textContent="worktree",A.style.display="none",m.appendChild(_),m.appendChild(x),m.appendChild(A);let T=document.createElement("span");T.className="oc-profiles-folder-path",f.appendChild(m),f.appendChild(T);let v=document.createElement("div");v.className="oc-profiles-folder-actions";let C=document.createElement("span"),D=document.createElement("span");v.appendChild(C),v.appendChild(D);let V=z(C,{label:"New session",variant:"default",size:"xs",onClick:()=>{if(a)return;a=!0,V.update({disabled:!0}),s.newSession(n.path),c=setTimeout(()=>{a=!1,c=null,V.update({disabled:!1})},3000)}}),J=z(D,{label:"Remove",variant:"ghost",size:"xs",onClick:()=>s.removeFolder(n.path)});p.appendChild(f),p.appendChild(v),t.appendChild(p);let ee=document.createElement("div");ee.className="oc-profiles-not-added-callout";let te=document.createElement("span");te.className="oc-profiles-not-added-icon",te.textContent="ℹ";let ne=document.createElement("span");ne.textContent="Add this folder as a project in the sidebar once",ee.appendChild(te),ee.appendChild(ne);let u=document.createElement("div");u.className="oc-profiles-sessions-container";let E=document.createElement("div");E.className="oc-profiles-sessions-empty",E.textContent="No sessions yet";let O=document.createElement("div");O.className="oc-profiles-sessions-list";let Q=document.createElement("div");Q.className="oc-profiles-sessions-more",u.appendChild(E),u.appendChild(O),u.appendChild(Q);let B=[],d=(l,ae)=>{if(n=l,s=ae,_.dataset.status=l.attention,_.setAttribute("title",`Status: ${l.attention}`),_.setAttribute("aria-label",`Status: ${l.attention}`),x.textContent=kn(l.path),x.title=l.path,T.textContent=l.path,T.title=l.path,A.style.display=l.via==="worktree"?"":"none",l.kind==="registered")C.style.display="",V.update({disabled:a});else C.style.display="none";if(J.update({onClick:()=>ae.removeFolder(l.path)}),l.kind==="not-added"){if(!ee.parentElement)t.appendChild(ee);if(u.parentElement)u.remove()}else{if(ee.parentElement)ee.remove();if(!u.parentElement)t.appendChild(u);if(l.sessions.length===0)E.style.display="",O.style.display="none",Q.style.display="none";else{E.style.display="none",O.style.display="";while(B.length<l.sessions.length){let W=document.createElement("div");W.className="oc-profiles-session-row";let ce=document.createElement("div");ce.className="oc-profiles-session-lead";let le=document.createElement("span");le.className="oc-profiles-session-title",ce.appendChild(le);let Te=document.createElement("span");ce.appendChild(Te);let se=ko(Te,{label:"",tone:"neutral"}),Ee=document.createElement("div");Ee.className="oc-profiles-session-trail";let N=document.createElement("span");Ee.appendChild(N);let xe=document.createElement("div");xe.className="oc-profiles-session-actions",Ee.appendChild(xe);let G="",w=z(xe,{label:"Open",variant:"secondary",size:"xs",onClick:()=>{if(G)s.openSession(G)}});le.addEventListener("click",()=>{if(G)s.openSession(G)}),W.appendChild(ce),W.appendChild(Ee),O.appendChild(W),B.push({element:W,titleEl:le,badgeHandle:se,timeEl:N,openButtonHandle:w,setSessionId:(P)=>{G=P}})}while(B.length>l.sessions.length){let W=B.pop();W.badgeHandle.dispose(),W.openButtonHandle.dispose(),W.element.remove()}if(l.sessions.forEach((W,ce)=>{let le=B[ce];le.setSessionId(W.id),le.titleEl.textContent=W.title||"Untitled session",le.titleEl.title=`Open session: ${W.title||"Untitled session"}`;let Te=Nn(W.activity);le.badgeHandle.update({label:Te.label,tone:Te.tone}),le.timeEl.textContent=Un(W.updatedAt)}),l.hiddenSessions>0)Q.style.display="",Q.textContent=`+${l.hiddenSessions} more`;else Q.style.display="none"}}};return d(e,o),{element:t,update:d,dispose:()=>{if(c)clearTimeout(c),c=null;V.dispose(),J.dispose();for(let l of B)l.badgeHandle.dispose(),l.openButtonHandle.dispose();B=[],t.remove()}}},Pn=(e,o,t)=>{let n=document.createElement("div");n.className="oc-profiles-unassigned-card";let s=document.createElement("div");s.className="oc-profiles-unassigned-info";let a=document.createElement("span");a.className="oc-profiles-unassigned-name";let c=document.createElement("span");c.className="oc-profiles-unassigned-path",s.appendChild(a),s.appendChild(c);let p=document.createElement("div");p.className="oc-profiles-unassigned-actions",n.appendChild(s),n.appendChild(p);let f=null,m=null,_=null,x=o.find((T)=>T.active)?.id??o[0]?.id??"",A=(T,v,C)=>{if(a.textContent=T.name,c.textContent=T.path,c.title=T.path,!v.some((D)=>D.id===x))x=v.find((D)=>D.active)?.id??v[0]?.id??"";if(v.length<=1){if(m)m.dispose(),m=null;if(_)_.dispose(),_=null;let D=v[0]?.name??"profile",U=v[0]?.id;if(!f)f=z(p,{label:`Add to ${D}`,variant:"secondary",size:"sm",onClick:()=>{if(U)C.addFolder(T.path,U);else C.addFolder(T.path)}});else f.update({label:`Add to ${D}`,onClick:()=>{if(U)C.addFolder(T.path,U);else C.addFolder(T.path)}})}else{if(f)f.dispose(),f=null;let D=v.map((U)=>({id:U.id,label:U.active?`${U.name} (active)`:U.name}));if(!m)m=Io(p,{options:D,value:x,onChange:(U)=>{x=U}});else m.update({options:D,value:x});if(!_)_=z(p,{label:"Add",variant:"secondary",size:"sm",onClick:()=>{C.addFolder(T.path,x)}});else _.update({onClick:()=>{C.addFolder(T.path,x)}})}};return A(e,o,t),{element:n,update:A,dispose:()=>{f?.dispose(),m?.dispose(),_?.dispose(),n.remove()}}},jr=(e)=>{wn($r);let o=null,t=null,n={kind:"profile"},s=!1,a="",c,p=!1,f=null,m="",_=!1,x=null,A=!1,T="",v="",C;while(e.firstChild)e.removeChild(e.firstChild);let D=document.createElement("div");D.className="oc-profiles-app oc-sdk",e.appendChild(D);let U=document.createElement("aside");U.className="oc-profiles-sidebar",D.appendChild(U);let V=document.createElement("div");V.className="oc-profiles-sidebar-header",V.textContent="Profiles",U.appendChild(V);let J=document.createElement("div");J.className="oc-profiles-sidebar-section",U.appendChild(J);let ee=ct(J,{items:[],ariaLabel:"Profiles",onSelect:(S)=>{if(n={kind:"profile"},t?.selectProfile(S),o&&t)fe(o,t)}}),te=document.createElement("div");te.className="oc-profiles-sidebar-action",U.appendChild(te);let ne=document.createElement("div");te.appendChild(ne);let u=document.createElement("div");u.className="oc-profiles-new-profile-form",u.style.display="none",te.appendChild(u);let E=document.createElement("div");u.appendChild(E);let O=document.createElement("div");O.className="oc-profiles-form-actions",u.appendChild(O);let Q=()=>{let S=a.trim();if(!S){c="Name cannot be empty",l.update({error:c});return}if(t?.createProfile(S),s=!1,a="",c=void 0,o&&t)fe(o,t)},B=()=>{if(s=!1,a="",c=void 0,o&&t)fe(o,t)},d=z(ne,{label:"+ New profile",variant:"ghost",size:"sm",onClick:()=>{if(s=!0,a="",c=void 0,o&&t)fe(o,t);u.querySelector("input")?.focus()}}),l=Nt(E,{placeholder:"Profile name",value:"",onChange:(S)=>{a=S,c=void 0,l.update({value:S,error:void 0}),ae.update({disabled:!S.trim()})}}),ae=z(O,{label:"Create",variant:"default",size:"xs",disabled:!0,onClick:Q}),W=z(O,{label:"Cancel",variant:"ghost",size:"xs",onClick:B});u.addEventListener("keydown",(S)=>{if(S.key==="Enter")S.preventDefault(),Q();else if(S.key==="Escape")S.preventDefault(),B()});let ce=document.createElement("div");U.appendChild(ce);let le=Lt(ce,{label:"Library"}),Te=document.createElement("div");Te.className="oc-profiles-sidebar-section",U.appendChild(Te);let se=ct(Te,{items:[],ariaLabel:"Unassigned library",onSelect:()=>{if(n={kind:"unassigned"},o&&t)fe(o,t)}}),Ee=document.createElement("main");Ee.className="oc-profiles-main",D.appendChild(Ee);let N=document.createElement("header");N.className="oc-profiles-main-header",Ee.appendChild(N);let xe=document.createElement("div");xe.className="oc-profiles-header-top",N.appendChild(xe);let G=document.createElement("div");G.className="oc-profiles-header-title-row",xe.appendChild(G);let w=document.createElement("h1");w.className="oc-profiles-main-title",G.appendChild(w);let P=document.createElement("div");P.className="oc-profiles-rename-form",P.style.display="none",G.appendChild(P);let _e=document.createElement("input");_e.type="text",_e.className="oc-sdk-input",_e.placeholder="Profile name",P.appendChild(_e);let Ve=document.createElement("div");Ve.className="oc-profiles-form-actions",P.appendChild(Ve);let ot=()=>{let S=m.trim();if(S&&f)t?.renameProfile(f,S);if(p=!1,f=null,o&&t)fe(o,t)},rt=()=>{if(p=!1,f=null,o&&t)fe(o,t)},Me=z(Ve,{label:"Save",variant:"default",size:"xs",onClick:ot}),ze=z(Ve,{label:"Cancel",variant:"ghost",size:"xs",onClick:rt});_e.addEventListener("input",()=>{m=_e.value,Me.update({disabled:!m.trim()})}),_e.addEventListener("keydown",(S)=>{if(S.key==="Enter")S.preventDefault(),ot();else if(S.key==="Escape")S.preventDefault(),rt()});let Ae=document.createElement("div");Ae.className="oc-profiles-header-actions",xe.appendChild(Ae);let We=z(Ae,{label:"Rename",variant:"ghost",size:"xs",onClick:()=>{if(!o)return;p=!0,f=o.vm.activeProfile.id,m=o.vm.activeProfile.name,_e.value=m,_=!1,fe(o,t),_e.focus(),_e.select()}}),Je=z(Ae,{label:"Delete",variant:"ghost",size:"xs",onClick:()=>{if(!o)return;_=!0,x=o.vm.activeProfile.id,p=!1,fe(o,t)}}),de=z(Ae,{label:"+ Add folder",variant:"secondary",size:"sm",onClick:()=>{if(A=!A,o&&t)fe(o,t)}}),ve=document.createElement("p");ve.className="oc-profiles-main-subtitle",N.appendChild(ve);let he=document.createElement("div");he.className="oc-profiles-delete-confirm",he.style.display="none",N.appendChild(he);let nt=document.createElement("p");nt.className="oc-profiles-delete-confirm-text",he.appendChild(nt);let Ce=document.createElement("div");Ce.className="oc-profiles-form-actions",he.appendChild(Ce);let dt=z(Ce,{label:"Delete profile",variant:"destructive",size:"xs",onClick:()=>{if(x&&t)t.deleteProfile(x);if(_=!1,x=null,o&&t)fe(o,t)}}),pt=z(Ce,{label:"Cancel",variant:"ghost",size:"xs",onClick:()=>{if(_=!1,x=null,o&&t)fe(o,t)}}),r=document.createElement("div");r.className="oc-profiles-add-panel",r.style.display="none",Ee.appendChild(r);let i=document.createElement("div");i.className="oc-profiles-add-panel-header",r.appendChild(i);let h=document.createElement("h3");h.className="oc-profiles-add-panel-title",i.appendChild(h);let g=()=>{if(A=!1,T="",v="",C=void 0,o&&t)fe(o,t)},H=z(i,{label:"Cancel",variant:"ghost",size:"xs",onClick:g}),M=document.createElement("div");M.className="oc-profiles-add-section",r.appendChild(M);let j=document.createElement("span");j.className="oc-profiles-add-section-label",j.textContent="Registered projects",M.appendChild(j);let ut=document.createElement("div");M.appendChild(ut);let Mo=bo(ut,{placeholder:"Filter projects…",value:"",onChange:(S)=>{if(T=S,o&&t)Go(o,t)}}),st=document.createElement("div");st.className="oc-profiles-pickable-list-wrap",M.appendChild(st);let Po=ct(st,{items:[],emptyText:"No matching projects",onSelect:(S)=>{t?.addFolder(S),g()}}),Qe=document.createElement("p");Qe.className="oc-profiles-empty-hint",Qe.textContent="All registered projects are already in this profile",Qe.style.display="none",M.appendChild(Qe);let Lo=document.createElement("div");r.appendChild(Lo);let Jr=Lt(Lo,{label:"or"}),Gt=document.createElement("div");Gt.className="oc-profiles-add-section",r.appendChild(Gt);let ft=document.createElement("div");ft.className="oc-profiles-typed-row",Gt.appendChild(ft);let Ht=document.createElement("div");ft.appendChild(Ht);let Do=()=>{let S=v.trim();if(!Dt(S)){C="Use an absolute path, e.g. /Users/me/project",Et.update({error:C});return}t?.addFolder(S),g()},Et=Nt(Ht,{label:"Or type a folder path",placeholder:"/path/to/folder or C:\\path\\to\\folder",mono:!0,value:"",onChange:(S)=>{v=S,C=void 0,Et.update({value:S,error:void 0})}});Ht.addEventListener("keydown",(S)=>{if(S.key==="Enter")S.preventDefault(),Do();else if(S.key==="Escape")S.preventDefault(),g()});let Qr=z(ft,{label:"Add path",variant:"secondary",size:"sm",onClick:Do}),Go=(S,Le)=>{let it=T.trim().toLowerCase(),L=S.vm.pickable.filter((ie)=>!it||ie.name.toLowerCase().includes(it)||ie.path.toLowerCase().includes(it)).map((ie)=>({id:ie.path,title:ie.name,subtitle:ie.path}));if(S.vm.pickable.length===0)ut.style.display="none",st.style.display="none",Qe.style.display="";else ut.style.display="",st.style.display="",Qe.style.display="none",Po.update({items:L})},_t=document.createElement("div");_t.className="oc-profiles-banner-slot",Ee.appendChild(_t);let Xe=document.createElement("section");Xe.className="oc-profiles-content",Ee.appendChild(Xe);let Ie=null,ke=null,Pe=null,pe=null,ue=null,Re=new Map,be=new Map,fe=(S,Le)=>{if(o=S,t=Le,f&&f!==S.vm.activeProfile.id)p=!1,f=null;if(x&&x!==S.vm.activeProfile.id)_=!1,x=null;if(S.corrupt)if(!Ie)Ie=Pt(_t,{tone:"warning",title:"Profiles read warning",body:"Saved profiles couldn't be read. Showing defaults; nothing is overwritten until you make a change."});else Ie.update({body:"Saved profiles couldn't be read. Showing defaults; nothing is overwritten until you make a change."});else if(Ie)Ie.dispose(),Ie=null;if(S.status==="error"){let L=S.error||"An unexpected error occurred loading profiles.";if(!ke)ke=Pt(_t,{tone:"error",title:"Unable to load profiles",body:L});else ke.update({body:L})}else if(ke)ke.dispose(),ke=null;let it=S.vm.profiles.map((L)=>({id:L.id,title:L.name,meta:L.folderCount===1?"1 folder":`${L.folderCount} folders`,badge:L.active?{label:"active",tone:"primary"}:void 0}));if(ee.update({items:it,selectedId:n.kind==="profile"?S.vm.activeProfile.id:null}),s)ne.style.display="none",u.style.display="",l.update({value:a,error:c}),ae.update({disabled:!a.trim()});else ne.style.display="",u.style.display="none";if(se.update({items:[{id:"unassigned",title:"Unassigned",meta:String(S.vm.unassigned.length)}],selectedId:n.kind==="unassigned"?"unassigned":null}),S.status==="loading"){if(!Pe)Pe=Uo(Xe,{label:"Loading profiles and projects…"});for(let L of Re.values())L.element.style.display="none";for(let L of be.values())L.element.style.display="none";if(pe)pe.dispose(),pe=null;if(ue)ue.dispose(),ue=null;w.textContent="Loading…",ve.textContent="",Ae.style.display="none",r.style.display="none";return}if(Pe)Pe.dispose(),Pe=null;if(n.kind==="profile"){let L=S.vm.activeProfile;if(Ae.style.display="",p&&f===L.id)w.style.display="none",P.style.display="",Me.update({disabled:!m.trim()}),We.update({disabled:!0}),Je.update({disabled:!0});else w.style.display="",w.textContent=L.name,P.style.display="none",We.update({disabled:!1}),Je.update({disabled:!1});if(_&&x===L.id){he.style.display="";let oe=S.vm.profiles.length===1;nt.textContent=oe?`Delete "${L.name}"? Its folders move to Unassigned unless another profile holds them. Projects aren't touched. This is your last profile, so it will reset to an empty Default profile.`:`Delete "${L.name}"? Its folders move to Unassigned unless another profile holds them. Projects aren't touched.`}else he.style.display="none";let ie=L.folders.length;if(ve.textContent=`${ie} ${ie===1?"project folder":"project folders"}`,A)r.style.display="",h.textContent=`Add folder to ${L.name}`,de.update({label:"✕ Close add"}),Mo.update({value:T}),Go(S,Le),Et.update({value:v,error:C});else r.style.display="none",de.update({label:"+ Add folder"});for(let oe of be.values())oe.dispose();if(be.clear(),ue)ue.dispose(),ue=null;if(ie===0){for(let re of Re.values())re.dispose();Re.clear();let oe={title:"No folders yet",body:"Add some from Unassigned or choose a project above.",action:{label:"+ Add folder",onClick:()=>{A=!0,fe(S,Le)}}};if(!pe)pe=Mt(Xe,oe);else pe.update(oe)}else{if(pe)pe.dispose(),pe=null;let oe=new Set(L.folders.map((re)=>re.path));for(let[re,De]of Re)if(!oe.has(re))De.dispose(),Re.delete(re);for(let re of L.folders){let De=Re.get(re.path);if(!De)De=Mn(re,Le),Re.set(re.path,De);else De.element.style.display="",De.update(re,Le);Xe.appendChild(De.element)}}return}if(n.kind==="unassigned"){w.style.display="",w.textContent="Unassigned projects",P.style.display="none",he.style.display="none",Ae.style.display="none",r.style.display="none";let L=S.vm.unassigned.length;ve.textContent=`Projects in OpenChamber not included in any profile (${L})`;for(let ie of Re.values())ie.dispose();if(Re.clear(),pe)pe.dispose(),pe=null;if(L===0){for(let oe of be.values())oe.dispose();be.clear();let ie={title:"Every project is in a profile.",body:"All registered projects in OpenChamber belong to at least one profile."};if(!ue)ue=Mt(Xe,ie);else ue.update(ie)}else{if(ue)ue.dispose(),ue=null;let ie=new Set(S.vm.unassigned.map((oe)=>oe.path));for(let[oe,re]of be)if(!ie.has(oe))re.dispose(),be.delete(oe);for(let oe of S.vm.unassigned){let re=be.get(oe.path);if(!re)re=Pn(oe,S.vm.profiles,Le),be.set(oe.path,re);else re.element.style.display="",re.update(oe,S.vm.profiles,Le);Xe.appendChild(re.element)}}}};return{render:fe,dispose:()=>{if(ee.dispose(),d.dispose(),l.dispose(),ae.dispose(),W.dispose(),le.dispose(),se.dispose(),Me.dispose(),ze.dispose(),We.dispose(),Je.dispose(),de.dispose(),dt.dispose(),pt.dispose(),H.dispose(),Mo.dispose(),Po.dispose(),Jr.dispose(),Et.dispose(),Qr.dispose(),Ie)Ie.dispose(),Ie=null;if(ke)ke.dispose(),ke=null;if(Pe)Pe.dispose(),Pe=null;if(pe)pe.dispose(),pe=null;if(ue)ue.dispose(),ue=null;for(let S of Re.values())S.dispose();Re.clear();for(let S of be.values())S.dispose();be.clear(),D.remove()}}};var Kr=Eo(),zr=document.getElementById("app");if(!zr)throw Error("Missing #app");var Ln=jr(zr),ye=Br(Kr),Dn={selectProfile:(e)=>ye.selectProfile(e),createProfile:(e)=>ye.createProfile(e),renameProfile:(e,o)=>ye.renameProfile(e,o),deleteProfile:(e)=>ye.deleteProfile(e),addFolder:(e,o)=>ye.addFolder(e,o),removeFolder:(e)=>ye.removeFolder(e),newSession:(e)=>ye.newSession(e),openSession:(e)=>ye.openSession(e)},Wr=()=>Ln.render(ye.get(),Dn);Kr.onReady((e)=>_o(e,document.documentElement));ye.subscribe(Wr);Wr();})();
