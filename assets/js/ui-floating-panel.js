let nextId=0;
export function floatingPanel(content,{title,wide=false}={}){
  const dialog=document.createElement('dialog');
  dialog.className='ui-dialog ui-dialog--workspace'+(wide?' ui-dialog--wide':'');
  const id=`floating-panel-${++nextId}`;
  dialog.setAttribute('aria-labelledby',id);
  const header=document.createElement('header');header.className='ui-dialog__header';
  const heading=document.createElement('h2');heading.id=id;heading.textContent=title;
  const close=document.createElement('button');close.type='button';close.className='ui-icon-action';close.setAttribute('aria-label','Cerrar');close.innerHTML='<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
  header.append(heading,close);
  const feedback=document.createElement('p');feedback.className='ui-dialog__feedback';feedback.setAttribute('role','status');feedback.tabIndex=-1;
  dialog.append(header,feedback,content);document.body.append(dialog);
  let trigger,triggerKey;
  close.onclick=()=>dialog.close();
  dialog.addEventListener('close',()=>{document.body.classList.remove('has-floating-panel');if(trigger?.isConnected)trigger.focus();else if(triggerKey)document.querySelector(triggerKey)?.focus();});
  return {dialog,open(source){trigger=source||document.activeElement;triggerKey=null;for(const attr of ['data-edit','data-room','data-resource'])if(trigger?.hasAttribute(attr))triggerKey=`[${attr}="${CSS.escape(trigger.getAttribute(attr))}"]`;feedback.textContent='';dialog.showModal();document.body.classList.add('has-floating-panel');},close(){dialog.close();},title(value){heading.textContent=value;},message(text,error=false){feedback.textContent=text;feedback.dataset.error=String(error);if(error)feedback.focus();}};
}
