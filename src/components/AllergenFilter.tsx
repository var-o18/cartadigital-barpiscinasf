"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { ALLERGENS } from "@/lib/catalog";
import type { AllergenId } from "@/lib/types";

/** Permite ocultar los productos que contienen los alérgenos elegidos. */
export function AllergenFilter({
  selected,
  onChange,
  onClose,
}: {
  selected: AllergenId[];
  onChange: (ids: AllergenId[]) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const toggle = (id: AllergenId) =>
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Filtrar por alérgenos">
      <button className="animate-fade-in absolute inset-0 bg-black/75" onClick={onClose} aria-label="Cerrar" />
      <div className="animate-sheet-up relative max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-md border border-line bg-surface p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:max-w-[520px] sm:rounded-md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">Alérgenos</p>
            <h2 className="mt-1 font-display text-2xl font-semibold">Ocultar productos con…</h2>
          </div>
          <button onClick={onClose} className="flex size-9 items-center justify-center rounded-md border border-line" aria-label="Cerrar">
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          {ALLERGENS.map((a) => {
            const on = selected.includes(a.id);
            return (
              <button
                key={a.id}
                onClick={() => toggle(a.id)}
                aria-pressed={on}
                className={`rounded-[3px] border px-3 py-2.5 text-left text-[13px] transition-colors ${
                  on ? "border-gold text-gold" : "border-line text-muted hover:text-foreground"
                }`}
              >
                {a.name}
              </button>
            );
          })}
        </div>
        <div className="mt-6 flex gap-2">
          <button onClick={() => onChange([])} className="flex-1 rounded-[3px] border border-line py-3 text-xs uppercase tracking-[0.14em] text-muted">
            Quitar filtros
          </button>
          <button onClick={onClose} className="flex-[2] rounded-[3px] bg-gold py-3 text-xs font-semibold uppercase tracking-[0.14em] text-background">
            Ver carta
          </button>
        </div>
      </div>
    </div>
  );
}
