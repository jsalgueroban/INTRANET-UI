import { initSearchField, updateFilterCounts } from './ui-controls.js?v=3';
import { createDataList, updateDetailPanel } from './data-list.js';

const search = document.querySelector('[data-search]');
initSearchField(search.closest('.ui-search-field'));
const detail = document.querySelector('.user-detail');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
createDataList({
  rows: [...document.querySelectorAll('.user-row')], search,
  filters: [...document.querySelectorAll('[data-filter]')],
  empty: document.querySelector('[data-empty]'), count: document.querySelector('[data-result-count]'), detail,
  matches: (row, query, filter) => (filter === 'all' || row.dataset.status === filter) && `${row.dataset.name} ${row.dataset.email}`.toLocaleLowerCase('es').includes(query),
  onSelect: row => {
    updateDetailPanel(detail, {
      initials: { text: row.dataset.initials }, name: { text: row.dataset.name },
      email: { text: row.dataset.email, href: `mailto:${row.dataset.email}` },
      status: { text: row.dataset.status === 'active' ? 'Activo' : 'Pendiente' }
    });
    if (!reduceMotion.matches) detail.querySelectorAll('.detail-identity,.detail-boundary,.detail-list').forEach((node, index) => node.animate(
      [{ opacity: .72, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 180 + index * 25, easing: 'cubic-bezier(.23,1,.32,1)' }
    ));
  }
});
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); search.focus(); }
});

function refreshCounts(){
 const query=search.value.trim().toLocaleLowerCase('es');
 const rows=[...document.querySelectorAll('.user-row')].filter(row=>`${row.dataset.name} ${row.dataset.email}`.toLocaleLowerCase('es').includes(query));
 updateFilterCounts(document.querySelector('.ui-filter-bar'),{all:rows.length,active:rows.filter(row=>row.dataset.status==='active').length,pending:rows.filter(row=>row.dataset.status==='pending').length});
}
search.addEventListener('input',refreshCounts);refreshCounts();
