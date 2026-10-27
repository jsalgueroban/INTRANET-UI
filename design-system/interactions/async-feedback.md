# Respuesta asíncrona

Estados: `idle`, `pending`, `success`, `error`. La transición comienza sólo después de
validación local satisfactoria.

- `pending` deshabilita el envío duplicado y muestra verbo en progreso: “Ingresando…”.
- El formulario conserva valores y foco durante la espera.
- `success` continúa al destino o confirma sin animación ornamental.
- `error` comunica una causa útil, permite reintento y vuelve a habilitar la acción.
- Una respuesta tardía de una solicitud cancelada no altera el estado vigente.
- `aria-busy` vive en la región afectada y los mensajes se anuncian de forma mesurada.

La latencia de red no debe parecer un bloqueo de toda la aplicación.
