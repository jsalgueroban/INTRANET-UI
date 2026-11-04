import { readDrafts, saveDraft } from './editorial-store.js';
import { escapeHtml as esc } from './news-data.js';
const host=document.querySelector('[data-editor]');
const status=document.querySelector('[data-save-status]');
let draft,dirty=false,timer;
try { draft=readDrafts().find(item=>item.id===new URLSearchParams(location.search).get('id')); } catch {}
if(!draft){host.innerHTML='<div class="ui-feedback"><h2>Borrador no disponible</h2><p>Regresa al listado para recuperar o crear un borrador.</p><a href="contenidos.html?view=drafts">Ver borradores</a></div>';status.textContent='';}
else {
document.querySelector('[data-resource-count]').textContent=(draft.resources?.length||0)+' adjuntos';
document.querySelector('[data-resources-link]').addEventListener('click',()=>{if(persist())location.href='recursos-contenido.html?id='+encodeURIComponent(draft.id);});
const form=document.querySelector('#editor-form'), sections=document.querySelector('[data-sections]'), error=document.querySelector('[data-error]');
for(const name of ['title','summary','category','image','alt']) form.elements[name].value=draft[name]||'';
document.querySelector('[data-revision-note]').textContent=draft.sourceReview?'Borrador recuperado de '+draft.sourceReview+'. Guardar no sustituye la publicación.':draft.sourceId?'La publicación actual seguirá visible mientras preparas estos cambios.':'Este borrador todavía no está publicado.';
if(draft.correctionOf){const note=document.createElement('section');note.className='editorial-correction';note.innerHTML=`<h2>Observaciones de la revisión</h2><p>${esc(draft.feedback)}</p><p class="editorial-note">${esc(draft.reviewer)} · Ronda ${draft.sourceRound}</p><a href="historial-editorial.html?id=${encodeURIComponent(draft.sourceReview)}">Consultar historial ↗</a>`;form.prepend(note);}
if(draft.sourceReview){const back=document.createElement('a');back.className='ui-action ui-action--quiet';back.href='historial-editorial.html?'+new URLSearchParams({id:draft.sourceReview,round:draft.sourceRound||1,version:draft.sourceVersion||'after'});back.textContent='Volver al historial';back.addEventListener('click',event=>{if(!persist())event.preventDefault();});form.querySelector('.editorial-savebar>div').prepend(back);}
function collect(){for(const name of ['title','summary','category','image','alt'])draft[name]=form.elements[name].value;draft.sections=[...sections.children].map(row=>({title:row.querySelector('input').value,text:row.querySelector('textarea').value}));}
function persist(){clearTimeout(timer);collect();try{draft=saveDraft(draft);dirty=false;error.textContent='';status.textContent='Guardado en esta pestaña · '+new Date(draft.updatedAt).toLocaleTimeString('es-CO',{hour:'2-digit',minute:'2-digit'});return true;}catch{dirty=true;status.textContent='Cambios sin guardar';error.textContent='No pudimos guardar. Tus cambios siguen aquí; vuelve a pulsar Guardar borrador.';return false;}}
function changed(){dirty=true;status.textContent='Cambios sin guardar';clearTimeout(timer);timer=setTimeout(persist,650);}
function render(){sections.innerHTML=draft.sections.map((section,i)=>`<section class="editorial-section"><div class="editorial-section-heading"><h3>Sección ${i+1}</h3><div><button type="button" class="ui-action ui-action--quiet" data-up="${i}" aria-label="Subir sección ${i+1}" ${i===0?'disabled':''}>↑</button><button type="button" class="ui-action ui-action--quiet" data-down="${i}" aria-label="Bajar sección ${i+1}" ${i===draft.sections.length-1?'disabled':''}>↓</button><button type="button" class="ui-action ui-action--quiet" data-remove="${i}">Quitar sección ${i+1}</button></div></div><label class="ui-field">Subtítulo<input value="${esc(section.title)}" /></label><label class="ui-field">Texto<textarea rows="6">${esc(section.text)}</textarea></label></section>`).join('');}
sections.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;collect();let index;if(button.hasAttribute('data-remove')){index=Number(button.dataset.remove);draft.sections.splice(index,1);}else{index=Number(button.dataset.up??button.dataset.down);const next=index+(button.hasAttribute('data-up')?-1:1);[draft.sections[index],draft.sections[next]]=[draft.sections[next],draft.sections[index]];index=next;}render();changed();(sections.children[Math.min(index,sections.children.length-1)]?.querySelector('input')||document.querySelector('[data-add]')).focus();});
document.querySelector('[data-add]').addEventListener('click',()=>{collect();draft.sections.push({title:'',text:''});render();changed();sections.lastElementChild.querySelector('input').focus();});
form.addEventListener('input',changed);form.addEventListener('change',changed);form.addEventListener('submit',event=>{event.preventDefault();persist();});
document.querySelector('[data-preview]').addEventListener('click',()=>{if(persist())location.href='vista-previa.html?id='+encodeURIComponent(draft.id);});
window.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue='';}});
render();status.textContent='Borrador recuperado · Guardado en esta pestaña';
}

window.addEventListener('pageshow',event=>{if(event.persisted)location.reload();});
