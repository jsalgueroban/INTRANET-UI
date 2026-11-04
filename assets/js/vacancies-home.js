import { readVacancies } from './vacancies-store.js';
import { escapeHtml as esc, arrow } from './news-data.js';
const host=document.querySelector('.jobs-list');
function render(){if(!host)return;try{const items=readVacancies().filter(item=>item.status==='Disponible').slice(0,3);host.innerHTML=items.length?items.map(item=>`<a href="vacante.html?id=${encodeURIComponent(item.id)}"><div><strong>${esc(item.title)}</strong><span>${esc(item.area)}</span></div><small>${esc(item.place)} · ${esc(item.mode)}</small><b>${arrow}</b></a>`).join(''):'<p>No hay vacantes disponibles en este momento.</p>';}catch{host.innerHTML='<p>No pudimos cargar las vacantes. <a href="vacantes.html">Consultar vacantes</a></p>';}}
render();window.addEventListener('pageshow',render);
