import { editorialContentMarkup, bindEditorialMedia } from './ui-editorial-content.js';
import { resourceData } from './resource-binary-store.js';
import { readDrafts } from './editorial-store.js';
const host = document.querySelector('[data-preview-article]');
let item;
try { item = readDrafts().find(entry => entry.id === new URLSearchParams(location.search).get('id')); } catch {}
if (!item) host.innerHTML = '<div class="ui-feedback"><h1>Borrador no disponible</h1><a href="contenidos.html?view=drafts">Ver borradores</a></div>';
else {
  document.querySelector('[data-back]').href = 'editar-contenido.html?id=' + encodeURIComponent(item.id);
  host.innerHTML = editorialContentMarkup(item, { heading: 1, resolve: resourceData });
  bindEditorialMedia(host);
}
