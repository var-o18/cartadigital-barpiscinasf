# cartadigital-barpiscinasf

Carta digital pública del **Bar Piscina San Fulgencio**: la página que abre el cliente
al acercar el móvil a la etiqueta NFC o escanear el QR de la mesa.

Stack: Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Lucide.

## Arrancar en local

```bash
npm install
npm run dev
```

## Dónde está cada cosa

| Archivo | Qué contiene |
|---|---|
| `src/data/carta.ts` | La carta real (transcrita de la carta en papel): categorías, productos y precios. Carta de verano e invierno. |
| `src/lib/data.ts` | `getActiveCarta()`: devuelve la carta activa. Es lo único que cambiará al conectar Supabase. |
| `src/lib/types.ts` | Modelo de datos (compartido con el repositorio del panel de administración). |
| `src/components/` | Cabecera, barra Comidas/Bebidas, tarjetas, ficha de producto y filtro de alérgenos. |

## Pendiente

- Logotipo del flamenco en buena calidad (`establishment.logoUrl`).
- Fotos reales de los productos (ahora hay fotos de ejemplo en algunos).
- Alérgenos de cada producto (los debe indicar el bar).
- Conectar con Supabase cuando esté el panel de administración.
