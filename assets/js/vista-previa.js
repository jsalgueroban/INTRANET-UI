import {allNews} from './news-data.js?v=20261106e';
import {withdrawalToken} from './publication-lifecycle.js?v=20261106e';
import {submitEditorialReview} from './pending-store.js?v=20261106e';
import { editorialContentMarkup, bindEditorialMedia } from './ui-editorial-content.js?v=20261106e';
import { resourceData } from './resource-binary-store.js';
import { readDrafts } from './editorial-store.js?v=20261106e';
const host = document.querySelector('[data-preview-article]');
let item;
try { item = readDrafts().find(entry => entry.id === new URLSearchParams(location.search).get('id')); } catch {}
if (!item) host.innerHTML = '<div class="ui-feedback"><h1>Borrador no disponible</h1><a href="contenidos.html?view=drafts">Ver borradores</a></div>';
else {
  document.querySelector('[data-back]').href = 'editar-contenido.html?id=' + encodeURIComponent(item.id);
  host.innerHTML = editorialContentMarkup(item, { heading: 1, resolve: resourceData });
  bindEditorialMedia(host);
}

const send=document.querySelector('[data-send-review]');
if(!item)send.disabled=true;
else send.onclick=()=>{send.disabled=true;try{const snapshot={title:item.title,summary:item.summary,category:item.category,image:item.image,alt:item.alt,sections:structuredClone(item.sections),resources:(item.resources||[]).map(r=>({...r,data:resourceData(r.id)}))};const review=submitEditorialReview(item,snapshot,allNews.find(n=>n.id===item.sourceId)||null,withdrawalToken(item.sourceId));const status=document.querySelector('[data-send-status]');status.replaceChildren(document.createTextNode('Versión enviada. La publicación vigente se conserva. '));const link=document.createElement('a');link.className='ui-content-link';link.href='pendiente.html?id='+encodeURIComponent(review.id)+'&from=editorial';link.textContent='Abrir revisión de ejemplo';status.append(link);send.textContent='Versión enviada';}catch(error){document.querySelector('[data-send-status]').textContent=error.message;send.disabled=false;}};
