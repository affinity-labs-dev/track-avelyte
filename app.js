(function(){
var RM=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var DESK=window.matchMedia('(min-width:821px)').matches;
var TOUCH=window.matchMedia('(hover:none)').matches;
function qp(k){return new URLSearchParams(location.search).get(k)||"";}
var concept=document.body.getAttribute('data-concept');var done=false;
document.querySelectorAll('.signup').forEach(function(form){form.addEventListener('submit',function(e){e.preventDefault();
var box=form.closest('[data-form]')||form.parentNode;var errEl=box.querySelector('.err');if(errEl)errEl.classList.remove('show');
var inp=form.querySelector('input[type=email]');var email=(inp.value||'').trim();
if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){if(errEl){errEl.textContent="That doesn't look like an email. Mind checking it?";errEl.classList.add('show');}return;}
var row={email:email,concept:concept,angle:qp('utm_content'),utm_source:qp('utm_source'),utm_medium:qp('utm_medium'),utm_campaign:qp('utm_campaign'),utm_content:qp('utm_content'),utm_term:qp('utm_term'),referrer:document.referrer||'',page:location.pathname};
var btn=form.querySelector('button');var t=btn.textContent;btn.disabled=true;btn.textContent='…';
fetch(window.SUPABASE_URL+'/rest/v1/signups',{method:'POST',headers:{'apikey':window.SUPABASE_ANON_KEY,'Authorization':'Bearer '+window.SUPABASE_ANON_KEY,'Content-Type':'application/json','Prefer':'return=minimal'},body:JSON.stringify(row)})
.then(function(r){if(!r.ok)throw 0;document.querySelectorAll('.signup').forEach(function(f){f.style.display='none';});document.querySelectorAll('.micro').forEach(function(m){m.style.display='none';});document.querySelectorAll('.thanks').forEach(function(tk){tk.classList.add('show');});if(!done&&typeof fbq==='function'){fbq('track','Lead',{content_name:concept});done=true;}})
.catch(function(){btn.disabled=false;btn.textContent=t;if(errEl){errEl.textContent="Something went wrong. Try again in a moment.";errEl.classList.add('show');}});});});
var nav=document.querySelector('.nav');var sticky=document.querySelector('.sticky');var hero=document.querySelector('.hero');
function onScroll(){var y=window.scrollY||document.documentElement.scrollTop;if(nav)nav.classList.toggle('scrolled',y>40);
  if(sticky&&!DESK){var hb=hero?hero.getBoundingClientRect().bottom:0;sticky.classList.toggle('show',hb<0);}}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
function revealAll(){document.querySelectorAll('.anim').forEach(function(el){el.style.opacity='1';el.style.transform='none';});
  document.querySelectorAll('.ln>span,.qln>span,.cw>span').forEach(function(s){s.style.transform='none';s.style.opacity='1';});}
setTimeout(function(){if(!window.__a)revealAll();},2600);
// custom cursor
if(!TOUCH&&!RM){var c=document.createElement('div');c.className='cursor';var d=document.createElement('div');d.className='cursor-d';document.body.appendChild(c);document.body.appendChild(d);
  var mx=0,my=0,dx=0,dy=0;document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;c.style.transform='translate('+(mx-3.5)+'px,'+(my-3.5)+'px)';});
  (function loop(){dx+=(mx-dx)*.16;dy+=(my-dy)*.16;d.style.transform='translate('+(dx-19)+'px,'+(dy-19)+'px)';requestAnimationFrame(loop);})();
  document.querySelectorAll('a,button,summary,input').forEach(function(el){el.addEventListener('mouseenter',function(){d.classList.add('hot');});el.addEventListener('mouseleave',function(){d.classList.remove('hot');});});}
function initGSAP(){
  if(typeof gsap==='undefined'){revealAll();return;}window.__a=true;
  if(typeof ScrollTrigger!=='undefined')gsap.registerPlugin(ScrollTrigger);
  if(typeof Lenis!=='undefined'&&!RM){var l=new Lenis({duration:1.1,smoothWheel:true});function raf(t){l.raf(t);requestAnimationFrame(raf);}requestAnimationFrame(raf);if(typeof ScrollTrigger!=='undefined')l.on('scroll',ScrollTrigger.update);}
  if(RM){revealAll();return;}
  var tl=gsap.timeline({defaults:{ease:'power3.out'}});
  tl.from('.hero .eyebrow-h',{y:18,opacity:0,duration:.6})
    .from('.hero h1.cover .ln>span',{yPercent:118,duration:1,stagger:.1},'-=.3')
    .from('.hero .sub',{y:18,opacity:0,duration:.6},'-=.55')
    .from('.hero [data-form]',{y:18,opacity:0,duration:.6},'-=.5')
    .from('.hero-visual img',{y:60,opacity:0,scale:.95,duration:1.1,ease:'power2.out'},'-=.8');
  gsap.to('.hero-visual img',{y:'+=16',duration:3.6,ease:'sine.inOut',repeat:-1,yoyo:true});
  gsap.to('.aurora .a1',{x:50,y:30,duration:9,ease:'sine.inOut',repeat:-1,yoyo:true});
  gsap.to('.aurora .a2',{x:-40,y:24,duration:11,ease:'sine.inOut',repeat:-1,yoyo:true});
  if(DESK){var ph=document.querySelector('.hero-visual img'),hv=document.querySelector('.hero');
    if(ph&&hv)hv.addEventListener('mousemove',function(e){var r=hv.getBoundingClientRect();var ddx=(e.clientX-r.left)/r.width-.5,ddy=(e.clientY-r.top)/r.height-.5;gsap.to(ph,{rotationY:ddx*12,rotationX:-ddy*9,duration:.6,transformPerspective:1200});});}
  if(typeof ScrollTrigger==='undefined'){revealAll();return;}
  gsap.utils.toArray('.anim').forEach(function(el){gsap.to(el,{opacity:1,y:0,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}});});
  // story steps reveal + phone subtle scale per step (desktop sticky)
  gsap.utils.toArray('.story-step').forEach(function(st){gsap.from(st,{opacity:0,y:40,duration:.8,ease:'power3.out',scrollTrigger:{trigger:st,start:'top 75%'}});});
  // feature image parallax
  gsap.utils.toArray('.feat-img img').forEach(function(img){gsap.fromTo(img,{yPercent:-7},{yPercent:7,ease:'none',scrollTrigger:{trigger:img.parentNode,start:'top bottom',end:'bottom top',scrub:true}});});
  // interstitial + close bg parallax
  gsap.utils.toArray('.inter .bg img,.close .bg img').forEach(function(img){gsap.fromTo(img,{yPercent:-9},{yPercent:9,ease:'none',scrollTrigger:{trigger:img.closest('section'),start:'top bottom',end:'bottom top',scrub:true}});});
  // masked line reveals (interstitial quote, claim)
  gsap.from('.inter .qln>span',{yPercent:115,duration:.9,stagger:.08,ease:'power3.out',scrollTrigger:{trigger:'.inter',start:'top 60%'}});
  gsap.from('.claim .cw>span',{yPercent:115,duration:.8,stagger:.05,ease:'power3.out',scrollTrigger:{trigger:'.claim',start:'top 72%'}});
  if(DESK)document.querySelectorAll('.signup button,.pill').forEach(function(b){
    b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.3,y:(e.clientY-r.top-r.height/2)*.4,duration:.4});});
    b.addEventListener('mouseleave',function(){gsap.to(b,{x:0,y:0,duration:.5,ease:'elastic.out(1,.4)'});});});
}
if(document.readyState!=='loading')initGSAP();else window.addEventListener('DOMContentLoaded',initGSAP);
})();
