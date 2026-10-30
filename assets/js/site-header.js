(() => {
const headerTarget = document.querySelector('[data-site-header]');
if (headerTarget) {
  headerTarget.outerHTML = `  <header class="site-header" data-header>
    <div class="nav-shell">
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav"><span></span><span></span><span></span><b>Menú</b></button>
      <a class="mobile-brand" href="inicio.html" aria-label="Inicio de la Intranet"><strong>Intranet</strong><img src="assets/brand/logo-banasan.svg" alt="Banasan" /></a>
      <nav class="main-nav" id="main-nav" aria-label="Navegación principal">
        <div class="nav-group nav-group--left">
          <div class="nav-item"><button class="nav-trigger" type="button" aria-expanded="false">Nuestra empresa <span>⌄</span></button><div class="nav-popover"><a href="#">Quiénes somos</a><a href="#">Nuestra cultura</a><a href="#">Directorio corporativo</a></div></div>
          <div class="nav-item"><button class="nav-trigger" type="button" aria-expanded="false">Indicadores y acciones <span>⌄</span></button><div class="nav-popover"><a href="#">Indicadores corporativos</a><a href="#">Planes de acción</a><a href="#">Seguimiento</a></div></div>
          <div class="nav-item"><button class="nav-trigger" type="button" aria-expanded="false">UI <span>⌄</span></button><div class="nav-popover"><a href="componentes.html">Componentes</a><a href="usuarios.html">Gestión de usuarios</a><a href="data-list-demo.html">Directorio de servicios</a><a href="navigation-demo.html">Navegación</a><a href="login.html">Acceso</a></div></div>
        </div>
        <a class="brand-lockup ui-brand-lockup ui-brand-lockup--inverse" href="inicio.html" aria-label="Inicio de la Intranet"><strong>Intranet</strong><img src="assets/brand/logo-banasan.svg" alt="Banasan" /></a>
        <div class="nav-group nav-group--right">
          <div class="nav-item"><button class="nav-trigger" type="button" aria-expanded="false">Bienestar laboral <span>⌄</span></button><div class="nav-popover"><a href="#">Beneficios</a><a href="#">Seguridad y salud</a><a href="inicio.html#vacantes">Vacantes internas</a></div></div>
          <div class="nav-item"><button class="nav-trigger" type="button" aria-expanded="false">Formatos y documentos <span>⌄</span></button><div class="nav-popover"><a href="#">Formatos frecuentes</a><a href="#">Políticas</a><a href="#">Biblioteca documental</a></div></div>
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
              <a href="#" data-account-pending><span><strong>Perfil</strong></span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M6 4h6v6"/></svg></a>
              <a href="#" data-account-pending><span><strong>Empresa</strong></span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M6 4h6v6"/></svg></a>
              <a href="usuarios.html"><span><strong>Gestión de usuarios</strong></span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M6 4h6v6"/></svg></a>
            </nav>
          </section>
        </div>
      </div>
    </div>
  </header>`;
}
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
    siteHeader.classList.remove('is-pulling');
    siteHeader.classList.add('is-settling');
    siteHeader.classList.toggle('is-collapsed',collapsed);
    navPullHandle.setAttribute('aria-expanded',String(!collapsed));
    navPullHandle.setAttribute('aria-label',collapsed?'Mostrar navegación':'Ocultar navegación');
    nav.inert=collapsed;
    headerTools.inert=collapsed;
    nav.setAttribute('aria-hidden',String(collapsed));
    headerTools.setAttribute('aria-hidden',String(collapsed));
    finishNavMotion();
  };
  const returnNav=()=>{
    siteHeader.classList.remove('is-pulling');
    siteHeader.classList.add('is-settling');
    finishNavMotion();
  };
  navPullHandle.addEventListener('pointerdown',event=>{
    if(event.button!==0||innerWidth<=860)return;
    clearTimeout(settleTimer);
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
    if(!pulling)return;
    pullAmount=Math.min(maxPull,Math.max(0,event.clientY-pullStart));
    suppressPullClick=pullAmount>6;
    siteHeader.style.setProperty('--nav-pull',`${pullAmount}px`);
    siteHeader.style.setProperty('--nav-card-pull',`${pullAmount*.12}px`);
    siteHeader.style.setProperty('--nav-stretch',String(1+pullAmount/620));
    event.preventDefault();
  });
  const releaseNav=event=>{
    if(!pulling)return;
    pulling=false;
    if(navPullHandle.hasPointerCapture(event.pointerId))navPullHandle.releasePointerCapture(event.pointerId);
    if(pullingFromCollapsed){
      if(pullAmount>=collapseThreshold)setNavCollapsed(false);else returnNav();
    }else if(pullAmount>=collapseThreshold)setNavCollapsed(true);else returnNav();
  };
  navPullHandle.addEventListener('pointerup',releaseNav);
  navPullHandle.addEventListener('pointercancel',releaseNav);
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
