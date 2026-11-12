(()=>{var k="openchamber.sdk",U=1;var to=`
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
`;function oo(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let t=new WeakMap;e.addEventListener("scroll",(n)=>{let s=n.target===e?o:n.target;if(!(s instanceof Element))return;if(!s.hasAttribute("data-oc-scrolling"))s.setAttribute("data-oc-scrolling","");let a=t.get(s);if(a!==void 0)clearTimeout(a);t.set(s,setTimeout(()=>{t.delete(s),s.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Rn=`(${oo.toString()})(document);`;var ro=128,no=65536;var xt=128;var Ot=65536;var nr=/^[a-z][a-z0-9-]{0,39}$/;var tr=(e)=>Object(e)===e&&!Array.isArray(e),so=(e,o)=>Object.keys(e).every((t)=>o.includes(t)),or=(e)=>String(e)===e&&e.length>=1&&e.length<=60,rr=(e)=>String(e)===e&&e.length>=1&&e.length<=80,sr=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let t of e){if(!tr(t)||!nr.test(t.id)||!or(t.label))return!1;if(t.disabled!==void 0&&t.disabled!==!0&&t.disabled!==!1)return!1;if(o.has(t.id))return!1;if(o.add(t.id),t.kind==="button"){if(!so(t,["kind","id","label","disabled"]))return!1;continue}if(t.kind!=="select"||!so(t,["kind","id","label","value","options","disabled"]))return!1;if(!rr(t.value)||!Array.isArray(t.options)||t.options.length<1||t.options.length>16)return!1;let n=new Set;for(let s of t.options){if(!tr(s)||!so(s,["value","label"])||!rr(s.value)||!or(s.label)||n.has(s.value))return!1;n.add(s.value)}if(!n.has(t.value))return!1}return!0};var ir=["{id}","{segment}","{segments+}"];var Ts=new Set(ir);var ar=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var gs=new Set(ar);var At=20000000,Rt=256;var io=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,cr=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let t=0;t<e.bytes.byteLength;t+=1)if(e.bytes[t]!==o.bytes[t])return!1;return!0};var lr=/^[A-Za-z0-9_-]{1,80}$/;var dr=["left","right","top","bottom"];var pr=(e,o=0,t={remaining:16000})=>{if(--t.remaining<0||o>=32)return!1;if(e===null)return!0;let n=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let s of n)if(!pr(s,o+1,t))return!1;return!0},ao=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(ao);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(ao)}return String(e)===e||Number.isFinite(e)},co=(e)=>{try{if(String(e.id)!==e.id||!lr.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!dr.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!pr(e.data)||!ao(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var po=2000;var fr=["file","directory","other","missing"],uo=(e)=>Boolean(e&&"sessionId"in e),fo=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Er=/^[0-9a-f]{7,64}$/i,Eo=(e)=>Er.test(e),bt=500,vt=32000,_r=16000,Sr=128,mr=200,Tr=2000,hr=16000,gr=80,xr=200,Or=16000;var Ar=2000;var _o=20000,yt=1024,Ct=2000000;var It=64000,kt=8000,So=4000;var mo=960000;var Rr=999,br=1e4,ct=500,vr=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],yr=["stopped","starting","ready","failed"],vn=new Set(vr),Cr=(e)=>vn.has(e),Ir=(e)=>e&&Cr(e)?e:"HOST_REJECTED",qe=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(qe);if(Object(e)===e)return Object.values(e).every(qe);return!1},kr=(e)=>qe(e)&&JSON.stringify(e).length<=Or,ur=(e)=>e?.trim().slice(0,xr)??"",et=(e)=>{let o=e.id.trim().slice(0,Sr),t=e.title.trim().slice(0,mr),n=e.url.trim().slice(0,Tr),s=e.text?.trim().slice(0,hr),a=e.author?.trim().slice(0,gr),c=e.kind==="pull"?"pull":"issue",d={providerId:e.providerId.trim(),id:o,title:t||o,url:n,kind:c};if(s)d.text=s;if(a)d.author=a;if(c==="pull"){let u=ur(e.branches?.head),S=ur(e.branches?.base);if(u&&S)d.branches={head:u,base:S}}if(kr(e.data))d.data=e.data;return d},To=(e)=>{let o=et(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},ho=(e)=>{let o={text:e.text.trim().slice(0,_r)};if(e.send)o.send=!0;return o},go=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Rr,Math.max(0,Math.round(e)))},xo=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(br,Math.max(0,Math.ceil(e)))};var tt=(e)=>e.length>0&&e.length<=yt&&!e.includes("\x00")&&!e.includes("\\");var Ut=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Ar)return!1;return!e.split("/").some((t)=>t==="."||t==="..")},yn=new Set(yr),Oo=(e)=>Boolean(e&&"status"in e&&yn.has(String(e.status))&&!("body"in e)),Nt=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Ao=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Ro=(e)=>Boolean(e&&"written"in e&&e.written===!0),bo=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Cn=new Set(fr),vo=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Cn.has(String(e.kind))&&Number.isFinite(e.size)),yo=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),In=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),kn=(e)=>Object(e)===e?e:null,lo=(e)=>String(e)===e&&e.length>0,Un=(e)=>{if(!lo(e.id))return null;if(e.ok===!0){let o={channel:k,v:U,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&lo(e.error))return{channel:k,v:U,type:"result",id:e.id,ok:!1,error:e.error,code:Ir(lo(e.code)?e.code:void 0)};return null},Co=(e)=>{let o=kn(e);if(!o||o.channel!==k||o.v!==U)return null;if(o.type==="result")return Un(o);if(!In.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Ur=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Nn=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class b extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Nr=()=>Promise.reject(new b("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),wt=()=>Promise.reject(new b("BAD_PATH",`File path must be 1 to ${yt} characters without NUL or backslash.`)),Mt=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new b("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},y=(e)=>(e.value+=1,`oc-${e.value}`),Io=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new b("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let t=e.acceptSource??((r)=>r===o.parent),n=e.requestTimeoutMs??_o,s=new Set,a=new Set,c=new Set,d=new Set,u=new Set,S=new Set,_=new Set,T=new Set,A=new Set,h=new Set,C=new Set,I=new Set,N=[],M=null,Y=null,K=new Set,re=new Set,se=null,ne=null,m=!1,f=new Map,g=new Map,z=new Map,j=!1,p={value:0},l=null,le=null,pe=!1,ue=!1,X=null,ae=(r)=>{if(!r)return null;return{sessionId:r.id,phase:r.busy?"started":"completed"}},D=(r)=>{o.parent.postMessage(r,"*")},Se=()=>{if(j||o.parent===o||I.size===0||l?.features?.lateGenerateResults!==!0)return;D({channel:k,v:U,type:"generate-late-listen"})},G=(r,i)=>{for(let x of r)try{x(i)}catch(O){console.error(O)}},me=(r)=>{if(!(r instanceof MessageEvent))return;if(!t(r.source))return;let i=Co(r.data);if(!i)return;if(i.type==="workspace"){let O=g.get(i.payload.subscriptionId);if(O)G([O],i.payload.snapshot);return}if(i.type==="shells"){let O=z.get(i.payload.subscriptionId);if(O)G([O],i.payload.snapshot);return}if(i.type==="ready"){if(l=i.payload,le=ae(i.payload.session),G(s,i.payload),G(a,i.payload.directory),G(c,i.payload.session),le)G(d,le);if(G(u,i.payload.connection),G(S,i.payload.settings),G(_,i.payload.item),i.payload.block)G(T,i.payload.block);Se();return}if(i.type==="service-event"){G(A,i.payload);return}if(i.type==="generate-late"){if(I.size===0)N.push(i.payload);else G(I,i.payload);return}if(i.type==="directory"){if(l)l={...l,directory:i.payload.directory};G(a,i.payload.directory);return}if(i.type==="session"){if(l)l={...l,session:i.payload.session};if(!i.payload.session)le=null;else if(le?.sessionId!==i.payload.session.id)le=ae(i.payload.session);G(c,i.payload.session);return}if(i.type==="session-lifecycle"){le=i.payload,G(d,i.payload);return}if(i.type==="connection"){if(l)l={...l,connection:i.payload.connection};G(u,i.payload.connection);return}if(i.type==="settings"){if(l)l={...l,settings:i.payload.settings};G(S,i.payload.settings);return}if(i.type==="item"){if(l)l={...l,item:i.payload.item};G(_,i.payload.item);return}if(i.type==="status-control-event"){G(h,i.payload);return}if(i.type==="popover-closed"){G(C,i.payload);return}if(i.type==="action"){let O=(L)=>{if(!j)D({channel:k,v:U,type:"action-result",id:i.id,payload:L})},H=Y;if(!H){O({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>H(i.payload)).then(()=>O({ok:!0}),(L)=>{let W=(L instanceof Error?L.message:String(L)).trim();O({ok:!1,error:(W||"Action failed.").slice(0,ct)})});return}if(i.type==="file-open"){let O=i.payload;if(ne&&cr(ne,O))return;ne=O,G(K,i.payload);return}if(i.type==="file-saved"){G(re,i.payload.version);return}if(i.type==="file-snapshot"){let O=(W)=>{if(!j)D({channel:k,v:U,type:"file-snapshot-result",id:i.id,payload:W})},H=(W)=>O({error:(W.trim()||"Could not read the edited file.").slice(0,ct)}),L=se;if(!L){H("This extension does not edit files.");return}Promise.resolve().then(()=>L(i.payload.purpose)).then((W)=>{if(io(W)>At){H(`The file is over ${At} ${"bytes"in W?"bytes":"characters"}.`);return}if(W.version.length>Rt){H(`The snapshot version is over ${Rt} characters.`);return}O({snapshot:"bytes"in W?{bytes:W.bytes,version:W.version}:{content:W.content,version:W.version}})},(W)=>H(W instanceof Error?W.message:String(W)));return}if(i.type==="resolve"){let O=(L)=>{D({channel:k,v:U,type:"resolve-result",id:i.id,payload:L})},H=M;if(!H){O({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>H(i.payload)).then((L)=>O({item:L?et(L):null}),(L)=>{let W=(L instanceof Error?L.message:String(L)).trim();O({error:(W||"Command failed.").slice(0,ct)})});return}let x=f.get(i.id);if(!x)return;if(clearTimeout(x.timer),f.delete(i.id),i.ok){x.resolve(i.payload);return}x.reject(new b(i.code,i.error))};o.addEventListener("message",me),D({channel:k,v:U,type:"hello"});let Z=(r,i=n)=>{if(j||o.parent===o)return Promise.reject(new b("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((x,O)=>{let H=setTimeout(()=>{f.delete(r.id),O(new b("HOST_TIMEOUT","Host did not answer in time."))},i);f.set(r.id,{resolve:x,reject:O,timer:H}),D(r)})},w=(r)=>Z(r).then(()=>{return}),P={channel:k,v:U},xe=(r)=>{if(!j&&o.parent!==o)D(r)},$e=()=>xe({...P,type:"file-save"}),nt=(r)=>{if(!Ur(r)||!Nn(r))return;r.preventDefault(),$e()},dt=(r)=>{if(!Ur(r)||r.key!=="Escape"||l?.surface!=="popover"||!l.popover)return;r.preventDefault(),je(l.popover.id,"escape").catch(()=>{return})},Ae=()=>{let r=l?.surface==="popover"?l.popover:void 0;if(!r)return;let i=pe||ue;if(X===i)return;X=i,st(r.id,i).catch(()=>{return})},Ne=()=>{if(l?.surface!=="popover"||pe)return;pe=!0,Ae()},pt=(r)=>{if(l?.surface!=="popover"||r.relatedTarget!==null||!pe)return;pe=!1,Ae()},fe=()=>{if(l?.surface!=="popover"||ue)return;ue=!0,Ae()},we=()=>{if(l?.surface!=="popover"||!ue)return;ue=!1,Ae()},ie=(r,i=1024)=>{if(!r.trim()||r.length>i)throw new b("HOST_REJECTED",`Identity must contain 1 to ${i} characters.`)},Me=async(r)=>{if(r.kind!=="projects")ie(r.projectId);let i=await Z({...P,type:"workspace-read",id:y(p),payload:r});if(!i||!("kind"in i)||!("state"in i)||i.kind!==r.kind)throw new b("HOST_REJECTED","Host did not return workspace data.");return i},Re=async(r,i)=>{if(r.kind!=="projects")ie(r.projectId);let x=y(p);g.set(x,i);try{await w({...P,type:"workspace-subscribe",id:y(p),payload:{subscriptionId:x,query:r}})}catch(O){if(g.delete(x),!j)D({...P,type:"workspace-unsubscribe",id:y(p),payload:{subscriptionId:x}});throw O}return()=>{if(!g.delete(x)||j)return;D({...P,type:"workspace-unsubscribe",id:y(p),payload:{subscriptionId:x}})}},be=async(r,i)=>{if(r.kind==="session")ie(r.sessionId);if(r.kind==="project")ie(r.projectId);let x=y(p);z.set(x,i);try{await w({...P,type:"shells-subscribe",id:y(p),payload:{subscriptionId:x,scope:r}})}catch(O){if(z.delete(x),!j)D({...P,type:"shells-unsubscribe",id:y(p),payload:{subscriptionId:x}});throw O}return()=>{if(!z.delete(x)||j)return;D({...P,type:"shells-unsubscribe",id:y(p),payload:{subscriptionId:x}})}},ce=async(r)=>{if("key"in r&&(r.key.length===0||r.key.length>ro))throw new b("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(r.op==="set"&&!qe(r.value))throw new b("HOST_REJECTED","Storage values must be JSON.");if(r.op==="set"&&new TextEncoder().encode(JSON.stringify(r.value)).length>no)throw new b("HOST_REJECTED","Storage value exceeds 64 KiB.");if(r.scope==="device"&&l?.features?.deviceStorage!==!0)throw new b("UNSUPPORTED","This host does not support device storage.");let i=await Z({...P,type:"storage",id:y(p),payload:r});if(!i||!("storage"in i)||i.op!==r.op)throw new b("HOST_REJECTED","Host did not return storage data.");return i},je=(r,i)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===r)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):w({...P,type:"popover-close",id:y(p),payload:i?{id:r,reason:i}:{id:r}}),st=(r,i)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===r)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):w({...P,type:"popover-anchor",id:y(p),payload:{id:r,active:i}});return o.addEventListener("keydown",dt,!0),o.addEventListener("pointerover",Ne),o.addEventListener("pointermove",Ne),o.addEventListener("pointerout",pt),o.addEventListener("focus",fe),o.addEventListener("blur",we),{onAction:(r)=>(Y=r,()=>{if(Y===r)Y=null}),listProjects:async()=>{let r=await Me({kind:"projects"});if(r.kind!=="projects")throw new b("HOST_REJECTED","Expected projects.");return r},listWorktrees:async(r)=>{let i=await Me({kind:"worktrees",projectId:r});if(i.kind!=="worktrees")throw new b("HOST_REJECTED","Expected worktrees.");return i},listSessions:async(r)=>{let i=await Me({kind:"sessions",projectId:r});if(i.kind!=="sessions")throw new b("HOST_REJECTED","Expected sessions.");return i},onProjects:(r)=>Re({kind:"projects"},(i)=>{if(i.kind==="projects")r(i)}),onWorktrees:(r,i)=>Re({kind:"worktrees",projectId:r},(x)=>{if(x.kind==="worktrees")i(x)}),onSessions:(r,i)=>Re({kind:"sessions",projectId:r},(x)=>{if(x.kind==="sessions")i(x)}),onRunningShells:(r,i)=>be(r,i),readShellOutput:async(r,i)=>{ie(r,xt);let x=i?.cursor;if(x!==void 0&&(!Number.isInteger(x)||x<0))throw new b("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let O=i?.tailBytes;if(O!==void 0&&(!Number.isInteger(O)||O<1||O>Ot))throw new b("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ot}.`);let L=await Z({...P,type:"shell-output",id:y(p),payload:{shellId:r,cursor:x,tailBytes:O}});if(!L||typeof L.output!=="string"||!Number.isFinite(L.cursor))throw new b("HOST_REJECTED","Host did not return shell output.");return L},stopShell:async(r)=>{if(ie(r,xt),(await Z({...P,type:"shell-stop",id:y(p),payload:{shellId:r}}))?.stopped!==!0)throw new b("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(r)=>{ie(r),await w({...P,type:"open-session",id:y(p),payload:{sessionId:r}})},storage:{get:async(r,i)=>{let x=Mt(i),O={op:"get",key:r};if(x)O.scope=x;let H=await ce(O);return H.op==="get"&&H.found?H.value:void 0},set:async(r,i,x)=>{let O=Mt(x),H={op:"set",key:r,value:i};if(O)H.scope=O;await ce(H)},delete:async(r,i)=>{let x=Mt(i),O={op:"delete",key:r};if(x)O.scope=x;await ce(O)},keys:async(r)=>{let i=Mt(r),x={op:"keys"};if(i)x.scope=i;let O=await ce(x);if(O.op!=="keys")throw new b("HOST_REJECTED","Expected storage keys.");return O.keys}},onReady:(r)=>{if(s.add(r),l)r(l);return()=>{s.delete(r)}},onDirectory:(r)=>{if(a.add(r),l)r(l.directory);return()=>{a.delete(r)}},onSession:(r)=>{if(c.add(r),l)r(l.session);return()=>{c.delete(r)}},onSessionLifecycle:(r)=>{if(d.add(r),le)r(le);return()=>{d.delete(r)}},onConnection:(r)=>{if(u.add(r),l)r(l.connection);return()=>{u.delete(r)}},onSettings:(r)=>{if(S.add(r),l)r(l.settings);return()=>{S.delete(r)}},onItem:(r)=>{if(_.add(r),l)r(l.item);return()=>{_.delete(r)}},onBlock:(r)=>{if(T.add(r),l?.block)r(l.block);return()=>{T.delete(r)}},onServiceEvent:(r)=>(A.add(r),()=>{A.delete(r)}),onStatusControl:(r)=>(h.add(r),()=>{h.delete(r)}),onPopoverClosed:(r)=>(C.add(r),()=>{C.delete(r)}),setStatusControls:(r)=>{if(l?.features?.statusControls!==!0)return Promise.reject(new b("UNSUPPORTED","This host does not support status controls."));if(!sr(r))return Promise.reject(new b("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return w({...P,type:"status-controls",id:y(p),payload:{controls:r}})},openPopover:(r)=>{if(l?.features?.popovers!==!0)return Promise.reject(new b("UNSUPPORTED","This host does not support popovers."));if(!co(r))return Promise.reject(new b("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return w({...P,type:"popover-open",id:y(p),payload:r})},closePopover:je,setPopoverAnchorActive:st,onResolve:(r)=>(M=r,()=>{if(M===r)M=null}),toast:(r)=>{let i=r.message.trim();if(!i||i.length>bt)return Promise.reject(new b("HOST_REJECTED",`Toast message must contain 1 to ${bt} characters.`));if(r.copy&&r.copy!==!0&&(!r.copy.text.length||r.copy.text.length>vt))return Promise.reject(new b("HOST_REJECTED",`Toast copy text must contain 1 to ${vt} characters.`));return w({channel:k,v:U,type:"toast",id:y(p),payload:{...r,message:i}})},openUrl:(r)=>w({channel:k,v:U,type:"open-url",id:y(p),payload:{url:r}}),openCommit:(r)=>Eo(r)?w({channel:k,v:U,type:"open-commit",id:y(p),payload:{sha:r}}):Promise.reject(new b("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(r)=>w({channel:k,v:U,type:"block-answer",id:y(p),payload:{text:r.trim().slice(0,po)}}),openSurface:(r)=>w({channel:k,v:U,type:"open-surface",id:y(p),payload:{surfaceId:r}}),writeClipboard:(r)=>w({channel:k,v:U,type:"clipboard-write",id:y(p),payload:{text:r}}),compose:(r)=>w({channel:k,v:U,type:"compose",id:y(p),payload:r}),attach:(r)=>w({channel:k,v:U,type:"attach",id:y(p),payload:et(r)}),startSession:async(r)=>{if(r.projectId!==void 0)ie(r.projectId);let i=r.worktree;if(i&&i!==!0)if(i.kind==="existing")ie(i.directory);else{if(i.name!==void 0)ie(i.name,200);if(i.baseBranch!==void 0)ie(i.baseBranch,200)}let x=await Z({channel:k,v:U,type:"start-session",id:y(p),payload:To(r)},e.requestTimeoutMs??180000);if(!uo(x))throw new b("HOST_REJECTED","Host did not return a session.");return x},prompt:(r)=>Z({channel:k,v:U,type:"prompt",id:y(p),payload:ho(r)}).then((i)=>{if(!fo(i))throw new b("HOST_REJECTED","Host did not return a prompt result.");return i}),sessionLink:(r)=>w({channel:k,v:U,type:"session-link",id:y(p),payload:et(r)}),close:()=>w({channel:k,v:U,type:"close",id:y(p)}),oauthStart:()=>w({channel:k,v:U,type:"oauth-start",id:y(p)}),oauthDisconnect:()=>w({channel:k,v:U,type:"oauth-disconnect",id:y(p)}),request:(r)=>(Ut(r.path)?Z({channel:k,v:U,type:"request",id:y(p),payload:r}):Nr()).then((i)=>{if(!Nt(i))throw new b("HOST_REJECTED","Host request result was empty.");return i}),serviceRequest:(r)=>(Ut(r.path)?Z({channel:k,v:U,type:"service-request",id:y(p),payload:r}):Nr()).then((i)=>{if(!Nt(i))throw new b("HOST_REJECTED","Host service request result was empty.");return i}),serviceStatus:()=>Z({channel:k,v:U,type:"service-status",id:y(p)}).then((r)=>{if(!Oo(r))throw new b("HOST_REJECTED","Host did not return service status.");return r}),readFile:(r)=>(tt(r)?Z({channel:k,v:U,type:"file-read",id:y(p),payload:{path:r}}):wt()).then((i)=>{if(!Ao(i))throw new b("HOST_REJECTED","Host did not return file content.");return i}),writeFile:(r,i)=>{if(!tt(r))return wt();if(i.length>Ct)return Promise.reject(new b("FILE_TOO_LARGE",`Content is over ${Ct} characters.`));return Z({channel:k,v:U,type:"file-write",id:y(p),payload:{path:r,content:i}}).then((x)=>{if(!Ro(x))throw new b("HOST_REJECTED","Host did not confirm the write.");return x})},listDir:(r)=>(tt(r)?Z({channel:k,v:U,type:"file-list",id:y(p),payload:{path:r}}):wt()).then((i)=>{if(!bo(i))throw new b("HOST_REJECTED","Host did not return directory entries.");return i}),stat:(r)=>(tt(r)?Z({channel:k,v:U,type:"file-stat",id:y(p),payload:{path:r}}):wt()).then((i)=>{if(!vo(i))throw new b("HOST_REJECTED","Host did not return file status.");return i}),generate:(r)=>{let i=r.prompt.trim(),x=r.system?.trim();if(i.length===0||i.length>It)return Promise.reject(new b("HOST_REJECTED",`Prompt must be 1 to ${It} characters.`));if(x!==void 0&&(x.length===0||x.length>kt))return Promise.reject(new b("HOST_REJECTED",`System prompt must be 1 to ${kt} characters.`));let O=r.maxOutputTokens===void 0?void 0:Math.min(So,Math.max(1,Math.floor(r.maxOutputTokens)));if(O!==void 0&&!Number.isFinite(O))return Promise.reject(new b("HOST_REJECTED","maxOutputTokens must be a number."));let H={prompt:i};if(x!==void 0)H.system=x;if(O!==void 0)H.maxOutputTokens=O;return Z({channel:k,v:U,type:"generate",id:y(p),payload:H},e.requestTimeoutMs??mo).then((L)=>{if(!yo(L))throw new b("HOST_REJECTED","Host did not return generated text.");return L})},onLateGenerateResult:(r)=>{I.add(r);for(let i of N.splice(0))G([r],i);return Se(),()=>{I.delete(r)}},setBadge:(r)=>w({channel:k,v:U,type:"badge",id:y(p),payload:{count:go(r)}}),setHeight:(r)=>w({channel:k,v:U,type:"resize",id:y(p),payload:{height:xo(r)}}),onFileOpen:(r)=>{if(K.add(r),!m)m=!0,o.addEventListener("keydown",nt,!0);if(ne)r(ne);return()=>{K.delete(r)}},onFileSnapshot:(r)=>(se=r,()=>{if(se===r)se=null}),onFileSaved:(r)=>(re.add(r),()=>{re.delete(r)}),reportFileChange:(r)=>xe({...P,type:"file-change",payload:{dirty:r.dirty,edited:r.edited}}),requestFileSave:$e,reportFileUnsupported:()=>xe({...P,type:"file-unsupported"}),dispose:()=>{for(let r of g.keys())D({...P,type:"workspace-unsubscribe",id:y(p),payload:{subscriptionId:r}});g.clear();for(let r of z.keys())D({...P,type:"shells-unsubscribe",id:y(p),payload:{subscriptionId:r}});if(z.clear(),j=!0,M=null,Y=null,se=null,K.clear(),re.clear(),m)o.removeEventListener("keydown",nt,!0);o.removeEventListener("message",me),o.removeEventListener("keydown",dt,!0),o.removeEventListener("pointerover",Ne),o.removeEventListener("pointermove",Ne),o.removeEventListener("pointerout",pt),o.removeEventListener("focus",fe),o.removeEventListener("blur",we);for(let r of f.values())clearTimeout(r.timer),r.reject(new b("HOST_UNAVAILABLE","Host client was disposed."));f.clear(),s.clear(),a.clear(),c.clear(),d.clear(),u.clear(),S.clear(),_.clear(),T.clear(),A.clear(),h.clear(),C.clear(),I.clear(),N.length=0}}};var wr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Ps=new Set(wr);var Mr=["none","agent","user"];var Ds=new Set(Mr);var wn=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Mn=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Pr=(e,o)=>{o.style.colorScheme=e.mode;for(let[t,n]of wn)o.style.setProperty(t,e.tokens[n]);for(let[t,n,s]of Mn){let a=e.tokens[s]??"";o.style.setProperty(t,a),o.style.setProperty(n,a)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},ko=(e,o)=>{if(Pr(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};var Pn={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},J=(e,o)=>`var(--${e}, var(--oc-${Pn[e]}, ${o}))`,Ie=J("surface-background","transparent"),Lt=J("surface-elevated","transparent"),ot=J("surface-elevated-foreground","inherit"),Ee=J("surface-foreground","inherit"),q=J("surface-muted-foreground","gray"),Ln=J("surface-muted","transparent"),We=J("interactive-border","currentColor"),de=J("interactive-hover","transparent"),Je=J("interactive-active","transparent"),Uo=J("interactive-selection","transparent"),No=J("interactive-selection-foreground","inherit"),Ce=J("primary","currentColor"),wo=J("primary-text","inherit"),Mo=J("error-text","inherit"),Dn=J("font-sans","inherit"),Po=J("font-mono","monospace"),Hr=J("radius","9px"),Lo=`calc(${Hr} - 2px)`,Lr=`calc(${Hr} - 4px)`,ee=(e,o,t="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${t})`,Dr=`background-image: linear-gradient(${de}, ${de});`,Do=(e,o="0.5px")=>`box-shadow: inset 0 0 0 ${o} ${e}, var(--oc-sdk-field-lift);`,Go="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Gr="box-shadow: var(--oc-sdk-lit);",Ho=`inset 0 0.5px 0 0 ${ee(Ee,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Gn=`
:root {
  --oc-sdk-edge: ${ee(Ee,16)};
  --oc-sdk-field-bg: ${Lt};
  --oc-sdk-raised-bg: ${Ie};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${ee(Ee,14)};
  --oc-sdk-field-bg: ${ee(Ie,50,Lt)};
  --oc-sdk-raised-bg: ${Lt};
  --oc-sdk-field-lift: ${Ho};
  --oc-sdk-raised-lift: ${Ho};
  --oc-sdk-lit: ${Ho};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Pt=(e)=>{let o=J(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${J(`${e}-text`,"inherit")}; }`},Hn=`
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
`,Vr=`${Gn}
.oc-sdk { color: ${Ee}; font-family: ${Dn}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Dr} }
.oc-sdk-mono { font-family: ${Po}; }
.oc-sdk-muted { color: ${q}; }
${Pt("success")}${Pt("warning")}${Pt("error")}${Pt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Ce}; --oc-sdk-tone-text: ${wo}; }

.oc-sdk-btn { border-radius: ${Lo}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Lr}; }
.oc-sdk-btn[data-variant="default"] { color: ${wo}; background: ${ee(Ce,10,Ie)}; border-color: ${ee(Ce,12)}; ${Gr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${ee(Ce,16,Ie)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${ee(Ce,22,Ie)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Ln}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Je}, ${Je}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${ot}; ${Go} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Je}, ${Je}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${de}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Je}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${J("status-error","red")}; color: ${Mo}; background: ${ee("var(--oc-sdk-tone)",7,Ie)}; border-color: ${ee("var(--oc-sdk-tone)",12)}; ${Gr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${ee("var(--oc-sdk-tone)",9,Ie)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${ee("var(--oc-sdk-tone)",11,Ie)}; box-shadow: none; }

.oc-sdk-field-note { color: ${q}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Mo}; }
.oc-sdk-input { border-radius: ${Lo}; background: var(--oc-sdk-field-bg); color: ${ot}; ${Do("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${q}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Do(ee(Ee,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Do(J("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Po}; }

.oc-sdk-search-icon { color: ${q}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Ce}; }
.oc-sdk-search-clear { border-radius: ${Lr}; color: ${q}; }
.oc-sdk-search-clear:hover { background: ${de}; color: ${Ee}; }

.oc-sdk-trigger { border-radius: ${Lo}; background: var(--oc-sdk-raised-bg); color: ${ot}; ${Go} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Je}, ${Je}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${q}; }
.oc-sdk-trigger-chevron { color: ${q}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${ot}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Lt}; background-clip: padding-box; color: ${ot}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${de}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Uo}; color: ${No}; }
.oc-sdk-option-check { color: ${Ee}; }
.oc-sdk-option[data-destructive="true"] { color: ${Mo}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${ee(J("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${q}; }
.oc-sdk-popup-empty { color: ${q}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${We}; border-radius: 4px; color: ${Ee}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${ee(Ee,60,We)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${We}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${Ie}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Ce}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Dr} }
.oc-sdk-check-desc { color: ${q}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${ee(Ee,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${q}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Ee}; }
.oc-sdk-tab[aria-selected="true"] { color: ${No}; background: ${Uo}; border-color: ${We}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${ot}; background: var(--oc-sdk-raised-bg); ${Go} }
.oc-sdk-tab-count { color: ${q}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${ee(Ee,6)}; color: ${q}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${ee("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${de}; }
.oc-sdk-row[aria-selected="true"] { background: ${Uo}; color: ${No}; }
.oc-sdk-row-lead { font-family: ${Po}; color: ${q}; }
.oc-sdk-row-sub { color: ${q}; }
.oc-sdk-row-meta { color: ${q}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${q}; }

.oc-sdk-empty-body { color: ${q}; }

.oc-sdk-spinner { color: ${q}; }
.oc-sdk-spinner-ring { border-color: ${We}; border-top-color: ${Ce}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${ee("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${q}; }

.oc-sdk-separator { color: ${q}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${ee(We,40)}; }

.oc-sdk-progress-label { color: ${q}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${ee(Ee,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Ce}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${J("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${J("success-text","inherit")}; }

.oc-sdk-text a { color: ${wo}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${ee(We,60)}; }
`,F=`
${to}
${Hn}
${Vr}`;var Xr="oc-sdk-ui-style",Xe=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},B=(e)=>{let o=document.getElementById(Xr);if(o instanceof HTMLStyleElement){if(o.textContent!==e)o.textContent=e;return}oo(document);let t=document.createElement("style");t.id=Xr,t.textContent=e,document.head.appendChild(t)},R=(e,o)=>{let t=document.createElement(e);if(o)t.className=o;return t},_e=(e)=>{let o=R("button",e);return o.type="button",o},te=(e,o)=>{let t=o??"";if(e.textContent!==t)e.textContent=t},Te=(e,o,t)=>{if(t===void 0||t===null||t==="")e.removeAttribute(o);else if(e.getAttribute(o)!==t)e.setAttribute(o,t)},Fr=(e,o)=>{let t=(n)=>{if(n.target instanceof Node&&e.contains(n.target))return;o()};return document.addEventListener("pointerdown",t,!0),()=>{document.removeEventListener("pointerdown",t,!0)}};var Vn=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Q=(e,o)=>{B(F);let t=o,n=_e("oc-sdk oc-sdk-btn"),s=Vn(),a=document.createElement("span");n.append(a),e.append(n);let c=()=>{if(n.dataset.variant=t.variant??"default",n.dataset.size=t.size??"default",n.disabled=Boolean(t.disabled)||Boolean(t.loading),n.dataset.loading=t.loading?"true":"false",n.setAttribute("aria-busy",t.loading?"true":"false"),t.loading&&s.parentNode!==n)n.prepend(s);else if(!t.loading&&s.parentNode===n)s.remove();te(a,t.label)},d=()=>{if(t.disabled||t.loading)return;t.onClick()};return n.addEventListener("click",d),c(),{update:(u)=>{t={...t,...u},c()},dispose:()=>{n.removeEventListener("click",d),n.remove()}}};var Dt=(e,o)=>{B(F);let t=o,n=R("label","oc-sdk oc-sdk-field"),s=R("span","oc-sdk-field-label"),a=t.multiline?R("textarea","oc-sdk-input"):R("input","oc-sdk-input"),c=R("span","oc-sdk-field-note");n.append(s,a,c),e.append(n);let d=()=>{if(te(s,t.label),s.hidden=!t.label,a instanceof HTMLInputElement)a.type=t.password?"password":"text";else a.rows=t.rows??3;if(a.value!==t.value)a.value=t.value;a.disabled=Boolean(t.disabled),Te(a,"placeholder",t.placeholder),a.dataset.mono=t.mono?"true":"false";let S=Boolean(t.error);n.dataset.invalid=S?"true":"false",a.setAttribute("aria-invalid",S?"true":"false");let _=t.error??t.helper??"";te(c,_),c.hidden=_===""},u=()=>{t.onChange(a.value)};return a.addEventListener("input",u),d(),{update:(S)=>{t={...t,...S},d()},dispose:()=>{a.removeEventListener("input",u),n.remove()}}};var Xn={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},ke=(e,o,t)=>{let n=document.createElementNS("http://www.w3.org/2000/svg","svg");if(n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("width",String(o)),n.setAttribute("height",String(o)),n.setAttribute("aria-hidden","true"),n.setAttribute("fill","currentColor"),t)n.setAttribute("class",t);let s=document.createElementNS("http://www.w3.org/2000/svg","path");return s.setAttribute("d",Xn[e]),n.append(s),n};var Vo=(e,o)=>{B(F);let t=o,n=R("div","oc-sdk oc-sdk-search"),s=R("input","oc-sdk-input");s.type="text",s.spellcheck=!1,s.autocomplete="off",s.setAttribute("role","searchbox");let a=_e("oc-sdk-search-clear");a.append(ke("close",14)),a.tabIndex=-1,n.append(ke("search",16,"oc-sdk-search-icon"),s,a),e.append(n);let c=()=>{let _=t.placeholder??"Search";if(Te(s,"placeholder",_),s.setAttribute("aria-label",t.label??_),a.setAttribute("aria-label","Clear search"),s.value!==t.value)s.value=t.value;n.dataset.active=t.value.trim()===""?"false":"true"},d=()=>{if(t.value!=="")t.onChange("");s.focus()},u=()=>{t.onChange(s.value)},S=(_)=>{if(_.key==="Escape"&&s.value!=="")_.preventDefault(),d()};if(s.addEventListener("input",u),s.addEventListener("keydown",S),a.addEventListener("click",d),c(),t.autofocus)s.focus();return{update:(_)=>{t={...t,..._},c()},dispose:()=>{s.removeEventListener("input",u),s.removeEventListener("keydown",S),a.removeEventListener("click",d),n.remove()}}};var Ue=(e,o="vertical")=>{let[t,n]=o==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===t||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===n||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},Fe=(e,o,t)=>{let n=e.filter((u)=>!u.disabled);if(n.length===0)return null;let s=n[0],a=n[n.length-1];if(t==="first"||!s||!a)return s?.id??null;if(t==="last")return a.id;let c=n.findIndex((u)=>u.id===o);if(c===-1)return t==="next"?s.id:a.id;return n[Math.min(n.length-1,Math.max(0,c+(t==="next"?1:-1)))]?.id??null};var Br=(e,o)=>`${e}-${o??""}`,Xo=(e,o,t,n)=>{let s=_e("oc-sdk-option");if(s.id=Br(e,t.id),s.setAttribute("role",o),s.tabIndex=-1,s.disabled=Boolean(t.disabled),o==="option")s.setAttribute("aria-selected",t.selected?"true":"false");s.dataset.destructive=t.destructive?"true":"false";let a=R("span","oc-sdk-option-label");if(a.textContent=t.label,s.append(a),t.hint){let c=R("span","oc-sdk-option-hint");c.textContent=t.hint,s.append(c)}if(o==="option"){s.dataset.mark="check";let c=R("span","oc-sdk-option-check");c.append(ke("check",14)),s.append(c)}return s.addEventListener("pointerenter",n.hover),s.addEventListener("click",n.pick),s},Fo=(e,o,t,n)=>{let s=Br(t,n);for(let a of Array.from(e.children))if(a instanceof HTMLElement&&a.classList.contains("oc-sdk-option"))a.dataset.active=a.id===s?"true":"false";Te(o,"aria-activedescendant",n?s:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Fn=(e,o)=>{let t=o.getBoundingClientRect();e.style.minWidth=`${Math.round(t.width)}px`,e.style.left=`${Math.round(t.left)}px`,e.style.top=`${Math.round(t.bottom+4)}px`;let n=e.offsetHeight,s=window.innerHeight-t.bottom-8;if(n>s&&t.top-8>s)e.style.top=`${Math.max(8,Math.round(t.top-4-n))}px`;let a=t.left+e.offsetWidth-window.innerWidth+8;if(a>0)e.style.left=`${Math.max(8,Math.round(t.left-a))}px`},Bo=(e,o,t,n)=>{e.append(t),Fn(t,o);let s=Fr(e,n),a=()=>{n()},c=(d)=>{if(d.target instanceof Node&&t.contains(d.target))return;n()};return window.addEventListener("resize",a),window.addEventListener("scroll",c,!0),()=>{s(),window.removeEventListener("resize",a),window.removeEventListener("scroll",c,!0),t.remove()}};var $r=(e,o)=>{let t=o.trim().toLowerCase();if(!t)return[...e];return e.filter((n)=>n.label.toLowerCase().includes(t)||n.id.toLowerCase().includes(t))},Bn=0,Gt=(e,o)=>{B(F);let t=o,n=`oc-sdk-select-${Bn+=1}`,s=R("div","oc-sdk oc-sdk-select"),a=R("span","oc-sdk-field-label");a.id=`${n}-label`;let c=_e("oc-sdk-trigger");c.setAttribute("aria-haspopup","listbox"),c.setAttribute("aria-labelledby",a.id);let d=R("span","oc-sdk-trigger-value");c.append(d,ke("chevron",14,"oc-sdk-trigger-chevron")),s.append(a,c),e.append(s);let u="",S=null,_=null,T=R("div","oc-sdk oc-sdk-popup"),A=R("div","oc-sdk-popup-search"),h=R("input","oc-sdk-input");h.type="text",h.autocomplete="off",A.append(h);let C=R("div");C.setAttribute("role","listbox"),C.tabIndex=-1,T.append(C);let I=()=>$r(t.options,t.searchable?u:""),N=()=>t.searchable?h:C,M=(p)=>{S=p,Fo(C,N(),n,p)},Y=()=>{Xe(C);let p=I();if(p.length===0){let l=R("div","oc-sdk-popup-empty");l.textContent="No matches",C.append(l)}for(let l of p)C.append(Xo(n,"option",{...l,selected:l.id===t.value},{hover:()=>M(l.id),pick:()=>se(l.id)}));M(p.some((l)=>l.id===S)?S:p[0]?.id??null)},K=()=>{let p=_;_=null,p?.(),u="",h.value="",c.setAttribute("aria-expanded","false")},re=()=>{if(_||t.disabled)return;if(S=t.value,h.placeholder=t.searchPlaceholder??"Search",t.searchable)T.prepend(A);else A.remove();Y(),_=Bo(s,c,T,K),c.setAttribute("aria-expanded","true"),N().focus()},se=(p)=>{if(K(),c.focus(),p!==t.value)t.onChange(p)},ne=()=>{if(_)K();else re()},m=(p)=>{if(!_&&Ue(p))p.preventDefault(),re()},f=(p)=>{let l=Ue(p);if(l)p.preventDefault(),M(Fe(I(),S,l));else if(p.key==="Enter"){if(p.preventDefault(),S)se(S)}else if(p.key==="Escape")p.preventDefault(),K(),c.focus();else if(t.searchable&&p.target!==h&&p.key.length===1&&!p.ctrlKey&&!p.metaKey)h.focus()},g=()=>{u=h.value,Y()},z=(p)=>{if(_&&!(p.relatedTarget instanceof Node&&s.contains(p.relatedTarget)))K()},j=()=>{te(a,t.label),a.hidden=!t.label;let p=t.options.find((l)=>l.id===t.value);if(te(d,p?.label??t.placeholder??"Select"),d.dataset.empty=p?"false":"true",c.disabled=Boolean(t.disabled),_)Y()};return c.addEventListener("click",ne),c.addEventListener("keydown",m),T.addEventListener("keydown",f),h.addEventListener("input",g),s.addEventListener("focusout",z),j(),{update:(p)=>{t={...t,...p},j()},dispose:()=>{K(),c.removeEventListener("click",ne),c.removeEventListener("keydown",m),T.removeEventListener("keydown",f),h.removeEventListener("input",g),s.removeEventListener("focusout",z),s.remove()}}};var Ht=(e,o)=>{B(F);let t=o,n=R("div","oc-sdk oc-sdk-tabs");n.setAttribute("role","tablist"),e.append(n);let s=()=>{Xe(n),n.dataset.track=t.trackBackground?"true":"false";for(let c of t.items){let d=_e("oc-sdk-tab");d.setAttribute("role","tab");let u=c.id===t.activeId;d.setAttribute("aria-selected",u?"true":"false"),d.tabIndex=u?0:-1,d.dataset.id=c.id;let S=R("span");if(S.textContent=c.label,d.append(S),c.count!==void 0){let _=R("span","oc-sdk-tab-count");_.textContent=String(c.count),d.append(_)}d.addEventListener("click",()=>{if(c.id!==t.activeId)t.onChange(c.id)}),n.append(d)}},a=(c)=>{let d=Ue(c,"horizontal");if(!d)return;let u=Fe(t.items,t.activeId,d);if(u&&u!==t.activeId){c.preventDefault(),t.onChange(u);let S=n.querySelector(`[data-id="${CSS.escape(u)}"]`);if(S instanceof HTMLElement)S.focus()}};return n.addEventListener("keydown",a),s(),{update:(c)=>{t={...t,...c},s()},dispose:()=>{n.removeEventListener("keydown",a),n.remove()}}};var Vt=(e,o)=>{Te(e,"data-tone",o&&o!=="neutral"?o:null)},$o=(e,o)=>{B(F);let t=o,n=R("span","oc-sdk oc-sdk-badge");e.append(n);let s=()=>{te(n,t.label),Vt(n,t.tone)};return s(),{update:(a)=>{t={...t,...a},s()},dispose:()=>{n.remove()}}};var $n=0,Xt=(e,o)=>{B(F);let t=o,n=`oc-sdk-list-${$n+=1}`,s=R("div","oc-sdk oc-sdk-list");s.setAttribute("role","listbox"),s.tabIndex=0,e.append(s);let a=null,c=(T)=>`${n}-${T}`,d=(T)=>{a=T;for(let A of Array.from(s.children))if(A instanceof HTMLElement)A.dataset.active=A.id===c(T??"")?"true":"false";Te(s,"aria-activedescendant",T?c(T):null),s.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},u=(T,A)=>{let h=R("span",T);return h.textContent=A,h},S=()=>{if(Xe(s),Te(s,"aria-label",t.ariaLabel),t.items.length===0){s.append(u("oc-sdk-list-empty",t.emptyText??"Nothing here")),d(null);return}for(let A of t.items){let h=_e("oc-sdk-row");if(h.id=c(A.id),h.setAttribute("role","option"),h.setAttribute("aria-selected",A.id===t.selectedId?"true":"false"),h.disabled=Boolean(A.disabled),h.tabIndex=-1,A.leading)h.append(u("oc-sdk-row-lead",A.leading));let C=R("span","oc-sdk-row-main");if(C.append(u("oc-sdk-row-title",A.title)),A.subtitle)C.append(u("oc-sdk-row-sub",A.subtitle));if(h.append(C),A.badge){let I=u("oc-sdk-badge",A.badge.label);Vt(I,A.badge.tone),h.append(I)}if(A.meta)h.append(u("oc-sdk-row-meta",A.meta));h.addEventListener("click",()=>t.onSelect(A.id)),s.append(h)}let T=t.items.some((A)=>A.id===a&&!A.disabled);d(T?a:t.selectedId??null)},_=(T)=>{let A=Ue(T);if(A){T.preventDefault(),d(Fe(t.items,a,A));return}if((T.key==="Enter"||T.key===" ")&&a)T.preventDefault(),t.onSelect(a)};return s.addEventListener("keydown",_),S(),{update:(T)=>{t={...t,...T},S()},dispose:()=>{s.removeEventListener("keydown",_),s.remove()}}};var jo=(e,o)=>{B(F);let t=o,n=R("div","oc-sdk oc-sdk-empty"),s=R("h2","oc-sdk-empty-title"),a=R("p","oc-sdk-empty-body"),c=R("div","oc-sdk-empty-action");n.append(s,a,c),e.append(n);let d=null,u=()=>{if(te(s,t.title),te(a,t.body),a.hidden=!t.body,c.hidden=!t.action,!t.action){d?.dispose(),d=null;return}let S={label:t.action.label,onClick:t.action.onClick};if(d)d.update(S);else d=Q(c,{...S,variant:"outline",size:"sm"})};return u(),{update:(S)=>{t={...t,...S},u()},dispose:()=>{d?.dispose(),d=null,n.remove()}}};var Ko=(e,o={})=>{B(F);let t=o,n=R("span","oc-sdk oc-sdk-spinner");n.setAttribute("role","status");let s=R("span","oc-sdk-spinner-ring");s.setAttribute("aria-hidden","true");let a=R("span");n.append(s,a),e.append(n);let c=()=>{n.dataset.size=t.size??"default",te(a,t.label),a.hidden=!t.label,n.setAttribute("aria-label",t.label??"Loading")};return c(),{update:(d)=>{t={...t,...d},c()},dispose:()=>{n.remove()}}};var Ft=(e,o)=>{B(F);let t=o,n=R("div","oc-sdk oc-sdk-banner"),s=R("div","oc-sdk-banner-text"),a=R("div","oc-sdk-banner-title"),c=R("div","oc-sdk-banner-body"),d=R("div","oc-sdk-banner-action");s.append(a,c),n.append(s,d),e.append(n);let u=null,S=()=>{if(n.dataset.tone=t.tone,n.setAttribute("role",t.tone==="error"||t.tone==="warning"?"alert":"status"),te(a,t.title),te(c,t.body),c.hidden=!t.body,d.hidden=!t.action,!t.action){u?.dispose(),u=null;return}let _={label:t.action.label,onClick:t.action.onClick};if(u)u.update(_);else u=Q(d,{..._,variant:"outline",size:"xs"})};return S(),{update:(_)=>{t={...t,..._},S()},dispose:()=>{u?.dispose(),u=null,n.remove()}}};var zo=(e,o={})=>{B(F);let t=o,n=R("div","oc-sdk oc-sdk-separator");n.setAttribute("role","separator");let s=R("span");n.append(s),e.append(n);let a=()=>{te(s,t.label),s.hidden=!t.label,n.dataset.labeled=t.label?"true":"false"};return a(),{update:(c)=>{t={...t,...c},a()},dispose:()=>{n.remove()}}};var jr=["all","active","hidden"];var Bt=(e)=>{let o=e.trim();return o.startsWith("/")||/^[A-Za-z]:[\\/]/.test(o)},rt=(e,o={})=>{let t=e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/");if(t.length>1&&t.endsWith("/"))t=t.replace(/\/+$/,"");if(t==="")t=e.trim().startsWith("/")?"/":"";return o.caseInsensitive?t.toLowerCase():t},Be=(e,o,t={})=>rt(e,t)===rt(o,t);var Kr="default",zr=(e,o,t)=>$t(e,o,(n)=>{let{sessionMode:s,...a}=n;return t==="all"?a:{...a,sessionMode:t}}),Qe=()=>({version:1,activeId:Kr,profiles:[{id:Kr,name:"Default",folders:[]}]}),jn=(e)=>e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"profile",Kn=(e,o)=>{let t=jn(o),n=new Set(e.profiles.map((a)=>a.id));if(!n.has(t))return t;let s=2;while(n.has(`${t}-${s}`))s+=1;return`${t}-${s}`},$t=(e,o,t)=>{if(!e.profiles.some((n)=>n.id===o))throw Error(`Unknown profile: ${o}`);return{...e,profiles:e.profiles.map((n)=>n.id===o?t(n):n)}},Wr=(e)=>{let o=e.trim();if(!o)throw Error("Profile name is required");return o},Jr=(e,o)=>{let t=Wr(o),n={id:Kn(e,t),name:t,folders:[]};return{...e,profiles:[...e.profiles,n]}},Qr=(e,o,t)=>{let n=Wr(t);return $t(e,o,(s)=>({...s,name:n}))},Yr=(e,o)=>{if(!e.profiles.some((s)=>s.id===o))throw Error(`Unknown profile: ${o}`);let t=e.profiles.filter((s)=>s.id!==o);if(t.length===0)return Qe();let n=e.activeId===o?t[0].id:e.activeId;return{...e,activeId:n,profiles:t}},Wo=(e,o)=>{if(!e.profiles.some((t)=>t.id===o))throw Error(`Unknown profile: ${o}`);return{...e,activeId:o}},Zr=(e,o,t)=>{if(!Bt(t))throw Error("Folder path must be absolute");let n=rt(t);return $t(e,o,(s)=>s.folders.some((a)=>Be(a,n))?s:{...s,folders:[...s.folders,n]})},qr=(e,o,t)=>$t(e,o,(n)=>({...n,folders:n.folders.filter((s)=>!Be(s,t))}));var en="profiles.v1",tn=(e)=>typeof e==="object"&&e!==null&&!Array.isArray(e),zn=(e,o)=>{if(!tn(e)||typeof e.id!=="string"||!e.id||typeof e.name!=="string"||!Array.isArray(e.folders))return null;if(!e.folders.every((a)=>typeof a==="string"))return null;let t=new Set,n=[];for(let a of e.folders){let c=rt(a);if(c&&!t.has(c))t.add(c),n.push(c)}let s=jr.includes(e.sessionMode)?e.sessionMode:o?"hidden":"all";return s==="all"?{id:e.id,name:e.name,folders:n}:{id:e.id,name:e.name,folders:n,sessionMode:s}},Wn=(e)=>{if(e===void 0)return{state:Qe(),corrupt:!1};if(!tn(e)||e.version!==1||!Array.isArray(e.profiles))return{state:Qe(),corrupt:!0};let o=e.showSessions===!1,t=e.profiles.map((c)=>zn(c,o)),n=t.filter((c)=>c!==null),s=new Set(n.map((c)=>c.id));if(n.length===0||t.length!==n.length||s.size!==n.length)return{state:Qe(),corrupt:!0};return{state:{version:1,activeId:typeof e.activeId==="string"&&s.has(e.activeId)?e.activeId:n[0].id,profiles:n},corrupt:!1}},on=async(e)=>Wn(await e.get(en)),rn=(e,o)=>e.set(en,o);var nn=20,cn=["waiting-permission","waiting-question"],ln=["running","retrying"],Jn=(e)=>{if(e.some((o)=>cn.includes(o.activity)))return"waiting";if(e.some((o)=>ln.includes(o.activity)))return"running";return"idle"},Qn=(e,o)=>{for(let t of o.projects)if(Be(e,t.directory))return{project:t,via:"project"};for(let t of o.projects)if((o.worktrees[t.id]??[]).some((n)=>Be(e,n.directory)))return{project:t,via:"worktree"};return null},sn=(e)=>cn.includes(e.activity)||ln.includes(e.activity),Yn=(e,o,t)=>{let n=Qn(e,o);if(!n)return{path:e,kind:"not-added",project:null,via:null,sessions:[],hiddenSessions:0,totalSessions:0,activeSessions:0,attention:"idle"};let s=(o.sessions[n.project.id]??[]).filter((c)=>!c.parentId&&!c.archivedAt).filter((c)=>n.via==="project"||Be(c.directory,e)).sort((c,d)=>d.updatedAt-c.updatedAt),a=t==="hidden"?[]:t==="active"?s.filter(sn):s;return{path:e,kind:"registered",project:{id:n.project.id,name:n.project.name},via:n.via,sessions:a.slice(0,nn).map(({id:c,title:d,updatedAt:u,activity:S})=>({id:c,title:d,updatedAt:u,activity:S})),hiddenSessions:Math.max(0,a.length-nn),totalSessions:s.length,activeSessions:s.filter(sn).length,attention:Jn(s)}},an=(e,o)=>e.projects.filter((t)=>{let n=[t.directory,...(e.worktrees[t.id]??[]).map((s)=>s.directory)];return!o.some((s)=>n.some((a)=>Be(s,a)))}).map((t)=>({projectId:t.id,name:t.name,path:t.directory})),dn=(e)=>{let{state:o}=e,t=o.profiles.find((n)=>n.id===o.activeId)??o.profiles[0];return{profiles:o.profiles.map((n)=>({id:n.id,name:n.name,folderCount:n.folders.length,active:n.id===t.id})),activeProfile:{id:t.id,name:t.name,sessionMode:t.sessionMode??"all",folders:t.folders.map((n)=>Yn(n,e,t.sessionMode??"all"))},unassigned:an(e,o.profiles.flatMap((n)=>n.folders)),pickable:an(e,t.folders)}};var Zn=31,qn="https://github.com/odrinOp/openchamber-profiles",lt=(e)=>e instanceof Error?e.message:String(e),pn=(e)=>{let o=Qe(),t=!1,n=!1,s=[],a="loading",c={},d={},u,S=!1,_=new Map,T=null,A=new Set,h,C=()=>{let m=dn({state:o,projects:s,worktrees:c,sessions:d}),f="ready",g;if(u)f="error",g=u;else if(!n||a==="loading")f="loading";else if(a==="error"&&s.length===0)f="error",g="Could not load projects from OpenChamber.";return{status:f,error:g,corrupt:t,vm:m}},I=()=>{h=C(),N();for(let m of A)m()},N=()=>{let m=new Set;for(let f of h.vm.activeProfile.folders){if(f.project)m.add(f.project.id);if(m.size>=Zn)break}for(let[f,g]of _)if(!m.has(f))g(),_.delete(f),delete d[f];for(let f of m){if(_.has(f))continue;_.set(f,()=>{}),e.onSessions(f,(g)=>{d={...d,[f]:g.sessions},I()}).then((g)=>{if(S||!_.has(f))g();else _.set(f,g)}).catch((g)=>{_.delete(f),console.error("sessions subscription failed",f,g)})}},M=async(m)=>{let f=await Promise.all(m.map(async(g)=>{try{return[g.id,(await e.listWorktrees(g.id)).worktrees]}catch{return[g.id,[]]}}));if(S)return;c=Object.fromEntries(f),I()},Y=(m)=>{try{ne(m(o))}catch(f){e.toast({kind:"error",message:lt(f)})}},K=new Set,re=async(m)=>{let f=h.vm.activeProfile.folders.find((g)=>g.path===m);if(!f?.project||K.has(m))return;K.add(m);try{let g=h.vm.activeProfile,z=await e.startSession({providerId:"profiles",id:`profile:${g.id}`,title:g.name,url:qn,data:{profileId:g.id},projectId:f.project.id,navigation:"open",...f.via==="worktree"?{worktree:{kind:"existing",directory:f.path}}:{}});if(z.sessionId===null)e.toast({kind:"error",message:`Could not start a session (${z.failure}).`})}catch(g){e.toast({kind:"error",message:`Could not start a session: ${lt(g)}`})}finally{K.delete(m)}},se=Promise.resolve(),ne=(m)=>{o=m,t=!1,I(),se=se.then(()=>rn(e.storage,o)).catch((f)=>{e.toast({kind:"error",message:`Could not save profiles: ${lt(f)}`})})};return h=C(),(async()=>{try{let m=await on(e.storage);o=m.state,t=m.corrupt,n=!0,I();let f=await e.onProjects((g)=>{s=g.projects,a=g.state,I(),M(s)});if(S)f();else T=f}catch(m){u=lt(m),I()}})(),{get:()=>h,subscribe(m){return A.add(m),()=>A.delete(m)},selectProfile:(m)=>Y((f)=>Wo(f,m)),setSessionMode:(m)=>Y((f)=>zr(f,f.activeId,m)),createProfile:(m)=>Y((f)=>{let g=Jr(f,m);return Wo(g,g.profiles[g.profiles.length-1].id)}),renameProfile:(m,f)=>Y((g)=>Qr(g,m,f)),deleteProfile:(m)=>Y((f)=>Yr(f,m)),addFolder:(m,f)=>Y((g)=>Zr(g,f??g.activeId,m)),removeFolder:(m)=>Y((f)=>qr(f,f.activeId,m)),newSession:(m)=>void re(m),openSession:(m)=>{e.openSession(m).catch((f)=>{e.toast({kind:"error",message:`Could not open the session: ${lt(f)}`})})},dispose(){S=!0,T?.();for(let m of _.values())m();_.clear(),A.clear()}}};var un=`
/* Layout container */
.oc-profiles-app {
  display: flex;
  flex-direction: column;
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

/* Top bar */
.oc-profiles-topbar {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 32px;
  border-bottom: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.18)));
}

.oc-profiles-body {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.oc-profiles-banner-slot {
  padding: 0 32px;
}

.oc-profiles-banner-slot:not(:empty) {
  padding-top: 12px;
}

.oc-profiles-projects-view {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 20px 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.oc-profiles-toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.oc-profiles-toolbar-item {
  min-width: 0;
}

.oc-profiles-settings-view {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
}

.oc-profiles-section-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  margin-top: 4px;
}

.oc-profiles-config-row {
  border: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.18)));
  border-radius: var(--radius, 10px);
  background: var(--surface-elevated, var(--oc-elevated, rgba(128, 128, 128, 0.03)));
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
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

  .oc-profiles-settings-view {
    flex-direction: column;
    overflow-y: auto;
  }

  .oc-profiles-topbar,
  .oc-profiles-projects-view {
    padding-left: 16px;
    padding-right: 16px;
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

.oc-profiles-session-count {
  font-size: 11px;
  color: var(--muted-foreground);
  white-space: nowrap;
}
`;var fn=(e)=>{let o=e.replace(/[\\/]+$/,""),t=Math.max(o.lastIndexOf("/"),o.lastIndexOf("\\"));if(t>=0)return o.slice(t+1)||e;return e},es=(e,o=Date.now())=>{let t=Math.max(0,o-e),n=Math.floor(t/1000);if(n<60)return"just now";let s=Math.floor(n/60);if(s<60)return`${s}m ago`;let a=Math.floor(s/60);if(a<24)return`${a}h ago`;let c=Math.floor(a/24);if(c<30)return`${c}d ago`;let d=Math.floor(c/30);if(d<12)return`${d}mo ago`;return`${Math.floor(c/365)}y ago`},ts=(e)=>{switch(e){case"waiting-permission":return{label:"waiting for permission",tone:"warning"};case"waiting-question":return{label:"waiting for answer",tone:"warning"};case"running":return{label:"running",tone:"info"};case"retrying":return{label:"retrying",tone:"warning"};case"idle":case"unknown":default:return{label:"idle",tone:"neutral"}}},os=(e)=>{let t=document.getElementById("oc-profiles-view-style");if(!t)t=document.createElement("style"),t.id="oc-profiles-view-style",document.head.appendChild(t);if(t.textContent!==e)t.textContent=e},rs=(e,o,t)=>{let n=document.createElement("div");n.className="oc-profiles-folder-card";let s=e,a=o,c=!1,d=null,u=document.createElement("div");u.className="oc-profiles-folder-header";let S=document.createElement("div");S.className="oc-profiles-folder-meta";let _=document.createElement("div");_.className="oc-profiles-folder-title-row";let T=document.createElement("span");T.className="oc-profiles-status-dot";let A=document.createElement("span");A.className="oc-profiles-folder-basename";let h=document.createElement("span");h.className="oc-sdk-badge oc-profiles-worktree-tag",h.textContent="worktree",h.style.display="none",_.appendChild(T),_.appendChild(A),_.appendChild(h);let C=document.createElement("span");C.className="oc-profiles-session-count",C.style.display="none",_.appendChild(C);let I=document.createElement("span");I.className="oc-profiles-folder-path",S.appendChild(_),S.appendChild(I);let N=document.createElement("div");N.className="oc-profiles-folder-actions";let M=document.createElement("span");N.appendChild(M);let K=Q(M,{label:"New session",variant:"default",size:"xs",onClick:()=>{if(c)return;c=!0,K.update({disabled:!0}),a.newSession(s.path),d=setTimeout(()=>{c=!1,d=null,K.update({disabled:!1})},3000)}});u.appendChild(S),u.appendChild(N),n.appendChild(u);let re=document.createElement("div");re.className="oc-profiles-not-added-callout";let se=document.createElement("span");se.className="oc-profiles-not-added-icon",se.textContent="ℹ";let ne=document.createElement("span");ne.textContent="Add this folder as a project in the sidebar once",re.appendChild(se),re.appendChild(ne);let m=document.createElement("div");m.className="oc-profiles-sessions-container";let f=document.createElement("div");f.className="oc-profiles-sessions-empty",f.textContent="No sessions yet";let g=document.createElement("div");g.className="oc-profiles-sessions-list";let z=document.createElement("div");z.className="oc-profiles-sessions-more",m.appendChild(f),m.appendChild(g),m.appendChild(z);let j=[],p=(l,le,pe)=>{s=l,a=le,T.dataset.status=l.attention,T.setAttribute("title",`Status: ${l.attention}`),T.setAttribute("aria-label",`Status: ${l.attention}`),A.textContent=fn(l.path),A.title=l.path,I.textContent=l.path,I.title=l.path;let ue=l.totalSessions;if(C.textContent=`${ue} ${ue===1?"session":"sessions"}`+(l.activeSessions>0?` · ${l.activeSessions} active`:""),C.style.display=l.kind==="registered"&&pe==="hidden"?"":"none",h.style.display=l.via==="worktree"?"":"none",l.kind==="registered")M.style.display="",K.update({disabled:c});else M.style.display="none";if(l.kind==="not-added"){if(!re.parentElement)n.appendChild(re);if(m.parentElement)m.remove()}else{if(re.parentElement)re.remove();if(m.style.display=pe==="hidden"?"none":"",!m.parentElement)n.appendChild(m);if(l.sessions.length===0){if(pe==="active")f.textContent=l.totalSessions>0?`No active sessions · ${l.totalSessions} total`:"No active sessions";else f.textContent="No sessions yet";f.style.display="",g.style.display="none",z.style.display="none"}else{f.style.display="none",g.style.display="";while(j.length<l.sessions.length){let X=document.createElement("div");X.className="oc-profiles-session-row";let ae=document.createElement("div");ae.className="oc-profiles-session-lead";let D=document.createElement("span");D.className="oc-profiles-session-title",ae.appendChild(D);let Se=document.createElement("span");ae.appendChild(Se);let G=$o(Se,{label:"",tone:"neutral"}),me=document.createElement("div");me.className="oc-profiles-session-trail";let Z=document.createElement("span");me.appendChild(Z);let w=document.createElement("div");w.className="oc-profiles-session-actions",me.appendChild(w);let P="",xe=Q(w,{label:"Open",variant:"secondary",size:"xs",onClick:()=>{if(P)a.openSession(P)}});D.addEventListener("click",()=>{if(P)a.openSession(P)}),X.appendChild(ae),X.appendChild(me),g.appendChild(X),j.push({element:X,titleEl:D,badgeHandle:G,timeEl:Z,openButtonHandle:xe,setSessionId:($e)=>{P=$e}})}while(j.length>l.sessions.length){let X=j.pop();X.badgeHandle.dispose(),X.openButtonHandle.dispose(),X.element.remove()}if(l.sessions.forEach((X,ae)=>{let D=j[ae];D.setSessionId(X.id),D.titleEl.textContent=X.title||"Untitled session",D.titleEl.title=`Open session: ${X.title||"Untitled session"}`;let Se=ts(X.activity);D.badgeHandle.update({label:Se.label,tone:Se.tone}),D.timeEl.textContent=es(X.updatedAt)}),l.hiddenSessions>0)z.style.display="",z.textContent=`+${l.hiddenSessions} more`;else z.style.display="none"}}};return p(e,o,t),{element:n,update:p,dispose:()=>{if(d)clearTimeout(d),d=null;K.dispose();for(let l of j)l.badgeHandle.dispose(),l.openButtonHandle.dispose();j=[],n.remove()}}},ns=(e,o,t)=>{let n=document.createElement("div");n.className="oc-profiles-unassigned-card";let s=document.createElement("div");s.className="oc-profiles-unassigned-info";let a=document.createElement("span");a.className="oc-profiles-unassigned-name";let c=document.createElement("span");c.className="oc-profiles-unassigned-path",s.appendChild(a),s.appendChild(c);let d=document.createElement("div");d.className="oc-profiles-unassigned-actions",n.appendChild(s),n.appendChild(d);let u=null,S=null,_=null,T=o.find((h)=>h.active)?.id??o[0]?.id??"",A=(h,C,I)=>{if(a.textContent=h.name,c.textContent=h.path,c.title=h.path,!C.some((N)=>N.id===T))T=C.find((N)=>N.active)?.id??C[0]?.id??"";if(C.length<=1){if(S)S.dispose(),S=null;if(_)_.dispose(),_=null;let N=C[0]?.name??"profile",M=C[0]?.id;if(!u)u=Q(d,{label:`Add to ${N}`,variant:"secondary",size:"sm",onClick:()=>{if(M)I.addFolder(h.path,M);else I.addFolder(h.path)}});else u.update({label:`Add to ${N}`,onClick:()=>{if(M)I.addFolder(h.path,M);else I.addFolder(h.path)}})}else{if(u)u.dispose(),u=null;let N=C.map((M)=>({id:M.id,label:M.active?`${M.name} (active)`:M.name}));if(!S)S=Gt(d,{options:N,value:T,onChange:(M)=>{T=M}});else S.update({options:N,value:T});if(!_)_=Q(d,{label:"Add",variant:"secondary",size:"sm",onClick:()=>{I.addFolder(h.path,T)}});else _.update({onClick:()=>{I.addFolder(h.path,T)}})}};return A(e,o,t),{element:n,update:A,dispose:()=>{u?.dispose(),S?.dispose(),_?.dispose(),n.remove()}}},ss=(e,o)=>{let t=document.createElement("div");t.className="oc-profiles-config-row";let n=document.createElement("div");n.className="oc-profiles-unassigned-info";let s=document.createElement("span");s.className="oc-profiles-unassigned-name";let a=document.createElement("span");a.className="oc-profiles-unassigned-path",n.appendChild(s),n.appendChild(a);let c=document.createElement("div");c.className="oc-profiles-unassigned-actions",t.appendChild(n),t.appendChild(c);let d=e,u=o,S=Q(c,{label:"Remove",variant:"ghost",size:"xs",onClick:()=>u.removeFolder(d.path)}),_=(T,A)=>{d=T,u=A,s.textContent=fn(T.path),s.title=T.path,a.textContent=T.path,a.title=T.path};return _(e,o),{element:t,update:_,dispose:()=>{S.dispose(),t.remove()}}},is=[{id:"all",label:"All"},{id:"active",label:"Active"},{id:"hidden",label:"Hidden"}],En=(e)=>{os(un);let o=null,t=null,n="projects",s=!1,a="",c,d=!1,u=null,S="",_=!1,T=null,A=!1,h="",C="",I;while(e.firstChild)e.removeChild(e.firstChild);let N=()=>{if(o&&t)gt(o,t)},M=document.createElement("div");M.className="oc-profiles-app oc-sdk",e.appendChild(M);let Y=document.createElement("header");Y.className="oc-profiles-topbar",M.appendChild(Y);let K=document.createElement("h1");K.className="oc-profiles-main-title",K.textContent="Profiles",Y.appendChild(K);let re=document.createElement("div");Y.appendChild(re);let se=Ht(re,{items:[{id:"projects",label:"Projects"},{id:"settings",label:"Settings"}],activeId:n,trackBackground:!0,onChange:(E)=>{n=E==="settings"?"settings":"projects",N()}}),ne=document.createElement("div");ne.className="oc-profiles-body",M.appendChild(ne);let m=document.createElement("div");m.className="oc-profiles-banner-slot",ne.appendChild(m);let f=document.createElement("div");ne.appendChild(f);let g=document.createElement("section");g.className="oc-profiles-projects-view",ne.appendChild(g);let z=document.createElement("div");z.className="oc-profiles-toolbar",g.appendChild(z);let j=document.createElement("div");j.className="oc-profiles-toolbar-item",z.appendChild(j);let p=Gt(j,{options:[],value:"",onChange:(E)=>t?.selectProfile(E)}),l=document.createElement("div");l.className="oc-profiles-toolbar-item",z.appendChild(l);let le=Ht(l,{items:is,activeId:"all",trackBackground:!0,onChange:(E)=>{if(E==="all"||E==="active"||E==="hidden")t?.setSessionMode(E)}}),pe=document.createElement("p");pe.className="oc-profiles-main-subtitle",pe.textContent="Session display is remembered per profile.",g.appendChild(pe);let ue=document.createElement("div");ue.className="oc-profiles-content",g.appendChild(ue);let X=document.createElement("section");X.className="oc-profiles-settings-view",ne.appendChild(X);let ae=document.createElement("aside");ae.className="oc-profiles-sidebar",X.appendChild(ae);let D=document.createElement("div");D.className="oc-profiles-sidebar-header",D.textContent="Profiles",ae.appendChild(D);let Se=document.createElement("div");Se.className="oc-profiles-sidebar-section",ae.appendChild(Se);let G=Xt(Se,{items:[],ariaLabel:"Profiles",onSelect:(E)=>{t?.selectProfile(E),N()}}),me=document.createElement("div");me.className="oc-profiles-sidebar-action",ae.appendChild(me);let Z=document.createElement("div");me.appendChild(Z);let w=document.createElement("div");w.className="oc-profiles-new-profile-form",w.style.display="none",me.appendChild(w);let P=document.createElement("div");w.appendChild(P);let xe=document.createElement("div");xe.className="oc-profiles-form-actions",w.appendChild(xe);let $e=()=>{let E=a.trim();if(!E){c="Name cannot be empty",Ae.update({error:c});return}t?.createProfile(E),s=!1,a="",c=void 0,N()},nt=()=>{s=!1,a="",c=void 0,N()},dt=Q(Z,{label:"+ New profile",variant:"ghost",size:"sm",onClick:()=>{s=!0,a="",c=void 0,N(),w.querySelector("input")?.focus()}}),Ae=Dt(P,{placeholder:"Profile name",value:"",onChange:(E)=>{a=E,c=void 0,Ae.update({value:E,error:void 0}),Ne.update({disabled:!E.trim()})}}),Ne=Q(xe,{label:"Create",variant:"default",size:"xs",disabled:!0,onClick:$e}),pt=Q(xe,{label:"Cancel",variant:"ghost",size:"xs",onClick:nt});w.addEventListener("keydown",(E)=>{if(E.key==="Enter")E.preventDefault(),$e();else if(E.key==="Escape")E.preventDefault(),nt()});let fe=document.createElement("main");fe.className="oc-profiles-main",X.appendChild(fe);let we=document.createElement("header");we.className="oc-profiles-main-header",fe.appendChild(we);let ie=document.createElement("div");ie.className="oc-profiles-header-top",we.appendChild(ie);let Me=document.createElement("div");Me.className="oc-profiles-header-title-row",ie.appendChild(Me);let Re=document.createElement("h2");Re.className="oc-profiles-main-title",Me.appendChild(Re);let be=document.createElement("div");be.className="oc-profiles-rename-form",be.style.display="none",Me.appendChild(be);let ce=document.createElement("input");ce.type="text",ce.className="oc-sdk-input",ce.placeholder="Profile name",be.appendChild(ce);let je=document.createElement("div");je.className="oc-profiles-form-actions",be.appendChild(je);let st=()=>{let E=S.trim();if(E&&u)t?.renameProfile(u,E);d=!1,u=null,N()},r=()=>{d=!1,u=null,N()},i=Q(je,{label:"Save",variant:"default",size:"xs",onClick:st}),x=Q(je,{label:"Cancel",variant:"ghost",size:"xs",onClick:r});ce.addEventListener("input",()=>{S=ce.value,i.update({disabled:!S.trim()})}),ce.addEventListener("keydown",(E)=>{if(E.key==="Enter")E.preventDefault(),st();else if(E.key==="Escape")E.preventDefault(),r()});let O=document.createElement("div");O.className="oc-profiles-header-actions",ie.appendChild(O);let H=Q(O,{label:"Rename",variant:"ghost",size:"xs",onClick:()=>{if(!o)return;d=!0,u=o.vm.activeProfile.id,S=o.vm.activeProfile.name,ce.value=S,_=!1,gt(o,t),ce.focus(),ce.select()}}),L=Q(O,{label:"Delete",variant:"ghost",size:"xs",onClick:()=>{if(!o)return;_=!0,T=o.vm.activeProfile.id,d=!1,gt(o,t)}}),W=Q(O,{label:"+ Add folder",variant:"secondary",size:"sm",onClick:()=>{A=!A,N()}}),jt=document.createElement("p");jt.className="oc-profiles-main-subtitle",we.appendChild(jt);let Ke=document.createElement("div");Ke.className="oc-profiles-delete-confirm",Ke.style.display="none",we.appendChild(Ke);let Kt=document.createElement("p");Kt.className="oc-profiles-delete-confirm-text",Ke.appendChild(Kt);let ut=document.createElement("div");ut.className="oc-profiles-form-actions",Ke.appendChild(ut);let Tn=Q(ut,{label:"Delete profile",variant:"destructive",size:"xs",onClick:()=>{if(T&&t)t.deleteProfile(T);_=!1,T=null,N()}}),hn=Q(ut,{label:"Cancel",variant:"ghost",size:"xs",onClick:()=>{_=!1,T=null,N()}}),ve=document.createElement("div");ve.className="oc-profiles-add-panel",ve.style.display="none",fe.appendChild(ve);let ft=document.createElement("div");ft.className="oc-profiles-add-panel-header",ve.appendChild(ft);let zt=document.createElement("h3");zt.className="oc-profiles-add-panel-title",ft.appendChild(zt);let Et=()=>{A=!1,h="",C="",I=void 0,N()},gn=Q(ft,{label:"Cancel",variant:"ghost",size:"xs",onClick:Et}),Ye=document.createElement("div");Ye.className="oc-profiles-add-section",ve.appendChild(Ye);let Wt=document.createElement("span");Wt.className="oc-profiles-add-section-label",Wt.textContent="Registered projects",Ye.appendChild(Wt);let _t=document.createElement("div");Ye.appendChild(_t);let Jo=Vo(_t,{placeholder:"Filter projects…",value:"",onChange:(E)=>{if(h=E,o&&t)qo(o,t)}}),it=document.createElement("div");it.className="oc-profiles-pickable-list-wrap",Ye.appendChild(it);let Qo=Xt(it,{items:[],emptyText:"No matching projects",onSelect:(E)=>{t?.addFolder(E),Et()}}),Ze=document.createElement("p");Ze.className="oc-profiles-empty-hint",Ze.textContent="All registered projects are already in this profile",Ze.style.display="none",Ye.appendChild(Ze);let Yo=document.createElement("div");ve.appendChild(Yo);let xn=zo(Yo,{label:"or"}),Jt=document.createElement("div");Jt.className="oc-profiles-add-section",ve.appendChild(Jt);let St=document.createElement("div");St.className="oc-profiles-typed-row",Jt.appendChild(St);let Qt=document.createElement("div");St.appendChild(Qt);let Zo=()=>{let E=C.trim();if(!Bt(E)){I="Use an absolute path, e.g. /Users/me/project",mt.update({error:I});return}t?.addFolder(E),Et()},mt=Dt(Qt,{label:"Or type a folder path",placeholder:"/path/to/folder or C:\\path\\to\\folder",mono:!0,value:"",onChange:(E)=>{C=E,I=void 0,mt.update({value:E,error:void 0})}});Qt.addEventListener("keydown",(E)=>{if(E.key==="Enter")E.preventDefault(),Zo();else if(E.key==="Escape")E.preventDefault(),Et()});let On=Q(St,{label:"Add path",variant:"secondary",size:"sm",onClick:Zo}),qo=(E,ye)=>{let oe=h.trim().toLowerCase(),at=E.vm.pickable.filter((He)=>!oe||He.name.toLowerCase().includes(oe)||He.path.toLowerCase().includes(oe)).map((He)=>({id:He.path,title:He.name,subtitle:He.path}));if(E.vm.pickable.length===0)_t.style.display="none",it.style.display="none",Ze.style.display="";else _t.style.display="",it.style.display="",Ze.style.display="none",Qo.update({items:at})},Yt=document.createElement("div");Yt.className="oc-profiles-section-label",Yt.textContent="Folders in this profile",fe.appendChild(Yt);let Tt=document.createElement("p");Tt.className="oc-profiles-empty-hint",Tt.textContent='No folders yet. Use "+ Add folder" to pick a project or type a path.',fe.appendChild(Tt);let Zt=document.createElement("div");Zt.className="oc-profiles-content",fe.appendChild(Zt);let qt=document.createElement("div");qt.className="oc-profiles-section-label",fe.appendChild(qt);let ht=document.createElement("p");ht.className="oc-profiles-empty-hint",ht.textContent="Every project is in a profile.",fe.appendChild(ht);let eo=document.createElement("div");eo.className="oc-profiles-content",fe.appendChild(eo);let Pe=null,Le=null,ze=null,he=null,Oe=new Map,De=new Map,Ge=new Map,gt=(E,ye)=>{if(o=E,t=ye,u&&u!==E.vm.activeProfile.id)d=!1,u=null;if(T&&T!==E.vm.activeProfile.id)_=!1,T=null;if(E.corrupt)if(!Pe)Pe=Ft(m,{tone:"warning",title:"Profiles read warning",body:"Saved profiles couldn't be read. Showing defaults; nothing is overwritten until you make a change."});else Pe.update({body:"Saved profiles couldn't be read. Showing defaults; nothing is overwritten until you make a change."});else if(Pe)Pe.dispose(),Pe=null;if(E.status==="error"){let v=E.error||"An unexpected error occurred loading profiles.";if(!Le)Le=Ft(m,{tone:"error",title:"Unable to load profiles",body:v});else Le.update({body:v})}else if(Le)Le.dispose(),Le=null;if(se.update({activeId:n}),E.status==="loading"){if(!ze)ze=Ko(f,{label:"Loading profiles and projects…"});g.style.display="none",X.style.display="none";return}if(ze)ze.dispose(),ze=null;let oe=E.vm.activeProfile;if(n==="projects"){g.style.display="",X.style.display="none",p.update({options:E.vm.profiles.map((v)=>({id:v.id,label:v.name})),value:oe.id}),le.update({activeId:oe.sessionMode});for(let v of De.values())v.dispose();De.clear();for(let v of Ge.values())v.dispose();if(Ge.clear(),oe.folders.length===0){for(let V of Oe.values())V.dispose();Oe.clear();let v={title:"No folders yet",body:"Add project folders to this profile in Settings.",action:{label:"Open Settings",onClick:()=>{n="settings",N()}}};if(!he)he=jo(ue,v);else he.update(v)}else{if(he)he.dispose(),he=null;let v=new Set(oe.folders.map((V)=>V.path));for(let[V,Ve]of Oe)if(!v.has(V))Ve.dispose(),Oe.delete(V);for(let V of oe.folders){let Ve=Oe.get(V.path);if(!Ve)Ve=rs(V,ye,oe.sessionMode),Oe.set(V.path,Ve);else Ve.element.style.display="",Ve.update(V,ye,oe.sessionMode);ue.appendChild(Ve.element)}}return}g.style.display="none",X.style.display="";for(let v of Oe.values())v.dispose();if(Oe.clear(),he)he.dispose(),he=null;if(G.update({items:E.vm.profiles.map((v)=>({id:v.id,title:v.name,meta:v.folderCount===1?"1 folder":`${v.folderCount} folders`,badge:v.active?{label:"selected",tone:"primary"}:void 0})),selectedId:oe.id}),s)Z.style.display="none",w.style.display="",Ae.update({value:a,error:c}),Ne.update({disabled:!a.trim()});else Z.style.display="",w.style.display="none";if(d&&u===oe.id)Re.style.display="none",be.style.display="",i.update({disabled:!S.trim()}),H.update({disabled:!0}),L.update({disabled:!0});else Re.style.display="",Re.textContent=oe.name,be.style.display="none",H.update({disabled:!1}),L.update({disabled:!1});if(_&&T===oe.id){Ke.style.display="";let v=E.vm.profiles.length===1;Kt.textContent=v?`Delete "${oe.name}"? Its folders move to Unassigned unless another profile holds them. Projects aren't touched. This is your last profile, so it will reset to an empty Default profile.`:`Delete "${oe.name}"? Its folders move to Unassigned unless another profile holds them. Projects aren't touched.`}else Ke.style.display="none";let at=oe.folders.length;if(jt.textContent=`${at} ${at===1?"project folder":"project folders"}`,A)ve.style.display="",zt.textContent=`Add folder to ${oe.name}`,W.update({label:"✕ Close add"}),Jo.update({value:h}),qo(E,ye),mt.update({value:C,error:I});else ve.style.display="none",W.update({label:"+ Add folder"});Tt.style.display=at===0?"":"none";let He=new Set(oe.folders.map((v)=>v.path));for(let[v,V]of De)if(!He.has(v))V.dispose(),De.delete(v);for(let v of oe.folders){let V=De.get(v.path);if(!V)V=ss(v,ye),De.set(v.path,V);else V.update(v,ye);Zt.appendChild(V.element)}let er=E.vm.unassigned.length;qt.textContent=`Unassigned projects (${er})`,ht.style.display=er===0?"":"none";let An=new Set(E.vm.unassigned.map((v)=>v.path));for(let[v,V]of Ge)if(!An.has(v))V.dispose(),Ge.delete(v);for(let v of E.vm.unassigned){let V=Ge.get(v.path);if(!V)V=ns(v,E.vm.profiles,ye),Ge.set(v.path,V);else V.update(v,E.vm.profiles,ye);eo.appendChild(V.element)}};return{render:gt,dispose:()=>{se.dispose(),p.dispose(),le.dispose(),G.dispose(),dt.dispose(),Ae.dispose(),Ne.dispose(),pt.dispose(),i.dispose(),x.dispose(),H.dispose(),L.dispose(),W.dispose(),Tn.dispose(),hn.dispose(),gn.dispose(),Jo.dispose(),Qo.dispose(),xn.dispose(),mt.dispose(),On.dispose(),Pe?.dispose(),Pe=null,Le?.dispose(),Le=null,ze?.dispose(),ze=null,he?.dispose(),he=null;for(let E of Oe.values())E.dispose();Oe.clear();for(let E of De.values())E.dispose();De.clear();for(let E of Ge.values())E.dispose();Ge.clear(),M.remove()}}};var _n=Io(),Sn=document.getElementById("app");if(!Sn)throw Error("Missing #app");var as=En(Sn),ge=pn(_n),cs={selectProfile:(e)=>ge.selectProfile(e),setSessionMode:(e)=>ge.setSessionMode(e),createProfile:(e)=>ge.createProfile(e),renameProfile:(e,o)=>ge.renameProfile(e,o),deleteProfile:(e)=>ge.deleteProfile(e),addFolder:(e,o)=>ge.addFolder(e,o),removeFolder:(e)=>ge.removeFolder(e),newSession:(e)=>ge.newSession(e),openSession:(e)=>ge.openSession(e)},mn=()=>as.render(ge.get(),cs);_n.onReady((e)=>ko(e,document.documentElement));ge.subscribe(mn);mn();})();
