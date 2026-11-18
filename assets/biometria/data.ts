export const companies = ["Banasan", "Agros"] as const;
export type Company = (typeof companies)[number];
export const places = {
  Banasan: ["Recepción", "Centro logístico"],
  Agros: ["Finca Aurora", "Finca Palma"],
};
export const today = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "America/Bogota",
}).format(new Date());
export function previous(day: string, n: number) {
  const date = new Date(day + "T12:00:00Z");
  date.setUTCDate(date.getUTCDate() - n);
  return date.toISOString().slice(0, 10);
}
export function range(period: string) {
  return period === "7 días"
    ? previous(today, 6)
    : period === "Mes"
      ? today.slice(0, 7) + "-01"
      : today;
}
const names = [
  "Ana",
  "Luis",
  "Elena",
  "Andrés",
  "Laura",
  "Diego",
  "Sara",
  "Juan",
];
const surnames = ["Ríos", "Vega", "Reyes", "Mora", "Luna", "Pardo"];
export const people = Array.from({ length: 48 }, (_, i) => ({
  id: "DEMO-" + (1001 + i),
  name: names[i % 8] + " " + surnames[Math.floor(i / 8)],
  company: companies[Math.floor(i / 24)],
  department: ["Compras", "Operaciones", "Logística"][i % 3],
}));
export type Person = (typeof people)[number];
export const devices = ["REC-01", "LOG-01", "AUR-01", "PAL-01"];
export const points = [
  "Puerta principal",
  "Acceso a bodega",
  "Portería Aurora",
  "Portería Palma",
];
export const sources = {
  Banasan: { day: today, time: "12:00", late: false },
  Agros: { day: today, time: "08:00", late: true },
};
export interface Mark {
  key: string;
  person: Person;
  day: string;
  time: string;
  place: string;
  point: string;
  device: string;
  kind: string;
  linked: boolean;
}
export const marks: Mark[] = [];
for (let offset = 0; offset < 70; offset++) {
  const day = previous(today, offset);
  people.forEach((person, i) => {
    const company = person.company;
    if (day > sources[company].day || (i + offset) % 6 === 0) return;
    const times =
      day === today || (i + offset) % 5 === 0 ? ["07"] : ["07", "16"];
    times.forEach((hour, j) => {
      const location = (i + (j && i % 5 === 0 ? 1 : 0)) % 2;
      const device = (company === "Agros" ? 2 : 0) + location;
      marks.push({
        key: day + person.id + hour,
        person,
        day,
        time: hour + ":" + String((i * 7 + offset) % 60).padStart(2, "0"),
        place: places[company][location],
        device: devices[device],
        point: points[device],
        kind: "Acceso verificado",
        linked: company === "Agros" && i % 7 !== 0,
      });
    });
  });
}
marks.sort((a, b) => (b.day + b.time).localeCompare(a.day + a.time));
export const unique = (rows: Mark[]) =>
  new Set(rows.map((x) => x.person.id)).size;
export const syncText = (company: Company) =>
  "Datos hasta " +
  sources[company].day +
  " · " +
  sources[company].time +
  " COT";
export const roleNames = ["Consulta", "Gestión", "Administración"] as const;
export type Role = (typeof roleNames)[number];
export const permissions = (role: Role) => ({
  export: role !== "Consulta",
  manage: role !== "Consulta",
  admin: role === "Administración",
});
