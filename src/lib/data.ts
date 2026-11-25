import "server-only";
import { CATEGORIES, ESTABLISHMENT, MENUS, PRODUCTS } from "@/data/carta";
import type { CartaData } from "./types";

/**
 * Devuelve la carta activa (verano o invierno) con sus categorías y productos.
 *
 * Hoy lee los datos locales de `src/data/carta.ts`. Cuando conectemos Supabase
 * solo cambiará esta función: el resto de la carta no se toca.
 */
export async function getActiveCarta(): Promise<CartaData | null> {
  const menu = MENUS.find((m) => m.isActive);
  if (!menu) return null;

  const categories = CATEGORIES.filter((c) => c.menuId === menu.id && c.isActive).sort(
    (a, b) => a.position - b.position,
  );
  const categoryIds = new Set(categories.map((c) => c.id));
  const products = PRODUCTS.filter((p) => categoryIds.has(p.categoryId)).sort((a, b) => a.position - b.position);

  return { establishment: ESTABLISHMENT, menu, categories, products };
}
