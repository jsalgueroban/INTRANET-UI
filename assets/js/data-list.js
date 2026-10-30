export function createDataList({ rows, search, filters, empty, count, detail, matches, onSelect }) {
  let activeFilter = 'all';
  function select(row) {
    rows.forEach(item => { const selected = item === row; item.classList.toggle('is-selected', selected); item.setAttribute('aria-pressed', String(selected)); });
    onSelect(row);
  }
  function update() {
    const query = search.value.trim().toLocaleLowerCase('es');
    rows.forEach(row => { row.hidden = !matches(row, query, activeFilter); });
    const visible = rows.filter(row => !row.hidden);
    count.textContent = String(visible.length);
    empty.hidden = visible.length !== 0;
    detail.hidden = visible.length === 0;
    if (visible.length && !visible.some(row => row.classList.contains('is-selected'))) select(visible[0]);
  }
  rows.forEach(row => row.addEventListener('click', () => select(row)));
  filters.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filters.forEach(item => { const selected = item === button; item.classList.toggle('is-active', selected); item.setAttribute('aria-pressed', String(selected)); });
    update();
  }));
  search.addEventListener('input', update);
  return { update, select };
}

export function updateDetailPanel(panel, fields) {
  for (const [name, value] of Object.entries(fields)) {
    const target = panel.querySelector(`[data-detail-${name}]`);
    if (!target) continue;
    target.textContent = value.text;
    if (value.href !== undefined) target.setAttribute('href', value.href);
  }
}
