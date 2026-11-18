import { readAccess, writeAccess, createId, initials, statusLabel } from './access-model.js';
import { initSearchField, updateFilterCounts } from './ui-controls.js?v=3';

const state = readAccess();
const search = document.querySelector('[data-search]');
initSearchField(search.closest('.ui-search-field'));
const list = document.querySelector('[data-user-list]');
const detail = document.querySelector('.user-detail');
const formDialog = document.querySelector('[data-user-dialog]');
const form = document.querySelector('[data-user-form]');
const statusDialog = document.querySelector('[data-status-dialog]');
const domainStatus = { enabled: 'Habilitada', locked: 'Bloqueada', disabled: 'Deshabilitada', unknown: 'Sin verificar' };
let selectedId = state.users[0]?.id;
let editingId = null;
let filter = 'all';

const text = (selector, value) => { document.querySelector(selector).textContent = value; };
function renderDetail() {
  const user = state.users.find(item => item.id === selectedId);
  detail.hidden = !user;
  if (!user) return;
  text('[data-detail-initials]', initials(user.name));
  text('[data-detail-name]', user.name);
  const email = document.querySelector('[data-detail-email]');
  email.textContent = user.email; email.href = `mailto:${user.email}`;
  text('[data-detail-status]', statusLabel[user.status]);
  const adStatus = user.origin === 'ad' ? (user.domainStatus || 'unknown') : null;
  const domainNode = document.querySelector('[data-detail-domain-status]');
  domainNode.textContent = adStatus ? domainStatus[adStatus] || domainStatus.unknown : 'No aplica';
  domainNode.dataset.state = adStatus || 'local';
  text('[data-domain-status-note]', adStatus === 'locked' ? 'La cuenta está bloqueada en el dominio. Activarla en Intranet no elimina ese bloqueo.' : adStatus === 'disabled' ? 'La cuenta está deshabilitada en el dominio. Activarla en Intranet no la habilita en AD.' : adStatus === 'unknown' ? 'El estado del dominio aún no se ha consultado.' : '');
  text('[data-detail-origin]', user.origin === 'ad' ? 'Directorio activo' : 'Cuenta local');
  text('[data-detail-username]', user.origin === 'ad' ? user.username : 'Correo electrónico');
  text('[data-detail-company]', user.company);
  text('[data-detail-area]', user.area);
  text('[data-detail-roles]', user.roles.map(id => { const role = state.roles.find(item => item.id === id); return role ? `${role.name}${role.active ? '' : ' (inactivo)'}` : null; }).filter(Boolean).join(', ') || 'Sin roles asignados');
  text('[data-toggle-user]', user.status === 'active' ? 'Inactivar usuario' : 'Activar usuario');
}
function rowFor(user) {
  const button = document.createElement('button'); button.type = 'button';
  button.className = `user-row ui-data-list__row${user.id === selectedId ? ' is-selected' : ''}`;
  button.setAttribute('aria-pressed', String(user.id === selectedId));
  const mark = document.createElement('span'); mark.className = 'identity-mark'; mark.textContent = initials(user.name); mark.append(document.createElement('i'));
  const identity = document.createElement('span'); identity.className = 'user-identity';
  const name = document.createElement('strong'); name.textContent = user.name;
  const email = document.createElement('small'); email.textContent = user.email; identity.append(name, email);
  if (user.origin === 'ad' && ['locked', 'disabled'].includes(user.domainStatus)) { const alert = document.createElement('small'); alert.className = 'user-domain-alert'; alert.textContent = user.domainStatus === 'locked' ? 'Bloqueada en AD' : 'Deshabilitada en AD'; identity.append(alert); }
  const status = document.createElement('span'); status.className = `ui-state-mark ui-state-mark--${user.status === 'active' ? 'positive' : 'pending'}`; status.textContent = statusLabel[user.status];
  const arrow = document.createElement('span'); arrow.setAttribute('aria-hidden', 'true'); arrow.textContent = '›';
  button.append(mark, identity, status, arrow);
  button.addEventListener('click', () => { selectedId = user.id; render(); });
  return button;
}
function render() {
  const query = search.value.trim().toLocaleLowerCase('es');
  const shown = state.users.filter(user => (filter === 'all' || user.status === filter) && `${user.name} ${user.email} ${user.username}`.toLocaleLowerCase('es').includes(query));
  list.replaceChildren(...shown.map(rowFor));
  document.querySelector('[data-empty]').hidden = shown.length > 0;
  text('[data-result-count]', shown.length);
  const counts = {};
  for (const button of document.querySelectorAll('[data-filter]')) {
    const value = button.dataset.filter;
    const count = value === 'all' ? state.users.length : state.users.filter(user => user.status === value).length;
    counts[value] = count;
    button.classList.toggle('is-active', value === filter);
    button.setAttribute('aria-pressed', String(value === filter));
  }
  updateFilterCounts(document.querySelector('.ui-filter-bar'), counts);
  renderDetail();
}
function roleChoices(ids = []) {
  const fieldset = document.querySelector('[data-user-roles]');
  fieldset.replaceChildren(fieldset.querySelector('legend'));
  for (const role of state.roles.filter(item => item.active || ids.includes(item.id))) {
    const label = document.createElement('label');
    const input = document.createElement('input'); input.type = 'checkbox'; input.name = 'roles'; input.value = role.id; input.checked = ids.includes(role.id);
    const span = document.createElement('span'); span.textContent = role.name + (role.active ? '' : ' (inactivo)');
    label.append(input, span); fieldset.append(label);
  }
}
function openForm(user) {
  editingId = user?.id || null;
  form.reset();
  text('[data-user-dialog-title]', user ? 'Editar perfil y roles' : 'Agregar usuario');
  text('[data-user-error]', '');
  if (user) for (const field of ['name', 'email', 'origin', 'username', 'company', 'area']) form.elements[field].value = user[field];
  roleChoices(user?.roles || []);
  formDialog.showModal(); form.elements.name.focus();
}
document.querySelector('[data-new-user]').addEventListener('click', () => openForm(null));
document.querySelector('[data-edit-user]').addEventListener('click', () => openForm(state.users.find(item => item.id === selectedId)));
document.querySelectorAll('[data-close-user]').forEach(button => button.addEventListener('click', () => formDialog.close()));
form.addEventListener('submit', event => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(form).entries());
  const email = values.email.trim().toLocaleLowerCase('es');
  if (state.users.some(user => user.email.toLocaleLowerCase('es') === email && user.id !== editingId)) { text('[data-user-error]', 'Ya existe un usuario con este correo.'); return; }
  if (values.origin === 'ad' && !values.username.trim()) { text('[data-user-error]', 'Indica el usuario de dominio.'); form.elements.username.focus(); return; }
  const roles = [...form.querySelectorAll('input[name=roles]:checked')].map(input => input.value);
  const previous = editingId ? state.users.find(item => item.id === editingId) : null;
  const user = { id: editingId || createId(), name: values.name.trim(), email, origin: values.origin, username: values.origin === 'ad' ? values.username.trim() : '', company: values.company.trim(), area: values.area.trim(), roles, status: previous?.status || 'pending', domainStatus: values.origin === 'ad' && previous?.origin === 'ad' && previous.username === values.username.trim() ? previous.domainStatus || 'unknown' : 'unknown' };
  if (editingId) Object.assign(state.users.find(item => item.id === editingId), user); else state.users.unshift(user);
  selectedId = user.id; filter = 'all'; search.value = ''; writeAccess(state); render(); formDialog.close();
  text('[data-user-feedback]', editingId ? 'Perfil y roles actualizados.' : 'Usuario agregado.');
  document.querySelector('[data-edit-user]').focus();
});
document.querySelector('[data-toggle-user]').addEventListener('click', () => {
  const user = state.users.find(item => item.id === selectedId);
  const activate = user.status !== 'active';
  text('[data-status-title]', activate ? 'Activar usuario' : 'Inactivar usuario');
  text('[data-status-description]', activate ? `¿Activar la cuenta de ${user.name} en Intranet? Sus roles asignados volverán a estar disponibles en la plataforma. Esta acción no cambia su estado en el dominio.` : `¿Inactivar el acceso de ${user.name} en Intranet? La cuenta conservará su perfil y sus roles para una futura reactivación.`);
  text('[data-confirm-status]', activate ? 'Activar' : 'Inactivar');
  statusDialog.showModal();
});
document.querySelectorAll('[data-close-status]').forEach(button => button.addEventListener('click', () => statusDialog.close()));
document.querySelector('[data-confirm-status]').addEventListener('click', () => {
  const user = state.users.find(item => item.id === selectedId);
  user.status = user.status === 'active' ? 'inactive' : 'active';
  writeAccess(state); statusDialog.close(); render();
  text('[data-user-feedback]', user.status === 'active' ? 'Cuenta activada en Intranet.' : 'Cuenta inactivada en Intranet.');
  document.querySelector('[data-toggle-user]').focus();
});
search.addEventListener('input', render);
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; render(); }));
document.addEventListener('keydown', event => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); search.focus(); } });
render();
