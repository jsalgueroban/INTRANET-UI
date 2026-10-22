# Marca de cuenta

Estado: `candidate`. Implementación de referencia: `assets/css/components.css`.

Control de entrada al contexto de cuenta. Evita el avatar circular genérico mediante
una forma recortada coherente con las acciones principales. Las iniciales son una
representación temporal y no definen el futuro modelo de usuario.

Debe exponer `aria-expanded` y `aria-controls` cuando abre la bandeja de cuenta. Su
contrato no incluye permisos, identidad, sesión ni navegación; esas decisiones viven en
la feature que lo consume.
