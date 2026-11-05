# Intranet Banasan

Propuesta interactiva de la intranet corporativa. Incluye vistas, componentes compartidos y recorridos con datos de ejemplo. El acceso y las decisiones se simulan en el navegador; no hay conexión con servicios productivos.

## Abrir la propuesta

[Intranet](https://jsalgueroban.github.io/INTRANET-UI/) · [Componentes](https://jsalgueroban.github.io/INTRANET-UI/componentes.html)

Desde la raíz del repositorio ejecuta `python -m http.server 8000` y abre `http://localhost:8000/`. El menú UI permite recorrer las superficies disponibles.

## Vistas

- Acceso e inicio: index.html, login.html, inicio.html.
- Cuenta y usuarios: perfil.html, usuarios.html.
- Contenidos: contenidos.html, editar-contenido.html, recursos-contenido.html, vista-previa.html, historial-editorial.html.
- Pendientes: pendientes.html, pendiente.html.
- Reservas: salas.html, solicitar-reserva.html, mis-reservas.html.
- Noticias y vacantes: noticias.html, noticia.html, vacantes.html, vacante.html.
- Información y documentos: secciones.html, informacion.html, documentos.html, documento.html.
- Búsqueda y avisos: busqueda.html, notificaciones.html, aviso.html.
- Catálogo: componentes.html, con ejemplos de navegación, lista y detalle, y acceso a plataformas.

## Organización

- assets/css/: tokens, componentes y estilos de las vistas.
- assets/js/: componentes, interacciones y datos de demostración.
- assets/brand/ y assets/icons/: identidad e iconos.
- assets/demo/: documentos de ejemplo para probar los recorridos.

Las páginas de detalle se abren desde sus listados para conservar la referencia del registro. Los ejemplos se sirven por HTTP; abrir los archivos directamente no permite probar todos los módulos.

GitHub mantiene la fuente de publicación de Pages. Azure conserva una copia sincronizada de la propuesta. La documentación interna se administra fuera de este repositorio.

Los iconos Tabler se distribuyen bajo la licencia incluida en [LICENSE-TABLER.txt](LICENSE-TABLER.txt).
