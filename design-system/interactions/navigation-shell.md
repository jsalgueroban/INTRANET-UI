# Navegación retráctil

Estados: `expanded`, `dragging`, `settling`, `collapsed`. Eventos: arrastre vertical del
tirador, activación por teclado, cambio de viewport y cancelación.

- Sólo el tirador inicia el gesto; los enlaces conservan su comportamiento.
- El desplazamiento se calcula desde el estado actual, sin reiniciar la transición.
- Al cruzar el umbral, el shell se recoge y deja visible el lockup y su tirador.
- El tirador continúa operable cuando está recogido.
- `Escape` cancela el gesto; `Enter` y `Space` alternan el estado.
- Al perder captura de puntero se resuelve al estado estable más cercano.
- Reduced motion aplica el estado final sin rebote ni arrastre interpolado.

Invariante: nunca puede quedar una franja vacía ni contenido interactivo oculto con foco.
