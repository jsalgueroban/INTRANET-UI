# Bandeja de cuenta

Estados: `closed`, `opening`, `open`, `closing`. El disparador de cuenta conserva
`aria-expanded` y referencia el panel mediante `aria-controls`.

- En escritorio emerge anclada al borde del disparador; en móvil usa bandeja inferior.
- Abre con click, `Enter` o `Space`; cierra con `Escape`, acción elegida o click exterior.
- Al abrir, el foco entra en la primera acción. Al cerrar, vuelve al disparador.
- Flechas recorren opciones; `Tab` conserva el orden natural.
- Una apertura durante el cierre invierte desde el progreso actual, sin parpadeo.
- Reduced motion conserva opacidad y estado, sin traslación.

Contenido vigente: Perfil, Empresa y Gestión de usuarios. No expone roles ni permisos
hasta que exista contrato de identidad.
