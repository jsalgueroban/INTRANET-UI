const status=document.querySelector('[data-platform-status]');
try{
  const response=await fetch('inicio.html');
  if(!response.ok)throw new Error('No disponible');
  const source=new DOMParser().parseFromString(await response.text(),'text/html');
  const hub=source.querySelector('[data-platform-hub]');
  if(!hub)throw new Error('No disponible');
  document.body.append(document.importNode(hub,true));
  await import('./inicio.js?v=9');
  status.textContent='Accesos listos';
}catch{
  status.classList.remove('sr-only');
  status.textContent='No pudimos cargar los accesos. Recarga esta vista para intentarlo de nuevo.';
}
