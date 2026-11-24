# Variantes de cabecera Intranet

Estado: propuesta histórica sustituida el 2026-11-23 por el contrato consolidado en el sistema visual Intranet. No modifica interfaces.

Fuente vigente local: [contrato](design-system/patterns/page-header-variants.md) · [clasificación completa](design-system/header-view-matrix.md). Estos enlaces describen el workspace local, no la publicación de GitHub Pages. El texto siguiente conserva la propuesta original como historia; su sección Adopción futura queda sustituida por el contrato vigente.
Owner: Product Design Banasan. Base: Foundation 0.4 y composición de Usuarios elegida por el usuario.

## Regla

La variante depende del rol de superficie y su nivel dentro del recorrido. No depende de tener un botón, del número de campos o del CSS heredado.

### Cabecera de módulo · azul

Identifica un espacio de trabajo operativo o una vista hermana de ese espacio. Mantiene contexto, navegación de secciones y acción de alcance general.
Anatomía: retorno y título a la izquierda; descripción y acción contextual opcional a la derecha; navegación de familia sobre el borde inferior. Fondo azul profundo, texto blanco, acción principal amarilla y superficies de trabajo claras debajo.
Ejemplos: Usuarios y Roles; las cinco vistas de Biotime; Salas, Mis reservas y Administración de salas. Fuentes y dispositivos usa esta variante aun sin botón. Histórico por persona permanece azul por ser sección hermana de Biotime, no detalle aislado.

### Cabecera de contenido o tarea · clara

Prioriza un contenido, registro o tarea específica. El contexto del módulo ya está identificado y la lectura, comparación o edición necesita protagonismo.
Anatomía: retorno con destino específico, título del contenido o tarea, metadatos y acciones relacionadas. Sin franja azul adicional ni pestañas de módulo insertadas por decoración. Fondo claro no exige un rectángulo blanco: puede usar la superficie clara de página.
Ejemplos candidatos: noticia, documento, información publicada, vacante, edición de un borrador, adjuntos de un contenido y revisión de un pendiente individual. Que un detalle existente sea azul no lo hace automáticamente incorrecto: requiere revisión de su jerarquía antes de migrar.

## Decisión

1. Si es sección operativa o vista hermana de un módulo: azul.
2. Si es contenido editorial, detalle de registro o tarea acotada: clara.
3. Si abre sobre la vista actual: cabecera clara del panel flotante existente, sin repetir la franja del módulo.
4. Inicio general y login conservan sus composiciones propias documentadas.

En rutas híbridas decide el rol dominante y la navegación real. Se documenta la excepción por familia, no se decide por gusto en cada pantalla. No se anidan dos cabeceras azules. Una vista azul no exige crear una acción inexistente; una clara puede tener acción amarilla.

## Contrato de ambas variantes

Mismos tokens, tipografía, retorno, iconos, foco y escala de espacio. Un título principal; sin altura fija dependiente del número de líneas. Responsive conserva orden semántico y acciones, pestaña activa visible y sin overflow de página. La variante cambia la composición, no permisos, estados o reglas de negocio.

## Adopción futura

Primero revisar la clasificación de cada familia. Después promover la decisión a DESIGN.md y design-system/patterns, registrar estado en status.md y adaptar el compuesto compartido. No trasladar automáticamente las pantallas existentes. Esta propuesta no autoriza migración de interfaces.

Skills: Intranet (fuente), Product Design (clasificación), Dona (seguimiento). Frontend/UI Engineering: implementación pendiente hasta seleccionar el contrato. SELF: definición acotada, sin beneficio independiente de delegación.
