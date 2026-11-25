"use client";

import type { Category, MenuGroup } from "@/lib/types";

const GROUP_LABEL: Record<MenuGroup, string> = { comidas: "Comidas", bebidas: "Bebidas" };

/** Barra lateral fija de escritorio: buscador y navegación por categorías. */
export function Sidebar({
  categories,
  active,
  onGo,
}: {
  categories: Category[];
  active: string | null;
  onGo: (sectionId: string) => void;
}) {
  const groups = (["comidas", "bebidas"] as MenuGroup[]).filter((g) => categories.some((c) => c.group === g));

  return (
    <aside className="hidden border-r border-line lg:block">
      <div className="reveal no-scrollbar sticky top-0 max-h-dvh overflow-y-auto p-6" style={{ "--d": "0.85s" } as React.CSSProperties}>
        <nav aria-label="Categorías de la carta">
          {groups.map((g, gi) => (
            <div key={g} className={gi === 0 ? "mt-1" : "mt-6"}>
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">{GROUP_LABEL[g]}</p>
              <ul className="mt-2">
                {categories
                  .filter((c) => c.group === g)
                  .map((c) => {
                    const id = `cat-${c.id}`;
                    const on = active === id;
                    return (
                      <li key={c.id}>
                        <a
                          href={`#${id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onGo(id);
                          }}
                          aria-current={on ? "location" : undefined}
                          className={`block border-l-2 py-2 pl-3 font-display text-[13px] font-medium uppercase tracking-[0.1em] transition-colors duration-200 ${
                            on ? "border-gold text-gold" : "border-transparent text-muted hover:text-foreground"
                          }`}
                        >
                          {c.name}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}

          <div className="mt-8 border-t border-line pt-6">
            <a
              href="#informacion"
              onClick={(e) => {
                e.preventDefault();
                onGo("informacion");
              }}
              className="block border-l-2 border-transparent py-2 pl-3 font-display text-[13px] font-medium uppercase tracking-[0.1em] text-muted transition-colors duration-200 hover:text-foreground"
            >
              Información
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
}
