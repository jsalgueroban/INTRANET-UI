import { informationPages, documents, documentTile, bindDocumentTiles } from './published-information.js?v=20261106e';
import {documentsForPage} from './document-library-store.js';
import { editorialContentMarkup, bindEditorialMedia } from './ui-editorial-content.js?v=20261106e';
const host=document.querySelector('[data-information]');
const item=informationPages.find(entry=>entry.published&&entry.id===new URLSearchParams(location.search).get('id'));
if(!item)host.innerHTML='<div class="ui-feedback"><h1>Información no disponible</h1><p>Esta sección no tiene contenido publicado para consulta.</p><a href="secciones.html">Consultar secciones</a></div>';
else{document.title=item.title+' · Intranet Banasan';host.innerHTML=editorialContentMarkup(item,{heading:1});bindEditorialMedia(host);const related=documentsForPage(item.id).filter(doc=>doc.status==='Vigente'&&doc.audience==='general');if(related.length)host.insertAdjacentHTML('beforeend','<section class="information-documents"><h2>Documentos de esta sección</h2><div class="ui-document-tiles">'+related.map(doc=>documentTile({...doc,file:doc.type==='PDF'?'preview.pdf':'preview.docx'}).replace(/href="[^"]*"/,`href="documento.html?id=${encodeURIComponent(doc.id)}"`)).join('')+'</div></section>');host.querySelectorAll('a[href^="documento.html"]').forEach(link=>link.addEventListener('click',()=>sessionStorage.setItem('document-return','informacion.html?id='+encodeURIComponent(item.id))));}

bindDocumentTiles(host);
