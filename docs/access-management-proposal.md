# Administración de usuarios, perfiles, roles y permisos

Estado: propuesta navegable en `usuarios.html` y `roles.html`. La Foundation HTML de Intranet define identidad, tipografía y composición. HU relacionadas: 2721 (usuarios) y 2722 (permisos y delegación).

## Recorrido cubierto

- Buscar y filtrar usuarios por estado; consultar nombre, correo, origen, identificador de dominio, empresa, área y roles.
- Crear cuenta local o vinculada a Directorio Activo. La cuenta local usa correo; la de dominio usa `sAMAccountName` como identificador. No se gestiona contraseña ni autenticación desde esta propuesta.
- Editar perfil, asignar o retirar varios roles, validar correo único y exigir identificador cuando el origen es AD.
- Inactivar y reactivar una cuenta con confirmación y conservación del perfil y sus roles.
- Distinguir el estado administrado por Intranet (`Activo`, `Pendiente`, `Inactivo`) del estado leído del Directorio Activo (`Habilitada`, `Bloqueada`, `Deshabilitada`, `Sin verificar`). Para cuentas locales, el segundo estado no aplica. Inactivar o activar en Intranet no modifica AD.
- Buscar, crear, editar, inactivar y reactivar roles; definir empresa, sección, recurso y acciones `Consultar`, `Preparar`, `Aprobar`, `Administrar`.
- Consultar cuántos usuarios tienen un rol; los roles inactivos no aparecen para nuevas asignaciones.

El prototipo guarda cambios en `localStorage` para revisar recorridos entre páginas y tras recargar. Esos datos solo viven en este navegador. No hay API, sesión, verificación de administrador ni concesión real de acceso. Los registros iniciales son ficticios y no deben cargarse en producción.

## Matriz de acciones para el producto

| Vista | Acción | Precondición y permiso de servidor | Resultado esperado |
| --- | --- | --- | --- |
| Usuarios | Crear cuenta | Administrar usuarios en la empresa; correo e identidad únicos | Cuenta pendiente de habilitación o provisión |
| Usuarios | Editar perfil | Administrar usuario dentro del alcance propio | Perfil actualizado con auditoría |
| Usuarios | Asignar o retirar rol | Administrar asignaciones y poder delegar el alcance del rol | Permisos efectivos recalculados y auditados |
| Usuarios | Inactivar o activar | Administrar usuarios; confirmación y política de sesión | Acceso suspendido o restaurado |
| Roles | Crear o editar | Administrar roles dentro del alcance propio | Catálogo actualizado con auditoría |
| Roles | Inactivar o activar | Administrar roles; informar usuarios afectados | Permisos efectivos suspendidos o restaurados |

## Contrato pendiente de producto y backend

1. Aprobar catálogo de empresas, secciones, recursos y acciones; determinar si un rol puede tener múltiples alcances. El prototipo muestra un alcance por rol.
2. Definir permisos de administración y delegación, separación de funciones y protección contra autoasignación o escalada de privilegios.
3. Definir identidad persistente de cuentas AD (`objectGUID`), vinculación con cuentas locales existentes, colisiones de correo y sincronización de inactivación.
   El backend debe leer el estado de AD mediante la integración autorizada y devolver estado, momento de consulta y resultado de error sin inventar `Habilitada` cuando la consulta falla. Bloqueo y deshabilitación son situaciones distintas; la cuenta bloqueada puede requerir intervención o espera en AD, mientras que la deshabilitada requiere habilitación administrativa en AD. La UI no ofrece desbloquear ni habilitar AD.
4. Definir transición de cuenta pendiente, revocación de sesiones, efecto inmediato de cambios de rol, auditoría y recuperación.
5. Implementar y probar autorización en servidor con denegación por defecto y aislamiento por empresa. Ningún estado o rol enviado desde el navegador es autoridad.

La propuesta visual no modifica la librería React ni constituye un componente publicado. Cuando se apruebe el modelo, las interacciones deberán construirse en la aplicación de producto con los componentes públicos vigentes de la librería Intranet.
