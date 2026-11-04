import { initSearchField, initFilterBar, updateFilterCounts } from './ui-controls.js?v=3';
import { readItems, resetItems, escapeHtml as esc, dateLabel, typeLabel, actionLabel, overlapping } from './pending-store.js';
const search = document.querySelector('#pending-search');
const type = document.querySelector('#type-filter');
const state = document.querySelector('#state-filter');
const date = document.querySelector('#date-filter');
const sort = document.querySelector('#sort-filter');
const list = document.querySelector('[data-items]');
const query = new URLSearchParams(location.search);
let view = query.get('view') === 'history' ? 'history' : 'pending';
let page = Math.max(1, Number(query.get('page')) || 1);
const pageSize = 4;
search.value = query.get('q') || '';
type.value = ['contenido', 'reserva'].includes(query.get('type')) ? query.get('type') : 'all';
date.value = query.get('date') || '';
sort.value = query.get('sort') === 'newest' ? 'newest' : 'oldest';
initSearchField(search.closest('.ui-search-field'));
function states(value = 'all') {
  const options = view === 'pending' ? [['contenido', 'Por revisar'], ['reserva', 'Por aprobar']] : [['contenido', 'Publicado'], ['contenido', 'Devuelto'], ['reserva', 'Aprobado'], ['reserva', 'Rechazado'], ['reserva', 'Cancelado']];
  state.innerHTML = '<option value="all">Todos los estados</option>' + options.filter(([family]) => type.value === 'all' || family === type.value).map(([, label]) => `<option>${label}</option>`).join('');
  state.value = [...state.options].some(option => option.value === value) ? value : 'all';
}
function render() {
  try {
    const items = readItems();
    const params = new URLSearchParams({ view, type: type.value, state: state.value, date: date.value, sort: sort.value, q: search.value, page: String(page) });
    history.replaceState(null, '', '?' + params);
    document.querySelectorAll('[data-filter]').forEach(button => { const active = button.dataset.filter === view; button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active)); });
    updateFilterCounts(document.querySelector('[data-views]'),{pending:items.filter(item=>!item.resolved).length,history:items.filter(item=>item.resolved).length});
    const filtered = items.filter(item => Boolean(item.resolved) === (view === 'history') && (type.value === 'all' || item.type === type.value) && (state.value === 'all' || item.status === state.value) && (!date.value || item.received >= date.value) && `${item.title} ${item.person} ${item.id}`.toLocaleLowerCase('es').includes(search.value.trim().toLocaleLowerCase('es'))).sort((a, b) => (sort.value === 'oldest' ? 1 : -1) * a.received.localeCompare(b.received));
    const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
    page = Math.min(page, pages);
    list.innerHTML = filtered.slice((page - 1) * pageSize, page * pageSize).map(item => {
      const conflict = !item.resolved && item.type === 'reserva' && overlapping(item, items).some(other => other.status === 'Aprobado');
      return `<a class="ui-list-row" data-task-link href="pendiente.html?id=${encodeURIComponent(item.id)}"><span class="ui-list-row__mark">${icon(item.type === 'contenido' ? 'file-text' : 'calendar')}</span><span class="ui-list-row__content"><strong>${esc(item.title)}</strong><small>${esc(actionLabel(item))} · ${esc(typeLabel(item))}${conflict ? ' · Horario en conflicto' : ''}</small><small>${esc(item.resolved ? 'Resuelto por ' + item.actor : item.person)}</small></span><span class="ui-list-row__meta">Recibido ${dateLabel(item.received)}${item.resolved ? '<br>Resuelto ' + dateLabel(item.resolvedAt) : ''}</span><span class="ui-list-row__action">${icon('arrow-up-right')}</span></a>`;
    }).join('');
    document.querySelector('[data-count]').textContent = `${filtered.length} ${filtered.length === 1 ? 'resultado' : 'resultados'}`;
    const empty = document.querySelector('[data-empty]');
    empty.hidden = filtered.length > 0;
    const filtering = search.value || type.value !== 'all' || state.value !== 'all' || date.value;
    document.querySelector('[data-empty-title]').textContent = filtering ? 'Sin coincidencias' : view === 'pending' ? 'No tienes pendientes por atender' : 'Todavía no hay resoluciones';
    document.querySelector('[data-empty-copy]').textContent = filtering ? 'Ajusta la búsqueda o limpia los filtros.' : 'Aquí aparecerá el trabajo dentro de tu alcance autorizado.';
    document.querySelector('[data-page]').textContent = `${page} de ${pages}`;
    document.querySelector('[data-prev]').disabled = page === 1;
    document.querySelector('[data-next]').disabled = page === pages;
    list.querySelectorAll('[data-task-link]').forEach(link => link.addEventListener('click', () => sessionStorage.setItem('pending-return', JSON.stringify({ query: location.search, y: scrollY, id: new URL(link.href).searchParams.get('id') }))));
  } catch {
    updateFilterCounts(document.querySelector('[data-views]'),null);
    list.innerHTML = '<div class="ui-feedback"><strong>No pudimos cargar los pendientes</strong><p>Vuelve a intentar la consulta.</p><button class="ui-action ui-action--secondary" data-retry>Reintentar</button></div>';
    list.querySelector('[data-retry]').addEventListener('click', render);
  }
}
function icon(name) { return `<svg class="ui-icon" aria-hidden="true"><use href="assets/icons/tabler-sprite.svg#ti-${name}" /></svg>`; }
states(query.get('state'));
initFilterBar(document.querySelector('[data-views]'), value => { view = value; page = 1; states(); render(); });
[search, type, state, date, sort].forEach(control => control.addEventListener(control === search ? 'input' : 'change', () => { page = 1; if (control === type) states(); render(); }));
document.querySelector('[data-reset]').addEventListener('click', () => { search.value = ''; type.value = 'all'; date.value = ''; states(); search.dispatchEvent(new Event('input')); search.focus(); });
document.querySelector('[data-prev]').addEventListener('click', () => { page--; render(); });
document.querySelector('[data-next]').addEventListener('click', () => { page++; render(); });
document.querySelector('[data-restart]').addEventListener('click', () => { resetItems(); render(); });
render();
try {
  const saved = JSON.parse(sessionStorage.getItem('pending-return') || 'null');
  if (saved && saved.query === location.search) requestAnimationFrame(() => { document.querySelector(`[href="pendiente.html?id=${CSS.escape(saved.id)}"]`)?.focus({ preventScroll: true }); scrollTo({ top: saved.y, behavior: 'instant' }); });
} catch {}
window.addEventListener('pageshow', event => { if (event.persisted) render(); });
