import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sources = [
  "design-system/tokens/primitive.tokens.json",
  "design-system/tokens/semantic.tokens.json",
  "design-system/tokens/component.tokens.json"
];

const toName = (parts) => "--" + parts.join("-").replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase());
const toCssValue = (value) => {
  if (typeof value === "number") return String(value);
  return value.replace(/\{([^}]+)\}/g, (_, reference) => "var(--" + reference.replaceAll(".", "-") + ")");
};

const collect = (node, path = [], output = []) => {
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    if (value && typeof value === "object" && "$value" in value) {
      output.push([toName([...path, key]), toCssValue(value.$value)]);
      continue;
    }
    if (value && typeof value === "object") collect(value, [...path, key], output);
  }
  return output;
};

const tokenSets = await Promise.all(sources.map(async (source) => JSON.parse(await readFile(resolve(root, source), "utf8"))));
const declarations = tokenSets.flatMap((tokens) => collect(tokens));
const unique = new Map();

for (const [name, value] of declarations) {
  if (unique.has(name)) throw new Error("Token duplicado: " + name);
  unique.set(name, value);
}

const css = [":root{", ...[...unique].map(([name, value]) => "  " + name + ":" + value + ";"), "}", ""].join("\n");
await writeFile(resolve(root, "assets/css/tokens.css"), css, "utf8");
console.log("Generados " + unique.size + " tokens CSS");
