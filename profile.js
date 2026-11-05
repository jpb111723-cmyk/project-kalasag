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
(function(){
  const home=/(^|\/)(index\.html)?$/.test(location.pathname);
  if(!home&&!KP.agreed()){location.replace("index.html");return}
  const st=document.createElement("style");
  st.textContent=":root{--bg:#0f1b45;--panel:#19285f;--ink:#f4f1ea;--mute:#b6bddb;--amber:#f5b335;--orange:#ee8a2b;--red:#d8452f}"+
  "body{background:radial-gradient(130% 60% at 50% 112%,rgba(238,138,43,.30),transparent 62%),radial-gradient(90% 45% at 0% 0%,rgba(52,71,154,.5),transparent 70%),#0f1b45;background-attachment:fixed;color:#f4f1ea}"+
  "h1,h2{font-family:Georgia,'Times New Roman',serif;letter-spacing:.01em}"+
  ".kbar{position:sticky;top:0;z-index:6;display:flex;align-items:center;gap:10px;padding:8px 14px;background:rgba(10,18,54,.94);border-bottom:2px solid #f5b335}"+
  ".kbar a{display:flex;align-items:center;gap:10px;color:#f5b335;text-decoration:none;font:800 .95rem Georgia,serif;letter-spacing:.14em}"+
  ".kbar span{color:#b6bddb;font:500 .78rem system-ui;letter-spacing:.02em}";
  document.head.appendChild(st);
  if(!home){
    const b=document.createElement("header");b.className="kbar";
    b.innerHTML='<a href="index.html">'+KP.shield(26)+'PROJECT KALASAG</a>';
    document.body.insertBefore(b,document.body.firstChild);
  }
})();
