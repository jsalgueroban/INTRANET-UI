import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import {
  Button,
  CompanyPicker,
  ThemeProvider,
  TextField,
  TextAreaField,
  SelectField,
  PaginatedTable,
} from "@banasandev/intranet-ui";
import { FloatingForm } from "../biometria/FloatingForm";
import { companyThemes, type CompanyTheme } from "./themes";
import { companyColorRoles } from "./color-roles";
const key = "intranet-company-theme-preview-v1";
function initial() {
  try {
    return (
      companyThemes.find((c) => c.id === sessionStorage.getItem(key)) ||
      companyThemes[0]
    );
  } catch {
    return companyThemes[0];
  }
}
function tokens(c: CompanyTheme) {
  return {
    surfaceInverse: c.base,
    actionPrimary: c.accent,
    actionSecondary: c.base,
    textAction: c.base,
    borderFocus: c.base,
  };
}
function apply(c: CompanyTheme) {
  const root = document.documentElement;
  const browserTheme = document.querySelector('meta[name="theme-color"]');
  if (browserTheme) browserTheme.setAttribute("content", c.base);
  root.dataset.companyPreview = c.id;
  root.dataset.companyNavigation = c.id === "el-rubi" ? "light" : "brand";
  // Brand roles flow through legacy CSS and library primitives without recoloring states.
  const palette: Record<string, string> = {
    base: c.base,
    action: c.base,
    soft: `color-mix(in srgb, ${c.base} 7%, white)`,
    light: `color-mix(in srgb, ${c.accent} 70%, white)`,
    accent: c.accent,
    "accent-soft": `color-mix(in srgb, ${c.accent} 22%, white)`,
    "accent-shadow": `color-mix(in srgb, ${c.accent} 72%, black)`,
  };
  for (const [name, role] of Object.entries(companyColorRoles)) {
    if (c.id === "banasan") {
      root.style.removeProperty(name);
      continue;
    }
    let value = palette[role];
    if (name.startsWith("--company-rgb-")) {
      const alpha = Number(name.split("-").at(-1)!.replace("_", "."));
      value = `color-mix(in srgb, ${value} ${alpha * 100}%, transparent)`;
    }
    root.style.setProperty(name, value);
  }
  const vars = {
    "--company-base": c.base,
    "--company-accent": c.accent,
    "--surface-inverse": c.base,
    "--action-primary": c.accent,
    "--action-secondary": c.base,
    "--text-action": c.base,
    "--border-focus": c.base,
    "--navy": c.base,
    "--deep": c.base,
  };
  for (const [name, value] of Object.entries(vars))
    root.style.setProperty(name, value);
  document
    .querySelectorAll<HTMLImageElement>(
      ".brand-lockup img,.admin-brand img,.mobile-brand img,.footer-company img",
    )
    .forEach((img) => {
      img.src = c.logo;
      img.alt = c.name;
    });
  document.querySelectorAll("[data-active-company]").forEach((label) => {
    if (label.textContent !== c.name) label.textContent = c.name;
  });
  document.querySelectorAll("[data-change-company] strong").forEach((label) => {
    if (label.textContent !== "Cambiar empresa")
      label.textContent = "Cambiar empresa";
  });
  try {
    sessionStorage.setItem(key, c.id);
  } catch {}
}
function Samples({ company }: { company: CompanyTheme }) {
  const [surfaceMode, setSurfaceMode] = useState("current");
  const shell =
    company.id === "agrobanano"
      ? { surface: "#14291E", text: "#FFFFFF", description: "oscura neutra" }
      : { surface: "#F8FAF5", text: "#17261F", description: "clara neutra" };
  useEffect(() => {
    document.documentElement.dataset.companySurface =
      company.id === "banasan" ? "current" : surfaceMode;
    document.documentElement.style.setProperty(
      "--review-shell-bg",
      shell.surface,
    );
    document.documentElement.style.setProperty(
      "--review-shell-text",
      shell.text,
    );
    return () => {
      delete document.documentElement.dataset.companySurface;
    };
  }, [surfaceMode, company.id]);
  const [panel, setPanel] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <>
      <div className="ui-workspace-masthead">
        <header className="ui-workspace-heading">
          <div className="ui-page-heading">
            <a
              className="ui-return"
              href="inicio.html"
              aria-label="Volver a Inicio"
            >
              <span className="ui-return__icon" aria-hidden="true">
                ←
              </span>
              <span className="ui-return__label">Inicio</span>
            </a>
            <h1>Identidad de empresa.</h1>
          </div>
          <div className="ui-workspace-heading__note">
            <p>
              Revisa el tema de {company.name} en los componentes de Intranet.
            </p>
            <Button variant="primary" onClick={() => setPanel(true)}>
              Probar formulario
            </Button>
          </div>
        </header>
        <nav className="ui-workspace-nav" aria-label="Ejemplos del tema">
          <a href="#module" aria-current="page">
            Módulo
          </a>
          <a href="#reading">Contenido claro</a>
          <a href="#controls">Controles y estados</a>
        </nav>
      </div>
      {company.id !== "banasan" && (
        <section className="company-sample-surface" id="brand-contrast">
          <h2>Contraste entre marca y navegación</h2>
          <p>
            Compara el logo original sobre el fondo institucional actual y sobre
            una superficie ajustada al logo. La propuesta cambia la superficie
            completa de navegación; el SVG permanece transparente y conserva sus
            colores.
          </p>
          <div className="company-contrast-grid">
            <figure>
              <figcaption>
                {company.id === "el-rubi"
                  ? "Anterior · logo y fondo de tonos cercanos"
                  : "Actual · logo y fondo de tonos cercanos"}
              </figcaption>
              <div
                className="company-shell-sample"
                style={{ background: company.base, color: "#FFFFFF" }}
              >
                <span>
                  <strong>Intranet</strong>
                  <img src={company.logo} alt={company.name} />
                </span>
                <span>Información · Servicios</span>
              </div>
            </figure>
            <figure>
              <figcaption>
                Propuesta · superficie {shell.description}
              </figcaption>
              <div
                className="company-shell-sample company-shell-sample--light"
                style={{ background: shell.surface, color: shell.text }}
              >
                <span>
                  <strong>Intranet</strong>
                  <img src={company.logo} alt={company.name} />
                </span>
                <span>Información · Servicios</span>
              </div>
            </figure>
          </div>
          {company.id !== "el-rubi" && (
            <div
              className="company-sample-actions"
              role="group"
              aria-label="Superficie de navegación de revisión"
            >
              <Button
                variant={surfaceMode === "current" ? "primary" : "secondary"}
                aria-pressed={surfaceMode === "current"}
                onClick={() => setSurfaceMode("current")}
              >
                Ver navegación actual
              </Button>
              <Button
                variant={surfaceMode === "contrast" ? "primary" : "secondary"}
                aria-pressed={surfaceMode === "contrast"}
                onClick={() => setSurfaceMode("contrast")}
              >
                Probar superficie contrastada
              </Button>
            </div>
          )}
          <p className="company-theme-note">
            {company.id === "agrobanano"
              ? "Agrobanano usa verdes luminosos: se propone una superficie oscura neutra para conservar su definición."
              : "El logo conserva tonos oscuros: se propone una superficie clara para separar la marca del color institucional."}
          </p>
          {company.id === "el-rubi" ? (
            <p className="company-theme-note" role="status">
              El Rubí ya utiliza navegación clara. La cabecera de módulo
              conserva el verde institucional.
            </p>
          ) : (
            <p className="company-theme-note" role="status">
              {surfaceMode === "contrast"
                ? "Revisando superficie contrastada para el logo activo. La cabecera de módulo conserva el color institucional."
                : "Revisando navegación actual. Cambia de empresa para comparar la misma composición."}{" "}
              Esta alternativa no está consolidada.
            </p>
          )}
        </section>
      )}
      <section className="company-sample-surface" id="module">
        <header className="company-palette">
          <div>
            <h2>{company.name}</h2>
            <p>Paleta candidata · No consolidada</p>
          </div>
          <div className="company-swatches">
            <span style={{ background: company.base, color: "white" }}>
              Institucional {company.base}
            </span>
            <span style={{ background: company.accent, color: "#10253A" }}>
              Acción {company.accent}
            </span>
          </div>
        </header>
        <PaginatedTable
          label="Reservas de demostración"
          rows={[
            {
              id: "1",
              name: "Reunión de equipo",
              date: "23 nov",
              status: "Pendiente",
            },
            {
              id: "2",
              name: "Planeación semanal",
              date: "24 nov",
              status: "Aprobada",
            },
          ]}
          rowKey={(r) => r.id}
          actions={[]}
          columns={[
            { key: "name", heading: "Solicitud", render: (r) => r.name },
            { key: "date", heading: "Fecha", render: (r) => r.date },
            { key: "status", heading: "Estado", render: (r) => r.status },
          ]}
        />
      </section>
      <section className="company-sample-surface" id="reading">
        <a className="ui-content-link" href="documentos.html">
          Volver a documentos
        </a>
        <h2>Contenido sobre superficie clara</h2>
        <p>
          Las páginas de lectura conservan sus superficies neutras. El nombre de
          la empresa y los enlaces cambian sin alterar la jerarquía ni el
          contenido de ejemplo.
        </p>
        <a className="ui-content-link" href="salas.html">
          Revisar este tema en Salas ↗
        </a>
      </section>
      <section className="company-sample-surface" id="controls">
        <h2>Controles y estados</h2>
        <div className="company-sample-fields">
          <TextField
            label="Nombre de ejemplo"
            placeholder="Nombre de la reunión"
          />
          <SelectField label="Sala">
            <option>Sala principal</option>
            <option>Sala de reuniones 2</option>
          </SelectField>
        </div>
        <div className="company-sample-actions">
          <Button
            variant="primary"
            onClick={() => setMessage("Acción de ejemplo realizada.")}
          >
            Acción principal
          </Button>
          <Button
            variant="secondary"
            onClick={() => setMessage("Acción secundaria de ejemplo.")}
          >
            Acción secundaria
          </Button>
          <Button variant="quiet" onClick={() => setMessage("")}>
            Limpiar mensaje
          </Button>
          <Button disabled>Acción no disponible</Button>
        </div>
        <p role="status">{message}</p>
        <div className="company-semantic-states">
          <p className="company-state-success">✓ Resultado correcto</p>
          <p className="company-state-warning">! Pendiente de revisión</p>
          <p className="company-state-error">× Revisa los datos</p>
        </div>
      </section>
      {panel && (
        <FloatingForm
          title="Formulario de ejemplo"
          onClose={() => setPanel(false)}
        >
          <form
            className="company-test-form"
            onSubmit={(e) => {
              e.preventDefault();
              setPanel(false);
              setMessage(
                "Formulario de ejemplo completado. No se guardaron datos.",
              );
            }}
          >
            <TextField label="Asunto" required />
            <TextAreaField label="Observación" />
            <p>Revisa colores, foco y acciones dentro del panel flotante.</p>
            <div className="company-sample-actions">
              <Button variant="quiet" onClick={() => setPanel(false)}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Completar ejemplo
              </Button>
            </div>
          </form>
        </FloatingForm>
      )}
    </>
  );
}
function App() {
  const [company, setCompany] = useState<CompanyTheme>(initial);
  const [draft, setDraft] = useState<string>(company.id);
  const [open, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const guard = useRef(false);
  useEffect(() => {
    const handle = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest("[data-change-company]")
          : null;
      if (!target) return;
      event.preventDefault();
      document
        .querySelector<HTMLButtonElement>(
          ".account-tray__identity [data-account-close]",
        )
        ?.click();
      setDraft(company.id);
      setOpen(true);
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, [company]);
  useEffect(() => {
    apply(company);
    const header = document.querySelector("[data-site-header], .site-header");
    const observer = new MutationObserver(() => apply(company));
    if (header) observer.observe(header, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [company]);
  const sampleHost = document.querySelector("[data-company-samples]");
  return (
    <ThemeProvider tokens={tokens(company)} className="company-theme-provider">
      {shellSlots.map((slot) =>
        createPortal(
          <button
            type="button"
            className="company-context-switch company-context-switch--shell"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label={"Cambiar empresa: " + company.name}
            title={"Cambiar empresa · " + company.name}
            onClick={() => {
              setDraft(company.id);
              setOpen(true);
            }}
          >
            <span className="company-logo-slot" data-company={company.id}>
              <img src={company.logo} alt="" />
            </span>
            <svg
              className="ui-icon company-switch-chevron"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="m4 6 4 4 4-4" />
            </svg>
          </button>,
          slot,
        ),
      )}
      <p className="sr-only" role="status">
        {announcement}
      </p>
      {sampleHost && createPortal(<Samples company={company} />, sampleHost)}
      {open && (
        <FloatingForm title="Cambiar empresa" onClose={() => setOpen(false)}>
          <form
            className="company-picker-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (guard.current) return;
              const next = companyThemes.find((c) => c.id === draft);
              if (!next) return;
              guard.current = true;
              apply(next);
              setCompany(next);
              setAnnouncement(
                "Tema de " +
                  next.name +
                  " aplicado. Los datos siguen siendo de demostración.",
              );
              setOpen(false);
              guard.current = false;
            }}
          >
            <p className="company-theme-note">
              Selecciona una empresa para revisar su identidad visual. Los
              colores son candidatos; este cambio no modifica datos ni permisos.
            </p>
            <CompanyPicker
              legend="Empresas de demostración"
              name="company-preview"
              value={draft}
              onChange={setDraft}
              options={companyThemes.map((c) => ({
                value: c.id,
                label: (
                  <span className="company-option-label">
                    <span className="company-logo-slot" data-company={c.id}>
                      <img src={c.logo} alt="" />
                    </span>
                    <span>{c.name}</span>
                  </span>
                ),
                description:
                  c.id === company.id
                    ? "Empresa activa"
                    : "Revisar tema candidato",
              }))}
            />
            <div className="company-sample-actions">
              <Button variant="quiet" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={draft === company.id}
              >
                Cambiar empresa
              </Button>
            </div>
            <a className="ui-content-link" href="temas-empresa.html">
              Ver todos los componentes de revisión ↗
            </a>
          </form>
        </FloatingForm>
      )}
    </ThemeProvider>
  );
}
const shellSlots = [
  ...document.querySelectorAll<HTMLElement>("[data-company-control-slot]"),
];
shellSlots.forEach((slot) => slot.replaceChildren());
const host = document.createElement("div");
host.id = "company-theme-preview";
document.body.append(host);
createRoot(host).render(<App />);
