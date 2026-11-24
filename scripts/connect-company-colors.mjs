import fs from "node:fs";
import { connectBrandColors, connectFile } from "./company-theme-colors.mjs";
for (const file of fs.readdirSync(".").filter((f) => f.endsWith(".html"))) {
  if (
    [
      "index.html",
      "login.html",
      "componentes.html",
      "data-list-demo.html",
      "navigation-demo.html",
      "platform-demo.html",
    ].includes(file)
  )
    continue;
  const s = fs.readFileSync(file, "utf8");
  let n = s.replace(
    /(<style[^>]*>)([\s\S]*?)(<\/style>)/gi,
    (_, a, b, c) => a + connectBrandColors(b) + c,
  );
  n = n.replace(
    /style="([^"]*)"/g,
    (_, s) => `style="${connectBrandColors(s)}"`,
  );
  if (n !== s) fs.writeFileSync(file, n);
}
for (const dir of ["assets/css", "assets/biometria", "assets/company-theme"])
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".css")))
    connectFile(`${dir}/${file}`);
