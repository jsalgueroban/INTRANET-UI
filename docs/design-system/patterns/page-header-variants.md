# Cabecera de módulo y cabecera de contenido o tarea

Estado de decisión: consolidada el 2026-11-23 por instrucción del owner en el chat. La regla de selección es vigente; la adopción y la certificación de componentes se verifican por separado. No se autoriza una migración de interfaces en esta entrega.

## Propósito y selección

La cabecera comunica el rol y el nivel de la vista. La variante depende de la tarea dominante y su posición en el recorrido; no de la presencia de un botón, el número de campos, el CSS heredado o que el archivo se llame listado/detalle.

| Variante | Criterio | Anatomía |
| --- | --- | --- |
| Módulo · azul | Espacio operativo o vista hermana estable de ese espacio | Retorno y título a la izquierda; descripción y acción contextual opcional a la derecha; navegación de familia en el borde inferior cuando exista |
| Contenido o tarea · clara | Colección editorial, contenido, registro o tarea acotada | Retorno específico, título del objeto/tarea, metadatos y acciones del registro; sin franja azul adicional |

El azul profundo estructura, el texto de cabecera es claro y el amarillo orienta la acción dominante. La variante clara usa la superficie clara de página o de contenido; no exige una tarjeta blanca. No se inventan acciones o pestañas para completar la anatomía.

## Árbol de decisión

1. Acceso: aplicar Living Archive. Inicio general: aplicar Canopy Hub. Catálogo/demos: aplicar el contrato de la pieza demostrada; no definen una cabecera de producto. Son categorías delimitadas, no excepciones libres.
2. Panel flotante: usar su cabecera clara, sin repetir la franja del módulo detrás.
3. Módulo de trabajo o vista hermana de navegación persistente: azul.
4. Lectura editorial, consulta transversal, registro o tarea concreta: clara.
5. En una superficie híbrida prevalece el rol dominante documentado en la matriz; una excepción requiere actualizar esa decisión, no un override local.

## Familias y casos delimitados

- Usuarios y Roles: azul, familia de administración de acceso.
- Biotime: sus cinco vistas, incluido Histórico por persona, son azules porque son secciones hermanas. El detalle de un día dentro del histórico no incorpora otra cabecera azul.
- Salas, Mis reservas y Administración de salas: azul. La solicitud de reserva, tanto flotante como por enlace directo, es clara.
- Contenidos y sus estados de bandeja: azul. Editor, adjuntos, vista previa e historia de una publicación: clara.
- Biblioteca documental administrativa: azul. Documentos publicados y su lectura individual: clara.
- Pendientes y Notificaciones: azul como bandejas. Pendiente y Aviso individuales: clara.
- Noticias, Vacantes y Secciones publicadas: claras como colecciones editoriales. Que sean entradas de primer nivel no las convierte en módulos administrativos.
- Mi perfil: clara como ficha personal; Usuarios mantiene azul como administración de cuentas.
- Una sección azul sin acción sigue siendo válida: Fuentes y dispositivos. Una clara puede incluir una acción amarilla.
- No anidar dos franjas azules ni confundir shell global con cabecera de vista.

## Composiciones de acceso, inicio general y demos

- **Acceso:** index.html y login.html, bajo Living Archive; identidad, imagen y autenticación.
- **Inicio general:** inicio.html, bajo Canopy Hub; portada editorial y accesos. No incluye el Inicio de un módulo, como Biotime.
- **Catálogo/demos:** componentes.html, data-list-demo.html, navigation-demo.html y platform-demo.html. Demuestran piezas con contrato y estado de adopción; no crean reglas del producto por sí solas.

Estas composiciones siguen sujetas a identidad, tokens, tipografía, iconografía, componentes, accesibilidad y responsive de Intranet. No permiten inventar una dirección visual libre. Experimentos de catálogo se identifican y aíslan; no se promueven al producto sin selección y gates. Una vista nueva no puede acogerse a estas categorías sin cumplir su propósito. Consultar la [matriz](../header-view-matrix.md) para los contratos y límites por grupo.

## Contrato común

Un solo h1 por vista; identidad, tokens, tipografía, iconos y escala de espaciado compartidos. Retorno con destino concreto; etiqueta accesible y foco visible. Acción general en cabecera, acciones de registro junto al objeto, acciones de formulario dentro del formulario. No duplicar un CTA en cabecera y cuerpo. Permisos y estados gobiernan su disponibilidad; el color no concede acceso.

Sin alturas fijas dependientes de líneas de título. En móvil: retorno/título, descripción y acciones mantienen orden semántico; pestañas desplazables con selección visible y sin overflow de página. Contraste, teclado, zoom 200 %, títulos extensos y acciones ausentes/deshabilitadas se verifican antes de certificar una implementación. Estado vacío/error/forbidden conserva contexto de familia y retira acciones no válidas.

## Autoridad, evidencia y adopción

Fuente: DESIGN.md, Foundation 0.4, composición de Usuarios seleccionada por el usuario y solicitud explícita de consolidar ambas variantes. La anterior propuesta de conversación queda sustituida por este contrato. La captura no cambia tokens ni prueba QA integral.

La [clasificación de vistas](../header-view-matrix.md) es normativa para futuras adaptaciones. Inventario sobre la fuente local INTRANET-UI-GitHub el 2026-11-23; no afirma que cada vista publicada ya coincida. La construcción actual workspace-heading.css y las cabeceras claras existentes son evidencia de implementación, no APIs promovidas automáticamente. Mantener el estado de sus componentes hasta satisfacer sus gates.

Esta entrega modifica exclusivamente Markdown. Cambios visuales, librería, publicación, permisos y servicios quedan fuera.
