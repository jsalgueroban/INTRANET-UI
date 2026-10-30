import { createDataList, updateDetailPanel } from './data-list.js';

const detail = document.querySelector('.ui-detail-panel');
createDataList({
  rows: [...document.querySelectorAll('.ui-data-list__row')],
  search: document.querySelector('#service-search'),
  filters: [],
  empty: document.querySelector('[data-empty]'),
  count: document.querySelector('[data-count]'),
  detail,
  matches: (row, query) => `${row.dataset.name} ${row.dataset.description}`.toLocaleLowerCase('es').includes(query),
  onSelect: row => updateDetailPanel(detail, { name: { text: row.dataset.name }, description: { text: row.dataset.description } })
});
