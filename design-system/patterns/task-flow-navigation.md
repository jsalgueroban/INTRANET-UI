# Navegación según el flujo de la tarea

Estado: `candidate`.

## Propósito

La lectura visual y el recorrido por teclado expresan el mismo proceso. La composición no
debe forzar un orden DOM incoherente.

## Contrato

- El DOM sigue la secuencia operativa y el foco avanza sin `tabindex` positivo.
- CSS puede cambiar posición visual siempre que no cambie el significado ni cree saltos.
- Cada control tiene foco visible, nombre accesible y comportamiento de teclado nativo.
- Controles auxiliares aparecen después del dato al que afectan y antes de abandonar su
  contexto.
- Al activar un control no se mueve el foco de forma sorpresiva ni se crea un ciclo.

## Recorrido de referencia del login

`Correo → Contraseña → Mostrar/Ocultar → Recuperación → Recordar → Ingresar → Soporte`.
