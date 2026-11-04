const picker = document.querySelector('[data-company-picker]');
const status = document.querySelector('[data-company-status]');
picker.addEventListener('change', event => {
  if (event.target.name === 'company') status.textContent = `Empresa seleccionada: ${event.target.value}. La selección es de ejemplo y no cambia los accesos.`;
});
