import { news, articleUrl } from './news-data.js';
const stories = [...document.querySelectorAll('.lead-story, .story-list article')];
stories.forEach((story, index) => {
  const item = news[index];
  if (!item) return;
  const heading=story.querySelector('h3');
  if (!heading) return;
  heading.textContent=item.title;
  const meta=story.querySelector('.story-meta');
  if(meta) meta.textContent=item.category;
  const summary=heading.nextElementSibling;
  if(summary?.tagName==='P') summary.textContent=item.summary;
  const link=story.querySelector('a');
  if(link){link.href=articleUrl(item);link.setAttribute('aria-label','Leer '+item.title);link.addEventListener('click',()=>{try{sessionStorage.removeItem('news-return');}catch{}});}
});
