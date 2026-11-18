import { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  createRootRoute,
  createRoute,
  createRouter,
  createHashHistory,
  RouterProvider,
} from "@tanstack/react-router";

import { SelectField } from "@banasandev/intranet-ui";
import { Overview, Records, History, type Filters } from "./consultas";
import { Cases, Admin } from "./gestion";
import { permissions, roleNames, type Role } from "./data";
const root = createRootRoute();
const route = createRoute({
  getParentRoute: () => root,
  path: "/",
  validateSearch: (raw: Record<string, unknown>): Filters =>
    Object.fromEntries(
      Object.entries(raw).filter(([, v]) => typeof v === "string"),
    ) as Filters,
  component: Module,
});
const router = createRouter({
  routeTree: root.addChildren([route]),
  history: createHashHistory(),
  parseSearch: (query) => Object.fromEntries(new URLSearchParams(query)),
});
const labels: Record<string, string> = {
  inicio: "Inicio",
  marcaciones: "Marcaciones",
  historico: "Histórico por persona",
  novedades: "Novedades",
  administracion: "Fuentes y dispositivos",
};
function Module() {
  const filters = route.useSearch();
  const [role, setRole] = useState<Role>(() => {
    const saved = sessionStorage.getItem("bio-role");
    return roleNames.find((x) => x === saved) || "Administración";
  });
  const can = permissions(role);
  const visible = Object.keys(labels).filter(
    (k) =>
      (k !== "administracion" || can.admin) &&
      (k !== "novedades" || can.manage),
  );
  const view = Object.hasOwn(labels, filters.view) ? filters.view : "inicio";
  const allowed = visible.includes(view);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousView = useRef(view);
  useEffect(() => {
    if (filters.view === "usuarios") {
      window.location.replace("usuarios.html");
      return;
    }
    if (previousView.current !== view) {
      heading.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
      previousView.current = view;
    }
  }, [view, filters.view]);
  function go(view: string, values: Filters = {}) {
    void router.navigate({
      to: "/",
      search: { ...values, view },
      replace: view === filters.view,
    });
  }
  return (
    <>
      <main id="contenido" className="news-page bio-page">
        <header className="news-heading">
          <div className="ui-page-heading">
            <a
              className="ui-return"
              href="inicio.html"
              aria-label="Volver a Inicio"
            >
              <span className="ui-return__icon" aria-hidden="true">
                <svg
                  className="ui-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M5 12h14M5 12l6 6M5 12l6-6" />
                </svg>
              </span>
              <span className="ui-return__label">Inicio</span>
            </a>
            <h1 ref={heading} tabIndex={-1}>
              {view === "inicio" ? "Biotime." : labels[view] + "."}
            </h1>
          </div>
          <p>
            {view === "inicio"
              ? "Consulta la actividad y la actualización de cada empresa."
              : view === "marcaciones"
                ? "Consulta quién marcó, dónde y cuándo."
                : view === "historico"
                  ? "Revisa las marcaciones de una persona durante el mes."
                  : view === "novedades"
                    ? "Registra y revisa las novedades de las personas."
                    : "Consulta las fuentes, su actualización y sus dispositivos."}
          </p>
        </header>
        <section className="editorial-workspace" aria-label={labels[view]}>
          {!allowed ? (
            <div className="ui-feedback">
              <h2>Acceso restringido</h2>
              <p>Tu perfil actual no tiene acceso a esta vista.</p>
              <button
                className="ui-action ui-action--secondary"
                onClick={() => go("inicio")}
              >
                Volver a Biotime
              </button>
            </div>
          ) : view === "inicio" ? (
            <Overview filters={filters} go={go} />
          ) : view === "marcaciones" ? (
            <Records filters={filters} go={go} canExport={can.export} />
          ) : view === "historico" ? (
            <History filters={filters} go={go} />
          ) : view === "novedades" ? (
            <Cases role={role} />
          ) : (
            <Admin />
          )}
        </section>
        <footer className="editorial-note bio-demo">
          Datos simulados · Hora de Colombia (UTC−5)
          <SelectField
            label="Perfil de demostración"
            value={role}
            onChange={(e) => {
              const r = e.target.value as Role;
              setRole(r);
              sessionStorage.setItem("bio-role", r);
              go("inicio");
            }}
          >
            {roleNames.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </SelectField>
        </footer>
      </main>
    </>
  );
}
createRoot(document.getElementById("biometria")!).render(
  <RouterProvider router={router} />,
);
