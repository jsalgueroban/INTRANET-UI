import { resolveNotice, markRead } from './notification-store.js';
import { escapeHtml as esc, dateLabel } from './news-data.js';
import { feedback } from './ui-content-links.js';
const host=document.querySelector('[data-notice]'),params=new URLSearchParams(location.search),id=params.get('id');
const state=['all','unread','read'].includes(params.get('from'))?params.get('from'):'all';document.querySelector('[data-notices-back]').href='notificaciones.html?state='+state;
function render(){try{const result=resolveNotice(id);if(result.item)markRead(id);const heading=result.item?`<header class="document-heading"><p>${dateLabel(result.item.date)} · Leída</p><h2>${esc(result.item.title)}</h2></header>`:'';
if(result.state==='missing'||result.state==='denied'){host.innerHTML=heading+feedback(result.state==='denied'?'No tienes acceso al destino':'El destino ya no está disponible','Puedes volver a tus notificaciones y consultar otros avisos.');return;}
host.innerHTML=heading+`<div class="notice-context"><p>${result.state==='resolved'?'Esta tarea ya fue resuelta.':'Esta tarea requiere atención.'}</p><h3>${esc(result.task.title)}</h3><p>Estado actual: <strong>${esc(result.task.status)}</strong></p><p>Leer este aviso no modifica la tarea.</p><a class="ui-action ui-action--primary" href="${esc(result.href)}">${result.state==='resolved'?'Consultar resultado':'Abrir tarea'}</a></div>`;
host.querySelector('a').addEventListener('click',event=>{const current=resolveNotice(id);if(current.state!==result.state){event.preventDefault();render();}});
}catch{host.innerHTML=feedback('No pudimos abrir el aviso','Inténtalo de nuevo.','Reintentar');host.querySelector('[data-retry]').addEventListener('click',render);}}
window.addEventListener('pageshow',render);render();
