# Accesibilidad

Objetivo provisional: WCAG 2.2 AA.

- Objetivos interactivos de al menos 44 × 44 px cuando aplique interacción táctil.
- Foco visible mínimo de 2 px, contraste 3:1 y navegación completa con teclado.
- El orden DOM sigue la tarea. La posición visual no se corrige con `tabindex` positivo.
- Los controles compactos conservan un área interactiva efectiva de al menos 44 × 44 px
  sin necesidad de aumentar su texto o peso visual.
- Ningún estado depende exclusivamente del color.
- Labels visibles; placeholder no sustituye label.
- Errores asociados al campo y resumen cuando afecten múltiples controles.
- Listas densas conservan encabezados y alternativa móvil legible.
- Reduced motion y zoom al 200 % no eliminan información ni acciones.
- Una acción asíncrona anuncia su estado, evita reentrada y conserva datos corregibles.
- Un gesto de arrastre nunca es la única vía para una acción funcional. Clic y teclado
  conservan el acceso principal; lanzar u ocultar sólo aporta manipulación complementaria.
- Un objeto temporalmente oculto sale del orden de foco y recupera nombre, foco posible y
  semántica antes de volver a ser visible.
