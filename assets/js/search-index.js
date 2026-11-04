import { news } from './news-data.js';
import { documents, informationPages, normalize } from './published-information.js';
import { readVacancies } from './vacancies-store.js';
export function publishedIndex() {
  const entry=(item,kind,route,summary,meta)=>({id:kind+':'+item.id,title:item.title,summary,meta:kind+' · '+meta,href:route+'?id='+encodeURIComponent(item.id)});
  return [
    ...informationPages.filter(x=>x.published).map(x=>entry(x,'Página','informacion.html',x.summary,x.category)),
    ...news.map(x=>entry(x,'Noticia','noticia.html',x.summary,x.category)),
    ...readVacancies().filter(x=>x.status==='Disponible').map(x=>entry(x,'Vacante','vacante.html',x.description,x.area+' · '+x.place)),
    ...documents.filter(x=>x.published).map(x=>entry(x,'Documento','documento.html',x.description,x.collection+' · '+x.type))
  ];
}
export function searchPublished(query) {
  const terms=normalize(query.trim()).split(/\s+/).filter(Boolean);
  return terms.length?publishedIndex().filter(x=>terms.every(term=>normalize(x.title+' '+x.summary+' '+x.meta).includes(term))):[];
}
