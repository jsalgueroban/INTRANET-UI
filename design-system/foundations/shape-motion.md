# Forma, elevación y motion

- Control regular: `10–12px`.
- Superficie: `16–24px`.
- Acción hoja: `22px 8px 22px 8px`, estado `local-valid`.
- Círculo se reserva para icon-only, avatar o estado puntual.
- `level-1` separa del fondo; `level-2` se reserva para navegación y panel temporal.
- Press: `140ms`; feedback: `160–180ms`; panel: `260ms`.
- Curva: `cubic-bezier(.23,1,.32,1)`.
- Reduced motion: sin desplazamiento ni parallax.

## Continuidad de interacción

- Una transición frecuente o reversible debe poder interrumpirse sin reiniciar desde un
  estado visual ajeno. Posición, velocidad y estado final tienen una sola autoridad.
- Los gestos dinámicos pueden usar física propia, pero deben acotar velocidad, límites y
  tiempo de reposo. El rebote visible se reserva para objetos expresivos o descarte.
- Capturar nuevamente un objeto cancela frame y temporizador anteriores de forma atómica;
  el nuevo gesto comienza en la posición renderizada, no en su anclaje original.
- Animaciones ambientales son breves, no consecutivas, pausables y nunca bloquean tarea,
  foco ni lectura.
- Reduced motion conserva la señal y el resultado; elimina inercia, parallax y rebote.
