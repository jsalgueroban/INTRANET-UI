# Revisión visual de empresas · 2026-11-23

Estado: implementación de propuesta local para revisión; temas candidatos no consolidados. Entrada: temas-empresa.html. No modifica la librería ni publica paquetes.

## Implementación

React con CompanyPicker, ThemeProvider, Button, campos y PaginatedTable reales de @banasandev/intranet-ui. Panel flotante compartido mediante FloatingForm. Seis presets de consumidor en assets/company-theme/themes.ts; cinco logos originales copiados sin alteración y logo Banasan existente.

Selector visible junto a navegación, nombre y logo, selección provisional y confirmación; Cancelar/Escape conserva tema y retorna foco. Los cambios son inmediatos tras confirmar y se recuerdan por sessionStorage en esta pestaña. No sincroniza otras pestañas. La empresa de revisión no cambia identidad de sesión, permisos ni datos de demostración; se comunica en el selector y en la página de muestras.

El cargador en site-header.js monta una isla React en las vistas de trabajo. Propaga roles semánticos al documento y a proveedores React; adapta los literales heredados de navegación y los logos. La misma herencia alcanza los diálogos adjuntos a body. No se afirma que cada literal de color histórico haya sido migrado: es una capa de revisión visual reemplazable.

Acceso, Inicio general y demos quedan fuera del cargador; sus siete archivos conservan los hashes previos. Sus composiciones no se transforman por esta revisión. La nueva página temas-empresa es una superficie de evaluación identificada, no otra cabecera normativa.

## Verificación

- Build con esbuild usando las dependencias existentes del workspace; formato con Prettier y git diff --check.
- Seis selecciones verificadas: cambia el preset y el logo; estado de éxito permanece rgb(23,107,73).
- Selección provisional seguida de Cancelar conserva La Ceiba y devuelve foco al disparador.
- Tema persiste al pasar a Salas; su formulario flotante usa el mismo acento y no desborda.
- Revisión a 1280 px y 390 px; selector desplazable y muestra sin overflow horizontal. Assets originales preservan proporciones.
- Tras añadir favicon, recarga sin errores de consola. No certifica accesibilidad integral, todas las vistas heredadas o contexto empresarial real.

## Pendientes de consolidación

Selección visual de los seis presets, hover/foco/disabled en todos los consumidores, versiones de marca compactas aprobadas y contrato real de empresas autorizadas. La persistencia, sincronización entre pestañas, permisos, cancelación de consultas y tratamiento de cambios de datos sin guardar pertenecen a una implementación de contexto real separada.

La decisión azul/clara de cabeceras sigue vigente. Esta revisión prueba sustituir el azul de Banasan por el tono institucional de otra empresa dentro de la misma composición, sin consolidar aún esa evolución del contrato.

Skills: Banasan Product Design (direcciones candidatas), UI Engineering y Frontend (reutilización), Intranet (fuentes), Visual QA (recorridos y muestras), Dona (seguimiento). SELF: isla de propuesta con contexto compartido; sin beneficio independiente de delegación. Sin modificación de API pública, backend o librería.


## Logos vectorizados · 2026-11-23

Los cinco PNG aportados se trazaron a SVG reales de color mediante vtracer, sin imágenes raster incrustadas. Se conservan dimensiones/viewBox y proporciones originales. Silueta de transparencia trazada desde alfa; fondo exterior transparente comprobado al renderizar. Se compararon original y vector sobre damero; degradados y fotografía se aproximan mediante trazados, especialmente el banano de La Ceiba. No se presentan como archivos maestros oficiales de marca.

Selector actualizado a los cinco SVG; Banasan conserva su SVG original. Informe técnico: logo-vectorization-report.json. Comparación: output/logo-review/index.html; entrega: output/logo-review/logos-svg.zip. Herramienta ejecutada en Python 3.11 aislado por incompatibilidad nativa del binding con Python 3.14 del host. Sin cambios al paquete.


## Tamaño y alineación de marcas · 2026-11-23

Versiones de presentación *-display.svg con viewport ajustado al dibujo y margen del 1%; no se alteran trazados, colores ni SVG originales. Se verificó igualdad de atributos de todos los paths en las seis marcas. Selector: columna de marca de 160 × 60 px en escritorio y 110 × 50 px en móvil; alineación central independiente del largo del nombre. Disparador: 96 × 38 px / 92 × 36 px. Cabecera: 120 × 36 px en escritorio y 100 × 28 px en móvil. object-fit contain, sin padding ni fondos en logos. No implica estirar todos los dibujos al mismo ancho/alto: cada uno conserva su proporción dentro del espacio compartido.

Cabecera móvil enlazada al tema activo igual que escritorio; observación del shell real para conservar marca ante recomposición. Revisión renderizada a 1280 y 390 px, seis logos del selector con fondo transparente y sin overflow; build y diff correctos. Informe de viewports: company-logo-presentation.json.


## Revisión de contraste logo/superficie · 2026-11-24

Restricción explícita del usuario: Banasan conserva sus colores definidos (#031D36 / #FFD000). No participa en alternativas ni cambios de superficie de esta revisión. La comparación se oculta en Banasan y el modo efectivo vuelve a current incluso si otra empresa estaba en modo contrastado.

Hallazgo: la evaluación anterior comparaba texto blanco/base y texto oscuro/acento; no medía colores del propio logo sobre el fondo. El verde oscuro de La Ceiba se confunde con su base, y El Rubí presenta un conflicto parecido. BanaOrgánico combina letras negras y verdes que necesitan separación. Agrobanano, por el contrario, tiene trazos luminosos que se leen mejor sobre oscuro. No hay una receta uniforme basada solo en el color predominante.

La página de revisión incorpora comparación actual/propuesta y un control para probar únicamente la superficie de navegación. Candidatos: clara neutra #F8FAF5 con texto #17261F para El Rubí, BanaOrgánico, Agrobanacaribe y La Ceiba; oscura neutra #14291E con texto blanco para Agrobanano. La cabecera de módulo mantiene la paleta candidata existente. Los SVG y sus fondos transparentes no cambian; no se añaden placas detrás de imágenes. Los valores y alternativas siguen pendientes de selección, no se aplican automáticamente al resto de vistas.

Verificación: build correcto; transición Agrobanano -> Banasan conserva exactamente colores Banasan, retira comparación y evita aplicar superficie alternativa. No se promueve una nueva paleta. La revisión de acceso, foco, hover y menú en móvil forma parte de la selección visual pendiente.


## El Rubí · navegación clara aplicada · 2026-11-24

Autorización explícita del usuario tras revisar el logo sobre verde. El Rubí aplica navegación y lockup claros #F8FAF5 con texto #17261F en todas las vistas de trabajo tematizadas. El SVG permanece transparente y con sus colores. La cabecera de módulo conserva #005236; el acento no cambia. Comparación anterior conservada como referencia, controles experimentales retirados para esta empresa. Se comprobó persistencia al navegar a Salas y regreso a Banasan con #031D36 / #FFD000 intactos. Las otras empresas conservan sus candidatos y alternativas pendientes; no se adopta automáticamente este tratamiento para ellas.

## Selector integrado en la propuesta · 2026-11-24

El cambio de empresa se abre desde el logo y su flecha en la cabecera de escritorio y móvil, y desde «Cambiar empresa» en la cuenta. Reutiliza CompanyPicker, ThemeProvider y el panel compartido; se elimina el control flotante de revisión. Confirmar actualiza logo y tema; cancelar conserva la empresa actual. La selección persiste por pestaña al navegar.

Inicio general incorpora el control en su cabecera compartida conservando su composición. Acceso y demos continúan fuera de la tematización. Este selector representa contexto visual de la propuesta; no cambia datos ni permisos. El Rubí conserva navegación clara y Banasan mantiene #031D36 / #FFD000.

Validación en navegador a 1280 y 390 px: apertura desde cabecera y cuenta, confirmación, Escape, persistencia Inicio → Salas, sin desbordamiento horizontal. El panel abierto impide el autoocultamiento de navegación para conservar acceso y foco. Build correcto y git diff --check sin errores.

## Conexión completa del tema · 2026-11-24

Modo: evolve / design-adaptation. SELF: slice transversal con contexto local compartido; sin beneficio de delegación independiente. Skills: Banasan Intranet, Frontend, UI Engineering y Software Delivery; Dona para seguimiento. Consulta de propuesta/librería en modo consumo; no se modifica ni publica el paquete React.

Las 37 vistas de la propuesta con contexto de empresa consumen ahora los roles de marca: base, acción, acento, superficie suave, foco y variantes con transparencia. Se conectaron tokens canónicos, alias locales, literales de CSS, estilos embebidos y los bundles de componentes React. Inicio conserva composición; recibe colores de marca y logo del pie. Acceso y las cuatro demos mantienen su composición y apariencia independiente; los fallbacks conservan sus valores originales.

Implementación: assets/company-theme/color-roles.ts registra el mapa auditado. scripts/company-theme-colors.mjs conecta literales a variables con fallback exacto; scripts/connect-company-colors.mjs permite repetir la migración. Los builds de Biotime y selector aplican el puente a su CSS generado para evitar regresiones al reconstruir. Para nuevas decisiones de paleta se edita themes.ts; para nuevos literales heredados se revisa y amplía el mapa, sin convertir colores de estado ni neutrales en colores de empresa.

Banasan elimina los overrides del puente y conserva los valores originales. El Rubí mantiene navegación clara. Las otras paletas siguen siendo candidatas visuales. Se usa texto oscuro neutro sobre los acentos de otras empresas para mantener legibilidad. Éxito #176B49, advertencia #8B6A00 y error #B42318 no cambian. No se modifican datos ni permisos.

Evidencia: 37/37 vistas a 390 px sin overflow y sin fondos Banasan residuales en main tras completar transiciones; cero errores JS en el recorrido. Seis empresas comprobadas en Salas a 1280 px: fondo de acción coincide con su acento y estados semánticos idénticos. Biotime verificado a 1280/390; panel de reserva móvil abre, hereda foco y botón de empresa. Capturas revisadas de Salas y formulario. Builds de ambos bundles correctos; migración idempotente; git diff --check sin errores. Revisión local, sin publicar.


## Entrega · 2026-11-24

Publicación autorizada por el usuario en GitHub. Se entrega la propuesta y su documentación para revisión; no se consolidan paletas ni se publica un paquete. Contrato y matriz de cabeceras incluidos en docs/design-system.

## Corrección de profundidad tonal · 2026-11-24

Se corrige el aplanamiento de marca: los literales navy 900/800/700 y variantes ya no apuntan todos a la misma base. Se conserva base profunda y se derivan niveles intermedios/elevados con mezclas de blanco (8–22%); el nivel más profundo usa negro 12%. Las transparencias mantienen su alfa sobre cada nivel. El acento de hover también conserva una variante más clara. Banasan sigue usando exactamente los fallbacks originales; El Rubí mantiene su navegación clara. Corrección de consumidor, sin modificar la librería ni la composición.

Verificación local: en las seis empresas Vacantes internas y footer tienen fondos distintos; Banasan mantiene rgb(3,29,54) y rgb(5,43,81). Escala 700/800/900 distinta para las otras cinco. Inicio a 1280 y 390 sin overflow horizontal. Captura renderizada revisada. Build correcto. Publicación pendiente de esta corrección.

## Marca como enlace a Inicio · 2026-11-24

Por instrucción del usuario, la marca completa en cabecera de escritorio y móvil es un único enlace a Inicio. Se retiran el botón de empresa y su flecha. Cuenta → Empresa navega a Perfil, sin interceptar para abrir un modal. Perfil → Empresa contiene la empresa activa y la acción Cambiar empresa que reutiliza CompanyPicker y el panel compartido; sustituye el selector antiguo de dos empresas de ejemplo. Se retira la carga del script antiguo del perfil.

Probados cambio a Agrobanano desde Perfil, persistencia, apertura/Escape y navegación por marca en escritorio/móvil; cero selectores en cabecera, sin overflow y sin errores JS en recorrido final. Build y diff correctos. Cambio local sin publicar, junto a la corrección tonal anterior.

Corrección adicional: el estilo del nuevo enlace sobrescribía display:none de la marca móvil y la mostraba también en escritorio. Se retira ese display genérico. Verificado a 1462/1280/390: exactamente una marca visible, central en escritorio y móvil en su breakpoint, sin overflow. Sin publicar.
