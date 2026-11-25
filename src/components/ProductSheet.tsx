"use client";

import { useEffect } from "react";
import { Info, X } from "lucide-react";
import { TAG_LABEL, formatPrice } from "@/lib/catalog";
import type { Category, Product } from "@/lib/types";
import { AllergenTags } from "./AllergenTags";
import { ProductImage } from "./MenuItem";

/** Ficha del producto: hoja inferior en móvil, modal centrado en escritorio. */
export function ProductSheet({
  product: p,
  category,
  currency,
  onClose,
}: {
  product: Product;
  category: Category;
  currency: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={p.name}>
      <button className="animate-fade-in absolute inset-0 bg-black/75" onClick={onClose} aria-label="Cerrar" />
      <div className="animate-sheet-up relative max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-md border border-line bg-surface pb-[env(safe-area-inset-bottom)] sm:max-w-[520px] sm:rounded-md">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-md border border-line bg-background/85 text-foreground"
          aria-label="Cerrar"
        >
          <X className="size-4" strokeWidth={1.75} />
        </button>

        <ProductImage product={p} category={category} eager className="aspect-[16/10] w-full" />

        <div className="p-6">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">{category.name}</p>
          <h2 className="mt-1.5 font-display text-[28px] font-semibold leading-tight text-foreground">{p.name}</h2>
          {p.tags.length > 0 && (
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted">{p.tags.map((t) => TAG_LABEL[t]).join(" · ")}</p>
          )}
          {p.description && <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>}
          {!p.isAvailable && (
            <p className="mt-4 rounded-[3px] border border-line px-3 py-2 text-xs uppercase tracking-[0.1em] text-muted">
              Agotado en este momento
            </p>
          )}

          <dl className="mt-5 space-y-2 border-y border-line py-4">
            {p.prices.map((o, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <dt className="shrink-0 text-sm text-muted">{o.label ?? "Precio"}</dt>
                <span className="flex-1 border-b border-dotted border-line" aria-hidden />
                <dd className="shrink-0 text-base font-medium tabular-nums text-gold">{formatPrice(o.amount, currency)}</dd>
              </div>
            ))}
          </dl>
          {category.note && <p className="mt-3 font-display text-[15px] italic text-muted">{category.note}</p>}

          <div className="mt-5">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">Alérgenos</p>
            {p.allergens.length ? (
              <div className="mt-2.5">
                <AllergenTags ids={p.allergens} />
              </div>
            ) : (
              <p className="mt-2 flex gap-2 text-[13px] leading-relaxed text-muted">
                <Info className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.75} />
                Si tienes alguna alergia o intolerancia, consulta a nuestro personal antes de pedir.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
