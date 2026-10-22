# Registro consolidado de decisiones

Última revisión: 2026-10-21. Este índice evita que una captura o un run histórico se tome
como la dirección vigente.

## Vigentes

| ID | Alcance | Decisión | Estado | Fuente |
| --- | --- | --- | --- | --- |
| D-001 | global | Construir el sistema de forma incremental y promover sólo con evidencia | aceptada | [ADR-001](ADR-001-foundation-incremental.md) |
| D-002 | global | Banasan respalda; Intranet identifica; la tarea domina | aceptada | [`DESIGN.md`](../../DESIGN.md) |
| D-003 | global | Azul estructura, amarillo orienta y los neutros sostienen la operación | seleccionada, tokens candidatos | foundations y tokens |
| D-004 | global | Manrope para display y DM Sans para interfaz/lectura | candidata | `foundations/typography.md` |
| D-005 | global | La jerarquía usa espacio, línea y contraste antes que cards y sombra | aceptada | [`DESIGN.md`](../../DESIGN.md) |
| D-006 | familia autenticada | El shell conserva lockup centrado, contraste opaco y recomposición responsive | candidate | `responsive-shell.md` |
| D-007 | inicio | El isotipo 3D funciona como launcher, no como firma institucional | experimental | [ADR-003](ADR-003-identity-and-3d-scope.md) |
| D-008 | inicio | La navegación puede recogerse por tensión y siempre conserva recuperación | experimental | `retractable-navigation.md` |
| D-009 | login | El envío bloquea reentrada, anuncia espera y conserva recuperación | candidate | `async-submit.md` |
| D-010 | usuarios | La UI prueba gestión sin inventar modelo, roles ni permisos | dirección aceptada; contrato pendiente | [ADR-002](ADR-002-users-grpc-boundary.md) |
| D-011 | sistema UI | Foundations y componentes compartidos se separan de la composición de pantalla | aceptada en la propuesta | [ADR-004](ADR-004-shared-component-foundation.md) |

## Reemplazadas o retiradas

| Decisión | Estado | Motivo |
| --- | --- | --- |
| Umbral / Ruta / Foco como shortlist final | replaced | Convergencia genérica; sustituidas por Living Archive y Canopy Hub |
| Constellation Operations | rejected | No representó la dirección elegida por el owner |
| Extrusión 3D como logotipo | retired | Alteraba proporción, ligereza y jerarquía de la firma |
| Eyebrows decorativos o repetitivos | retired | Duplicaban el título y dejaban rastro editorial genérico |
| Cards como arquitectura predeterminada | retired | Fragmentaban lectura y producían una estética SaaS intercambiable |
| Navegación translúcida dependiente de blur | replaced | Perdía contraste en pantallas de baja calidad |

## Abiertas

- Hosting, carga y rendimiento de Manrope y DM Sans.
- Catálogo iconográfico completo y reglas de producción de assets.
- Modelo de usuario, roles, permisos, RPC, errores y paginación.
- Catálogo de plataformas internas, URLs, SSO y visibilidad por permiso.
- Persistencia de navegación retráctil y comportamiento con zoom al 200 %.
- Promoción de primitives y patterns después de una segunda familia de evidencia.

## Regla de actualización

Una decisión nueva no borra la anterior: la marca como `replaced`, `rejected` o `retired`,
enlaza su reemplazo y actualiza `status.md` cuando cambie la capacidad de reutilización.
