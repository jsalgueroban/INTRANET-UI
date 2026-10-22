# Navegación retráctil por tensión

Estado: `experimental`.

## Propósito

Reducir la ocupación permanente del shell global en superficies inmersivas sin eliminar
su punto de recuperación ni depender de ocultamiento automático por scroll.

## Contrato

- El gesto nace únicamente en el agarre central; no secuestra el scroll del documento.
- Un desplazamiento menor al umbral regresa al estado abierto.
- Al superar 44 px, la liberación retira por completo la barra horizontal y deja visible
  únicamente el borde inferior de la tarjeta central. El hitbox de recuperación puede
  extenderse sin crear otra superficie visible.
- La pestaña visible recupera el menú con clic, `Enter`, `Space` o `ArrowDown`.
- La pestaña visible también funciona como agarre: al arrastrarla hacia abajo, el shell
  reaparece siguiendo el puntero. Superar el mismo umbral abre; soltar antes lo recoge.
- `ArrowUp` permite recogerlo sin gesto.
- Los enlaces ocultos pierden interacción de puntero; el control de recuperación conserva
  foco y nombre accesible mediante `aria-expanded`.
- El patrón se desactiva bajo 861 px, donde el menú móvil tiene composición propia.
- `prefers-reduced-motion` conserva el cambio de estado sin elongación ni rebote.

## Límites

- No se activa automáticamente por scroll.
- No persiste la preferencia entre sesiones hasta definir si el estado pertenece al usuario,
  a la vista o al dispositivo.
- Debe validarse en una segunda superficie antes de pasar a `candidate`.
