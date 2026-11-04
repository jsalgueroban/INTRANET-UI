import { rooms, readItems, overlapping, requestReservation, escapeHtml as esc, dateLabel } from './pending-store.js';
const form=document.querySelector('#reservation-form');
const params=new URLSearchParams(location.search);
form.elements.room.innerHTML=rooms.map(room=>`<option>${esc(room.name)}</option>`).join('');
form.elements.room.value=rooms.some(room=>room.name===params.get('room'))?params.get('room'):rooms[0].name;
form.elements.day.value=params.get('day')||new Intl.DateTimeFormat('en-CA',{timeZone:'America/Bogota'}).format(new Date());
form.elements.start.value=params.get('start')||'';
form.elements.end.value=params.get('end')||'';
let busy=false;
function context() {
  const room=rooms.find(entry=>entry.name===form.elements.room.value);
  document.querySelector('[data-schedule]').textContent=`${room.name} · Horario de ejemplo: ${room.open} a ${room.close}.`;
  for(const name of ['start','end']) {form.elements[name].min=room.open;form.elements[name].max=room.close;}
  const values=Object.fromEntries(new FormData(form));
  document.querySelectorAll('[data-back]').forEach(link=>{link.href='salas.html?'+new URLSearchParams({room:room.name,day:values.day});});
  const matches=document.querySelector('[data-matches]');
  matches.textContent='';
  if(!values.day||!values.start||!values.end)return;
  try {
    const items=overlapping(values,readItems());
    matches.innerHTML=items.length?`<h3>Coincidencias</h3>${items.map(item=>`<p>${esc(item.start)} – ${esc(item.end)} · ${esc(item.status)}</p>`).join('')}<p>${items.some(item=>item.status==='Aprobado')?'El horario tiene una reserva aprobada. Elige otro horario.':'Hay solicitudes pendientes. El gestor decidirá cuál se aprueba.'}</p>`:'<p>No hay coincidencias en el horario seleccionado.</p>';
  }catch{matches.textContent='No se pudo comprobar la disponibilidad. Se verificará al enviar.';}
}
['room','day','start','end'].forEach(name=>form.elements[name].addEventListener('change',context));
form.addEventListener('submit',async event=>{
  event.preventDefault();if(busy)return;
  busy=true;const button=form.querySelector('[type="submit"]');button.disabled=true;button.textContent='Enviando…';button.setAttribute('aria-busy','true');
  const values=Object.fromEntries(new FormData(form));
  await new Promise(resolve=>setTimeout(resolve,300));
  try {
    const result=requestReservation(values);
    if(result.error){document.querySelector('#request-error').textContent=result.error;return;}
    document.querySelector('[data-request-stage]').innerHTML=`<section class="rooms-success" tabindex="-1"><h2>Solicitud enviada</h2><p>${esc(result.item.room)} · ${dateLabel(result.item.day)} · ${esc(result.item.start)} – ${esc(result.item.end)}</p><p>Tu solicitud está pendiente de aprobación. Enviar no confirma la reserva.</p><div class="rooms-form-actions"><a class="ui-action ui-action--quiet" href="salas.html?${new URLSearchParams({room:result.item.room,day:result.item.day})}">Ver calendario</a><a class="ui-action ui-action--primary" href="mis-reservas.html">Ver mis reservas</a></div></section>`;
    document.querySelector('.rooms-success').focus();
  }catch{document.querySelector('#request-error').textContent='No se pudo guardar la solicitud. Inténtalo de nuevo.';}
  finally{busy=false;if(button.isConnected){button.disabled=false;button.textContent='Enviar solicitud';button.removeAttribute('aria-busy');}}
});
context();
