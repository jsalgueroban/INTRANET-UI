import {floatingPanel} from './ui-floating-panel.js';
import {mountReservation} from './reservation-form.js?v=20261123';

export function initReservationPanel(onClose){
// Reuse the existing reservation surface inside Intranet's shared floating panel.
const reservationContent=document.createElement('div');
reservationContent.className='rooms-reservation-panel';
const reservationPanel=floatingPanel(reservationContent,{title:'Solicitar reserva',wide:true});
let reservationTemplate;
let loadingReservation=false;
document.querySelector('.rooms-page').addEventListener('click',async event=>{
  const trigger=event.target.closest('[data-request], .rooms-slot');
  if(!trigger||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  event.preventDefault();
  if(loadingReservation)return;
  const selection=new URL(trigger.href,location.href).searchParams;
  reservationContent.textContent='Cargando formulario…';
  reservationContent.setAttribute('aria-busy','true');
  reservationPanel.open(trigger);
  loadingReservation=true;
  try{
    if(!reservationTemplate){
      const response=await fetch('solicitar-reserva.html');
      if(!response.ok)throw new Error();
      const page=new DOMParser().parseFromString(await response.text(),'text/html');
      reservationTemplate=page.querySelector('[data-request-stage]');
      if(!reservationTemplate)throw new Error();
    }
    const stage=reservationTemplate.cloneNode(true);
    stage.classList.remove('rooms-workspace');
    reservationContent.replaceChildren(stage);
    mountReservation(stage,selection,link=>{if(link.hasAttribute('data-calendar')&&!document.querySelector('[data-agenda]'))location.href=link.href;else reservationPanel.close();});
    if(reservationPanel.dialog.open)stage.querySelector('select').focus();
  }catch{
    reservationContent.replaceChildren();
    const message=document.createElement('p');
    message.textContent='No pudimos abrir el formulario. Puedes continuar en la página de reserva.';
    const link=document.createElement('a');
    link.className='ui-action ui-action--secondary';
    link.href=trigger.href;link.textContent='Abrir solicitud';
    reservationContent.append(message,link);
  }finally{
    loadingReservation=false;reservationContent.removeAttribute('aria-busy');
  }
});
reservationPanel.dialog.addEventListener('close',()=>{
  const href=document.activeElement?.getAttribute('href');
  onClose();
  const trigger=[...document.querySelectorAll('[data-request], .rooms-slot')].find(link=>link.getAttribute('href')===href);
  (trigger||document.querySelector('[data-request]')).focus();
});

}
