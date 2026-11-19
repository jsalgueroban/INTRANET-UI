import { informationPages } from './published-information.js?v=20261106e';
import { contentLinks } from './ui-content-links.js?v=20261106e';
document.querySelector('[data-sections]').innerHTML=contentLinks(informationPages.filter(item=>item.published).map(item=>({title:item.title,summary:item.summary,meta:item.category,href:'informacion.html?id='+encodeURIComponent(item.id)})));
