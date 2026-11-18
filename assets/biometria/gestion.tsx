import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Button,
  PaginatedTable,
  SelectField,
  TextField,
  TextAreaField,
  Field,
  SearchField,
  Icon,
  FilterBar,
} from "@banasandev/intranet-ui";
import {
  people,
  places,
  companies,
  devices,
  points,
  syncText,
  today,
  previous,
  type Role,
} from "./data";

type Change = { when: string; who: string; action: string };
interface Case {
  key: string;
  id: string;
  place: string;
  type: string;
  from: string;
  to: string;
  note: string;
  reviewed: boolean;
  changes: Change[];
}
const actors: Record<Role, string> = {
  Consulta: "Lector demo",
  Gestión: "Gestora demo",
  Administración: "Administradora demo",
};
const seeds: Case[] = [0, 28].map((i, n) => ({
  key: "demo-" + i,
  id: people[i].id,
  place: places[people[i].company][n],
  type: n ? "Corrección solicitada" : "Permiso",
  from: previous(today, 1),
  to: today,
  note: n
    ? "Validar el lector de portería."
    : "Permiso registrado para revisión.",
  reviewed: false,
  changes: [
    {
      when: previous(today, 1) + " 09:20",
      who: "Gestora demo",
      action: "Registrada",
    },
  ],
}));
function load(): Case[] {
  try {
    const data = JSON.parse(
      sessionStorage.getItem("biometria-casos-v1") || "null",
    );
    return Array.isArray(data) ? data : seeds;
  } catch {
    return seeds;
  }
}
export function Cases({ role }: { role: Role }) {
  const [items, setItems] = useState<Case[]>(load);
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");
  const matching = items.filter((item) => {
    const person = people.find((p) => p.id === item.id);
    return (
      (status === "all" || (status === "reviewed") === item.reviewed) &&
      ((person?.name || "") + " " + item.id + " " + item.type)
        .toLocaleLowerCase("es")
        .includes(query.trim().toLocaleLowerCase("es"))
    );
  });
  const [editing, setEditing] = useState(false),
    [active, setActive] = useState(""),
    [id, setId] = useState(people[0].id),
    [error, setError] = useState("");
  const person = people.find((p) => p.id === id) ?? people[0],
    detail = items.find((item) => item.key === active);
  const detailPanel = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!active) return;
    detailPanel.current?.focus({ preventScroll: true });
    detailPanel.current?.scrollIntoView({
      block: "nearest",
      behavior: "instant",
    });
  }, [active]);
  function save(next: Case[]) {
    setItems(next);
    try {
      sessionStorage.setItem("biometria-casos-v1", JSON.stringify(next));
    } catch {
      setError(
        "Los cambios solo se conservarán mientras esta vista esté abierta.",
      );
    }
  }
  function change(action: string) {
    return {
      action,
      who: actors[role],
      when: new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
    };
  }
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const value = (k: string) => String(data.get(k) || "").trim();
    if (value("to") < value("from") || !value("note")) {
      setError("Revisa el período y escribe una observación.");
      return;
    }
    const item = {
      key: crypto.randomUUID(),
      id,
      place: value("place"),
      type: value("type"),
      from: value("from"),
      to: value("to"),
      note: value("note"),
      reviewed: false,
      changes: [change("Registrada")],
    };
    setError("");
    save([item, ...items]);
    setEditing(false);
    setActive(item.key);
  }
  return (
    <>
      <div className="bio-toolbar">
        <h2>Novedades registradas</h2>
        <Button
          variant={editing ? "quiet" : "primary"}
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Cancelar" : "Registrar novedad"}
        </Button>
      </div>
      {editing && (
        <form className="bio-form" onSubmit={submit}>
          <div className="bio-filters">
            <SelectField
              label="Persona"
              value={id}
              onChange={(e) => setId(e.target.value)}
            >
              {people.map((p) => (
                <option value={p.id} key={p.id}>
                  {p.name} · {p.company}
                </option>
              ))}
            </SelectField>
            <SelectField label="Área o finca" key={person.company} name="place">
              {places[person.company].map((p) => (
                <option key={p}>{p}</option>
              ))}
            </SelectField>
            <SelectField label="Tipo" name="type">
              <option>Permiso</option>
              <option>Corrección solicitada</option>
              <option>Observación de marcación</option>
            </SelectField>
            {["from", "to"].map((k, i) => (
              <TextField
                key={k}
                label={i ? "Hasta" : "Desde"}
                required
                type="date"
                name={k}
                defaultValue={today}
              />
            ))}
          </div>
          <TextAreaField
            label="Observación"
            name="note"
            required
            maxLength={1000}
          />
          <Button type="submit" variant="primary">
            Guardar novedad
          </Button>
        </form>
      )}
      {error && <p role="alert">{error}</p>}
      <FilterBar
        counted
        aria-label="Estado de las novedades"
        value={status}
        onChange={setStatus}
        options={[
          { value: "all", label: "Todas", count: items.length },
          {
            value: "pending",
            label: "Pendientes",
            count: items.filter((i) => !i.reviewed).length,
          },
          {
            value: "reviewed",
            label: "Revisadas",
            count: items.filter((i) => i.reviewed).length,
          },
        ]}
      />
      <div className="bio-filters">
        <Field label="Buscar novedad" htmlFor="case-search">
          <SearchField
            icon={<Icon name="search" />}
            id="case-search"
            aria-label="Buscar novedad"
            placeholder="Persona, identificación o tipo"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery("")}
          />
        </Field>
      </div>
      <PaginatedTable
        key={status + query}
        label="Novedades"
        rows={matching}
        rowKey={(i) => i.key}
        actions={[
          { label: "Consultar historial", onSelect: (i) => setActive(i.key) },
        ]}
        columns={[
          {
            key: "p",
            heading: "Persona",
            render: (i) => (
              <button className="bio-link" onClick={() => setActive(i.key)}>
                {people.find((p) => p.id === i.id)?.name}
              </button>
            ),
          },
          {
            key: "place",
            heading: "Empresa y lugar",
            render: (i) => (
              <>
                {people.find((p) => p.id === i.id)?.company}
                <small>{i.place}</small>
              </>
            ),
          },
          { key: "type", heading: "Novedad", render: (i) => i.type },
          {
            key: "period",
            heading: "Período",
            render: (i) => i.from + " — " + i.to,
          },
          {
            key: "state",
            heading: "Estado",
            render: (i) => (i.reviewed ? "Revisada" : "Pendiente"),
          },
        ]}
      />
      {detail && (
        <aside
          ref={detailPanel}
          tabIndex={-1}
          className="editorial-aside"
          aria-label="Detalle de novedad"
        >
          <div className="bio-toolbar">
            <h3>
              {detail.type} · {people.find((p) => p.id === detail.id)?.name}
            </h3>
            <Button variant="quiet" onClick={() => setActive("")}>
              Cerrar detalle
            </Button>
          </div>
          <p>{detail.note}</p>
          <h4>Historial de gestión</h4>
          <ul>
            {detail.changes.map((c, i) => (
              <li key={i}>
                {c.action} · {c.who} · {c.when}
              </li>
            ))}
          </ul>
          {!detail.reviewed && (
            <Button
              onClick={() =>
                save(
                  items.map((i) =>
                    i.key === detail.key
                      ? {
                          ...i,
                          reviewed: true,
                          changes: [...i.changes, change("Revisada")],
                        }
                      : i,
                  ),
                )
              }
            >
              Marcar como revisada
            </Button>
          )}
        </aside>
      )}
    </>
  );
}
export function Admin() {
  return (
    <>
      <div className="bio-companies">
        {companies.map((c, i) => (
          <article key={c}>
            <h3>{c}</h3>
            <p>
              {syncText(c)} · {i ? "Carga atrasada" : "Carga al día"}
            </p>
            <PaginatedTable
              label={"Dispositivos de " + c}
              actions={[]}
              rowKey={(row) => row.device}
              rows={places[c].map((place, j) => ({
                place,
                point: points[2 * i + j],
                device: devices[2 * i + j],
              }))}
              columns={[
                {
                  key: "place",
                  heading: i ? "Finca" : "Área",
                  render: (row) => row.place,
                },
                {
                  key: "point",
                  heading: "Punto de acceso",
                  render: (row) => row.point,
                },
                {
                  key: "device",
                  heading: "Dispositivo",
                  render: (row) => row.device,
                },
              ]}
            />
          </article>
        ))}
      </div>
      <p className="bio-note">
        Correspondencias de ejemplo. Operación debe confirmar las áreas y los
        tipos de evento que se contabilizan en Banasan.
      </p>
    </>
  );
}
