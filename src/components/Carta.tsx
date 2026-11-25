"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Filter } from "lucide-react";
import { useActiveSection } from "@/lib/useActiveSection";
import type { AllergenId, CartaData, Product } from "@/lib/types";
import { CoverBanner } from "./CoverBanner";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { Featured } from "./Featured";
import { MenuSection } from "./MenuSection";
import { Footer } from "./Footer";
import { ProductSheet } from "./ProductSheet";
import { AllergenFilter } from "./AllergenFilter";

export function Carta({ data }: { data: CartaData }) {
  const { establishment: est, menu, categories, products } = data;
  const currency = est.currency;

  const [excluded, setExcluded] = useState<AllergenId[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  const catById = useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);
  const hasAllergenData = products.some((p) => p.allergens.length > 0);

  // Comidas primero y después bebidas, cada bloque en su orden.
  const ordered = useMemo(
    () => [...categories.filter((c) => c.group === "comidas"), ...categories.filter((c) => c.group === "bebidas")],
    [categories],
  );

  const sections = useMemo(() => {
    return ordered
      .map((c) => ({
        category: c,
        items: products
          .filter((p) => p.categoryId === c.id)
          .filter((p) => !excluded.length || !p.allergens.some((a) => excluded.includes(a))),
      }))
      .filter((s) => s.items.length > 0);
  }, [ordered, products, excluded]);

  const featured = useMemo(
    () =>
      ordered.flatMap((c) =>
        products.filter(
          (p) => p.categoryId === c.id && p.isFeatured && p.isAvailable && !p.allergens.some((a) => excluded.includes(a)),
        ),
      ),
    [ordered, products, excluded],
  );

  // La barra fija solo existe en móvil/tablet; en escritorio no hay nada que compensar.
  const getOffset = useCallback(() => {
    const nav = mobileNavRef.current;
    return nav && nav.offsetParent !== null ? nav.offsetHeight : 0;
  }, []);
  const ids = useMemo(() => sections.map((s) => `cat-${s.category.id}`), [sections]);
  const { active, goTo } = useActiveSection(ids, getOffset);

  const visibleCats = sections.map((s) => s.category);

  return (
    <div className="min-h-dvh">
      <CoverBanner establishment={est} menu={menu} />

      <MobileNav
        ref={mobileNavRef}
        categories={visibleCats}
        active={active}
        onGo={goTo}
        showFilter={hasAllergenData}
        filterCount={excluded.length}
        onOpenFilter={() => setFilterOpen(true)}
      />

      <div className="mx-auto w-full max-w-[1200px] lg:grid lg:grid-cols-[220px_1fr] lg:px-8">
        <Sidebar categories={visibleCats} active={active} onGo={goTo} />

        <main className="min-w-0 px-4 sm:px-6 lg:pl-10 lg:pr-0">
          {hasAllergenData && (
            <div className="hidden justify-end pt-6 lg:flex">
              <button
                onClick={() => setFilterOpen(true)}
                className={`inline-flex items-center gap-2 rounded-[4px] border px-3 py-2 text-xs uppercase tracking-[0.12em] transition-colors ${
                  excluded.length ? "border-gold text-gold" : "border-line text-muted hover:text-foreground"
                }`}
              >
                <Filter className="size-3.5" strokeWidth={1.75} /> Filtrar alérgenos
                {excluded.length > 0 && ` (${excluded.length})`}
              </button>
            </div>
          )}

          {excluded.length > 0 && (
            <p className="mt-5 flex items-center justify-between gap-3 rounded-[4px] border border-gold/40 px-4 py-3 text-[13px] text-gold">
              Ocultando productos con {excluded.length} alérgeno{excluded.length > 1 ? "s" : ""}
              <button onClick={() => setExcluded([])} className="text-xs uppercase tracking-[0.12em] underline underline-offset-4">
                Quitar
              </button>
            </p>
          )}

          <Featured
            items={featured}
            categoryOf={(p) => catById.get(p.categoryId)!}
            currency={currency}
            onOpen={setSelected}
          />

          {sections.length === 0 && (
            <p className="py-20 text-center font-display text-lg italic text-muted">
              No hay productos que mostrar.
            </p>
          )}

          {sections.map(({ category, items }) => (
            <MenuSection key={category.id} category={category} items={items} currency={currency} onOpen={setSelected} />
          ))}

          <Footer establishment={est} />
        </main>
      </div>

      {selected && (
        <ProductSheet
          product={selected}
          category={catById.get(selected.categoryId)!}
          currency={currency}
          onClose={() => setSelected(null)}
        />
      )}
      {filterOpen && <AllergenFilter selected={excluded} onChange={setExcluded} onClose={() => setFilterOpen(false)} />}
    </div>
  );
}
