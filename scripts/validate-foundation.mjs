import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const required = [
  "DESIGN.md",
  "design-system/project-visual-contract.md",
  "design-system/status.md",
  "design-system/components/README.md",
  "design-system/interactions/README.md",
  "design-system/validation/README.md",
  "assets/css/tokens.css",
  "componentes.html"
];

for (const file of required) {
  try {
    if (!(await stat(resolve(root, file))).isFile()) failures.push("No es archivo: " + file);
  } catch {
    failures.push("Falta: " + file);
  }
}

for (const tokenFile of ["primitive.tokens.json", "semantic.tokens.json", "component.tokens.json"]) {
  try {
    JSON.parse(await readFile(resolve(root, "design-system/tokens", tokenFile), "utf8"));
  } catch (error) {
    failures.push("JSON inválido en " + tokenFile + ": " + error.message);
  }
}

const before = await readFile(resolve(root, "assets/css/tokens.css"), "utf8").catch(() => "");
const build = spawnSync(process.execPath, [resolve(root, "scripts/build-tokens.mjs")], { cwd: root, encoding: "utf8" });
if (build.status !== 0) failures.push(build.stderr || build.stdout || "Falló la generación de tokens");
const after = await readFile(resolve(root, "assets/css/tokens.css"), "utf8").catch(() => "");
if (before !== after) failures.push("tokens.css no estaba sincronizado con los JSON");

const walk = async (folder) => {
  const entries = await readdir(folder, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => entry.isDirectory() ? walk(resolve(folder, entry.name)) : [resolve(folder, entry.name)]))).flat();
};

for (const file of await walk(root)) {
  if (![".html", ".css", ".js", ".mjs", ".md", ".json", ".svg"].includes(extname(file))) continue;
  if (file.startsWith(resolve(root, ".git"))) continue;
  const content = await readFile(file, "utf8");
  if (content.includes("\uFFFD")) failures.push("Carácter de reemplazo en " + file.slice(root.length + 1));
}

if (failures.length) {
  console.error(failures.map((failure) => "- " + failure).join("\n"));
  process.exit(1);
}

console.log("Foundation 0.4 válida");
