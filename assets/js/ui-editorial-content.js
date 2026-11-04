import { escapeHtml as esc } from './news-data.js';
import { resourceCollectionMarkup } from './ui-resource.js';
import { validResourceData } from './resource-binary-store.js';
export function editorialContentMarkup(content, { heading = 2, resolve } = {}) {
  const level = [1, 2, 3].includes(heading) ? heading : 2;
  const resources = content.resources || [];
  const resolver = resolve || (id => { const file = resources.find(item => item.id === id); return file && validResourceData(file.data, file.type) ? file.data : null; });
  const image = content.image && /^[a-zA-Z0-9_.-]+$/.test(content.image) ? `<img class="ui-editorial-content__cover" src="assets/art/${encodeURIComponent(content.image)}" alt="${esc(content.alt || '')}" loading="lazy" />` : '';
  return `<div class="ui-editorial-content">${content.category ? `<p class="ui-editorial-content__meta">${esc(content.category)}</p>` : ''}<h${level}>${esc(content.title || 'Borrador sin título')}</h${level}>${content.summary ? `<p class="ui-editorial-content__summary">${esc(content.summary)}</p>` : ''}${image}<div class="ui-editorial-content__body">${(content.sections || []).map(section => `<section>${section.title ? `<h${level + 1}>${esc(section.title)}</h${level + 1}>` : ''}<p>${esc(section.text)}</p></section>`).join('')}</div>${resources.length ? `<section class="ui-editorial-content__files"><h${level + 1}>Archivos adjuntos</h${level + 1}>${resourceCollectionMarkup(resources, resolver)}</section>` : ''}</div>`;
}
export function bindEditorialMedia(host) {
  host.querySelectorAll('.ui-editorial-content img, .ui-editorial-content video').forEach(media => {
    const failed = () => {
      if (media.hidden) return;
      media.hidden = true;
      const note = document.createElement('p'); note.className = 'ui-editorial-content__unavailable'; note.textContent = 'No se pudo mostrar este recurso. El resto del contenido sigue disponible.'; media.after(note);
    };
    media.addEventListener('error', failed);
    if (media.tagName === 'IMG' && media.complete && !media.naturalWidth) failed();
  });
}
