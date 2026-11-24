# Biotime · Patrones Intranet · 2026-11-23

Estado: mejora local, sin publicar. Seguimiento Ares: Intranet / tarea 29.
Modo dominante improve; correct para superposición del icono de búsqueda y orden cronológico. React y TanStack Router existentes; se mantiene @banasandev/intranet-ui y el build de assets/biometria/build.mjs.

Autoridad: DESIGN.md y design-system del checkout Intranet-UI (Foundation 0.4). Tarea primero, líneas y espacio, componentes compartidos. No se modificó la librería ni se introdujo otra identidad.

- Las cinco vistas comparten navegación interna por enlaces, estado actual y foco de encabezado.
- Inicio y fuentes usan encabezados de empresa de nivel coherente y mantienen listados operativos.
- Marcaciones agrupa filtros y permite limpiarlos; el estilo local deja de sobrescribir el espacio del icono SearchField.
- Histórico conserva una ruta explícita a la consulta de origen, incluyendo filtros; secuencia ordenada por hora.
- Novedades reutiliza floatingPanel mediante un puente React local. Formulario por grupos: persona/ubicación, novedad/período, observación. Error dentro del modal, datos conservados, cancelación y Escape, detalle tras guardar y retorno de foco al cerrar detalle.

Capacidades: Intranet (contrato y fuente), Product Design (composición operativa), Frontend (controles y coordinación), Visual QA (render/recorridos), Dona (tarea). Paquetes/backend descartados: sin cambio de API o servicio. SELF: mejora acotada en módulo con contexto compartido, sin beneficio independiente de delegación.

Verificación: build.mjs y git diff --check correctos; formato con Prettier. Navegación por las cinco vistas; perfil Consulta oculta Novedades y Fuentes; Administración las muestra. Filtro empresa, salto a histórico y retorno conservan Banasan; limpiar restablece consulta. Selección diaria presenta horas ordenadas. Novedad inválida conserva observación; corrección y guardado simulado abre detalle. Escape cierra y retorna foco a Registrar novedad. Render 1280 px y móvil 390 px, fuentes/histórico sin overflow de página, modal móvil sin overflow horizontal. Consola sin errores.

Evidencia en workspace del chat: .playwright-mcp/page-2026-11-23T15-41-18-341Z.png (formulario), page-2026-11-23T15-42-57-592Z.png (inicio). No se certifica accesibilidad integral, hardware táctil ni integración real de datos/permisos. Pendiente revisión humana y publicación.


## Cabecera de Usuarios adoptada · 2026-11-23

La iteración de cabecera clara queda sustituida. Se comparte workspace-heading.css entre Usuarios, Roles y Biotime, con las clases de cabecera, nota y navegación extraídas de la construcción existente. Biotime añade el fondo continuo hasta el borde de pestañas sin usar alturas de fondo fijas. Retorno blanco, títulos a la izquierda, descripción/acción a la derecha y pestañas blancas con selección amarilla. Reflujo móvil y revelado automático de la pestaña activa.

Acciones: Inicio consulta marcaciones; Marcaciones exporta según permiso y resultados; Histórico regresa a la consulta de origen con filtros o abre Marcaciones; Novedades abre el formulario compartido; Fuentes no inventa operaciones de edición. Se retiran botones duplicados del cuerpo. La exportación conserva la misma función y el mismo filtro compartido.

Verificación: build y formato; cinco vistas a 1280 y 390 px sin overflow de página. Todas las pestañas activas visibles en móvil. Descarga CSV desde cabecera y regreso histórico mantienen empresa Banasan. Apertura/cierre y Escape del formulario retornan foco al botón de cabecera. Usuarios renderizado tras consumir estilo compartido, sin desbordamiento. Consola sin errores. Fuente de selección: captura de Usuarios proporcionada por el usuario e instrucción explícita de adopción. Sin publicar.
