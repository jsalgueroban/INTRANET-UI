# Mapa del sistema de diseño

Versión: `foundation-0.3`. Modo visual: `selected-direction / redesign-in-progress`.
Plataforma: Web. Producto: Intranet Banasan.

## Cómo leer el sistema

1. [`../DESIGN.md`](../DESIGN.md): principios, identidad y reglas constitucionales.
2. [`foundations/`](foundations): color, tipografía, retícula, forma, motion y accesibilidad.
3. [`tokens/`](tokens): valores primitivos, roles semánticos y decisiones de componente.
4. [`components/README.md`](components/README.md): piezas y estado de adopción.
5. [`patterns/README.md`](patterns/README.md): comportamientos y composiciones documentadas.
6. [`content/voice-and-tone.md`](content/voice-and-tone.md): reglas de contenido visible.
7. [`status.md`](status.md): qué puede reutilizarse hoy y qué gate falta.
8. [`decisions/README.md`](decisions/README.md): decisiones vigentes, reemplazadas y abiertas.

La implementación compartida se divide en `assets/css/foundation.css` para el contrato
base y `assets/css/components.css` para componentes reutilizables. Los CSS de pantalla
componen esas piezas y conservan únicamente decisiones locales.

## Capas y autoridad

`tokens → primitives → compounds → feature → pantalla`.

- Una pantalla aporta evidencia; no crea un estándar automáticamente.
- Un run explica cómo se llegó a una decisión; no gobierna por encima de `DESIGN.md`.
- Un patrón experimental permanece aislado aunque su implementación sea funcional.
- Datos, permisos, gRPC, fetch y reglas de negocio no viven en foundations, primitives ni
  compounds.

## Superficies de evidencia

| Superficie | Papel | Estado |
| --- | --- | --- |
| Login | Identidad, tarea principal y estados de autenticación | Dirección seleccionada; integración pendiente |
| Inicio | Narrativa, shell, contenido editorial y accesos | Propuesta navegable |
| Administración de usuarios | Densidad, búsqueda, selección y detalle | Superficie de prueba sin contrato de usuario |

## Regla de consolidación

Una corrección local actualiza primero su patrón o componente. Sólo cambia una foundation
cuando existe evidencia en más de una familia o una decisión explícita del owner. Toda
promoción registra estado anterior, evidencia, gate satisfecho y consumidores afectados.

## Límites actuales

- No existe librería productiva derivada de esta propuesta.
- No existe modelo de usuario ni contrato gRPC aprobado.
- Los destinos de navegación y plataformas internas continúan demostrativos.
- `approved` describe estabilidad dentro de la propuesta; no equivale a publicado.
