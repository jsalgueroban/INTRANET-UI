import {notify} from './ui-notifications.js';
import {floatingPanel} from './ui-floating-panel.js';
import {news} from './news-data.js?v=20261106e';
import {readOrganization} from './content-organization.js';
const makeButton=(label,action)=>{const button=document.createElement('button');button.type='button';button.className='ui-action ui-action--secondary';button.textContent=label;button.onclick=action;return button;};
const panels=[];
const categoryForm=document.querySelector('[data-category-form]');
if(categoryForm){
  const section=categoryForm.parentElement;
  const panel=floatingPanel(categoryForm,{title:'Nueva categoría'});panels.push(panel);
  section.insertBefore(makeButton('Nueva categoría',event=>{categoryForm.querySelector('[data-cancel]').click();panel.title('Nueva categoría');panel.open(event.currentTarget);}),section.querySelector('[data-categories]'));
  document.querySelector('[data-categories]').addEventListener('click',e=>{if(e.target.closest('[data-edit]')){panel.title('Renombrar categoría');panel.open(e.target.closest('button'));}});
  categoryForm.querySelector('[data-cancel]').addEventListener('click',()=>panel.close());
  const form=document.querySelector('[data-feature-form]');
  const host=form.parentElement;
  const summary=document.createElement('div');summary.className='admin-feature-summary';
  const refresh=()=>{const item=news.find(n=>n.id===readOrganization().featured);summary.replaceChildren();if(!item)return;const img=document.createElement('img');img.src='assets/art/'+item.image;img.alt=item.alt;const heading=document.createElement('h3');heading.textContent=item.title;const text=document.createElement('p');text.textContent=item.summary;summary.append(img,heading,text);};
  host.insertBefore(summary,form);refresh();
  const featurePanel=floatingPanel(form,{title:'Elegir noticia destacada',wide:true});panels.push(featurePanel);
  const select=form.elements.featured;select.closest('label').hidden=true;
  const choices=document.createElement('fieldset');choices.className='admin-story-choices';const legend=document.createElement('legend');legend.textContent='Noticias publicadas';legend.className='sr-only';choices.append(legend);
  for(const item of news){const label=document.createElement('label');label.className='admin-story-choice';const radio=document.createElement('input');radio.type='radio';radio.name='featured-choice';radio.value=item.id;const img=document.createElement('img');img.src='assets/art/'+item.image;img.alt='';const name=document.createElement('strong');name.textContent=item.title;label.append(radio,img,name);radio.onchange=()=>{select.value=radio.value;select.dispatchEvent(new Event('change'));};choices.append(label);}
  form.prepend(choices);form.querySelector('[data-preview]').hidden=true;
  host.insertBefore(makeButton('Cambiar destacada',e=>{select.value=readOrganization().featured;choices.querySelectorAll('input').forEach(r=>r.checked=r.value===select.value);featurePanel.open(e.currentTarget);}),summary.nextSibling);
  document.addEventListener('admin-feedback',e=>{if(!e.detail.error)refresh();});
}
const roomForm=document.querySelector('[data-room-form]');
if(roomForm){
  const panel=floatingPanel(roomForm,{title:'Configurar sala'});panels.push(panel);
  document.querySelector('[data-new]').addEventListener('click',e=>{panel.title('Nueva sala');panel.open(e.currentTarget);});
  document.querySelector('[data-rooms]').addEventListener('click',e=>{if(e.target.closest('[data-room]')){panel.title('Configurar sala');panel.open(e.target.closest('button'));}});
  const form=document.querySelector('[data-block-form]');const section=form.parentElement;
  const maintenance=floatingPanel(form,{title:'Registrar mantenimiento'});panels.push(maintenance);
  section.insertBefore(makeButton('Registrar mantenimiento',e=>maintenance.open(e.currentTarget)),section.querySelector('[data-blocks]'));
}
const detail=document.querySelector('[data-resource-detail]');
if(detail){
  const parent=detail.parentElement;parent.classList.add('admin-columns--library');
  const panel=floatingPanel(detail,{title:'Detalle del recurso',wide:true});
  document.querySelector('[data-resource-list]').addEventListener('click',e=>{if(e.target.closest('[data-resource]')){panel.title(detail.querySelector('h2')?.textContent||'Detalle del recurso');panel.open(e.target.closest('button'));}});
  document.addEventListener('admin-feedback',e=>{if(panel.dialog.open){if(e.detail.error)panel.message(e.detail.message,true);else {panel.close();document.querySelector('[data-resource]')?.focus();}}});
}
document.addEventListener('admin-feedback',e=>{const active=panels.find(p=>p.dialog.open);if(!active)return;if(e.detail.error)active.message(e.detail.message,true);else active.close();});

document.addEventListener('admin-feedback',e=>{if(!e.detail.error&&e.detail.message)notify({message:e.detail.message.split('. ')[0].replace(/\.$/,'')});});
