import { escapeHtml as esc } from './news-data.js';
export function fileSize(size) { return size < 1024 * 1024 ? Math.max(1, Math.round(size / 1024)) + ' KB' : (size / 1024 / 1024).toFixed(1) + ' MB'; }
export function resourceMarkup(item, { href = '', editable = false, selected = false } = {}) {
  const label = item.type.startsWith('image/') ? 'Imagen' : item.type.startsWith('video/') ? 'Vídeo' : item.type === 'application/pdf' ? 'PDF' : 'Texto';
  const identity = `<span class="ui-resource__symbol" aria-hidden="true"><svg class="ui-icon"><use href="assets/icons/tabler-sprite.svg#ti-file-text" /></svg></span><span class="ui-resource__text"><strong>${esc(item.name)}</strong><small>${label} · ${fileSize(item.size)}</small>${item.description ? `<span>${esc(item.description)}</span>` : ''}</span>`;
  return `<div class="ui-resource">${editable ? `<button class="ui-resource__select" type="button" data-resource="${esc(item.id)}" aria-pressed="${selected}">${identity}<span aria-hidden="true">${selected ? 'Seleccionado' : 'Editar'}</span></button>` : `<div class="ui-resource__identity">${identity}</div>${href ? `<a class="ui-action ui-action--quiet" href="${esc(href)}" download="${esc(item.originalName)}" aria-label="Descargar ${esc(item.name)}">Descargar <svg class="ui-icon" aria-hidden="true"><use href="assets/icons/tabler-sprite.svg#ti-arrow-up-right" /></svg></a>` : '<span class="ui-resource__unavailable">Archivo no disponible</span>'}`}</div>`;
}

export function resourceCollectionMarkup(items, resolve) {
  return items.map(item => {
    let data; try { data = resolve(item.id); } catch {}
    const media = data && item.type.startsWith('image/') ? `<img class="ui-resource-preview" src="${esc(data)}" alt="${esc(item.description || item.name)}" loading="lazy" />` : data && item.type.startsWith('video/') ? `<video class="ui-resource-preview" controls preload="metadata" aria-label="${esc(item.name)}" src="${esc(data)}"></video>` : '';
    return `<div class="ui-resource-group">${media}${resourceMarkup(item, { href: data || '' })}</div>`;
  }).join('');
}
