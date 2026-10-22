# Acción de icono

Estado: `candidate`. Implementación de referencia: `assets/css/components.css`.

## Propósito

Resolver una única acción reconocible cuando el texto visible degradaría la lectura,
por ejemplo abrir un detalle o avanzar a un recurso relacionado.

## Contrato

- Hitbox mínima de 44 × 44 px aunque el trazo visible sea menor.
- `aria-label` obligatorio cuando no existe texto cercano que nombre la acción.
- Un único SVG lineal de 16 px; no mezclar caracteres Unicode con la familia de iconos.
- No representa estado ni sustituye una acción primaria.

## Estados

`default`, `hover`, `focus-visible`, `pressed` y `disabled`.

## Promoción

Requiere completar la familia mínima de iconos y validar contraste en superficies clara
e inversa.
