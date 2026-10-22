# Acción

Estado: `candidate`. Implementación de referencia: `assets/css/components.css`.

## Propósito

Comunicar una acción explícita. La variante primaria usa la forma de hoja sólo cuando
existe una acción dominante; no se emplea como decoración ni para acciones repetidas en
una tabla.

## Anatomía

- Etiqueta verbal breve.
- Área mínima de interacción de 44 × 44 px.
- Icono final opcional que refuerza dirección o resultado.
- La variante primaria integra una reserva visual para el icono, sin crear un círculo
  genérico separado.

## Estados

`default`, `hover`, `focus-visible`, `pressed`, `disabled` y `busy` cuando la acción
dispara un proceso asíncrono. `busy` conserva el ancho y evita envíos duplicados.

## Accesibilidad

La etiqueta visible nombra la acción. Un icono decorativo usa `aria-hidden="true"`.
El foco no depende del color y reduced motion elimina traslaciones.

## Promoción

Pasa a `approved` cuando se valide en una superficie editorial, una transaccional y
una densa sin perder jerarquía ni legibilidad.
