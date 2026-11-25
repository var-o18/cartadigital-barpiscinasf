import {
  Beer,
  Coffee,
  Croissant,
  CupSoda,
  Drumstick,
  Fish,
  GlassWater,
  Hamburger,
  IceCreamCone,
  Martini,
  Sandwich,
  Soup,
  Utensils,
  Wheat,
  type LucideProps,
} from "lucide-react";
import type { CategoryIcon as IconName } from "@/lib/types";

const ICONS: Record<IconName, React.ComponentType<LucideProps>> = {
  Beer,
  Coffee,
  Croissant,
  CupSoda,
  Drumstick,
  Fish,
  GlassWater,
  Hamburger,
  IceCreamCone,
  Martini,
  Sandwich,
  Soup,
  Utensils,
  Wheat,
};

export function CategoryIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = ICONS[name] ?? Utensils;
  return <Icon {...props} />;
}

// Lucide no incluye logotipos de marcas: iconos simples dibujados aquí.
export function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
