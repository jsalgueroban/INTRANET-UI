# Salas · Corrección de dirección · 2026-11-23

La composición inicial queda sustituida tras la corrección del usuario. No fue aprobada.
Autoridad consultada: ../Intranet-UI/DESIGN.md, design-system/status.md, foundations/layout-spacing.md, components/README.md y project-visual-contract.md. Foundation 0.4.

Se retiran cabecera azul local, eyebrows, tarjetas de agenda y disponibilidad y badges creados en este chat. Se recuperan shell, encabezado, workspace, campos, acciones, señal textual y enlaces compartidos originales. La mejora queda en separación por líneas y espacio, mes legible y acción Hoy con ui-action existente. Sin API nueva ni cambio de tokens o librería.

Modo improve. SELF: slice local sin beneficio de delegación. Pendiente revisión humana; no publicado. El avance anterior de Ares describe la iteración sustituida, no una aprobación.


## Solicitud flotante

Se reutiliza floatingPanel / ui-dialog--workspace del sistema Intranet. Formulario compartido en reservation-form.js para página directa y modal, sin duplicar validación ni reglas. El markup se toma de solicitar-reserva.html; carga y fallo muestran recuperación a la página existente. Sala, día y franja se conservan. Cancelar, cerrar y Escape vuelven al calendario; al cerrar se actualiza la agenda. Envío simulado mantiene confirmación de pendiente de aprobación. Sin notificaciones reales.

Formulario reorganizado en fieldsets Espacio y horario / Detalles de la reunión. Etiquetas explícitas for/id, campos a ancho completo, horas juntas en móvil, coincidencias próximas al horario y nota de aprobación antes de las acciones. Verificado render 1280/390 y envío simulado tras reorganización; consola sin errores.

Cabeceras compartidas: Salas, Mis reservas y Administración adoptan workspace-heading.css con fondo azul, descripción/acción y pestañas. Solicitar reserva en ambas vistas reutiliza reservation-panel.js y el formulario existente. Nueva sala pasa a cabecera; mantenimiento conserva su acción contextual. Revisadas las tres vistas en escritorio/móvil, pestaña activa, Escape/foco, apertura de nueva sala y actualización de Mis reservas tras envío simulado. SELF: slice local; sin cambio de librería o backend. Sin publicar.
