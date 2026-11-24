// Bridge legacy brand literals to company roles. Original values remain exact fallbacks.
import fs from "node:fs";
const bases = new Set(
  "031d36 052b51 073451 052b47 062f4b 042640 062b4a 03182c 052b4c 001d36 06263f".split(
    " ",
  ),
);
const actions = new Set(
  "0874c9 075fa2 147bc0 0d73b8 1679bb 075daa 064b89 0982df 035d9e".split(" "),
);
const soft = new Set(
  "f3f8fa e7f3fa edf6fa eaf4f8 e8f1f7 edf5fb edf4f8 eaf5fb eef7fb".split(" "),
);
const light = new Set("8bd4ff 7dcaf1 95d5ff a9ddff b8e2ff 42a7eb".split(" "));
const accents = new Set("ffd000 ffe04f be9700 fff3b8".split(" "));
export function role(hex) {
  const h = hex.toLowerCase().replace("#", "");
  if (bases.has(h)) return "base";
  if (actions.has(h)) return "action";
  if (soft.has(h)) return "soft";
  if (light.has(h)) return "light";
  if (accents.has(h))
    return h === "fff3b8"
      ? "accent-soft"
      : h === "be9700"
        ? "accent-shadow"
        : "accent";
  return null;
}
export function connectBrandColors(css) {
  // Protect fallbacks so repeated builds/migrations are idempotent.
  const saved = [];
  css = css.replace(
    /var\(--company-rgb-[^,]+,\s*rgba?\([^)]*\)\)/g,
    (m) => `__COMPANY_SAVED_${saved.push(m) - 1}__`,
  );
  css = css.replace(
    /var\(--company-tone-[^;{}]*?\)/g,
    (m) => `__COMPANY_SAVED_${saved.push(m) - 1}__`,
  );
  css = css.replace(/#([\da-f]{6})([\da-f]{2})?\b/gi, (all, h, alpha) => {
    if (!role(h)) return all;
    const value = `var(--company-tone-${h.toLowerCase()}, #${h})`;
    return alpha
      ? `color-mix(in srgb, ${value} ${+((parseInt(alpha, 16) / 255) * 100).toFixed(4)}%, transparent)`
      : value;
  });
  css = css.replace(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([.\d]+)\s*)?\)/gi,
    (all, r, g, b, a) => {
      const h = [r, g, b]
        .map((v) => (+v).toString(16).padStart(2, "0"))
        .join("");
      if (!role(h)) return all;
      return `var(--company-rgb-${h}-${a === undefined ? "1" : a.replace(".", "_")}, ${all})`;
    },
  );
  return css.replace(/__COMPANY_SAVED_(\d+)__/g, (_, i) => saved[+i]);
}
export function connectFile(file) {
  const s = fs.readFileSync(file, "utf8");
  const next = connectBrandColors(s);
  if (s !== next) fs.writeFileSync(file, next);
}
