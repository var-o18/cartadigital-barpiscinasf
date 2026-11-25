// Modelo de datos de la carta. Coincide con las tablas que tendrá Supabase,
// que compartirán este repositorio (carta pública) y el del panel de administración.

export type AllergenId =
  | "gluten"
  | "crustaceos"
  | "huevos"
  | "pescado"
  | "cacahuetes"
  | "soja"
  | "lacteos"
  | "frutos_cascara"
  | "apio"
  | "mostaza"
  | "sesamo"
  | "sulfitos"
  | "altramuces"
  | "moluscos";

export type ProductTag = "vegetariano" | "vegano" | "sin_gluten" | "picante" | "nuevo" | "casa";

/** Gran bloque de la carta, como en la carta en papel. */
export type MenuGroup = "comidas" | "bebidas";

/** Icono de categoría (nombres de componentes de Lucide). */
export type CategoryIcon =
  | "Croissant"
  | "Coffee"
  | "CupSoda"
  | "GlassWater"
  | "Beer"
  | "Martini"
  | "Sandwich"
  | "Hamburger"
  | "Drumstick"
  | "Fish"
  | "Soup"
  | "Wheat"
  | "Utensils"
  | "IceCreamCone";

/** Tabla `establishment` (un solo bar en este repositorio). */
export interface Establishment {
  name: string;
  /** Primera línea pequeña del logotipo, p. ej. «BAR PISCINA». */
  kicker: string;
  tagline: string;
  logoUrl: string | null;
  /** Imagen de cabecera. Si ya incluye el logotipo, no se pinta la caja con el nombre. */
  coverUrl: string | null;
  coverHasLogo: boolean;
  instagramUrl: string | null;
  facebookUrl: string | null;
  address: string | null;
  phone: string | null;
  openingHours: string | null;
  currency: string;
}

/** Tabla `menus`: carta de verano / carta de invierno. Solo una está activa. */
export interface Menu {
  id: string;
  name: string;
  season: "verano" | "invierno";
  isActive: boolean;
}

/** Tabla `categories` */
export interface Category {
  id: string;
  menuId: string;
  group: MenuGroup;
  name: string;
  icon: CategoryIcon;
  /** Aviso de la sección, p. ej. «Ingrediente adicional: +0,50 €». */
  note: string | null;
  /** `cards`: tarjetas con foto. `list`: lista compacta. */
  display: "cards" | "list";
  position: number;
  isActive: boolean;
}

/** Un producto puede tener un precio o varios (tamaños, ración / media ración…). */
export interface PriceOption {
  label: string | null;
  amount: number;
}

/** Tabla `products` */
export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string | null;
  prices: PriceOption[];
  imageUrl: string | null;
  allergens: AllergenId[];
  tags: ProductTag[];
  isAvailable: boolean;
  isFeatured: boolean;
  position: number;
}

export interface CartaData {
  establishment: Establishment;
  menu: Menu;
  categories: Category[];
  products: Product[];
}
