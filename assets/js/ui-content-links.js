import { escapeHtml as esc, arrow } from './news-data.js';
export function contentLinks(items) {
  return '<div class="ui-list">'+items.map(item=>`<a class="ui-list-row ui-list-row--text" href="${esc(item.href)}"><span class="ui-list-row__content"><strong>${esc(item.title)}</strong><small>${esc(item.summary)}</small></span><span class="ui-list-row__meta">${esc(item.meta)}</span><span class="ui-list-row__action">${arrow}</span></a>`).join('')+'</div>';
}
export function feedback(title, description, action='') {
  return `<div class="ui-feedback"><span class="ui-feedback__symbol" aria-hidden="true"><svg class="ui-icon"><use href="assets/icons/tabler-sprite.svg#ti-search" /></svg></span><div class="ui-feedback__body"><strong>${esc(title)}</strong><p>${esc(description)}</p>${action?`<button class="ui-feedback__action" type="button" data-retry>${esc(action)}</button>`:''}</div></div>`;
}
