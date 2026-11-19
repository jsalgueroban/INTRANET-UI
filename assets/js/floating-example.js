import {floatingPanel} from './ui-floating-panel.js';
const form=document.querySelector('[data-floating-example]');
form.hidden=false;
const panel=floatingPanel(form,{title:'Editar nombre'});
document.querySelector('[data-floating-example-open]').onclick=e=>panel.open(e.currentTarget);
form.onsubmit=e=>{e.preventDefault();if(!form.querySelector('input').value.trim()){panel.message('Escribe un nombre.',true);return;}document.querySelector('[data-floating-example-status]').textContent='Nombre guardado en este ejemplo.';panel.close();};
