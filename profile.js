/* KALASAG shared layer: profile, language, agreement gate, theme. Everything stays on the user's device. */
window.KP={
  key:"kalasag_profile",
  get(){try{return JSON.parse(localStorage.getItem(this.key))||{v:1}}catch(e){return{v:1}}},
  set(phase,data){try{const p=this.get();p[phase]=Object.assign(p[phase]||{},data);p.updated=Date.now();localStorage.setItem(this.key,JSON.stringify(p));return p}catch(e){return null}},
  clear(){try{localStorage.removeItem(this.key)}catch(e){}},
  lang(){try{return localStorage.getItem("kalasag_lang")||"en"}catch(e){return"en"}},
  setLang(l){try{localStorage.setItem("kalasag_lang",l)}catch(e){}},
  /* agreement: localStorage, with window.name as a same-tab fallback when storage is blocked */
  agreed(){try{if(localStorage.getItem("kalasag_agreed")==="1")return true}catch(e){}return window.name==="kalasag_ok"},
  agree(){try{localStorage.setItem("kalasag_agreed","1")}catch(e){}window.name="kalasag_ok"},
  shield(h){return`<svg width="${h*.89}" height="${h}" viewBox="0 0 32 36" aria-hidden="true"><path d="M16 1L2 6v12c0 9 6 15 14 17z" fill="#2f45a8"/><path d="M16 1l14 5v12c0 9-6 15-14 17z" fill="#d8532b"/><path d="M16 1L2 6v12c0 9 6 15 14 17 8-2 14-8 14-17V6z" fill="none" stroke="#f5b335" stroke-width="2"/><rect x="14" y="9" width="4" height="14" rx=".8" fill="#fff"/><rect x="9" y="14" width="14" height="4" rx=".8" fill="#fff"/></svg>`}
};
/* KALASAG refresh guard: a refresh asks "start over?" and, if confirmed, erases all site data and returns to the start notice. */
(function(){
  const wipe=function(){
    try{Object.keys(localStorage).forEach(function(k){if(k.indexOf("kalasag")===0)localStorage.removeItem(k)})}catch(e){}
    try{sessionStorage.clear()}catch(e){}
    window.name="";
  };
  window.KPwipe=wipe;
  let reloaded=false,confirmed=false;
  try{const n=performance.getEntriesByType("navigation")[0];reloaded=n?n.type==="reload":(performance.navigation&&performance.navigation.type===1)}catch(e){}
  try{confirmed=sessionStorage.getItem("kalasag_rc")==="1";sessionStorage.removeItem("kalasag_rc")}catch(e){}
  if(reloaded&&confirmed)wipe();
  window.KPask=reloaded&&!confirmed;
})();
(function(){
  const home=/(^|\/)(index\.html)?$/.test(location.pathname);
  if(!home&&!KP.agreed()){location.replace("index.html");return}
  const st=document.createElement("style");
  st.textContent='@font-face{font-family:"KalasagBold";src:url(fonts/kalasag-bold.woff) format("woff");font-weight:700 800;font-display:swap}'+
  ":root{--font:'KalasagBold','Arial Rounded MT Bold','Trebuchet MS','Segoe UI',Verdana,sans-serif}"+
  "body{font-family:system-ui,'Segoe UI',Roboto,Arial,sans-serif;font-weight:600}"+
  "h1,h2,h3,button,.btn,.tag,.chip,.num,.cnt,.go,.it,.slogan,.stage b,.kbar a,.nextbtn{font-family:var(--font)!important;font-weight:700}"+
  ".nextbtn{display:block;margin:18px 0 6px;padding:16px;border-radius:16px;text-align:center;text-decoration:none;font-size:1.1rem;color:#0f1b45!important;background:linear-gradient(180deg,#ffd35c,#f5a31d);box-shadow:0 6px 0 #a56b0c}"+
  ".nextbtn:active{transform:translateY(3px);box-shadow:0 3px 0 #a56b0c}"+
  ":root{--bg:#0f1b45;--panel:#19285f;--ink:#f4f1ea;--mute:#b6bddb;--amber:#f5b335;--orange:#ee8a2b;--red:#d8452f}"+
  "body{background:radial-gradient(130% 60% at 50% 112%,rgba(238,138,43,.30),transparent 62%),radial-gradient(90% 45% at 0% 0%,rgba(52,71,154,.5),transparent 70%),#0f1b45;background-attachment:fixed;color:#f4f1ea}"+
  "h1,h2{letter-spacing:.01em}"+
  ".kbar{position:sticky;top:0;z-index:6;display:flex;align-items:center;gap:10px;padding:8px 14px;background:rgba(10,18,54,.94);border-bottom:2px solid #f5b335}"+
  ".kbar a{display:flex;align-items:center;gap:10px;color:#f5b335;text-decoration:none;font:800 .95rem var(--font);letter-spacing:.14em}"+
  ".kbar span{color:#b6bddb;font:500 .78rem system-ui;letter-spacing:.02em}";
  document.head.appendChild(st);
  if(!home){
    const b=document.createElement("header");b.className="kbar";
    b.innerHTML='<a href="index.html">'+KP.shield(26)+'PROJECT KALASAG</a>';
    document.body.insertBefore(b,document.body.firstChild);
  }
})();

/* Refresh confirm: the browser's own OK / Cancel dialog, before a keyboard refresh (F5, Ctrl+R, Cmd+R) or right after any other refresh. Nothing is erased until the user presses OK. */
(function(){
  const T={
    en:{pre:"Refresh and start over?\n\nRefreshing erases everything you have done on this site and takes you back to the start notice.\n\nOK = refresh and erase\nCancel = stay here",
        post:"You refreshed the page. Start over?\n\nStarting over erases everything you have done on this site and takes you back to the start notice.\n\nOK = erase and start over\nCancel = keep my progress"},
    tl:{pre:"I-refresh at magsimula ulit?\n\nBuburahin ng pag-refresh ang lahat ng ginawa mo sa site na ito at ibabalik ka sa unang abiso.\n\nOK = i-refresh at burahin\nCancel = manatili rito",
        post:"Nag-refresh ka ng page. Magsimula ulit?\n\nBuburahin ng pagsisimula ulit ang lahat ng ginawa mo sa site na ito at ibabalik ka sa unang abiso.\n\nOK = burahin at magsimula ulit\nCancel = panatilihin ang progress ko"}
  };
  const say=function(m){return (T[KP.lang()]||T.en)[m]};
  document.addEventListener("keydown",function(e){
    const k=(e.key||"").toLowerCase();
    if(k==="f5"||((e.ctrlKey||e.metaKey)&&k==="r")){
      if(!KP.agreed())return;
      e.preventDefault();
      if(confirm(say("pre"))){try{sessionStorage.setItem("kalasag_rc","1")}catch(x){}location.reload()}
    }
  },true);
  function after(){
    if(!(window.KPask&&KP.agreed()))return;
    requestAnimationFrame(function(){setTimeout(function(){
      if(confirm(say("post"))){KPwipe();location.replace("index.html")}
    },60)});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",after);else after();
})();
