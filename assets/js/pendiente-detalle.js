import { reviewSnapshot, snapshotReady } from './editorial-snapshot.js';
import { mountEditorialReview } from './ui-editorial-review.js';
import { readItems, decide, revisionToken, overlapping, viewer, escapeHtml as esc, dateLabel } from './pending-store.js';
const host = document.querySelector('[data-detail]');
const id = new URLSearchParams(location.search).get('id');
let busy = false;
let action = '';
try {
  const saved = JSON.parse(sessionStorage.getItem('pending-return') || 'null');
  if (saved?.query?.startsWith('?')) document.querySelector('[data-back]').href = 'pendientes.html' + saved.query;
} catch {}
if(new URLSearchParams(location.search).get('from')==='editorial'){try{const query=sessionStorage.getItem('editorial-return');document.querySelector('[data-back]').href='contenidos.html'+(query?.startsWith('?')?query:'?view=reviews');document.querySelector('[data-back] .ui-return__label').textContent='Revisiones';document.querySelector('[data-back]').setAttribute('aria-label','Volver a revisiones');}catch{}}
function render() {
  try {
    const item = readItems().find(entry => entry.id === id);
    if (!item) { host.innerHTML = '<div class="ui-feedback"><strong>Pendiente no disponible</strong><p>El enlace no corresponde a un pendiente disponible en esta propuesta.</p><a class="ui-action ui-action--secondary" href="pendientes.html">Volver a pendientes</a></div>'; return; }
    const content = item.type === 'contenido';
    document.title = item.title + ' · Intranet Banasan';
    document.querySelector('[data-page-title]').textContent = content ? 'Revisar publicación.' : 'Gestionar reserva.';
    const overlaps = content ? [] : overlapping(item);
    const resourcesMissing = content && !snapshotReady(reviewSnapshot(item, 'after'));
    const blocked = resourcesMissing || overlaps.some(other => other.status === 'Aprobado');
    host.innerHTML = `<div class="review-heading"><div><p class="review-context">${esc(item.company)} · ${esc(content ? item.section : item.room)} · ${esc(item.id)}</p><h2>${esc(item.title)}</h2><p>${esc(item.person)} · Recibido ${dateLabel(item.received)}</p></div><span class="review-status">${esc(item.status)}</span></div>
    ${content ? `<div class="review-version-bar"><span>Revisión ${esc(item.id)} · ${dateLabel(item.received)}</span><a class="ui-action ui-action--quiet" href="historial-editorial.html?id=${encodeURIComponent(item.id)}">Consultar historial ↗</a></div><div data-editorial-review></div>` : `<div class="review-reservation"><section class="review-request"><h3>Datos de la reserva</h3><dl><div><dt>Fecha</dt><dd>${dateLabel(item.day)}</dd></div><div><dt>Horario</dt><dd>${esc(item.start)} – ${esc(item.end)}</dd></div><div><dt>Sala</dt><dd>${esc(item.room)}</dd></div></dl><h3>Motivo de la reunión</h3><p>${esc(item.purpose)}</p></section><section class="review-availability"><h3>Disponibilidad y coincidencias</h3>${overlaps.length ? `<ul>${overlaps.map(other => `<li>${esc(other.start)} – ${esc(other.end)} · ${esc(other.title)} <strong>${esc(other.status)}</strong></li>`).join('')}</ul>` : '<p>No hay otras solicitudes coincidentes en este ejemplo.</p>'}<p>${blocked ? 'Hay una reserva aprobada en este horario. Esta solicitud no puede aprobarse.' : 'La disponibilidad se comprueba al aprobar la reserva.'}</p></section></div>`}
    ${item.resolved ? `<section class="review-resolution" tabindex="-1"><h3>Resolución registrada</h3><dl><div><dt>Resultado</dt><dd>${esc(item.status)}</dd></div><div><dt>Resuelto por</dt><dd>${esc(item.actor)}</dd></div><div><dt>Fecha</dt><dd>${dateLabel(item.resolvedAt)}</dd></div></dl>${item.reason ? `<p><strong>Motivo:</strong> ${esc(item.reason)}</p>` : ''}${item.status === 'Devuelto' ? '<p>La corrección corresponde al gestor que realizó el envío.</p>' : ''}<a class="ui-action ui-action--secondary" href="${content ? 'historial-editorial.html?id='+encodeURIComponent(item.id) : 'pendientes.html?view=history'}">Ver histórico</a></section>` : (item.author === viewer.id || (item.modifiedBy || []).includes(viewer.id)) ? '<p>No puedes aprobar tu propia revisión o solicitud. Debe actuar otra persona autorizada.</p>' : `<section class="review-decision"><div class="review-decision-bar"><div><h3>${content ? 'Resolver revisión' : 'Resolver solicitud'}</h3><p>${content ? (resourcesMissing ? 'Hay archivos no disponibles. La revisión no puede aprobarse todavía.' : item.publishAt && new Date(item.publishAt)>new Date() ? 'La revisión quedará programada para '+dateLabel(item.publishAt)+'.' : 'Aprobar publica esta versión en la demostración.') : blocked ? 'El horario coincide con una reserva aprobada.' : 'La sala quedará reservada para este horario.'}</p></div><div class="review-actions" data-primary-actions><button class="ui-action ui-action--quiet" data-decision="${content ? 'return' : 'reject'}">${content ? 'Devolver para corregir' : 'Rechazar solicitud'}</button><button class="ui-action ui-action--primary" data-decision="approve" ${blocked ? 'disabled' : ''}>${content ? (item.publishAt && new Date(item.publishAt)>new Date() ? 'Aprobar y programar' : 'Aprobar y publicar') : 'Aprobar reserva'}</button></div></div><form data-confirm hidden><label class="ui-field">${content ? 'Observaciones para el gestor' : 'Motivo del rechazo'}<textarea name="reason" rows="3" maxlength="1500" required aria-describedby="decision-error"></textarea></label><div class="review-actions"><button class="ui-action ui-action--quiet" type="button" data-cancel>Cancelar</button><button class="ui-action ui-action--secondary" type="submit">${content ? 'Enviar devolución' : 'Rechazar reserva'}</button></div></form><p id="decision-error" class="review-error" role="alert"></p></section>`}<p class="inbox-note">Demostración local. Las decisiones no envían avisos ni modifican información real.</p>`;
    if (content) mountEditorialReview(host.querySelector('[data-editorial-review]'), item);
    async function submitDecision(button, decision, reason = '') {
      if (busy) return;
      if (decision !== 'approve' && !reason.trim()) {
        host.querySelector('#decision-error').textContent = 'Escribe el motivo antes de enviar.';
        host.querySelector('textarea').focus();
        return;
      }
      busy = true;
      const buttons = [...host.querySelectorAll('button')];
      const disabledStates = buttons.map(control => control.disabled);
      const label = button.textContent;
      buttons.forEach(control => { control.disabled = true; });
      button.textContent = 'Registrando…';
      button.setAttribute('aria-busy', 'true');
      await new Promise(resolve => setTimeout(resolve, 350));
      try {
        const result = decide(id, decision, reason, revisionToken(item));
        if (result.error) {
          render();
          const message = document.createElement('p');
          message.className = 'review-error';
          message.setAttribute('role', 'alert');
          message.textContent = result.error;
          host.prepend(message);
        } else {
          render();
          host.querySelector('.review-resolution').focus();
        }
      } catch {
        host.querySelector('#decision-error').textContent = 'No se pudo registrar la decisión. Inténtalo de nuevo.';
        buttons.forEach((control, index) => { control.disabled = disabledStates[index]; });
        button.textContent = label;
        button.removeAttribute('aria-busy');
      } finally { busy = false; }
    }
    host.querySelectorAll('[data-decision]').forEach(button => button.addEventListener('click', () => {
      action = button.dataset.decision;
      if (action === 'approve') { submitDecision(button, action); return; }
      const form = host.querySelector('[data-confirm]');
      form.hidden = false;
      host.querySelector('[data-primary-actions]').hidden = true;
      host.querySelector('#decision-error').textContent = '';
      form.elements.reason.focus();
    }));
    host.querySelector('[data-cancel]')?.addEventListener('click', () => {
      host.querySelector('[data-confirm]').hidden = true;
      host.querySelector('[data-primary-actions]').hidden = false;
      host.querySelector('#decision-error').textContent = '';
      host.querySelector(`[data-decision="${action}"]`).focus();
    });
    host.querySelector('[data-confirm]')?.addEventListener('submit', event => {
      event.preventDefault();
      submitDecision(event.currentTarget.querySelector('[type="submit"]'), action, event.currentTarget.elements.reason.value);
    });
  } catch { host.innerHTML = '<div class="ui-feedback"><strong>No pudimos cargar el pendiente</strong><p>Intenta de nuevo la consulta.</p><button class="ui-action ui-action--secondary" data-retry>Reintentar</button></div>'; host.querySelector('[data-retry]').addEventListener('click', render); }
}
render();
