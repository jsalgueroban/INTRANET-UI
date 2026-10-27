# Contratos de interacción

Estos contratos describen comportamiento, no composición visual. Cada patrón declara
estado, evento, transición, interrupción, teclado, foco y alternativa con movimiento
reducido. Una vista puede componerlos; no debe redefinirlos localmente.

## Modelo común

`idle → intent → active → settled`. Una interrupción vuelve al último estado estable,
nunca a valores implícitos. El DOM mantiene el orden semántico durante la animación y
el foco sólo cambia por una acción explícita del usuario.

- [Navegación retráctil](navigation-shell.md)
- [Bandeja de cuenta](account-tray.md)
- [Hub de plataformas](platform-hub.md)
- [Respuesta asíncrona](async-feedback.md)

Todo patrón debe funcionar con puntero, teclado y `prefers-reduced-motion`. El motion
acompaña el cambio de estado; no es el único medio para comunicarlo.
