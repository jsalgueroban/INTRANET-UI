import { editorialContentMarkup, bindEditorialMedia } from './ui-editorial-content.js';
import { reviewSnapshot, snapshotChanges } from './editorial-snapshot.js';
import { escapeHtml as esc } from './news-data.js';
import { initFilterBar } from './ui-controls.js';
export function mountEditorialReview(host, item) {
  const before = reviewSnapshot(item, 'before'), after = reviewSnapshot(item, 'after');
  const changes = snapshotChanges(before, after);
  host.innerHTML = `<section class="ui-review-changes"><h3>Cambios de la revisión</h3>${changes.length ? `<ul>${changes.map(change => `<li>${esc(change)}</li>`).join('')}</ul>` : '<p>No hay diferencias de contenido en esta revisión.</p>'}<p>Se comparan el contenido y las referencias de archivos; no el interior de los documentos.</p></section><div class="ui-filter-bar" role="group" aria-label="Modo de revisión"><button class="ui-filter-bar__item is-active" data-filter="compare" aria-pressed="true">Comparar</button><button class="ui-filter-bar__item" data-filter="after" aria-pressed="false">Versión enviada</button><button class="ui-filter-bar__item" data-filter="before" aria-pressed="false">Versión anterior</button></div><div data-review-content></div>`;
  const body = host.querySelector('[data-review-content]');
  function render(mode) {
    body.className = mode === 'compare' ? 'ui-review-columns' : 'ui-review-single';
    body.innerHTML = mode === 'compare' ? `<section><h3 class="ui-review-version">${item.resolved ? 'Versión anterior' : 'Publicación vigente'}</h3>${editorialContentMarkup(before, { heading: 3 })}</section><section><h3 class="ui-review-version">Versión enviada</h3>${editorialContentMarkup(after, { heading: 3 })}</section>` : editorialContentMarkup(mode === 'before' ? before : after);
    bindEditorialMedia(body);
  }
  initFilterBar(host.querySelector('.ui-filter-bar'), render);
  render('compare');
}
