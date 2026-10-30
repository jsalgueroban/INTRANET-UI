export function initSearchField(field) {
  const input = field.querySelector('input');
  const clear = field.querySelector('[data-search-clear]');
  if (!input || !clear) return;
  const sync = () => { field.dataset.filled = String(Boolean(input.value)); };
  input.addEventListener('input', sync);
  clear.addEventListener('click', () => {
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
  });
  sync();
}

export function initFilterBar(group, onChange = () => {}) {
  const items = [...group.querySelectorAll('[data-filter]')];
  const select = item => {
    items.forEach(button => {
      const selected = button === item;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    onChange(item.dataset.filter);
  };
  items.forEach(item => item.addEventListener('click', () => select(item)));
  group.addEventListener('keydown', event => {
    const item = event.target.closest('[data-filter]');
    if (!item || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const index = items.indexOf(item);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
    event.preventDefault();
    items[next].focus();
    items[next].click();
  });
}
