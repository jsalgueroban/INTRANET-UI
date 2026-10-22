# Estado de adopción · Foundation 0.3

Última consolidación: 2026-10-21. Este registro indica qué puede reutilizarse y con qué
alcance; no afirma integración productiva ni aprobación de backend.

Estados: `approved` (regla estable del proyecto), `candidate` (evidencia repetida, gate
pendiente), `local-valid` (válido en su familia actual), `experimental` (prototipo
aislado), `legacy-tolerated` y `retired`.

| Patrón | Estado | Evidencia | Próximo gate |
| --- | --- | --- | --- |
| Azul profundo + amarillo de acción | `candidate` | Login e inicio | Contraste en superficie densa |
| Manrope + DM Sans | `candidate` | Login e inicio | Hosting y rendimiento |
| Acción hoja | `local-valid` | Hero y vacantes | Uso administrativo antes de promover |
| Flecha SVG diagonal | `candidate` | Inicio y pie | Iconografía completa |
| Shell de navegación | `candidate` | Inicio y Usuarios | Validación en pantallas físicas de baja calidad |
| Marca de cuenta recortada | `candidate` | Inicio y Usuarios | Perfil real y menú de cuenta |
| Bandeja de cuenta | `experimental` | Inicio y Usuarios | Destinos Perfil/Empresa, identidad real y tercera superficie |
| Señal lineal de estado | `experimental` | Usuarios | Más estados y contraste semántico |
| Selector de riel | `experimental` | Usuarios | Más filtros y contenido extremo |
| Input de login | `local-valid` | Login | Formularios operativos |
| Composición task-first | `candidate` | Login | Segunda superficie transaccional con contenido editorial |
| Scrim localizado sobre fotografía | `candidate` | Login | Validación sobre otra familia de imagen |
| Envío asíncrono | `candidate` | Login | Integración con autenticación real y error de red |
| Control compacto con hitbox amplia | `candidate` | Login | Reutilización en navegación y formularios operativos |
| Lockup producto + respaldo | `local-valid` | Login e inicio | Confirmar variantes claras y oscuras |
| Tabla/listado administrativo | `experimental` | Usuarios | Densidad, selección y responsive |
| Filtros compactos | `experimental` | Usuarios | Modelo y catálogos reales |
| Panel de detalle | `experimental` | Usuarios | Atributos y permisos reales |
| Fotografía documental | `candidate` | Login, inicio y pie | Gobierno de assets |
| Motion de feedback | `candidate` | Login, inicio y Usuarios | Validación operativa prolongada |
| Extrusión 3D como logotipo | `retired` | Exploración rechazada | No reabrir sin nuevo brief de identidad |
| Hub de plataformas con isotipo 3D | `experimental` | Inicio, física v19 | Catálogo real, SSO, permisos y segunda superficie |
| Navegación retráctil por tensión | `experimental` | Inicio | Validación física, zoom 200 % y segunda superficie |
| Foundation CSS compartida | `candidate` | Login, inicio, Usuarios y catálogo | Retirar aliases después de migrar CSS local |
| Catálogo de componentes | `local-valid` | `componentes.html` | Añadir estados busy, error e inversos |

Un patrón sólo pasa a `approved` cuando mantiene significado, estados, accesibilidad
y comportamiento en tipos de superficie diferentes.
