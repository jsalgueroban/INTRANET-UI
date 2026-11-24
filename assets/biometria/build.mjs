// Ejecutar con node assets/biometria/build.mjs desde la propuesta.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const here = path.dirname(fileURLToPath(import.meta.url));
const workspace = path.resolve(here, "../../..");
const web = process.env.INTRANET_WEB || path.join(workspace, "Intranet-Web");
const ui =
  process.env.INTRANET_UI || path.join(workspace, "banasan-intranet-ui");
const fromWeb = createRequire(path.join(web, "package.json"));
const fromUi = createRequire(path.join(ui, "package.json"));
const fromVite = createRequire(fromUi.resolve("vite/package.json"));
const { build } = fromVite("esbuild");
await build({
  entryPoints: [path.join(here, "main.tsx")],
  outfile: path.join(here, "app.js"),
  bundle: true,
  format: "esm",
  minify: true,
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
  alias: {
    "@banasandev/intranet-ui": path.join(ui, "src/index.ts"),
    "@tanstack/react-router": fromWeb.resolve("@tanstack/react-router"),
    react: path.dirname(fromWeb.resolve("react/package.json")),
    "react-dom": path.dirname(fromWeb.resolve("react-dom/package.json")),
  },
});

// Preserve company role connections when rebuilding the library CSS bundle.
const { connectFile } = await import('../../scripts/company-theme-colors.mjs');
connectFile(path.join(here, 'app.css'));
