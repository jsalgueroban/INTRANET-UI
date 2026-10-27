# Contrato visual del proyecto

Versión: Foundation 0.4. Producto: Intranet Banasan. Plataforma: web responsive.

## Autoridad

La dirección visual vigente se define en DESIGN.md. Los tokens JSON son la fuente de
valores y generan assets/css/tokens.css. Este contrato gobierna el consumo; las
pantallas aportan evidencia, pero no crean estándares por repetición.

Modo visual: redesign-in-progress. Modo de trabajo vigente: evolve + improve.
Owner de decisión y aprobación: responsable del producto Intranet Banasan.

## Plataformas y matriz base

| Familia | Viewport de evidencia | Entrada |
| --- | --- | --- |
| Móvil mínimo | 375 × 667 | táctil |
| Móvil moderno | 390 × 844 | táctil |
| Tablet | 768 × 1024 | táctil y teclado |
| Escritorio | 1280 × 800 | teclado y puntero |
| Escritorio amplio | 1440 × 900 | teclado y puntero |
| Pantalla amplia | 1920 × 1080 | teclado y puntero |

El contenido usa un ancho máximo de 1240 px y gutters fluidos. Una pantalla amplia no
estira indefinidamente el contenido. Móvil, tablet y escritorio deben conservar la misma
tarea, contenido y control aunque cambie la composición.

## Compatibilidad

- Navegadores corporativos basados en Chromium con soporte vigente.
- Navegación completa por teclado, foco visible y zoom al 200 %.
- Puntero fino y táctil con hitbox mínima de 44 × 44 px.
- prefers-reduced-motion elimina desplazamiento ornamental sin ocultar estado.
- La ausencia de efectos avanzados conserva controles y destinos equivalentes.

## Capas

tokens → primitives → compounds → feature → pantalla.

Foundations y componentes compartidos no contienen datos, permisos, fetch, contratos
gRPC ni mensajes de negocio. Las features traducen esos contratos a estados de UI.

## Evidencia de promoción

Un elemento pasa a approved cuando tiene responsabilidad estable, estados aplicables,
teclado, foco, responsive, contraste, consumidores reales y evidencia reproducible. Lo
que no cumpla permanece candidate, local-valid o experimental.

## Cambios

Una desviación se clasifica como bug, decision-required o change-accepted.
Todo cambio aceptado actualiza este contrato, los tokens o la ficha correspondiente y
la matriz de validación del slice.
