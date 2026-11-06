/* KALASAG scene art: one animated SVG scene per hazard. KS.scene(kind, intensity 0..1.1, gameOver, hasBag, previousIntensity) */
(function(){
const css=document.createElement("style");
css.textContent=`.scene svg *{transform-box:fill-box}
.rn line{stroke-width:1.1;opacity:.55;animation:kr linear infinite}
@keyframes kr{from{transform:translate(0,-26px)}to{transform:translate(var(--dx,0),170px)}}
.wv{animation:kw linear infinite}@keyframes kw{to{transform:translateX(-40px)}}
.rise{animation:krise 2.6s ease-out both}@keyframes krise{from{transform:translateY(var(--f))}to{transform:translateY(var(--t))}}
.fl{animation:kfl 2.4s ease-in-out infinite}@keyframes kfl{50%{transform:translateY(-3px) rotate(8deg)}}
.sw{transform-origin:50% 100%;animation:ksw ease-in-out infinite alternate}@keyframes ksw{from{transform:rotate(calc(var(--a)*-1))}to{transform:rotate(var(--a))}}
.fx{opacity:0;animation:kfx 7s infinite}@keyframes kfx{0%,90%,100%{opacity:0}92%{opacity:.75}94%{opacity:.05}96%{opacity:.6}}
.fk{animation:kfk 1.7s steps(1) infinite}@keyframes kfk{0%{opacity:1}30%{opacity:.55}34%{opacity:1}70%{opacity:.7}74%{opacity:1}}
.dr{animation:kdr ease-in-out infinite alternate}@keyframes kdr{from{transform:translateX(-30px)}to{transform:translateX(30px)}}
.wd{animation:kwd linear infinite}@keyframes kwd{from{transform:translateX(60px)}to{transform:translateX(-380px)}}
.fy{animation:kfy linear infinite}@keyframes kfy{from{transform:translate(0,0) rotate(0)}to{transform:translate(-420px,40px) rotate(900deg)}}
.pl{animation:kpl 1s ease-in-out infinite alternate}@keyframes kpl{from{opacity:.25}to{opacity:1}}
.sk{animation:ksk linear infinite}@keyframes ksk{0%{transform:translate(0,0)}25%{transform:translate(calc(var(--s)*-1),calc(var(--s)*.6))}50%{transform:translate(var(--s),calc(var(--s)*-.5))}75%{transform:translate(calc(var(--s)*-.6),calc(var(--s)*-.8))}100%{transform:translate(0,0)}}
.db{animation:kdb ease-in infinite}@keyframes kdb{from{transform:translateY(-6px) rotate(0);opacity:1}to{transform:translateY(130px) rotate(200deg);opacity:.2}}
.du{animation:kdu 3.4s ease-out infinite}@keyframes kdu{from{transform:translateY(8px) scale(.6);opacity:.55}to{transform:translateY(-14px) scale(1.5);opacity:0}}
.em{animation:kem ease-out infinite}@keyframes kem{from{transform:translate(0,0);opacity:1}to{transform:translate(var(--dx),-70px);opacity:0}}
.af{animation:kaf linear infinite}@keyframes kaf{from{transform:translate(0,-10px)}to{transform:translate(var(--dx),170px)}}
.bb{animation:kbb 2.8s ease-in-out infinite}@keyframes kbb{50%{transform:translateY(-3px) rotate(-5deg)}}
.ro{animation:kro 2.2s ease-in infinite}@keyframes kro{from{transform:translate(0,0) rotate(0)}to{transform:translate(-90px,60px) rotate(500deg)}}
.bd{animation:kbd 1.2s ease-in-out infinite}@keyframes kbd{50%{transform:translateY(-5px)}}
.pu{animation:kpu 3s ease-in-out infinite alternate}@keyframes kpu{to{opacity:.55}}
@media (prefers-reduced-motion:reduce){.scene svg *{animation:none!important;transition:none!important}}`;
document.head.appendChild(css);
const r=i=>{const s=Math.sin(i*127.1+311.7)*43758.5453;return s-Math.floor(s)};
const rain=(n,dx,dur,col)=>{let s=`<g class="rn" style="--dx:${dx}px">`;for(let i=0;i<n;i++){const x=Math.round(r(i+1)*340-10);s+=`<line x1="${x}" y1="0" x2="${x+dx/10}" y2="11" stroke="${col||"#9ccfe0"}" style="animation-duration:${(dur+r(i+9)*.4).toFixed(2)}s;animation-delay:-${(r(i+3)*1.2).toFixed(2)}s"/>`}return s+"</g>"};
const wave=(y,fill,op,dur,stroke)=>`<g class="wv" style="animation-duration:${dur}s"><rect x="-40" y="${y}" width="400" height="170" fill="${fill}" opacity="${op}"/><path d="M-40 ${y}${"q10-7 20 0t20 0".repeat(10)}" fill="none" stroke="${stroke||"#bfe6ef"}" stroke-width="2" opacity="${Math.min(1,op+.15)}"/></g>`;
const rise=(w,pw,k,inner)=>`<g class="rise" style="--f:${-Math.round(pw*k)}px;--t:${-Math.round(w*k)}px">${inner}</g>`;
const person=(x,y,o)=>{o=o||{};const t=o.lie?`translate(${x} ${y+6}) rotate(88)`:`translate(${x} ${y})`;return `<g transform="${t}"><circle cx="0" cy="-20" r="6" fill="#f5b335"/><rect x="-6" y="-13" width="12" height="20" rx="5" fill="#f4f1ea"/>${o.mask?'<rect x="-4" y="-19" width="8" height="5" rx="2" fill="#dfe4ee"/>':""}${o.bag?'<rect x="5" y="-9" width="9" height="13" rx="3" fill="#d8532b" stroke="#f5b335" stroke-width="1"/><rect x="8" y="-5" width="3" height="1.5" fill="#f4f1ea"/>':""}${o.arms?'<path d="M-6 -10L-13 -22M6 -10L13 -22" stroke="#f4f1ea" stroke-width="3" stroke-linecap="round"/>':""}</g>`};
const house=(x,y,w,h,roof,lit,boards)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#4a5d6b"/><polygon points="${x-8},${y} ${x+w/2},${y-32} ${x+w+8},${y}" fill="${roof||"#33444f"}"/><rect x="${x+w/2-11}" y="${y+h-34}" width="22" height="34" fill="#243540"/>`+[0,1].map(i=>`<rect class="${lit?"fk":""}" x="${x+10+i*(w-34)}" y="${y+14}" width="14" height="14" fill="${lit?"#f5b335":"#243540"}"${boards?"":""}/>${boards?`<path d="M${x+8+i*(w-34)} ${y+12}l18 18M${x+26+i*(w-34)} ${y+12}l-18 18" stroke="#b58a52" stroke-width="3"/>`:""}`).join("");
const ground=c=>`<rect x="0" y="120" width="320" height="30" fill="${c||"#1d2e38"}"/>`;
const sky=(id,a,b)=>`<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="320" height="150" fill="url(#${id})"/>`;
const bolt=`<rect class="fx" width="320" height="150" fill="#dcecff"/>`;
const palm=(x,a,s)=>`<g class="sw" style="--a:${a}deg;animation-duration:${s}s"><path d="M${x} 120Q${x-4} 90 ${x+3} 62" stroke="#6b4f3a" stroke-width="4" fill="none"/><path d="M${x+3} 62q-22-8-30 6M${x+3} 62q-14-16-30-8M${x+3} 62q10-18 28-12M${x+3} 62q22-4 28 10" stroke="#3f8f55" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
const SC={
flood(w,o,b,pw){
 const lit=[0,1,2,3,4,5].map(i=>`<rect class="fk" x="${8+i*26}" y="${58+(i%3)*8}" width="16" height="${62-(i%3)*8}" fill="#16234f"/><rect x="${12+i*26}" y="${66+(i%3)*8}" width="4" height="5" fill="${w>.5&&i%2?"#16234f":"#f5b335"}" opacity=".8"/>`).join("");
 const debris=`<g class="fl"><rect x="96" y="127" width="11" height="7" fill="#8a6a45"/></g><g class="fl" style="animation-delay:-1s"><rect x="40" y="130" width="9" height="4" rx="2" fill="#e9eef0" opacity=".8"/></g><g class="fl" style="animation-delay:-1.6s"><circle cx="140" cy="131" r="4" fill="#c3d4d8" opacity=".7"/></g>`;
 return sky("sf","#070d2b","#1d2f63")+lit+`<g class="fk"><rect x="36" y="64" width="3" height="56" fill="#33444f"/><circle cx="37" cy="62" r="14" fill="#f5b335" opacity=".16"/><circle cx="37" cy="62" r="4" fill="#ffe08a"/></g>`+house(172,62,118,58,"#33444f",w<.6)+rain(30,-4,.75)+bolt+ground()+
 rise(o?1.1:w,o?w:(pw==null?w:pw),72,wave(124,"#1e6a82",.7,5)+wave(132,"#2f8fa3",.82,3)+debris)+person(o?232:70,o?32:113,{bag:b&&!o,arms:o,mask:false})},
typhoon(w,o,b,pw){
 const cl=[0,1,2,3].map(i=>`<ellipse class="dr" cx="${40+i*80}" cy="${14+(i%2)*14}" rx="60" ry="16" fill="#10172a" opacity=".75" style="animation-duration:${3+i}s"/>`).join("");
 const wd=[0,1,2,3,4].map(i=>`<line class="wd" x1="320" y1="${22+i*20}" x2="${360+i*10}" y2="${22+i*20}" stroke="#e9eef0" stroke-width="1.5" opacity=".3" style="animation-duration:${.6+i*.12}s;animation-delay:-${i*.3}s"/>`).join("");
 const fy=[0,1,2].map(i=>`<rect class="fy" x="330" y="${30+i*22}" width="14" height="5" fill="#9aa7ad" style="animation-duration:${2.2+i*.5}s;animation-delay:-${i*.9}s"/>`).join("");
 return sky("st","#141b30","#3b4864")+cl+house(176,62,110,58,"#2a3944",false,true)+palm(42,4+w*14,1.1-w*.4)+rain(40,-34,.5,"#c3dbe6")+wd+fy+bolt+ground("#1c2a33")+
 rise(o?1.1:w,o?w:(pw==null?w:pw),64,wave(130,"#5b7a82",.85,2.4,"#a9c4cb"))+person(o?232:96,o?32:113,{bag:b&&!o,arms:o})},
surge(w,o,b,pw){
 const sb=[0,1,2].map(i=>`<rect x="${158+i*13}" y="112" width="12" height="8" rx="3" fill="#b9a273"/>`).join("")+[0,1].map(i=>`<rect x="${164+i*13}" y="105" width="12" height="8" rx="3" fill="#a8925f"/>`).join("");
 const hs=`<g><rect x="218" y="96" width="4" height="26" fill="#5b4a3a"/><rect x="262" y="96" width="4" height="26" fill="#5b4a3a"/><rect x="212" y="70" width="62" height="28" fill="#4a5d6b"/><polygon points="206,70 243,50 280,70" fill="#33444f"/><rect class="fk" x="222" y="78" width="12" height="12" fill="#f5b335"/></g>`;
 return sky("ss","#24323f","#6d818c")+`<rect x="0" y="68" width="320" height="40" fill="#1a3f52"/>`+palm(300,6+w*14,1.3)+hs+`<polygon points="0,118 150,114 320,121 320,150 0,150" fill="#a58f63"/>`+sb+
 `<g class="bb"><path d="M20 112h40l-8 9H28z" fill="#8a3b2a"/><rect x="38" y="98" width="2" height="14" fill="#e9eef0"/></g>`+rain(16,-22,.7,"#c6dae2")+
 rise(o?1.1:w,o?w:(pw==null?w:pw),50,wave(104,"#16506a",.78,6)+wave(112,"#1f6f8a",.8,3.5,"#e9f6f8")+wave(120,"#2b8aa2",.78,2.2,"#ffffff"))+person(o?150:100,o?114:113,{bag:b&&!o,lie:o})},
tsunami(w,o,b){
 const fx=o?-70:Math.round(300-w*330),ht=34+w*46;
 const wall=`<g transform="translate(${fx} 0)" style="transition:transform 2.4s"><path d="M0 120L0 ${120-ht}Q-14 ${120-ht-14} -30 ${120-ht+6}Q-10 ${120-ht+12} 0 ${120-ht+20}L0 120Z" fill="#2a8aa2"/><rect x="0" y="${120-ht+18}" width="420" height="${ht+60}" fill="#1f6f8a"/>${wave(120-ht+20,"#2a8aa2",.5,2,"#ffffff")}</g>`;
 const birds=[0,1,2].map(i=>`<path class="wd" d="M${200+i*30} ${24+i*10}q5-6 10 0q5-6 10 0" stroke="#1a1030" fill="none" stroke-width="1.5" style="animation-duration:${5+i}s;animation-delay:-${i}s"/>`).join("");
 return sky("sq","#3a2a5a","#f0a35e")+`<circle cx="250" cy="96" r="22" fill="#ffd27a" opacity=".85"/><rect x="0" y="96" width="320" height="26" fill="#2a5a78" opacity=".9"/>`+birds+
 `<polygon points="0,120 0,52 60,70 110,120" fill="#3e4a3a"/><path d="M30 84h26M46 78l10 6-10 6" stroke="#4cae7f" stroke-width="3" fill="none"/>`+
 `<rect x="118" y="70" width="3" height="50" fill="#33444f"/><circle class="pl" cx="119" cy="68" r="5" fill="#ff3b30"/>`+palm(160,5+w*8,1.6)+ground("#b79c6b")+
 `<g class="bb"><path d="M262 112h34l-7 8h-20z" fill="#8a3b2a"/></g>`+wall+person(o?fx+14:84,o?118:113,{bag:b&&!o,lie:o})},
quake(w,o,b,pw){
 const sh=`--s:${(1+w*3.6).toFixed(1)}px;animation-duration:${(.34-w*.18).toFixed(2)}s`;
 let win="";for(let i=0;i<4;i++)for(let j=0;j<3;j++)win+=`<rect class="${(i+j)%2?"fk":""}" x="${166+j*34}" y="${34+i*20}" width="18" height="12" fill="${w>.45&&(i+j)%3==0?"#1a2040":"#f5b335"}"/>`;
 const deb=[0,1,2,3,4].map(i=>`<rect class="db" x="${164+i*24}" y="${24+(i%2)*10}" width="${5+i%3*2}" height="${4+i%2*3}" fill="#9aa3a8" style="animation-duration:${.9+i*.2}s;animation-delay:-${i*.35}s;opacity:${w>.2?1:0}"/>`).join("");
 const dust=[0,1,2].map(i=>`<circle class="du" cx="${180+i*34}" cy="118" r="${12+w*14}" fill="#b9b4aa" style="animation-delay:-${i*1.1}s"/>`).join("");
 const cr=`<path d="M0 132L60 126 90 138 150 128 210 140 320 130" stroke="#0a1236" stroke-width="${1+w*4}" fill="none"/>`;
 return sky("sk","#171c38","#4a3c58")+`<g class="sk" style="${sh}"><g transform="rotate(${(w*2.4).toFixed(1)} 230 120)"><rect x="156" y="22" width="116" height="98" fill="#4a5d6b"/>${win}<path d="M214 22l-6 22 8 18-6 24" stroke="#14202a" stroke-width="${1+w*2.5}" fill="none"/></g>${deb}<g><rect x="96" y="40" width="3" height="80" fill="#33444f"/><path d="M60 52Q96 62 132 52" stroke="#1d2a33" fill="none" stroke-width="1.5"/><circle class="fk" cx="${w>.3?118:118}" cy="${w>.3?55:200}" r="2.5" fill="#ffe08a"/></g>${ground()}${cr}${dust}${person(o?90:50,o?120:113,{bag:b&&!o,arms:w>.2&&!o,lie:o})}</g>`},
slide(w,o,b,pw){
 const m=(x)=>`transform:translate(${Math.round(x*-70)}px,${Math.round(x*38)}px)`;
 const trees=[0,1,2,3].map(i=>`<polygon points="${196+i*30},${60-i*4} ${204+i*30},${44-i*4} ${212+i*30},${60-i*4}" fill="#2f5a3a" style="transform-origin:${204+i*30}px ${60-i*4}px;transform:rotate(${Math.round(w*(10+i*6)*(i%2?1:-1))}deg)"/>`).join("");
 const rocks=[0,1,2].map(i=>`<circle class="ro" cx="${290-i*26}" cy="${34+i*10}" r="${3+i}" fill="#7a6a58" style="animation-delay:-${i*.8}s;opacity:${w>.4?1:0}"/>`).join("");
 return sky("sl","#27323a","#4a5860")+`<ellipse class="dr" cx="120" cy="30" rx="70" ry="10" fill="#6c7b83" opacity=".35" style="animation-duration:6s"/><polygon points="110,120 190,76 320,30 320,120" fill="#4c5a3f"/>`+trees+`<path d="M226 58L270 44" stroke="#2a2118" stroke-width="${1+w*3}"/>`+
 `<g style="${m(o?1.1:w)};transition:transform 2.4s ease-in"><path d="M310 28Q262 44 224 72Q196 92 170 120L320 120Z" fill="#6a4a30" opacity="${w>.35?.95:.0}"/></g>`+rocks+house(40,80,64,40,"#33444f",w<.6)+ground("#3a3226")+`<path d="M0 122h120" stroke="#6a4a30" stroke-width="${3+w*5}" opacity=".7"/>`+rain(20,-6,.8,"#a9c0cc")+person(o?30:18,o?120:113,{bag:b&&!o,lie:o})},
volcano(w,o,b,pw){
 const em=[0,1,2,3,4,5,6,7].map(i=>`<circle class="em" cx="${232+r(i)*10}" cy="46" r="2" fill="#ff9a3c" style="--dx:${Math.round(r(i+5)*60-30)}px;animation-duration:${1.4+r(i+2)}s;animation-delay:-${r(i+8)*2}s"/>`).join("");
 const pl=[0,1,2,3,4,5].map(i=>`<circle class="du" cx="${232+Math.sin(i)*14}" cy="${40-i*(8+w*8)}" r="${9+i*(4+w*3)}" fill="#3a2f33" opacity=".8" style="animation-delay:-${i*.5}s"/>`).join("");
 const n=10+Math.round(w*34),af=[...Array(n)].map((_,i)=>`<circle class="af" cx="${Math.round(r(i+20)*330)}" cy="0" r="1.4" fill="#c9c6c0" style="--dx:-10px;animation-duration:${(3+r(i)*3).toFixed(1)}s;animation-delay:-${(r(i+4)*5).toFixed(1)}s"/>`).join("");
 return sky("sv","#2a0a12","#8a3a1c")+`<polygon points="120,120 232,44 345,120" fill="#2a2022"/><path d="M232 46L206 120M232 46L262 120M232 46L240 120" stroke="#ff7a2b" stroke-width="${1.5+w*2}" class="pl" fill="none"/><ellipse cx="232" cy="46" rx="12" ry="4" fill="#ffb347"/>`+pl+`<polyline class="fx" points="236,30 228,44 236,46 226,62" stroke="#ffe08a" stroke-width="2" fill="none"/>`+em+
 house(30,78,70,42,"#33444f",true)+`<polygon points="22,78 65,46 108,78 ${108-w*10},${78-w*6} 65,${46+4-w*6} ${22+w*10},${78-w*6}" fill="#d9d6cf" opacity="${.3+w*.6}"/>`+ground("#2c2224")+person(o?60:130,o?120:113,{bag:b&&!o,mask:true,lie:o})+af+`<rect width="320" height="150" fill="#6b5f58" opacity="${(w*.28).toFixed(2)}"/>`}
};
window.KS={scene(kind,w,o,b,pw){
 const f=SC[kind]||SC.flood;
 return `<div class="scene"><svg viewBox="0 0 320 150" role="img" aria-label="${kind} scene">${f(w,o,b,pw)}</svg>${o?'<div class="sover"><b>GAME OVER</b></div>':""}</div>`}};
})();
