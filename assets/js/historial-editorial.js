import { editorialContentMarkup, bindEditorialMedia } from './ui-editorial-content.js';
import { reviewSnapshot, snapshotReady } from './editorial-snapshot.js';
import { initFilterBar } from './ui-controls.js';
import { readItems, editorialEvents, editorialRounds, revisionToken, escapeHtml as esc, dateLabel } from './pending-store.js';
import { recoverRevision, resumeCorrection } from './editorial-store.js';
const host = document.querySelector('[data-history]');
try { const query = sessionStorage.getItem('editorial-return'); if(query?.startsWith('?')) document.querySelector('.news-heading a').href='contenidos.html'+query; } catch {}
const id = new URLSearchParams(location.search).get('id');
let version = new URLSearchParams(location.search).get('version') === 'before' ? 'before' : 'after', selectedRound = Number(new URLSearchParams(location.search).get('round')) || null, busy = false;
function render() {
  try {
    const item = readItems().find(entry => entry.id === id && entry.type === 'contenido');
    if (!item) { host.innerHTML = '<div class="ui-feedback"><h2>Historial no disponible</h2><p>No hay una revisión consultable con este enlace.</p><a href="contenidos.html?view=reviews">Volver a revisiones</a></div>'; return; }
    const rounds = editorialRounds(item);
    const snapshot = rounds.find(round => round.round === selectedRound) || rounds.at(-1);
    selectedRound = snapshot.round;
    history.replaceState(null, '', '?' + new URLSearchParams({ id, round: selectedRound, version }));
    host.innerHTML = `<header class="history-heading"><div><p>${esc(item.section)} · ${esc(item.id)}</p><h2>${esc(item.title)}</h2></div><span>${esc(item.status)}</span></header><div class="history-layout"><section class="history-events"><h2>Actividad</h2><ol>${editorialEvents(item).map(event=>`<li><time>${dateLabel(event.at)}</time><span class="history-round-label">Ronda ${event.round}</span><h3>${esc(event.label)}</h3><p>${esc(event.actor)}</p>${event.reason?`<p>${esc(event.reason)}</p>`:''}</li>`).join('')}</ol></section><section class="history-version"><label class="ui-select-field history-round-picker">Ronda de revisión<select data-round>${rounds.map(round=>`<option value="${round.round}" ${round.round===selectedRound?'selected':''}>Ronda ${round.round} · ${esc(round.status)}</option>`).join('')}</select></label><div class="ui-filter-bar" role="group" aria-label="Versión consultada"><button class="ui-filter-bar__item ${version==='before'?'is-active':''}" aria-pressed="${version==='before'}" data-filter="before" data-version="before">Versión anterior</button><button class="ui-filter-bar__item ${version==='after'?'is-active':''}" aria-pressed="${version==='after'}" data-filter="after" data-version="after">Versión enviada</button></div><div class="history-content" tabindex="-1"><p class="editorial-note">${version==='before'?'Contenido anterior a esta revisión.':'Contenido recibido para revisión.'}</p>${editorialContentMarkup(reviewSnapshot(snapshot,version))}</div><div class="history-recover"><p>Recuperar crea un borrador independiente. La publicación y este historial se conservan.</p>${!snapshotReady(reviewSnapshot(snapshot,version))?'<p class="editorial-error">Hay archivos no disponibles. Esta versión no se puede recuperar completa.</p>':''}<button class="ui-action ui-action--secondary" data-recover ${!snapshotReady(reviewSnapshot(snapshot,version))?'disabled':''}>Recuperar como borrador</button></div><p role="alert" class="editorial-error" data-error></p></section></div>${item.status==='Devuelto'?`<section class="history-correction"><div><h2>Corrección pendiente</h2><p>${esc(item.reason)}</p><p class="editorial-note">Devuelto por ${esc(item.actor)} · Ronda ${item.round||1}</p></div><button class="ui-action ui-action--primary" data-correct>Retomar corrección</button></section>`:''}<div class="history-footer"><a class="ui-action ui-action--quiet" href="pendiente.html?id=${encodeURIComponent(item.id)}">${item.resolved?'Consultar decisión':'Revisar publicación'} ↗</a></div>`;
    bindEditorialMedia(host);
    host.querySelector('[data-round]').addEventListener('change',event=>{selectedRound=Number(event.target.value);version='after';render();host.querySelector('[data-round]').focus();});
    host.querySelector('[data-correct]')?.addEventListener('click',event=>openDraft(event.currentTarget,()=>resumeCorrection(item.id,revisionToken(item))));
    initFilterBar(host.querySelector('.ui-filter-bar'),value=>{version=value;render();host.querySelector(`[data-version="${version}"]`).focus();});
    function openDraft(button, create) {
      if (busy) return;
      busy = true; const label = button.textContent; button.disabled = true; button.textContent = 'Preparando borrador…';
      try { const draft = create(); location.href = 'editar-contenido.html?id=' + encodeURIComponent(draft.id); }
      catch { busy = false; button.disabled = false; button.textContent = label; host.querySelector('[data-error]').textContent = 'No pudimos abrir el borrador. Reintenta; si la revisión cambió, actualiza el historial.'; }
    }
    host.querySelector('[data-recover]').addEventListener('click',event=>openDraft(event.currentTarget,()=>recoverRevision(snapshot,version)));
  } catch { host.innerHTML='<div class="ui-feedback"><h2>No pudimos cargar el historial</h2><button class="ui-action ui-action--secondary" data-retry>Reintentar</button></div>';host.querySelector('[data-retry]').addEventListener('click',render); }
}
render();

window.addEventListener('pageshow',event=>{if(event.persisted){busy=false;render();}});
