import { readAccess, writeAccess, createId, initials } from './access-model.js';
import { initSearchField } from './ui-controls.js?v=3';

const state = readAccess();
const list = document.querySelector('[data-role-list]');
const detail = document.querySelector('.roles-detail');
const search = document.querySelector('[data-search]');
initSearchField(search.closest('.ui-search-field'));
const dialog = document.querySelector('[data-preview-dialog]');
const form = dialog.querySelector('form');
const statusDialog = document.querySelector('[data-role-status-dialog]');
let selectedId = state.roles[0]?.id;
let editingId = null;
const text = (selector, value) => { document.querySelector(selector).textContent = value; };
function renderDetail() {
  const role = state.roles.find(item => item.id === selectedId);
  detail.hidden = !role;
  if (!role) return;
  text('[data-role-initials]', initials(role.name));
  text('[data-role-name]', role.name);
  text('[data-role-summary]', role.summary);
  text('[data-role-scope]', `${role.company} · ${role.section} · ${role.resource}`);
  text('[data-role-state]', role.active ? 'Activo' : 'Inactivo');
  text('[data-role-users]', state.users.filter(user => user.roles.includes(role.id)).length);
  text('[data-permission-count]', `${role.permissions.length} ${role.permissions.length === 1 ? 'acción' : 'acciones'}`);
  const entries = role.permissions.map(action => {
    const item = document.createElement('li');
    const description = document.createElement('span');
    const strong = document.createElement('strong'); strong.textContent = action;
    const small = document.createElement('small'); small.textContent = role.resource;
    description.append(strong, small);
    const badge = document.createElement('em'); badge.textContent = role.section;
    item.append(description, badge); return item;
  });
  document.querySelector('[data-permission-list]').replaceChildren(...entries);
  text('[data-toggle-role]', role.active ? 'Inactivar rol' : 'Activar rol');
}
function rowFor(role) {
  const button = document.createElement('button'); button.type = 'button';
  button.className = `role-row ui-data-list__row${role.id === selectedId ? ' is-selected' : ''}`;
  button.setAttribute('aria-pressed', String(role.id === selectedId));
  const mark = document.createElement('span'); mark.className = 'role-symbol'; mark.textContent = initials(role.name);
  const identity = document.createElement('span'); identity.className = 'role-identity';
  const title = document.createElement('strong'); title.textContent = role.name;
  const summary = document.createElement('small'); summary.textContent = role.active ? role.summary : 'Inactivo · ' + role.summary;
  identity.append(title, summary);
  const count = document.createElement('span'); count.className = 'role-count'; count.textContent = `${role.permissions.length} ${role.permissions.length === 1 ? 'permiso' : 'permisos'}`;
  const arrow = document.createElement('span'); arrow.setAttribute('aria-hidden', 'true'); arrow.textContent = '›';
  button.append(mark, identity, count, arrow);
  button.addEventListener('click', () => { selectedId = role.id; render(); });
  return button;
}
function render() {
  const query = search.value.trim().toLocaleLowerCase('es');
  const shown = state.roles.filter(role => `${role.name} ${role.summary}`.toLocaleLowerCase('es').includes(query));
  list.replaceChildren(...shown.map(rowFor));
  text('[data-result-count]', shown.length);
  document.querySelector('[data-empty]').hidden = shown.length > 0;
  renderDetail();
}
function openForm(role) {
  editingId = role?.id || null;
  form.reset();
  text('[data-role-dialog-title]', role ? 'Editar rol y permisos' : 'Crear rol');
  text('[data-role-error]', '');
  for (const field of ['name', 'summary', 'company', 'section', 'resource']) form.elements[field].value = role?.[field] || (field === 'company' ? 'C.I. Banasan S.A.S.' : '');
  for (const field of form.querySelectorAll('[data-preview-permission]')) field.checked = role?.permissions.includes(field.value) || false;
  dialog.showModal(); form.elements.name.focus();
}
document.querySelector('[data-new-role]').addEventListener('click', () => openForm(null));
document.querySelector('[data-open-preview]').addEventListener('click', () => openForm(state.roles.find(item => item.id === selectedId)));
dialog.querySelectorAll('[data-close-preview]').forEach(button => button.addEventListener('click', () => dialog.close()));
form.addEventListener('submit', event => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(form).entries());
  const name = values.name.trim();
  if (state.roles.some(role => role.name.toLocaleLowerCase('es') === name.toLocaleLowerCase('es') && role.id !== editingId)) { text('[data-role-error]', 'Ya existe un rol con este nombre.'); return; }
  const permissions = [...form.querySelectorAll('[data-preview-permission]:checked')].map(field => field.value);
  if (!permissions.length) { text('[data-role-error]', 'Selecciona al menos un permiso.'); return; }
  const role = { id: editingId || createId(), name, summary: values.summary.trim(), company: values.company.trim(), section: values.section.trim(), resource: values.resource.trim(), permissions, active: editingId ? state.roles.find(item => item.id === editingId).active : true };
  if (editingId) Object.assign(state.roles.find(item => item.id === editingId), role); else state.roles.unshift(role);
  selectedId = role.id; search.value = ''; writeAccess(state); render(); dialog.close();
  text('[data-preview-status]', editingId ? 'Rol y permisos actualizados.' : 'Rol creado.');
  document.querySelector('[data-open-preview]').focus();
});
document.querySelector('[data-toggle-role]').addEventListener('click', () => {
  const role = state.roles.find(item => item.id === selectedId);
  const assigned = state.users.filter(user => user.roles.includes(role.id)).length;
  text('[data-role-status-title]', role.active ? 'Inactivar rol' : 'Activar rol');
  text('[data-role-status-description]', role.active ? `¿Inactivar ${role.name}? Dejará de estar disponible para ${assigned} ${assigned === 1 ? 'usuario asignado' : 'usuarios asignados'}.` : `¿Activar ${role.name}? Volverá a estar disponible para sus usuarios asignados.`);
  text('[data-confirm-role-status]', role.active ? 'Inactivar' : 'Activar');
  statusDialog.showModal();
});
statusDialog.querySelectorAll('[data-close-role-status]').forEach(button => button.addEventListener('click', () => statusDialog.close()));
document.querySelector('[data-confirm-role-status]').addEventListener('click', () => {
  const role = state.roles.find(item => item.id === selectedId);
  role.active = !role.active; writeAccess(state); statusDialog.close(); render();
  text('[data-preview-status]', role.active ? 'Rol activado.' : 'Rol inactivado.');
  document.querySelector('[data-toggle-role]').focus();
});
search.addEventListener('input', render);
document.addEventListener('keydown', event => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); search.focus(); } });
render();
