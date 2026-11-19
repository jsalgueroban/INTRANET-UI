import {readOrganization} from './content-organization.js';
import { news, articleUrl } from './news-data.js?v=20261106e';
const featured=news.find(n=>n.id===readOrganization().featured);
const ordered=[...(featured?[featured]:[]),...news.filter(n=>n.id!==featured?.id).sort((a,b)=>b.date.localeCompare(a.date))];
const stories = [...document.querySelectorAll('.lead-story, .story-list article')];
stories.forEach((story, index) => {
  const item = ordered[index];
  if (!item) { story.hidden=true; return; }
  const heading=story.querySelector('h3');
  if (!heading) return;
  heading.textContent=item.title;
  const image=story.querySelector('img');if(image){image.src='assets/art/'+item.image;image.alt=item.alt;}
  const meta=story.querySelector('.story-meta');
  if(meta) meta.textContent=item.category;
  const summary=heading.nextElementSibling;
  if(summary?.tagName==='P') summary.textContent=item.summary;
  const link=story.querySelector('a');
  if(link){link.href=articleUrl(item);link.setAttribute('aria-label','Leer '+item.title);link.addEventListener('click',()=>{try{sessionStorage.removeItem('news-return');}catch{}});}
});
