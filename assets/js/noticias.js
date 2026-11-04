import { news, escapeHtml as esc, dateLabel, articleUrl, arrow, rememberNews } from './news-data.js';
import { initSearchField } from './ui-controls.js';
const search = document.querySelector('#news-search');
const category = document.querySelector('#news-category');
const params = new URLSearchParams(location.search);
search.value = params.get('q') || '';
category.value = [...category.options].some(o => o.value === params.get('category')) ? params.get('category') : 'all';
let current = Math.max(1, Number(params.get('page')) || 1);
const pageSize = 3;
initSearchField(search.closest('.ui-search-field'));
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
function render() {
  const term = normalize(search.value.trim());
  const filtered = news.filter(item => (category.value === 'all' || item.category === category.value) && normalize(item.title + ' ' + item.summary).includes(term)).sort((a,b) => b.date.localeCompare(a.date));
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  current = Math.min(current, pages);
  history.replaceState(null, '', '?' + new URLSearchParams({q:search.value,category:category.value,page:String(current)}));
  const featured = document.querySelector('[data-featured]');
  featured.hidden = Boolean(term || category.value !== 'all' || current !== 1);
  const item = news[0];
  featured.innerHTML = `<a class="news-feature" href="${articleUrl(item)}"><img src="assets/art/${item.image}" alt="${esc(item.alt)}" /><div><p class="news-meta">${esc(item.category)} · ${dateLabel(item.date)}</p><h2>${esc(item.title)}</h2><p>${esc(item.summary)}</p><span class="news-read">Leer noticia ${arrow}</span></div></a>`;
  document.querySelector('[data-news-list]').innerHTML = filtered.slice((current-1)*pageSize,current*pageSize).map(item => `<a class="ui-list-row" href="${articleUrl(item)}"><span class="ui-list-row__mark"><svg class="ui-icon" aria-hidden="true"><use href="assets/icons/tabler-sprite.svg#ti-file-text" /></svg></span><span class="ui-list-row__content"><strong>${esc(item.title)}</strong><small>${esc(item.summary)}</small></span><span class="ui-list-row__meta">${esc(item.category)}<br>${dateLabel(item.date)}</span><span class="ui-list-row__action">${arrow}</span></a>`).join('');
  document.querySelector('[data-count]').textContent = `${filtered.length} ${filtered.length===1?'publicación':'publicaciones'}`;
  document.querySelector('[data-empty]').hidden = filtered.length > 0;
  document.querySelector('[data-page]').textContent = `${current} de ${pages}`;
  document.querySelector('[data-prev]').disabled = current === 1;
  document.querySelector('[data-next]').disabled = current === pages;
  document.querySelectorAll('main a[href^="noticia.html"]').forEach(rememberNews);
}
search.addEventListener('input', () => {current=1;render();});
category.addEventListener('change', () => {current=1;render();});
document.querySelector('[data-clear]').addEventListener('click', () => {search.value='';category.value='all';search.dispatchEvent(new Event('input'));search.focus();});
document.querySelector('[data-prev]').addEventListener('click', () => {current--;render();});
document.querySelector('[data-next]').addEventListener('click', () => {current++;render();});
render();
try { const saved=JSON.parse(sessionStorage.getItem('news-return')||'null'); if(saved?.query===location.search) requestAnimationFrame(()=>{document.querySelector(`[href="noticia.html?id=${CSS.escape(saved.id)}"]`)?.focus({preventScroll:true});scrollTo({top:saved.y,behavior:'instant'});}); } catch {}
