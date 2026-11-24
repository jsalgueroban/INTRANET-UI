# Cambio de empresa y temas de identidad · Intranet

Estado: propuesta, 2026-11-23. Modo: explore de identidad por empresa y contrato de interacción; sin cambios de interfaz, tokens de producción o paquete. No sustituye todavía DESIGN.md ni el patrón vigente de cabeceras. Fuente: logos aportados por el usuario, conservados sin editar en ../../../assets/company-theme; colores propuestos, no manuales oficiales.

## Objetivo

Permitir que una persona trabaje en una empresa autorizada y reconozca su contexto por nombre, logo y tema, conservando un solo sistema visual Intranet. Cambiar colores y cambiar datos son operaciones relacionadas pero distintas. La apariencia no concede acceso.

## Experiencia propuesta

1. La empresa activa aparece siempre por nombre en el shell, acompañada por su marca; Intranet conserva la jerarquía del producto. El selector se abre desde esa identidad de empresa, no queda oculto únicamente en Mi perfil.
2. Panel flotante con título Cambiar empresa y CompanyPicker: nombre, logo contenido sin recorte y descripción opcional. Solo empresas autorizadas. El logo es apoyo: el nombre textual es obligatorio, particularmente porque las cinco marcas comparten verdes/amarillos.
3. Recomendación: selección provisional + acción Cambiar empresa; la empresa activa se mantiene hasta completar la operación. Alternativa evaluada: cambio inmediato al seleccionar, más rápido pero facilita cambios involuntarios y dificulta tratar formularios sucios o errores. Se propone confirmación explícita porque el cambio afecta datos y trabajo en curso.
4. Antes del cambio, resolver cambios sin guardar con el diálogo existente: continuar editando, guardar si el flujo lo admite, o descartar explícitamente. No confirmar si no hay trabajo pendiente.
5. Durante el cambio: anunciar Cambiando empresa y evitar solicitudes duplicadas. La aplicación valida acceso, cancela o ignora respuestas del contexto anterior e invalida selección/filtros/datos que no pertenecen al destino.
6. Al completar: empresa, logo, tema y datos se actualizan juntos. Conservar la vista solo si existe y está autorizada en destino; en otro caso volver a una entrada segura del módulo/Inicio y explicar el motivo. Comunicar el nombre de la empresa nueva y cerrar con retorno de foco.
7. Error: mantener empresa y datos anteriores, conservar selección provisional y permitir reintentar. Acceso revocado: volver a un contexto autorizado por una regla de aplicación, sin asumir un fallback visual equivale a permiso.

Estados: una empresa (mostrar identidad, sin selector innecesario), varias, ninguna autorizada, carga, error, destino deshabilitado, formulario sucio, cambio exitoso y pérdida de permiso. Propuesta de alcance: empresa activa consistente entre pestañas de la misma sesión; resolución y persistencia requieren contrato de producto antes de implementación. Los filtros analíticos que abarcan empresas no cambian por sí solos la identidad activa del shell.

## Identidad por empresa

| Empresa | Superficie institucional candidata | Acento de acción candidato | Referencia |
| --- | --- | --- | --- |
| Banasan | `#031D36` | `#FFD000` | Identidad vigente del sistema |
| Bananera El Rubí | `#005236` | `#F6D633` | [Logo](../../../assets/company-theme/el-rubi.png) |
| BanaOrgánico | `#006B36` | `#E6C344` | [Logo](../../../assets/company-theme/banaorganico.png) |
| Agrobanano | `#354A18` | `#B3CF32` | [Logo](../../../assets/company-theme/agrobanano.png) |
| Agrobanacaribe | `#3E5317` | `#DBDF70` | [Logo](../../../assets/company-theme/agrobanacaribe.png) |
| Agroinversiones La Ceiba | `#2D6033` | `#A4BF2A` | [Logo](../../../assets/company-theme/la-ceiba.png) |

Hex de las cinco marcas: interpretación candidata basada en los logos, con tonos oscuros de soporte para legibilidad; no extracción exacta ni aprobación de marca. Banasan conserva valores existentes. No se recolorean logos, no se convierten a blanco automáticamente ni se recortan marcas al formato del símbolo Banasan. Usar contenedor claro cuando el original lo necesite, conservando proporción; versiones compactas/oficiales requieren aprobación. El texto legal diminuto del logo no sustituye el nombre accesible.

Contraste calculado de candidatos (sRGB, colores opacos): blanco sobre superficie institucional = 17.03 / 9.29 / 6.65 / 9.79 / 8.56 / 7.41; texto `#10253A` sobre acento = 10.59 / 10.82 / 9.09 / 8.82 / 10.98 / 7.47, en el orden de la tabla. Estos pares superan 4.5:1; no certifican el tema completo, hover, disabled, foco, iconos o gradientes. No usar acentos luminosos como texto sobre blanco.

Se mantiene: tipografía, formas, espaciado, retícula, variantes de cabecera, iconografía, comportamiento y superficies neutras de lectura. Se tematiza: superficie institucional, acción dominante, enlaces/acción secundaria, selección y foco, cada uno con pares de contraste propios. Éxito, advertencia, error, peligro y sus etiquetas mantienen significado y valores semánticos consistentes. No asignar éxito al color de empresa.

## Relación con cabeceras

La clasificación módulo/contenido permanece. Propuesta de evolución nominal: Cabecera de módulo (institucional), azul en Banasan y del tono institucional aprobado en las otras empresas. Cabecera clara sigue siendo clara. No se recolorean todas las superficies ni se altera el rol de una vista por cambiar empresa. Acceso e Inicio conservan sus composiciones; una futura adaptación de sus marcas o fotografía se revisa por su contrato, no mediante reemplazo global de colores. Demos solo consumen un tema explícito cuando lo estén demostrando.

## Contrato real de librería y brechas

Fuente revisada: banasan-intranet-ui/src/components/selection.tsx, theme.tsx, theme-context.ts y shell; consumidores HTML y módulo Biotime React.

| Pieza | Disponible hoy | Propuesta / límite |
| --- | --- | --- |
| CompanyPicker | value, onChange, options, name, legend; label/description ReactNode, opción disabled | Reutilizar; el contenido del label puede componer logo y nombre. No hace fetch, no valida autorización ni cambia datos |
| ThemeProvider | mode light/dark y tokens parciales, limitados al árbol React | Reutilizar en la raíz apropiada. Tema de empresa es independiente de modo claro/oscuro |
| ThemeTokens | surfaceInverse, actionPrimary, actionSecondary, textAction, borderFocus y roles neutrales/estados | Mapear roles semánticos, no sustituir primitivas navy/yellow globalmente |
| Panel flotante | Existe en la propuesta y se usa para tareas acotadas | Conservar cierre, foco y estados; verificar que todo portal herede el tema |
| Shell HTML / vistas antiguas | Mezcla tokens con colores azul/amarillo literales | Auditar y migrar roles antes de afirmar tema global; ThemeProvider por sí solo no alcanza esos archivos |
| Texto e iconos sobre acciones | El contrato actual no expone pares completos por acción en ThemeTokens | Evaluar adición compatible para texto sobre acción y hover/pressed; nombres de API por decidir, no se presentan como exports existentes |
| Portales y dialogs fuera del proveedor | Pueden quedar fuera de la herencia del tema | Definir contenedor de portal o propagación de tokens; no mantener copias divergentes por componente |

El catálogo de empresas, identidades autorizadas, selección activa y cambios de contexto pertenecen a la aplicación. La librería recibe opciones y roles visuales; no contiene permisos, credenciales, consultas, datos de empresa ni lógica de invalidación. No incorporar CompanyThemeProvider como API supuestamente existente: no está implementada. Preferir presets de marca suministrados por el consumidor sobre componentes duplicados por empresa.

## Adopción propuesta y decisiones pendientes

1. Confirmar nombres oficiales, empresas disponibles para cada usuario y assets aprobados; los cinco logos no son una lista de permisos.
2. Comparar los seis temas en la misma cabecera de módulo, cabecera clara, tabla, formulario, panel flotante y estados de feedback; selección visual del owner antes de promover paletas.
3. Cerrar el contrato de contexto y persistencia/sincronización entre pestañas, cambios sin guardar, empresa sin acceso a una sección y error.
4. Identificar brechas de tokens y portales en librería; propuesta de API aditiva y compatibilidad de consumidores antes de construir/publicar.
5. Aplicar a una familia piloto completa, validar contraste por estado, teclado, móvil y cambio de datos; después extender. Ningún cambio productivo forma parte de esta propuesta.

Dirección recomendada: misma Intranet, identidad activa por empresa y colores semánticos estables. Alternativa descartada: copias de componentes o CSS específico por pantalla/empresa, porque rompe la consistencia y multiplica regresiones.

Skills: Banasan Intranet, Product Design, UI Engineering y Package Engineering para límites del paquete; Dona para seguimiento. Consulta de Librería Web en modo lectura, sin trasladar reglas de SIAL a este paquete Banasan. Delegación evaluada SELF: propuesta acotada con contratos ya disponibles y contexto compartido; sin beneficio independiente de dividirla. Sin código, interfaces o releases modificados.


Implementación posterior y límites de la propuesta: [revisión de temas](../../company-theme-review.md). Esta propuesta de contexto productivo no afirma integración de datos ni permisos.
