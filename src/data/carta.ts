import type { Category, CategoryIcon, Establishment, Menu, MenuGroup, PriceOption, Product, ProductTag } from "@/lib/types";

// Carta real del Bar Piscina San Fulgencio, transcrita de la carta en papel.
// Hasta conectar Supabase, la carta pública lee estos datos. Después servirán
// como datos iniciales (seed) de la base de datos.
//
// ⚠️ Alérgenos: están vacíos a propósito. Los tiene que indicar el bar
// (es información obligatoria por ley y no se puede suponer).

export const ESTABLISHMENT: Establishment = {
  name: "San Fulgencio",
  kicker: "Bar Piscina",
  tagline: "¡Disfruta, relájate y brinda!",
  logoUrl: null, // Pendiente: logotipo del flamenco en buena calidad.
  coverUrl: "/portada.webp", // Banner oscuro del bar con el logotipo.
  coverHasLogo: true,
  instagramUrl: "https://www.instagram.com/bar.piscina.sanfulgencio/",
  facebookUrl: null,
  address: null,
  phone: null,
  openingHours: null,
  currency: "EUR",
};

export const MENUS: Menu[] = [
  { id: "verano", name: "Carta de verano", season: "verano", isActive: true },
  { id: "invierno", name: "Carta de invierno", season: "invierno", isActive: false },
];

// Fotos de ejemplo de Unsplash (licencia gratuita, uso comercial permitido)
// hasta tener las fotos reales del bar, que se subirán desde el panel.
const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=75&auto=format&fit=crop`;

const P = {
  // Entrantes
  olivas: img("1708949124687-8de24592d365"),
  croquetasJamon: img("1713517915303-ae3b3429f939"),
  croquetasPollo: img("1683694062041-cc62c5390b13"),
  tortilla: img("1639669794539-952631b44515"),
  panTomate: img("1609015746380-571227e2bc72"),
  ensaladillaRusa: img("1735132672415-3851da13d5ea"),
  ensaladillaBoca: img("1612949060306-4c298ad7f34c"),
  magra: img("1752627559682-9b7f0f0ded4e"),
  patatasFritas: img("1585109649139-366815a0d713"),
  conejo: img("1667396702543-a239efa7a7f2"),
  bravas: img("1565599837634-134bc3aadce8"),
  // Raciones
  calamares: img("1734771219838-61863137b117"),
  cazon: img("1786997089873-e4c02377bd3d"),
  poton: img("1569263900347-06b1e8c825ab"),
  torrezno: img("1723966834149-6f3dbff47ecb"),
  // Hamburguesas, perritos y nuggets
  hamburguesa1: img("1568901346375-23c9450c58cd"),
  hamburguesa2: img("1550317138-10000687a72b"),
  hamburguesa3: img("1571091718767-18b5b1457add"),
  perritoSencillo: img("1721648373511-fb220d7f043f"),
  perritoCompleto: img("1638368593249-7cadb261e8b3"),
  nuggets: img("1562967914-608f82629710"),
  // Bocadillos
  bocaJamon: img("1785960072642-e98ddac27218"),
  bocaQueso: img("1749250395965-e52b1f6e5aca"),
  bocaAtun: img("1558985250-27a406d64cb3"),
  bocaMixto: img("1647505794572-0a6d945d664d"),
  bocaTortilla: img("1716834092510-3be5db563920"),
  bocaVegetal: img("1655279562015-047c3da9a271"),
  bocaBacon: img("1603903631889-b5f3ba4d5b9b"),
  bocaLomo: img("1761712826051-b873907fb5d3"),
  bocaLonganiza: img("1575496118038-3689d62e5235"),
  kebab: img("1633321702518-7feccafb94d5"),
  bocaPollo: img("1700937244987-92488ab2ada5"),
  bocaCalamares: img("1559466273-d95e72debaf8"),
  morcilla: img("1610970880754-708a4a004f42"),
  // Tostadas
  tosAceite: img("1612827788868-c8632040ab64"),
  tosMermelada: img("1619095956510-24c12e2c4b9a"),
  tosTomate: img("1585768425229-d3a88ff63ebb"),
  tosYork: img("1710106878803-b85a4550c1d8"),
  tosQueso: img("1643473806845-485d1f11688c"),
  tosAtun: img("1779914942318-494c24cd8530"),
  jamon: img("1610995961454-1862ae1ee65b"),
  // Picoteo
  croissant: img("1555507036-ab1f4038808a"),
  magdalena: img("1607958996333-41aef7caefaa"),
  napolitana: img("1613929231151-d7571591259e"),
  panini: img("1539252554453-80ab65ce3586"),
  croissantJyQ: img("1639667851375-49c6c8c04b1c"),
  // Cafés
  espresso: img("1559496417-e7f25cb247f3"),
  cortado: img("1558122104-355edad709f6"),
  americano: img("1634913564795-7825a3266590"),
  cafeLeche: img("1541167760496-1628856ab772"),
  manchado: img("1599398054066-846f28917f38"),
  bombon: img("1563090308-5a7889e40542"),
  infusion: img("1571934811356-5cc061b6821f"),
  // Granizados
  granizado: img("1762631178352-f7ae732b42c4"),
  granizadoEspecial: img("1461023058943-07fcbe16d735"),
  // Agua y refrescos
  aguaPequena: img("1548839140-29a749e1cf4d"),
  aguaGrande: img("1616118132534-381148898bb4"),
  aguaGas: img("1534616042650-80f5c9b61f09"),
  cola: img("1624552184280-9e9631bbeee9"),
  naranja: img("1566846128021-b940b0eec910"),
  zumo: img("1596392301391-e8622b210bd4"),
  isotonica: img("1764175098858-d206d4fbc084"),
  limon: img("1621330716555-5cad596c4562"),
  te: img("1556679343-c7306c1976bc"),
  tonica: img("1769031116811-a9c5fc04a40b"),
  // Cervezas, copas y cubatas
  bote: img("1696739696220-8d2e27465662"),
  cana: img("1618183479302-1e0aa382c36b"),
  tintoVerano: img("1603048004570-6a82fc507364"),
  vino: img("1769140243164-b677642e9279"),
  vermut: img("1593433855865-6046a14605b9"),
  tanque: img("1608270586620-248524c67de9"),
  cubata: img("1514362545857-3bc16c4c7d1b"),
  premium: img("1617524454933-ab8853813111"),
};

// --- Ayudantes para escribir la carta de forma compacta -----------------------

type ProductSeed = {
  name: string;
  price: number | [string, number][];
  image: string;
  description?: string;
  tags?: ProductTag[];
  featured?: boolean;
};

type CategorySeed = {
  id: string;
  group: MenuGroup;
  name: string;
  icon: CategoryIcon;
  note?: string;
  products: ProductSeed[];
};

const RACION = (r: number, m: number): [string, number][] => [
  ["Ración", r],
  ["½ ración", m],
];

// El orden de este array es el orden de la carta.
const SEED: CategorySeed[] = [
  // ============================== COMIDAS ==============================
  {
    id: "entrantes",
    group: "comidas",
    name: "Entrantes",
    icon: "Soup",
    products: [
      { name: "Patatas bravas", price: 5.5, image: P.bravas, featured: true },
      { name: "Croquetas de jamón", description: "Precio por unidad.", price: 1.5, image: P.croquetasJamon },
      { name: "Croquetas de pollo", description: "Precio por unidad.", price: 1.5, image: P.croquetasPollo },
      { name: "Pincho de tortilla", price: 3, image: P.tortilla },
      { name: "Ensaladilla rusa", price: 3.5, image: P.ensaladillaRusa },
      { name: "Ensaladilla de boca", price: 3.5, image: P.ensaladillaBoca },
      { name: "Pan con tomate y alioli", price: 3.5, image: P.panTomate },
      { name: "Patatas fritas", price: 4.5, image: P.patatasFritas },
      { name: "Magra con tomate", price: 4, image: P.magra },
      { name: "Conejo con tomate", price: 4.5, image: P.conejo },
      { name: "Olivas", price: 1, image: P.olivas },
    ],
  },
  {
    id: "raciones",
    group: "comidas",
    name: "Raciones",
    icon: "Fish",
    products: [
      { name: "Calamares", price: RACION(8, 4.5), image: P.calamares },
      { name: "Cazón", price: RACION(8, 4.5), image: P.cazon },
      { name: "Potón (sepia)", price: RACION(8, 4.5), image: P.poton },
      { name: "Torrezno", price: RACION(9.9, 5.5), image: P.torrezno },
    ],
  },
  {
    id: "hamburguesas",
    group: "comidas",
    name: "Hamburguesas",
    icon: "Hamburger",
    note: "Acompañadas de patatas fritas",
    products: [
      { name: "Hamburguesa sencilla", description: "Ternera y queso.", price: 7.5, image: P.hamburguesa1 },
      {
        name: "Hamburguesa completa",
        description: "Ternera, queso, bacon, lechuga y tomate.",
        price: 9.5,
        image: P.hamburguesa2,
      },
      {
        name: "Hamburguesa «Floppy»",
        description: "Carne Angus, doble bacon, queso, lechuga y tomate.",
        price: 12.5,
        image: P.hamburguesa3,
        tags: ["casa"],
        featured: true,
      },
    ],
  },
  {
    id: "perritos-nuggets",
    group: "comidas",
    name: "Perritos y nuggets",
    icon: "Drumstick",
    products: [
      { name: "Perrito sencillo", description: "Salchicha, mayonesa y ketchup.", price: 7.5, image: P.perritoSencillo },
      {
        name: "Perrito completo",
        description: "Salchicha, patatas crujientes, cebolla, queso fundido, mayonesa y ketchup.",
        price: 9.5,
        image: P.perritoCompleto,
        featured: true,
      },
      {
        name: "Nuggets de pollo",
        description: "Acompañados de patatas fritas.",
        price: 7.5,
        image: P.nuggets,
        featured: true,
      },
    ],
  },
  {
    id: "bocadillos",
    group: "comidas",
    name: "Bocadillos",
    icon: "Sandwich",
    note: "Ingrediente adicional: +1,00 €",
    products: [
      { name: "Jamón serrano", price: 4.5, image: P.bocaJamon },
      { name: "Queso manchego", price: 4.5, image: P.bocaQueso },
      { name: "Atún", price: 4.5, image: P.bocaAtun },
      { name: "Jamón york y queso", price: 4.5, image: P.bocaMixto },
      { name: "Tortilla de patatas", price: 4.5, image: P.bocaTortilla },
      { name: "Vegetal", price: 5.5, image: P.bocaVegetal },
      { name: "Bacon y queso", price: 5.5, image: P.bocaBacon },
      { name: "Lomo fresco", price: 5.5, image: P.bocaLomo },
      { name: "Longaniza (blanca o roja)", price: 5.5, image: P.bocaLonganiza },
      { name: "Kebab", price: 5.5, image: P.kebab },
      { name: "Pechuga de pollo", price: 5.5, image: P.bocaPollo },
      { name: "Calamares", price: 5.5, image: P.bocaCalamares },
      { name: "Morcilla", price: 5.5, image: P.morcilla },
    ],
  },
  {
    id: "tostadas",
    group: "comidas",
    name: "Tostadas (medias)",
    icon: "Wheat",
    note: "Ingrediente adicional: +0,50 €",
    products: [
      { name: "Aceite", price: 1.2, image: P.tosAceite },
      { name: "Mantequilla o mermelada", price: 1.5, image: P.tosMermelada },
      { name: "Tomate", price: 1.6, image: P.tosTomate },
      { name: "Jamón york", price: 1.7, image: P.tosYork },
      { name: "Queso en lonchas", price: 1.7, image: P.tosQueso },
      { name: "Atún", price: 1.8, image: P.tosAtun },
      { name: "Queso manchego", price: 2, image: P.bocaQueso },
      { name: "Jamón serrano", price: 2.2, image: P.jamon },
    ],
  },
  {
    id: "picoteo",
    group: "comidas",
    name: "Picoteo",
    icon: "Croissant",
    products: [
      { name: "Croissant", price: 1.5, image: P.croissant },
      { name: "Magdalena", price: 1.5, image: P.magdalena },
      { name: "Napolitana de chocolate", price: 2, image: P.napolitana },
      { name: "Croissant de jamón y queso", price: 2.5, image: P.croissantJyQ },
      { name: "Panini de jamón york", price: 2.5, image: P.panini },
      { name: "Panini de atún", price: 2.5, image: P.panini },
      { name: "Panini de kebab", price: 3, image: P.panini },
    ],
  },

  // ============================== BEBIDAS ==============================
  {
    id: "refrescos",
    group: "bebidas",
    name: "Refrescos",
    icon: "CupSoda",
    products: [
      { name: "Coca-Cola / Coca-Cola Zero", price: 1.8, image: P.cola },
      { name: "Fanta naranja / limón", price: 1.8, image: P.naranja },
      { name: "Zumo de piña / melocotón", price: 1.8, image: P.zumo },
      { name: "Aquarius limón / naranja", price: 2, image: P.limon },
      { name: "Nestea limón / maracuyá", price: 2, image: P.te },
      { name: "Powerdrink", price: 2, image: P.isotonica },
      { name: "Tónica", price: 2, image: P.tonica },
    ],
  },
  {
    id: "cervezas-copas",
    group: "bebidas",
    name: "Cervezas y copas",
    icon: "Beer",
    products: [
      { name: "Caña (cerveza o tinto)", price: 1.8, image: P.cana },
      { name: "Bote de cerveza", price: 1.8, image: P.bote },
      { name: "Tanque (cerveza o tinto)", price: 3.5, image: P.tanque },
      { name: "Tinto de verano", price: 2, image: P.tintoVerano },
      { name: "Vino tinto o blanco", price: 2.5, image: P.vino },
      { name: "Vermut", price: 3, image: P.vermut },
    ],
  },
  {
    id: "granizados",
    group: "bebidas",
    name: "Granizados",
    icon: "IceCreamCone",
    products: [
      {
        name: "Granizado",
        price: [["Pequeño", 2.5], ["Mediano", 3.5], ["Grande", 4.5]],
        image: P.granizado,
      },
      {
        name: "Granizado especial",
        description: "Café, horchata o mojito.",
        price: [["Pequeño", 3], ["Mediano", 4], ["Grande", 5]],
        image: P.granizadoEspecial,
        featured: true,
      },
    ],
  },
  {
    id: "cubatas",
    group: "bebidas",
    name: "Cubatas",
    icon: "Martini",
    products: [
      { name: "Cubata", price: 5.5, image: P.cubata, featured: true },
      { name: "Cubata premium", price: 6.5, image: P.premium },
    ],
  },
  {
    id: "cafes",
    group: "bebidas",
    name: "Cafés",
    icon: "Coffee",
    note: "Suplemento de leche vegetal: +0,20 €",
    products: [
      { name: "Solo (espresso)", price: 1.2, image: P.espresso },
      { name: "Cortado", price: 1.4, image: P.cortado },
      { name: "Americano", price: 1.4, image: P.americano },
      { name: "Café con leche", price: 1.5, image: P.cafeLeche },
      { name: "Manchado", price: 1.6, image: P.manchado },
      { name: "Bombón", price: 1.7, image: P.bombon },
      { name: "Infusiones", price: 1.6, image: P.infusion },
    ],
  },
  {
    id: "agua",
    group: "bebidas",
    name: "Agua",
    icon: "GlassWater",
    products: [
      { name: "Agua pequeña", price: 1, image: P.aguaPequena },
      { name: "Agua grande", price: 1.5, image: P.aguaGrande },
      { name: "Agua con gas", price: 1.8, image: P.aguaGas },
    ],
  },
];

// --- Conversión a filas de base de datos --------------------------------------

export const CATEGORIES: Category[] = [];
export const PRODUCTS: Product[] = [];

SEED.forEach((c, ci) => {
  CATEGORIES.push({
    id: c.id,
    menuId: "verano",
    group: c.group,
    name: c.name,
    icon: c.icon,
    note: c.note ?? null,
    display: "cards",
    position: ci,
    isActive: true,
  });
  c.products.forEach((p, pi) => {
    const prices: PriceOption[] =
      typeof p.price === "number" ? [{ label: null, amount: p.price }] : p.price.map(([label, amount]) => ({ label, amount }));
    PRODUCTS.push({
      id: `${c.id}-${pi + 1}`,
      categoryId: c.id,
      name: p.name,
      description: p.description ?? null,
      prices,
      imageUrl: p.image,
      allergens: [],
      tags: p.tags ?? [],
      isAvailable: true,
      isFeatured: p.featured ?? false,
      position: pi,
    });
  });
});
