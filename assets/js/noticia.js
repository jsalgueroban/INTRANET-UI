import { news, escapeHtml as esc, dateLabel, articleUrl, arrow } from './news-data.js';
const item = news.find(entry => entry.id === new URLSearchParams(location.search).get('id'));
const host = document.querySelector('[data-article]');
try { const saved=JSON.parse(sessionStorage.getItem('news-return')||'null'); if(saved?.id===item?.id && saved.query?.startsWith('?')) document.querySelector('[data-back]').href='noticias.html'+saved.query; } catch {}
if (!item) {
  document.title='Noticia no disponible · Intranet Banasan';
  host.innerHTML='<div class="ui-feedback"><h1>Noticia no disponible</h1><p>El enlace no corresponde a una publicación disponible en esta propuesta.</p><a class="ui-action ui-action--secondary" href="noticias.html">Consultar noticias</a></div>';
} else {
  document.title=item.title+' · Intranet Banasan';
  const related=news.filter(entry=>entry.id!==item.id && entry.category===item.category);
  host.innerHTML=`<header class="article-heading"><p class="news-meta">${esc(item.category)} · ${dateLabel(item.date)}</p><h1>${esc(item.title)}</h1><p class="article-summary">${esc(item.summary)}</p><span class="article-example">Contenido de ejemplo</span></header><img class="article-cover" src="assets/art/${item.image}" alt="${esc(item.alt)}" /><div class="article-layout"><aside><p>Banasan</p><p>${dateLabel(item.date)}</p><a href="noticias.html?category=${encodeURIComponent(item.category)}">Más de ${esc(item.category)} ${arrow}</a></aside><div class="article-body">${item.sections.map(section=>`<section><h2>${esc(section.title)}</h2><p>${esc(section.text)}</p></section>`).join('')}</div></div>${related.length?`<section class="article-related"><h2>También en ${esc(item.category)}</h2><div class="ui-list">${related.map(entry=>`<a class="ui-list-row" href="${articleUrl(entry)}"><span class="ui-list-row__mark"><svg class="ui-icon" aria-hidden="true"><use href="assets/icons/tabler-sprite.svg#ti-file-text" /></svg></span><span class="ui-list-row__content"><strong>${esc(entry.title)}</strong><small>${esc(entry.summary)}</small></span><span class="ui-list-row__meta">${dateLabel(entry.date)}</span><span class="ui-list-row__action">${arrow}</span></a>`).join('')}</div></section>`:''}`;
  const cover=host.querySelector('.article-cover');
  cover.addEventListener('error',()=>{cover.hidden=true;const note=document.createElement('p');note.className='news-meta';note.textContent='La imagen no está disponible. Puedes continuar leyendo la noticia.';cover.after(note);});
}
