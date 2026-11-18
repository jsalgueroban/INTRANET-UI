import { useEffect, useRef, useState } from "react";
import {
  Button,
  PaginatedTable,
  SelectField,
  TextField,
  Field,
  SearchField,
  Icon,
  FilterBar,
} from "@banasandev/intranet-ui";
import {
  companies,
  marks,
  people,
  places,
  range,
  sources,
  syncText,
  today,
  unique,
  type Mark,
} from "./data";
export type Filters = Record<string, string>;
export type Go = (view: string, filters?: Filters) => void;
export function Overview({ filters, go }: { filters: Filters; go: Go }) {
  const period = filters.period || "Hoy";
  const from = range(period);
  return (
    <>
      <div className="bio-toolbar">
        <FilterBar
          aria-label="Período de actividad"
          value={period}
          onChange={(value) => go("inicio", { period: value })}
          options={[
            { value: "Hoy", label: "Hoy" },
            { value: "7 días", label: "Últimos 7 días" },
            { value: "Mes", label: "Mes" },
          ]}
        />
      </div>
      <div className="bio-companies">
        {companies.map((company) => {
          const rows = marks.filter(
            (m) => m.person.company === company && m.day >= from,
          );
          const agros = company === "Agros";
          return (
            <article key={company}>
              <header>
                <h3>{company}</h3>
                <span className={sources[company].late ? "late" : "fresh"}>
                  {sources[company].late ? "Carga atrasada" : "Carga al día"}
                </span>
              </header>
              <p>{syncText(company)}</p>
              <div className="bio-metrics">
                <div>
                  <b>{rows.length}</b>Marcaciones
                </div>
                <div>
                  <b>{unique(rows)}</b>Personas distintas
                </div>
                {agros && (
                  <div>
                    <b>{rows.filter((m) => m.linked).length}</b>Vinculadas a
                    nómina
                  </div>
                )}
              </div>
              <div className="ui-list">
                {places[company].map((place) => {
                  const subset = rows.filter((m) => m.place === place);
                  return (
                    <a
                      key={place}
                      className="ui-list-row ui-list-row--text"
                      href={
                        "#/?" +
                        new URLSearchParams({
                          view: "marcaciones",
                          company,
                          place,
                          from,
                          to: today,
                        })
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        go("marcaciones", { company, place, from, to: today });
                      }}
                    >
                      <span className="ui-list-row__content">
                        <strong>{place}</strong>
                        <small>
                          {agros ? "Finca" : "Área de marcación"} · {company}
                        </small>
                      </span>
                      <span className="ui-list-row__meta">
                        {subset.length} marcaciones · {unique(subset)} personas
                        {agros && (
                          <>
                            <br />
                            {subset.filter((m) => m.linked).length} vinculadas a
                            nómina
                          </>
                        )}
                      </span>
                      <span className="ui-list-row__action">
                        <svg
                          className="ui-icon"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M4 12 12 4M6 4h6v6" />
                        </svg>
                      </span>
                    </a>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
      <p className="bio-note">
        Las personas se cuentan una vez por empresa, aunque marquen en varios
        lugares. Los recuentos cubren hasta la última carga indicada.
      </p>
    </>
  );
}
export function Records({
  filters: f,
  go,
  canExport,
}: {
  filters: Filters;
  go: Go;
  canExport: boolean;
}) {
  const change = (key: string, value: string) =>
    go("marcaciones", {
      ...f,
      [key]: value,
      ...(key === "company" ? { place: "" } : {}),
    });
  const rows = marks.filter(
    (m) =>
      (!f.company || m.person.company === f.company) &&
      (!f.place || m.place === f.place) &&
      (!f.from || m.day >= f.from) &&
      (!f.to || m.day <= f.to) &&
      matches(m.person.name + " " + m.person.id, f.q || ""),
  );
  const history = (m: Mark) =>
    go("historico", { id: m.person.id, month: m.day.slice(0, 7), day: m.day });
  const columns = [
    {
      key: "date",
      heading: "Fecha y hora",
      render: (m: Mark) => m.day + " · " + m.time,
    },
    {
      key: "person",
      heading: "Persona",
      render: (m: Mark) => (
        <button className="bio-link" onClick={() => history(m)}>
          {m.person.name}
          <small>{m.person.id}</small>
        </button>
      ),
    },
    {
      key: "place",
      heading: "Lugar",
      render: (m: Mark) => (
        <>
          {m.place}
          <small>{m.person.company}</small>
        </>
      ),
    },
    { key: "device", heading: "Dispositivo", render: (m: Mark) => m.device },
    {
      key: "context",
      heading: "Detalle de la fuente",
      render: (m: Mark) =>
        m.person.company === "Agros" ? (
          m.linked ? (
            "Vinculada a nómina"
          ) : (
            "Sin vincular"
          )
        ) : (
          <>
            {m.point}
            <small>
              {m.kind} · Dpto. {m.person.department}
            </small>
          </>
        ),
    },
  ];
  function download() {
    const data = [
      [
        "Fecha",
        "Hora COT",
        "Persona",
        "Identificación",
        "Empresa",
        "Lugar",
        "Departamento",
        "Dispositivo",
        "Punto de acceso",
        "Evento",
        "Nómina",
      ],
      ...rows.map((m) => [
        m.day,
        m.time,
        m.person.name,
        m.person.id,
        m.person.company,
        m.place,
        m.person.department,
        m.device,
        m.person.company === "Banasan" ? m.point : "",
        m.person.company === "Banasan" ? m.kind : "",
        m.person.company === "Agros"
          ? m.linked
            ? "Vinculada"
            : "Sin vincular"
          : "",
      ]),
    ];
    const csv = data
      .map((row) =>
        row.map((v) => '"' + v.replaceAll('"', '""') + '"').join(";"),
      )
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "marcaciones-demo.csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <div className="bio-filters">
        <SelectField
          label="Empresa"
          value={f.company || ""}
          onChange={(e) => change("company", e.target.value)}
        >
          <option value="">Todas</option>
          {companies.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </SelectField>
        <SelectField
          label="Área o finca"
          value={f.place || ""}
          onChange={(e) => change("place", e.target.value)}
        >
          <option value="">Todas</option>
          {companies
            .filter((c) => !f.company || c === f.company)
            .flatMap((c) => places[c])
            .map((p) => (
              <option key={p}>{p}</option>
            ))}
        </SelectField>
        {["from", "to"].map((k, i) => (
          <TextField
            key={k}
            label={i ? "Hasta" : "Desde"}
            type="date"
            value={f[k] || ""}
            onChange={(e) => change(k, e.target.value)}
          />
        ))}
        <Field label="Persona" htmlFor="marks-person">
          <SearchField
            icon={<Icon name="search" />}
            id="marks-person"
            aria-label="Persona"
            onClear={() => change("q", "")}
            placeholder="Nombre o identificación"
            value={f.q || ""}
            onChange={(e) => change("q", e.target.value)}
          />
        </Field>
      </div>
      <p>
        {companies
          .filter((c) => !f.company || c === f.company)
          .map((c) => c + " · " + syncText(c))
          .join("　|　")}
      </p>
      <div className="bio-toolbar">
        <h2>{rows.length} marcaciones</h2>
        {canExport && (
          <Button
            disabled={!rows.length || Boolean(f.from && f.to && f.from > f.to)}
            onClick={download}
          >
            Exportar CSV
          </Button>
        )}
      </div>
      {f.from && f.to && f.from > f.to ? (
        <p role="alert">
          La fecha final debe ser igual o posterior a la inicial.
        </p>
      ) : (
        <PaginatedTable
          key={JSON.stringify(f)}
          label="Marcaciones"
          rows={rows}
          columns={columns}
          rowKey={(m) => m.key}
          actions={[{ label: "Ver histórico mensual", onSelect: history }]}
          pageSize={25}
        />
      )}
    </>
  );
}
function matches(value: string, query: string) {
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  return normalize(value).includes(normalize(query.trim()));
}
export function History({ filters: f, go }: { filters: Filters; go: Go }) {
  const [q, setQ] = useState("");
  const detailPanel = useRef<HTMLElement>(null);
  const revealDay = useRef(false);
  useEffect(() => {
    if (!revealDay.current) return;
    revealDay.current = false;
    detailPanel.current?.focus({ preventScroll: true });
    detailPanel.current?.scrollIntoView({
      block: "nearest",
      behavior: "instant",
    });
  }, [f.day]);
  const options = people.filter((p) => matches(p.name + " " + p.id, q));
  const person = options.find((p) => p.id === f.id) ?? options[0];
  const month = f.month || today.slice(0, 7);
  const rows = marks.filter(
    (m) => m.person.id === person?.id && m.day.startsWith(month),
  );
  const days = [...new Set(rows.map((m) => m.day))].map((day) => ({
    day,
    list: rows.filter((m) => m.day === day).reverse(),
  }));
  const active = days.find((d) => d.day === f.day);
  function choose(day: string) {
    revealDay.current = true;
    if (person) go("historico", { id: person.id, month, day });
  }
  return (
    <>
      <div className="bio-filters">
        <Field label="Buscar persona" htmlFor="history-person">
          <SearchField
            icon={<Icon name="search" />}
            id="history-person"
            aria-label="Buscar persona"
            onClear={() => setQ("")}
            value={q}
            placeholder="Nombre o identificación"
            onChange={(e) => setQ(e.target.value)}
          />
        </Field>
        <SelectField
          label="Persona"
          value={person?.id || ""}
          onChange={(e) => go("historico", { id: e.target.value, month })}
        >
          {options.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} · {p.id}
            </option>
          ))}
        </SelectField>
        <TextField
          label="Mes"
          type="month"
          value={month}
          onChange={(e) =>
            go("historico", { id: person?.id || "", month: e.target.value })
          }
        />
      </div>
      {person ? (
        <>
          <h2>{person.name}</h2>
          <p>
            {person.company} · Departamento de {person.department} ·{" "}
            {syncText(person.company)}
          </p>
          <p>
            <strong>{days.length} días con marcación</strong> · {rows.length}{" "}
            registros
          </p>
          <div className="bio-split">
            <PaginatedTable
              key={person.id + month}
              label="Resumen diario"
              rows={days}
              rowKey={(d) => d.day}
              actions={[]}
              columns={[
                {
                  key: "day",
                  heading: "Día",
                  render: (d) => (
                    <button className="bio-link" onClick={() => choose(d.day)}>
                      {d.day}
                    </button>
                  ),
                },
                {
                  key: "n",
                  heading: "Marcas",
                  render: (d) =>
                    d.list.length === 1 ? "Una sola marca" : d.list.length,
                },
                {
                  key: "first",
                  heading: "Primera",
                  render: (d) => d.list[0].time,
                },
                {
                  key: "last",
                  heading: "Última",
                  render: (d) => d.list[d.list.length - 1].time,
                },
              ]}
            />
            <aside
              ref={detailPanel}
              tabIndex={-1}
              className="editorial-aside"
              aria-label="Secuencia del día"
            >
              <h3>
                {active ? "Secuencia del " + active.day : "Secuencia del día"}
              </h3>
              {active ? (
                <ol>
                  {active.list.map((m) => (
                    <li key={m.key}>
                      <b>{m.time}</b>　{m.place}
                      <small>
                        {m.point} · {m.device}
                      </small>
                    </li>
                  ))}
                </ol>
              ) : (
                <p>
                  Selecciona un día para consultar sus marcaciones en orden.
                </p>
              )}
            </aside>
          </div>
        </>
      ) : (
        <p>Sin personas que coincidan con la búsqueda.</p>
      )}
    </>
  );
}
