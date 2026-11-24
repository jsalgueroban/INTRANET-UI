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
import {
  Overview,
  Records,
  History,
  filteredMarks,
  downloadMarks,
  type Filters,
} from "./consultas";
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
  const [editingCase, setEditingCase] = useState(false);
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
  const sectionNav = useRef<HTMLElement>(null);
  useEffect(() => {
    const reveal = () => {
      const nav = sectionNav.current;
      const active = nav?.querySelector<HTMLElement>('[aria-current="page"]');
      if (nav && active) {
        const bounds = active.getBoundingClientRect();
        const parent = nav.getBoundingClientRect();
        nav.scrollLeft +=
          bounds.left - parent.left - (nav.clientWidth - bounds.width) / 2;
      }
    };
    reveal();
    window.addEventListener("resize", reveal);
    return () => window.removeEventListener("resize", reveal);
  }, [view, role]);
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
    setEditingCase(false);
    void router.navigate({
      to: "/",
      search: { ...values, view },
      replace: view === filters.view,
    });
  }
  return (
    <>
      <main id="contenido" className="news-page bio-page">
        <div className="ui-workspace-masthead">
          <header className="ui-workspace-heading">
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
            <div className="ui-workspace-heading__note">
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
              {allowed && view === "inicio" && (
                <button
                  className="ui-action ui-action--primary"
                  onClick={() => go("marcaciones")}
                >
                  Consultar marcaciones
                  <span className="ui-action__icon" aria-hidden="true">
                    <svg className="ui-icon" viewBox="0 0 16 16">
                      <path d="M4 12 12 4M6 4h6v6" />
                    </svg>
                  </span>
                </button>
              )}
              {allowed && view === "marcaciones" && can.export && (
                <button
                  className="ui-action ui-action--primary"
                  disabled={
                    !filteredMarks(filters).length ||
                    Boolean(
                      filters.from && filters.to && filters.from > filters.to,
                    )
                  }
                  onClick={() => downloadMarks(filteredMarks(filters))}
                >
                  Exportar CSV
                  <span className="ui-action__icon" aria-hidden="true">
                    <svg className="ui-icon" viewBox="0 0 16 16">
                      <path d="M8 3v10m-5-5 5 5 5-5" />
                    </svg>
                  </span>
                </button>
              )}
              {allowed && view === "historico" && (
                <button
                  className="ui-action ui-action--primary"
                  onClick={() =>
                    go(
                      "marcaciones",
                      filters.origin
                        ? Object.fromEntries(
                            new URLSearchParams(filters.origin),
                          )
                        : {},
                    )
                  }
                >
                  {filters.origin
                    ? "Volver a la consulta"
                    : "Consultar marcaciones"}
                  <span className="ui-action__icon" aria-hidden="true">
                    <svg className="ui-icon" viewBox="0 0 16 16">
                      <path d="M4 12 12 4M6 4h6v6" />
                    </svg>
                  </span>
                </button>
              )}
              {allowed && view === "novedades" && (
                <button
                  className="ui-action ui-action--primary"
                  onClick={() => setEditingCase(true)}
                >
                  Registrar novedad
                  <span className="ui-action__icon" aria-hidden="true">
                    <svg className="ui-icon" viewBox="0 0 16 16">
                      <path d="M8 3v10M3 8h10" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </header>
          <nav
            ref={sectionNav}
            className="ui-workspace-nav"
            aria-label="Vistas de Biotime"
          >
            {visible.map((key) => (
              <a
                key={key}
                href={"#/?view=" + key}
                aria-current={view === key ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  go(key);
                }}
              >
                {labels[key]}
              </a>
            ))}
          </nav>
        </div>
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
            <Records filters={filters} go={go} />
          ) : view === "historico" ? (
            <History filters={filters} go={go} />
          ) : view === "novedades" ? (
            <Cases
              role={role}
              editing={editingCase}
              onEditingChange={setEditingCase}
            />
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
