export const companyThemes = [
  {
    id: "banasan",
    name: "Banasan",
    logo: "assets/company-theme/banasan-display.svg",
    base: "#031D36",
    accent: "#FFD000",
  },
  {
    id: "el-rubi",
    name: "Bananera El Rubí",
    logo: "assets/company-theme/el-rubi-display.svg",
    base: "#005236",
    accent: "#F6D633",
  },
  {
    id: "banaorganico",
    name: "BanaOrgánico",
    logo: "assets/company-theme/banaorganico-display.svg",
    base: "#006B36",
    accent: "#E6C344",
  },
  {
    id: "agrobanano",
    name: "Agrobanano",
    logo: "assets/company-theme/agrobanano-display.svg",
    base: "#354A18",
    accent: "#B3CF32",
  },
  {
    id: "agrobanacaribe",
    name: "Agrobanacaribe",
    logo: "assets/company-theme/agrobanacaribe-display.svg",
    base: "#3E5317",
    accent: "#DBDF70",
  },
  {
    id: "la-ceiba",
    name: "Agroinversiones La Ceiba",
    logo: "assets/company-theme/la-ceiba-display.svg",
    base: "#2D6033",
    accent: "#A4BF2A",
  },
] as const;
export type CompanyTheme = (typeof companyThemes)[number];
