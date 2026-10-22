# Bandeja de cuenta

Estado: `experimental`.

## Propósito

Agrupa navegación personal e institucional sin convertir la marca de cuenta en un
enlace directo a una única función. Se abre desde `Account mark` y contiene, por ahora,
`Perfil`, `Empresa` y `Gestión de usuarios`.

## Composición

- El disparador conserva toda la identidad; la bandeja no repite iniciales ni contexto de sesión.
- Encabezado mínimo y lista vertical; las líneas y el ritmo organizan antes que cards o chips.
- Un puente amarillo alinea físicamente la bandeja con `Account mark` en escritorio.
- El destino actual usa una línea azul interior, no una insignia.
- En escritorio se ancla al extremo de la marca de cuenta y comparte su eje derecho.
- En móvil se recompone como bandeja inferior con scrim.

## Interacción y acceso

- El disparador publica `aria-expanded` y controla la superficie por `aria-controls`.
- Clic exterior, botón de cierre y `Escape` cierran; `Escape` devuelve el foco.
- `ArrowDown` abre desde el disparador y entra al primer destino.
- Dentro de la lista, flechas verticales, `Home` y `End` recorren destinos.
- `prefers-reduced-motion` conserva estado y elimina desplazamiento.

## Frontera del prototipo

`Gestión de usuarios` es el único destino implementado. `Perfil` y `Empresa` se
presentan para validar arquitectura de navegación, pero no crean todavía modelo,
contenido o rutas ficticias. La bandeja no contiene acciones sensibles ni representa
autorización.

## Gate de promoción

Validar con identidad real, política de sesión, permisos, contenido de Perfil/Empresa,
y al menos una tercera superficie antes de promover a `candidate`.
