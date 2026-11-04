import { resourceMarkup } from './ui-resource.js';
document.querySelector('[data-resource-example]').innerHTML = resourceMarkup({id:'example',name:'Agenda de trabajo',originalName:'agenda.txt',description:'Temas del encuentro y próximos compromisos.',type:'text/plain',size:120}, {href:'data:text/plain;base64,QWdlbmRhIGRlIHRyYWJham8='});
