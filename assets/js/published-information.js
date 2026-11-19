import {effectiveDocuments} from './global-resource-store.js';
import { escapeHtml as esc, arrow } from './news-data.js?v=20261106e';
export const documents = effectiveDocuments([
 {id:'guia-bienestar',title:'Guía de orientación',description:'Información para consultar los canales de bienestar.',collection:'Bienestar',type:'PDF',file:'guia-bienestar.pdf',published:true},
 {id:'formato-orientacion',title:'Formato de orientación',description:'Formato descargable para preparar una consulta.',collection:'Bienestar',type:'Word',file:'formato-orientacion.docx',published:true},
 {id:'seguimiento',title:'Seguimiento de actividades',description:'Hoja de trabajo para organizar actividades.',collection:'Formatos',type:'Excel',file:'seguimiento-actividades.xlsx',published:true},
 {id:'calendario-2026',title:'Calendario Bananero 2026',description:'Edición anual de consulta.',collection:'Calendario Bananero',year:'2026',type:'PDF',file:'calendario-2026.pdf',published:true},
 {id:'calendario-2025',title:'Calendario Bananero 2025',description:'Edición anual publicada en el histórico.',collection:'Calendario Bananero',year:'2025',type:'PDF',file:'calendario-2025.pdf',published:true},
 {id:'retirado',title:'Documento anterior',published:false}
]);
export const informationPages = [
 {id:'cultura',title:'Nuestra cultura',summary:'Trabajo, comunicación y colaboración entre equipos.',category:'Nuestra empresa',image:'canopy-banasan-real-v6.png',alt:'Cultivo de banano',published:true,sections:[{title:'Trabajo en equipo',text:'La coordinación entre áreas permite organizar las actividades y compartir la información necesaria para el trabajo diario.'},{title:'Información a mano',text:'Consulta las noticias, los recursos publicados y los canales disponibles para los colaboradores.'}],documentIds:[]},
 {id:'beneficios',title:'Beneficios',summary:'Documentos de orientación para colaboradores de Banasan.',category:'Bienestar laboral',published:true,sections:[{title:'Consulta y orientación',text:'Revisa la guía de orientación y el formato disponibles en esta sección. Cada documento se puede consultar o descargar según su formato.'}],documentIds:['guia-bienestar','formato-orientacion']},
 {id:'comite',title:'Comité',published:false}
];
export const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function documentRows(items){return items.map(item=>`<a class="ui-list-row" href="documento.html?id=${encodeURIComponent(item.id)}"><span class="ui-list-row__mark"><svg class="ui-icon" aria-hidden="true"><use href="assets/icons/tabler-sprite.svg#ti-file-text" /></svg></span><span class="ui-list-row__content"><strong>${esc(item.title)}</strong><small>${esc(item.description)}</small></span><span class="ui-list-row__meta">${esc(item.type)}${item.year?'<br>'+esc(item.year):''}</span><span class="ui-list-row__action">${arrow}</span></a>`).join('');}

export function documentTile(item) {
  const pdf = item.type === 'PDF';
  const href = pdf ? (item.replacement?.url || 'assets/demo/' + encodeURIComponent(item.file))
                   : 'documento.html?id=' + encodeURIComponent(item.id);
  const attributes = pdf ? ' target="_blank" rel="noopener" aria-label="' + esc(item.title) + ' (PDF, abre en otra pestaña)"' : '';
  const fileIcon = '<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="assets/icons/tabler-sprite.svg#ti-file-text" /></svg>';
  const leaf = '<span class="ui-paper__leaf">' + fileIcon + '</span>';
  return `<a class="ui-document-tile" href="${esc(href)}"${attributes}>
    ${pdf ? '<span class="ui-paper" aria-hidden="true">' + fileIcon + leaf + leaf + '</span>' : fileIcon}
    <strong>${esc(item.title)}</strong><small>${esc(item.type)}</small>
  </a>`;
}

export function bindDocumentTiles(root) {
  for (const paper of root.querySelectorAll('.ui-paper')) {
    const link = paper.closest('a');
    function turnPages() {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      Array.from(paper.querySelectorAll('.ui-paper__leaf')).reverse().forEach((leaf, index) => {
        leaf.getAnimations().forEach(animation => animation.cancel());
        leaf.animate([
          { transform: 'rotateY(0deg)', opacity: 1 },
          { transform: 'rotateY(-55deg) skewY(-8deg)', opacity: 1, offset: .38 },
          { transform: 'rotateY(-145deg) skewY(-3deg)', opacity: .9, offset: .8 },
          { transform: 'rotateY(-172deg)', opacity: 0 }
        ], { duration: 590, delay: index * 115, easing: 'cubic-bezier(.25,.65,.35,1)', fill: 'forwards' });
      });
    }
    link.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') turnPages(); });
    link.addEventListener('pointerdown', event => { if (event.pointerType === 'touch') turnPages(); });
    link.addEventListener('focus', () => { if (link.matches(':focus-visible')) turnPages(); });
  }
}
