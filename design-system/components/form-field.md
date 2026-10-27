# Campo de formulario

Estado: `candidate`.

## Propósito

Capturar o buscar datos con una relación inequívoca entre etiqueta, control, ayuda y
error. El placeholder nunca sustituye la etiqueta.

## Anatomía y estados

`label → control → ayuda o error`. Estados: `idle`, `hover`, `focus-visible`, `filled`,
`invalid`, `disabled` y `readonly`. El error usa texto y color; el foco siempre conserva
su anillo. Los iconos son opcionales y no reducen el área editable.

## Contrato

- Altura mínima: token `input.height`.
- La etiqueta visible referencia el control mediante `for`/`id`.
- `aria-describedby` conecta ayuda o error; `aria-invalid` declara el fallo.
- El bloqueo asíncrono no borra el valor ni mueve el foco.
- En móvil ocupa el ancho disponible; no reduce texto por debajo de 16 px.

## Promoción

Requiere evidencia en autenticación, búsqueda y un formulario operativo.
