# Componentes

La Foundation 0.4 consolida la implementación compartida sin declarar todavía primitives
aprobados. Los estilos de referencia viven en `assets/css/components.css`; cada ficha
define propósito, contrato, estados, accesibilidad y criterio de promoción.

- [Acción](action.md)
- [Acción de icono](icon-action.md)
- [Lockup de producto](product-lockup.md)
- [Marca de cuenta](account-mark.md)
- [Señal de estado](state-mark.md)
- [Campo de formulario](form-field.md)
- [Estado de superficie](feedback-state.md)

| Componente | Estado | Frontera |
| --- | --- | --- |
| Button regular | `candidate` | Acción textual general |
| Button hoja | `local-valid` | CTA principal de alta jerarquía |
| Icon button | `candidate` | Acción única con nombre accesible |
| Input / Checkbox | `local-valid` | Probados sólo en login |
| Async submit button | `candidate` | Acción de formulario con idle, submitting, success y error recuperable |
| Compact action | `candidate` | Control visualmente discreto con hitbox efectiva mínima de 44 × 44 px |
| Endorsement lockup | `local-valid` | Producto y marca madre con jerarquía distinta, pero legibilidad equivalente |
| Shell de navegación | `candidate` | Navegación global responsive |
| Account mark | `candidate` | Acceso al contexto de cuenta; reemplaza avatar circular genérico |
| Account tray | `experimental` | Navegación Perfil, Empresa y Gestión de usuarios; no define identidad ni permisos |
| State mark | `experimental` | Estado textual con señal lineal, sin badge o chip |
| Filter rail | `experimental` | Selección entre subconjuntos, sin segmented pills |
| Data list / tabla | `experimental` | Administración de usuarios |
| Filtros | `experimental` | Administración de usuarios |
| Panel de detalle | `experimental` | No define modelo de usuario |
| Platform launcher | `experimental` | Disparador 3D local; menú y destinos permanecen en DOM y datos separados |
| Navigation pull handle | `experimental` | Control gestual y de teclado para recoger o recuperar el shell |

Cada ficha futura debe incluir propósito, anatomía, variantes, estados, teclado,
responsive, contenido, accesibilidad y criterio de promoción.
