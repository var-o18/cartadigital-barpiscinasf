import type { Category, Product } from "@/lib/types";
import { MenuItem } from "./MenuItem";

/** Título dorado entre líneas finas, como separador de sección. */
export function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 shrink-0 bg-gold-dim" aria-hidden />
      <h2 id={id} className="shrink-0 font-display text-[15px] font-semibold uppercase tracking-[0.18em] text-gold sm:text-base">
        {children}
      </h2>
      <span className="h-px flex-1 bg-gold-dim" aria-hidden />
    </div>
  );
}

export function MenuSection({
  category: c,
  items,
  currency,
  onOpen,
}: {
  category: Category;
  items: Product[];
  currency: string;
  onOpen: (p: Product) => void;
}) {
  return (
    <section id={`cat-${c.id}`} aria-labelledby={`h-${c.id}`} className="reveal pt-10 sm:pt-12" style={{ "--d": "1.1s" } as React.CSSProperties}>
      <SectionHeading id={`h-${c.id}`}>{c.name}</SectionHeading>
      {c.note && <p className="mt-2 pl-11 font-display text-[15px] italic text-muted">{c.note}</p>}
      <div className="mt-2 grid md:grid-cols-2 md:gap-x-10">
        {items.map((p) => (
          <MenuItem key={p.id} product={p} category={c} currency={currency} onOpen={() => onOpen(p)} />
        ))}
      </div>
    </section>
  );
}
