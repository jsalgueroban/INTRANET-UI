import { rooms, readItems, dateLabel, escapeHtml as esc } from './pending-store.js';
const room = document.querySelector('#room');
const day = document.querySelector('#day');
const params = new URLSearchParams(location.search);
room.innerHTML = rooms.map(entry => `<option>${esc(entry.name)}</option>`).join('');
room.value = rooms.some(entry => entry.name === params.get('room')) ? params.get('room') : rooms[0].name;
day.value = /^\d{4}-\d{2}-\d{2}$/.test(params.get('day') || '') ? params.get('day') : new Intl.DateTimeFormat('en-CA',{timeZone:'America/Bogota'}).format(new Date());
const iso = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
function render() {
  if (!day.value) return;
  const params = new URLSearchParams({room:room.value,day:day.value});
  history.replaceState(null,'','?'+params);
  const selected = rooms.find(entry => entry.name === room.value);
  document.querySelector('[data-request]').href = 'solicitar-reserva.html?'+params;
  document.querySelector('[data-day-title]').textContent = dateLabel(day.value);
  document.querySelector('[data-hours]').textContent = `${selected.open} – ${selected.close}`;
  const date = new Date(day.value+'T12:00:00');
  date.setDate(date.getDate() - (date.getDay()+6)%7);
  document.querySelector('[data-week]').innerHTML = Array.from({length:7},(_,index)=>{const d=new Date(date);d.setDate(d.getDate()+index);const key=iso(d);return `<button type="button" class="rooms-day" data-date="${key}" ${key===day.value?'aria-current="date"':''}><span>${new Intl.DateTimeFormat('es-CO',{weekday:'short'}).format(d)}</span><strong>${d.getDate()}</strong><span class="sr-only">${dateLabel(key)}</span></button>`;}).join('');
  const week = document.querySelector('[data-week]');
  const selectedDay = week.querySelector('[aria-current]');
  if (selectedDay) week.scrollLeft = selectedDay.offsetLeft - week.offsetLeft - (week.clientWidth - selectedDay.offsetWidth) / 2;
  document.querySelectorAll('[data-date]').forEach(button=>button.addEventListener('click',()=>{day.value=button.dataset.date;render();document.querySelector(`[data-date="${day.value}"]`).focus();}));
  try {
    const items = readItems().filter(item=>item.type==='reserva' && item.room===room.value && item.day===day.value && ['Por aprobar','Aprobado'].includes(item.status)).sort((a,b)=>a.start.localeCompare(b.start));
    document.querySelector('[data-agenda]').innerHTML = items.length ? items.map(item=>`<div class="rooms-event"><div class="rooms-event-time"><strong>${esc(item.start)}</strong><span>${esc(item.end)}</span></div><div><strong>${esc(item.room)}</strong><p>${esc(item.person)}</p><span class="rooms-status ${item.status==='Aprobado'?'rooms-status--approved':''}">${esc(item.status)}</span></div></div>`).join('') : '<div class="rooms-empty"><h3>No hay solicitudes para este día</h3><p>Puedes solicitar un horario dentro de la disponibilidad de la sala.</p></div>';
    const approved=items.filter(item=>item.status==='Aprobado');
    let cursor=selected.open;
    const gaps=[];
    for(const item of approved){if(item.start>cursor)gaps.push([cursor,item.start]);if(item.end>cursor)cursor=item.end;}
    if(cursor<selected.close)gaps.push([cursor,selected.close]);
    document.querySelector('[data-availability]').innerHTML = '<h3>Horarios sin reserva aprobada</h3>'+(gaps.length?gaps.map(([start,end])=>`<a class="rooms-slot" href="solicitar-reserva.html?${params}&start=${start}&end=${end}"><span>${start} – ${end}</span><span aria-hidden="true">↗</span></a>`).join(''):'<p>No quedan horarios disponibles.</p>');
  } catch {document.querySelector('[data-agenda]').innerHTML='<div class="ui-feedback"><strong>No pudimos cargar las reservas</strong><button class="ui-action ui-action--secondary" data-retry>Reintentar</button></div>';document.querySelector('[data-availability]').textContent='No se pudo comprobar la disponibilidad.';document.querySelector('[data-retry]').addEventListener('click',render);}
}
room.addEventListener('change',render);day.addEventListener('change',render);
for(const [selector,delta] of [['[data-prev]',-7],['[data-next]',7]]) document.querySelector(selector).addEventListener('click',()=>{const date=new Date(day.value+'T12:00:00');date.setDate(date.getDate()+delta);day.value=iso(date);render();});
render();
