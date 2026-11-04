import { searchPublished, publishedIndex } from './search-index.js';
import { contentLinks, feedback } from './ui-content-links.js';
import { initSearchField } from './ui-controls.js';
const input=document.querySelector('#global-search'),host=document.querySelector('[data-results]'),count=document.querySelector('[data-count]'),form=document.querySelector('[data-search-form]');
input.value=new URLSearchParams(location.search).get('q')||'';
initSearchField(input.closest('.ui-search-field'));
function render() {
  const query=input.value.trim();
  history.replaceState(null,'','busqueda.html'+(query?'?'+new URLSearchParams({q:query}):''));
  if(!query){count.textContent='';host.innerHTML=feedback('Encuentra información publicada','Escribe el nombre de una página, noticia, vacante o documento.');return;}
  try {
    const items=searchPublished(query);
    count.textContent=items.length+' '+(items.length===1?'resultado':'resultados');
    host.innerHTML=items.length?contentLinks(items):feedback('No encontramos resultados','Prueba con otro nombre o una palabra más general.');
    host.querySelectorAll('a').forEach(link=>link.addEventListener('click',event=>{
      try {if(!publishedIndex().some(x=>x.href===link.getAttribute('href'))){event.preventDefault();host.innerHTML=feedback('Este resultado ya no está disponible','Actualiza la búsqueda para consultar la información vigente.','Actualizar');bindRetry();}}
      catch {event.preventDefault();showError();}
    }));
  } catch {showError();}
}
function bindRetry(){host.querySelector('[data-retry]')?.addEventListener('click',render);}
function showError(){count.textContent='';host.innerHTML=feedback('No pudimos consultar la información','Tu búsqueda se conserva. Inténtalo de nuevo.','Reintentar');bindRetry();}
form.addEventListener('submit',event=>{event.preventDefault();render();});
input.addEventListener('input',()=>{if(!input.value)render();});
window.addEventListener('pageshow',render);
render();
