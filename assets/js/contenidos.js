import { readItems } from './pending-store.js';
import { news, escapeHtml as esc, dateLabel, arrow } from './news-data.js';
import { readDrafts, newDraft } from './editorial-store.js';
import { initFilterBar, initSearchField, updateFilterCounts } from './ui-controls.js?v=3';
let view=['drafts','reviews'].includes(new URLSearchParams(location.search).get('view'))?new URLSearchParams(location.search).get('view'):'published';
const search=document.querySelector('#content-search');
search.value=new URLSearchParams(location.search).get('q')||'';
initSearchField(search.closest('.ui-search-field'));
const host=document.querySelector('[data-content-list]');
function render(){try{
const matches=item=>(item.title+' '+(item.summary||item.change||'')).toLocaleLowerCase('es').includes(search.value.trim().toLocaleLowerCase('es'));
const groups={published:news.filter(matches),drafts:readDrafts().filter(matches).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)),reviews:readItems().filter(item=>item.type==='contenido').filter(matches)};
updateFilterCounts(document.querySelector('[data-content-tabs]'),Object.fromEntries(Object.entries(groups).map(([key,items])=>[key,items.length])));
const filtered=groups[view];
history.replaceState(null,'','?'+new URLSearchParams({view,q:search.value}));
if(view==='reviews')sessionStorage.setItem('editorial-return',location.search);
document.querySelectorAll('[data-filter]').forEach(button=>{const active=button.dataset.filter===view;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active));});
document.querySelector('[data-content-count]').textContent=`${filtered.length} ${view==='drafts'?'borradores':view==='reviews'?'revisiones':'publicaciones'}`;
if(view==='reviews'){host.innerHTML=filtered.length?filtered.map(item=>`<div class="editorial-row"><div><h2>${esc(item.title)}</h2><p>${esc(item.change)}</p><span>${esc(item.status)} · ${esc(item.person)}</span></div><div><a class="ui-action ui-action--quiet" href="historial-editorial.html?id=${encodeURIComponent(item.id)}">Historial</a><a class="ui-action ui-action--secondary" href="pendiente.html?id=${encodeURIComponent(item.id)}&from=editorial">${item.resolved?'Consultar decisión':'Revisar publicación'}</a></div></div>`).join(''):'<div class="ui-feedback"><h2>No hay revisiones para esta consulta</h2><p>Ajusta o limpia la búsqueda.</p></div>';return;}
host.innerHTML=filtered.length?filtered.map(item=>`<div class="editorial-row"><div><h2>${esc(item.title||'Borrador sin título')}</h2><p>${esc(item.summary||'Sin resumen')}</p><span>${esc(item.category||'Sin categoría')} · ${view==='drafts'?'Borrador':'Publicado el '+dateLabel(item.date)}</span></div><div>${view==='published'?`<a class="ui-action ui-action--quiet" href="noticia.html?id=${encodeURIComponent(item.id)}">Ver publicación</a><button class="ui-action ui-action--secondary" data-edit="${esc(item.id)}">Preparar cambios</button>`:`<a class="ui-action ui-action--secondary" href="editar-contenido.html?id=${encodeURIComponent(item.id)}">Continuar edición ${arrow}</a>`}</div></div>`).join(''):'<div class="ui-feedback"><strong>No hay contenido para esta consulta</strong><p>Puedes ajustar la búsqueda o crear un borrador.</p></div>';
host.querySelectorAll('[data-edit]').forEach(button=>button.addEventListener('click',()=>create(button.dataset.edit)));
}catch{updateFilterCounts(document.querySelector('[data-content-tabs]'),null);document.querySelector('[data-content-count]').textContent='';host.innerHTML='<div class="ui-feedback"><strong>No pudimos cargar los contenidos</strong><button class="ui-action ui-action--secondary" data-retry>Reintentar</button></div>';host.querySelector('[data-retry]').addEventListener('click',render);}}
function create(source){try{const draft=newDraft(source);location.href='editar-contenido.html?id='+encodeURIComponent(draft.id);}catch{document.querySelector('[data-error]').textContent='No se pudo preparar el borrador. Inténtalo de nuevo.';}}
document.querySelector('[data-new]').addEventListener('click',()=>create());
initFilterBar(document.querySelector('[data-content-tabs]'),value=>{view=value;render();});search.addEventListener('input',render);render();
