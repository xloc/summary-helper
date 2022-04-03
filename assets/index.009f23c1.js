import{D as x,a as g,j as b,r as f,c as N,u as w,R as T,b as v}from"./vendor.84db66cc.js";const C=function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}};C();function k(a){const u=/^(F[-A-Z0-9]{15}) (\d+) \?\? (.+)$/,l=a.match(u);if(l){const t=l[1],r=l[2],n=l[3];return{serialNumber:t,careTicketNumber:r,company:n}}const o=/^\d{2}. (F[-A-Z0-9]{15}) (\d+) ([_A-Z]+) -+ (.+)$/,e=a.match(o);if(e){const t=e[1],r=e[2],n=e[3],c=e[4];return{serialNumber:t,careTicketNumber:r,country:n,summary:c}}}const R=function(a){var u=x.now().setZone("America/Vancouver").minus(g.fromObject({weeks:1}));let l=u.year,o=u.weekNumber,e=[];a=a.trim();const t=a.match(/^Y([0-9]{2})WK([0-9]{2})/);t&&(l=2e3+parseInt(t[1]),o=parseInt(t[2]),a.slice(a.indexOf(`
`)+1));const r=/^(\s*[A-Z]{3}\s*)$/m;let n=a.split(r);for(let c=0;c<n.length;c++){let i=n[c];if(i.match(r)&&(i=i.trim(),c+1<n.length)){c+=1;let d=n[c].trim();e.push({name:i,units:d.split(`
`).map(k).filter(y=>y!==void 0)})}}return{year:l,week:o,models:e}},s=b.exports.jsx,m=b.exports.jsxs;function h({className:a,text:u,i_unit:l,i_model:o,attribute:e,onChange:t}){const[r,n]=f.exports.useState(u);return s("td",{className:a,children:s("input",{className:"w-full opacity-80",type:"text",value:r,onChange:c=>{n(c.target.value)},onBlur:()=>{r&&t(o,l,e,r)}})})}function $({data:a,onChange:u}){if(!a)return s("div",{children:"Invalid Data"});const l=(o,e,t,r)=>{u(o,e,t,r.trim().replaceAll(" ","_"))};return m("div",{className:"h-full w-full",children:[m("h1",{className:"font-mono text-sm font-bold py-3",children:["Year: ",a.year,"  Week: ",a.week]}),m("table",{className:"text-sm font-mono w-full",children:[s("thead",{className:"font-bold",children:m("tr",{children:[s("td",{children:"Serial Number"}),s("td",{children:"Ticket"}),s("td",{children:"Country"}),s("td",{children:"Summary"}),s("td",{children:"Company"})]})}),s("tbody",{children:a.models.flatMap((o,e)=>o.units.map((t,r)=>m("tr",{className:"hover:bg-slate-200",children:[s("td",{className:"select-all w-[12em]",children:t.serialNumber}),s("td",{className:"select-all w-[6em]",children:t.careTicketNumber}),s(h,{className:"select-all w-[12em] pr-2",i_model:e,i_unit:r,attribute:"country",onChange:l,text:t.country}),s(h,{className:"w-[35em] pr-2",i_model:e,i_unit:r,attribute:"summary",onChange:u,text:t.summary}),s("td",{children:t.company})]},`${e} ${r}`)))})]})]})}function I(a){const u=f.exports.useRef(null);return f.exports.useEffect(()=>{if(!u.current)return;const l=u.current;l.textContent="",a.onChange(l.textContent)},[]),s("textarea",{ref:u,className:"border p-2 w-full h-full font-mono text-xs",onChange:l=>{let o=l;a.onChange(o.target.value)}})}const p=a=>a.toString().padStart(2,"0");function M({data:a}){if(!a)return s("div",{children:"Invalid Data"});const{year:u,week:l,models:o}=a,e=o.flatMap(r=>r.units.length).reduce((r,n)=>r+n),t=o.flatMap(r=>r.units.map(n=>{var c,i;return(i=(c=n.country)==null?void 0:c.length)!=null?i:0})).reduce((r,n)=>Math.max(r,n));return console.log({year:u,week:l,nUnit:e,maxCountryLength:t}),m("pre",{children:["Y",p(u%100),"WK",p(l)," - ",e," units",s("br",{}),o.map(r=>`
`+r.name+`
`+r.units.map((n,c)=>{var i,d;return`${p(c+1)}. ${n.serialNumber} ${n.careTicketNumber} ${n.country} ${"-".repeat(t+1-((d=(i=n.country)==null?void 0:i.length)!=null?d:0))} ${n.summary}
`}).reduce((n,c)=>n+c))]})}function S(){const[a,u]=f.exports.useState("table"),l=(n,c)=>s("li",{className:N("p-1 w-40 text-center  rounded-lg shadow-md",{"text-white bg-slate-600":a===n,"text-black border ":a!==n}),onClick:()=>{u(n)},children:c}),[o,e]=f.exports.useState(),t=n=>{let c=R(n);c&&e(c)},r=(n,c,i,d)=>{!o||e(w(o,{models:{[n]:{units:{[c]:{[i]:{$set:d}}}}}}))};return s("div",{className:"h-screen",children:m("div",{className:"flex flex-col p-2 h-full",children:[m("ul",{className:"flex text-lg w-full h-30 space-x-2 mb-2 select-none",children:[l("input","Input"),l("table","Table"),l("output","Output")]}),s("div",{className:"flex-1",children:a==="input"?s(I,{data:o,onChange:t}):a==="table"?s($,{data:o,onChange:r}):a==="output"?s(M,{data:o}):"not a valid tab"})]})})}T.render(s(v.StrictMode,{children:s(S,{})}),document.getElementById("root"));