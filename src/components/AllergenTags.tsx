import { ALLERGEN_BY_ID } from "@/lib/catalog";
import type { AllergenId } from "@/lib/types";

/** Etiquetas de alérgenos con borde fino. Solo se pintan si hay datos. */
export function AllergenTags({ ids }: { ids: AllergenId[] }) {
  if (!ids.length) return null;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Alérgenos">
      {ids.map((id) => (
        <li key={id}>
          <Tag>{ALLERGEN_BY_ID[id].name}</Tag>
        </li>
      ))}
    </ul>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-[3px] border border-line px-1.5 py-0.5 text-[9px] font-medium uppercase leading-none tracking-[0.06em] text-muted sm:text-[10px]">
      {children}
    </span>
  );
}
