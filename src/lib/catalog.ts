import type { AllergenId, PriceOption, ProductTag } from "./types";

/** Los 14 alérgenos de declaración obligatoria (Reglamento UE 1169/2011). */
export const ALLERGENS: { id: AllergenId; name: string; short: string; color: string }[] = [
  { id: "gluten", name: "Gluten", short: "GL", color: "#c58a1b" },
  { id: "crustaceos", name: "Crustáceos", short: "CR", color: "#e0533d" },
  { id: "huevos", name: "Huevos", short: "HU", color: "#e3a21a" },
  { id: "pescado", name: "Pescado", short: "PE", color: "#2f80c9" },
  { id: "cacahuetes", name: "Cacahuetes", short: "CA", color: "#9a5b22" },
  { id: "soja", name: "Soja", short: "SO", color: "#3c9a5f" },
  { id: "lacteos", name: "Lácteos", short: "LA", color: "#5b6476" },
  { id: "frutos_cascara", name: "Frutos de cáscara", short: "FC", color: "#7c3f1d" },
  { id: "apio", name: "Apio", short: "AP", color: "#4c9a3a" },
  { id: "mostaza", name: "Mostaza", short: "MO", color: "#c9a10e" },
  { id: "sesamo", name: "Sésamo", short: "SE", color: "#9aa4b2" },
  { id: "sulfitos", name: "Sulfitos", short: "SU", color: "#7d56c9" },
  { id: "altramuces", name: "Altramuces", short: "AL", color: "#e07b24" },
  { id: "moluscos", name: "Moluscos", short: "ML", color: "#2b6cb0" },
];

export const ALLERGEN_BY_ID = Object.fromEntries(ALLERGENS.map((a) => [a.id, a])) as Record<
  AllergenId,
  (typeof ALLERGENS)[number]
>;

export const TAG_LABEL: Record<ProductTag, string> = {
  casa: "Especialidad de la casa",
  nuevo: "Nuevo",
  vegetariano: "Vegetariano",
  vegano: "Vegano",
  sin_gluten: "Sin gluten",
  picante: "Picante",
};

export function formatPrice(value: number, currency = "EUR") {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(value);
}

/** Precio más bajo, para «desde X €» cuando hay varios tamaños. */
export function minPrice(prices: PriceOption[]) {
  return Math.min(...prices.map((p) => p.amount));
}

export function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
