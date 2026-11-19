import {notify,confirmAction} from './ui-notifications.js';

document.querySelector('[data-notice-global]').onclick=e=>notify({message:'Cambios guardados',description:'La información quedó actualizada.',anchor:e.currentTarget});
document.querySelector('[data-notice-context]').onclick=e=>notify({message:'Guardado',description:'Los cambios están listos.',variant:'contextual',anchor:e.currentTarget});
document.querySelector('[data-notice-info]').onclick=e=>notify({message:'Revisión pendiente',description:'Puedes consultar el estado desde Contenidos.',tone:'info',anchor:e.currentTarget});
document.querySelector('[data-notice-error]').onclick=e=>notify({message:'No se pudo guardar',description:'Tus cambios se conservan. Inténtalo de nuevo.',tone:'error',anchor:e.currentTarget});

async function example(event){
  const trigger=event.currentTarget,mode=trigger.dataset.confirmationMode||'simple';
  let attempts=0;
  const accepted=await confirmAction({
    title:'¿Retirar publicación?',
    description:'Dejará de aparecer en noticias, inicio y búsqueda. El historial y sus archivos se conservarán.',
    context:'Encuentro de equipos en Santa Marta',
    confirmLabel:'Retirar publicación',
    cancelLabel:'Conservar publicación',
    requireReason:mode==='reason'||mode==='error',
    trigger,
    onConfirm:async()=>{
      if(mode==='pending'||mode==='error')await new Promise(resolve=>setTimeout(resolve,1200));
      if(mode==='error'&&attempts++===0)throw {userMessage:'No se pudo completar el retiro. El motivo se conserva; puedes reintentar.'};
    }
  });
  if(accepted)notify({message:'Ejemplo completado',description:'No se modificó ningún contenido.',anchor:trigger});
}
document.querySelector('[data-confirmation-example]').onclick=example;
document.querySelectorAll('[data-confirmation-mode]').forEach(button=>button.onclick=example);
