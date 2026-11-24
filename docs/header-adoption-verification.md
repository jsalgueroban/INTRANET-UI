# Adopción pendiente de cabeceras · 2026-11-23

Modo improve + correct. Fuente: contrato y matriz de design-system en Intranet-UI. Implementación: INTRANET-UI-GitHub. Alcance local; sin publicación.

## Resultado

11 vistas azules pendientes y 18 claras adoptadas explícitamente. Las seis cabeceras azules previas se conservan. Siete archivos de acceso/inicio/demos intactos, verificados contra hashes de inicio de esta entrega. Alcance por archivo en header-adoption-scope.json y evidencia de protección en header-protected-snapshot.json.

La composición compartida incorpora una variante azul sin pestañas cuando no hay familia de secciones. No se inventan destinos para ocupar ese lugar. Los filtros de bandeja permanecen en el contenido. Clara usa superficie neutra y retorno legible; se retiran los gradientes heredados en Perfil y Pendiente individual. Noticia y otras vistas dinámicas conservan su título compuesto dentro del contenido.

## Verificación

- 29 rutas a 1280 × 900 y 390 × 844: sin overflow horizontal de página.
- Apertura y Escape: Nueva entrada, Cargar documento, Escribir sugerencia y Agregar dependencia.
- Detalles desde listados: noticia Encuentro de equipos, documento Guía de orientación, información Nuestra cultura, vacante Profesional de compras y pendiente C-104. Conservan variante clara y retorno; sin errores JavaScript en los recorridos.
- Estado sin ID comprobado para vistas que requieren registro; no se interpreta como fallo de carga.
- Evidencia visual en workspace del chat: .playwright-mcp/page-2026-11-23T19-16-10-417Z.png (Biblioteca escritorio), page-2026-11-23T19-16-31-138Z.png (Perfil móvil).
- git diff --check correcto. No hay build específico para estos cambios HTML/CSS. No se declara QA funcional completo de todos los estados ni hardware táctil o accesibilidad integral.

## Capacidades y límites

Intranet: contrato/fuentes. Product Design: selección por rol. UI Engineering/Frontend: reutilización del patrón y overrides acotados. Visual QA: render y recorridos. Dona: seguimiento. SELF: inventario y adaptación con contexto compartido; sin beneficio independiente de delegación. No cambia librería, permisos ni backend.
