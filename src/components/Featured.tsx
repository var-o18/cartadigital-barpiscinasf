import { formatPrice, minPrice } from "@/lib/catalog";
import type { Category, Product } from "@/lib/types";
import { ProductImage } from "./MenuItem";

/** Bloque «Hoy recomendamos»: tarjetas con foto arriba, nombre y precio. */
export function Featured({
  items,
  categoryOf,
  currency,
  onOpen,
}: {
  items: Product[];
  categoryOf: (p: Product) => Category;
  currency: string;
  onOpen: (p: Product) => void;
}) {
  if (!items.length) return null;
  // Una sola fila, como en la referencia: como máximo 4 recomendados.
  const shown = items.slice(0, 4);
  return (
    <section aria-labelledby="recomendados" className="reveal pt-6 lg:pt-7" style={{ "--d": "0.95s" } as React.CSSProperties}>
      <p id="recomendados" className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
        Hoy recomendamos
      </p>
      <div className="no-scrollbar -mx-4 mt-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-4 md:gap-3 md:overflow-visible md:px-0">
        {shown.map((p) => {
          const multi = p.prices.length > 1;
          return (
            <button
              key={p.id}
              onClick={() => onOpen(p)}
              className="group w-[62%] shrink-0 snap-start overflow-hidden rounded-[4px] border border-line bg-surface text-left transition-colors duration-200 hover:border-gold/40 sm:w-[40%] md:w-auto"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <ProductImage
                  product={p}
                  category={categoryOf(p)}
                  eager
                  className="size-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-3">
                <h3 className="line-clamp-2 text-[13px] font-medium leading-snug text-foreground sm:text-sm">{p.name}</h3>
                <p className="mt-1 text-[12px] tabular-nums text-gold sm:text-[13px]">
                  {multi && <span className="mr-1 text-muted">desde</span>}
                  {formatPrice(minPrice(p.prices), currency)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-8 h-px bg-line" aria-hidden />
    </section>
  );
}
