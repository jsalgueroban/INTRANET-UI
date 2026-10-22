# ADR-002 · Frontera de administración de usuarios

Estado: dirección aceptada; contrato pendiente. Fecha: 2026-10-06.

## Confirmado

- La administración se abre desde el control de perfil de la navegación.
- La integración futura de administración de usuarios utilizará gRPC.
- Esta iteración es una prueba UI/UX, sin backend.

## Pendiente

- Identidad, atributos y estados del usuario.
- Roles, permisos, alcance y auditoría.
- RPC, mensajes, paginación, filtros, errores y autorización.

## Límite

La maqueta usa datos demostrativos mínimos para probar layout. No constituye proto,
DTO, contrato de seguridad ni autorización. Ninguna acción muta datos.
