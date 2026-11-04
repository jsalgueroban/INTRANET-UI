import { readDrafts } from './editorial-store.js';
import { addResource, updateResources, removeResource, resourceData, supportedTypes } from './content-resources.js';
import { resourceMarkup } from './ui-resource.js';
import { escapeHtml as esc } from './news-data.js';
const id = new URLSearchParams(location.search).get('id');
const host = document.querySelector('[data-resources]');
let draft;
try { draft = readDrafts().find(item => item.id === id); } catch {}
if (!draft) {
  host.innerHTML = '<div class="ui-feedback"><h2>Borrador no disponible</h2><p>Abre los archivos desde un borrador existente.</p><a href="contenidos.html?view=drafts">Ver borradores</a></div>';
  document.querySelector('[data-preview]').hidden = true;
} else {
  document.querySelector('[data-title]').textContent = draft.title || 'Borrador sin título';
  document.querySelector('[data-back]').href = 'editar-contenido.html?id=' + encodeURIComponent(id);
  document.querySelector('[data-preview]').href = 'vista-previa.html?id=' + encodeURIComponent(id);
  const list = host.querySelector('[data-list]'), inspector = host.querySelector('[data-inspector]');
  const error = host.querySelector('[data-error]'), status = host.querySelector('[data-status]');
  const input = host.querySelector('[data-file]'), progress = host.querySelector('[data-progress]'), retry = host.querySelector('[data-retry]');
  let selected = draft.resources?.[0]?.id, reader, lastFile, dirty = false;
  function fail(message) { error.textContent = message; }
  function renderList() {
    list.innerHTML = draft.resources?.length ? draft.resources.map(item => resourceMarkup(item, { editable: true, selected: item.id === selected })).join('') : '<div class="ui-feedback"><h3>Aún no hay adjuntos</h3><p>Agrega los archivos que acompañan esta publicación.</p></div>';
  }
  function saveDetails() {
    const form = inspector.querySelector('form');
    if (!form || !dirty) return true;
    try {
      draft = updateResources(id, items => items.map(item => item.id === selected ? { ...item, name: form.elements.name.value.trim() || item.originalName, description: form.elements.description.value } : item));
      dirty = false; renderList(); error.textContent = ''; status.textContent = 'Datos del archivo guardados.'; return true;
    } catch { fail('No pudimos guardar los datos del archivo. Tus cambios siguen aquí; vuelve a intentarlo.'); return false; }
  }
  function renderInspector() {
    const item = draft.resources?.find(entry => entry.id === selected);
    if (!item) { inspector.innerHTML = '<h2>Selecciona un archivo</h2><p>Su información aparecerá aquí.</p>'; return; }
    const index = draft.resources.indexOf(item);
    inspector.innerHTML = `<h2>Datos del archivo</h2><form><label class="ui-field">Nombre visible<input name="name" value="${esc(item.name)}" /></label><label class="ui-field">Descripción<textarea name="description" rows="3">${esc(item.description)}</textarea></label><p class="editorial-note">Original: ${esc(item.originalName)}</p><button type="submit" class="ui-action ui-action--secondary">Guardar datos</button></form><div class="resource-order"><h3>Posición ${index + 1} de ${draft.resources.length}</h3><div><button class="ui-action ui-action--quiet" data-move="-1" ${index === 0 ? 'disabled' : ''}>Subir</button><button class="ui-action ui-action--quiet" data-move="1" ${index === draft.resources.length - 1 ? 'disabled' : ''}>Bajar</button></div></div><button class="ui-action ui-action--quiet" data-remove>Quitar del borrador</button>`;
    inspector.querySelector('form').addEventListener('input', () => { dirty = true; status.textContent = 'Datos del archivo sin guardar.'; });
    inspector.querySelector('form').addEventListener('submit', event => { event.preventDefault(); saveDetails(); });
    inspector.querySelectorAll('[data-move]').forEach(button => button.addEventListener('click', () => {
      if (!saveDetails()) return;
      const direction = Number(button.dataset.move);
      try { draft = updateResources(id, items => { const next = [...items], current = next.findIndex(entry => entry.id === selected); [next[current], next[current + direction]] = [next[current + direction], next[current]]; return next; }); renderList(); renderInspector(); status.textContent = 'Orden actualizado.'; (inspector.querySelector('[data-move="' + direction + '"]:not(:disabled)') || inspector.querySelector('input')).focus(); }
      catch { fail('No pudimos cambiar el orden. Inténtalo de nuevo.'); }
    }));
    inspector.querySelector('[data-remove]').addEventListener('click', () => {
      try { draft = removeResource(id, selected); dirty = false; selected = draft.resources?.[Math.max(0, index - 1)]?.id; renderList(); renderInspector(); status.textContent = 'Archivo retirado del borrador.'; (list.querySelector('button') || input).focus(); }
      catch { fail('No pudimos quitar el archivo. Inténtalo de nuevo.'); }
    });
  }
  list.addEventListener('click', event => { const button = event.target.closest('[data-resource]'); if (!button || !saveDetails()) return; selected = button.dataset.resource; renderList(); renderInspector(); inspector.querySelector('input')?.focus(); });
  function readFile(file) {
    if (!file || reader?.readyState === FileReader.LOADING || !saveDetails()) return;
    error.textContent = ''; retry.hidden = true; status.textContent = '';
    if (!supportedTypes.includes(file.type)) { fail('Este formato no está habilitado en la prueba. Selecciona una imagen PNG, JPG o WebP, un PDF, TXT, MP4 o WebM.'); return; }
    lastFile = file; reader = new FileReader(); progress.hidden = false; input.disabled = true;
    const bar = progress.querySelector('progress'), percent = progress.querySelector('[data-percentage]');
    bar.value = 0; percent.textContent = '0 %'; host.querySelector('[data-progress-label]').textContent = 'Leyendo ' + file.name;
    reader.onprogress = event => { if (event.lengthComputable) { bar.value = Math.round(event.loaded / event.total * 100); percent.textContent = bar.value + ' %'; } };
    reader.onload = () => {
      try { draft = addResource(id, file, reader.result); selected = draft.resources.at(-1).id; renderList(); renderInspector(); status.textContent = 'Archivo adjuntado al borrador.'; lastFile = null; }
      catch { fail('No se pudo guardar este archivo en la pestaña. Prueba con uno más pequeño o quita otro adjunto. El borrador se conserva.'); retry.hidden = false; }
    };
    reader.onerror = () => { fail('No pudimos leer el archivo. Selecciónalo de nuevo o reintenta.'); retry.hidden = false; };
    reader.onabort = () => { status.textContent = 'Lectura cancelada. El archivo no se adjuntó.'; };
    reader.onloadend = () => { progress.hidden = true; input.disabled = false; input.value = ''; };
    reader.readAsDataURL(file);
  }
  input.addEventListener('change', () => readFile(input.files[0]));
  retry.addEventListener('click', () => readFile(lastFile));
  host.querySelector('[data-cancel]').addEventListener('click', () => reader?.abort());
  for (const link of document.querySelectorAll('[data-back], [data-preview]')) link.addEventListener('click', event => { if (reader?.readyState === FileReader.LOADING || !saveDetails()) { event.preventDefault(); if (reader?.readyState === FileReader.LOADING) fail('Espera a que termine la lectura o cancélala antes de continuar.'); } });
  window.addEventListener('beforeunload', event => { if (dirty || reader?.readyState === FileReader.LOADING) { event.preventDefault(); event.returnValue = ''; } });
  renderList(); renderInspector();
}
