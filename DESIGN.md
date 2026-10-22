# Sistema UI/UX — Intranet Banasan

Estado: `foundation-0.3`. Este documento es la constitución
visual del producto. No es un catálogo de pantallas ni un inventario de CSS.

## Autoridad y alcance

Este archivo gobierna los principios y la dirección vigente. Los valores concretos
viven en `design-system/tokens/`; la adopción de componentes y patrones se consulta en
`design-system/status.md`; las decisiones materiales se indexan en
`design-system/decisions/README.md`.

Orden de autoridad: `DESIGN.md` → foundations y tokens → componentes y patrones → ADR
vigentes → implementación. Una contradicción se resuelve actualizando
la capa superior y marcando la decisión anterior como reemplazada; no por antigüedad ni
por repetición en CSS.

## Propósito

La Intranet es una herramienta de trabajo para colaboradores Banasan. Debe sentirse
clara, confiable, contemporánea y cercana a la operación real. Banasan es la marca
madre; `Intranet` nombra el producto y ocupa la primera jerarquía en la interfaz.

## Principios

1. **Trabajo antes que ornamento.** La tarea y el estado dominan la composición.
2. **Marca por sistema.** Color, fotografía, tipografía, forma y ritmo expresan Banasan.
3. **Densidad legible.** Mucha información no obliga a una cuadrícula de cards.
4. **Natural y preciso.** La fotografía conserva su color; el azul estructura y el amarillo orienta.
5. **Movimiento con propósito.** Motion comunica continuidad, estado o respuesta.
6. **Accesibilidad inherente.** Teclado, foco, contraste y reduced motion son parte del diseño.
7. **Contenido directo.** Títulos y acciones dicen qué son y adónde llevan.

## Personalidad visual

- Azul profundo institucional, superficies claras y amarillo reservado para acción.
- Manrope aporta carácter a titulares; DM Sans resuelve interfaz y lectura.
- Formas diagonales inspiradas en la hoja aparecen en acciones principales y fotografía.
- Líneas, espacio y contraste organizan antes que sombra, bordes o tarjetas.
- La fotografía agrícola es documental y luminosa, nunca un fondo azul uniforme.

## Jerarquía de identidad

`Banasan respalda → Intranet identifica → la tarea domina → la imagen acompaña`.
La firma institucional y el lockup conservan el símbolo plano. La extrusión 3D usada
como sustituto del logotipo fue rechazada. El isotipo 3D sí puede existir como objeto
interactivo del hub de plataformas: es una función local, no una nueva firma de marca.
El navegador usa `simbolo-banasan.svg` y el título `Intranet`.

## Lenguaje de interacción

- Respuesta frecuente: 140–180 ms.
- Cambio de panel o entrada editorial: 220–320 ms.
- `cubic-bezier(.23,1,.32,1)` como curva expresiva base.
- Transform y opacity son las propiedades preferidas.
- Inputs, escritura y foco no reciben animación ornamental.
- `prefers-reduced-motion` elimina traslaciones y conserva todas las señales.

La cuenta se trata como un pequeño sistema de navegación, no como un avatar que lleva
a una única pantalla. Su patrón vigente es la [bandeja de cuenta](design-system/patterns/account-tray.md):
popover anclado en escritorio y bandeja inferior en móvil.

## Reglas de composición

- La retícula vive en [`foundations/layout-spacing.md`](design-system/foundations/layout-spacing.md).
- Los valores cromáticos y tipográficos viven en tokens, no en esta constitución.
- Una pantalla compone primitives, compounds y patterns; no crea estándares por repetición accidental.
- Las cards son una herramienta, no la arquitectura predeterminada.
- No se usan eyebrows cuando repiten el título inmediatamente siguiente.
- En superficies transaccionales, la tarea conserva más jerarquía que el contenido editorial.
- Sobre fotografía, el contraste se corrige en el área del contenido antes de alterar toda la imagen.

## Gobierno

Todo patrón se clasifica como `local-valid`, `candidate`, `approved`,
`legacy-tolerated` o `retired`. La promoción requiere propósito estable, estados,
accesibilidad y evidencia en contextos diferentes. El estado vigente se consulta en
[`design-system/status.md`](design-system/status.md).

## Foundation 0.3

Foundation 0.3 consolida decisiones observadas en login, inicio y administración de
usuarios sin declarar terminado el sistema. Introduce una capa CSS compartida para
foundations y componentes candidatos; las pantallas conservan composición y features.
Mantiene patrones en evaluación con criterios explícitos.

- [Color](design-system/foundations/color.md)
- [Tipografía](design-system/foundations/typography.md)
- [Retícula y espaciado](design-system/foundations/layout-spacing.md)
- [Forma, elevación y motion](design-system/foundations/shape-motion.md)
- [Accesibilidad](design-system/foundations/accessibility.md)
- [Tokens](design-system/tokens)
- [Componentes](design-system/components/README.md)
- [Patrones](design-system/patterns/README.md)
- [Contenido](design-system/content/voice-and-tone.md)
- [Mapa del sistema](design-system/README.md)
- [Registro de decisiones](design-system/decisions/README.md)

## Dirección y evidencia

`Living Archive` define el login y `Canopy Hub` extiende la dirección al inicio. La
administración de usuarios es la primera superficie operativa de validación. Esas
composiciones son evidencia; no son por sí mismas el sistema.

## Decisiones abiertas

- Hosting definitivo de Manrope y DM Sans.
- Modelo, atributos, estados, roles y permisos de usuario.
- Contrato gRPC, paginación y semántica de errores.
- Promoción de primitives después de validar la superficie administrativa.
- Estados reales conectados a servicios.
- Catálogo, URLs, SSO y permisos del hub de plataformas.
- Persistencia y alcance por vista/dispositivo de la navegación retráctil.
- Validación física del shell y los gestos con zoom al 200 %.
