# Voz y contenido de interfaz

- Nombrar la tarea: `Administración de usuarios`, no `Centro de identidades`.
- Usar verbos concretos: `Buscar`, `Filtrar`, `Abrir usuario`, `Volver al inicio`.
- No afirmar capacidades que el sistema todavía no tiene.
- No prometer duración, persistencia, seguridad o resultado que el contrato técnico no garantice.
- Durante una espera, nombrar la acción en curso: `Ingresando…`, `Guardando…`,
  `Enviando…`; evitar mensajes de infraestructura como `Procesando solicitud`.
- El error explica qué no pudo completarse y conserva una salida recuperable. Su
  tratamiento visual nunca puede parecer éxito.
- Los datos demostrativos se identifican como tales.
- Evitar subtítulos aspiracionales, métricas ficticias y etiquetas repetidas.
- gRPC se documenta como frontera futura; no aparece como beneficio al usuario final.
