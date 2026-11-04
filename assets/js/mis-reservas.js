import { readItems, cancelReservation, viewer, escapeHtml as esc, dateLabel } from './pending-store.js';
const host=document.querySelector('[data-my-reservations]');
const filter=document.querySelector('#reservation-state');
function render(){
  try{
    const items=readItems().filter(item=>item.type==='reserva' && item.author===viewer.id && (filter.value==='all'||filter.value===item.status)).sort((a,b)=>b.day.localeCompare(a.day)||b.start.localeCompare(a.start));
    document.querySelector('[data-count]').textContent=`${items.length} ${items.length===1?'solicitud':'solicitudes'}`;
    host.innerHTML=items.length?items.map(item=>`<article class="rooms-own"><div><h2>${esc(item.title)}</h2><p>${esc(item.room)} · ${dateLabel(item.day)} · ${esc(item.start)} – ${esc(item.end)}</p><p>${esc(item.purpose)}</p><strong class="rooms-status ${item.status==='Aprobado'?'rooms-status--approved':''}">${esc(item.status)}</strong>${item.resolved?`<p class="rooms-note">${esc(item.actor)} · ${dateLabel(item.resolvedAt)}${item.reason?' · '+esc(item.reason):''}</p>`:'<p class="rooms-note">Otra persona autorizada debe decidir esta solicitud.</p>'}</div>${['Por aprobar','Aprobado'].includes(item.status)?`<button type="button" class="ui-action ui-action--quiet" data-cancel="${esc(item.id)}">Cancelar reserva<span class="sr-only"> ${esc(item.title)}</span></button>`:''}</article>`).join(''):'<div class="rooms-empty"><h2>No hay reservas para esta consulta</h2><p>Las solicitudes que envíes aparecerán aquí con su estado.</p><a class="ui-action ui-action--secondary" href="salas.html">Consultar salas</a></div>';
    host.querySelectorAll('[data-cancel]').forEach(button=>button.addEventListener('click',()=>{
      button.disabled=true;
      try{const result=cancelReservation(button.dataset.cancel);render();const message=document.querySelector('[data-message]');message.textContent=result.error||'Reserva cancelada. El calendario y tus pendientes se actualizaron.';message.tabIndex=-1;message.focus();}catch{document.querySelector('[data-message]').textContent='No se pudo cancelar la reserva. Inténtalo de nuevo.';button.disabled=false;}
    }));
  }catch{host.innerHTML='<div class="ui-feedback"><strong>No pudimos cargar tus reservas</strong><button class="ui-action ui-action--secondary" data-retry>Reintentar</button></div>';host.querySelector('[data-retry]').addEventListener('click',render);}
}
filter.addEventListener('change',render);render();
