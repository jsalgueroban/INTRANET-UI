# Intranet Banasan UI

Base visual y funcional de la Intranet Banasan. El repositorio contiene las superficies
vigentes, los recursos de marca utilizados y el sistema de diseño que gobierna su evolución.

## Superficies

- `index.html`: acceso a la intranet.
- `inicio.html`: inicio, navegación y accesos corporativos.
- `usuarios.html`: administración de usuarios.
- `componentes.html`: catálogo de componentes compartidos.

## Desarrollo local

Servir la raíz con un servidor HTTP local. Las páginas no requieren proceso de compilación
en esta etapa.

```powershell
python -m http.server 4173
```

Abrir `http://localhost:4173`.

## Contrato local

```powershell
npm run tokens
npm run validate
```

El primer comando materializa los tokens CSS. El segundo valida estructura, referencias,
codificación y sincronía de la Foundation sin elegir todavía una stack de aplicación.

## Estructura

```text
assets/
  art/            fotografía y composiciones activas
  brand/          firmas e isotipos Banasan
  css/            fundamentos, componentes y composición por superficie
  js/             comportamiento por capacidad y patrones compartidos
design-system/
  components/     contratos y estados de componentes
  content/        criterios de contenido
  decisions/      decisiones de arquitectura visual
  foundations/    fundamentos del sistema
  patterns/       patrones de interacción y composición
  interactions/   máquinas de estado y comportamiento
  tokens/         valores primitivos, semánticos y de componente
  validation/     matrices y gates verificables
```

## Gobierno visual

La autoridad se resuelve en este orden:

1. `DESIGN.md`.
2. Fundamentos y tokens.
3. Componentes y patrones.
4. Decisiones vigentes.
5. Implementación.

Las nuevas superficies deben reutilizar este contrato o registrar una decisión antes de
introducir una variante visual o de interacción.

## Flujo Git

`main` es la rama principal y la fuente vigente del producto. El mantenimiento puede
publicarse directamente en ella cuando el cambio esté verificado y conserve el repositorio
limpio. Las ramas auxiliares se reservan para trabajo que necesite aislamiento temporal.
