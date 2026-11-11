(()=>{var R="openchamber.sdk",g=1;var tt=`
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
`;function ot(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",(s)=>{let i=s.target===e?r:s.target;if(!(i instanceof Element))return;if(!i.hasAttribute("data-oc-scrolling"))i.setAttribute("data-oc-scrolling","");let a=o.get(i);if(a!==void 0)clearTimeout(a);o.set(i,setTimeout(()=>{o.delete(i),i.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var sr=`(${ot.toString()})(document);`;var rt=128,nt=65536;var Ue=128;var Ne=65536;var eo=/^[a-z][a-z0-9-]{0,39}$/;var Qt=(e)=>Object(e)===e&&!Array.isArray(e),st=(e,r)=>Object.keys(e).every((o)=>r.includes(o)),Zt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,qt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,to=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let o of e){if(!Qt(o)||!eo.test(o.id)||!Zt(o.label))return!1;if(o.disabled!==void 0&&o.disabled!==!0&&o.disabled!==!1)return!1;if(r.has(o.id))return!1;if(r.add(o.id),o.kind==="button"){if(!st(o,["kind","id","label","disabled"]))return!1;continue}if(o.kind!=="select"||!st(o,["kind","id","label","value","options","disabled"]))return!1;if(!qt(o.value)||!Array.isArray(o.options)||o.options.length<1||o.options.length>16)return!1;let s=new Set;for(let i of o.options){if(!Qt(i)||!st(i,["value","label"])||!qt(i.value)||!Zt(i.label)||s.has(i.value))return!1;s.add(i.value)}if(!s.has(o.value))return!1}return!0};var oo=["{id}","{segment}","{segments+}"];var Zr=new Set(oo);var ro=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var en=new Set(ro);var Me=20000000,we=256;var it=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,no=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let o=0;o<e.bytes.byteLength;o+=1)if(e.bytes[o]!==r.bytes[o])return!1;return!0};var so=/^[A-Za-z0-9_-]{1,80}$/;var io=["left","right","top","bottom"];var ao=(e,r=0,o={remaining:16000})=>{if(--o.remaining<0||r>=32)return!1;if(e===null)return!0;let s=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let i of s)if(!ao(i,r+1,o))return!1;return!0},at=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(at);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(at)}return String(e)===e||Number.isFinite(e)},ct=(e)=>{try{if(String(e.id)!==e.id||!so.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!io.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!ao(e.data)||!at(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var lt=2000;var lo=["file","directory","other","missing"],pt=(e)=>Boolean(e&&"sessionId"in e),ut=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var po=/^[0-9a-f]{7,64}$/i,Et=(e)=>po.test(e),Pe=500,Le=32000,uo=16000,Eo=128,_o=200,fo=2000,So=16000,To=80,mo=200,Oo=16000;var Ao=2000;var _t=20000,De=1024,Ge=2000000;var Ve=64000,He=8000,ft=4000;var St=960000;var ho=999,xo=1e4,Ie=500,Ro=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],go=["stopped","starting","ready","failed"],ar=new Set(Ro),bo=(e)=>ar.has(e),Io=(e)=>e&&bo(e)?e:"HOST_REJECTED",Te=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Te);if(Object(e)===e)return Object.values(e).every(Te);return!1},Co=(e)=>Te(e)&&JSON.stringify(e).length<=Oo,co=(e)=>e?.trim().slice(0,mo)??"",me=(e)=>{let r=e.id.trim().slice(0,Eo),o=e.title.trim().slice(0,_o),s=e.url.trim().slice(0,fo),i=e.text?.trim().slice(0,So),a=e.author?.trim().slice(0,To),l=e.kind==="pull"?"pull":"issue",p={providerId:e.providerId.trim(),id:r,title:o||r,url:s,kind:l};if(i)p.text=i;if(a)p.author=a;if(l==="pull"){let S=co(e.branches?.head),x=co(e.branches?.base);if(S&&x)p.branches={head:S,base:x}}if(Co(e.data))p.data=e.data;return p},Tt=(e)=>{let r=me(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},mt=(e)=>{let r={text:e.text.trim().slice(0,uo)};if(e.send)r.send=!0;return r},Ot=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(ho,Math.max(0,Math.round(e)))},At=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(xo,Math.max(0,Math.ceil(e)))};var Oe=(e)=>e.length>0&&e.length<=De&&!e.includes("\x00")&&!e.includes("\\");var Xe=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Ao)return!1;return!e.split("/").some((o)=>o==="."||o==="..")},cr=new Set(go),ht=(e)=>Boolean(e&&"status"in e&&cr.has(String(e.status))&&!("body"in e)),Fe=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),xt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Rt=(e)=>Boolean(e&&"written"in e&&e.written===!0),gt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),dr=new Set(lo),bt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&dr.has(String(e.kind))&&Number.isFinite(e.size)),It=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),lr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),pr=(e)=>Object(e)===e?e:null,dt=(e)=>String(e)===e&&e.length>0,ur=(e)=>{if(!dt(e.id))return null;if(e.ok===!0){let r={channel:R,v:g,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&dt(e.error))return{channel:R,v:g,type:"result",id:e.id,ok:!1,error:e.error,code:Io(dt(e.code)?e.code:void 0)};return null},Ct=(e)=>{let r=pr(e);if(!r||r.channel!==R||r.v!==g)return null;if(r.type==="result")return ur(r);if(!lr.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var yo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Er=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class T extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var vo=()=>Promise.reject(new T("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),$e=()=>Promise.reject(new T("BAD_PATH",`File path must be 1 to ${De} characters without NUL or backslash.`)),Be=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new T("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},A=(e)=>(e.value+=1,`oc-${e.value}`),yt=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new T("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let o=e.acceptSource??((t)=>t===r.parent),s=e.requestTimeoutMs??_t,i=new Set,a=new Set,l=new Set,p=new Set,S=new Set,x=new Set,I=new Set,h=new Set,m=new Set,k=new Set,P=new Set,M=new Set,ee=[],Z=null,F=null,te=new Set,u=new Set,O=null,f=null,J=!1,L=new Map,U=new Map,D=new Map,N=!1,c={value:0},d=null,C=null,ie=!1,_e=!1,G=null,ne=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},y=(t)=>{r.parent.postMessage(t,"*")},X=()=>{if(N||r.parent===r||M.size===0||d?.features?.lateGenerateResults!==!0)return;y({channel:R,v:g,type:"generate-late-listen"})},v=(t,n)=>{for(let E of t)try{E(n)}catch(_){console.error(_)}},Ft=(t)=>{if(!(t instanceof MessageEvent))return;if(!o(t.source))return;let n=Ct(t.data);if(!n)return;if(n.type==="workspace"){let _=U.get(n.payload.subscriptionId);if(_)v([_],n.payload.snapshot);return}if(n.type==="shells"){let _=D.get(n.payload.subscriptionId);if(_)v([_],n.payload.snapshot);return}if(n.type==="ready"){if(d=n.payload,C=ne(n.payload.session),v(i,n.payload),v(a,n.payload.directory),v(l,n.payload.session),C)v(p,C);if(v(S,n.payload.connection),v(x,n.payload.settings),v(I,n.payload.item),n.payload.block)v(h,n.payload.block);X();return}if(n.type==="service-event"){v(m,n.payload);return}if(n.type==="generate-late"){if(M.size===0)ee.push(n.payload);else v(M,n.payload);return}if(n.type==="directory"){if(d)d={...d,directory:n.payload.directory};v(a,n.payload.directory);return}if(n.type==="session"){if(d)d={...d,session:n.payload.session};if(!n.payload.session)C=null;else if(C?.sessionId!==n.payload.session.id)C=ne(n.payload.session);v(l,n.payload.session);return}if(n.type==="session-lifecycle"){C=n.payload,v(p,n.payload);return}if(n.type==="connection"){if(d)d={...d,connection:n.payload.connection};v(S,n.payload.connection);return}if(n.type==="settings"){if(d)d={...d,settings:n.payload.settings};v(x,n.payload.settings);return}if(n.type==="item"){if(d)d={...d,item:n.payload.item};v(I,n.payload.item);return}if(n.type==="status-control-event"){v(k,n.payload);return}if(n.type==="popover-closed"){v(P,n.payload);return}if(n.type==="action"){let _=(w)=>{if(!N)y({channel:R,v:g,type:"action-result",id:n.id,payload:w})},V=F;if(!V){_({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>V(n.payload)).then(()=>_({ok:!0}),(w)=>{let Q=(w instanceof Error?w.message:String(w)).trim();_({ok:!1,error:(Q||"Action failed.").slice(0,Ie)})});return}if(n.type==="file-open"){let _=n.payload;if(f&&no(f,_))return;f=_,v(te,n.payload);return}if(n.type==="file-saved"){v(u,n.payload.version);return}if(n.type==="file-snapshot"){let _=(Q)=>{if(!N)y({channel:R,v:g,type:"file-snapshot-result",id:n.id,payload:Q})},V=(Q)=>_({error:(Q.trim()||"Could not read the edited file.").slice(0,Ie)}),w=O;if(!w){V("This extension does not edit files.");return}Promise.resolve().then(()=>w(n.payload.purpose)).then((Q)=>{if(it(Q)>Me){V(`The file is over ${Me} ${"bytes"in Q?"bytes":"characters"}.`);return}if(Q.version.length>we){V(`The snapshot version is over ${we} characters.`);return}_({snapshot:"bytes"in Q?{bytes:Q.bytes,version:Q.version}:{content:Q.content,version:Q.version}})},(Q)=>V(Q instanceof Error?Q.message:String(Q)));return}if(n.type==="resolve"){let _=(w)=>{y({channel:R,v:g,type:"resolve-result",id:n.id,payload:w})},V=Z;if(!V){_({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>V(n.payload)).then((w)=>_({item:w?me(w):null}),(w)=>{let Q=(w instanceof Error?w.message:String(w)).trim();_({error:(Q||"Command failed.").slice(0,Ie)})});return}let E=L.get(n.id);if(!E)return;if(clearTimeout(E.timer),L.delete(n.id),n.ok){E.resolve(n.payload);return}E.reject(new T(n.code,n.error))};r.addEventListener("message",Ft),y({channel:R,v:g,type:"hello"});let oe=(t,n=s)=>{if(N||r.parent===r)return Promise.reject(new T("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((E,_)=>{let V=setTimeout(()=>{L.delete(t.id),_(new T("HOST_TIMEOUT","Host did not answer in time."))},n);L.set(t.id,{resolve:E,reject:_,timer:V}),y(t)})},W=(t)=>oe(t).then(()=>{return}),Y={channel:R,v:g},Ze=(t)=>{if(!N&&r.parent!==r)y(t)},$t=()=>Ze({...Y,type:"file-save"}),Bt=(t)=>{if(!yo(t)||!Er(t))return;t.preventDefault(),$t()},Kt=(t)=>{if(!yo(t)||t.key!=="Escape"||d?.surface!=="popover"||!d.popover)return;t.preventDefault(),Jt(d.popover.id,"escape").catch(()=>{return})},ye=()=>{let t=d?.surface==="popover"?d.popover:void 0;if(!t)return;let n=ie||_e;if(G===n)return;G=n,Yt(t.id,n).catch(()=>{return})},ve=()=>{if(d?.surface!=="popover"||ie)return;ie=!0,ye()},jt=(t)=>{if(d?.surface!=="popover"||t.relatedTarget!==null||!ie)return;ie=!1,ye()},zt=()=>{if(d?.surface!=="popover"||_e)return;_e=!0,ye()},Wt=()=>{if(d?.surface!=="popover"||!_e)return;_e=!1,ye()},ae=(t,n=1024)=>{if(!t.trim()||t.length>n)throw new T("HOST_REJECTED",`Identity must contain 1 to ${n} characters.`)},qe=async(t)=>{if(t.kind!=="projects")ae(t.projectId);let n=await oe({...Y,type:"workspace-read",id:A(c),payload:t});if(!n||!("kind"in n)||!("state"in n)||n.kind!==t.kind)throw new T("HOST_REJECTED","Host did not return workspace data.");return n},et=async(t,n)=>{if(t.kind!=="projects")ae(t.projectId);let E=A(c);U.set(E,n);try{await W({...Y,type:"workspace-subscribe",id:A(c),payload:{subscriptionId:E,query:t}})}catch(_){if(U.delete(E),!N)y({...Y,type:"workspace-unsubscribe",id:A(c),payload:{subscriptionId:E}});throw _}return()=>{if(!U.delete(E)||N)return;y({...Y,type:"workspace-unsubscribe",id:A(c),payload:{subscriptionId:E}})}},nr=async(t,n)=>{if(t.kind==="session")ae(t.sessionId);if(t.kind==="project")ae(t.projectId);let E=A(c);D.set(E,n);try{await W({...Y,type:"shells-subscribe",id:A(c),payload:{subscriptionId:E,scope:t}})}catch(_){if(D.delete(E),!N)y({...Y,type:"shells-unsubscribe",id:A(c),payload:{subscriptionId:E}});throw _}return()=>{if(!D.delete(E)||N)return;y({...Y,type:"shells-unsubscribe",id:A(c),payload:{subscriptionId:E}})}},ke=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>rt))throw new T("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!Te(t.value))throw new T("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>nt)throw new T("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&d?.features?.deviceStorage!==!0)throw new T("UNSUPPORTED","This host does not support device storage.");let n=await oe({...Y,type:"storage",id:A(c),payload:t});if(!n||!("storage"in n)||n.op!==t.op)throw new T("HOST_REJECTED","Host did not return storage data.");return n},Jt=(t,n)=>d?.features?.popovers!==!0&&!(d?.surface==="popover"&&d.popover?.id===t)?Promise.reject(new T("UNSUPPORTED","This host does not support popovers.")):W({...Y,type:"popover-close",id:A(c),payload:n?{id:t,reason:n}:{id:t}}),Yt=(t,n)=>d?.features?.popovers!==!0&&!(d?.surface==="popover"&&d.popover?.id===t)?Promise.reject(new T("UNSUPPORTED","This host does not support popovers.")):W({...Y,type:"popover-anchor",id:A(c),payload:{id:t,active:n}});return r.addEventListener("keydown",Kt,!0),r.addEventListener("pointerover",ve),r.addEventListener("pointermove",ve),r.addEventListener("pointerout",jt),r.addEventListener("focus",zt),r.addEventListener("blur",Wt),{onAction:(t)=>(F=t,()=>{if(F===t)F=null}),listProjects:async()=>{let t=await qe({kind:"projects"});if(t.kind!=="projects")throw new T("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let n=await qe({kind:"worktrees",projectId:t});if(n.kind!=="worktrees")throw new T("HOST_REJECTED","Expected worktrees.");return n},listSessions:async(t)=>{let n=await qe({kind:"sessions",projectId:t});if(n.kind!=="sessions")throw new T("HOST_REJECTED","Expected sessions.");return n},onProjects:(t)=>et({kind:"projects"},(n)=>{if(n.kind==="projects")t(n)}),onWorktrees:(t,n)=>et({kind:"worktrees",projectId:t},(E)=>{if(E.kind==="worktrees")n(E)}),onSessions:(t,n)=>et({kind:"sessions",projectId:t},(E)=>{if(E.kind==="sessions")n(E)}),onRunningShells:(t,n)=>nr(t,n),readShellOutput:async(t,n)=>{ae(t,Ue);let E=n?.cursor;if(E!==void 0&&(!Number.isInteger(E)||E<0))throw new T("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let _=n?.tailBytes;if(_!==void 0&&(!Number.isInteger(_)||_<1||_>Ne))throw new T("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ne}.`);let w=await oe({...Y,type:"shell-output",id:A(c),payload:{shellId:t,cursor:E,tailBytes:_}});if(!w||typeof w.output!=="string"||!Number.isFinite(w.cursor))throw new T("HOST_REJECTED","Host did not return shell output.");return w},stopShell:async(t)=>{if(ae(t,Ue),(await oe({...Y,type:"shell-stop",id:A(c),payload:{shellId:t}}))?.stopped!==!0)throw new T("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{ae(t),await W({...Y,type:"open-session",id:A(c),payload:{sessionId:t}})},storage:{get:async(t,n)=>{let E=Be(n),_={op:"get",key:t};if(E)_.scope=E;let V=await ke(_);return V.op==="get"&&V.found?V.value:void 0},set:async(t,n,E)=>{let _=Be(E),V={op:"set",key:t,value:n};if(_)V.scope=_;await ke(V)},delete:async(t,n)=>{let E=Be(n),_={op:"delete",key:t};if(E)_.scope=E;await ke(_)},keys:async(t)=>{let n=Be(t),E={op:"keys"};if(n)E.scope=n;let _=await ke(E);if(_.op!=="keys")throw new T("HOST_REJECTED","Expected storage keys.");return _.keys}},onReady:(t)=>{if(i.add(t),d)t(d);return()=>{i.delete(t)}},onDirectory:(t)=>{if(a.add(t),d)t(d.directory);return()=>{a.delete(t)}},onSession:(t)=>{if(l.add(t),d)t(d.session);return()=>{l.delete(t)}},onSessionLifecycle:(t)=>{if(p.add(t),C)t(C);return()=>{p.delete(t)}},onConnection:(t)=>{if(S.add(t),d)t(d.connection);return()=>{S.delete(t)}},onSettings:(t)=>{if(x.add(t),d)t(d.settings);return()=>{x.delete(t)}},onItem:(t)=>{if(I.add(t),d)t(d.item);return()=>{I.delete(t)}},onBlock:(t)=>{if(h.add(t),d?.block)t(d.block);return()=>{h.delete(t)}},onServiceEvent:(t)=>(m.add(t),()=>{m.delete(t)}),onStatusControl:(t)=>(k.add(t),()=>{k.delete(t)}),onPopoverClosed:(t)=>(P.add(t),()=>{P.delete(t)}),setStatusControls:(t)=>{if(d?.features?.statusControls!==!0)return Promise.reject(new T("UNSUPPORTED","This host does not support status controls."));if(!to(t))return Promise.reject(new T("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return W({...Y,type:"status-controls",id:A(c),payload:{controls:t}})},openPopover:(t)=>{if(d?.features?.popovers!==!0)return Promise.reject(new T("UNSUPPORTED","This host does not support popovers."));if(!ct(t))return Promise.reject(new T("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return W({...Y,type:"popover-open",id:A(c),payload:t})},closePopover:Jt,setPopoverAnchorActive:Yt,onResolve:(t)=>(Z=t,()=>{if(Z===t)Z=null}),toast:(t)=>{let n=t.message.trim();if(!n||n.length>Pe)return Promise.reject(new T("HOST_REJECTED",`Toast message must contain 1 to ${Pe} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Le))return Promise.reject(new T("HOST_REJECTED",`Toast copy text must contain 1 to ${Le} characters.`));return W({channel:R,v:g,type:"toast",id:A(c),payload:{...t,message:n}})},openUrl:(t)=>W({channel:R,v:g,type:"open-url",id:A(c),payload:{url:t}}),openCommit:(t)=>Et(t)?W({channel:R,v:g,type:"open-commit",id:A(c),payload:{sha:t}}):Promise.reject(new T("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(t)=>W({channel:R,v:g,type:"block-answer",id:A(c),payload:{text:t.trim().slice(0,lt)}}),openSurface:(t)=>W({channel:R,v:g,type:"open-surface",id:A(c),payload:{surfaceId:t}}),writeClipboard:(t)=>W({channel:R,v:g,type:"clipboard-write",id:A(c),payload:{text:t}}),compose:(t)=>W({channel:R,v:g,type:"compose",id:A(c),payload:t}),attach:(t)=>W({channel:R,v:g,type:"attach",id:A(c),payload:me(t)}),startSession:async(t)=>{if(t.projectId!==void 0)ae(t.projectId);let n=t.worktree;if(n&&n!==!0)if(n.kind==="existing")ae(n.directory);else{if(n.name!==void 0)ae(n.name,200);if(n.baseBranch!==void 0)ae(n.baseBranch,200)}let E=await oe({channel:R,v:g,type:"start-session",id:A(c),payload:Tt(t)},e.requestTimeoutMs??180000);if(!pt(E))throw new T("HOST_REJECTED","Host did not return a session.");return E},prompt:(t)=>oe({channel:R,v:g,type:"prompt",id:A(c),payload:mt(t)}).then((n)=>{if(!ut(n))throw new T("HOST_REJECTED","Host did not return a prompt result.");return n}),sessionLink:(t)=>W({channel:R,v:g,type:"session-link",id:A(c),payload:me(t)}),close:()=>W({channel:R,v:g,type:"close",id:A(c)}),oauthStart:()=>W({channel:R,v:g,type:"oauth-start",id:A(c)}),oauthDisconnect:()=>W({channel:R,v:g,type:"oauth-disconnect",id:A(c)}),request:(t)=>(Xe(t.path)?oe({channel:R,v:g,type:"request",id:A(c),payload:t}):vo()).then((n)=>{if(!Fe(n))throw new T("HOST_REJECTED","Host request result was empty.");return n}),serviceRequest:(t)=>(Xe(t.path)?oe({channel:R,v:g,type:"service-request",id:A(c),payload:t}):vo()).then((n)=>{if(!Fe(n))throw new T("HOST_REJECTED","Host service request result was empty.");return n}),serviceStatus:()=>oe({channel:R,v:g,type:"service-status",id:A(c)}).then((t)=>{if(!ht(t))throw new T("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(Oe(t)?oe({channel:R,v:g,type:"file-read",id:A(c),payload:{path:t}}):$e()).then((n)=>{if(!xt(n))throw new T("HOST_REJECTED","Host did not return file content.");return n}),writeFile:(t,n)=>{if(!Oe(t))return $e();if(n.length>Ge)return Promise.reject(new T("FILE_TOO_LARGE",`Content is over ${Ge} characters.`));return oe({channel:R,v:g,type:"file-write",id:A(c),payload:{path:t,content:n}}).then((E)=>{if(!Rt(E))throw new T("HOST_REJECTED","Host did not confirm the write.");return E})},listDir:(t)=>(Oe(t)?oe({channel:R,v:g,type:"file-list",id:A(c),payload:{path:t}}):$e()).then((n)=>{if(!gt(n))throw new T("HOST_REJECTED","Host did not return directory entries.");return n}),stat:(t)=>(Oe(t)?oe({channel:R,v:g,type:"file-stat",id:A(c),payload:{path:t}}):$e()).then((n)=>{if(!bt(n))throw new T("HOST_REJECTED","Host did not return file status.");return n}),generate:(t)=>{let n=t.prompt.trim(),E=t.system?.trim();if(n.length===0||n.length>Ve)return Promise.reject(new T("HOST_REJECTED",`Prompt must be 1 to ${Ve} characters.`));if(E!==void 0&&(E.length===0||E.length>He))return Promise.reject(new T("HOST_REJECTED",`System prompt must be 1 to ${He} characters.`));let _=t.maxOutputTokens===void 0?void 0:Math.min(ft,Math.max(1,Math.floor(t.maxOutputTokens)));if(_!==void 0&&!Number.isFinite(_))return Promise.reject(new T("HOST_REJECTED","maxOutputTokens must be a number."));let V={prompt:n};if(E!==void 0)V.system=E;if(_!==void 0)V.maxOutputTokens=_;return oe({channel:R,v:g,type:"generate",id:A(c),payload:V},e.requestTimeoutMs??St).then((w)=>{if(!It(w))throw new T("HOST_REJECTED","Host did not return generated text.");return w})},onLateGenerateResult:(t)=>{M.add(t);for(let n of ee.splice(0))v([t],n);return X(),()=>{M.delete(t)}},setBadge:(t)=>W({channel:R,v:g,type:"badge",id:A(c),payload:{count:Ot(t)}}),setHeight:(t)=>W({channel:R,v:g,type:"resize",id:A(c),payload:{height:At(t)}}),onFileOpen:(t)=>{if(te.add(t),!J)J=!0,r.addEventListener("keydown",Bt,!0);if(f)t(f);return()=>{te.delete(t)}},onFileSnapshot:(t)=>(O=t,()=>{if(O===t)O=null}),onFileSaved:(t)=>(u.add(t),()=>{u.delete(t)}),reportFileChange:(t)=>Ze({...Y,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:$t,reportFileUnsupported:()=>Ze({...Y,type:"file-unsupported"}),dispose:()=>{for(let t of U.keys())y({...Y,type:"workspace-unsubscribe",id:A(c),payload:{subscriptionId:t}});U.clear();for(let t of D.keys())y({...Y,type:"shells-unsubscribe",id:A(c),payload:{subscriptionId:t}});if(D.clear(),N=!0,Z=null,F=null,O=null,te.clear(),u.clear(),J)r.removeEventListener("keydown",Bt,!0);r.removeEventListener("message",Ft),r.removeEventListener("keydown",Kt,!0),r.removeEventListener("pointerover",ve),r.removeEventListener("pointermove",ve),r.removeEventListener("pointerout",jt),r.removeEventListener("focus",zt),r.removeEventListener("blur",Wt);for(let t of L.values())clearTimeout(t.timer),t.reject(new T("HOST_UNAVAILABLE","Host client was disposed."));L.clear(),i.clear(),a.clear(),l.clear(),p.clear(),S.clear(),x.clear(),I.clear(),h.clear(),m.clear(),k.clear(),P.clear(),M.clear(),ee.length=0}}};var ko=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Sn=new Set(ko);var Uo=["none","agent","user"];var mn=new Set(Uo);var _r=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],fr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],No=(e,r)=>{r.style.colorScheme=e.mode;for(let[o,s]of _r)r.style.setProperty(o,e.tokens[s]);for(let[o,s,i]of fr){let a=e.tokens[i]??"";r.style.setProperty(o,a),r.style.setProperty(s,a)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},vt=(e,r)=>{if(No(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var Sr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},H=(e,r)=>`var(--${e}, var(--oc-${Sr[e]}, ${r}))`,le=H("surface-background","transparent"),je=H("surface-elevated","transparent"),Ae=H("surface-elevated-foreground","inherit"),se=H("surface-foreground","inherit"),B=H("surface-muted-foreground","gray"),Tr=H("surface-muted","transparent"),fe=H("interactive-border","currentColor"),re=H("interactive-hover","transparent"),Se=H("interactive-active","transparent"),kt=H("interactive-selection","transparent"),Ut=H("interactive-selection-foreground","inherit"),de=H("primary","currentColor"),Nt=H("primary-text","inherit"),Mt=H("error-text","inherit"),mr=H("font-sans","inherit"),wt=H("font-mono","monospace"),Lo=H("radius","9px"),Pt=`calc(${Lo} - 2px)`,Mo=`calc(${Lo} - 4px)`,K=(e,r,o="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${o})`,wo=`background-image: linear-gradient(${re}, ${re});`,Lt=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,Dt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Po="box-shadow: var(--oc-sdk-lit);",Gt=`inset 0 0.5px 0 0 ${K(se,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Or=`
:root {
  --oc-sdk-edge: ${K(se,16)};
  --oc-sdk-field-bg: ${je};
  --oc-sdk-raised-bg: ${le};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${K(se,14)};
  --oc-sdk-field-bg: ${K(le,50,je)};
  --oc-sdk-raised-bg: ${je};
  --oc-sdk-field-lift: ${Gt};
  --oc-sdk-raised-lift: ${Gt};
  --oc-sdk-lit: ${Gt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Ke=(e)=>{let r=H(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${H(`${e}-text`,"inherit")}; }`},Ar=`
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
`,Do=`${Or}
.oc-sdk { color: ${se}; font-family: ${mr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${wo} }
.oc-sdk-mono { font-family: ${wt}; }
.oc-sdk-muted { color: ${B}; }
${Ke("success")}${Ke("warning")}${Ke("error")}${Ke("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${de}; --oc-sdk-tone-text: ${Nt}; }

.oc-sdk-btn { border-radius: ${Pt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Mo}; }
.oc-sdk-btn[data-variant="default"] { color: ${Nt}; background: ${K(de,10,le)}; border-color: ${K(de,12)}; ${Po} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${K(de,16,le)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${K(de,22,le)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Tr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${re}, ${re}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Se}, ${Se}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Ae}; ${Dt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${re}, ${re}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Se}, ${Se}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${re}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Se}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${H("status-error","red")}; color: ${Mt}; background: ${K("var(--oc-sdk-tone)",7,le)}; border-color: ${K("var(--oc-sdk-tone)",12)}; ${Po} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${K("var(--oc-sdk-tone)",9,le)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${K("var(--oc-sdk-tone)",11,le)}; box-shadow: none; }

.oc-sdk-field-note { color: ${B}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Mt}; }
.oc-sdk-input { border-radius: ${Pt}; background: var(--oc-sdk-field-bg); color: ${Ae}; ${Lt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${B}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${re}, ${re}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Lt(K(se,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Lt(H("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${wt}; }

.oc-sdk-search-icon { color: ${B}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${de}; }
.oc-sdk-search-clear { border-radius: ${Mo}; color: ${B}; }
.oc-sdk-search-clear:hover { background: ${re}; color: ${se}; }

.oc-sdk-trigger { border-radius: ${Pt}; background: var(--oc-sdk-raised-bg); color: ${Ae}; ${Dt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${re}, ${re}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Se}, ${Se}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${B}; }
.oc-sdk-trigger-chevron { color: ${B}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Ae}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${je}; background-clip: padding-box; color: ${Ae}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${re}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${kt}; color: ${Ut}; }
.oc-sdk-option-check { color: ${se}; }
.oc-sdk-option[data-destructive="true"] { color: ${Mt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${K(H("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${B}; }
.oc-sdk-popup-empty { color: ${B}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${fe}; border-radius: 4px; color: ${se}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${K(se,60,fe)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${fe}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${le}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${de}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${wo} }
.oc-sdk-check-desc { color: ${B}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${K(se,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${B}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${se}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Ut}; background: ${kt}; border-color: ${fe}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Ae}; background: var(--oc-sdk-raised-bg); ${Dt} }
.oc-sdk-tab-count { color: ${B}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${K(se,6)}; color: ${B}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${K("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${re}; }
.oc-sdk-row[aria-selected="true"] { background: ${kt}; color: ${Ut}; }
.oc-sdk-row-lead { font-family: ${wt}; color: ${B}; }
.oc-sdk-row-sub { color: ${B}; }
.oc-sdk-row-meta { color: ${B}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${B}; }

.oc-sdk-empty-body { color: ${B}; }

.oc-sdk-spinner { color: ${B}; }
.oc-sdk-spinner-ring { border-color: ${fe}; border-top-color: ${de}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${K("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${B}; }

.oc-sdk-separator { color: ${B}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${K(fe,40)}; }

.oc-sdk-progress-label { color: ${B}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${K(se,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${de}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${H("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${H("success-text","inherit")}; }

.oc-sdk-text a { color: ${Nt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${K(fe,60)}; }
`,j=`
${tt}
${Ar}
${Do}`;var Go="oc-sdk-ui-style",he=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},z=(e)=>{let r=document.getElementById(Go);if(r instanceof HTMLStyleElement){if(r.textContent!==e)r.textContent=e;return}ot(document);let o=document.createElement("style");o.id=Go,o.textContent=e,document.head.appendChild(o)},b=(e,r)=>{let o=document.createElement(e);if(r)o.className=r;return o},pe=(e)=>{let r=b("button",e);return r.type="button",r},q=(e,r)=>{let o=r??"";if(e.textContent!==o)e.textContent=o},ue=(e,r,o)=>{if(o===void 0||o===null||o==="")e.removeAttribute(r);else if(e.getAttribute(r)!==o)e.setAttribute(r,o)};var hr=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},ce=(e,r)=>{z(j);let o=r,s=pe("oc-sdk oc-sdk-btn"),i=hr(),a=document.createElement("span");s.append(a),e.append(s);let l=()=>{if(s.dataset.variant=o.variant??"default",s.dataset.size=o.size??"default",s.disabled=Boolean(o.disabled)||Boolean(o.loading),s.dataset.loading=o.loading?"true":"false",s.setAttribute("aria-busy",o.loading?"true":"false"),o.loading&&i.parentNode!==s)s.prepend(i);else if(!o.loading&&i.parentNode===s)i.remove();q(a,o.label)},p=()=>{if(o.disabled||o.loading)return;o.onClick()};return s.addEventListener("click",p),l(),{update:(S)=>{o={...o,...S},l()},dispose:()=>{s.removeEventListener("click",p),s.remove()}}};var xe=(e,r="vertical")=>{let[o,s]=r==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===o||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===s||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},Re=(e,r,o)=>{let s=e.filter((S)=>!S.disabled);if(s.length===0)return null;let i=s[0],a=s[s.length-1];if(o==="first"||!i||!a)return i?.id??null;if(o==="last")return a.id;let l=s.findIndex((S)=>S.id===r);if(l===-1)return o==="next"?i.id:a.id;return s[Math.min(s.length-1,Math.max(0,l+(o==="next"?1:-1)))]?.id??null};var We=(e,r)=>{ue(e,"data-tone",r&&r!=="neutral"?r:null)},Vt=(e,r)=>{z(j);let o=r,s=b("span","oc-sdk oc-sdk-badge");e.append(s);let i=()=>{q(s,o.label),We(s,o.tone)};return i(),{update:(a)=>{o={...o,...a},i()},dispose:()=>{s.remove()}}};var br=0,Je=(e,r)=>{z(j);let o=r,s=`oc-sdk-list-${br+=1}`,i=b("div","oc-sdk oc-sdk-list");i.setAttribute("role","listbox"),i.tabIndex=0,e.append(i);let a=null,l=(h)=>`${s}-${h}`,p=(h)=>{a=h;for(let m of Array.from(i.children))if(m instanceof HTMLElement)m.dataset.active=m.id===l(h??"")?"true":"false";ue(i,"aria-activedescendant",h?l(h):null),i.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},S=(h,m)=>{let k=b("span",h);return k.textContent=m,k},x=()=>{if(he(i),ue(i,"aria-label",o.ariaLabel),o.items.length===0){i.append(S("oc-sdk-list-empty",o.emptyText??"Nothing here")),p(null);return}for(let m of o.items){let k=pe("oc-sdk-row");if(k.id=l(m.id),k.setAttribute("role","option"),k.setAttribute("aria-selected",m.id===o.selectedId?"true":"false"),k.disabled=Boolean(m.disabled),k.tabIndex=-1,m.leading)k.append(S("oc-sdk-row-lead",m.leading));let P=b("span","oc-sdk-row-main");if(P.append(S("oc-sdk-row-title",m.title)),m.subtitle)P.append(S("oc-sdk-row-sub",m.subtitle));if(k.append(P),m.badge){let M=S("oc-sdk-badge",m.badge.label);We(M,m.badge.tone),k.append(M)}if(m.meta)k.append(S("oc-sdk-row-meta",m.meta));k.addEventListener("click",()=>o.onSelect(m.id)),i.append(k)}let h=o.items.some((m)=>m.id===a&&!m.disabled);p(h?a:o.selectedId??null)},I=(h)=>{let m=xe(h);if(m){h.preventDefault(),p(Re(o.items,a,m));return}if((h.key==="Enter"||h.key===" ")&&a)h.preventDefault(),o.onSelect(a)};return i.addEventListener("keydown",I),x(),{update:(h)=>{o={...o,...h},x()},dispose:()=>{i.removeEventListener("keydown",I),i.remove()}}};var Ye=(e,r)=>{z(j);let o=r,s=b("div","oc-sdk oc-sdk-empty"),i=b("h2","oc-sdk-empty-title"),a=b("p","oc-sdk-empty-body"),l=b("div","oc-sdk-empty-action");s.append(i,a,l),e.append(s);let p=null,S=()=>{if(q(i,o.title),q(a,o.body),a.hidden=!o.body,l.hidden=!o.action,!o.action){p?.dispose(),p=null;return}let x={label:o.action.label,onClick:o.action.onClick};if(p)p.update(x);else p=ce(l,{...x,variant:"outline",size:"sm"})};return S(),{update:(x)=>{o={...o,...x},S()},dispose:()=>{p?.dispose(),p=null,s.remove()}}};var Ht=(e,r={})=>{z(j);let o=r,s=b("span","oc-sdk oc-sdk-spinner");s.setAttribute("role","status");let i=b("span","oc-sdk-spinner-ring");i.setAttribute("aria-hidden","true");let a=b("span");s.append(i,a),e.append(s);let l=()=>{s.dataset.size=o.size??"default",q(a,o.label),a.hidden=!o.label,s.setAttribute("aria-label",o.label??"Loading")};return l(),{update:(p)=>{o={...o,...p},l()},dispose:()=>{s.remove()}}};var Qe=(e,r)=>{z(j);let o=r,s=b("div","oc-sdk oc-sdk-banner"),i=b("div","oc-sdk-banner-text"),a=b("div","oc-sdk-banner-title"),l=b("div","oc-sdk-banner-body"),p=b("div","oc-sdk-banner-action");i.append(a,l),s.append(i,p),e.append(s);let S=null,x=()=>{if(s.dataset.tone=o.tone,s.setAttribute("role",o.tone==="error"||o.tone==="warning"?"alert":"status"),q(a,o.title),q(l,o.body),l.hidden=!o.body,p.hidden=!o.action,!o.action){S?.dispose(),S=null;return}let I={label:o.action.label,onClick:o.action.onClick};if(S)S.update(I);else S=ce(p,{...I,variant:"outline",size:"xs"})};return x(),{update:(I)=>{o={...o,...I},x()},dispose:()=>{S?.dispose(),S=null,s.remove()}}};var Xt=(e,r={})=>{z(j);let o=r,s=b("div","oc-sdk oc-sdk-separator");s.setAttribute("role","separator");let i=b("span");s.append(i),e.append(s);let a=()=>{q(i,o.label),i.hidden=!o.label,s.dataset.labeled=o.label?"true":"false"};return a(),{update:(l)=>{o={...o,...l},a()},dispose:()=>{s.remove()}}};var Vo=(e)=>{let r=e.trim();return r.startsWith("/")||/^[A-Za-z]:[\\/]/.test(r)},ge=(e,r={})=>{let o=e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/");if(o.length>1&&o.endsWith("/"))o=o.replace(/\/+$/,"");if(o==="")o=e.trim().startsWith("/")?"/":"";return r.caseInsensitive?o.toLowerCase():o},Ee=(e,r,o={})=>ge(e,o)===ge(r,o);var Ho="default",be=()=>({version:1,activeId:Ho,profiles:[{id:Ho,name:"Default",folders:[]}]});var Xo=(e,r,o)=>{if(!e.profiles.some((s)=>s.id===r))throw Error(`Unknown profile: ${r}`);return{...e,profiles:e.profiles.map((s)=>s.id===r?o(s):s)}};var Fo=(e,r)=>{if(!e.profiles.some((o)=>o.id===r))throw Error(`Unknown profile: ${r}`);return{...e,activeId:r}},$o=(e,r,o)=>{if(!Vo(o))throw Error("Folder path must be absolute");let s=ge(o);return Xo(e,r,(i)=>i.folders.some((a)=>Ee(a,s))?i:{...i,folders:[...i.folders,s]})},Bo=(e,r,o)=>Xo(e,r,(s)=>({...s,folders:s.folders.filter((i)=>!Ee(i,o))}));var Ko="profiles.v1",jo=(e)=>typeof e==="object"&&e!==null&&!Array.isArray(e),Ir=(e)=>{if(!jo(e)||typeof e.id!=="string"||!e.id||typeof e.name!=="string"||!Array.isArray(e.folders))return null;if(!e.folders.every((s)=>typeof s==="string"))return null;let r=new Set,o=[];for(let s of e.folders){let i=ge(s);if(i&&!r.has(i))r.add(i),o.push(i)}return{id:e.id,name:e.name,folders:o}},Cr=(e)=>{if(e===void 0)return{state:be(),corrupt:!1};if(!jo(e)||e.version!==1||!Array.isArray(e.profiles))return{state:be(),corrupt:!0};let r=e.profiles.map(Ir),o=r.filter((a)=>a!==null),s=new Set(o.map((a)=>a.id));if(o.length===0||r.length!==o.length||s.size!==o.length)return{state:be(),corrupt:!0};return{state:{version:1,activeId:typeof e.activeId==="string"&&s.has(e.activeId)?e.activeId:o[0].id,profiles:o},corrupt:!1}},zo=async(e)=>Cr(await e.get(Ko)),Wo=(e,r)=>e.set(Ko,r);var Jo=20,yr=["waiting-permission","waiting-question"],vr=["running","retrying"],kr=(e)=>{if(e.some((r)=>yr.includes(r.activity)))return"waiting";if(e.some((r)=>vr.includes(r.activity)))return"running";return"idle"},Ur=(e,r)=>{for(let o of r.projects)if(Ee(e,o.directory))return{project:o,via:"project"};for(let o of r.projects)if((r.worktrees[o.id]??[]).some((s)=>Ee(e,s.directory)))return{project:o,via:"worktree"};return null},Nr=(e,r)=>{let o=Ur(e,r);if(!o)return{path:e,kind:"not-added",project:null,sessions:[],hiddenSessions:0,attention:"idle"};let s=(r.sessions[o.project.id]??[]).filter((i)=>!i.parentId&&!i.archivedAt).filter((i)=>o.via==="project"||Ee(i.directory,e)).sort((i,a)=>a.updatedAt-i.updatedAt);return{path:e,kind:"registered",project:{id:o.project.id,name:o.project.name},sessions:s.slice(0,Jo).map(({id:i,title:a,updatedAt:l,activity:p})=>({id:i,title:a,updatedAt:l,activity:p})),hiddenSessions:Math.max(0,s.length-Jo),attention:kr(s)}},Mr=(e)=>{let r=e.state.profiles.flatMap((o)=>o.folders);return e.projects.filter((o)=>{let s=[o.directory,...(e.worktrees[o.id]??[]).map((i)=>i.directory)];return!r.some((i)=>s.some((a)=>Ee(i,a)))}).map((o)=>({projectId:o.id,name:o.name,path:o.directory}))},Yo=(e)=>{let{state:r}=e,o=r.profiles.find((s)=>s.id===r.activeId)??r.profiles[0];return{profiles:r.profiles.map((s)=>({id:s.id,name:s.name,folderCount:s.folders.length,active:s.id===o.id})),activeProfile:{id:o.id,name:o.name,folders:o.folders.map((s)=>Nr(s,e))},unassigned:Mr(e)}};var wr=31,Qo=(e)=>e instanceof Error?e.message:String(e),Zo=(e)=>{let r=be(),o=!1,s=!1,i=[],a="loading",l={},p={},S,x=!1,I=new Map,h=null,m=new Set,k,P=()=>{let u=Yo({state:r,projects:i,worktrees:l,sessions:p}),O="ready",f;if(S)O="error",f=S;else if(!s||a==="loading")O="loading";else if(a==="error"&&i.length===0)O="error",f="Could not load projects from OpenChamber.";return{status:O,error:f,corrupt:o,vm:u}},M=()=>{k=P(),ee();for(let u of m)u()},ee=()=>{let u=new Set;for(let O of k.vm.activeProfile.folders){if(O.project)u.add(O.project.id);if(u.size>=wr)break}for(let[O,f]of I)if(!u.has(O))f(),I.delete(O),delete p[O];for(let O of u){if(I.has(O))continue;I.set(O,()=>{}),e.onSessions(O,(f)=>{p={...p,[O]:f.sessions},M()}).then((f)=>{if(x||!I.has(O))f();else I.set(O,f)}).catch((f)=>{I.delete(O),console.error("sessions subscription failed",O,f)})}},Z=async(u)=>{let O=await Promise.all(u.map(async(f)=>{try{return[f.id,(await e.listWorktrees(f.id)).worktrees]}catch{return[f.id,[]]}}));if(x)return;l=Object.fromEntries(O),M()},F=Promise.resolve(),te=(u)=>{r=u,o=!1,M(),F=F.then(()=>Wo(e.storage,r)).catch((O)=>{e.toast({kind:"error",message:`Could not save profiles: ${Qo(O)}`})})};return k=P(),(async()=>{try{let u=await zo(e.storage);r=u.state,o=u.corrupt,s=!0,M();let O=await e.onProjects((f)=>{i=f.projects,a=f.state,M(),Z(i)});if(x)O();else h=O}catch(u){S=Qo(u),M()}})(),{get:()=>k,subscribe(u){return m.add(u),()=>m.delete(u)},selectProfile:(u)=>te(Fo(r,u)),addToActiveProfile:(u)=>te($o(r,r.activeId,u)),removeFolder:(u)=>te(Bo(r,r.activeId,u)),dispose(){x=!0,h?.();for(let u of I.values())u();I.clear(),m.clear()}}};var qo=`
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

.oc-profiles-sidebar-reserved {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 2px;
}

.oc-profiles-sidebar-reserved-hint {
  font-size: 0.7rem;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  padding: 0 8px;
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
  gap: 4px;
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
}
`;var Pr=(e)=>{let r=e.replace(/[\\/]+$/,""),o=Math.max(r.lastIndexOf("/"),r.lastIndexOf("\\"));if(o>=0)return r.slice(o+1)||e;return e},Lr=(e,r=Date.now())=>{let o=Math.max(0,r-e),s=Math.floor(o/1000);if(s<60)return"just now";let i=Math.floor(s/60);if(i<60)return`${i}m ago`;let a=Math.floor(i/60);if(a<24)return`${a}h ago`;let l=Math.floor(a/24);if(l<30)return`${l}d ago`;let p=Math.floor(l/30);if(p<12)return`${p}mo ago`;return`${Math.floor(l/365)}y ago`},Dr=(e)=>{switch(e){case"waiting-permission":return{label:"waiting for permission",tone:"warning"};case"waiting-question":return{label:"waiting for answer",tone:"warning"};case"running":return{label:"running",tone:"info"};case"retrying":return{label:"retrying",tone:"warning"};case"idle":case"unknown":default:return{label:"idle",tone:"neutral"}}},Gr=(e)=>{let o=document.getElementById("oc-profiles-view-style");if(!o)o=document.createElement("style"),o.id="oc-profiles-view-style",document.head.appendChild(o);if(o.textContent!==e)o.textContent=e},Vr=(e,r)=>{let o=document.createElement("div");o.className="oc-profiles-folder-card";let s=document.createElement("div");s.className="oc-profiles-folder-header";let i=document.createElement("div");i.className="oc-profiles-folder-meta";let a=document.createElement("div");a.className="oc-profiles-folder-title-row";let l=document.createElement("span");l.className="oc-profiles-status-dot";let p=document.createElement("span");p.className="oc-profiles-folder-basename",a.appendChild(l),a.appendChild(p);let S=document.createElement("span");S.className="oc-profiles-folder-path",i.appendChild(a),i.appendChild(S);let x=document.createElement("div");x.className="oc-profiles-folder-actions";let I=ce(x,{label:"Remove",variant:"ghost",size:"xs",onClick:()=>r.removeFolder(e.path)});s.appendChild(i),s.appendChild(x),o.appendChild(s);let h=document.createElement("div");h.className="oc-profiles-not-added-callout";let m=document.createElement("span");m.className="oc-profiles-not-added-icon",m.textContent="ℹ";let k=document.createElement("span");k.textContent="Add this folder as a project in the sidebar once",h.appendChild(m),h.appendChild(k);let P=document.createElement("div");P.className="oc-profiles-sessions-container";let M=document.createElement("div");M.className="oc-profiles-sessions-empty",M.textContent="No sessions yet";let ee=document.createElement("div");ee.className="oc-profiles-sessions-list";let Z=document.createElement("div");Z.className="oc-profiles-sessions-more",P.appendChild(M),P.appendChild(ee),P.appendChild(Z);let F=[],te=(u,O)=>{if(l.dataset.status=u.attention,l.setAttribute("title",`Status: ${u.attention}`),l.setAttribute("aria-label",`Status: ${u.attention}`),p.textContent=Pr(u.path),p.title=u.path,S.textContent=u.path,S.title=u.path,I.update({onClick:()=>O.removeFolder(u.path)}),u.kind==="not-added"){if(!h.parentElement)o.appendChild(h);if(P.parentElement)P.remove()}else{if(h.parentElement)h.remove();if(!P.parentElement)o.appendChild(P);if(u.sessions.length===0)M.style.display="",ee.style.display="none",Z.style.display="none";else{M.style.display="none",ee.style.display="";while(F.length<u.sessions.length){let f=document.createElement("div");f.className="oc-profiles-session-row";let J=document.createElement("div");J.className="oc-profiles-session-lead";let L=document.createElement("span");L.className="oc-profiles-session-title",J.appendChild(L);let U=document.createElement("span");J.appendChild(U);let D=Vt(U,{label:"",tone:"neutral"}),N=document.createElement("div");N.className="oc-profiles-session-trail";let c=document.createElement("span");N.appendChild(c);let d=document.createElement("div");d.className="oc-profiles-session-actions",d.setAttribute("aria-hidden","true"),N.appendChild(d),f.appendChild(J),f.appendChild(N),ee.appendChild(f),F.push({element:f,titleEl:L,badgeHandle:D,timeEl:c})}while(F.length>u.sessions.length){let f=F.pop();f.badgeHandle.dispose(),f.element.remove()}if(u.sessions.forEach((f,J)=>{let L=F[J];L.titleEl.textContent=f.title||"Untitled session",L.titleEl.title=f.title||"Untitled session";let U=Dr(f.activity);L.badgeHandle.update({label:U.label,tone:U.tone}),L.timeEl.textContent=Lr(f.updatedAt)}),u.hiddenSessions>0)Z.style.display="",Z.textContent=`+${u.hiddenSessions} more`;else Z.style.display="none"}}};return te(e,r),{element:o,update:te,dispose:()=>{I.dispose();for(let u of F)u.badgeHandle.dispose();F=[],o.remove()}}},Hr=(e,r,o)=>{let s=document.createElement("div");s.className="oc-profiles-unassigned-card";let i=document.createElement("div");i.className="oc-profiles-unassigned-info";let a=document.createElement("span");a.className="oc-profiles-unassigned-name";let l=document.createElement("span");l.className="oc-profiles-unassigned-path",i.appendChild(a),i.appendChild(l);let p=document.createElement("div");p.className="oc-profiles-unassigned-actions";let S=ce(p,{label:`Add to ${r}`,variant:"secondary",size:"sm",onClick:()=>o.addToActiveProfile(e.path)});s.appendChild(i),s.appendChild(p);let x=(I,h,m)=>{a.textContent=I.name,l.textContent=I.path,l.title=I.path,S.update({label:`Add to ${h}`,onClick:()=>m.addToActiveProfile(I.path)})};return x(e,r,o),{element:s,update:x,dispose:()=>{S.dispose(),s.remove()}}},er=(e)=>{Gr(qo);let r=null,o=null,s={kind:"profile"};while(e.firstChild)e.removeChild(e.firstChild);let i=document.createElement("div");i.className="oc-profiles-app oc-sdk",e.appendChild(i);let a=document.createElement("aside");a.className="oc-profiles-sidebar",i.appendChild(a);let l=document.createElement("div");l.className="oc-profiles-sidebar-header",l.textContent="Profiles",a.appendChild(l);let p=document.createElement("div");p.className="oc-profiles-sidebar-section",a.appendChild(p);let S=Je(p,{items:[],ariaLabel:"Profiles",onSelect:(C)=>{if(s={kind:"profile"},o?.selectProfile(C),r&&o)d(r,o)}}),x=document.createElement("div");x.className="oc-profiles-sidebar-reserved",a.appendChild(x);let I=ce(x,{label:"+ New profile",variant:"ghost",size:"sm",disabled:!0,onClick:()=>{}}),h=document.createElement("span");h.className="oc-profiles-sidebar-reserved-hint",h.textContent="New profile coming in M4",x.appendChild(h);let m=document.createElement("div");a.appendChild(m);let k=Xt(m,{label:"Library"}),P=document.createElement("div");P.className="oc-profiles-sidebar-section",a.appendChild(P);let M=Je(P,{items:[],ariaLabel:"Unassigned library",onSelect:()=>{if(s={kind:"unassigned"},r&&o)d(r,o)}}),ee=document.createElement("main");ee.className="oc-profiles-main",i.appendChild(ee);let Z=document.createElement("header");Z.className="oc-profiles-main-header";let F=document.createElement("h1");F.className="oc-profiles-main-title";let te=document.createElement("p");te.className="oc-profiles-main-subtitle",Z.appendChild(F),Z.appendChild(te),ee.appendChild(Z);let u=document.createElement("div");u.className="oc-profiles-banner-slot",ee.appendChild(u);let O=document.createElement("section");O.className="oc-profiles-content",ee.appendChild(O);let f=null,J=null,L=null,U=null,D=null,N=new Map,c=new Map,d=(C,ie)=>{if(r=C,o=ie,C.corrupt)if(!f)f=Qe(u,{tone:"warning",title:"Profiles read warning",body:"Saved profiles couldn't be read. Showing defaults; nothing is overwritten until you make a change."});else f.update({body:"Saved profiles couldn't be read. Showing defaults; nothing is overwritten until you make a change."});else if(f)f.dispose(),f=null;if(C.status==="error"){let G=C.error||"An unexpected error occurred loading profiles.";if(!J)J=Qe(u,{tone:"error",title:"Unable to load profiles",body:G});else J.update({body:G})}else if(J)J.dispose(),J=null;let _e=C.vm.profiles.map((G)=>({id:G.id,title:G.name,meta:G.folderCount===1?"1 folder":`${G.folderCount} folders`,badge:G.active?{label:"active",tone:"primary"}:void 0}));if(S.update({items:_e,selectedId:s.kind==="profile"?C.vm.activeProfile.id:null}),M.update({items:[{id:"unassigned",title:"Unassigned",meta:String(C.vm.unassigned.length)}],selectedId:s.kind==="unassigned"?"unassigned":null}),C.status==="loading"){if(!L)L=Ht(O,{label:"Loading profiles and projects…"});for(let G of N.values())G.element.style.display="none";for(let G of c.values())G.element.style.display="none";if(U)U.dispose(),U=null;if(D)D.dispose(),D=null;F.textContent="Loading…",te.textContent="";return}if(L)L.dispose(),L=null;if(s.kind==="profile"){let G=C.vm.activeProfile;F.textContent=G.name;let ne=G.folders.length;te.textContent=`${ne} ${ne===1?"project folder":"project folders"}`;for(let y of c.values())y.dispose();if(c.clear(),D)D.dispose(),D=null;if(ne===0){for(let X of N.values())X.dispose();N.clear();let y={title:"No folders yet",body:"Add some from Unassigned.",action:C.vm.unassigned.length>0?{label:"View Unassigned",onClick:()=>{s={kind:"unassigned"},d(C,ie)}}:void 0};if(!U)U=Ye(O,y);else U.update(y)}else{if(U)U.dispose(),U=null;let y=new Set(G.folders.map((X)=>X.path));for(let[X,v]of N)if(!y.has(X))v.dispose(),N.delete(X);for(let X of G.folders){let v=N.get(X.path);if(!v)v=Vr(X,ie),N.set(X.path,v);else v.element.style.display="",v.update(X,ie);O.appendChild(v.element)}}return}if(s.kind==="unassigned"){F.textContent="Unassigned projects";let G=C.vm.unassigned.length;te.textContent=`Projects in OpenChamber not included in any profile (${G})`;for(let ne of N.values())ne.dispose();if(N.clear(),U)U.dispose(),U=null;if(G===0){for(let y of c.values())y.dispose();c.clear();let ne={title:"Every project is in a profile.",body:"All registered projects in OpenChamber belong to at least one profile."};if(!D)D=Ye(O,ne);else D.update(ne)}else{if(D)D.dispose(),D=null;let ne=new Set(C.vm.unassigned.map((y)=>y.path));for(let[y,X]of c)if(!ne.has(y))X.dispose(),c.delete(y);for(let y of C.vm.unassigned){let X=c.get(y.path);if(!X)X=Hr(y,C.vm.activeProfile.name,ie),c.set(y.path,X);else X.element.style.display="",X.update(y,C.vm.activeProfile.name,ie);O.appendChild(X.element)}}}};return{render:d,dispose:()=>{if(S.dispose(),I.dispose(),k.dispose(),M.dispose(),f)f.dispose(),f=null;if(J)J.dispose(),J=null;if(L)L.dispose(),L=null;if(U)U.dispose(),U=null;if(D)D.dispose(),D=null;for(let C of N.values())C.dispose();N.clear();for(let C of c.values())C.dispose();c.clear(),i.remove()}}};var tr=yt(),or=document.getElementById("app");if(!or)throw Error("Missing #app");var Xr=er(or),Ce=Zo(tr),Fr={selectProfile:(e)=>Ce.selectProfile(e),addToActiveProfile:(e)=>Ce.addToActiveProfile(e),removeFolder:(e)=>Ce.removeFolder(e)},rr=()=>Xr.render(Ce.get(),Fr);tr.onReady((e)=>vt(e,document.documentElement));Ce.subscribe(rr);rr();})();
