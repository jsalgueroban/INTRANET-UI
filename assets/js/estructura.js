import {readStructure,saveUnit,setUnitActive} from './corporate-structure-store.js';
import {escapeHtml as esc} from './news-data.js?v=20261106e';
import {notify} from './ui-notifications.js';
const $=selector=>document.querySelector(selector);
const status=$('[data-status]'),dialog=$('[data-unit-dialog]'),form=$('[data-unit-form]');
const expanded=new Set(['group','company:banasan','unit:banasan-01','unit:banasan-02','unit:banasan-11','unit:banasan-16']);
let companyFilter='all',selected={kind:'unit',id:'banasan-01'},editing=null;
const norm=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es');
function report(message,error=false){status.textContent=message;status.dataset.error=String(error);}
function toggle(id){expanded.has(id)?expanded.delete(id):expanded.add(id);render();$(`[data-toggle-node="${CSS.escape(id)}"]`)?.focus();}
function unitBranch(state,unit,query){
  const children=state.units.filter(u=>u.company===unit.company&&u.parent===unit.id&&($('[data-show-inactive]').checked||u.active));
  const visible=children.map(child=>unitBranch(state,child,query)).filter(Boolean);
  const match=!query||norm(`${unit.code} ${unit.name} ${unit.type}`).includes(query);
  if(!match&&!visible.length)return '';
  const id=`unit:${unit.id}`,open=!!query||expanded.has(id),active=selected.kind==='unit'&&selected.id===unit.id;
  return `<li class="org-tree-item"><div class="org-tree-row ${active?'is-selected':''}"><span class="org-tree-junction" aria-hidden="true"></span>${children.length?`<button type="button" class="org-tree-toggle" data-toggle-node="${esc(id)}" aria-expanded="${open}" aria-label="${open?'Contraer':'Expandir'} ${esc(unit.name)}"><span aria-hidden="true">${open?'−':'+'}</span></button>`:'<span class="org-tree-toggle org-tree-toggle--empty" aria-hidden="true"></span>'}<button type="button" class="org-tree-select" data-select-unit="${esc(unit.id)}" aria-current="${active?'true':'false'}"><strong>${esc(unit.name)}</strong><small>${esc(unit.type)} · ${esc(unit.code)}${unit.active?'':' · Inactiva'}</small></button></div>${open&&visible.length?`<ul class="org-tree-list">${visible.join('')}</ul>`:''}</li>`;
}
function companyBranch(state,company,query){
  const roots=state.units.filter(u=>u.company===company.id&&!u.parent&&($('[data-show-inactive]').checked||u.active));
  const visible=roots.map(unit=>unitBranch(state,unit,query)).filter(Boolean);
  const match=!query||norm(`${company.name} ${company.short} ${company.code}`).includes(query);
  if((companyFilter!=='all'&&companyFilter!==company.id)||(!match&&!visible.length))return '';
  const id=`company:${company.id}`,open=!!query||expanded.has(id),active=selected.kind==='company'&&selected.id===company.id;
  return `<li class="org-tree-item"><div class="org-tree-row org-tree-row--company ${active?'is-selected':''}"><span class="org-tree-junction" aria-hidden="true"></span><button type="button" class="org-tree-toggle" data-toggle-node="${esc(id)}" aria-expanded="${open}" aria-label="${open?'Contraer':'Expandir'} ${esc(company.short)}"><span aria-hidden="true">${open?'−':'+'}</span></button><button type="button" class="org-tree-select" data-select-company="${esc(company.id)}" aria-current="${active?'true':'false'}"><strong>${esc(company.short)}</strong><small>${esc(company.code)} · ${state.units.filter(u=>u.company===company.id).length} dependencias</small></button></div>${open&&visible.length?`<ul class="org-tree-list">${visible.join('')}</ul>`:''}</li>`;
}
function renderDetail(state){
  if(selected.kind==='company'){
    const company=state.companies.find(c=>c.id===selected.id);
    if(!company){$('[data-detail]').innerHTML='';return;}
    const units=state.units.filter(u=>u.company===company.id),people=state.people.filter(p=>p.company===company.id);
    $('[data-detail]').innerHTML=`<span class="org-detail__eyebrow">Empresa</span><h2>${esc(company.short)}</h2><p>${esc(company.name)}</p><dl class="org-detail__facts"><div><dt>NIT</dt><dd>${esc(company.code)}</dd></div><div><dt>Ubicación</dt><dd>${esc(company.location)}</dd></div><div><dt>Dependencias</dt><dd>${units.length}</dd></div><div><dt>Personas asociadas</dt><dd>${people.length}</dd></div></dl><div class="org-detail__actions"><button type="button" class="ui-action ui-action--quiet" data-child>Agregar dependencia</button><a class="ui-action ui-action--quiet" href="usuarios.html">Ver usuarios ↗</a></div>`;
    return;
  }
  const unit=state.units.find(u=>u.id===selected.id),company=state.companies.find(c=>c.id===unit?.company);
  if(!unit){$('[data-detail]').innerHTML='<h2>Selecciona una empresa o dependencia</h2><p>Consulta su posición y las personas asociadas.</p>';return;}
  const parent=state.units.find(u=>u.id===unit.parent),people=state.people.filter(p=>p.unit===unit.id),children=state.units.filter(u=>u.parent===unit.id);
  $('[data-detail]').innerHTML=`<span class="org-detail__eyebrow">${esc(unit.type)}</span><h2>${esc(unit.name)}</h2><p class="org-detail__company">${esc(company?.short||'Empresa')}</p><dl class="org-detail__facts"><div><dt>Código</dt><dd>${esc(unit.code)}</dd></div><div><dt>Depende de</dt><dd>${esc(parent?.name||company?.short||'Empresa')}</dd></div><div><dt>Estado</dt><dd>${unit.active?'Activa':'Inactiva'}</dd></div><div><dt>Unidades hijas</dt><dd>${children.length}</dd></div></dl><div class="org-detail__actions"><button type="button" class="ui-action ui-action--quiet" data-edit>Editar</button><button type="button" class="ui-action ui-action--quiet" data-child>Agregar hija</button><button type="button" class="ui-action ui-action--quiet" data-toggle>${unit.active?'Inactivar':'Activar'}</button></div><div class="org-detail__people"><h3>Personas vinculadas <span>${people.length}</span></h3>${people.length?people.map(p=>`<div class="admin-entry"><strong>${esc(p.name)}</strong><p>${esc(p.position||'Cargo por definir')}</p></div>`).join(''):'<p>No hay personas asociadas.</p>'}</div>`;
}
function render(){
  const state=readStructure(),query=norm($('[data-search]').value.trim());
  $('[data-company]').innerHTML='<option value="all">Todas las empresas</option>'+state.companies.map(c=>`<option value="${esc(c.id)}">${esc(c.short)}</option>`).join('');$('[data-company]').value=companyFilter;
  const branches=state.companies.map(c=>companyBranch(state,c,query)).filter(Boolean);
  const open=!!query||expanded.has('group');
  $('[data-tree]').innerHTML=`<ul class="org-tree-list org-tree-list--root"><li class="org-tree-item"><div class="org-tree-row org-tree-row--root"><button type="button" class="org-tree-toggle" data-toggle-node="group" aria-expanded="${open}" aria-label="${open?'Contraer':'Expandir'} grupo corporativo"><span aria-hidden="true">${open?'−':'+'}</span></button><span class="org-tree-root-label"><strong>Grupo corporativo</strong><small>${branches.length} empresas visibles</small></span></div>${open&&branches.length?`<ul class="org-tree-list">${branches.join('')}</ul>`:''}</li></ul>${branches.length?'':'<p class="org-empty">No hay resultados para esta búsqueda.</p>'}`;
  renderDetail(state);
}
function openUnit(id,parent){
  const state=readStructure(),unit=state.units.find(u=>u.id===id),parentUnit=state.units.find(u=>u.id===parent);
  const company=unit?.company||parentUnit?.company||(selected.kind==='company'?selected.id:state.units.find(u=>u.id===selected.id)?.company)||'banasan';
  editing=id;form.reset();form.elements.code.value=unit?.code||'';form.elements.name.value=unit?.name||'';form.elements.type.value=unit?.type||'Área';form.elements.parent.innerHTML='<option value="">Empresa (raíz)</option>'+state.units.filter(u=>u.company===company&&u.active&&u.id!==id).map(u=>`<option value="${esc(u.id)}">${esc(u.code)} · ${esc(u.name)}</option>`).join('');form.elements.parent.value=unit?.parent||parent||'';form.dataset.company=company;$('[data-form-heading]').textContent=id?'Editar dependencia':'Agregar dependencia';dialog.showModal();form.elements.code.focus();
}
$('[data-tree]').addEventListener('click',e=>{const toggleButton=e.target.closest('[data-toggle-node]');if(toggleButton){toggle(toggleButton.dataset.toggleNode);return;}const unit=e.target.closest('[data-select-unit]');if(unit){selected={kind:'unit',id:unit.dataset.selectUnit};render();return;}const company=e.target.closest('[data-select-company]');if(company){selected={kind:'company',id:company.dataset.selectCompany};expanded.add(`company:${selected.id}`);render();}});
$('[data-company]').addEventListener('change',e=>{companyFilter=e.target.value;expanded.add('group');if(companyFilter!=='all')expanded.add(`company:${companyFilter}`);selected=companyFilter==='all'?selected:{kind:'company',id:companyFilter};render();});
$('[data-search]').addEventListener('input',render);$('[data-show-inactive]').addEventListener('change',render);
$('[data-expand-all]').onclick=()=>{const state=readStructure();expanded.add('group');state.companies.forEach(c=>expanded.add(`company:${c.id}`));state.units.forEach(u=>expanded.add(`unit:${u.id}`));render();};
$('[data-collapse-all]').onclick=()=>{expanded.clear();expanded.add('group');render();};
$('[data-new-unit]').onclick=()=>openUnit(null,selected.kind==='unit'?selected.id:null);$('[data-close-unit]').onclick=()=>dialog.close();
$('[data-detail]').addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;if(button.hasAttribute('data-edit'))openUnit(selected.id,null);if(button.hasAttribute('data-child'))openUnit(null,selected.kind==='unit'?selected.id:null);if(button.hasAttribute('data-toggle')){try{const unit=readStructure().units.find(u=>u.id===selected.id);setUnitActive(unit.id,!unit.active);render();report(`Dependencia ${unit.active?'inactivada':'activada'} en esta propuesta.`);notify({message:`Dependencia ${unit.active?'inactivada':'activada'} en la propuesta`,anchor:$('[data-detail]')});}catch(error){report(error.message,true);notify({message:'No se pudo cambiar el estado',description:error.message,tone:'error',anchor:button});}}});
form.addEventListener('submit',e=>{e.preventDefault();try{const id=saveUnit({id:editing,company:form.dataset.company,code:form.elements.code.value,name:form.elements.name.value,type:form.elements.type.value,parent:form.elements.parent.value});selected={kind:'unit',id};expanded.add('group');expanded.add(`company:${form.dataset.company}`);if(form.elements.parent.value)expanded.add(`unit:${form.elements.parent.value}`);dialog.close();render();report('Dependencia guardada en esta propuesta.');notify({message:'Dependencia guardada en la propuesta',anchor:$('[data-detail]')});}catch(error){report(error.message,true);notify({message:'No se pudo guardar la dependencia',description:error.message,tone:'error',anchor:form.elements.name});}});
render();
