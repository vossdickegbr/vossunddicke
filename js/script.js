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
