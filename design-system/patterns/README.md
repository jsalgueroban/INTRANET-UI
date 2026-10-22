# Patrones documentados

- `responsive-shell`: navegación global, contenido y recomposición móvil.
- [`task-first-composition`](task-first-composition.md): la tarea principal gobierna la jerarquía frente a identidad y contenido editorial.
- [`localized-media-scrim`](localized-media-scrim.md): estabiliza contraste sólo detrás del contenido sobre fotografía.
- [`async-submit`](async-submit.md): contrato de envío, bloqueo de reentrada y recuperación del formulario.
- [`task-flow-navigation`](task-flow-navigation.md): el orden DOM sigue el recorrido operativo y no la conveniencia visual.
- [`platform-hub`](platform-hub.md): isotipo 3D como lanzador accesible y responsive de plataformas internas.
- [`retractable-navigation`](retractable-navigation.md): ocultamiento voluntario del shell mediante tensión y pestaña central recuperable.
- [`account-tray`](account-tray.md): navegación de cuenta anclada en escritorio y recompuesta como bandeja inferior móvil.

## Candidatos observados aún sin contrato propio

- `editorial-section`: jerarquía mediante escala, línea y espacio.
- `dense-management`: toolbar, filtros, selección y detalle sin inventar dominio.
- `feedback-states`: loading, empty, error y forbidden como estados de primera clase.

Que estén observados no autoriza reutilizarlos como patrón. Deben recibir propósito,
anatomía, estados, accesibilidad, evidencia y gate antes de pasar a `candidate`.

Los patrones describen organización y comportamiento. No contienen DTOs, permisos,
fetch ni mensajes de negocio.
