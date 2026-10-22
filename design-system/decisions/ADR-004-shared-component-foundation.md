# ADR-004 · Fundación compartida de componentes

Fecha: 2026-10-21. Estado: aceptada para la propuesta; promoción productiva pendiente.

## Contexto

Login, inicio y administración de usuarios ya comparten decisiones de color,
tipografía, acciones, identidad y estados. Esas decisiones estaban repetidas en CSS de
pantalla y podían divergir al crecer el prototipo.

## Decisión

Separar la implementación activa en cinco capas:

1. `foundation.css`: tokens semánticos, reset, foco y reduced motion.
2. `components.css`: componentes visuales sin datos, permisos ni navegación.
3. CSS de pantalla: composición, responsive y features locales.
4. `design-system/components/`: contrato y gate de cada componente.
5. `componentes.html`: superficie interna de comparación y regresión.

Los aliases históricos se conservan temporalmente para migrar sin alterar las tres
superficies. No se crea un framework ni un paquete antes de confirmar consumidores,
stack productivo y estrategia de distribución.

## Consecuencias

- Una corrección compartida deja de depender de copiar CSS entre pantallas.
- Las pantallas históricas pueden migrarse de forma incremental.
- `runs`, `alternativas` y `output` conservan evidencia pero no gobiernan código nuevo.
- El hub 3D, la navegación retráctil y la bandeja de cuenta permanecen patterns o
  compounds experimentales; no se convierten en primitives.

## Rollback

Retirar las hojas compartidas de los HTML y conservar los CSS de pantalla. No se
alteraron datos, contratos ni rutas productivas.
