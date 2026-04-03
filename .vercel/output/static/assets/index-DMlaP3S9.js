import{r as l}from"./main-DGkh50O0.js";const R=(...e)=>e.filter((t,a,s)=>!!t&&t.trim()!==""&&s.indexOf(t)===a).join(" ").trim();const Y=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();const q=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,a,s)=>s?s.toUpperCase():a.toLowerCase());const _=e=>{const t=q(e);return t.charAt(0).toUpperCase()+t.slice(1)};var Q={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const V=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};const G=l.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:a=2,absoluteStrokeWidth:s,className:i="",children:o,iconNode:r,...n},c)=>l.createElement("svg",{ref:c,...Q,width:t,height:t,stroke:e,strokeWidth:s?Number(a)*24/Number(t):a,className:R("lucide",i),...!o&&!V(n)&&{"aria-hidden":"true"},...n},[...r.map(([d,u])=>l.createElement(d,u)),...Array.isArray(o)?o:[o]]));const Se=(e,t)=>{const a=l.forwardRef(({className:s,...i},o)=>l.createElement(G,{ref:o,iconNode:t,className:R(`lucide-${Y(_(e))}`,`lucide-${e}`,s),...i}));return a.displayName=_(e),a};let J={data:""},X=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||J},ee=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,te=/\/\*[^]*?\*\/|  +/g,F=/\n+/g,x=(e,t)=>{let a="",s="",i="";for(let o in e){let r=e[o];o[0]=="@"?o[1]=="i"?a=o+" "+r+";":s+=o[1]=="f"?x(r,o):o+"{"+x(r,o[1]=="k"?"":t)+"}":typeof r=="object"?s+=x(r,t?t.replace(/([^,])+/g,n=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,n):n?n+" "+c:c)):o):r!=null&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=x.p?x.p(o,r):o+":"+r+";")}return a+(t&&i?t+"{"+i+"}":i)+s},b={},M=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+M(e[a]);return t}return e},ae=(e,t,a,s,i)=>{let o=M(e),r=b[o]||(b[o]=(c=>{let d=0,u=11;for(;d<c.length;)u=101*u+c.charCodeAt(d++)>>>0;return"go"+u})(o));if(!b[r]){let c=o!==e?e:(d=>{let u,p,m=[{}];for(;u=ee.exec(d.replace(te,""));)u[4]?m.shift():u[3]?(p=u[3].replace(F," ").trim(),m.unshift(m[0][p]=m[0][p]||{})):m[0][u[1]]=u[2].replace(F," ").trim();return m[0]})(e);b[r]=x(i?{["@keyframes "+r]:c}:c,a?"":"."+r)}let n=a&&b.g?b.g:null;return a&&(b.g=b[r]),((c,d,u,p)=>{p?d.data=d.data.replace(p,c):d.data.indexOf(c)===-1&&(d.data=u?c+d.data:d.data+c)})(b[r],t,s,n),r},re=(e,t,a)=>e.reduce((s,i,o)=>{let r=t[o];if(r&&r.call){let n=r(a),c=n&&n.props&&n.props.className||/^go/.test(n)&&n;r=c?"."+c:n&&typeof n=="object"?n.props?"":x(n,""):n===!1?"":n}return s+i+(r??"")},"");function j(e){let t=this||{},a=e.call?e(t.p):e;return ae(a.unshift?a.raw?re(a,[].slice.call(arguments,1),t.p):a.reduce((s,i)=>Object.assign(s,i&&i.call?i(t.p):i),{}):a,X(t.target),t.g,t.o,t.k)}let S,N,z;j.bind({g:1});let v=j.bind({k:1});function se(e,t,a,s){x.p=t,S=e,N=a,z=s}function w(e,t){let a=this||{};return function(){let s=arguments;function i(o,r){let n=Object.assign({},o),c=n.className||i.className;a.p=Object.assign({theme:N&&N()},n),a.o=/ *go\d+/.test(c),n.className=j.apply(a,s)+(c?" "+c:"");let d=e;return e[0]&&(d=n.as||e,delete n.as),z&&d[0]&&z(n),S(d,n)}return t?t(i):i}}var oe=e=>typeof e=="function",A=(e,t)=>oe(e)?e(t):e,ie=(()=>{let e=0;return()=>(++e).toString()})(),H=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),ne=20,L="default",B=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:s}=t;return B(e,{type:e.toasts.find(r=>r.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(r=>r.id===i||i===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+o}))}}},$=[],U={toasts:[],pausedAt:void 0,settings:{toastLimit:ne}},h={},Z=(e,t=L)=>{h[t]=B(h[t]||U,e),$.forEach(([a,s])=>{a===t&&s(h[t])})},W=e=>Object.keys(h).forEach(t=>Z(e,t)),le=e=>Object.keys(h).find(t=>h[t].toasts.some(a=>a.id===e)),O=(e=L)=>t=>{Z(t,e)},ce={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},de=(e={},t=L)=>{let[a,s]=l.useState(h[t]||U),i=l.useRef(h[t]);l.useEffect(()=>(i.current!==h[t]&&s(h[t]),$.push([t,s]),()=>{let r=$.findIndex(([n])=>n===t);r>-1&&$.splice(r,1)}),[t]);let o=a.toasts.map(r=>{var n,c,d;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||((n=e[r.type])==null?void 0:n.removeDelay)||e?.removeDelay,duration:r.duration||((c=e[r.type])==null?void 0:c.duration)||e?.duration||ce[r.type],style:{...e.style,...(d=e[r.type])==null?void 0:d.style,...r.style}}});return{...a,toasts:o}},ue=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:a?.id||ie()}),E=e=>(t,a)=>{let s=ue(t,e,a);return O(s.toasterId||le(s.id))({type:2,toast:s}),s.id},f=(e,t)=>E("blank")(e,t);f.error=E("error");f.success=E("success");f.loading=E("loading");f.custom=E("custom");f.dismiss=(e,t)=>{let a={type:3,toastId:e};t?O(t)(a):W(a)};f.dismissAll=e=>f.dismiss(void 0,e);f.remove=(e,t)=>{let a={type:4,toastId:e};t?O(t)(a):W(a)};f.removeAll=e=>f.remove(void 0,e);f.promise=(e,t,a)=>{let s=f.loading(t.loading,{...a,...a?.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let o=t.success?A(t.success,i):void 0;return o?f.success(o,{id:s,...a,...a?.success}):f.dismiss(s),i}).catch(i=>{let o=t.error?A(t.error,i):void 0;o?f.error(o,{id:s,...a,...a?.error}):f.dismiss(s)}),e};var pe=1e3,me=(e,t="default")=>{let{toasts:a,pausedAt:s}=de(e,t),i=l.useRef(new Map).current,o=l.useCallback((p,m=pe)=>{if(i.has(p))return;let g=setTimeout(()=>{i.delete(p),r({type:4,toastId:p})},m);i.set(p,g)},[]);l.useEffect(()=>{if(s)return;let p=Date.now(),m=a.map(g=>{if(g.duration===1/0)return;let C=(g.duration||0)+g.pauseDuration-(p-g.createdAt);if(C<0){g.visible&&f.dismiss(g.id);return}return setTimeout(()=>f.dismiss(g.id,t),C)});return()=>{m.forEach(g=>g&&clearTimeout(g))}},[a,s,t]);let r=l.useCallback(O(t),[t]),n=l.useCallback(()=>{r({type:5,time:Date.now()})},[r]),c=l.useCallback((p,m)=>{r({type:1,toast:{id:p,height:m}})},[r]),d=l.useCallback(()=>{s&&r({type:6,time:Date.now()})},[s,r]),u=l.useCallback((p,m)=>{let{reverseOrder:g=!1,gutter:C=8,defaultPosition:P}=m||{},D=a.filter(y=>(y.position||P)===(p.position||P)&&y.height),K=D.findIndex(y=>y.id===p.id),T=D.filter((y,I)=>I<K&&y.visible).length;return D.filter(y=>y.visible).slice(...g?[T+1]:[0,T]).reduce((y,I)=>y+(I.height||0)+C,0)},[a]);return l.useEffect(()=>{a.forEach(p=>{if(p.dismissed)o(p.id,p.removeDelay);else{let m=i.get(p.id);m&&(clearTimeout(m),i.delete(p.id))}})},[a,o]),{toasts:a,handlers:{updateHeight:c,startPause:n,endPause:d,calculateOffset:u}}},fe=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,ge=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ye=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,he=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${fe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ge} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${ye} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,be=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ve=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${be} 1s linear infinite;
`,xe=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,we=v`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Ee=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${xe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${we} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Ce=w("div")`
  position: absolute;
`,ke=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,$e=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ae=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${$e} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,je=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return t!==void 0?typeof t=="string"?l.createElement(Ae,null,t):t:a==="blank"?null:l.createElement(ke,null,l.createElement(ve,{...s}),a!=="loading"&&l.createElement(Ce,null,a==="error"?l.createElement(he,{...s}):l.createElement(Ee,{...s})))},Oe=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,De=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Ie="0%{opacity:0;} 100%{opacity:1;}",Ne="0%{opacity:1;} 100%{opacity:0;}",ze=w("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Le=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Pe=(e,t)=>{let a=e.includes("top")?1:-1,[s,i]=H()?[Ie,Ne]:[Oe(a),De(a)];return{animation:t?`${v(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Te=l.memo(({toast:e,position:t,style:a,children:s})=>{let i=e.height?Pe(e.position||t||"top-center",e.visible):{opacity:0},o=l.createElement(je,{toast:e}),r=l.createElement(Le,{...e.ariaProps},A(e.message,e));return l.createElement(ze,{className:e.className,style:{...i,...a,...e.style}},typeof s=="function"?s({icon:o,message:r}):l.createElement(l.Fragment,null,o,r))});se(l.createElement);var _e=({id:e,className:t,style:a,onHeightUpdate:s,children:i})=>{let o=l.useCallback(r=>{if(r){let n=()=>{let c=r.getBoundingClientRect().height;s(e,c)};n(),new MutationObserver(n).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return l.createElement("div",{ref:o,className:t,style:a},i)},Fe=(e,t)=>{let a=e.includes("top"),s=a?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:H()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...s,...i}},Re=j`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,k=16,He=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:i,toasterId:o,containerStyle:r,containerClassName:n})=>{let{toasts:c,handlers:d}=me(a,o);return l.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:k,left:k,right:k,bottom:k,pointerEvents:"none",...r},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(u=>{let p=u.position||t,m=d.calculateOffset(u,{reverseOrder:e,gutter:s,defaultPosition:t}),g=Fe(p,m);return l.createElement(_e,{id:u.id,key:u.id,onHeightUpdate:d.updateHeight,className:u.visible?Re:"",style:g},u.type==="custom"?A(u.message,u):i?i(u):l.createElement(Te,{toast:u,position:p}))}))},Be=f;export{He as F,Se as c,Be as z};
