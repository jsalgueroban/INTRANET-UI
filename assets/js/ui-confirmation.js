import {feedbackIcon} from './ui-feedback-icons.js';
import {dismissNotice} from './ui-notice.js';
let confirmation=null,sequence=0;
export function confirmAction({title,description,context='',confirmLabel='Confirmar',cancelLabel='Cancelar',requireReason=false,onConfirm,trigger=document.activeElement}={}){
 if(confirmation)return confirmation;
 dismissNotice();
 confirmation=new Promise(resolve=>{
 const dialog=document.createElement('dialog');dialog.className='ui-confirmation';const id='ui-confirmation-'+(++sequence);dialog.setAttribute('aria-labelledby',id);dialog.setAttribute('aria-describedby',id+'-description');
 const form=document.createElement('form');const header=document.createElement('header');header.className='ui-confirmation__head';const symbol=document.createElement('span');symbol.className='ui-confirmation__symbol';symbol.innerHTML=feedbackIcon('error');const heading=document.createElement('h2');heading.id=id;heading.textContent=title;header.append(symbol,heading);
 const body=document.createElement('div');body.className='ui-confirmation__body';const descriptionNode=document.createElement('p');descriptionNode.id=id+'-description';descriptionNode.textContent=description;body.append(descriptionNode);if(context){const resource=document.createElement('strong');resource.className='ui-confirmation__context';resource.textContent=context;body.append(resource);}
 let reason;if(requireReason){const field=document.createElement('div');field.className='ui-field';const label=document.createElement('label');label.htmlFor=id+'-reason';label.textContent='Motivo';reason=document.createElement('textarea');reason.id=label.htmlFor;reason.name='reason';reason.rows=3;reason.required=true;reason.maxLength=1200;field.append(label,reason);body.append(field);}
 const error=document.createElement('p');error.className='ui-confirmation__error';error.setAttribute('role','alert');error.tabIndex=-1;body.append(error);
 const actions=document.createElement('div');actions.className='ui-confirmation__actions';const cancel=document.createElement('button'),accept=document.createElement('button');cancel.type='button';cancel.className='ui-action ui-action--quiet';cancel.textContent=cancelLabel;accept.type='submit';accept.className='ui-action ui-action--danger';accept.textContent=confirmLabel;actions.append(cancel,accept);form.append(header,body,actions);dialog.append(form);document.body.append(dialog);
 let busy=false,result=false;const previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
 cancel.onclick=()=>dialog.close();dialog.addEventListener('cancel',event=>{if(busy)event.preventDefault();});
 dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;dialog.remove();confirmation=null;if(trigger?.isConnected)trigger.focus();resolve(result);},{once:true});
 form.onsubmit=async event=>{event.preventDefault();if(busy)return;if(requireReason&&!reason.value.trim()){error.textContent='Escribe el motivo para continuar.';reason.focus();return;}busy=true;cancel.disabled=true;accept.disabled=true;accept.setAttribute('aria-busy','true');accept.textContent='Procesando…';error.textContent='';try{await onConfirm?.({reason:reason?.value.trim()||''});result=true;dialog.close();}catch(failure){error.textContent=failure?.userMessage||'No se pudo completar la acción. Tus datos se conservan; inténtalo de nuevo.';error.focus();}finally{busy=false;cancel.disabled=false;accept.disabled=false;accept.removeAttribute('aria-busy');accept.textContent=confirmLabel;}};
 dialog.showModal();cancel.focus();
 });return confirmation;
}
