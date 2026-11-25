"use client";

import { forwardRef, useEffect, useRef } from "react";
import { Filter } from "lucide-react";
import type { Category, MenuGroup } from "@/lib/types";

const GROUPS: { id: MenuGroup; label: string }[] = [
  { id: "comidas", label: "Comidas" },
  { id: "bebidas", label: "Bebidas" },
];

/** Barra fija de móvil y tablet: buscador, Comidas/Bebidas y categorías desplazables. */
export const MobileNav = forwardRef<
  HTMLDivElement,
  {
    categories: Category[];
    active: string | null;
    onGo: (sectionId: string) => void;
    showFilter: boolean;
    filterCount: number;
    onOpenFilter: () => void;
  }
>(function MobileNav({ categories, active, onGo, showFilter, filterCount, onOpenFilter }, ref) {
  const rowRef = useRef<HTMLDivElement>(null);
  const activeCat = categories.find((c) => `cat-${c.id}` === active);
  const group: MenuGroup = activeCat?.group ?? "comidas";
  const visible = categories.filter((c) => c.group === group);

  // Centrar la categoría activa moviendo solo la fila (sin mover la página).
  useEffect(() => {
    const row = rowRef.current;
    const link = active ? row?.querySelector<HTMLElement>(`[data-target="${active}"]`) : null;
    if (!row || !link) return;
    // offsetLeft se mide desde la barra fija, no desde la fila: hay que restar la posición de la fila.
    const left = link.offsetLeft - row.offsetLeft - (row.clientWidth - link.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  return (
    <div
      ref={ref}
      className="reveal sticky top-0 z-30 border-b border-line bg-background/92 pt-[env(safe-area-inset-top)] backdrop-blur-md lg:hidden"
      style={{ "--d": "0.8s" } as React.CSSProperties}
    >
      <div className="flex items-stretch">
        <div className="flex shrink-0 gap-4 pl-4 sm:pl-6" role="tablist" aria-label="Bloque de la carta">
          {GROUPS.map((g) => {
            const first = categories.find((c) => c.group === g.id);
            if (!first) return null;
            const on = group === g.id;
            return (
              <button
                key={g.id}
                role="tab"
                aria-selected={on}
                onClick={() => onGo(`cat-${first.id}`)}
                className={`relative py-3 font-display text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  on ? "text-gold" : "text-muted"
                }`}
              >
                {g.label}
                <span className={`absolute inset-x-0 bottom-2 h-px bg-gold transition-opacity ${on ? "opacity-100" : "opacity-0"}`} />
              </button>
            );
          })}
        </div>
        <span className="my-3 ml-3 w-px shrink-0 bg-line" aria-hidden />
        <div ref={rowRef} className="no-scrollbar flex min-w-0 flex-1 gap-5 overflow-x-auto px-3 [mask-image:linear-gradient(to_right,transparent,black_14px,black_calc(100%-20px),transparent)] sm:pr-6">
          {visible.map((c) => {
            const id = `cat-${c.id}`;
            const on = active === id;
            return (
              <a
                key={c.id}
                href={`#${id}`}
                data-target={id}
                onClick={(e) => {
                  e.preventDefault();
                  onGo(id);
                }}
                className={`relative shrink-0 py-3 font-display text-[13px] font-medium uppercase tracking-[0.1em] transition-colors ${
                  on ? "text-gold" : "text-muted"
                }`}
              >
                {c.name}
                <span className={`absolute inset-x-0 bottom-2 h-px bg-gold transition-opacity ${on ? "opacity-100" : "opacity-0"}`} />
              </a>
            );
          })}
        </div>
        {showFilter && (
          <button
            onClick={onOpenFilter}
            aria-label="Filtrar por alérgenos"
            className={`relative my-1.5 mr-4 flex size-9 shrink-0 items-center justify-center self-center rounded-md border transition-colors sm:mr-6 ${
              filterCount ? "border-gold text-gold" : "border-line text-muted"
            }`}
          >
            <Filter className="size-4" strokeWidth={1.75} />
            {filterCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex size-[18px] items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-background">
                {filterCount}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
});
