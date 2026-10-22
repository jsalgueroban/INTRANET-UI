# Scrim localizado sobre fotografía

Estado: `candidate`.

## Propósito

Estabilizar la legibilidad del contenido sobre una imagen irregular sin convertir toda la
fotografía en una superficie azul u oscura.

## Contrato

- El scrim se limita al área de lectura y desvanece sus bordes.
- Su intensidad se decide por contraste del texto, no por decoración.
- La fotografía conserva color y detalle fuera del bloque de contenido.
- No sustituye una selección de imagen adecuada ni habilita texto sobre cualquier recorte.
- Texto normal mantiene 4.5:1 y texto grande 3:1 en los recortes soportados.
- En responsive se recalcula posición, recorte y dirección del gradiente.

## Evitar

- Oscurecer toda la imagen para resolver un bloque pequeño.
- Depender sólo de `text-shadow` sobre fondos de luminancia variable.
- Dibujar una tarjeta opaca cuando el contenido debe seguir perteneciendo a la escena.
