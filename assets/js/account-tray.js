(()=>{
  const hosts=[...document.querySelectorAll('[data-account-tray]')];
  if(!hosts.length)return;

  const close=(host,{restore=false}={})=>{
    if(!host.classList.contains('is-open'))return;
    const trigger=host.querySelector('.account-tray__trigger');
    const tray=host.querySelector('.account-tray');
    host.classList.remove('is-open');
    trigger.setAttribute('aria-expanded','false');
    tray.setAttribute('aria-hidden','true');
    document.body.classList.remove('has-account-tray');
    if(restore)trigger.focus();
  };
  const closeAll=except=>hosts.forEach(host=>{if(host!==except)close(host)});
  const open=host=>{
    closeAll(host);
    host.classList.add('is-open');
    host.querySelector('.account-tray__trigger').setAttribute('aria-expanded','true');
    host.querySelector('.account-tray').setAttribute('aria-hidden','false');
    document.body.classList.add('has-account-tray');
  };

  hosts.forEach(host=>{
    const trigger=host.querySelector('.account-tray__trigger');
    const links=[...host.querySelectorAll('.account-tray__nav a')];
    trigger.addEventListener('click',event=>{
      event.stopPropagation();
      host.classList.contains('is-open')?close(host):open(host);
    });
    trigger.addEventListener('keydown',event=>{
      if(event.key==='ArrowDown'){
        event.preventDefault();
        open(host);
        requestAnimationFrame(()=>links[0]?.focus());
      }
    });
    host.querySelectorAll('[data-account-close]').forEach(button=>button.addEventListener('click',()=>close(host,{restore:true})));
    host.querySelectorAll('[data-account-pending]').forEach(link=>link.addEventListener('click',event=>event.preventDefault()));
    host.querySelector('.account-tray__nav')?.addEventListener('keydown',event=>{
      const index=links.indexOf(document.activeElement);
      if(index<0)return;
      if(event.key==='ArrowDown'||event.key==='ArrowUp'){
        event.preventDefault();
        const step=event.key==='ArrowDown'?1:-1;
        links[(index+step+links.length)%links.length].focus();
      }
      if(event.key==='Home'){event.preventDefault();links[0].focus()}
      if(event.key==='End'){event.preventDefault();links.at(-1).focus()}
    });
  });

  document.addEventListener('click',event=>hosts.forEach(host=>{if(!host.contains(event.target))close(host)}));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')hosts.forEach(host=>close(host,{restore:true}))});
})();
