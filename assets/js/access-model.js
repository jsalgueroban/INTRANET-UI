const KEY = 'banasan-intranet-access-proposal-v1';
const initial = {
  roles: [
    { id: 'contenido', name: 'Gestión de contenidos', summary: 'Publicar y mantener información', company: 'C.I. Banasan S.A.S.', section: 'Contenido de Intranet', resource: 'Noticias y páginas', permissions: ['Consultar', 'Preparar', 'Administrar'], active: true },
    { id: 'aprobacion', name: 'Aprobación de contenidos', summary: 'Revisar y aprobar publicaciones', company: 'C.I. Banasan S.A.S.', section: 'Contenido de Intranet', resource: 'Publicaciones', permissions: ['Consultar', 'Preparar', 'Aprobar'], active: true },
    { id: 'consulta', name: 'Consulta', summary: 'Leer información autorizada', company: 'C.I. Banasan S.A.S.', section: 'Intranet', resource: 'Secciones asignadas', permissions: ['Consultar'], active: true }
  ],
  users: [
    { id: 'andrea', name: 'Andrea Martínez', email: 'andrea.martinez@banasan.com.co', origin: 'ad', username: 'andrea.martinez', company: 'C.I. Banasan S.A.S.', area: 'Gestión humana', roles: ['consulta'], status: 'active', domainStatus: 'enabled' },
    { id: 'carlos', name: 'Carlos Rivera', email: 'carlos.rivera@banasan.com.co', origin: 'ad', username: 'carlos.rivera', company: 'C.I. Banasan S.A.S.', area: 'Tecnología', roles: ['contenido'], status: 'active', domainStatus: 'locked' },
    { id: 'diana', name: 'Diana Pérez', email: 'diana.perez@banasan.com.co', origin: 'local', username: '', company: 'C.I. Banasan S.A.S.', area: 'Comunicaciones', roles: ['aprobacion'], status: 'pending' },
    { id: 'felipe', name: 'Felipe Gómez', email: 'felipe.gomez@banasan.com.co', origin: 'ad', username: 'felipe.gomez', company: 'C.I. Banasan S.A.S.', area: 'Procesos', roles: ['consulta'], status: 'active', domainStatus: 'disabled' },
    { id: 'maria', name: 'María López', email: 'maria.lopez@banasan.com.co', origin: 'local', username: '', company: 'C.I. Banasan S.A.S.', area: 'Gestión humana', roles: [], status: 'pending' },
    { id: 'sergio', name: 'Sergio Torres', email: 'sergio.torres@banasan.com.co', origin: 'ad', username: 'sergio.torres', company: 'C.I. Banasan S.A.S.', area: 'Administración', roles: ['consulta'], status: 'active' }
  ]
};
export function readAccess() { try { const stored = JSON.parse(localStorage.getItem(KEY)); if (Array.isArray(stored?.users) && Array.isArray(stored?.roles)) return stored; } catch {} return structuredClone(initial); }
export function writeAccess(data) { localStorage.setItem(KEY, JSON.stringify(data)); }
export function createId() { return crypto.randomUUID(); }
export function initials(name) { return name.trim().split(/\s+/).slice(0, 2).map(part => part[0]?.toLocaleUpperCase('es') || '').join(''); }
export const statusLabel = { active: 'Activo', inactive: 'Inactivo', pending: 'Pendiente' };
