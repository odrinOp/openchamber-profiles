(()=>{var U="openchamber.sdk",w=1;var Xt=`
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
`;function Ft(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let t=new WeakMap;e.addEventListener("scroll",(n)=>{let s=n.target===e?o:n.target;if(!(s instanceof Element))return;if(!s.hasAttribute("data-oc-scrolling"))s.setAttribute("data-oc-scrolling","");let a=t.get(s);if(a!==void 0)clearTimeout(a);t.set(s,setTimeout(()=>{t.delete(s),s.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var en=`(${Ft.toString()})(document);`;var Bt=128,$t=65536;var St=128;var mt=65536;var $o=/^[a-z][a-z0-9-]{0,39}$/;var Xo=(e)=>Object(e)===e&&!Array.isArray(e),jt=(e,o)=>Object.keys(e).every((t)=>o.includes(t)),Fo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Bo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,jo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let t of e){if(!Xo(t)||!$o.test(t.id)||!Fo(t.label))return!1;if(t.disabled!==void 0&&t.disabled!==!0&&t.disabled!==!1)return!1;if(o.has(t.id))return!1;if(o.add(t.id),t.kind==="button"){if(!jt(t,["kind","id","label","disabled"]))return!1;continue}if(t.kind!=="select"||!jt(t,["kind","id","label","value","options","disabled"]))return!1;if(!Bo(t.value)||!Array.isArray(t.options)||t.options.length<1||t.options.length>16)return!1;let n=new Set;for(let s of t.options){if(!Xo(s)||!jt(s,["value","label"])||!Bo(s.value)||!Fo(s.label)||n.has(s.value))return!1;n.add(s.value)}if(!n.has(t.value))return!1}return!0};var Ko=["{id}","{segment}","{segments+}"];var Yn=new Set(Ko);var zo=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var qn=new Set(zo);var Tt=20000000,ht=256;var Kt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Wo=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let t=0;t<e.bytes.byteLength;t+=1)if(e.bytes[t]!==o.bytes[t])return!1;return!0};var Jo=/^[A-Za-z0-9_-]{1,80}$/;var Qo=["left","right","top","bottom"];var Yo=(e,o=0,t={remaining:16000})=>{if(--t.remaining<0||o>=32)return!1;if(e===null)return!0;let n=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let s of n)if(!Yo(s,o+1,t))return!1;return!0},zt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(zt);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(zt)}return String(e)===e||Number.isFinite(e)},Wt=(e)=>{try{if(String(e.id)!==e.id||!Jo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Qo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Yo(e.data)||!zt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Qt=2000;var qo=["file","directory","other","missing"],Yt=(e)=>Boolean(e&&"sessionId"in e),Zt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var er=/^[0-9a-f]{7,64}$/i,qt=(e)=>er.test(e),gt=500,Ot=32000,tr=16000,or=128,rr=200,nr=2000,sr=16000,ir=80,ar=200,cr=16000;var lr=2000;var eo=20000,xt=1024,At=2000000;var Rt=64000,bt=8000,to=4000;var oo=960000;var dr=999,pr=1e4,ct=500,ur=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],fr=["stopped","starting","ready","failed"],on=new Set(ur),Er=(e)=>on.has(e),_r=(e)=>e&&Er(e)?e:"HOST_REJECTED",et=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(et);if(Object(e)===e)return Object.values(e).every(et);return!1},Sr=(e)=>et(e)&&JSON.stringify(e).length<=cr,Zo=(e)=>e?.trim().slice(0,ar)??"",tt=(e)=>{let o=e.id.trim().slice(0,or),t=e.title.trim().slice(0,rr),n=e.url.trim().slice(0,nr),s=e.text?.trim().slice(0,sr),a=e.author?.trim().slice(0,ir),c=e.kind==="pull"?"pull":"issue",d={providerId:e.providerId.trim(),id:o,title:t||o,url:n,kind:c};if(s)d.text=s;if(a)d.author=a;if(c==="pull"){let u=Zo(e.branches?.head),m=Zo(e.branches?.base);if(u&&m)d.branches={head:u,base:m}}if(Sr(e.data))d.data=e.data;return d},ro=(e)=>{let o=tt(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},no=(e)=>{let o={text:e.text.trim().slice(0,tr)};if(e.send)o.send=!0;return o},so=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(dr,Math.max(0,Math.round(e)))},io=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(pr,Math.max(0,Math.ceil(e)))};var ot=(e)=>e.length>0&&e.length<=xt&&!e.includes("\x00")&&!e.includes("\\");var yt=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>lr)return!1;return!e.split("/").some((t)=>t==="."||t==="..")},rn=new Set(fr),ao=(e)=>Boolean(e&&"status"in e&&rn.has(String(e.status))&&!("body"in e)),vt=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),co=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),lo=(e)=>Boolean(e&&"written"in e&&e.written===!0),po=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),nn=new Set(qo),uo=(e)=>Boolean(e&&"kind"in e&&"size"in e&&nn.has(String(e.kind))&&Number.isFinite(e.size)),fo=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),sn=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),an=(e)=>Object(e)===e?e:null,Jt=(e)=>String(e)===e&&e.length>0,cn=(e)=>{if(!Jt(e.id))return null;if(e.ok===!0){let o={channel:U,v:w,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&Jt(e.error))return{channel:U,v:w,type:"result",id:e.id,ok:!1,error:e.error,code:_r(Jt(e.code)?e.code:void 0)};return null},Eo=(e)=>{let o=an(e);if(!o||o.channel!==U||o.v!==w)return null;if(o.type==="result")return cn(o);if(!sn.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var mr=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),ln=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class b extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Tr=()=>Promise.reject(new b("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Ct=()=>Promise.reject(new b("BAD_PATH",`File path must be 1 to ${xt} characters without NUL or backslash.`)),It=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new b("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},y=(e)=>(e.value+=1,`oc-${e.value}`),_o=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new b("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let t=e.acceptSource??((r)=>r===o.parent),n=e.requestTimeoutMs??eo,s=new Set,a=new Set,c=new Set,d=new Set,u=new Set,m=new Set,E=new Set,O=new Set,R=new Set,T=new Set,C=new Set,I=new Set,D=[],k=null,j=null,te=new Set,ie=new Set,ne=null,J=null,_=!1,S=new Map,h=new Map,ee=new Map,Q=!1,l={value:0},p=null,ce=null,M=!1,Oe=!1,Ve=null,ve=(r)=>{if(!r)return null;return{sessionId:r.id,phase:r.busy?"started":"completed"}},P=(r)=>{o.parent.postMessage(r,"*")},le=()=>{if(Q||o.parent===o||I.size===0||p?.features?.lateGenerateResults!==!0)return;P({channel:U,v:w,type:"generate-late-listen"})},v=(r,i)=>{for(let g of r)try{g(i)}catch(A){console.error(A)}},_e=(r)=>{if(!(r instanceof MessageEvent))return;if(!t(r.source))return;let i=Eo(r.data);if(!i)return;if(i.type==="workspace"){let A=h.get(i.payload.subscriptionId);if(A)v([A],i.payload.snapshot);return}if(i.type==="shells"){let A=ee.get(i.payload.subscriptionId);if(A)v([A],i.payload.snapshot);return}if(i.type==="ready"){if(p=i.payload,ce=ve(i.payload.session),v(s,i.payload),v(a,i.payload.directory),v(c,i.payload.session),ce)v(d,ce);if(v(u,i.payload.connection),v(m,i.payload.settings),v(E,i.payload.item),i.payload.block)v(O,i.payload.block);le();return}if(i.type==="service-event"){v(R,i.payload);return}if(i.type==="generate-late"){if(I.size===0)D.push(i.payload);else v(I,i.payload);return}if(i.type==="directory"){if(p)p={...p,directory:i.payload.directory};v(a,i.payload.directory);return}if(i.type==="session"){if(p)p={...p,session:i.payload.session};if(!i.payload.session)ce=null;else if(ce?.sessionId!==i.payload.session.id)ce=ve(i.payload.session);v(c,i.payload.session);return}if(i.type==="session-lifecycle"){ce=i.payload,v(d,i.payload);return}if(i.type==="connection"){if(p)p={...p,connection:i.payload.connection};v(u,i.payload.connection);return}if(i.type==="settings"){if(p)p={...p,settings:i.payload.settings};v(m,i.payload.settings);return}if(i.type==="item"){if(p)p={...p,item:i.payload.item};v(E,i.payload.item);return}if(i.type==="status-control-event"){v(T,i.payload);return}if(i.type==="popover-closed"){v(C,i.payload);return}if(i.type==="action"){let A=(V)=>{if(!Q)P({channel:U,v:w,type:"action-result",id:i.id,payload:V})},G=j;if(!G){A({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>G(i.payload)).then(()=>A({ok:!0}),(V)=>{let X=(V instanceof Error?V.message:String(V)).trim();A({ok:!1,error:(X||"Action failed.").slice(0,ct)})});return}if(i.type==="file-open"){let A=i.payload;if(J&&Wo(J,A))return;J=A,v(te,i.payload);return}if(i.type==="file-saved"){v(ie,i.payload.version);return}if(i.type==="file-snapshot"){let A=(X)=>{if(!Q)P({channel:U,v:w,type:"file-snapshot-result",id:i.id,payload:X})},G=(X)=>A({error:(X.trim()||"Could not read the edited file.").slice(0,ct)}),V=ne;if(!V){G("This extension does not edit files.");return}Promise.resolve().then(()=>V(i.payload.purpose)).then((X)=>{if(Kt(X)>Tt){G(`The file is over ${Tt} ${"bytes"in X?"bytes":"characters"}.`);return}if(X.version.length>ht){G(`The snapshot version is over ${ht} characters.`);return}A({snapshot:"bytes"in X?{bytes:X.bytes,version:X.version}:{content:X.content,version:X.version}})},(X)=>G(X instanceof Error?X.message:String(X)));return}if(i.type==="resolve"){let A=(V)=>{P({channel:U,v:w,type:"resolve-result",id:i.id,payload:V})},G=k;if(!G){A({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>G(i.payload)).then((V)=>A({item:V?tt(V):null}),(V)=>{let X=(V instanceof Error?V.message:String(V)).trim();A({error:(X||"Command failed.").slice(0,ct)})});return}let g=S.get(i.id);if(!g)return;if(clearTimeout(g.timer),S.delete(i.id),i.ok){g.resolve(i.payload);return}g.reject(new b(i.code,i.error))};o.addEventListener("message",_e),P({channel:U,v:w,type:"hello"});let Y=(r,i=n)=>{if(Q||o.parent===o)return Promise.reject(new b("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((g,A)=>{let G=setTimeout(()=>{S.delete(r.id),A(new b("HOST_TIMEOUT","Host did not answer in time."))},i);S.set(r.id,{resolve:g,reject:A,timer:G}),P(r)})},N=(r)=>Y(r).then(()=>{return}),L={channel:U,v:w},se=(r)=>{if(!Q&&o.parent!==o)P(r)},Se=()=>se({...L,type:"file-save"}),Xe=(r)=>{if(!mr(r)||!ln(r))return;r.preventDefault(),Se()},Fe=(r)=>{if(!mr(r)||r.key!=="Escape"||p?.surface!=="popover"||!p.popover)return;r.preventDefault(),$e(p.popover.id,"escape").catch(()=>{return})},Ne=()=>{let r=p?.surface==="popover"?p.popover:void 0;if(!r)return;let i=M||Oe;if(Ve===i)return;Ve=i,pt(r.id,i).catch(()=>{return})},Ye=()=>{if(p?.surface!=="popover"||M)return;M=!0,Ne()},he=(r)=>{if(p?.surface!=="popover"||r.relatedTarget!==null||!M)return;M=!1,Ne()},st=()=>{if(p?.surface!=="popover"||Oe)return;Oe=!0,Ne()},Ze=()=>{if(p?.surface!=="popover"||!Oe)return;Oe=!1,Ne()},de=(r,i=1024)=>{if(!r.trim()||r.length>i)throw new b("HOST_REJECTED",`Identity must contain 1 to ${i} characters.`)},Be=async(r)=>{if(r.kind!=="projects")de(r.projectId);let i=await Y({...L,type:"workspace-read",id:y(l),payload:r});if(!i||!("kind"in i)||!("state"in i)||i.kind!==r.kind)throw new b("HOST_REJECTED","Host did not return workspace data.");return i},Ce=async(r,i)=>{if(r.kind!=="projects")de(r.projectId);let g=y(l);h.set(g,i);try{await N({...L,type:"workspace-subscribe",id:y(l),payload:{subscriptionId:g,query:r}})}catch(A){if(h.delete(g),!Q)P({...L,type:"workspace-unsubscribe",id:y(l),payload:{subscriptionId:g}});throw A}return()=>{if(!h.delete(g)||Q)return;P({...L,type:"workspace-unsubscribe",id:y(l),payload:{subscriptionId:g}})}},be=async(r,i)=>{if(r.kind==="session")de(r.sessionId);if(r.kind==="project")de(r.projectId);let g=y(l);ee.set(g,i);try{await N({...L,type:"shells-subscribe",id:y(l),payload:{subscriptionId:g,scope:r}})}catch(A){if(ee.delete(g),!Q)P({...L,type:"shells-unsubscribe",id:y(l),payload:{subscriptionId:g}});throw A}return()=>{if(!ee.delete(g)||Q)return;P({...L,type:"shells-unsubscribe",id:y(l),payload:{subscriptionId:g}})}},Me=async(r)=>{if("key"in r&&(r.key.length===0||r.key.length>Bt))throw new b("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(r.op==="set"&&!et(r.value))throw new b("HOST_REJECTED","Storage values must be JSON.");if(r.op==="set"&&new TextEncoder().encode(JSON.stringify(r.value)).length>$t)throw new b("HOST_REJECTED","Storage value exceeds 64 KiB.");if(r.scope==="device"&&p?.features?.deviceStorage!==!0)throw new b("UNSUPPORTED","This host does not support device storage.");let i=await Y({...L,type:"storage",id:y(l),payload:r});if(!i||!("storage"in i)||i.op!==r.op)throw new b("HOST_REJECTED","Host did not return storage data.");return i},$e=(r,i)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===r)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):N({...L,type:"popover-close",id:y(l),payload:i?{id:r,reason:i}:{id:r}}),pt=(r,i)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===r)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):N({...L,type:"popover-anchor",id:y(l),payload:{id:r,active:i}});return o.addEventListener("keydown",Fe,!0),o.addEventListener("pointerover",Ye),o.addEventListener("pointermove",Ye),o.addEventListener("pointerout",he),o.addEventListener("focus",st),o.addEventListener("blur",Ze),{onAction:(r)=>(j=r,()=>{if(j===r)j=null}),listProjects:async()=>{let r=await Be({kind:"projects"});if(r.kind!=="projects")throw new b("HOST_REJECTED","Expected projects.");return r},listWorktrees:async(r)=>{let i=await Be({kind:"worktrees",projectId:r});if(i.kind!=="worktrees")throw new b("HOST_REJECTED","Expected worktrees.");return i},listSessions:async(r)=>{let i=await Be({kind:"sessions",projectId:r});if(i.kind!=="sessions")throw new b("HOST_REJECTED","Expected sessions.");return i},onProjects:(r)=>Ce({kind:"projects"},(i)=>{if(i.kind==="projects")r(i)}),onWorktrees:(r,i)=>Ce({kind:"worktrees",projectId:r},(g)=>{if(g.kind==="worktrees")i(g)}),onSessions:(r,i)=>Ce({kind:"sessions",projectId:r},(g)=>{if(g.kind==="sessions")i(g)}),onRunningShells:(r,i)=>be(r,i),readShellOutput:async(r,i)=>{de(r,St);let g=i?.cursor;if(g!==void 0&&(!Number.isInteger(g)||g<0))throw new b("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let A=i?.tailBytes;if(A!==void 0&&(!Number.isInteger(A)||A<1||A>mt))throw new b("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${mt}.`);let V=await Y({...L,type:"shell-output",id:y(l),payload:{shellId:r,cursor:g,tailBytes:A}});if(!V||typeof V.output!=="string"||!Number.isFinite(V.cursor))throw new b("HOST_REJECTED","Host did not return shell output.");return V},stopShell:async(r)=>{if(de(r,St),(await Y({...L,type:"shell-stop",id:y(l),payload:{shellId:r}}))?.stopped!==!0)throw new b("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(r)=>{de(r),await N({...L,type:"open-session",id:y(l),payload:{sessionId:r}})},storage:{get:async(r,i)=>{let g=It(i),A={op:"get",key:r};if(g)A.scope=g;let G=await Me(A);return G.op==="get"&&G.found?G.value:void 0},set:async(r,i,g)=>{let A=It(g),G={op:"set",key:r,value:i};if(A)G.scope=A;await Me(G)},delete:async(r,i)=>{let g=It(i),A={op:"delete",key:r};if(g)A.scope=g;await Me(A)},keys:async(r)=>{let i=It(r),g={op:"keys"};if(i)g.scope=i;let A=await Me(g);if(A.op!=="keys")throw new b("HOST_REJECTED","Expected storage keys.");return A.keys}},onReady:(r)=>{if(s.add(r),p)r(p);return()=>{s.delete(r)}},onDirectory:(r)=>{if(a.add(r),p)r(p.directory);return()=>{a.delete(r)}},onSession:(r)=>{if(c.add(r),p)r(p.session);return()=>{c.delete(r)}},onSessionLifecycle:(r)=>{if(d.add(r),ce)r(ce);return()=>{d.delete(r)}},onConnection:(r)=>{if(u.add(r),p)r(p.connection);return()=>{u.delete(r)}},onSettings:(r)=>{if(m.add(r),p)r(p.settings);return()=>{m.delete(r)}},onItem:(r)=>{if(E.add(r),p)r(p.item);return()=>{E.delete(r)}},onBlock:(r)=>{if(O.add(r),p?.block)r(p.block);return()=>{O.delete(r)}},onServiceEvent:(r)=>(R.add(r),()=>{R.delete(r)}),onStatusControl:(r)=>(T.add(r),()=>{T.delete(r)}),onPopoverClosed:(r)=>(C.add(r),()=>{C.delete(r)}),setStatusControls:(r)=>{if(p?.features?.statusControls!==!0)return Promise.reject(new b("UNSUPPORTED","This host does not support status controls."));if(!jo(r))return Promise.reject(new b("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return N({...L,type:"status-controls",id:y(l),payload:{controls:r}})},openPopover:(r)=>{if(p?.features?.popovers!==!0)return Promise.reject(new b("UNSUPPORTED","This host does not support popovers."));if(!Wt(r))return Promise.reject(new b("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return N({...L,type:"popover-open",id:y(l),payload:r})},closePopover:$e,setPopoverAnchorActive:pt,onResolve:(r)=>(k=r,()=>{if(k===r)k=null}),toast:(r)=>{let i=r.message.trim();if(!i||i.length>gt)return Promise.reject(new b("HOST_REJECTED",`Toast message must contain 1 to ${gt} characters.`));if(r.copy&&r.copy!==!0&&(!r.copy.text.length||r.copy.text.length>Ot))return Promise.reject(new b("HOST_REJECTED",`Toast copy text must contain 1 to ${Ot} characters.`));return N({channel:U,v:w,type:"toast",id:y(l),payload:{...r,message:i}})},openUrl:(r)=>N({channel:U,v:w,type:"open-url",id:y(l),payload:{url:r}}),openCommit:(r)=>qt(r)?N({channel:U,v:w,type:"open-commit",id:y(l),payload:{sha:r}}):Promise.reject(new b("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(r)=>N({channel:U,v:w,type:"block-answer",id:y(l),payload:{text:r.trim().slice(0,Qt)}}),openSurface:(r)=>N({channel:U,v:w,type:"open-surface",id:y(l),payload:{surfaceId:r}}),writeClipboard:(r)=>N({channel:U,v:w,type:"clipboard-write",id:y(l),payload:{text:r}}),compose:(r)=>N({channel:U,v:w,type:"compose",id:y(l),payload:r}),attach:(r)=>N({channel:U,v:w,type:"attach",id:y(l),payload:tt(r)}),startSession:async(r)=>{if(r.projectId!==void 0)de(r.projectId);let i=r.worktree;if(i&&i!==!0)if(i.kind==="existing")de(i.directory);else{if(i.name!==void 0)de(i.name,200);if(i.baseBranch!==void 0)de(i.baseBranch,200)}let g=await Y({channel:U,v:w,type:"start-session",id:y(l),payload:ro(r)},e.requestTimeoutMs??180000);if(!Yt(g))throw new b("HOST_REJECTED","Host did not return a session.");return g},prompt:(r)=>Y({channel:U,v:w,type:"prompt",id:y(l),payload:no(r)}).then((i)=>{if(!Zt(i))throw new b("HOST_REJECTED","Host did not return a prompt result.");return i}),sessionLink:(r)=>N({channel:U,v:w,type:"session-link",id:y(l),payload:tt(r)}),close:()=>N({channel:U,v:w,type:"close",id:y(l)}),oauthStart:()=>N({channel:U,v:w,type:"oauth-start",id:y(l)}),oauthDisconnect:()=>N({channel:U,v:w,type:"oauth-disconnect",id:y(l)}),request:(r)=>(yt(r.path)?Y({channel:U,v:w,type:"request",id:y(l),payload:r}):Tr()).then((i)=>{if(!vt(i))throw new b("HOST_REJECTED","Host request result was empty.");return i}),serviceRequest:(r)=>(yt(r.path)?Y({channel:U,v:w,type:"service-request",id:y(l),payload:r}):Tr()).then((i)=>{if(!vt(i))throw new b("HOST_REJECTED","Host service request result was empty.");return i}),serviceStatus:()=>Y({channel:U,v:w,type:"service-status",id:y(l)}).then((r)=>{if(!ao(r))throw new b("HOST_REJECTED","Host did not return service status.");return r}),readFile:(r)=>(ot(r)?Y({channel:U,v:w,type:"file-read",id:y(l),payload:{path:r}}):Ct()).then((i)=>{if(!co(i))throw new b("HOST_REJECTED","Host did not return file content.");return i}),writeFile:(r,i)=>{if(!ot(r))return Ct();if(i.length>At)return Promise.reject(new b("FILE_TOO_LARGE",`Content is over ${At} characters.`));return Y({channel:U,v:w,type:"file-write",id:y(l),payload:{path:r,content:i}}).then((g)=>{if(!lo(g))throw new b("HOST_REJECTED","Host did not confirm the write.");return g})},listDir:(r)=>(ot(r)?Y({channel:U,v:w,type:"file-list",id:y(l),payload:{path:r}}):Ct()).then((i)=>{if(!po(i))throw new b("HOST_REJECTED","Host did not return directory entries.");return i}),stat:(r)=>(ot(r)?Y({channel:U,v:w,type:"file-stat",id:y(l),payload:{path:r}}):Ct()).then((i)=>{if(!uo(i))throw new b("HOST_REJECTED","Host did not return file status.");return i}),generate:(r)=>{let i=r.prompt.trim(),g=r.system?.trim();if(i.length===0||i.length>Rt)return Promise.reject(new b("HOST_REJECTED",`Prompt must be 1 to ${Rt} characters.`));if(g!==void 0&&(g.length===0||g.length>bt))return Promise.reject(new b("HOST_REJECTED",`System prompt must be 1 to ${bt} characters.`));let A=r.maxOutputTokens===void 0?void 0:Math.min(to,Math.max(1,Math.floor(r.maxOutputTokens)));if(A!==void 0&&!Number.isFinite(A))return Promise.reject(new b("HOST_REJECTED","maxOutputTokens must be a number."));let G={prompt:i};if(g!==void 0)G.system=g;if(A!==void 0)G.maxOutputTokens=A;return Y({channel:U,v:w,type:"generate",id:y(l),payload:G},e.requestTimeoutMs??oo).then((V)=>{if(!fo(V))throw new b("HOST_REJECTED","Host did not return generated text.");return V})},onLateGenerateResult:(r)=>{I.add(r);for(let i of D.splice(0))v([r],i);return le(),()=>{I.delete(r)}},setBadge:(r)=>N({channel:U,v:w,type:"badge",id:y(l),payload:{count:so(r)}}),setHeight:(r)=>N({channel:U,v:w,type:"resize",id:y(l),payload:{height:io(r)}}),onFileOpen:(r)=>{if(te.add(r),!_)_=!0,o.addEventListener("keydown",Xe,!0);if(J)r(J);return()=>{te.delete(r)}},onFileSnapshot:(r)=>(ne=r,()=>{if(ne===r)ne=null}),onFileSaved:(r)=>(ie.add(r),()=>{ie.delete(r)}),reportFileChange:(r)=>se({...L,type:"file-change",payload:{dirty:r.dirty,edited:r.edited}}),requestFileSave:Se,reportFileUnsupported:()=>se({...L,type:"file-unsupported"}),dispose:()=>{for(let r of h.keys())P({...L,type:"workspace-unsubscribe",id:y(l),payload:{subscriptionId:r}});h.clear();for(let r of ee.keys())P({...L,type:"shells-unsubscribe",id:y(l),payload:{subscriptionId:r}});if(ee.clear(),Q=!0,k=null,j=null,ne=null,te.clear(),ie.clear(),_)o.removeEventListener("keydown",Xe,!0);o.removeEventListener("message",_e),o.removeEventListener("keydown",Fe,!0),o.removeEventListener("pointerover",Ye),o.removeEventListener("pointermove",Ye),o.removeEventListener("pointerout",he),o.removeEventListener("focus",st),o.removeEventListener("blur",Ze);for(let r of S.values())clearTimeout(r.timer),r.reject(new b("HOST_UNAVAILABLE","Host client was disposed."));S.clear(),s.clear(),a.clear(),c.clear(),d.clear(),u.clear(),m.clear(),E.clear(),O.clear(),R.clear(),T.clear(),C.clear(),I.clear(),D.length=0}}};var hr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Es=new Set(hr);var gr=["none","agent","user"];var Ss=new Set(gr);var dn=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],pn=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Or=(e,o)=>{o.style.colorScheme=e.mode;for(let[t,n]of dn)o.style.setProperty(t,e.tokens[n]);for(let[t,n,s]of pn){let a=e.tokens[s]??"";o.style.setProperty(t,a),o.style.setProperty(n,a)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},So=(e,o)=>{if(Or(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};var un={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},K=(e,o)=>`var(--${e}, var(--oc-${un[e]}, ${o}))`,we=K("surface-background","transparent"),Ut=K("surface-elevated","transparent"),rt=K("surface-elevated-foreground","inherit"),me=K("surface-foreground","inherit"),Z=K("surface-muted-foreground","gray"),fn=K("surface-muted","transparent"),Ke=K("interactive-border","currentColor"),Ee=K("interactive-hover","transparent"),ze=K("interactive-active","transparent"),mo=K("interactive-selection","transparent"),To=K("interactive-selection-foreground","inherit"),Ue=K("primary","currentColor"),ho=K("primary-text","inherit"),go=K("error-text","inherit"),En=K("font-sans","inherit"),Oo=K("font-mono","monospace"),br=K("radius","9px"),xo=`calc(${br} - 2px)`,xr=`calc(${br} - 4px)`,q=(e,o,t="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${t})`,Ar=`background-image: linear-gradient(${Ee}, ${Ee});`,Ao=(e,o="0.5px")=>`box-shadow: inset 0 0 0 ${o} ${e}, var(--oc-sdk-field-lift);`,Ro="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Rr="box-shadow: var(--oc-sdk-lit);",bo=`inset 0 0.5px 0 0 ${q(me,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,_n=`
:root {
  --oc-sdk-edge: ${q(me,16)};
  --oc-sdk-field-bg: ${Ut};
  --oc-sdk-raised-bg: ${we};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${q(me,14)};
  --oc-sdk-field-bg: ${q(we,50,Ut)};
  --oc-sdk-raised-bg: ${Ut};
  --oc-sdk-field-lift: ${bo};
  --oc-sdk-raised-lift: ${bo};
  --oc-sdk-lit: ${bo};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,kt=(e)=>{let o=K(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${K(`${e}-text`,"inherit")}; }`},Sn=`
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
`,yr=`${_n}
.oc-sdk { color: ${me}; font-family: ${En}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Ar} }
.oc-sdk-mono { font-family: ${Oo}; }
.oc-sdk-muted { color: ${Z}; }
${kt("success")}${kt("warning")}${kt("error")}${kt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Ue}; --oc-sdk-tone-text: ${ho}; }

.oc-sdk-btn { border-radius: ${xo}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${xr}; }
.oc-sdk-btn[data-variant="default"] { color: ${ho}; background: ${q(Ue,10,we)}; border-color: ${q(Ue,12)}; ${Rr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${q(Ue,16,we)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${q(Ue,22,we)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${fn}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ze}, ${ze}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${rt}; ${Ro} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ze}, ${ze}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${Ee}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ze}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${K("status-error","red")}; color: ${go}; background: ${q("var(--oc-sdk-tone)",7,we)}; border-color: ${q("var(--oc-sdk-tone)",12)}; ${Rr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${q("var(--oc-sdk-tone)",9,we)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${q("var(--oc-sdk-tone)",11,we)}; box-shadow: none; }

.oc-sdk-field-note { color: ${Z}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${go}; }
.oc-sdk-input { border-radius: ${xo}; background: var(--oc-sdk-field-bg); color: ${rt}; ${Ao("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${Z}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Ao(q(me,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Ao(K("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Oo}; }

.oc-sdk-search-icon { color: ${Z}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Ue}; }
.oc-sdk-search-clear { border-radius: ${xr}; color: ${Z}; }
.oc-sdk-search-clear:hover { background: ${Ee}; color: ${me}; }

.oc-sdk-trigger { border-radius: ${xo}; background: var(--oc-sdk-raised-bg); color: ${rt}; ${Ro} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ze}, ${ze}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${Z}; }
.oc-sdk-trigger-chevron { color: ${Z}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${rt}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Ut}; background-clip: padding-box; color: ${rt}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${Ee}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${mo}; color: ${To}; }
.oc-sdk-option-check { color: ${me}; }
.oc-sdk-option[data-destructive="true"] { color: ${go}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${q(K("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${Z}; }
.oc-sdk-popup-empty { color: ${Z}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Ke}; border-radius: 4px; color: ${me}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${q(me,60,Ke)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Ke}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${we}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Ue}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Ar} }
.oc-sdk-check-desc { color: ${Z}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${q(me,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${Z}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${me}; }
.oc-sdk-tab[aria-selected="true"] { color: ${To}; background: ${mo}; border-color: ${Ke}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${rt}; background: var(--oc-sdk-raised-bg); ${Ro} }
.oc-sdk-tab-count { color: ${Z}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${q(me,6)}; color: ${Z}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${q("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${Ee}; }
.oc-sdk-row[aria-selected="true"] { background: ${mo}; color: ${To}; }
.oc-sdk-row-lead { font-family: ${Oo}; color: ${Z}; }
.oc-sdk-row-sub { color: ${Z}; }
.oc-sdk-row-meta { color: ${Z}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${Z}; }

.oc-sdk-empty-body { color: ${Z}; }

.oc-sdk-spinner { color: ${Z}; }
.oc-sdk-spinner-ring { border-color: ${Ke}; border-top-color: ${Ue}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${q("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${Z}; }

.oc-sdk-separator { color: ${Z}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${q(Ke,40)}; }

.oc-sdk-progress-label { color: ${Z}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${q(me,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Ue}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${K("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${K("success-text","inherit")}; }

.oc-sdk-text a { color: ${ho}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${q(Ke,60)}; }
`,F=`
${Xt}
${Sn}
${yr}`;var vr="oc-sdk-ui-style",We=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},B=(e)=>{let o=document.getElementById(vr);if(o instanceof HTMLStyleElement){if(o.textContent!==e)o.textContent=e;return}Ft(document);let t=document.createElement("style");t.id=vr,t.textContent=e,document.head.appendChild(t)},x=(e,o)=>{let t=document.createElement(e);if(o)t.className=o;return t},Te=(e)=>{let o=x("button",e);return o.type="button",o},z=(e,o)=>{let t=o??"";if(e.textContent!==t)e.textContent=t},ge=(e,o,t)=>{if(t===void 0||t===null||t==="")e.removeAttribute(o);else if(e.getAttribute(o)!==t)e.setAttribute(o,t)},Cr=(e,o)=>{let t=(n)=>{if(n.target instanceof Node&&e.contains(n.target))return;o()};return document.addEventListener("pointerdown",t,!0),()=>{document.removeEventListener("pointerdown",t,!0)}};var mn=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},W=(e,o)=>{B(F);let t=o,n=Te("oc-sdk oc-sdk-btn"),s=mn(),a=document.createElement("span");n.append(a),e.append(n);let c=()=>{if(n.dataset.variant=t.variant??"default",n.dataset.size=t.size??"default",n.disabled=Boolean(t.disabled)||Boolean(t.loading),n.dataset.loading=t.loading?"true":"false",n.setAttribute("aria-busy",t.loading?"true":"false"),t.loading&&s.parentNode!==n)n.prepend(s);else if(!t.loading&&s.parentNode===n)s.remove();z(a,t.label)},d=()=>{if(t.disabled||t.loading)return;t.onClick()};return n.addEventListener("click",d),c(),{update:(u)=>{t={...t,...u},c()},dispose:()=>{n.removeEventListener("click",d),n.remove()}}};var wt=(e,o)=>{B(F);let t=o,n=x("label","oc-sdk oc-sdk-field"),s=x("span","oc-sdk-field-label"),a=t.multiline?x("textarea","oc-sdk-input"):x("input","oc-sdk-input"),c=x("span","oc-sdk-field-note");n.append(s,a,c),e.append(n);let d=()=>{if(z(s,t.label),s.hidden=!t.label,a instanceof HTMLInputElement)a.type=t.password?"password":"text";else a.rows=t.rows??3;if(a.value!==t.value)a.value=t.value;a.disabled=Boolean(t.disabled),ge(a,"placeholder",t.placeholder),a.dataset.mono=t.mono?"true":"false";let m=Boolean(t.error);n.dataset.invalid=m?"true":"false",a.setAttribute("aria-invalid",m?"true":"false");let E=t.error??t.helper??"";z(c,E),c.hidden=E===""},u=()=>{t.onChange(a.value)};return a.addEventListener("input",u),d(),{update:(m)=>{t={...t,...m},d()},dispose:()=>{a.removeEventListener("input",u),n.remove()}}};var Tn={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},ye=(e,o,t)=>{let n=document.createElementNS("http://www.w3.org/2000/svg","svg");if(n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("width",String(o)),n.setAttribute("height",String(o)),n.setAttribute("aria-hidden","true"),n.setAttribute("fill","currentColor"),t)n.setAttribute("class",t);let s=document.createElementNS("http://www.w3.org/2000/svg","path");return s.setAttribute("d",Tn[e]),n.append(s),n};var yo=(e,o)=>{B(F);let t=o,n=x("div","oc-sdk oc-sdk-search"),s=x("input","oc-sdk-input");s.type="text",s.spellcheck=!1,s.autocomplete="off",s.setAttribute("role","searchbox");let a=Te("oc-sdk-search-clear");a.append(ye("close",14)),a.tabIndex=-1,n.append(ye("search",16,"oc-sdk-search-icon"),s,a),e.append(n);let c=()=>{let E=t.placeholder??"Search";if(ge(s,"placeholder",E),s.setAttribute("aria-label",t.label??E),a.setAttribute("aria-label","Clear search"),s.value!==t.value)s.value=t.value;n.dataset.active=t.value.trim()===""?"false":"true"},d=()=>{if(t.value!=="")t.onChange("");s.focus()},u=()=>{t.onChange(s.value)},m=(E)=>{if(E.key==="Escape"&&s.value!=="")E.preventDefault(),d()};if(s.addEventListener("input",u),s.addEventListener("keydown",m),a.addEventListener("click",d),c(),t.autofocus)s.focus();return{update:(E)=>{t={...t,...E},c()},dispose:()=>{s.removeEventListener("input",u),s.removeEventListener("keydown",m),a.removeEventListener("click",d),n.remove()}}};var Ge=(e,o="vertical")=>{let[t,n]=o==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===t||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===n||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},Je=(e,o,t)=>{let n=e.filter((u)=>!u.disabled);if(n.length===0)return null;let s=n[0],a=n[n.length-1];if(t==="first"||!s||!a)return s?.id??null;if(t==="last")return a.id;let c=n.findIndex((u)=>u.id===o);if(c===-1)return t==="next"?s.id:a.id;return n[Math.min(n.length-1,Math.max(0,c+(t==="next"?1:-1)))]?.id??null};var Ir=(e,o)=>`${e}-${o??""}`,vo=(e,o,t,n)=>{let s=Te("oc-sdk-option");if(s.id=Ir(e,t.id),s.setAttribute("role",o),s.tabIndex=-1,s.disabled=Boolean(t.disabled),o==="option")s.setAttribute("aria-selected",t.selected?"true":"false");s.dataset.destructive=t.destructive?"true":"false";let a=x("span","oc-sdk-option-label");if(a.textContent=t.label,s.append(a),t.hint){let c=x("span","oc-sdk-option-hint");c.textContent=t.hint,s.append(c)}if(o==="option"){s.dataset.mark="check";let c=x("span","oc-sdk-option-check");c.append(ye("check",14)),s.append(c)}return s.addEventListener("pointerenter",n.hover),s.addEventListener("click",n.pick),s},Co=(e,o,t,n)=>{let s=Ir(t,n);for(let a of Array.from(e.children))if(a instanceof HTMLElement&&a.classList.contains("oc-sdk-option"))a.dataset.active=a.id===s?"true":"false";ge(o,"aria-activedescendant",n?s:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var hn=(e,o)=>{let t=o.getBoundingClientRect();e.style.minWidth=`${Math.round(t.width)}px`,e.style.left=`${Math.round(t.left)}px`,e.style.top=`${Math.round(t.bottom+4)}px`;let n=e.offsetHeight,s=window.innerHeight-t.bottom-8;if(n>s&&t.top-8>s)e.style.top=`${Math.max(8,Math.round(t.top-4-n))}px`;let a=t.left+e.offsetWidth-window.innerWidth+8;if(a>0)e.style.left=`${Math.max(8,Math.round(t.left-a))}px`},Io=(e,o,t,n)=>{e.append(t),hn(t,o);let s=Cr(e,n),a=()=>{n()},c=(d)=>{if(d.target instanceof Node&&t.contains(d.target))return;n()};return window.addEventListener("resize",a),window.addEventListener("scroll",c,!0),()=>{s(),window.removeEventListener("resize",a),window.removeEventListener("scroll",c,!0),t.remove()}};var kr=(e,o)=>{let t=o.trim().toLowerCase();if(!t)return[...e];return e.filter((n)=>n.label.toLowerCase().includes(t)||n.id.toLowerCase().includes(t))},gn=0,ko=(e,o)=>{B(F);let t=o,n=`oc-sdk-select-${gn+=1}`,s=x("div","oc-sdk oc-sdk-select"),a=x("span","oc-sdk-field-label");a.id=`${n}-label`;let c=Te("oc-sdk-trigger");c.setAttribute("aria-haspopup","listbox"),c.setAttribute("aria-labelledby",a.id);let d=x("span","oc-sdk-trigger-value");c.append(d,ye("chevron",14,"oc-sdk-trigger-chevron")),s.append(a,c),e.append(s);let u="",m=null,E=null,O=x("div","oc-sdk oc-sdk-popup"),R=x("div","oc-sdk-popup-search"),T=x("input","oc-sdk-input");T.type="text",T.autocomplete="off",R.append(T);let C=x("div");C.setAttribute("role","listbox"),C.tabIndex=-1,O.append(C);let I=()=>kr(t.options,t.searchable?u:""),D=()=>t.searchable?T:C,k=(l)=>{m=l,Co(C,D(),n,l)},j=()=>{We(C);let l=I();if(l.length===0){let p=x("div","oc-sdk-popup-empty");p.textContent="No matches",C.append(p)}for(let p of l)C.append(vo(n,"option",{...p,selected:p.id===t.value},{hover:()=>k(p.id),pick:()=>ne(p.id)}));k(l.some((p)=>p.id===m)?m:l[0]?.id??null)},te=()=>{let l=E;E=null,l?.(),u="",T.value="",c.setAttribute("aria-expanded","false")},ie=()=>{if(E||t.disabled)return;if(m=t.value,T.placeholder=t.searchPlaceholder??"Search",t.searchable)O.prepend(R);else R.remove();j(),E=Io(s,c,O,te),c.setAttribute("aria-expanded","true"),D().focus()},ne=(l)=>{if(te(),c.focus(),l!==t.value)t.onChange(l)},J=()=>{if(E)te();else ie()},_=(l)=>{if(!E&&Ge(l))l.preventDefault(),ie()},S=(l)=>{let p=Ge(l);if(p)l.preventDefault(),k(Je(I(),m,p));else if(l.key==="Enter"){if(l.preventDefault(),m)ne(m)}else if(l.key==="Escape")l.preventDefault(),te(),c.focus();else if(t.searchable&&l.target!==T&&l.key.length===1&&!l.ctrlKey&&!l.metaKey)T.focus()},h=()=>{u=T.value,j()},ee=(l)=>{if(E&&!(l.relatedTarget instanceof Node&&s.contains(l.relatedTarget)))te()},Q=()=>{z(a,t.label),a.hidden=!t.label;let l=t.options.find((p)=>p.id===t.value);if(z(d,l?.label??t.placeholder??"Select"),d.dataset.empty=l?"false":"true",c.disabled=Boolean(t.disabled),E)j()};return c.addEventListener("click",J),c.addEventListener("keydown",_),O.addEventListener("keydown",S),T.addEventListener("input",h),s.addEventListener("focusout",ee),Q(),{update:(l)=>{t={...t,...l},Q()},dispose:()=>{te(),c.removeEventListener("click",J),c.removeEventListener("keydown",_),O.removeEventListener("keydown",S),T.removeEventListener("input",h),s.removeEventListener("focusout",ee),s.remove()}}};var On=(e,o,t)=>{B(F);let n=o,s=Te("oc-sdk oc-sdk-check");s.setAttribute("role",t);let a=x("span",t==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");if(t==="checkbox")a.append(ye("check",12));let c=x("span","oc-sdk-check-text"),d=x("span","oc-sdk-check-label"),u=x("span","oc-sdk-check-desc");c.append(d,u),s.append(a,c),e.append(s);let m=()=>{s.setAttribute("aria-checked",n.checked?"true":"false"),s.disabled=Boolean(n.disabled),z(d,n.label),z(u,n.description),u.hidden=!n.description},E=()=>{if(!n.disabled)n.onChange(!n.checked)};return s.addEventListener("click",E),m(),{update:(O)=>{n={...n,...O},m()},dispose:()=>{s.removeEventListener("click",E),s.remove()}}};var Uo=(e,o)=>On(e,o,"switch");var Nt=(e,o)=>{ge(e,"data-tone",o&&o!=="neutral"?o:null)},wo=(e,o)=>{B(F);let t=o,n=x("span","oc-sdk oc-sdk-badge");e.append(n);let s=()=>{z(n,t.label),Nt(n,t.tone)};return s(),{update:(a)=>{t={...t,...a},s()},dispose:()=>{n.remove()}}};var xn=0,lt=(e,o)=>{B(F);let t=o,n=`oc-sdk-list-${xn+=1}`,s=x("div","oc-sdk oc-sdk-list");s.setAttribute("role","listbox"),s.tabIndex=0,e.append(s);let a=null,c=(O)=>`${n}-${O}`,d=(O)=>{a=O;for(let R of Array.from(s.children))if(R instanceof HTMLElement)R.dataset.active=R.id===c(O??"")?"true":"false";ge(s,"aria-activedescendant",O?c(O):null),s.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},u=(O,R)=>{let T=x("span",O);return T.textContent=R,T},m=()=>{if(We(s),ge(s,"aria-label",t.ariaLabel),t.items.length===0){s.append(u("oc-sdk-list-empty",t.emptyText??"Nothing here")),d(null);return}for(let R of t.items){let T=Te("oc-sdk-row");if(T.id=c(R.id),T.setAttribute("role","option"),T.setAttribute("aria-selected",R.id===t.selectedId?"true":"false"),T.disabled=Boolean(R.disabled),T.tabIndex=-1,R.leading)T.append(u("oc-sdk-row-lead",R.leading));let C=x("span","oc-sdk-row-main");if(C.append(u("oc-sdk-row-title",R.title)),R.subtitle)C.append(u("oc-sdk-row-sub",R.subtitle));if(T.append(C),R.badge){let I=u("oc-sdk-badge",R.badge.label);Nt(I,R.badge.tone),T.append(I)}if(R.meta)T.append(u("oc-sdk-row-meta",R.meta));T.addEventListener("click",()=>t.onSelect(R.id)),s.append(T)}let O=t.items.some((R)=>R.id===a&&!R.disabled);d(O?a:t.selectedId??null)},E=(O)=>{let R=Ge(O);if(R){O.preventDefault(),d(Je(t.items,a,R));return}if((O.key==="Enter"||O.key===" ")&&a)O.preventDefault(),t.onSelect(a)};return s.addEventListener("keydown",E),m(),{update:(O)=>{t={...t,...O},m()},dispose:()=>{s.removeEventListener("keydown",E),s.remove()}}};var Mt=(e,o)=>{B(F);let t=o,n=x("div","oc-sdk oc-sdk-empty"),s=x("h2","oc-sdk-empty-title"),a=x("p","oc-sdk-empty-body"),c=x("div","oc-sdk-empty-action");n.append(s,a,c),e.append(n);let d=null,u=()=>{if(z(s,t.title),z(a,t.body),a.hidden=!t.body,c.hidden=!t.action,!t.action){d?.dispose(),d=null;return}let m={label:t.action.label,onClick:t.action.onClick};if(d)d.update(m);else d=W(c,{...m,variant:"outline",size:"sm"})};return u(),{update:(m)=>{t={...t,...m},u()},dispose:()=>{d?.dispose(),d=null,n.remove()}}};var No=(e,o={})=>{B(F);let t=o,n=x("span","oc-sdk oc-sdk-spinner");n.setAttribute("role","status");let s=x("span","oc-sdk-spinner-ring");s.setAttribute("aria-hidden","true");let a=x("span");n.append(s,a),e.append(n);let c=()=>{n.dataset.size=t.size??"default",z(a,t.label),a.hidden=!t.label,n.setAttribute("aria-label",t.label??"Loading")};return c(),{update:(d)=>{t={...t,...d},c()},dispose:()=>{n.remove()}}};var Pt=(e,o)=>{B(F);let t=o,n=x("div","oc-sdk oc-sdk-banner"),s=x("div","oc-sdk-banner-text"),a=x("div","oc-sdk-banner-title"),c=x("div","oc-sdk-banner-body"),d=x("div","oc-sdk-banner-action");s.append(a,c),n.append(s,d),e.append(n);let u=null,m=()=>{if(n.dataset.tone=t.tone,n.setAttribute("role",t.tone==="error"||t.tone==="warning"?"alert":"status"),z(a,t.title),z(c,t.body),c.hidden=!t.body,d.hidden=!t.action,!t.action){u?.dispose(),u=null;return}let E={label:t.action.label,onClick:t.action.onClick};if(u)u.update(E);else u=W(d,{...E,variant:"outline",size:"xs"})};return m(),{update:(E)=>{t={...t,...E},m()},dispose:()=>{u?.dispose(),u=null,n.remove()}}};var Lt=(e,o={})=>{B(F);let t=o,n=x("div","oc-sdk oc-sdk-separator");n.setAttribute("role","separator");let s=x("span");n.append(s),e.append(n);let a=()=>{z(s,t.label),s.hidden=!t.label,n.dataset.labeled=t.label?"true":"false"};return a(),{update:(c)=>{t={...t,...c},a()},dispose:()=>{n.remove()}}};var Dt=(e)=>{let o=e.trim();return o.startsWith("/")||/^[A-Za-z]:[\\/]/.test(o)},nt=(e,o={})=>{let t=e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/");if(t.length>1&&t.endsWith("/"))t=t.replace(/\/+$/,"");if(t==="")t=e.trim().startsWith("/")?"/":"";return o.caseInsensitive?t.toLowerCase():t},He=(e,o,t={})=>nt(e,t)===nt(o,t);var Ur="default",wr=(e,o)=>{let{showSessions:t,...n}=e;return o?n:{...n,showSessions:!1}},Qe=()=>({version:1,activeId:Ur,profiles:[{id:Ur,name:"Default",folders:[]}]}),An=(e)=>e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"profile",Rn=(e,o)=>{let t=An(o),n=new Set(e.profiles.map((a)=>a.id));if(!n.has(t))return t;let s=2;while(n.has(`${t}-${s}`))s+=1;return`${t}-${s}`},Mo=(e,o,t)=>{if(!e.profiles.some((n)=>n.id===o))throw Error(`Unknown profile: ${o}`);return{...e,profiles:e.profiles.map((n)=>n.id===o?t(n):n)}},Nr=(e)=>{let o=e.trim();if(!o)throw Error("Profile name is required");return o},Mr=(e,o)=>{let t=Nr(o),n={id:Rn(e,t),name:t,folders:[]};return{...e,profiles:[...e.profiles,n]}},Pr=(e,o,t)=>{let n=Nr(t);return Mo(e,o,(s)=>({...s,name:n}))},Lr=(e,o)=>{if(!e.profiles.some((s)=>s.id===o))throw Error(`Unknown profile: ${o}`);let t=e.profiles.filter((s)=>s.id!==o);if(t.length===0)return Qe();let n=e.activeId===o?t[0].id:e.activeId;return{...e,activeId:n,profiles:t}},Po=(e,o)=>{if(!e.profiles.some((t)=>t.id===o))throw Error(`Unknown profile: ${o}`);return{...e,activeId:o}},Dr=(e,o,t)=>{if(!Dt(t))throw Error("Folder path must be absolute");let n=nt(t);return Mo(e,o,(s)=>s.folders.some((a)=>He(a,n))?s:{...s,folders:[...s.folders,n]})},Gr=(e,o,t)=>Mo(e,o,(n)=>({...n,folders:n.folders.filter((s)=>!He(s,t))}));var Hr="profiles.v1",Vr=(e)=>typeof e==="object"&&e!==null&&!Array.isArray(e),bn=(e)=>{if(!Vr(e)||typeof e.id!=="string"||!e.id||typeof e.name!=="string"||!Array.isArray(e.folders))return null;if(!e.folders.every((n)=>typeof n==="string"))return null;let o=new Set,t=[];for(let n of e.folders){let s=nt(n);if(s&&!o.has(s))o.add(s),t.push(s)}return{id:e.id,name:e.name,folders:t}},yn=(e)=>{if(e===void 0)return{state:Qe(),corrupt:!1};if(!Vr(e)||e.version!==1||!Array.isArray(e.profiles))return{state:Qe(),corrupt:!0};let o=e.profiles.map(bn),t=o.filter((c)=>c!==null),n=new Set(t.map((c)=>c.id));if(t.length===0||o.length!==t.length||n.size!==t.length)return{state:Qe(),corrupt:!0};let a={version:1,activeId:typeof e.activeId==="string"&&n.has(e.activeId)?e.activeId:t[0].id,profiles:t};if(e.showSessions===!1)a.showSessions=!1;return{state:a,corrupt:!1}},Xr=async(e)=>yn(await e.get(Hr)),Fr=(e,o)=>e.set(Hr,o);var Br=20,vn=["waiting-permission","waiting-question"],Cn=["running","retrying"],In=(e)=>{if(e.some((o)=>vn.includes(o.activity)))return"waiting";if(e.some((o)=>Cn.includes(o.activity)))return"running";return"idle"},kn=(e,o)=>{for(let t of o.projects)if(He(e,t.directory))return{project:t,via:"project"};for(let t of o.projects)if((o.worktrees[t.id]??[]).some((n)=>He(e,n.directory)))return{project:t,via:"worktree"};return null},Un=(e,o)=>{let t=kn(e,o);if(!t)return{path:e,kind:"not-added",project:null,via:null,sessions:[],hiddenSessions:0,attention:"idle"};let n=(o.sessions[t.project.id]??[]).filter((s)=>!s.parentId&&!s.archivedAt).filter((s)=>t.via==="project"||He(s.directory,e)).sort((s,a)=>a.updatedAt-s.updatedAt);return{path:e,kind:"registered",project:{id:t.project.id,name:t.project.name},via:t.via,sessions:n.slice(0,Br).map(({id:s,title:a,updatedAt:c,activity:d})=>({id:s,title:a,updatedAt:c,activity:d})),hiddenSessions:Math.max(0,n.length-Br),attention:In(n)}},$r=(e,o)=>e.projects.filter((t)=>{let n=[t.directory,...(e.worktrees[t.id]??[]).map((s)=>s.directory)];return!o.some((s)=>n.some((a)=>He(s,a)))}).map((t)=>({projectId:t.id,name:t.name,path:t.directory})),jr=(e)=>{let{state:o}=e,t=o.profiles.find((n)=>n.id===o.activeId)??o.profiles[0];return{profiles:o.profiles.map((n)=>({id:n.id,name:n.name,folderCount:n.folders.length,active:n.id===t.id})),activeProfile:{id:t.id,name:t.name,folders:t.folders.map((n)=>Un(n,e))},unassigned:$r(e,o.profiles.flatMap((n)=>n.folders)),pickable:$r(e,t.folders),showSessions:o.showSessions!==!1}};var wn=31,Nn="https://github.com/odrinOp/openchamber-profiles",dt=(e)=>e instanceof Error?e.message:String(e),Kr=(e)=>{let o=Qe(),t=!1,n=!1,s=[],a="loading",c={},d={},u,m=!1,E=new Map,O=null,R=new Set,T,C=()=>{let _=jr({state:o,projects:s,worktrees:c,sessions:d}),S="ready",h;if(u)S="error",h=u;else if(!n||a==="loading")S="loading";else if(a==="error"&&s.length===0)S="error",h="Could not load projects from OpenChamber.";return{status:S,error:h,corrupt:t,vm:_}},I=()=>{T=C(),D();for(let _ of R)_()},D=()=>{let _=new Set;for(let S of T.vm.activeProfile.folders){if(S.project)_.add(S.project.id);if(_.size>=wn)break}for(let[S,h]of E)if(!_.has(S))h(),E.delete(S),delete d[S];for(let S of _){if(E.has(S))continue;E.set(S,()=>{}),e.onSessions(S,(h)=>{d={...d,[S]:h.sessions},I()}).then((h)=>{if(m||!E.has(S))h();else E.set(S,h)}).catch((h)=>{E.delete(S),console.error("sessions subscription failed",S,h)})}},k=async(_)=>{let S=await Promise.all(_.map(async(h)=>{try{return[h.id,(await e.listWorktrees(h.id)).worktrees]}catch{return[h.id,[]]}}));if(m)return;c=Object.fromEntries(S),I()},j=(_)=>{try{J(_(o))}catch(S){e.toast({kind:"error",message:dt(S)})}},te=new Set,ie=async(_)=>{let S=T.vm.activeProfile.folders.find((h)=>h.path===_);if(!S?.project||te.has(_))return;te.add(_);try{let h=T.vm.activeProfile,ee=await e.startSession({providerId:"profiles",id:`profile:${h.id}`,title:h.name,url:Nn,data:{profileId:h.id},projectId:S.project.id,navigation:"open",...S.via==="worktree"?{worktree:{kind:"existing",directory:S.path}}:{}});if(ee.sessionId===null)e.toast({kind:"error",message:`Could not start a session (${ee.failure}).`})}catch(h){e.toast({kind:"error",message:`Could not start a session: ${dt(h)}`})}finally{te.delete(_)}},ne=Promise.resolve(),J=(_)=>{o=_,t=!1,I(),ne=ne.then(()=>Fr(e.storage,o)).catch((S)=>{e.toast({kind:"error",message:`Could not save profiles: ${dt(S)}`})})};return T=C(),(async()=>{try{let _=await Xr(e.storage);o=_.state,t=_.corrupt,n=!0,I();let S=await e.onProjects((h)=>{s=h.projects,a=h.state,I(),k(s)});if(m)S();else O=S}catch(_){u=dt(_),I()}})(),{get:()=>T,subscribe(_){return R.add(_),()=>R.delete(_)},selectProfile:(_)=>j((S)=>Po(S,_)),setShowSessions:(_)=>j((S)=>wr(S,_)),createProfile:(_)=>j((S)=>{let h=Mr(S,_);return Po(h,h.profiles[h.profiles.length-1].id)}),renameProfile:(_,S)=>j((h)=>Pr(h,_,S)),deleteProfile:(_)=>j((S)=>Lr(S,_)),addFolder:(_,S)=>j((h)=>Dr(h,S??h.activeId,_)),removeFolder:(_)=>j((S)=>Gr(S,S.activeId,_)),newSession:(_)=>void ie(_),openSession:(_)=>{e.openSession(_).catch((S)=>{e.toast({kind:"error",message:`Could not open the session: ${dt(S)}`})})},dispose(){m=!0,O?.();for(let _ of E.values())_();E.clear(),R.clear()}}};var zr=`
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

.oc-profiles-session-count {
  font-size: 11px;
  color: var(--muted-foreground);
  white-space: nowrap;
}
`;var Mn=(e)=>{let o=e.replace(/[\\/]+$/,""),t=Math.max(o.lastIndexOf("/"),o.lastIndexOf("\\"));if(t>=0)return o.slice(t+1)||e;return e},Pn=(e,o=Date.now())=>{let t=Math.max(0,o-e),n=Math.floor(t/1000);if(n<60)return"just now";let s=Math.floor(n/60);if(s<60)return`${s}m ago`;let a=Math.floor(s/60);if(a<24)return`${a}h ago`;let c=Math.floor(a/24);if(c<30)return`${c}d ago`;let d=Math.floor(c/30);if(d<12)return`${d}mo ago`;return`${Math.floor(c/365)}y ago`},Ln=(e)=>{switch(e){case"waiting-permission":return{label:"waiting for permission",tone:"warning"};case"waiting-question":return{label:"waiting for answer",tone:"warning"};case"running":return{label:"running",tone:"info"};case"retrying":return{label:"retrying",tone:"warning"};case"idle":case"unknown":default:return{label:"idle",tone:"neutral"}}},Dn=(e)=>{let t=document.getElementById("oc-profiles-view-style");if(!t)t=document.createElement("style"),t.id="oc-profiles-view-style",document.head.appendChild(t);if(t.textContent!==e)t.textContent=e},Gn=(e,o,t)=>{let n=document.createElement("div");n.className="oc-profiles-folder-card";let s=e,a=o,c=!1,d=null,u=document.createElement("div");u.className="oc-profiles-folder-header";let m=document.createElement("div");m.className="oc-profiles-folder-meta";let E=document.createElement("div");E.className="oc-profiles-folder-title-row";let O=document.createElement("span");O.className="oc-profiles-status-dot";let R=document.createElement("span");R.className="oc-profiles-folder-basename";let T=document.createElement("span");T.className="oc-sdk-badge oc-profiles-worktree-tag",T.textContent="worktree",T.style.display="none",E.appendChild(O),E.appendChild(R),E.appendChild(T);let C=document.createElement("span");C.className="oc-profiles-session-count",C.style.display="none",E.appendChild(C);let I=document.createElement("span");I.className="oc-profiles-folder-path",m.appendChild(E),m.appendChild(I);let D=document.createElement("div");D.className="oc-profiles-folder-actions";let k=document.createElement("span"),j=document.createElement("span");D.appendChild(k),D.appendChild(j);let ie=W(k,{label:"New session",variant:"default",size:"xs",onClick:()=>{if(c)return;c=!0,ie.update({disabled:!0}),a.newSession(s.path),d=setTimeout(()=>{c=!1,d=null,ie.update({disabled:!1})},3000)}}),ne=W(j,{label:"Remove",variant:"ghost",size:"xs",onClick:()=>a.removeFolder(s.path)});u.appendChild(m),u.appendChild(D),n.appendChild(u);let J=document.createElement("div");J.className="oc-profiles-not-added-callout";let _=document.createElement("span");_.className="oc-profiles-not-added-icon",_.textContent="ℹ";let S=document.createElement("span");S.textContent="Add this folder as a project in the sidebar once",J.appendChild(_),J.appendChild(S);let h=document.createElement("div");h.className="oc-profiles-sessions-container";let ee=document.createElement("div");ee.className="oc-profiles-sessions-empty",ee.textContent="No sessions yet";let Q=document.createElement("div");Q.className="oc-profiles-sessions-list";let l=document.createElement("div");l.className="oc-profiles-sessions-more",h.appendChild(ee),h.appendChild(Q),h.appendChild(l);let p=[],ce=(M,Oe,Ve)=>{s=M,a=Oe,O.dataset.status=M.attention,O.setAttribute("title",`Status: ${M.attention}`),O.setAttribute("aria-label",`Status: ${M.attention}`),R.textContent=Mn(M.path),R.title=M.path,I.textContent=M.path,I.title=M.path;let ve=M.sessions.length+M.hiddenSessions;if(C.textContent=`${ve} ${ve===1?"session":"sessions"}`,C.style.display=M.kind==="registered"&&!Ve?"":"none",T.style.display=M.via==="worktree"?"":"none",M.kind==="registered")k.style.display="",ie.update({disabled:c});else k.style.display="none";if(ne.update({onClick:()=>Oe.removeFolder(M.path)}),M.kind==="not-added"){if(!J.parentElement)n.appendChild(J);if(h.parentElement)h.remove()}else{if(J.parentElement)J.remove();if(h.style.display=Ve?"":"none",!h.parentElement)n.appendChild(h);if(M.sessions.length===0)ee.style.display="",Q.style.display="none",l.style.display="none";else{ee.style.display="none",Q.style.display="";while(p.length<M.sessions.length){let P=document.createElement("div");P.className="oc-profiles-session-row";let le=document.createElement("div");le.className="oc-profiles-session-lead";let v=document.createElement("span");v.className="oc-profiles-session-title",le.appendChild(v);let _e=document.createElement("span");le.appendChild(_e);let Y=wo(_e,{label:"",tone:"neutral"}),N=document.createElement("div");N.className="oc-profiles-session-trail";let L=document.createElement("span");N.appendChild(L);let se=document.createElement("div");se.className="oc-profiles-session-actions",N.appendChild(se);let Se="",Xe=W(se,{label:"Open",variant:"secondary",size:"xs",onClick:()=>{if(Se)a.openSession(Se)}});v.addEventListener("click",()=>{if(Se)a.openSession(Se)}),P.appendChild(le),P.appendChild(N),Q.appendChild(P),p.push({element:P,titleEl:v,badgeHandle:Y,timeEl:L,openButtonHandle:Xe,setSessionId:(Fe)=>{Se=Fe}})}while(p.length>M.sessions.length){let P=p.pop();P.badgeHandle.dispose(),P.openButtonHandle.dispose(),P.element.remove()}if(M.sessions.forEach((P,le)=>{let v=p[le];v.setSessionId(P.id),v.titleEl.textContent=P.title||"Untitled session",v.titleEl.title=`Open session: ${P.title||"Untitled session"}`;let _e=Ln(P.activity);v.badgeHandle.update({label:_e.label,tone:_e.tone}),v.timeEl.textContent=Pn(P.updatedAt)}),M.hiddenSessions>0)l.style.display="",l.textContent=`+${M.hiddenSessions} more`;else l.style.display="none"}}};return ce(e,o,t),{element:n,update:ce,dispose:()=>{if(d)clearTimeout(d),d=null;ie.dispose(),ne.dispose();for(let M of p)M.badgeHandle.dispose(),M.openButtonHandle.dispose();p=[],n.remove()}}},Hn=(e,o,t)=>{let n=document.createElement("div");n.className="oc-profiles-unassigned-card";let s=document.createElement("div");s.className="oc-profiles-unassigned-info";let a=document.createElement("span");a.className="oc-profiles-unassigned-name";let c=document.createElement("span");c.className="oc-profiles-unassigned-path",s.appendChild(a),s.appendChild(c);let d=document.createElement("div");d.className="oc-profiles-unassigned-actions",n.appendChild(s),n.appendChild(d);let u=null,m=null,E=null,O=o.find((T)=>T.active)?.id??o[0]?.id??"",R=(T,C,I)=>{if(a.textContent=T.name,c.textContent=T.path,c.title=T.path,!C.some((D)=>D.id===O))O=C.find((D)=>D.active)?.id??C[0]?.id??"";if(C.length<=1){if(m)m.dispose(),m=null;if(E)E.dispose(),E=null;let D=C[0]?.name??"profile",k=C[0]?.id;if(!u)u=W(d,{label:`Add to ${D}`,variant:"secondary",size:"sm",onClick:()=>{if(k)I.addFolder(T.path,k);else I.addFolder(T.path)}});else u.update({label:`Add to ${D}`,onClick:()=>{if(k)I.addFolder(T.path,k);else I.addFolder(T.path)}})}else{if(u)u.dispose(),u=null;let D=C.map((k)=>({id:k.id,label:k.active?`${k.name} (active)`:k.name}));if(!m)m=ko(d,{options:D,value:O,onChange:(k)=>{O=k}});else m.update({options:D,value:O});if(!E)E=W(d,{label:"Add",variant:"secondary",size:"sm",onClick:()=>{I.addFolder(T.path,O)}});else E.update({onClick:()=>{I.addFolder(T.path,O)}})}};return R(e,o,t),{element:n,update:R,dispose:()=>{u?.dispose(),m?.dispose(),E?.dispose(),n.remove()}}},Wr=(e)=>{Dn(zr);let o=null,t=null,n={kind:"profile"},s=!1,a="",c,d=!1,u=null,m="",E=!1,O=null,R=!1,T="",C="",I;while(e.firstChild)e.removeChild(e.firstChild);let D=document.createElement("div");D.className="oc-profiles-app oc-sdk",e.appendChild(D);let k=document.createElement("aside");k.className="oc-profiles-sidebar",D.appendChild(k);let j=document.createElement("div");j.className="oc-profiles-sidebar-header",j.textContent="Profiles",k.appendChild(j);let te=document.createElement("div");te.className="oc-profiles-sidebar-section",k.appendChild(te);let ie=lt(te,{items:[],ariaLabel:"Profiles",onSelect:(f)=>{if(n={kind:"profile"},t?.selectProfile(f),o&&t)fe(o,t)}}),ne=document.createElement("div");ne.className="oc-profiles-sidebar-action",k.appendChild(ne);let J=document.createElement("div");ne.appendChild(J);let _=document.createElement("div");_.className="oc-profiles-new-profile-form",_.style.display="none",ne.appendChild(_);let S=document.createElement("div");_.appendChild(S);let h=document.createElement("div");h.className="oc-profiles-form-actions",_.appendChild(h);let ee=()=>{let f=a.trim();if(!f){c="Name cannot be empty",p.update({error:c});return}if(t?.createProfile(f),s=!1,a="",c=void 0,o&&t)fe(o,t)},Q=()=>{if(s=!1,a="",c=void 0,o&&t)fe(o,t)},l=W(J,{label:"+ New profile",variant:"ghost",size:"sm",onClick:()=>{if(s=!0,a="",c=void 0,o&&t)fe(o,t);_.querySelector("input")?.focus()}}),p=wt(S,{placeholder:"Profile name",value:"",onChange:(f)=>{a=f,c=void 0,p.update({value:f,error:void 0}),ce.update({disabled:!f.trim()})}}),ce=W(h,{label:"Create",variant:"default",size:"xs",disabled:!0,onClick:ee}),M=W(h,{label:"Cancel",variant:"ghost",size:"xs",onClick:Q});_.addEventListener("keydown",(f)=>{if(f.key==="Enter")f.preventDefault(),ee();else if(f.key==="Escape")f.preventDefault(),Q()});let Oe=document.createElement("div");k.appendChild(Oe);let Ve=Lt(Oe,{label:"Library"}),ve=document.createElement("div");ve.className="oc-profiles-sidebar-section",k.appendChild(ve);let P=lt(ve,{items:[],ariaLabel:"Unassigned library",onSelect:()=>{if(n={kind:"unassigned"},o&&t)fe(o,t)}}),le=document.createElement("main");le.className="oc-profiles-main",D.appendChild(le);let v=document.createElement("header");v.className="oc-profiles-main-header",le.appendChild(v);let _e=document.createElement("div");_e.className="oc-profiles-header-top",v.appendChild(_e);let Y=document.createElement("div");Y.className="oc-profiles-header-title-row",_e.appendChild(Y);let N=document.createElement("h1");N.className="oc-profiles-main-title",Y.appendChild(N);let L=document.createElement("div");L.className="oc-profiles-rename-form",L.style.display="none",Y.appendChild(L);let se=document.createElement("input");se.type="text",se.className="oc-sdk-input",se.placeholder="Profile name",L.appendChild(se);let Se=document.createElement("div");Se.className="oc-profiles-form-actions",L.appendChild(Se);let Xe=()=>{let f=m.trim();if(f&&u)t?.renameProfile(u,f);if(d=!1,u=null,o&&t)fe(o,t)},Fe=()=>{if(d=!1,u=null,o&&t)fe(o,t)},Ne=W(Se,{label:"Save",variant:"default",size:"xs",onClick:Xe}),Ye=W(Se,{label:"Cancel",variant:"ghost",size:"xs",onClick:Fe});se.addEventListener("input",()=>{m=se.value,Ne.update({disabled:!m.trim()})}),se.addEventListener("keydown",(f)=>{if(f.key==="Enter")f.preventDefault(),Xe();else if(f.key==="Escape")f.preventDefault(),Fe()});let he=document.createElement("div");he.className="oc-profiles-header-actions",_e.appendChild(he);let st=Uo(he,{label:"Show sessions",checked:!0,onChange:(f)=>t?.setShowSessions(f)}),Ze=W(he,{label:"Rename",variant:"ghost",size:"xs",onClick:()=>{if(!o)return;d=!0,u=o.vm.activeProfile.id,m=o.vm.activeProfile.name,se.value=m,E=!1,fe(o,t),se.focus(),se.select()}}),de=W(he,{label:"Delete",variant:"ghost",size:"xs",onClick:()=>{if(!o)return;E=!0,O=o.vm.activeProfile.id,d=!1,fe(o,t)}}),Be=W(he,{label:"+ Add folder",variant:"secondary",size:"sm",onClick:()=>{if(R=!R,o&&t)fe(o,t)}}),Ce=document.createElement("p");Ce.className="oc-profiles-main-subtitle",v.appendChild(Ce);let be=document.createElement("div");be.className="oc-profiles-delete-confirm",be.style.display="none",v.appendChild(be);let Me=document.createElement("p");Me.className="oc-profiles-delete-confirm-text",be.appendChild(Me);let $e=document.createElement("div");$e.className="oc-profiles-form-actions",be.appendChild($e);let pt=W($e,{label:"Delete profile",variant:"destructive",size:"xs",onClick:()=>{if(O&&t)t.deleteProfile(O);if(E=!1,O=null,o&&t)fe(o,t)}}),r=W($e,{label:"Cancel",variant:"ghost",size:"xs",onClick:()=>{if(E=!1,O=null,o&&t)fe(o,t)}}),i=document.createElement("div");i.className="oc-profiles-add-panel",i.style.display="none",le.appendChild(i);let g=document.createElement("div");g.className="oc-profiles-add-panel-header",i.appendChild(g);let A=document.createElement("h3");A.className="oc-profiles-add-panel-title",g.appendChild(A);let G=()=>{if(R=!1,T="",C="",I=void 0,o&&t)fe(o,t)},V=W(g,{label:"Cancel",variant:"ghost",size:"xs",onClick:G}),X=document.createElement("div");X.className="oc-profiles-add-section",i.appendChild(X);let Gt=document.createElement("span");Gt.className="oc-profiles-add-section-label",Gt.textContent="Registered projects",X.appendChild(Gt);let ut=document.createElement("div");X.appendChild(ut);let Lo=yo(ut,{placeholder:"Filter projects…",value:"",onChange:(f)=>{if(T=f,o&&t)Vo(o,t)}}),it=document.createElement("div");it.className="oc-profiles-pickable-list-wrap",X.appendChild(it);let Do=lt(it,{items:[],emptyText:"No matching projects",onSelect:(f)=>{t?.addFolder(f),G()}}),qe=document.createElement("p");qe.className="oc-profiles-empty-hint",qe.textContent="All registered projects are already in this profile",qe.style.display="none",X.appendChild(qe);let Go=document.createElement("div");i.appendChild(Go);let Zr=Lt(Go,{label:"or"}),Ht=document.createElement("div");Ht.className="oc-profiles-add-section",i.appendChild(Ht);let ft=document.createElement("div");ft.className="oc-profiles-typed-row",Ht.appendChild(ft);let Vt=document.createElement("div");ft.appendChild(Vt);let Ho=()=>{let f=C.trim();if(!Dt(f)){I="Use an absolute path, e.g. /Users/me/project",Et.update({error:I});return}t?.addFolder(f),G()},Et=wt(Vt,{label:"Or type a folder path",placeholder:"/path/to/folder or C:\\path\\to\\folder",mono:!0,value:"",onChange:(f)=>{C=f,I=void 0,Et.update({value:f,error:void 0})}});Vt.addEventListener("keydown",(f)=>{if(f.key==="Enter")f.preventDefault(),Ho();else if(f.key==="Escape")f.preventDefault(),G()});let qr=W(ft,{label:"Add path",variant:"secondary",size:"sm",onClick:Ho}),Vo=(f,Le)=>{let at=T.trim().toLowerCase(),H=f.vm.pickable.filter((ae)=>!at||ae.name.toLowerCase().includes(at)||ae.path.toLowerCase().includes(at)).map((ae)=>({id:ae.path,title:ae.name,subtitle:ae.path}));if(f.vm.pickable.length===0)ut.style.display="none",it.style.display="none",qe.style.display="";else ut.style.display="",it.style.display="",qe.style.display="none",Do.update({items:H})},_t=document.createElement("div");_t.className="oc-profiles-banner-slot",le.appendChild(_t);let je=document.createElement("section");je.className="oc-profiles-content",le.appendChild(je);let Ie=null,ke=null,Pe=null,pe=null,ue=null,xe=new Map,Ae=new Map,fe=(f,Le)=>{if(o=f,t=Le,u&&u!==f.vm.activeProfile.id)d=!1,u=null;if(O&&O!==f.vm.activeProfile.id)E=!1,O=null;if(f.corrupt)if(!Ie)Ie=Pt(_t,{tone:"warning",title:"Profiles read warning",body:"Saved profiles couldn't be read. Showing defaults; nothing is overwritten until you make a change."});else Ie.update({body:"Saved profiles couldn't be read. Showing defaults; nothing is overwritten until you make a change."});else if(Ie)Ie.dispose(),Ie=null;if(f.status==="error"){let H=f.error||"An unexpected error occurred loading profiles.";if(!ke)ke=Pt(_t,{tone:"error",title:"Unable to load profiles",body:H});else ke.update({body:H})}else if(ke)ke.dispose(),ke=null;let at=f.vm.profiles.map((H)=>({id:H.id,title:H.name,meta:H.folderCount===1?"1 folder":`${H.folderCount} folders`,badge:H.active?{label:"active",tone:"primary"}:void 0}));if(ie.update({items:at,selectedId:n.kind==="profile"?f.vm.activeProfile.id:null}),s)J.style.display="none",_.style.display="",p.update({value:a,error:c}),ce.update({disabled:!a.trim()});else J.style.display="",_.style.display="none";if(P.update({items:[{id:"unassigned",title:"Unassigned",meta:String(f.vm.unassigned.length)}],selectedId:n.kind==="unassigned"?"unassigned":null}),f.status==="loading"){if(!Pe)Pe=No(je,{label:"Loading profiles and projects…"});for(let H of xe.values())H.element.style.display="none";for(let H of Ae.values())H.element.style.display="none";if(pe)pe.dispose(),pe=null;if(ue)ue.dispose(),ue=null;N.textContent="Loading…",Ce.textContent="",he.style.display="none",i.style.display="none";return}if(Pe)Pe.dispose(),Pe=null;if(n.kind==="profile"){let H=f.vm.activeProfile;if(he.style.display="",st.update({checked:f.vm.showSessions}),d&&u===H.id)N.style.display="none",L.style.display="",Ne.update({disabled:!m.trim()}),Ze.update({disabled:!0}),de.update({disabled:!0});else N.style.display="",N.textContent=H.name,L.style.display="none",Ze.update({disabled:!1}),de.update({disabled:!1});if(E&&O===H.id){be.style.display="";let oe=f.vm.profiles.length===1;Me.textContent=oe?`Delete "${H.name}"? Its folders move to Unassigned unless another profile holds them. Projects aren't touched. This is your last profile, so it will reset to an empty Default profile.`:`Delete "${H.name}"? Its folders move to Unassigned unless another profile holds them. Projects aren't touched.`}else be.style.display="none";let ae=H.folders.length;if(Ce.textContent=`${ae} ${ae===1?"project folder":"project folders"}`,R)i.style.display="",A.textContent=`Add folder to ${H.name}`,Be.update({label:"✕ Close add"}),Lo.update({value:T}),Vo(f,Le),Et.update({value:C,error:I});else i.style.display="none",Be.update({label:"+ Add folder"});for(let oe of Ae.values())oe.dispose();if(Ae.clear(),ue)ue.dispose(),ue=null;if(ae===0){for(let re of xe.values())re.dispose();xe.clear();let oe={title:"No folders yet",body:"Add some from Unassigned or choose a project above.",action:{label:"+ Add folder",onClick:()=>{R=!0,fe(f,Le)}}};if(!pe)pe=Mt(je,oe);else pe.update(oe)}else{if(pe)pe.dispose(),pe=null;let oe=new Set(H.folders.map((re)=>re.path));for(let[re,De]of xe)if(!oe.has(re))De.dispose(),xe.delete(re);for(let re of H.folders){let De=xe.get(re.path);if(!De)De=Gn(re,Le,f.vm.showSessions),xe.set(re.path,De);else De.element.style.display="",De.update(re,Le,f.vm.showSessions);je.appendChild(De.element)}}return}if(n.kind==="unassigned"){N.style.display="",N.textContent="Unassigned projects",L.style.display="none",be.style.display="none",he.style.display="none",i.style.display="none";let H=f.vm.unassigned.length;Ce.textContent=`Projects in OpenChamber not included in any profile (${H})`;for(let ae of xe.values())ae.dispose();if(xe.clear(),pe)pe.dispose(),pe=null;if(H===0){for(let oe of Ae.values())oe.dispose();Ae.clear();let ae={title:"Every project is in a profile.",body:"All registered projects in OpenChamber belong to at least one profile."};if(!ue)ue=Mt(je,ae);else ue.update(ae)}else{if(ue)ue.dispose(),ue=null;let ae=new Set(f.vm.unassigned.map((oe)=>oe.path));for(let[oe,re]of Ae)if(!ae.has(oe))re.dispose(),Ae.delete(oe);for(let oe of f.vm.unassigned){let re=Ae.get(oe.path);if(!re)re=Hn(oe,f.vm.profiles,Le),Ae.set(oe.path,re);else re.element.style.display="",re.update(oe,f.vm.profiles,Le);je.appendChild(re.element)}}}};return{render:fe,dispose:()=>{if(ie.dispose(),l.dispose(),p.dispose(),ce.dispose(),M.dispose(),Ve.dispose(),P.dispose(),Ne.dispose(),Ye.dispose(),Ze.dispose(),st.dispose(),de.dispose(),Be.dispose(),pt.dispose(),r.dispose(),V.dispose(),Lo.dispose(),Do.dispose(),Zr.dispose(),Et.dispose(),qr.dispose(),Ie)Ie.dispose(),Ie=null;if(ke)ke.dispose(),ke=null;if(Pe)Pe.dispose(),Pe=null;if(pe)pe.dispose(),pe=null;if(ue)ue.dispose(),ue=null;for(let f of xe.values())f.dispose();xe.clear();for(let f of Ae.values())f.dispose();Ae.clear(),D.remove()}}};var Jr=_o(),Qr=document.getElementById("app");if(!Qr)throw Error("Missing #app");var Vn=Wr(Qr),Re=Kr(Jr),Xn={selectProfile:(e)=>Re.selectProfile(e),setShowSessions:(e)=>Re.setShowSessions(e),createProfile:(e)=>Re.createProfile(e),renameProfile:(e,o)=>Re.renameProfile(e,o),deleteProfile:(e)=>Re.deleteProfile(e),addFolder:(e,o)=>Re.addFolder(e,o),removeFolder:(e)=>Re.removeFolder(e),newSession:(e)=>Re.newSession(e),openSession:(e)=>Re.openSession(e)},Yr=()=>Vn.render(Re.get(),Xn);Jr.onReady((e)=>So(e,document.documentElement));Re.subscribe(Yr);Yr();})();
