# Envío asíncrono

Estado: `candidate`.

## Máquina de estados

`idle → submitting → success | recoverable-error`

## Contrato

- `idle`: acción disponible con verbo concreto.
- `submitting`: cambia a gerundio, muestra actividad, expone `aria-busy="true"`, bloquea
  la acción y contiene una guardia de reentrada independiente del estado visual.
- `success`: comunica el resultado funcional confirmado, no el transporte.
- `recoverable-error`: restaura la acción, conserva datos corregibles y explica cómo
  continuar; no usa apariencia de éxito.
- Loading de formulario no bloquea toda la ruta ni se confunde con carga inicial.
- Reduced motion conserva texto y estado aunque elimine la rotación del indicador.

## Pruebas mínimas

- Submit válido, doble activación rápida, Enter desde el último campo y error recuperable.
- Confirmar que sólo se inicia una operación y que los valores permanecen tras el error.
