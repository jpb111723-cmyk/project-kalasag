/* KALASAG shared profile and language. Stored on the user's device only. */
window.KP={
  key:"kalasag_profile",
  get(){try{return JSON.parse(localStorage.getItem(this.key))||{v:1}}catch(e){return{v:1}}},
  set(phase,data){try{const p=this.get();p[phase]=Object.assign(p[phase]||{},data);p.updated=Date.now();localStorage.setItem(this.key,JSON.stringify(p));return p}catch(e){return null}},
  clear(){try{localStorage.removeItem(this.key)}catch(e){}},
  lang(){try{return localStorage.getItem("kalasag_lang")||"en"}catch(e){return"en"}},
  setLang(l){try{localStorage.setItem("kalasag_lang",l)}catch(e){}}
};
