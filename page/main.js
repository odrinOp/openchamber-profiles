(()=>{var p="openchamber.sdk",_=1;var $e=`
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
`;function Vt(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let c=new WeakMap;e.addEventListener("scroll",(x)=>{let E=x.target===e?r:x.target;if(!(E instanceof Element))return;if(!E.hasAttribute("data-oc-scrolling"))E.setAttribute("data-oc-scrolling","");let g=c.get(E);if(g!==void 0)clearTimeout(g);c.set(E,setTimeout(()=>{c.delete(E),E.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var ko=`(${Vt.toString()})(document);`;var Be=128,Ke=65536;var Oe=128;var Ae=65536;var $t=/^[a-z][a-z0-9-]{0,39}$/;var Xt=(e)=>Object(e)===e&&!Array.isArray(e),je=(e,r)=>Object.keys(e).every((c)=>r.includes(c)),Ht=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Ft=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Bt=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let c of e){if(!Xt(c)||!$t.test(c.id)||!Ht(c.label))return!1;if(c.disabled!==void 0&&c.disabled!==!0&&c.disabled!==!1)return!1;if(r.has(c.id))return!1;if(r.add(c.id),c.kind==="button"){if(!je(c,["kind","id","label","disabled"]))return!1;continue}if(c.kind!=="select"||!je(c,["kind","id","label","value","options","disabled"]))return!1;if(!Ft(c.value)||!Array.isArray(c.options)||c.options.length<1||c.options.length>16)return!1;let x=new Set;for(let E of c.options){if(!Xt(E)||!je(E,["value","label"])||!Ft(E.value)||!Ht(E.label)||x.has(E.value))return!1;x.add(E.value)}if(!x.has(c.value))return!1}return!0};var Kt=["{id}","{segment}","{segments+}"];var sr=new Set(Kt);var jt=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var ar=new Set(jt);var Re=20000000,he=256;var We=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Wt=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let c=0;c<e.bytes.byteLength;c+=1)if(e.bytes[c]!==r.bytes[c])return!1;return!0};var zt=/^[A-Za-z0-9_-]{1,80}$/;var Jt=["left","right","top","bottom"];var Qt=(e,r=0,c={remaining:16000})=>{if(--c.remaining<0||r>=32)return!1;if(e===null)return!0;let x=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let E of x)if(!Qt(E,r+1,c))return!1;return!0},ze=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(ze);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(ze)}return String(e)===e||Number.isFinite(e)},Je=(e)=>{try{if(String(e.id)!==e.id||!zt.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Jt.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Qt(e.data)||!ze(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Ye=2000;var Zt=["file","directory","other","missing"],Ze=(e)=>Boolean(e&&"sessionId"in e),qe=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var qt=/^[0-9a-f]{7,64}$/i,et=(e)=>qt.test(e),me=500,xe=32000,eo=16000,to=128,oo=200,ro=2000,no=16000,so=80,io=200,ao=16000;var co=2000;var tt=20000,Ie=1024,be=2000000;var ge=64000,Ue=8000,ot=4000;var rt=960000;var lo=999,po=1e4,ae=500,_o=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Eo=["stopped","starting","ready","failed"],No=new Set(_o),uo=(e)=>No.has(e),So=(e)=>e&&uo(e)?e:"HOST_REJECTED",J=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(J);if(Object(e)===e)return Object.values(e).every(J);return!1},To=(e)=>J(e)&&JSON.stringify(e).length<=ao,Yt=(e)=>e?.trim().slice(0,io)??"",Q=(e)=>{let r=e.id.trim().slice(0,to),c=e.title.trim().slice(0,oo),x=e.url.trim().slice(0,ro),E=e.text?.trim().slice(0,no),g=e.author?.trim().slice(0,so),V=e.kind==="pull"?"pull":"issue",y={providerId:e.providerId.trim(),id:r,title:c||r,url:x,kind:V};if(E)y.text=E;if(g)y.author=g;if(V==="pull"){let X=Yt(e.branches?.head),H=Yt(e.branches?.base);if(X&&H)y.branches={head:X,base:H}}if(To(e.data))y.data=e.data;return y},nt=(e)=>{let r=Q(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},st=(e)=>{let r={text:e.text.trim().slice(0,eo)};if(e.send)r.send=!0;return r},it=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(lo,Math.max(0,Math.round(e)))},at=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(po,Math.max(0,Math.ceil(e)))};var Y=(e)=>e.length>0&&e.length<=Ie&&!e.includes("\x00")&&!e.includes("\\");var Ce=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>co)return!1;return!e.split("/").some((c)=>c==="."||c==="..")},yo=new Set(Eo),ct=(e)=>Boolean(e&&"status"in e&&yo.has(String(e.status))&&!("body"in e)),ke=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),dt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),lt=(e)=>Boolean(e&&"written"in e&&e.written===!0),pt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),vo=new Set(Zt),_t=(e)=>Boolean(e&&"kind"in e&&"size"in e&&vo.has(String(e.kind))&&Number.isFinite(e.size)),Et=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Lo=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Po=(e)=>Object(e)===e?e:null,Qe=(e)=>String(e)===e&&e.length>0,wo=(e)=>{if(!Qe(e.id))return null;if(e.ok===!0){let r={channel:p,v:_,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&Qe(e.error))return{channel:p,v:_,type:"result",id:e.id,ok:!1,error:e.error,code:So(Qe(e.code)?e.code:void 0)};return null},ut=(e)=>{let r=Po(e);if(!r||r.channel!==p||r.v!==_)return null;if(r.type==="result")return wo(r);if(!Lo.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var fo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Do=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class a extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var Oo=()=>Promise.reject(new a("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Me=()=>Promise.reject(new a("BAD_PATH",`File path must be 1 to ${Ie} characters without NUL or backslash.`)),Ne=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new a("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},l=(e)=>(e.value+=1,`oc-${e.value}`),St=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new a("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let c=e.acceptSource??((t)=>t===r.parent),x=e.requestTimeoutMs??tt,E=new Set,g=new Set,V=new Set,y=new Set,X=new Set,H=new Set,ee=new Set,de=new Set,le=new Set,pe=new Set,_e=new Set,K=new Set,Ge=[],te=null,oe=null,Ee=new Set,ue=new Set,re=null,ne=null,Ve=!1,j=new Map,W=new Map,z=new Map,L=!1,d={value:0},i=null,P=null,se=!1,ie=!1,Ut=null,Ct=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},M=(t)=>{r.parent.postMessage(t,"*")},kt=()=>{if(L||r.parent===r||K.size===0||i?.features?.lateGenerateResults!==!0)return;M({channel:p,v:_,type:"generate-late-listen"})},f=(t,o)=>{for(let n of t)try{n(o)}catch(s){console.error(s)}},Mt=(t)=>{if(!(t instanceof MessageEvent))return;if(!c(t.source))return;let o=ut(t.data);if(!o)return;if(o.type==="workspace"){let s=W.get(o.payload.subscriptionId);if(s)f([s],o.payload.snapshot);return}if(o.type==="shells"){let s=z.get(o.payload.subscriptionId);if(s)f([s],o.payload.snapshot);return}if(o.type==="ready"){if(i=o.payload,P=Ct(o.payload.session),f(E,o.payload),f(g,o.payload.directory),f(V,o.payload.session),P)f(y,P);if(f(X,o.payload.connection),f(H,o.payload.settings),f(ee,o.payload.item),o.payload.block)f(de,o.payload.block);kt();return}if(o.type==="service-event"){f(le,o.payload);return}if(o.type==="generate-late"){if(K.size===0)Ge.push(o.payload);else f(K,o.payload);return}if(o.type==="directory"){if(i)i={...i,directory:o.payload.directory};f(g,o.payload.directory);return}if(o.type==="session"){if(i)i={...i,session:o.payload.session};if(!o.payload.session)P=null;else if(P?.sessionId!==o.payload.session.id)P=Ct(o.payload.session);f(V,o.payload.session);return}if(o.type==="session-lifecycle"){P=o.payload,f(y,o.payload);return}if(o.type==="connection"){if(i)i={...i,connection:o.payload.connection};f(X,o.payload.connection);return}if(o.type==="settings"){if(i)i={...i,settings:o.payload.settings};f(H,o.payload.settings);return}if(o.type==="item"){if(i)i={...i,item:o.payload.item};f(ee,o.payload.item);return}if(o.type==="status-control-event"){f(pe,o.payload);return}if(o.type==="popover-closed"){f(_e,o.payload);return}if(o.type==="action"){let s=(u)=>{if(!L)M({channel:p,v:_,type:"action-result",id:o.id,payload:u})},S=oe;if(!S){s({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>S(o.payload)).then(()=>s({ok:!0}),(u)=>{let m=(u instanceof Error?u.message:String(u)).trim();s({ok:!1,error:(m||"Action failed.").slice(0,ae)})});return}if(o.type==="file-open"){let s=o.payload;if(ne&&Wt(ne,s))return;ne=s,f(Ee,o.payload);return}if(o.type==="file-saved"){f(ue,o.payload.version);return}if(o.type==="file-snapshot"){let s=(m)=>{if(!L)M({channel:p,v:_,type:"file-snapshot-result",id:o.id,payload:m})},S=(m)=>s({error:(m.trim()||"Could not read the edited file.").slice(0,ae)}),u=re;if(!u){S("This extension does not edit files.");return}Promise.resolve().then(()=>u(o.payload.purpose)).then((m)=>{if(We(m)>Re){S(`The file is over ${Re} ${"bytes"in m?"bytes":"characters"}.`);return}if(m.version.length>he){S(`The snapshot version is over ${he} characters.`);return}s({snapshot:"bytes"in m?{bytes:m.bytes,version:m.version}:{content:m.content,version:m.version}})},(m)=>S(m instanceof Error?m.message:String(m)));return}if(o.type==="resolve"){let s=(u)=>{M({channel:p,v:_,type:"resolve-result",id:o.id,payload:u})},S=te;if(!S){s({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>S(o.payload)).then((u)=>s({item:u?Q(u):null}),(u)=>{let m=(u instanceof Error?u.message:String(u)).trim();s({error:(m||"Command failed.").slice(0,ae)})});return}let n=j.get(o.id);if(!n)return;if(clearTimeout(n.timer),j.delete(o.id),o.ok){n.resolve(o.payload);return}n.reject(new a(o.code,o.error))};r.addEventListener("message",Mt),M({channel:p,v:_,type:"hello"});let I=(t,o=x)=>{if(L||r.parent===r)return Promise.reject(new a("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((n,s)=>{let S=setTimeout(()=>{j.delete(t.id),s(new a("HOST_TIMEOUT","Host did not answer in time."))},o);j.set(t.id,{resolve:n,reject:s,timer:S}),M(t)})},R=(t)=>I(t).then(()=>{return}),h={channel:p,v:_},Xe=(t)=>{if(!L&&r.parent!==r)M(t)},Nt=()=>Xe({...h,type:"file-save"}),yt=(t)=>{if(!fo(t)||!Do(t))return;t.preventDefault(),Nt()},vt=(t)=>{if(!fo(t)||t.key!=="Escape"||i?.surface!=="popover"||!i.popover)return;t.preventDefault(),Dt(i.popover.id,"escape").catch(()=>{return})},Se=()=>{let t=i?.surface==="popover"?i.popover:void 0;if(!t)return;let o=se||ie;if(Ut===o)return;Ut=o,Gt(t.id,o).catch(()=>{return})},Te=()=>{if(i?.surface!=="popover"||se)return;se=!0,Se()},Lt=(t)=>{if(i?.surface!=="popover"||t.relatedTarget!==null||!se)return;se=!1,Se()},Pt=()=>{if(i?.surface!=="popover"||ie)return;ie=!0,Se()},wt=()=>{if(i?.surface!=="popover"||!ie)return;ie=!1,Se()},v=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new a("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},He=async(t)=>{if(t.kind!=="projects")v(t.projectId);let o=await I({...h,type:"workspace-read",id:l(d),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new a("HOST_REJECTED","Host did not return workspace data.");return o},Fe=async(t,o)=>{if(t.kind!=="projects")v(t.projectId);let n=l(d);W.set(n,o);try{await R({...h,type:"workspace-subscribe",id:l(d),payload:{subscriptionId:n,query:t}})}catch(s){if(W.delete(n),!L)M({...h,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:n}});throw s}return()=>{if(!W.delete(n)||L)return;M({...h,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:n}})}},Co=async(t,o)=>{if(t.kind==="session")v(t.sessionId);if(t.kind==="project")v(t.projectId);let n=l(d);z.set(n,o);try{await R({...h,type:"shells-subscribe",id:l(d),payload:{subscriptionId:n,scope:t}})}catch(s){if(z.delete(n),!L)M({...h,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:n}});throw s}return()=>{if(!z.delete(n)||L)return;M({...h,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:n}})}},fe=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Be))throw new a("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!J(t.value))throw new a("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>Ke)throw new a("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&i?.features?.deviceStorage!==!0)throw new a("UNSUPPORTED","This host does not support device storage.");let o=await I({...h,type:"storage",id:l(d),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new a("HOST_REJECTED","Host did not return storage data.");return o},Dt=(t,o)=>i?.features?.popovers!==!0&&!(i?.surface==="popover"&&i.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):R({...h,type:"popover-close",id:l(d),payload:o?{id:t,reason:o}:{id:t}}),Gt=(t,o)=>i?.features?.popovers!==!0&&!(i?.surface==="popover"&&i.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):R({...h,type:"popover-anchor",id:l(d),payload:{id:t,active:o}});return r.addEventListener("keydown",vt,!0),r.addEventListener("pointerover",Te),r.addEventListener("pointermove",Te),r.addEventListener("pointerout",Lt),r.addEventListener("focus",Pt),r.addEventListener("blur",wt),{onAction:(t)=>(oe=t,()=>{if(oe===t)oe=null}),listProjects:async()=>{let t=await He({kind:"projects"});if(t.kind!=="projects")throw new a("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await He({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new a("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await He({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new a("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>Fe({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>Fe({kind:"worktrees",projectId:t},(n)=>{if(n.kind==="worktrees")o(n)}),onSessions:(t,o)=>Fe({kind:"sessions",projectId:t},(n)=>{if(n.kind==="sessions")o(n)}),onRunningShells:(t,o)=>Co(t,o),readShellOutput:async(t,o)=>{v(t,Oe);let n=o?.cursor;if(n!==void 0&&(!Number.isInteger(n)||n<0))throw new a("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let s=o?.tailBytes;if(s!==void 0&&(!Number.isInteger(s)||s<1||s>Ae))throw new a("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ae}.`);let u=await I({...h,type:"shell-output",id:l(d),payload:{shellId:t,cursor:n,tailBytes:s}});if(!u||typeof u.output!=="string"||!Number.isFinite(u.cursor))throw new a("HOST_REJECTED","Host did not return shell output.");return u},stopShell:async(t)=>{if(v(t,Oe),(await I({...h,type:"shell-stop",id:l(d),payload:{shellId:t}}))?.stopped!==!0)throw new a("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{v(t),await R({...h,type:"open-session",id:l(d),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let n=Ne(o),s={op:"get",key:t};if(n)s.scope=n;let S=await fe(s);return S.op==="get"&&S.found?S.value:void 0},set:async(t,o,n)=>{let s=Ne(n),S={op:"set",key:t,value:o};if(s)S.scope=s;await fe(S)},delete:async(t,o)=>{let n=Ne(o),s={op:"delete",key:t};if(n)s.scope=n;await fe(s)},keys:async(t)=>{let o=Ne(t),n={op:"keys"};if(o)n.scope=o;let s=await fe(n);if(s.op!=="keys")throw new a("HOST_REJECTED","Expected storage keys.");return s.keys}},onReady:(t)=>{if(E.add(t),i)t(i);return()=>{E.delete(t)}},onDirectory:(t)=>{if(g.add(t),i)t(i.directory);return()=>{g.delete(t)}},onSession:(t)=>{if(V.add(t),i)t(i.session);return()=>{V.delete(t)}},onSessionLifecycle:(t)=>{if(y.add(t),P)t(P);return()=>{y.delete(t)}},onConnection:(t)=>{if(X.add(t),i)t(i.connection);return()=>{X.delete(t)}},onSettings:(t)=>{if(H.add(t),i)t(i.settings);return()=>{H.delete(t)}},onItem:(t)=>{if(ee.add(t),i)t(i.item);return()=>{ee.delete(t)}},onBlock:(t)=>{if(de.add(t),i?.block)t(i.block);return()=>{de.delete(t)}},onServiceEvent:(t)=>(le.add(t),()=>{le.delete(t)}),onStatusControl:(t)=>(pe.add(t),()=>{pe.delete(t)}),onPopoverClosed:(t)=>(_e.add(t),()=>{_e.delete(t)}),setStatusControls:(t)=>{if(i?.features?.statusControls!==!0)return Promise.reject(new a("UNSUPPORTED","This host does not support status controls."));if(!Bt(t))return Promise.reject(new a("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return R({...h,type:"status-controls",id:l(d),payload:{controls:t}})},openPopover:(t)=>{if(i?.features?.popovers!==!0)return Promise.reject(new a("UNSUPPORTED","This host does not support popovers."));if(!Je(t))return Promise.reject(new a("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return R({...h,type:"popover-open",id:l(d),payload:t})},closePopover:Dt,setPopoverAnchorActive:Gt,onResolve:(t)=>(te=t,()=>{if(te===t)te=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>me)return Promise.reject(new a("HOST_REJECTED",`Toast message must contain 1 to ${me} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>xe))return Promise.reject(new a("HOST_REJECTED",`Toast copy text must contain 1 to ${xe} characters.`));return R({channel:p,v:_,type:"toast",id:l(d),payload:{...t,message:o}})},openUrl:(t)=>R({channel:p,v:_,type:"open-url",id:l(d),payload:{url:t}}),openCommit:(t)=>et(t)?R({channel:p,v:_,type:"open-commit",id:l(d),payload:{sha:t}}):Promise.reject(new a("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(t)=>R({channel:p,v:_,type:"block-answer",id:l(d),payload:{text:t.trim().slice(0,Ye)}}),openSurface:(t)=>R({channel:p,v:_,type:"open-surface",id:l(d),payload:{surfaceId:t}}),writeClipboard:(t)=>R({channel:p,v:_,type:"clipboard-write",id:l(d),payload:{text:t}}),compose:(t)=>R({channel:p,v:_,type:"compose",id:l(d),payload:t}),attach:(t)=>R({channel:p,v:_,type:"attach",id:l(d),payload:Q(t)}),startSession:async(t)=>{if(t.projectId!==void 0)v(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")v(o.directory);else{if(o.name!==void 0)v(o.name,200);if(o.baseBranch!==void 0)v(o.baseBranch,200)}let n=await I({channel:p,v:_,type:"start-session",id:l(d),payload:nt(t)},e.requestTimeoutMs??180000);if(!Ze(n))throw new a("HOST_REJECTED","Host did not return a session.");return n},prompt:(t)=>I({channel:p,v:_,type:"prompt",id:l(d),payload:st(t)}).then((o)=>{if(!qe(o))throw new a("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>R({channel:p,v:_,type:"session-link",id:l(d),payload:Q(t)}),close:()=>R({channel:p,v:_,type:"close",id:l(d)}),oauthStart:()=>R({channel:p,v:_,type:"oauth-start",id:l(d)}),oauthDisconnect:()=>R({channel:p,v:_,type:"oauth-disconnect",id:l(d)}),request:(t)=>(Ce(t.path)?I({channel:p,v:_,type:"request",id:l(d),payload:t}):Oo()).then((o)=>{if(!ke(o))throw new a("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Ce(t.path)?I({channel:p,v:_,type:"service-request",id:l(d),payload:t}):Oo()).then((o)=>{if(!ke(o))throw new a("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>I({channel:p,v:_,type:"service-status",id:l(d)}).then((t)=>{if(!ct(t))throw new a("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(Y(t)?I({channel:p,v:_,type:"file-read",id:l(d),payload:{path:t}}):Me()).then((o)=>{if(!dt(o))throw new a("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!Y(t))return Me();if(o.length>be)return Promise.reject(new a("FILE_TOO_LARGE",`Content is over ${be} characters.`));return I({channel:p,v:_,type:"file-write",id:l(d),payload:{path:t,content:o}}).then((n)=>{if(!lt(n))throw new a("HOST_REJECTED","Host did not confirm the write.");return n})},listDir:(t)=>(Y(t)?I({channel:p,v:_,type:"file-list",id:l(d),payload:{path:t}}):Me()).then((o)=>{if(!pt(o))throw new a("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(Y(t)?I({channel:p,v:_,type:"file-stat",id:l(d),payload:{path:t}}):Me()).then((o)=>{if(!_t(o))throw new a("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),n=t.system?.trim();if(o.length===0||o.length>ge)return Promise.reject(new a("HOST_REJECTED",`Prompt must be 1 to ${ge} characters.`));if(n!==void 0&&(n.length===0||n.length>Ue))return Promise.reject(new a("HOST_REJECTED",`System prompt must be 1 to ${Ue} characters.`));let s=t.maxOutputTokens===void 0?void 0:Math.min(ot,Math.max(1,Math.floor(t.maxOutputTokens)));if(s!==void 0&&!Number.isFinite(s))return Promise.reject(new a("HOST_REJECTED","maxOutputTokens must be a number."));let S={prompt:o};if(n!==void 0)S.system=n;if(s!==void 0)S.maxOutputTokens=s;return I({channel:p,v:_,type:"generate",id:l(d),payload:S},e.requestTimeoutMs??rt).then((u)=>{if(!Et(u))throw new a("HOST_REJECTED","Host did not return generated text.");return u})},onLateGenerateResult:(t)=>{K.add(t);for(let o of Ge.splice(0))f([t],o);return kt(),()=>{K.delete(t)}},setBadge:(t)=>R({channel:p,v:_,type:"badge",id:l(d),payload:{count:it(t)}}),setHeight:(t)=>R({channel:p,v:_,type:"resize",id:l(d),payload:{height:at(t)}}),onFileOpen:(t)=>{if(Ee.add(t),!Ve)Ve=!0,r.addEventListener("keydown",yt,!0);if(ne)t(ne);return()=>{Ee.delete(t)}},onFileSnapshot:(t)=>(re=t,()=>{if(re===t)re=null}),onFileSaved:(t)=>(ue.add(t),()=>{ue.delete(t)}),reportFileChange:(t)=>Xe({...h,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Nt,reportFileUnsupported:()=>Xe({...h,type:"file-unsupported"}),dispose:()=>{for(let t of W.keys())M({...h,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:t}});W.clear();for(let t of z.keys())M({...h,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:t}});if(z.clear(),L=!0,te=null,oe=null,re=null,Ee.clear(),ue.clear(),Ve)r.removeEventListener("keydown",yt,!0);r.removeEventListener("message",Mt),r.removeEventListener("keydown",vt,!0),r.removeEventListener("pointerover",Te),r.removeEventListener("pointermove",Te),r.removeEventListener("pointerout",Lt),r.removeEventListener("focus",Pt),r.removeEventListener("blur",wt);for(let t of j.values())clearTimeout(t.timer),t.reject(new a("HOST_UNAVAILABLE","Host client was disposed."));j.clear(),E.clear(),g.clear(),V.clear(),y.clear(),X.clear(),H.clear(),ee.clear(),de.clear(),le.clear(),pe.clear(),_e.clear(),K.clear(),Ge.length=0}}};var Ao=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var mr=new Set(Ao);var Ro=["none","agent","user"];var Ir=new Set(Ro);var Go=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Vo=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],ho=(e,r)=>{r.style.colorScheme=e.mode;for(let[c,x]of Go)r.style.setProperty(c,e.tokens[x]);for(let[c,x,E]of Vo){let g=e.tokens[E]??"";r.style.setProperty(c,g),r.style.setProperty(x,g)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},Tt=(e,r)=>{if(ho(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var Xo={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},T=(e,r)=>`var(--${e}, var(--oc-${Xo[e]}, ${r}))`,D=T("surface-background","transparent"),ve=T("surface-elevated","transparent"),Z=T("surface-elevated-foreground","inherit"),N=T("surface-foreground","inherit"),O=T("surface-muted-foreground","gray"),Ho=T("surface-muted","transparent"),F=T("interactive-border","currentColor"),U=T("interactive-hover","transparent"),B=T("interactive-active","transparent"),ft=T("interactive-selection","transparent"),Ot=T("interactive-selection-foreground","inherit"),w=T("primary","currentColor"),At=T("primary-text","inherit"),Rt=T("error-text","inherit"),Fo=T("font-sans","inherit"),ht=T("font-mono","monospace"),bo=T("radius","9px"),mt=`calc(${bo} - 2px)`,mo=`calc(${bo} - 4px)`,A=(e,r,c="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${c})`,xo=`background-image: linear-gradient(${U}, ${U});`,xt=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,It="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Io="box-shadow: var(--oc-sdk-lit);",bt=`inset 0 0.5px 0 0 ${A(N,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,$o=`
:root {
  --oc-sdk-edge: ${A(N,16)};
  --oc-sdk-field-bg: ${ve};
  --oc-sdk-raised-bg: ${D};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${A(N,14)};
  --oc-sdk-field-bg: ${A(D,50,ve)};
  --oc-sdk-raised-bg: ${ve};
  --oc-sdk-field-lift: ${bt};
  --oc-sdk-raised-lift: ${bt};
  --oc-sdk-lit: ${bt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,ye=(e)=>{let r=T(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${T(`${e}-text`,"inherit")}; }`},Bo=`
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
`,go=`${$o}
.oc-sdk { color: ${N}; font-family: ${Fo}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${xo} }
.oc-sdk-mono { font-family: ${ht}; }
.oc-sdk-muted { color: ${O}; }
${ye("success")}${ye("warning")}${ye("error")}${ye("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${w}; --oc-sdk-tone-text: ${At}; }

.oc-sdk-btn { border-radius: ${mt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${mo}; }
.oc-sdk-btn[data-variant="default"] { color: ${At}; background: ${A(w,10,D)}; border-color: ${A(w,12)}; ${Io} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${A(w,16,D)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${A(w,22,D)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Ho}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${B}, ${B}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Z}; ${It} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${B}, ${B}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${U}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${B}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${T("status-error","red")}; color: ${Rt}; background: ${A("var(--oc-sdk-tone)",7,D)}; border-color: ${A("var(--oc-sdk-tone)",12)}; ${Io} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${A("var(--oc-sdk-tone)",9,D)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${A("var(--oc-sdk-tone)",11,D)}; box-shadow: none; }

.oc-sdk-field-note { color: ${O}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Rt}; }
.oc-sdk-input { border-radius: ${mt}; background: var(--oc-sdk-field-bg); color: ${Z}; ${xt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${O}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${xt(A(N,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${xt(T("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${ht}; }

.oc-sdk-search-icon { color: ${O}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${w}; }
.oc-sdk-search-clear { border-radius: ${mo}; color: ${O}; }
.oc-sdk-search-clear:hover { background: ${U}; color: ${N}; }

.oc-sdk-trigger { border-radius: ${mt}; background: var(--oc-sdk-raised-bg); color: ${Z}; ${It} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${B}, ${B}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${O}; }
.oc-sdk-trigger-chevron { color: ${O}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Z}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${ve}; background-clip: padding-box; color: ${Z}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${U}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${ft}; color: ${Ot}; }
.oc-sdk-option-check { color: ${N}; }
.oc-sdk-option[data-destructive="true"] { color: ${Rt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${A(T("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${O}; }
.oc-sdk-popup-empty { color: ${O}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${F}; border-radius: 4px; color: ${N}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${A(N,60,F)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${F}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${D}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${w}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${xo} }
.oc-sdk-check-desc { color: ${O}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${A(N,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${O}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${N}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Ot}; background: ${ft}; border-color: ${F}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Z}; background: var(--oc-sdk-raised-bg); ${It} }
.oc-sdk-tab-count { color: ${O}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${A(N,6)}; color: ${O}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${A("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${U}; }
.oc-sdk-row[aria-selected="true"] { background: ${ft}; color: ${Ot}; }
.oc-sdk-row-lead { font-family: ${ht}; color: ${O}; }
.oc-sdk-row-sub { color: ${O}; }
.oc-sdk-row-meta { color: ${O}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${O}; }

.oc-sdk-empty-body { color: ${O}; }

.oc-sdk-spinner { color: ${O}; }
.oc-sdk-spinner-ring { border-color: ${F}; border-top-color: ${w}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${A("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${O}; }

.oc-sdk-separator { color: ${O}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${A(F,40)}; }

.oc-sdk-progress-label { color: ${O}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${A(N,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${w}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${T("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${T("success-text","inherit")}; }

.oc-sdk-text a { color: ${At}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${A(F,60)}; }
`,b=`
${$e}
${Bo}
${go}`;var Jo=St(),Uo=document.getElementById("app");Jo.onReady((e)=>{if(Tt(e,document.documentElement),Uo)Uo.textContent="Profiles — scaffold"});})();
