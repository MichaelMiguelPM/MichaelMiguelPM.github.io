/* Shared behavior for case-study detail pages */
(function(){
  var nav=document.getElementById('nav');
  if(nav){addEventListener('scroll',function(){nav.classList.toggle('scrolled',scrollY>20);});}

  // theme switch + persistence (shared with main site via localStorage key 'mh-theme')
  var btns=document.querySelectorAll('.vibe-opt');
  function setTheme(name){
    document.documentElement.setAttribute('data-theme',name);
    btns.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.set===name);});
    try{localStorage.setItem('mh-theme',name);}catch(e){}
  }
  btns.forEach(function(b){b.addEventListener('click',function(){setTheme(b.dataset.set);b.blur();var v=document.querySelector('.vibe');if(v)v.classList.remove('open');});});
  try{var s=localStorage.getItem('mh-theme');if(s)setTheme(s);}catch(e){}

  // mobile menu
  var menuBtn=document.getElementById('menuBtn'), navLinks=document.getElementById('navLinks');
  if(menuBtn&&navLinks){
    menuBtn.addEventListener('click',function(){navLinks.classList.toggle('open');});
    var dd=navLinks.querySelector('.nav-dd'), ddLink=dd&&dd.querySelector(':scope > a');
    var isMobile=function(){return matchMedia('(max-width:640px)').matches;};
    if(ddLink){ddLink.addEventListener('click',function(e){if(isMobile()){e.preventDefault();dd.classList.toggle('open');}});}
    navLinks.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){if(a===ddLink&&isMobile())return;navLinks.classList.remove('open');});});
    var vibe=document.querySelector('.vibe'), vibeBtn=vibe&&vibe.querySelector('.vibe-btn');
    if(vibeBtn){vibeBtn.addEventListener('click',function(e){if(isMobile()){e.preventDefault();e.stopPropagation();vibe.classList.toggle('open');}});}
    document.addEventListener('click',function(e){if(vibe&&vibe.classList.contains('open')&&!vibe.contains(e.target))vibe.classList.remove('open');});
  }

  // reveal on scroll
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
})();
