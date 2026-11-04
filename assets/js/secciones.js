import { informationPages } from './published-information.js';
import { contentLinks } from './ui-content-links.js';
document.querySelector('[data-sections]').innerHTML=contentLinks(informationPages.filter(item=>item.published).map(item=>({title:item.title,summary:item.summary,meta:item.category,href:'informacion.html?id='+encodeURIComponent(item.id)})));
