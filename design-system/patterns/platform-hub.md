# Hub de plataformas

Estado: `experimental`.

## Propósito

Concentrar el acceso a plataformas internas sin añadir otra barra permanente al shell.
El isotipo Banasan funciona como disparador reconocido; los destinos siguen siendo
enlaces HTML independientes y nunca quedan horneados dentro de la imagen 3D.

## Contrato visual

- El disparador conserva las tres piezas, dirección y vacíos del isotipo maestro.
- El volumen proviene de bisel, luz y profundidad corta; no de una placa o contenedor.
- En escritorio los accesos ocupan un arco compacto superior izquierdo para respetar el
  borde derecho e inferior del viewport. No se dibuja una circunferencia guía: proximidad,
  secuencia y origen común comunican la relación.
- En móvil la órbita se recompone en columna vertical. La geometría circular no justifica
  desbordamiento, superposición ilegible ni objetivos táctiles menores de 44 px.
- Amarillo identifica la marca y el estado interactivo; las superficies de enlace usan
  blanco y azul noche para mantener contraste sobre fotografías o fondos claros.

## Contrato de interacción

- El botón publica `aria-expanded` y controla un grupo identificado.
- Los destinos cerrados usan `aria-hidden=true` y salen del orden de tabulación.
- Escape cierra el conjunto y devuelve el foco al disparador.
- Un clic exterior cierra el conjunto.
- El nombre accesible cambia entre «Abrir» y «Cerrar» según `aria-expanded`.
- `prefers-reduced-motion` elimina rotación, escalado y secuencias; conserva apertura,
  foco y lectura.
- En reposo puede ejecutar un único microevento aleatorio cada 5–12 segundos. Nunca es
  continuo, no se repite consecutivamente y se pausa con hover, foco, menú abierto o
  pestaña oculta.
- El isotipo admite arrastre directo. Un desplazamiento menor de 8 px conserva el clic;
  superarlo convierte la interacción en lanzamiento y cancela la apertura del menú.
- Un lanzamiento lateral o ascendente conserva una velocidad acotada, rebota dentro del
  viewport, reposa brevemente y vuelve mediante resorte. Un lanzamiento descendente sale
  del viewport, permanece oculto 2,2 s y luego vuelve.
- Posición, velocidad, giro, escala y opacidad pertenecen a una única máquina de movimiento.
  Una nueva captura cancela frame y temporizador de la trayectoria anterior sin restablecer
  la posición visual: el siguiente arrastre comienza exactamente donde fue tomado.
- Durante el vuelo, entrar en su área de captura lo pausa para facilitar un nuevo agarre.
  La cámara interactiva se extiende 16 px sin añadir una superficie visual.
- Reduced motion permite mover el objeto durante el gesto, pero lo devuelve inmediatamente
  sin vuelo, espera ni rebote.
- Los nombres, iconos, URL y permisos de cada plataforma son datos de integración; no
  forman parte del asset ni se infieren en la propuesta.

## Gates pendientes

- Catálogo definitivo de plataformas, URLs, iconos y reglas de visibilidad.
- Comportamiento frente a autenticación única, sesión vencida y destino no disponible.
- Validación física en pantallas de baja calidad y con zoom de navegador al 200 %.
- Segunda superficie antes de promover el patrón a `candidate`.
