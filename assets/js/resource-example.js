import { resourceMarkup } from './ui-resource.js?v=20261106e';
document.querySelector('[data-resource-example]').innerHTML = resourceMarkup({id:'example',name:'Agenda de trabajo',originalName:'agenda.txt',description:'Temas del encuentro y próximos compromisos.',type:'text/plain',size:120}, {href:'data:text/plain;base64,QWdlbmRhIGRlIHRyYWJham8='});

import { documents, documentTile, bindDocumentTiles } from './published-information.js?v=20261106e';
const guide = documents.find(item => item.id === 'guia-bienestar' && item.published);
if (guide) document.querySelector('[data-document-example]').innerHTML = documentTile(guide);

bindDocumentTiles(document.querySelector('[data-document-example]'));
