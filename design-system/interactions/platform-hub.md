# Hub de plataformas

Estados de menú: `closed`, `opening`, `open`, `closing`. Estados del objeto: `resting`,
`held`, `thrown`, `returning`, `temporarily-hidden`.

- Click o teclado abre los accesos; el arrastre no activa el menú accidentalmente.
- Un único puntero puede poseer el objeto. La nueva captura cancela de forma limpia
  cualquier retorno o animación ambiental.
- Al soltar, velocidad y dirección determinan rebote o retorno. Hacia abajo puede quedar
  oculto temporalmente y volver a su ancla.
- Los accesos mantienen separación, orden DOM y hitbox mínima; nunca se superponen.
- Las animaciones ambientales sólo empiezan en `resting` y terminan en el mismo valor
  visual para evitar saltos entre ciclos.
- `Escape` cierra los accesos. Reduced motion elimina ambientación, lanzamiento y rebote.

El isotipo 3D es un disparador funcional local; no sustituye la firma corporativa.
