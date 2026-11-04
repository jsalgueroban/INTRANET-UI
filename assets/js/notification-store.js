import { readItems, viewer } from './pending-store.js';
const key='banasan-notification-reads-v1';
const notices=[
 {id:'revision',recipient:'john',title:'Tienes un contenido por revisar',summary:'Consulta la revisión editorial asignada.',date:'2026-11-04',task:'C-104'},
 {id:'reserva',recipient:'john',title:'Una reserva requiere tu atención',summary:'Revisa la solicitud de sala.',date:'2026-11-03',task:'R-209'},
 {id:'resuelta',recipient:'john',title:'La revisión tiene una respuesta',summary:'Consulta el estado actual y las observaciones.',date:'2026-11-02',task:'C-102'},
 {id:'retirado',recipient:'john',title:'Aviso anterior',summary:'El recurso asociado ya no está disponible.',date:'2026-11-01',unavailable:true},
 {id:'acceso',recipient:'john',title:'Acceso actualizado',summary:'Consulta la disponibilidad del destino.',date:'2026-10-31',denied:true}
];
function reads(){const data=JSON.parse(sessionStorage.getItem(key)||'[]');if(!Array.isArray(data))throw new Error('invalid');return data;}
export function readNotices(){const seen=reads();return notices.filter(x=>x.recipient===viewer.id).map(x=>({...x,read:seen.includes(x.id)}));}
export function markRead(id){if(!notices.some(x=>x.id===id&&x.recipient===viewer.id))return;sessionStorage.setItem(key,JSON.stringify([...new Set([...reads(),id])]));}
export function resolveNotice(id){const item=readNotices().find(x=>x.id===id);if(!item)return {state:'missing'};if(item.denied)return {item,state:'denied'};if(item.unavailable)return {item,state:'missing'};const task=readItems().find(x=>x.id===item.task);if(!task)return {item,state:'missing'};return {item,task,state:task.resolved?'resolved':'open',href:'pendiente.html?id='+encodeURIComponent(task.id)};}
