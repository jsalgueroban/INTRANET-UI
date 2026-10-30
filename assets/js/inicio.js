const today=document.querySelector('[data-today]');
if(today){today.textContent=new Intl.DateTimeFormat('es-CO',{weekday:'long',day:'numeric',month:'long'}).format(new Date())}

const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
const hero=document.querySelector('.hero');
const heroImage=document.querySelector('.hero-image');
if(hero&&heroImage&&matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduceMotion.matches){hero.addEventListener('pointermove',event=>{const rect=hero.getBoundingClientRect();const x=((event.clientX-rect.left)/rect.width-.5)*-10;const y=((event.clientY-rect.top)/rect.height-.5)*-6;heroImage.style.transform=`translate3d(${x}px,${y}px,0) scale(1.02)`},{passive:true});hero.addEventListener('pointerleave',()=>{heroImage.style.transform=''})}

const revealTargets=document.querySelectorAll('.quick-section .section-heading,.quick-rail,.news-section .section-heading,.news-layout,.jobs-intro,.jobs-list,.footer-top');
if(!reduceMotion.matches&&'IntersectionObserver'in window){revealTargets.forEach(node=>node.classList.add('reveal'));const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.04,rootMargin:'0px 0px -4%'});revealTargets.forEach(node=>observer.observe(node))}

const siteHeader=document.querySelector('.site-header');
const scrollScene=document.querySelector('[data-scroll-scene]');
if(scrollScene&&!reduceMotion.matches){
  let ticking=false;
  const syncScroll=()=>{
    const progress=Math.min(1,Math.max(0,window.scrollY/(scrollScene.offsetHeight*.72)));
    scrollScene.style.setProperty('--scroll-progress',progress.toFixed(3));
    siteHeader?.classList.toggle('is-scrolled',window.scrollY>40);
    ticking=false;
  };
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(syncScroll);ticking=true}},{passive:true});
  syncScroll();
}

const platformHub=document.querySelector('[data-platform-hub]');
if(platformHub){
  const platformTrigger=platformHub.querySelector('.platform-hub__trigger');
  const platformOrbit=platformHub.querySelector('.platform-hub__orbit');
  const platformLinks=[...platformHub.querySelectorAll('.platform-link')];
  const platformMark=platformTrigger.querySelector('img');
  const idleMotions=['is-idle-nod','is-idle-breathe','is-idle-glint'];
  let idleTimer;
  let idlePaused=false;
  let lastIdle=-1;
  let hubDrag;
  let hubFrame;
  let hubTimer;
  let hubMotionToken=0;
  let suppressHubClick=false;
  let hoverPaused=false;
  const hubState={x:0,y:0,rotation:0,scale:1,opacity:1,vx:0,vy:0,mode:'idle'};
  const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
  const renderHub=()=>{
    platformHub.style.transform=`translate3d(${hubState.x.toFixed(2)}px,${hubState.y.toFixed(2)}px,0) rotate(${hubState.rotation.toFixed(2)}deg) scale(${hubState.scale.toFixed(3)})`;
    platformHub.style.opacity=String(hubState.opacity);
  };
  const hubBounds=()=>{
    const styles=getComputedStyle(platformHub);
    const right=parseFloat(styles.right)||0;
    const bottom=parseFloat(styles.bottom)||0;
    const homeX=innerWidth-right-platformHub.offsetWidth;
    const homeY=innerHeight-bottom-platformHub.offsetHeight;
    return {
      minX:12-homeX,
      maxX:innerWidth-12-(homeX+platformHub.offsetWidth),
      minY:12-homeY,
      maxY:innerHeight-12-(homeY+platformHub.offsetHeight)
    };
  };
  const clearIdle=()=>{
    clearTimeout(idleTimer);
    platformHub.classList.remove(...idleMotions);
  };
  const scheduleIdle=()=>{
    clearTimeout(idleTimer);
    if(idlePaused||document.hidden||reduceMotion.matches||hubState.mode!=='idle'||platformHub.classList.contains('is-open'))return;
    const delay=5200+Math.random()*6800;
    idleTimer=setTimeout(()=>{
      let next=Math.floor(Math.random()*idleMotions.length);
      if(next===lastIdle)next=(next+1)%idleMotions.length;
      lastIdle=next;
      platformHub.classList.add(idleMotions[next]);
    },delay);
  };
  const setPlatformHub=open=>{
    clearIdle();
    platformHub.classList.toggle('is-open',open);
    platformTrigger.setAttribute('aria-expanded',String(open));
    platformTrigger.setAttribute('aria-label',open?'Cerrar plataformas internas':'Abrir plataformas internas');
    platformOrbit.setAttribute('aria-hidden',String(!open));
    platformLinks.forEach(link=>link.tabIndex=open?0:-1);
    if(!open)scheduleIdle();
  };
  const finishHubHome=()=>{
    cancelAnimationFrame(hubFrame);
    clearTimeout(hubTimer);
    hubFrame=undefined;
    hubTimer=undefined;
    Object.assign(hubState,{x:0,y:0,rotation:0,scale:1,opacity:1,vx:0,vy:0,mode:'idle'});
    platformHub.classList.remove('is-dragging','is-thrown','is-away');
    renderHub();
    platformTrigger.removeAttribute('aria-hidden');
    platformTrigger.tabIndex=0;
    idlePaused=false;
    scheduleIdle();
  };
  const cancelHubMotion=()=>{
    hubMotionToken++;
    cancelAnimationFrame(hubFrame);
    clearTimeout(hubTimer);
    hubFrame=undefined;
    hubTimer=undefined;
    platformHub.classList.remove('is-thrown','is-away');
  };
  const returnHubHome=(initialVx=0,initialVy=0)=>{
    cancelHubMotion();
    const token=hubMotionToken;
    platformHub.classList.remove('is-away');
    platformHub.classList.add('is-thrown');
    platformTrigger.removeAttribute('aria-hidden');
    platformTrigger.tabIndex=0;
    Object.assign(hubState,{vx:initialVx,vy:initialVy,mode:'returning'});
    let previous=performance.now();
    const started=previous;
    const step=now=>{
      if(token!==hubMotionToken)return;
      const dt=Math.min(.032,Math.max(.001,(now-previous)/1000));
      previous=now;
      hubState.vx+=(-150*hubState.x-21*hubState.vx)*dt;
      hubState.vy+=(-150*hubState.y-21*hubState.vy)*dt;
      hubState.x+=hubState.vx*dt;
      hubState.y+=hubState.vy*dt;
      hubState.rotation+=(0-hubState.rotation)*Math.min(1,dt*12);
      hubState.scale+=(1-hubState.scale)*Math.min(1,dt*12);
      hubState.opacity+=(1-hubState.opacity)*Math.min(1,dt*9);
      renderHub();
      const settled=Math.hypot(hubState.x,hubState.y)<.7&&Math.hypot(hubState.vx,hubState.vy)<8;
      if(settled||now-started>1500){finishHubHome();return}
      hubFrame=requestAnimationFrame(step);
    };
    hubFrame=requestAnimationFrame(step);
  };
  const throwHub=({vx,vy})=>{
    cancelHubMotion();
    const token=hubMotionToken;
    platformHub.classList.add('is-thrown');
    const speed=Math.hypot(vx,vy);
    const boost=speed<220&&speed>0?220/speed:1;
    Object.assign(hubState,{vx:clamp(vx*boost,-900,900),vy:clamp(vy*boost,-800,800),mode:'thrown'});
    let previous=performance.now();
    const started=previous;
    const step=now=>{
      if(token!==hubMotionToken)return;
      const dt=Math.min(.028,Math.max(.001,(now-previous)/1000));
      previous=now;
      const bounds=hubBounds();
      hubState.vy+=560*dt;
      const drag=Math.pow(now-started>430?.88:.965,dt*60);
      hubState.vx*=drag;
      hubState.vy*=drag;
      hubState.x+=hubState.vx*dt;
      hubState.y+=hubState.vy*dt;
      if(hubState.x<bounds.minX){hubState.x=bounds.minX;hubState.vx=Math.abs(hubState.vx)*.42}
      if(hubState.x>bounds.maxX){hubState.x=bounds.maxX;hubState.vx=-Math.abs(hubState.vx)*.42}
      if(hubState.y<bounds.minY){hubState.y=bounds.minY;hubState.vy=Math.abs(hubState.vy)*.38}
      if(hubState.y>bounds.maxY){hubState.y=bounds.maxY;hubState.vy=-Math.abs(hubState.vy)*.38}
      hubState.rotation=clamp(hubState.rotation+hubState.vx*dt*.035,-26,26);
      renderHub();
      const elapsed=now-started;
      if(elapsed>760||elapsed>480&&Math.hypot(hubState.vx,hubState.vy)<60){
        hubState.mode='resting';
        hubTimer=setTimeout(()=>returnHubHome(hubState.vx*.18,hubState.vy*.18),420);
        return;
      }
      hubFrame=requestAnimationFrame(step);
    };
    hubFrame=requestAnimationFrame(step);
  };
  const dismissHubDown=({vx,vy})=>{
    cancelHubMotion();
    const token=hubMotionToken;
    platformHub.classList.add('is-thrown');
    Object.assign(hubState,{vx:clamp(vx,-650,650),vy:Math.max(520,vy),mode:'dismissing'});
    let previous=performance.now();
    const started=previous;
    const step=now=>{
      if(token!==hubMotionToken)return;
      const dt=Math.min(.032,Math.max(.001,(now-previous)/1000));
      previous=now;
      hubState.vy+=1250*dt;
      hubState.x+=hubState.vx*dt;
      hubState.y+=hubState.vy*dt;
      hubState.rotation=clamp(hubState.rotation+hubState.vx*dt*.04,-24,24);
      hubState.scale=Math.max(.86,hubState.scale-dt*.34);
      hubState.opacity=Math.max(0,1-(now-started)/320);
      renderHub();
      if(hubState.opacity<=0){
        hubState.mode='hidden';
        platformHub.classList.add('is-away');
        platformTrigger.setAttribute('aria-hidden','true');
        platformTrigger.tabIndex=-1;
        platformTrigger.blur();
        hubTimer=setTimeout(()=>returnHubHome(0,-120),2200);
        return;
      }
      hubFrame=requestAnimationFrame(step);
    };
    hubFrame=requestAnimationFrame(step);
  };
  setPlatformHub(false);
  platformMark.addEventListener('animationend',event=>{
    if(event.animationName==='platform-mark-arrive'){
      platformHub.classList.remove('is-entering');
      return;
    }
    if(event.animationName.startsWith('platform-idle-')){
      platformHub.classList.remove(...idleMotions);
      scheduleIdle();
    }
  });
  requestAnimationFrame(()=>platformHub.classList.add('is-entering'));
  platformHub.addEventListener('pointerenter',()=>{
    idlePaused=true;
    platformHub.classList.remove('is-entering');
    clearIdle();
    if(['thrown','returning','resting'].includes(hubState.mode)){
      cancelHubMotion();
      hubState.mode='hover-paused';
      hoverPaused=true;
      platformHub.classList.add('is-thrown');
      renderHub();
    }
  });
  platformHub.addEventListener('pointerleave',()=>{
    if(platformHub.classList.contains('is-dragging'))return;
    if(hoverPaused){
      hoverPaused=false;
      returnHubHome(hubState.vx*.12,hubState.vy*.12);
      return;
    }
    if(platformHub.classList.contains('is-thrown'))return;
    idlePaused=false;
    scheduleIdle();
  });
  platformHub.addEventListener('focusin',()=>{idlePaused=true;clearIdle()});
  platformHub.addEventListener('focusout',event=>{if(!platformHub.contains(event.relatedTarget)){idlePaused=false;scheduleIdle()}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)clearIdle();else scheduleIdle()});
  reduceMotion.addEventListener?.('change',()=>{
    if(reduceMotion.matches){clearIdle();if(hubState.mode!=='idle'&&hubState.mode!=='dragging')finishHubHome()}
    else scheduleIdle();
  });
  platformTrigger.addEventListener('pointerdown',event=>{
    if(event.button!==0)return;
    const wasDisplaced=hubState.mode!=='idle'||Math.hypot(hubState.x,hubState.y)>1;
    cancelHubMotion();
    hoverPaused=false;
    idlePaused=true;
    clearIdle();
    setPlatformHub(false);
    suppressHubClick=wasDisplaced;
    const now=event.timeStamp;
    hubState.mode='dragging';
    hubState.vx=0;
    hubState.vy=0;
    hubDrag={
      pointerId:event.pointerId,
      startX:event.clientX,
      startY:event.clientY,
      originX:hubState.x,
      originY:hubState.y,
      lastX:event.clientX,
      lastY:event.clientY,
      lastT:now,
      travelX:0,
      travelY:0,
      vx:0,
      vy:0
    };
    platformTrigger.setPointerCapture(event.pointerId);
    platformHub.classList.add('is-dragging');
    event.preventDefault();
  });
  platformTrigger.addEventListener('pointermove',event=>{
    if(!hubDrag||event.pointerId!==hubDrag.pointerId)return;
    const samples=event.getCoalescedEvents?.()||[event];
    for(const sample of samples){
      const dt=Math.max(4,sample.timeStamp-hubDrag.lastT);
      const sampleVx=(sample.clientX-hubDrag.lastX)/dt*1000;
      const sampleVy=(sample.clientY-hubDrag.lastY)/dt*1000;
      hubDrag.vx=hubDrag.vx*.58+sampleVx*.42;
      hubDrag.vy=hubDrag.vy*.58+sampleVy*.42;
      hubDrag.lastX=sample.clientX;
      hubDrag.lastY=sample.clientY;
      hubDrag.lastT=sample.timeStamp;
    }
    hubDrag.travelX=event.clientX-hubDrag.startX;
    hubDrag.travelY=event.clientY-hubDrag.startY;
    const bounds=hubBounds();
    const rawX=hubDrag.originX+hubDrag.travelX;
    const rawY=hubDrag.originY+hubDrag.travelY;
    hubState.x=rawX<bounds.minX?bounds.minX+(rawX-bounds.minX)*.24:rawX>bounds.maxX?bounds.maxX+(rawX-bounds.maxX)*.24:rawX;
    hubState.y=rawY<bounds.minY?bounds.minY+(rawY-bounds.minY)*.24:rawY;
    hubState.rotation=clamp(hubDrag.travelX*.035+hubDrag.vx*.004,-16,16);
    hubState.scale=1.025;
    hubState.opacity=1;
    if(Math.hypot(hubDrag.travelX,hubDrag.travelY)>7)suppressHubClick=true;
    renderHub();
    event.preventDefault();
  });
  const releaseHub=(event,cancelled=false)=>{
    if(!hubDrag||event.pointerId!==hubDrag.pointerId)return;
    const released={...hubDrag};
    hubDrag=null;
    platformHub.classList.remove('is-dragging');
    if(platformTrigger.hasPointerCapture(event.pointerId))platformTrigger.releasePointerCapture(event.pointerId);
    hubState.scale=1;
    const distance=Math.hypot(released.travelX,released.travelY);
    if(cancelled||reduceMotion.matches){finishHubHome();return}
    if(distance<=7){
      if(Math.hypot(hubState.x,hubState.y)>1)returnHubHome();
      else finishHubHome();
      return;
    }
    const downward=released.travelY>42&&(released.travelY>Math.abs(released.travelX)*.65||released.vy>420);
    if(downward)dismissHubDown(released);else throwHub(released);
  };
  platformTrigger.addEventListener('pointerup',releaseHub);
  platformTrigger.addEventListener('pointercancel',event=>releaseHub(event,true));
  platformTrigger.addEventListener('click',event=>{
    if(suppressHubClick){event.preventDefault();suppressHubClick=false;return}
    setPlatformHub(!platformHub.classList.contains('is-open'));
  });
  document.addEventListener('click',event=>{if(!platformHub.contains(event.target))setPlatformHub(false)});
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&platformHub.classList.contains('is-open')){
      setPlatformHub(false);
      platformTrigger.focus();
    }
  });
}
