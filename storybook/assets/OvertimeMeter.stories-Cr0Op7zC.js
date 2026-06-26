import{i as e}from"./preload-helper-CT_b8DTk.js";import{t}from"./jsx-runtime-DqZldVDK.js";function n({normal:e,doble:t,triple:n,objetivo:o,semanaAnterior:s,theme:c=`light`}){let l=c===`dark`,u={normal:e,doble:t,triple:n},d=e+t+n,f=t+n,p=Math.max(d,o??0,1e-4),m=s===void 0?void 0:d-s,h=`Horas de la semana: ${a(d)} en total. ${a(e)} normales, ${a(t)} al doble, ${a(n)} al triple.${o===void 0?``:` Objetivo ${a(o)}.`}`;return(0,r.jsxs)(`div`,{className:`overflow-hidden rounded-[14px] border shadow-[0_4px_24px_-12px_rgba(28,28,26,0.18)] ${l?`border-ink-700 bg-ink-900`:`border-line bg-paper`}`,children:[(0,r.jsxs)(`div`,{className:`flex items-end justify-between border-b px-4 py-3 ${l?`border-ink-700`:`border-line`}`,children:[(0,r.jsxs)(`div`,{children:[(0,r.jsx)(`h3`,{className:`font-display text-sm font-semibold ${l?`text-paper`:`text-ink`}`,children:`Horas de la semana`}),f>0&&(0,r.jsxs)(`p`,{className:`mt-0.5 font-mono text-xs ${l?`text-taupe`:`text-ink-soft`}`,children:[a(f),` de tiempo extra`]})]}),(0,r.jsxs)(`div`,{className:`text-right`,children:[(0,r.jsx)(`span`,{className:`font-mono text-2xl font-semibold tabular-nums ${l?`text-paper`:`text-ink`}`,children:a(d)}),m!==void 0&&m!==0&&(0,r.jsxs)(`p`,{className:`font-mono text-xs tabular-nums ${l?`text-taupe`:`text-ink-soft`}`,children:[m>0?`▲`:`▼`,` `,a(Math.abs(m)),` vs semana pasada`]})]})]}),(0,r.jsx)(`div`,{className:`p-4`,children:d===0?(0,r.jsxs)(`div`,{className:`flex flex-col items-center gap-3 py-6 text-center`,children:[(0,r.jsx)(`div`,{className:`h-10 w-full rounded-lg ${l?`bg-ink-800`:`bg-paper-2`}`}),(0,r.jsx)(`p`,{className:`text-sm ${l?`text-taupe`:`text-ink-soft`}`,children:`Sin horas registradas esta semana.`})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(`div`,{className:`relative mt-5`,children:[(0,r.jsx)(`div`,{role:`img`,"aria-label":h,className:`flex h-10 w-full overflow-hidden rounded-lg ${l?`bg-ink-800`:`bg-paper-2`}`,children:i.map(e=>{let t=u[e.key];if(t<=0)return null;let n=t/p*100;return(0,r.jsx)(`div`,{title:`${e.label}: ${a(t)}`,className:`klk-grow h-full`,style:{width:`${n}%`,background:e.color}},e.key)})}),o!==void 0&&o>0&&o<=p&&(0,r.jsxs)(`div`,{className:`absolute top-0 h-10`,style:{left:`${o/p*100}%`},title:`Objetivo: ${a(o)}`,children:[(0,r.jsx)(`div`,{className:`h-full w-0.5 ${l?`bg-paper`:`bg-ink`}`}),(0,r.jsxs)(`span`,{className:`absolute -top-5 whitespace-nowrap font-mono text-[10px] ${o/p>.9?`right-0`:`-translate-x-1/2`} ${l?`text-taupe`:`text-ink-soft`}`,children:[`Obj. `,a(o)]})]})]}),(0,r.jsx)(`ul`,{className:`mt-4 flex flex-wrap gap-x-5 gap-y-2`,children:i.map(e=>(0,r.jsxs)(`li`,{className:`flex items-center gap-2`,children:[(0,r.jsx)(`span`,{className:`h-2.5 w-2.5 rounded-sm`,style:{background:e.color},"aria-hidden":!0}),(0,r.jsx)(`span`,{className:`text-xs ${l?`text-taupe`:`text-ink-soft`}`,children:e.label}),(0,r.jsx)(`span`,{className:`font-mono text-xs font-medium tabular-nums ${l?`text-paper`:`text-ink`}`,children:a(u[e.key])})]},e.key))})]})})]})}var r,i,a,o=e((()=>{r=t(),i=[{key:`normal`,label:`Normal`,color:`#4b7a5a`},{key:`doble`,label:`Doble`,color:`#b07d2b`},{key:`triple`,label:`Triple`,color:`#b5482f`}],a=e=>`${Number.isInteger(e)?e:e.toFixed(1)} h`,n.__docgenInfo={description:``,methods:[],displayName:`OvertimeMeter`,props:{normal:{required:!0,tsType:{name:`number`},description:`Horas a tarifa normal.`},doble:{required:!0,tsType:{name:`number`},description:`Horas pagadas al doble.`},triple:{required:!0,tsType:{name:`number`},description:`Horas pagadas al triple.`},objetivo:{required:!1,tsType:{name:`number`},description:`Horas objetivo de la semana (marca en la barra).`},semanaAnterior:{required:!1,tsType:{name:`number`},description:`Total de horas de la semana anterior, para el comparativo (bonus).`},theme:{required:!1,tsType:{name:`union`,raw:`"light" | "dark"`,elements:[{name:`literal`,value:`"light"`},{name:`literal`,value:`"dark"`}]},description:`Tema visual.`,defaultValue:{value:`"light"`,computed:!1}}}}})),s,c,l,u,d,f;e((()=>{o(),s={title:`Klockk/OvertimeMeter`,component:n,parameters:{layout:`padded`}},c={args:{normal:0,doble:0,triple:0,objetivo:48}},l={args:{normal:40,doble:0,triple:0,objetivo:48}},u={args:{normal:40,doble:6,triple:2,objetivo:48,semanaAnterior:44}},d={args:{normal:40,doble:6,triple:2,objetivo:48,semanaAnterior:44,theme:`dark`}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    normal: 0,
    doble: 0,
    triple: 0,
    objetivo: 48
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    normal: 40,
    doble: 0,
    triple: 0,
    objetivo: 48
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    normal: 40,
    doble: 6,
    triple: 2,
    objetivo: 48,
    semanaAnterior: 44
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    normal: 40,
    doble: 6,
    triple: 2,
    objetivo: 48,
    semanaAnterior: 44,
    theme: "dark"
  }
}`,...d.parameters?.docs?.source}}},f=[`CeroHoras`,`SoloNormal`,`ConTiempoExtra`,`ModoOscuro`]}))();export{c as CeroHoras,u as ConTiempoExtra,d as ModoOscuro,l as SoloNormal,f as __namedExportsOrder,s as default};