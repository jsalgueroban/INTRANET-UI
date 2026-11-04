(() => {
const headerTarget = document.querySelector('[data-site-header]');
if (headerTarget) {
  headerTarget.outerHTML = `  <header class="site-header" data-header>
    <div class="nav-shell">
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav"><span></span><span></span><span></span><b>Menú</b></button>
      <a class="mobile-brand" href="inicio.html" aria-label="Inicio de la Intranet"><strong>Intranet</strong><img src="assets/brand/logo-banasan.svg" alt="Banasan" /></a>
      <nav class="main-nav" id="main-nav" aria-label="Navegación principal">
        <div class="nav-group nav-group--left">
          <div class="nav-item"><button class="nav-trigger" type="button" aria-expanded="false">Nuestra empresa <span>⌄</span></button><div class="nav-popover"><a href="secciones.html">Información institucional</a><a href="informacion.html?id=cultura">Nuestra cultura</a><a href="#">Directorio corporativo</a></div></div>
          <div class="nav-item"><button class="nav-trigger" type="button" aria-expanded="false">Indicadores y acciones <span>⌄</span></button><div class="nav-popover"><a href="#">Indicadores corporativos</a><a href="#">Planes de acción</a><a href="#">Seguimiento</a></div></div>
          <div class="nav-item"><button class="nav-trigger" type="button" aria-expanded="false">UI <span>⌄</span></button><div class="nav-popover"><a href="componentes.html">Componentes</a><a href="usuarios.html">Gestión de usuarios</a><a href="pendientes.html">Mis pendientes</a><a href="noticias.html">Noticias</a><a href="salas.html">Salas y reservas</a><a href="contenidos.html">Contenidos</a><a href="vacantes.html">Vacantes</a><a href="secciones.html">Secciones</a><a href="busqueda.html">Búsqueda</a><a href="notificaciones.html">Notificaciones</a><a href="documentos.html">Documentos</a><a href="navigation-demo.html">Navegación</a><a href="login.html">Acceso</a></div></div>
        </div>
        <a class="brand-lockup ui-brand-lockup ui-brand-lockup--inverse" href="inicio.html" aria-label="Inicio de la Intranet"><strong>Intranet</strong><img src="assets/brand/logo-banasan.svg" alt="Banasan" /></a>
        <div class="nav-group nav-group--right">
          <div class="nav-item"><button class="nav-trigger" type="button" aria-expanded="false">Bienestar laboral <span>⌄</span></button><div class="nav-popover"><a href="informacion.html?id=beneficios">Beneficios</a><a href="#">Seguridad y salud</a><a href="vacantes.html">Vacantes internas</a></div></div>
          <div class="nav-item"><button class="nav-trigger" type="button" aria-expanded="false">Formatos y documentos <span>⌄</span></button><div class="nav-popover"><a href="documentos.html?collection=Formatos">Formatos publicados</a><a href="documentos.html?collection=Calendario%20Bananero">Calendario Bananero</a><a href="documentos.html">Documentos publicados</a></div></div>
          <div class="nav-item"><button class="nav-trigger" type="button" aria-expanded="false">Para TI <span>⌄</span></button><div class="nav-popover"><a href="#">Solicitar soporte</a><a href="#">Servicios tecnológicos</a><a href="#">Buenas prácticas</a></div></div>
        </div>
      </nav>
      <button class="nav-pull-handle" type="button" aria-expanded="true" aria-controls="main-nav" aria-label="Ocultar navegación">
        <span aria-hidden="true"></span>
      </button>
      <div class="header-tools">
        <button type="button" aria-label="Buscar"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></svg></button>
        <div class="account-tray-host" data-account-tray>
          <button class="profile account-mark ui-account-mark account-tray__trigger" type="button" aria-label="Abrir cuenta" aria-expanded="false" aria-controls="account-tray-home"><span>JS</span><i aria-hidden="true"></i></button>
          <button class="account-tray__backdrop" type="button" tabindex="-1" aria-hidden="true" data-account-close></button>
          <section class="account-tray" id="account-tray-home" aria-label="Cuenta" aria-hidden="true">
            <header class="account-tray__identity"><div><strong>Cuenta</strong></div><button type="button" aria-label="Cerrar cuenta" data-account-close><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg></button></header>
            <nav class="account-tray__nav" aria-label="Opciones de cuenta">
              <a href="perfil.html"><span><strong>Perfil</strong></span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M6 4h6v6"/></svg></a>
              <a href="perfil.html#empresa"><span><strong>Empresa</strong></span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M6 4h6v6"/></svg></a>
              <a href="usuarios.html"><span><strong>Gestión de usuarios</strong></span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M6 4h6v6"/></svg></a>
            </nav>
          </section>
        </div>
      </div>
    </div>
  </header>`;
}
document.querySelector('.header-tools button[aria-label="Buscar"]')?.addEventListener('click',()=>{location.href='busqueda.html';});
const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
const navItems=[...document.querySelectorAll('.nav-item')];

function closeMenus(except){navItems.forEach(item=>{if(item!==except){item.classList.remove('is-open');item.querySelector('.nav-trigger').setAttribute('aria-expanded','false')}})}
navItems.forEach(item=>{const trigger=item.querySelector('.nav-trigger');trigger.addEventListener('click',()=>{const opening=!item.classList.contains('is-open');closeMenus(item);item.classList.toggle('is-open',opening);trigger.setAttribute('aria-expanded',String(opening))})});
menuToggle?.addEventListener('click',()=>{const open=!nav.classList.contains('is-open');nav.classList.toggle('is-open',open);menuToggle.setAttribute('aria-expanded',String(open));closeMenus()});
document.addEventListener('click',event=>{if(!event.target.closest('.nav-shell'))closeMenus()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeMenus();nav.classList.remove('is-open');menuToggle?.setAttribute('aria-expanded','false')}});

const siteHeader=document.querySelector('.site-header');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
const syncHeader=()=>siteHeader?.classList.toggle('is-scrolled',window.scrollY>40);
window.addEventListener('scroll',syncHeader,{passive:true});
syncHeader();
const workspace=document.querySelector('main.admin-main,main.inbox-page,main.news-page,main.rooms-page,main.profile-page');
const desktopNavigation=matchMedia('(min-width:981px)');
const workspaceOriginalAnchor=document.documentElement.style.overflowAnchor;
let workspaceFrame=0;
let workspaceExpandedPadding=null;
let workspaceOriginalPadding='';
function compactWorkspace(collapsed){
  if(!workspace)return;
  cancelAnimationFrame(workspaceFrame);
  if(workspaceExpandedPadding===null){
    workspaceOriginalPadding=workspace.style.paddingTop;
    workspaceExpandedPadding=parseFloat(getComputedStyle(workspace).paddingTop);
  }
  const start=parseFloat(getComputedStyle(workspace).paddingTop);
  const end=collapsed&&desktopNavigation.matches?56:workspaceExpandedPadding;
  const preserveReading=scrollY>workspaceExpandedPadding;
  document.documentElement.style.overflowAnchor='none';
  const duration=reduceMotion.matches?0:360;
  const started=performance.now();
  const readingScroll=scrollY;
  function frame(now){
    const progress=duration?Math.min(1,(now-started)/duration):1;
    const amount=1-Math.pow(1-progress,3);
    const value=start+(end-start)*amount;
    workspace.style.paddingTop=value+'px';
    document.body.style.setProperty('--navigation-lift',(workspaceExpandedPadding-value)+'px');
    if(preserveReading)window.scrollTo({top:readingScroll+value-start,behavior:'instant'});
    if(progress<1){workspaceFrame=requestAnimationFrame(frame);return;}
    document.documentElement.style.overflowAnchor=workspaceOriginalAnchor;
    if(!collapsed||!desktopNavigation.matches){
      workspace.style.paddingTop=workspaceOriginalPadding;
      document.body.style.removeProperty('--navigation-lift');
      workspaceExpandedPadding=null;
    }
  }
  workspaceFrame=requestAnimationFrame(frame);
}
desktopNavigation.addEventListener('change',()=>{
  if(!desktopNavigation.matches){
    cancelAnimationFrame(workspaceFrame);
    if(workspace&&workspaceExpandedPadding!==null)workspace.style.paddingTop=workspaceOriginalPadding;
    workspaceExpandedPadding=null;
    document.body.style.removeProperty('--navigation-lift');
    document.documentElement.style.overflowAnchor=workspaceOriginalAnchor;
    siteHeader?.classList.remove('is-collapsed','is-settling','is-pulling');
    nav.inert=false;
    nav.removeAttribute('aria-hidden');
    const tools=document.querySelector('.header-tools');
    if(tools){tools.inert=false;tools.removeAttribute('aria-hidden');}
    const handle=document.querySelector('.nav-pull-handle');
    if(handle){handle.setAttribute('aria-expanded','true');handle.setAttribute('aria-label','Ocultar navegación');}
  }
});
const navPullHandle=document.querySelector('.nav-pull-handle');
const navShell=document.querySelector('.nav-shell');
if(siteHeader&&navShell&&navPullHandle){
  const headerTools=siteHeader.querySelector('.header-tools');
  let pullStart=0;
  let pullAmount=0;
  let pulling=false;
  let pullingFromCollapsed=false;
  let suppressPullClick=false;
  let settleTimer;
  let dismissTimer;
  let keyboardNavigation=false;
  let dismissArmed=true;
  let activePointer=null;
  let pointerStartedOutside=false;
  const collapseThreshold=44;
  const maxPull=76;
  const finishNavMotion=()=>{
    clearTimeout(settleTimer);
    settleTimer=setTimeout(()=>{
      siteHeader.classList.remove('is-settling');
      siteHeader.style.removeProperty('--nav-pull');
      siteHeader.style.removeProperty('--nav-card-pull');
      siteHeader.style.removeProperty('--nav-stretch');
    },620);
  };
  const setNavCollapsed=collapsed=>{
    clearTimeout(dismissTimer);
    dismissArmed=false;
    if(collapsed===siteHeader.classList.contains('is-collapsed'))return;
    if(collapsed){
      closeMenus();
      headerTools.querySelector('[data-account-close]')?.click();
      if(siteHeader.contains(document.activeElement))navPullHandle.focus({preventScroll:true});
    }
    siteHeader.classList.remove('is-pulling');
    siteHeader.classList.add('is-settling');
    siteHeader.classList.toggle('is-collapsed',collapsed);
    compactWorkspace(collapsed);
    navPullHandle.setAttribute('aria-expanded',String(!collapsed));
    navPullHandle.setAttribute('aria-label',collapsed?'Mostrar navegación':'Ocultar navegación');
    nav.inert=collapsed;
    headerTools.inert=collapsed;
    nav.setAttribute('aria-hidden',String(collapsed));
    headerTools.setAttribute('aria-hidden',String(collapsed));
    finishNavMotion();
  };
  const dismissNavigation=()=>{
    if(!desktopNavigation.matches||pulling||siteHeader.classList.contains('is-collapsed'))return;
    setNavCollapsed(true);
  };
  document.addEventListener('pointerdown',event=>{keyboardNavigation=false;pointerStartedOutside=!siteHeader.contains(event.target);},{capture:true});
  document.addEventListener('keydown',event=>{
    if(['Tab','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.key))keyboardNavigation=true;
  },{capture:true});
  document.addEventListener('click',event=>{
    if(!siteHeader.contains(event.target)&&(event.detail===0||pointerStartedOutside))dismissNavigation();
  });
  navShell.addEventListener('pointerenter',()=>clearTimeout(dismissTimer));
  navShell.addEventListener('focusin',()=>clearTimeout(dismissTimer));
  document.addEventListener('pointermove',event=>{
    if(event.pointerType!=='mouse'||!desktopNavigation.matches||pulling||siteHeader.classList.contains('is-collapsed')||siteHeader.classList.contains('is-settling'))return;
    const inside=navShell.contains(event.target)&&!event.target.closest('[data-account-close].account-tray__backdrop');
    if(inside){dismissArmed=true;clearTimeout(dismissTimer);dismissTimer=null;return;}
    if(!dismissArmed||dismissTimer||(keyboardNavigation&&siteHeader.contains(document.activeElement)))return;
    dismissTimer=setTimeout(()=>{
      dismissTimer=null;
      if(pulling||siteHeader.classList.contains('is-settling')||(keyboardNavigation&&siteHeader.contains(document.activeElement)))return;
      dismissNavigation();
    },260);
  });
  const returnNav=()=>{
    siteHeader.classList.remove('is-pulling');
    siteHeader.classList.add('is-settling');
    finishNavMotion();
  };
  navPullHandle.addEventListener('pointerdown',event=>{
    if(event.button!==0||innerWidth<=980||pulling)return;
    activePointer=event.pointerId;
    clearTimeout(settleTimer);
    clearTimeout(dismissTimer);
    siteHeader.classList.remove('is-settling');
    pulling=true;
    pullingFromCollapsed=siteHeader.classList.contains('is-collapsed');
    suppressPullClick=false;
    pullStart=event.clientY;
    pullAmount=0;
    navPullHandle.setPointerCapture(event.pointerId);
    siteHeader.classList.add('is-pulling');
  });
  navPullHandle.addEventListener('pointermove',event=>{
    if(!pulling||event.pointerId!==activePointer)return;
    pullAmount=Math.min(maxPull,Math.max(0,event.clientY-pullStart));
    suppressPullClick=pullAmount>6;
    siteHeader.style.setProperty('--nav-pull',`${pullAmount}px`);
    siteHeader.style.setProperty('--nav-card-pull',`${pullAmount*.12}px`);
    siteHeader.style.setProperty('--nav-stretch',String(1+pullAmount/620));
    event.preventDefault();
  });
  const releaseNav=event=>{
    if(!pulling||event.pointerId!==activePointer)return;
    pulling=false;
    activePointer=null;
    if(navPullHandle.hasPointerCapture(event.pointerId))navPullHandle.releasePointerCapture(event.pointerId);
    if(pullingFromCollapsed){
      if(pullAmount>=collapseThreshold)setNavCollapsed(false);else returnNav();
    }else if(pullAmount>=collapseThreshold)setNavCollapsed(true);else returnNav();
  };
  navPullHandle.addEventListener('pointerup',releaseNav);
  const cancelPull=event=>{
    if(!pulling||event.pointerId!==activePointer)return;
    pulling=false;
    activePointer=null;
    suppressPullClick=true;
    if(navPullHandle.hasPointerCapture(event.pointerId))navPullHandle.releasePointerCapture(event.pointerId);
    returnNav();
  };
  navPullHandle.addEventListener('pointercancel',cancelPull);
  navPullHandle.addEventListener('lostpointercapture',cancelPull);
  desktopNavigation.addEventListener('change',()=>{
    clearTimeout(dismissTimer);
    clearTimeout(settleTimer);
    pulling=false;
    activePointer=null;
    suppressPullClick=false;
    dismissArmed=true;
    for(const name of ['--nav-pull','--nav-card-pull','--nav-stretch'])siteHeader.style.removeProperty(name);
  });
  navPullHandle.addEventListener('click',event=>{
    if(suppressPullClick){event.preventDefault();suppressPullClick=false;return}
    setNavCollapsed(!siteHeader.classList.contains('is-collapsed'));
  });
  navPullHandle.addEventListener('keydown',event=>{
    if(event.key==='ArrowUp'){event.preventDefault();setNavCollapsed(true)}
    if(event.key==='ArrowDown'){event.preventDefault();setNavCollapsed(false)}
  });
}


})();
