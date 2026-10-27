# Validación de Foundation 0.4

La validación combina contrato estático, revisión visual y comportamiento. No sustituye
QA de producto ni depende de una stack futura.

## Gate local

1. Ejecutar `npm run tokens`.
2. Ejecutar `npm run validate`.
3. Revisar catálogo y superficies en la [matriz de viewports](viewports.md).
4. Recorrer la [matriz de estados](component-state-matrix.md).
5. Registrar regresiones en [regression-matrix.md].

Una evidencia identifica commit, navegador, viewport, estado y resultado. Capturas o
salidas temporales se guardan en `output/playwright/` y no forman parte del contrato.
Un patrón no se promueve por una única captura aprobada.
