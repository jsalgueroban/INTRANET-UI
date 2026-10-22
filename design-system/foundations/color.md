# Color

La paleta separa valores de marca de roles de interfaz. Los valores viven en
`tokens/primitive.tokens.json`; las decisiones de uso en `tokens/semantic.tokens.json`.

- `navy-900` estructura navegación, fondos inversos y regiones de alta jerarquía.
- `navy-700` es la superficie de navegación. Debe conservar una diferencia de
  luminancia contenida frente a `navy-900`: suficiente para separar planos en pantallas
  de baja calidad, sin convertirse en una franja azul protagonista.
- `blue-600` comunica interacción, selección y foco.
- `yellow-400` identifica acciones principales y señales puntuales.
- Las superficies operativas usan neutros fríos para sostener densidad y lectura.
- La navegación no puede depender de `backdrop-filter` para separarse del fondo; la
  transparencia queda como mejora progresiva, no como fuente principal de contraste.
- El texto nunca depende de opacidad extrema sobre fotografía.
- Error y éxito conservan significado y no se reemplazan por colores de marca.

Pendiente: confirmar contraste con tipografía instalada y estados reales.
