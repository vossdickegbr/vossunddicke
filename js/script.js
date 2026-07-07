const navToggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.site-nav');
navToggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');navToggle.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.site-nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

const counters=new WeakSet();
function animateCount(el){
  if(counters.has(el))return;
  counters.add(el);
  const target=Number(el.dataset.count||0);
  const duration=1300;
  const start=performance.now();
  function tick(now){
    const p=Math.min((now-start)/duration,1);
    const eased=1-Math.pow(1-p,3);
    el.textContent=Math.round(target*eased);
    if(p<1)requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      entry.target.querySelectorAll?.('[data-count]').forEach(animateCount);
      if(entry.target.matches?.('[data-count]')) animateCount(entry.target);
    }
  });
},{threshold:.16});
document.querySelectorAll('.reveal,[data-count]').forEach(el=>observer.observe(el));

const glow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',e=>{if(!glow)return;glow.style.setProperty('--x',e.clientX+'px');glow.style.setProperty('--y',e.clientY+'px');});

const reviewForm=document.getElementById('reviewForm');
reviewForm?.addEventListener('submit',event=>{
  event.preventDefault();
  const name=document.getElementById('reviewName')?.value?.trim()||'Anonyme Bewertung';
  const stars=document.getElementById('reviewStars')?.value||'★★★★★';
  const text=document.getElementById('reviewText')?.value?.trim()||'';
  const subject=encodeURIComponent('Kundenbewertung für Voss & Dicke GbR');
  const body=encodeURIComponent(`Name: ${name}\nBewertung: ${stars}\n\nNachricht:\n${text}`);
  window.location.href=`mailto:vossdickegbr@gmail.com?subject=${subject}&body=${body}`;
});

// On-page Kontakt-Chat
const chatPanel=document.getElementById('chatPanel');
const chatOpenButtons=document.querySelectorAll('.chat-open');
const chatClose=document.querySelector('.chat-close');
function setChat(open){if(!chatPanel)return;chatPanel.classList.toggle('open',open);chatPanel.setAttribute('aria-hidden',String(!open));}
chatOpenButtons.forEach(btn=>btn.addEventListener('click',()=>setChat(!chatPanel?.classList.contains('open'))));
chatClose?.addEventListener('click',()=>setChat(false));
document.addEventListener('keydown',event=>{if(event.key==='Escape')setChat(false);});
document.addEventListener('click',event=>{const widget=document.querySelector('.chat-widget');if(!widget||!chatPanel?.classList.contains('open'))return;if(!widget.contains(event.target))setChat(false);});

// Einmaliger Premium-Energieimpuls vom VD-Logo in den Chat nach der Welcome Animation
const energyTransfer=document.querySelector('.energy-transfer');
const chatWidget=document.querySelector('.chat-widget');
const brandMark=document.querySelector('.brand-mark');
const chatBubble=document.querySelector('.chat-bubble');
let energyTransferPlayed=false;

function playSoftPing(){
  try{
    const AudioContext=window.AudioContext||window.webkitAudioContext;
    if(!AudioContext)return;
    const ctx=new AudioContext();
    const osc=ctx.createOscillator();
    const gain=ctx.createGain();
    osc.type='sine';
    osc.frequency.setValueAtTime(740,ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(980,ctx.currentTime+.08);
    gain.gain.setValueAtTime(.0001,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.035,ctx.currentTime+.012);
    gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.18);
    osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.2);
  }catch(error){}
}

function triggerEnergyTransfer(){
  if(energyTransferPlayed||!energyTransfer||!chatWidget||!brandMark||!chatBubble)return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  energyTransferPlayed=true;

  const start=brandMark.getBoundingClientRect();
  const target=chatBubble.getBoundingClientRect();
  const sx=start.left+start.width*.58;
  const sy=start.top+start.height*.52;
  const tx=target.left+target.width*.48;
  const ty=target.top+target.height*.50;
  const dx=tx-sx;
  const dy=ty-sy;
  const distance=Math.max(Math.hypot(dx,dy),160);
  const angle=Math.atan2(dy,dx)*180/Math.PI;

  energyTransfer.style.setProperty('--sx',`${sx}px`);
  energyTransfer.style.setProperty('--sy',`${sy-60}px`);
  energyTransfer.style.setProperty('--tx',`${tx}px`);
  energyTransfer.style.setProperty('--ty',`${ty}px`);
  energyTransfer.style.setProperty('--distance',`${distance}px`);
  energyTransfer.style.setProperty('--angle',`${angle}deg`);
  energyTransfer.classList.add('is-active');

  window.setTimeout(()=>{chatWidget.classList.add('energy-hit');playSoftPing();},620);
  window.setTimeout(()=>energyTransfer.classList.remove('is-active'),1450);
}

window.addEventListener('load',()=>window.setTimeout(triggerEnergyTransfer,5400));
