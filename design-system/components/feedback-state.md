# Estado de superficie

Estado: `candidate`.

## Propósito

Explicar qué ocurre cuando una región todavía no tiene contenido utilizable. Sustituye
vacíos ambiguos y cards ornamentales por una respuesta compacta y accionable.

## Variantes

- `loading`: progreso no bloqueante y mensaje específico.
- `empty`: resultado válido sin registros y siguiente acción cuando exista.
- `error`: causa comprensible, preservación de contexto y reintento seguro.
- `forbidden`: falta de acceso sin aparentar un error técnico.

## Contrato

La región usa `aria-live="polite"` para cambios normales y `role="alert"` sólo cuando
la acción del usuario falla. No reemplaza toda la página si el resto sigue disponible.
El texto no menciona implementación, pruebas ni contenido demostrativo.

## Promoción

Requiere datos reales, error recuperable y validación de lectura con tecnología asistiva.
