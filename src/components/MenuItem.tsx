import { formatPrice, minPrice } from "@/lib/catalog";
import type { Category, Product } from "@/lib/types";
import { AllergenTags, Tag } from "./AllergenTags";
import { CategoryIcon } from "./icons";

/** Imagen del producto, o un recuadro neutro con el icono de la categoría si no hay foto. */
export function ProductImage({
  product,
  category,
  className = "",
  eager = false,
}: {
  product: Product;
  category: Category;
  className?: string;
  eager?: boolean;
}) {
  if (product.imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={product.imageUrl}
        alt={product.name}
        loading={eager ? "eager" : "lazy"}
        className={`bg-surface object-cover ${className}`}
      />
    );
  }
  return (
    <div className={`flex items-center justify-center bg-surface text-line ${className}`} aria-hidden>
      <CategoryIcon name={category.icon} className="size-1/3" strokeWidth={1.25} />
    </div>
  );
}

/** Plato de la lista: nombre y precio en una línea, descripción, alérgenos y miniatura a la derecha. */
export function MenuItem({
  product: p,
  category,
  currency,
  onOpen,
}: {
  product: Product;
  category: Category;
  currency: string;
  onOpen: () => void;
}) {
  const multi = p.prices.length > 1;
  return (
    <button
      onClick={onOpen}
      className={`group grid w-full grid-cols-[1fr_auto] items-start gap-3.5 border-b border-line py-4 text-left sm:py-[18px] ${
        p.isAvailable ? "" : "opacity-45"
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[15px] font-medium leading-snug text-foreground transition-colors duration-200 group-hover:text-gold sm:text-base">
            {p.name}
          </h3>
          <span className="shrink-0 text-[15px] font-medium tabular-nums text-gold sm:text-base">
            {multi && <span className="mr-1 text-[11px] font-normal text-muted">desde</span>}
            {formatPrice(minPrice(p.prices), currency)}
          </span>
        </div>

        {multi && (
          <p className="mt-1 text-[13px] text-muted">
            {p.prices.map((o, i) => (
              <span key={i}>
                {i > 0 && <span aria-hidden> · </span>}
                {o.label} <span className="tabular-nums text-gold">{formatPrice(o.amount, currency)}</span>
              </span>
            ))}
          </p>
        )}
        {p.description && <p className="mt-1 line-clamp-3 text-[13px] leading-[1.55] text-muted">{p.description}</p>}

        {(p.allergens.length > 0 || !p.isAvailable) && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {!p.isAvailable && <Tag>Agotado</Tag>}
            <AllergenTags ids={p.allergens} />
          </div>
        )}
      </div>

      <ProductImage product={p} category={category} className="size-16 rounded-[4px] border border-line sm:size-[60px]" />
    </button>
  );
}
