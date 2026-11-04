import { enrichEditorialExample } from './editorial-examples.js';
import { reviewSnapshot, snapshotReady } from './editorial-snapshot.js';
const KEY = 'banasan-pending-demo-v1';
export const viewer = { id: 'john', name: 'John Salguero', company: 'Banasan', types: ['contenido', 'reserva'] };
const seed = [
  { id: 'C-102', type: 'contenido', title: 'Guía de atención al colaborador', person: 'Laura · Gestora de ejemplo', author: 'laura', received: '2026-10-28', status: 'Devuelto', section: 'Noticias', before: 'Consulta con Gestión Humana los canales de atención.', after: 'Consulta con Gestión Humana los canales de atención y los horarios de servicio.', change: 'Se agregan horarios de atención.', resolved: true, actor: 'María · Aprobadora de ejemplo', resolvedAt: '2026-10-29T15:30:00Z', reason: 'Incluye el horario concreto y el canal de contacto antes de volver a enviar.', round: 2, rounds: [{ round: 1, title: 'Guía de atención al colaborador', person: 'Laura · Gestora de ejemplo', author: 'laura', received: '2026-10-25', before: 'Consulta con Gestión Humana los canales de atención.', after: 'Consulta los canales de atención del equipo.', change: 'Revisión del texto de atención.', status: 'Devuelto', resolved: true, actor: 'María · Aprobadora de ejemplo', resolvedAt: '2026-10-26T15:30:00Z', reason: 'Identifica el área responsable y sus horarios de atención.' }] },
  { id: 'C-104', type: 'contenido', title: 'Jornada de formación en campo', person: 'Laura · Gestora de ejemplo', author: 'laura', received: '2026-10-24', status: 'Por revisar', section: 'Noticias', before: 'La jornada se realizará el 5 de noviembre en la sede principal.', after: 'La jornada se realizará el 6 de noviembre en la sede principal. Participarán los equipos de operación y bienestar.', change: 'Cambio de fecha e incorporación de los equipos participantes.' },
  { id: 'R-208', type: 'reserva', title: 'Coordinación de operaciones', person: 'Andrea · Solicitante de ejemplo', author: 'andrea', received: '2026-10-25', status: 'Por aprobar', room: 'Sala principal', day: '2026-11-05', start: '09:00', end: '10:00', purpose: 'Revisión de la programación semanal con el equipo de operación.' },
  { id: 'R-209', type: 'reserva', title: 'Reunión de bienestar', person: 'Carlos · Solicitante de ejemplo', author: 'carlos', received: '2026-10-26', status: 'Por aprobar', room: 'Sala principal', day: '2026-11-05', start: '09:30', end: '10:30', purpose: 'Organizar las actividades del equipo de bienestar.' },
  { id: 'C-103', type: 'contenido', title: 'Actualización de beneficios', person: 'Laura · Gestora de ejemplo', author: 'laura', received: '2026-10-21', status: 'Publicado', section: 'Beneficios', before: 'Consulta los beneficios disponibles.', after: 'Consulta los beneficios disponibles y sus canales de atención.', change: 'Se incorporan los canales de atención.', resolved: true, actor: 'María · Aprobadora de ejemplo', resolvedAt: '2026-10-23T15:30:00Z', reason: '' },
  { id: 'R-201', type: 'reserva', title: 'Seguimiento de compras', person: 'Carlos · Solicitante de ejemplo', author: 'carlos', received: '2026-10-22', status: 'Rechazado', room: 'Sala principal', day: '2026-10-27', start: '11:00', end: '12:00', purpose: 'Seguimiento de solicitudes del área.', resolved: true, actor: 'María · Gestora de ejemplo', resolvedAt: '2026-10-24T14:00:00Z', reason: 'El solicitante confirmó que la reunión se realizará en otra sede.' }
].map(item => ({ ...item, company: 'Banasan' }));
export function readItems() {
  const raw = sessionStorage.getItem(KEY);
  const items = raw ? JSON.parse(raw) : structuredClone(seed);
  if (!Array.isArray(items)) throw new Error('invalid data');
  if (!items.some(item => item.id === 'C-102')) items.push(structuredClone(seed.find(item => item.id === 'C-102')));
  return items.filter(item => item.company === viewer.company && viewer.types.includes(item.type)).map(enrichEditorialExample);
}
export function resetItems() { sessionStorage.removeItem(KEY); }
export function overlapping(item, items = readItems()) {
  return items.filter(other => other.id !== item.id && other.type === 'reserva' && other.room === item.room && other.day === item.day && other.start < item.end && other.end > item.start && (!other.resolved || other.status === 'Aprobado'));
}
export function decide(id, decision, reason, expectedRevision) {
  const items = readItems();
  const item = items.find(entry => entry.id === id);
  if (!item) return { error: 'Este pendiente no está disponible para tu consulta.' };
  if (item.resolved) return { error: 'Este pendiente ya fue resuelto. Consulta el resultado actualizado.' };
  if (item.author === viewer.id || (item.modifiedBy || []).includes(viewer.id)) return { error: 'Una persona distinta debe revisar esta solicitud.' };
  if (item.type === 'contenido' && expectedRevision !== revisionToken(item)) return { error: 'La revisión cambió desde que la abriste. Revisa la versión actual antes de decidir.' };
  if (item.type === 'contenido' && decision === 'approve' && !snapshotReady(reviewSnapshot(item, 'after'))) return { error: 'Hay archivos de esta revisión que no están disponibles. No se puede aprobar todavía.' };
  if (!['approve', item.type === 'contenido' ? 'return' : 'reject'].includes(decision)) return { error: 'Selecciona una acción disponible.' };
  if (decision !== 'approve' && !reason.trim()) return { error: 'Escribe el motivo antes de confirmar.' };
  if (item.type === 'reserva' && decision === 'approve' && overlapping(item, items).some(other => other.status === 'Aprobado')) return { error: 'La sala ya tiene una reserva aprobada en este horario. No se puede aprobar esta solicitud.' };
  Object.assign(item, { resolved: true, actor: viewer.name, resolvedAt: new Date().toISOString(), reason: reason.trim(), status: decision === 'approve' ? (item.type === 'contenido' ? (item.publishAt && new Date(item.publishAt) > new Date() ? 'Programado' : 'Publicado') : 'Aprobado') : (decision === 'return' ? 'Devuelto' : 'Rechazado') });
  sessionStorage.setItem(KEY, JSON.stringify(items));
  return { item };
}
export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const dateLabel = value => new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value.length === 10 ? value + 'T12:00:00' : value));
export const typeLabel = item => item.type === 'contenido' ? 'Contenido' : 'Reserva';
export const actionLabel = item => item.resolved ? item.status : item.type === 'contenido' ? 'Revisar publicación' : 'Decidir reserva';

export const rooms = [{ name: 'Sala principal', open: '08:00', close: '17:00' }, { name: 'Sala de reuniones 2', open: '08:00', close: '17:00' }];
export function requestReservation(values) {
  const room = rooms.find(entry => entry.name === values.room);
  if (!room || !/^\d{4}-\d{2}-\d{2}$/.test(values.day) || !Number.isFinite(Date.parse(values.day))) return { error: 'Selecciona una sala y una fecha válidas.' };
  if (!/^\d{2}:\d{2}$/.test(values.start) || !/^\d{2}:\d{2}$/.test(values.end) || values.start >= values.end || values.start < room.open || values.end > room.close) return { error: 'Elige un horario dentro de la disponibilidad de la sala, con el fin posterior al inicio.' };
  if (!values.purpose.trim()) return { error: 'Escribe el motivo de la reunión.' };
  const items = readItems();
  const item = { id: 'R-' + crypto.randomUUID().slice(0,8).toUpperCase(), type: 'reserva', title: values.title.trim() || 'Reserva de ' + room.name, person: viewer.name, author: viewer.id, company: viewer.company, received: new Intl.DateTimeFormat('en-CA', {timeZone:'America/Bogota'}).format(new Date()), status: 'Por aprobar', room: room.name, day: values.day, start: values.start, end: values.end, purpose: values.purpose.trim() };
  if (overlapping(item, items).some(other => other.status === 'Aprobado')) return { error: 'Ya hay una reserva aprobada en ese horario. Selecciona otro horario.' };
  items.push(item);
  sessionStorage.setItem(KEY, JSON.stringify(items));
  return { item };
}
export function cancelReservation(id) {
  const items = readItems();
  const item = items.find(entry => entry.id === id && entry.type === 'reserva' && entry.author === viewer.id);
  if (!item || !['Por aprobar', 'Aprobado'].includes(item.status)) return { error: 'Esta reserva ya no puede cancelarse desde tu cuenta.' };
  const time = new Date().toISOString();
  const events = [...(item.events || [])];
  if (item.resolvedAt) events.push({ status: item.status, actor: item.actor, at: item.resolvedAt, reason: item.reason });
  events.push({ status: 'Cancelado', actor: viewer.name, at: time });
  Object.assign(item, { resolved: true, status: 'Cancelado', actor: viewer.name, resolvedAt: time, reason: 'Cancelada por el solicitante.', events });
  sessionStorage.setItem(KEY, JSON.stringify(items));
  return { item };
}

export function revisionToken(item) {
  return JSON.stringify([item.id, item.round || 1, item.reason || '', item.title, item.before, item.after, item.change, item.author, item.modifiedBy || [], item.publishAt || null, item.beforeImage || null, item.afterImage || null, item.resources || [], item.beforeSnapshot || null, item.afterSnapshot || null]);
}
export function editorialRounds(item) {
  const { rounds, ...current } = item;
  return [...(rounds || []).map(round => ({ ...round, id: item.id, type: item.type, company: item.company, section: item.section })), { ...current, round: current.round || 1 }];
}
export function editorialEvents(item) {
  return editorialRounds(item).flatMap(round => {
    const events = [{ label: 'Enviado a revisión', actor: round.person, at: round.received, reason: round.change, round: round.round }];
    if (round.resolved) events.push({ label: round.status, actor: round.actor, at: round.resolvedAt, reason: round.reason, round: round.round });
    return events;
  }).reverse();
}
