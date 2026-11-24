# Clasificación de cabeceras de las vistas actuales

Corte: 2026-11-23. Fuente de inventario: archivos HTML en la raíz de INTRANET-UI-GitHub y subrutas React de assets/biometria/main.tsx. Contrato: [variantes de cabecera](patterns/page-header-variants.md).

La columna Variante indica el destino de diseño, no el aspecto actual ni una migración aplicada. La lectura de HTML/JS y contratos no certifica render, accesibilidad o publicación. No se recorrieron interfaces para esta consolidación documental. La implementación posterior se registra en la sección Adopción local; esta introducción describe el método de clasificación inicial.

| Vista / archivo | Variante definida | Razón |
| --- | --- | --- |
| `administrar-navegacion.html` | Azul | Administración del catálogo de accesos y su orden. |
| `administrar-salas.html` | Azul | Vista hermana operativa de Salas. |
| `aviso.html` | Clara | Detalle de una notificación. |
| `biblioteca-documental.html` | Azul | Gestión de documentos, audiencia y usos; distinta de la consulta de documentos publicados. |
| `biometria.html` | Azul | Familia operativa Biotime; incluye sus cinco vistas hermanas. |
| `busqueda.html` | Clara | Consulta transversal: el resultado domina; no constituye un módulo de gestión. |
| `canales.html` | Azul | Entrada al servicio de sugerencias y sus acciones. |
| `categorias-portada.html` | Azul | Administración de categorías y portada. |
| `componentes.html` | Catálogo / demo | Catálogo técnico: superficie de evidencia, no sección de producto. |
| `contenidos.html` | Azul | Espacio editorial de gestión: publicados, borradores, revisiones y retirados. |
| `data-list-demo.html` | Catálogo / demo | Demo de lista/detalle: conserva el alcance del ejemplo. |
| `documento.html` | Clara | Lectura de un documento individual. |
| `documentos.html` | Clara | Colección publicada para consulta; no administración de biblioteca. |
| `editar-contenido.html` | Clara | Edición de un borrador concreto. |
| `estructura.html` | Azul | Administración de la jerarquía organizacional. |
| `historial-editorial.html` | Clara | Historia de una revisión identificada; la pestaña Histórico de una bandeja no cambia por esta regla. |
| `index.html` | Acceso | Acceso: composición propia Living Archive; no se le impone la cabecera de módulo. |
| `informacion.html` | Clara | Lectura de información publicada. |
| `inicio.html` | Inicio general | Inicio general: composición propia Canopy Hub. |
| `login.html` | Acceso | Acceso: composición propia Living Archive. |
| `mis-reservas.html` | Azul | Vista hermana de Salas; seguimiento de solicitudes. |
| `navigation-demo.html` | Catálogo / demo | Demo de navegación: conserva el alcance del ejemplo. |
| `noticia.html` | Clara | Lectura de una publicación individual. |
| `noticias.html` | Clara | Colección editorial para lectura, sin función administrativa dominante. |
| `notificaciones.html` | Azul | Bandeja operativa de avisos, con estados de lectura. |
| `pendiente.html` | Clara | Revisión de una solicitud individual, diferenciada de la bandeja. |
| `pendientes.html` | Azul | Bandeja de trabajo y su histórico. |
| `perfil.html` | Clara | Ficha de la persona actual y preferencias; no administración de usuarios. |
| `permisos.html` | Azul | Administración de delegaciones y alcance. |
| `platform-demo.html` | Catálogo / demo | Demo de plataformas: conserva el alcance del ejemplo. |
| `recursos-contenido.html` | Clara | Adjuntos de un borrador identificado. |
| `recursos-globales.html` | Azul | Gestión transversal de archivos y sus usos. |
| `retiro-contenido.html` | Clara | Historia y retiro de una publicación identificada. |
| `roles.html` | Azul | Vista hermana de administración de acceso. |
| `salas.html` | Azul | Calendario operativo y entrada a la reserva. |
| `secciones.html` | Clara | Índice de información publicada para colaboradores. |
| `solicitar-reserva.html` | Clara | Tarea acotada; página directa y formulario flotante conservan cabecera clara. |
| `solicitudes-internas.html` | Azul | Bandeja del receptor de sugerencias. |
| `usuarios.html` | Azul | Administración de acceso; referencia seleccionada de composición. |
| `vacante.html` | Clara | Detalle de una oportunidad. |
| `vacantes.html` | Clara | Colección editorial de oportunidades; el filtro Histórico sigue siendo lectura. |
| `vista-previa.html` | Clara | Lectura y comprobación de un borrador identificado. |

## Acceso, inicio general y catálogo/demos

Estas categorías describen funciones concretas y contratos delimitados. No son excepciones libres al sistema visual ni variantes adicionales elegibles para cualquier vista.

| Categoría | Archivos | Composición que gobierna | Límites |
| --- | --- | --- | --- |
| Acceso | `index.html`, `login.html` | Living Archive: identidad, fotografía documental y formulario de autenticación; ver DESIGN.md | No reutilizar como cabecera de módulo ni como plantilla de pantallas internas |
| Inicio general | `inicio.html` | Canopy Hub: portada con noticias, recursos y accesos; ver DESIGN.md | Solo portada general; Inicio de Biotime sigue siendo azul como entrada a su módulo |
| Catálogo / demo | `componentes.html`, `data-list-demo.html`, `navigation-demo.html`, `platform-demo.html` | Contrato del componente o interacción demostrado y su estado de adopción | No establecen una cabecera de producto por repetición; un experimento debe estar identificado y aislado, y requiere selección y promoción antes de trasladarse al producto |

Las tres categorías conservan identidad Intranet/Banasan, tokens vigentes, tipografía, iconografía, componentes, accesibilidad y reglas responsive del sistema. La diferencia está en la composición documentada de su superficie, no en una licencia para cambiar sus fundamentos. Una nueva vista debe clasificarse por función; no puede declararse propia/demo para evitar las reglas azul/clara. Un cambio de composición de acceso o inicio requiere actualizar su contrato y decisión correspondiente.

## Subvistas y estados

| Familia / subvista | Variante | Razón |
| --- | --- | --- |
| Biotime: Inicio | Azul | Entrada al módulo operativo |
| Biotime: Marcaciones | Azul | Sección de consulta operativa |
| Biotime: Histórico por persona | Azul | Sección hermana estable, aunque incluya una persona |
| Biotime: Novedades | Azul | Gestión de casos |
| Biotime: Fuentes y dispositivos | Azul | Sección operativa sin CTA artificial |
| Contenidos: publicados, borradores, revisiones y retirados | Azul | Estados de la misma bandeja; la cabecera no cambia por filtro |
| Pendientes: por atender e histórico | Azul | Estados de una bandeja |
| Notificaciones: todas, leídas y no leídas | Azul | Estados de una bandeja |
| Vacantes: disponibles e histórico | Clara | Filtros de colección editorial |
| Perfil: información personal, empresa y preferencias | Clara | Secciones de la ficha personal |
| Formularios flotantes de reserva, sala, mantenimiento, usuario, rol, dependencia, acceso, categoría, sugerencia y delegación | Clara | Tarea acotada sobre un contexto existente |
| Panel de recurso, día de marcación o novedad | Clara | Detalle interno, sin segunda franja de módulo |
| Confirmaciones, avisos breves y menús | No aplica como cabecera de página | Conservan el contrato de su componente |

## Correspondencia pendiente

- Familia ya adoptada en el trabajo local del chat: Usuarios/Roles, Biotime y Salas. Esta mención conserva evidencia previa, no vuelve a certificarla.
- Revisar prioritariamente módulos que aún conservan encabezados simples: administración de navegación, biblioteca, categorías/portada, estructura, permisos, recursos globales, canales y bandejas.
- `pendiente.html` debe contrastarse con el destino claro: la familia puede tener tratamiento azul heredado. No extender automáticamente ese tratamiento al detalle.
- No recolorear colecciones editoriales por ser listados o entradas del menú.
- Las demos no generan tareas de migración de producto.

## Cobertura y método

42 archivos HTML clasificados una sola vez: 17 azules, 18 claros, 2 de acceso, 1 de inicio general y 4 de catálogo/demostración. Las cinco subvistas Biotime se desglosan además, sin contarlas como archivos adicionales. Un archivo nuevo requiere clasificación explícita.

Gobierno del slice: Product Design consolida criterio; UI Engineering separa decisión y adopción; Intranet identifica las dos fuentes locales; Dona conserva seguimiento. Delegación evaluada: SELF, inventario documental con contexto compartido y sin beneficio independiente de dividirlo. No se modifican interfaces ni se realizan pruebas de UI para esta entrega.


## Adopción local · 2026-11-23

Aplicación autorizada posterior a la clasificación: las 11 cabeceras azules pendientes y las 18 claras ya usan la variante correspondiente en INTRANET-UI-GitHub. Las otras seis vistas/archivos de módulo tenían adopción previa (Usuarios, Roles, Biotime y las tres de Salas). Las cinco secciones internas de Biotime conservan su patrón.

Se reutiliza workspace-heading.css. Las vistas azules sin navegación de familia usan la composición sin pestañas; los filtros de estado siguen siendo filtros y conservan su comportamiento. Se trasladaron los mismos disparadores de Nueva entrada y Escribir sugerencia a la cabecera, manteniendo hooks y permisos. Acciones de alcance local, como delegación condicionada por perfil o categorías, conservan su contexto.

Acceso (2), Inicio general (1) y Catálogo/demos (4): siete archivos intactos, comprobados por hash. La adopción es local y no afirma publicación ni certificación integral de accesibilidad.

Verificación de esta entrega: 29 rutas a 1280 px y 390 px sin overflow; lectura de registros reales de demostración desde Noticias, Documentos, Secciones, Vacantes y Pendientes; apertura/Escape en Navegación, Biblioteca, Canales y Estructura. Sin excepciones JavaScript en esos recorridos. Informe detallado en docs/header-adoption-verification.md del checkout INTRANET-UI-GitHub.
